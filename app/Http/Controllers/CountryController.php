<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Inertia\Inertia;
use Inertia\Response;

class CountryController extends Controller
{
    /**
     * Display a listing of active countries.
     */
    public function index(): Response
    {
        $countries = Country::active()
            ->withCount('plans')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Countries/Index', [
            'countries' => $countries,
        ]);
    }

    /**
     * Display the specified country and its plans.
     */
    public function show(Country $country): Response
    {
        $country->load(['plans' => function ($query) {
            $query->active()->orderBy('sort_order');
        }]);

        return Inertia::render('Countries/Show', [
            'country' => $country,
        ]);
    }
}
