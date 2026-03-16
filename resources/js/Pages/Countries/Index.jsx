import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';

export default function CountriesIndex({ countries }) {
    const [search, setSearch] = useState('');
    const filtered = countries.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <MainLayout>
            <Head title="Browse Countries" />

            {/* Hero banner */}
            <div className="bg-gradient-to-r from-brand-800 to-brand-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold">Choose Your Destination</h1>
                    <p className="mt-2 text-brand-100 text-lg">Browse eSIM plans for African countries</p>
                    <input
                        type="text"
                        placeholder="Search countries..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="mt-6 w-full max-w-md rounded-xl border-0 px-5 py-3 text-gray-900 shadow-lg focus:ring-2 focus:ring-brand-400"
                    />
                </div>
            </div>

            {/* Country grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filtered.map(country => (
                        <Link
                            key={country.id}
                            href={route('countries.show', country.iso_code.toLowerCase())}
                            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="text-5xl mb-3">{country.flag_emoji}</div>
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-brand-600">
                                {country.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {country.plans_count} {country.plans_count === 1 ? 'plan' : 'plans'} available
                            </p>
                            {country.min_price && (
                                <p className="text-sm text-gray-600 mt-2">
                                    From <span className="font-semibold text-brand-700">${parseFloat(country.min_price).toFixed(2)}</span>
                                </p>
                            )}
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-brand-600 font-semibold group-hover:translate-x-1 transition-transform duration-200">
                                    View Plans &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">🔍</div>
                        <p className="text-gray-500 text-lg">No countries found matching "{search}"</p>
                        <button
                            onClick={() => setSearch('')}
                            className="mt-4 text-brand-600 hover:text-brand-700 font-medium"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
