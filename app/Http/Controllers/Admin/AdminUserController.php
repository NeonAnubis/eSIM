<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    /**
     * Display a listing of all users.
     */
    public function index(): Response
    {
        $users = User::withCount('orders')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }
}
