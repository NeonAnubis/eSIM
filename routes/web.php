<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminPlanController;
use App\Http\Controllers\Admin\AdminUserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/countries', [CountryController::class, 'index'])->name('countries.index');
Route::get('/countries/{country}', [CountryController::class, 'show'])->name('countries.show');
Route::get('/plans/{plan}', [PlanController::class, 'show'])->name('plans.show');

// Auth required routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Checkout
    Route::get('/checkout/{plan}', [CheckoutController::class, 'create'])->name('checkout.create');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/confirmation/{order}', [CheckoutController::class, 'confirmation'])->name('checkout.confirmation');

    // Customer Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/orders', [DashboardController::class, 'orders'])->name('dashboard.orders');
    Route::get('/dashboard/orders/{order}', [DashboardController::class, 'orderShow'])->name('dashboard.orders.show');
    Route::get('/dashboard/esims', [DashboardController::class, 'esims'])->name('dashboard.esims');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
    Route::delete('/profile/avatar', [ProfileController::class, 'deleteAvatar'])->name('profile.avatar.delete');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    Route::get('/orders', [AdminOrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}', [AdminOrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.updateStatus');

    Route::resource('plans', AdminPlanController::class);

    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
});

require __DIR__.'/auth.php';
