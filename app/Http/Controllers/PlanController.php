<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    /**
     * Display the specified plan.
     */
    public function show(Plan $plan): Response
    {
        $plan->load('country');

        return Inertia::render('Plans/Show', [
            'plan' => $plan,
        ]);
    }
}
