<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the customer dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $recentOrders = $user->orders()
            ->with(['items.plan.country', 'items.esim'])
            ->latest()
            ->take(5)
            ->get();

        $stats = [
            'total_orders' => $user->orders()->count(),
            'active_esims' => $user->esims()->where('status', 'active')->count(),
            'total_spent' => $user->orders()->where('status', 'completed')->sum('total'),
        ];

        return Inertia::render('Dashboard', [
            'orders' => $recentOrders,
            'stats' => $stats,
        ]);
    }

    /**
     * Display all orders for the user.
     */
    public function orders(Request $request): Response
    {
        $orders = $request->user()
            ->orders()
            ->with(['items.plan.country'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Dashboard/Orders', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display a specific order.
     */
    public function orderShow(Request $request, Order $order): Response
    {
        // Ensure the user owns this order
        if ($order->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized access to this order.');
        }

        $order->load(['items.plan.country', 'items.esim']);

        return Inertia::render('Dashboard/OrderShow', [
            'order' => $order,
        ]);
    }

    /**
     * Display all eSIMs for the user.
     */
    public function esims(Request $request): Response
    {
        $esims = $request->user()
            ->esims()
            ->with(['orderItem.plan.country'])
            ->latest()
            ->get();

        return Inertia::render('Dashboard/Esims', [
            'esims' => $esims,
        ]);
    }
}
