<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Plan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPlanController extends Controller
{
    /**
     * Display a listing of all plans.
     */
    public function index(): Response
    {
        $plans = Plan::with('country')
            ->orderBy('sort_order')
            ->paginate(15);

        return Inertia::render('Admin/Plans/Index', [
            'plans' => $plans,
        ]);
    }

    /**
     * Show the form for creating a new plan.
     */
    public function create(): Response
    {
        $countries = Country::active()->orderBy('name')->get();

        return Inertia::render('Admin/Plans/Create', [
            'countries' => $countries,
        ]);
    }

    /**
     * Store a newly created plan.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'country_id' => 'required|exists:countries,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:plans,slug',
            'data_amount' => 'required|string|max:50',
            'data_amount_mb' => 'required|integer|min:0',
            'duration_days' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'currency' => 'nullable|string|max:3',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'is_popular' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        Plan::create($validated);

        return redirect()->route('admin.plans.index')
            ->with('success', 'Plan created successfully.');
    }

    /**
     * Show the form for editing the specified plan.
     */
    public function edit(Plan $plan): Response
    {
        $countries = Country::active()->orderBy('name')->get();

        return Inertia::render('Admin/Plans/Edit', [
            'plan' => $plan,
            'countries' => $countries,
        ]);
    }

    /**
     * Update the specified plan.
     */
    public function update(Request $request, Plan $plan): RedirectResponse
    {
        $validated = $request->validate([
            'country_id' => 'required|exists:countries,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:plans,slug,' . $plan->id,
            'data_amount' => 'required|string|max:50',
            'data_amount_mb' => 'required|integer|min:0',
            'duration_days' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'currency' => 'nullable|string|max:3',
            'description' => 'nullable|string',
            'features' => 'nullable|array',
            'is_popular' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $plan->update($validated);

        return redirect()->route('admin.plans.index')
            ->with('success', 'Plan updated successfully.');
    }

    /**
     * Remove the specified plan.
     */
    public function destroy(Plan $plan): RedirectResponse
    {
        $plan->delete();

        return redirect()->route('admin.plans.index')
            ->with('success', 'Plan deleted successfully.');
    }
}
