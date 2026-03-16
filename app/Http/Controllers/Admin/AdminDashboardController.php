<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Esim;
use App\Models\Order;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        $stats = [
            'total_users' => User::count(),
            'total_orders' => Order::count(),
            'revenue' => Order::where('status', 'completed')->sum('total'),
            'active_esims' => Esim::where('status', 'active')->count(),
        ];

        $recentOrders = Order::with(['user', 'items.plan'])
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
        ]);
    }
}
