<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminOrderController extends Controller
{
    /**
     * Display a listing of all orders.
     */
    public function index(): Response
    {
        $orders = Order::with(['user', 'items'])
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order): Response
    {
        $order->load(['user', 'items.plan.country', 'items.esim']);

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Update the status of an order.
     */
    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        $request->validate([
            'status' => 'required|string|in:pending,processing,completed,cancelled,refunded',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Order status updated successfully.');
    }
}
