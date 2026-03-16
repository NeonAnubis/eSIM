<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Country;
use App\Models\Plan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // --- Users ---
        User::updateOrCreate(
            ['email' => 'admin@afrisim.com'],
            [
                'name'     => 'Admin',
                'password' => bcrypt('password'),
                'role'     => 'admin',
            ]
        );

        User::updateOrCreate(
            ['email' => 'demo@afrisim.com'],
            [
                'name'     => 'John Traveler',
                'password' => bcrypt('password'),
                'role'     => 'customer',
            ]
        );

        // --- Countries & Plans ---
        $countries = [
            ['name' => 'Uganda',       'iso_code' => 'UG', 'flag_emoji' => "\u{1F1FA}\u{1F1EC}", 'sort_order' => 1,  'price_offset' => -0.50],
            ['name' => 'Kenya',        'iso_code' => 'KE', 'flag_emoji' => "\u{1F1F0}\u{1F1EA}", 'sort_order' => 2,  'price_offset' =>  0.00],
            ['name' => 'Tanzania',     'iso_code' => 'TZ', 'flag_emoji' => "\u{1F1F9}\u{1F1FF}", 'sort_order' => 3,  'price_offset' => -0.30],
            ['name' => 'South Africa', 'iso_code' => 'ZA', 'flag_emoji' => "\u{1F1FF}\u{1F1E6}", 'sort_order' => 4,  'price_offset' =>  1.00],
            ['name' => 'Rwanda',       'iso_code' => 'RW', 'flag_emoji' => "\u{1F1F7}\u{1F1FC}", 'sort_order' => 5,  'price_offset' => -0.20],
            ['name' => 'Nigeria',      'iso_code' => 'NG', 'flag_emoji' => "\u{1F1F3}\u{1F1EC}", 'sort_order' => 6,  'price_offset' =>  0.50],
            ['name' => 'Ghana',        'iso_code' => 'GH', 'flag_emoji' => "\u{1F1EC}\u{1F1ED}", 'sort_order' => 7,  'price_offset' =>  0.30],
            ['name' => 'Ethiopia',     'iso_code' => 'ET', 'flag_emoji' => "\u{1F1EA}\u{1F1F9}", 'sort_order' => 8,  'price_offset' => -0.40],
            ['name' => 'Egypt',        'iso_code' => 'EG', 'flag_emoji' => "\u{1F1EA}\u{1F1EC}", 'sort_order' => 9,  'price_offset' =>  0.80],
            ['name' => 'Morocco',      'iso_code' => 'MA', 'flag_emoji' => "\u{1F1F2}\u{1F1E6}", 'sort_order' => 10, 'price_offset' =>  0.60],
        ];

        $planTemplates = [
            [
                'name'           => 'Light',
                'data_amount'    => '1 GB',
                'data_amount_mb' => 1024,
                'duration_days'  => 7,
                'base_price'     => 4.50,
                'is_popular'     => false,
                'sort_order'     => 1,
                'description'    => 'Perfect for light browsing, messaging, and email while traveling.',
                'features'       => ['4G/LTE Speed', 'Instant Activation', 'No contracts'],
            ],
            [
                'name'           => 'Standard',
                'data_amount'    => '3 GB',
                'data_amount_mb' => 3072,
                'duration_days'  => 15,
                'base_price'     => 9.50,
                'is_popular'     => false,
                'sort_order'     => 2,
                'description'    => 'Great for social media, maps, and regular internet usage.',
                'features'       => ['4G/LTE Speed', 'Instant Activation', 'No contracts', 'Hotspot enabled'],
            ],
            [
                'name'           => 'Premium',
                'data_amount'    => '5 GB',
                'data_amount_mb' => 5120,
                'duration_days'  => 30,
                'base_price'     => 14.50,
                'is_popular'     => false,
                'sort_order'     => 3,
                'description'    => 'Ideal for streaming, video calls, and heavy data usage.',
                'features'       => ['4G/LTE Speed', 'Instant Activation', 'No contracts', 'Hotspot enabled', '24/7 Support'],
            ],
            [
                'name'           => 'Unlimited',
                'data_amount'    => '10 GB',
                'data_amount_mb' => 10240,
                'duration_days'  => 30,
                'base_price'     => 24.50,
                'is_popular'     => true,
                'sort_order'     => 4,
                'description'    => 'Our best value plan with maximum data for extended stays.',
                'features'       => ['4G/LTE Speed', 'Instant Activation', 'No contracts', 'Hotspot enabled', '24/7 Support', 'Top-up available'],
            ],
        ];

        foreach ($countries as $countryData) {
            $priceOffset = $countryData['price_offset'];
            unset($countryData['price_offset']);

            $country = Country::updateOrCreate(
                ['iso_code' => $countryData['iso_code']],
                $countryData
            );

            foreach ($planTemplates as $template) {
                $price    = round($template['base_price'] + $priceOffset, 2);
                $slug     = Str::slug($country->name . '-' . $template['name'] . '-' . $template['data_amount']);

                Plan::updateOrCreate(
                    ['slug' => $slug],
                    [
                        'country_id'     => $country->id,
                        'name'           => $template['name'] . ' - ' . $country->name,
                        'slug'           => $slug,
                        'data_amount'    => $template['data_amount'],
                        'data_amount_mb' => $template['data_amount_mb'],
                        'duration_days'  => $template['duration_days'],
                        'price'          => $price,
                        'currency'       => 'USD',
                        'description'    => $template['description'],
                        'features'       => $template['features'],
                        'is_popular'     => $template['is_popular'],
                        'is_active'      => true,
                        'sort_order'     => $template['sort_order'],
                    ]
                );
            }
        }

        $this->command->info('Seeded: 2 users, ' . count($countries) . ' countries, ' . (count($countries) * count($planTemplates)) . ' plans.');
    }
}
