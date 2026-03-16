<?php

namespace App\Http\Controllers;

use App\Mail\EsimDelivery;
use App\Mail\OrderConfirmation;
use App\Models\Esim;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Plan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CheckoutController extends Controller
{
    /**
     * Show the checkout form for a plan.
     */
    public function create(Plan $plan): Response
    {
        $plan->load('country');

        return Inertia::render('Checkout/Create', [
            'plan' => $plan,
        ]);
    }

    /**
     * Process the checkout and create the order.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'plan_id' => 'required|exists:plans,id',
        ]);

        $plan = Plan::findOrFail($request->plan_id);
        $user = $request->user();

        // Create the order
        $order = Order::create([
            'user_id' => $user->id,
            'status' => 'pending',
            'subtotal' => $plan->price,
            'tax' => 0.00,
            'total' => $plan->price,
            'currency' => $plan->currency ?? 'USD',
            'payment_method' => 'stripe',
            'payment_intent_id' => 'pi_simulated_' . uniqid(),
            'paid_at' => now(),
        ]);

        // Create the order item
        $orderItem = OrderItem::create([
            'order_id' => $order->id,
            'plan_id' => $plan->id,
            'quantity' => 1,
            'unit_price' => $plan->price,
            'total_price' => $plan->price,
        ]);

        // Generate a fake eSIM
        $iccid = '89' . str_pad(mt_rand(0, 99999999999999999), 17, '0', STR_PAD_LEFT);
        $activationCode = 'LPA:1$esim.afrisim.com$' . strtoupper(bin2hex(random_bytes(16)));

        // Generate QR code SVG
        $qrCodeData = (string) QrCode::format('svg')
            ->size(300)
            ->errorCorrection('H')
            ->margin(1)
            ->generate($activationCode);

        // Create the eSIM record
        $esim = Esim::create([
            'order_item_id' => $orderItem->id,
            'user_id' => $user->id,
            'iccid' => $iccid,
            'activation_code' => $activationCode,
            'qr_code_data' => $qrCodeData,
            'status' => 'active',
            'activated_at' => now(),
            'expires_at' => now()->addDays($plan->duration_days),
        ]);

        // Mark order as completed
        $order->update(['status' => 'completed']);

        // Load relationships for email templates
        $order->load(['items.plan.country', 'items.esim']);
        $esim->load(['orderItem.plan.country']);

        // Send confirmation and eSIM delivery emails
        try {
            Mail::to($request->user())->send(new OrderConfirmation($order));
            Mail::to($request->user())->send(new EsimDelivery($esim));
        } catch (\Throwable $e) {
            // Don't block checkout if email fails
            report($e);
        }

        return redirect()->route('checkout.confirmation', $order);
    }

    /**
     * Display the order confirmation page.
     */
    public function confirmation(Order $order): Response
    {
        $user = request()->user();

        // Ensure the user owns this order
        if ($order->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this order.');
        }

        $order->load(['items.plan.country', 'items.esim']);

        return Inertia::render('Checkout/Confirmation', [
            'order' => $order,
        ]);
    }
}
