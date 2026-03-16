<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\Plan;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class HomeController extends Controller
{
    /**
     * Display the landing page.
     */
    public function index(): Response
    {
        $popularPlans = Plan::active()
            ->popular()
            ->with('country')
            ->take(8)
            ->get();

        $countries = Country::active()
            ->withCount('plans')
            ->withMin('plans', 'price')
            ->orderBy('sort_order')
            ->get()
            ->map(function ($country) {
                $country->min_price = $country->plans_min_price;
                return $country;
            });

        $stats = [
            'countries' => Country::active()->count(),
            'plans' => Plan::active()->count(),
            'customers' => User::count(),
        ];

        // Generate a demo QR code for the hero phone mockup
        $heroQrCode = (string) QrCode::format('svg')
            ->size(200)
            ->style('round')
            ->eye('circle')
            ->errorCorrection('H')
            ->margin(0)
            ->color(20, 83, 45)
            ->generate('LPA:1$esim.afrisim.com$DEMO-KENYA-5GB-30DAYS');

        return Inertia::render('Home', [
            'popularPlans' => $popularPlans,
            'countries' => $countries,
            'stats' => $stats,
            'heroQrCode' => $heroQrCode,
        ]);
    }
}
