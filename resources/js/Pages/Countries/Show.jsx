import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function CountriesShow({ country }) {
    const plans = country.plans || [];

    return (
        <MainLayout>
            <Head title={`${country.name} eSIM Plans`} />

            {/* Hero banner */}
            <div className="bg-gradient-to-r from-brand-800 to-brand-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <Link
                        href={route('countries.index')}
                        className="inline-flex items-center text-brand-200 hover:text-white mb-6 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        All Countries
                    </Link>
                    <div className="flex items-center gap-5">
                        <span className="text-7xl">{country.flag_emoji}</span>
                        <div>
                            <h1 className="text-4xl font-bold">{country.name}</h1>
                            <p className="mt-2 text-brand-100 text-lg">
                                {plans.length} {plans.length === 1 ? 'plan' : 'plans'} available
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Plans grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {plans.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plans.map(plan => (
                            <div
                                key={plan.id}
                                className={`relative flex flex-col bg-white rounded-2xl shadow-sm border ${
                                    plan.is_popular ? 'border-orange-300 ring-2 ring-orange-200' : 'border-gray-100'
                                } overflow-hidden hover:shadow-lg transition-shadow duration-300`}
                            >
                                {/* Popular badge */}
                                {plan.is_popular && (
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-orange-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-col flex-1 p-6">
                                    {/* Plan name */}
                                    <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>

                                    {/* Data amount - prominent */}
                                    <div className="mt-4 mb-2">
                                        <span className="text-4xl font-bold text-brand-700">{plan.data_amount}</span>
                                        <span className="text-lg text-gray-500 ml-1">{plan.data_unit || 'GB'}</span>
                                    </div>

                                    {/* Duration */}
                                    <p className="text-gray-500">
                                        <svg className="inline w-4 h-4 mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {plan.duration_days} {plan.duration_days === 1 ? 'day' : 'days'} validity
                                    </p>

                                    {/* Features list */}
                                    {plan.features && plan.features.length > 0 && (
                                        <ul className="mt-4 space-y-2">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start text-sm text-gray-600">
                                                    <svg className="w-4 h-4 text-brand-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Price and CTA - pushed to bottom */}
                                    <div className="mt-auto pt-6 border-t border-gray-100" style={{ marginTop: 'auto' }}>
                                        <div className="flex items-end justify-between mb-4">
                                            <div>
                                                <span className="text-3xl font-bold text-gray-900">
                                                    ${parseFloat(plan.price).toFixed(2)}
                                                </span>
                                                <span className="text-gray-500 text-sm ml-1">USD</span>
                                            </div>
                                        </div>
                                        <Link
                                            href={route('plans.show', plan.slug || plan.id)}
                                            className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                                                plan.is_popular
                                                    ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-md hover:shadow-lg'
                                                    : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                                            }`}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">📡</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No plans available yet</h3>
                        <p className="text-gray-500 mb-6">
                            We're working on adding eSIM plans for {country.name}. Check back soon!
                        </p>
                        <Link
                            href={route('countries.index')}
                            className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Browse other countries
                        </Link>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
