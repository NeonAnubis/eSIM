import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';

export default function Home({ popularPlans = [], countries = [], stats = {}, heroQrCode = '' }) {
    return (
        <MainLayout>
            <Head title="Stay Connected Across Africa" />

            {/* ════════════════════════════════════════════
                HERO SECTION
            ════════════════════════════════════════════ */}
            <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-[0.07]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-sm text-brand-200 mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunset-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sunset-500"></span>
                                </span>
                                Now available in 10+ African countries
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                                Stay Connected{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-sunset-400">
                                    Across Africa
                                </span>
                            </h1>

                            <p className="mt-6 text-lg sm:text-xl text-brand-200 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Purchase eSIM data plans for 10+ African countries. Activate instantly with a QR code scan. No physical SIM card needed.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/countries"
                                    className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-brand-900 bg-white rounded-xl shadow-lg shadow-brand-950/30 hover:bg-brand-50 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-900"
                                >
                                    Browse Plans
                                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <a
                                    href="#how-it-works"
                                    className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white border-2 border-white/20 rounded-xl hover:bg-white/10 transition backdrop-blur"
                                >
                                    How It Works
                                </a>
                            </div>
                        </div>

                        {/* Phone mockup with QR */}
                        <div className="hidden lg:flex justify-center">
                            <div className="relative">
                                {/* Glow */}
                                <div className="absolute -inset-8 bg-gradient-to-tr from-brand-400/20 to-sunset-500/20 blur-3xl rounded-full" />

                                {/* Phone frame */}
                                <div className="relative w-64 h-[500px] bg-gray-900 rounded-[3rem] border-4 border-gray-700 shadow-2xl overflow-hidden">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10" />

                                    {/* Screen content */}
                                    <div className="absolute inset-2 rounded-[2.3rem] bg-white overflow-hidden flex flex-col">
                                        {/* Status bar */}
                                        <div className="h-12 bg-brand-600 flex items-end justify-center pb-1">
                                            <span className="text-white text-xs font-semibold tracking-wide">AfriSIM</span>
                                        </div>

                                        {/* QR code area */}
                                        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 bg-gradient-to-b from-brand-50 to-white">
                                            <p className="text-xs font-medium text-brand-700 mb-3">Scan to activate</p>
                                            {/* Real QR code */}
                                            <div className="w-36 h-36 bg-white rounded-xl shadow-md p-3 border border-brand-100">
                                                {heroQrCode ? (
                                                    <div
                                                        className="w-full h-full [&_svg]:w-full [&_svg]:h-full"
                                                        dangerouslySetInnerHTML={{ __html: heroQrCode }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse" />
                                                )}
                                            </div>

                                            <div className="mt-4 text-center">
                                                <p className="text-sm font-bold text-brand-800">Kenya 5GB</p>
                                                <p className="text-xs text-gray-500 mt-1">30 days &middot; 4G LTE</p>
                                            </div>

                                            {/* Animated scanning line */}
                                            <div className="mt-3 w-32 h-0.5 bg-gradient-to-r from-transparent via-sunset-500 to-transparent rounded-full animate-pulse" />
                                        </div>

                                        {/* Bottom bar */}
                                        <div className="h-14 bg-brand-600 flex items-center justify-center gap-1">
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 60V20C240 0 480 40 720 30C960 20 1200 0 1440 20V60H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                STATS BAR
            ════════════════════════════════════════════ */}
            <section className="py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            {
                                icon: (
                                    <svg className="h-7 w-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                value: stats.countries || '10+',
                                label: 'Countries',
                            },
                            {
                                icon: (
                                    <svg className="h-7 w-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                ),
                                value: stats.plans || '40+',
                                label: 'Data Plans',
                            },
                            {
                                icon: (
                                    <svg className="h-7 w-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                value: 'Instant',
                                label: 'Activation',
                            },
                            {
                                icon: (
                                    <svg className="h-7 w-7 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ),
                                value: '24/7',
                                label: 'Support',
                            },
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-center gap-4 p-4 rounded-xl bg-brand-50/60 border border-brand-100">
                                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-white shadow-sm">
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-brand-900">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                HOW IT WORKS
            ════════════════════════════════════════════ */}
            <section id="how-it-works" className="py-16 sm:py-20 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Get Online in <span className="text-brand-600">3 Simple Steps</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            No store visits, no waiting. Get connected in minutes.
                        </p>
                    </div>

                    <div className="mt-14 grid md:grid-cols-3 gap-8 lg:gap-12 relative">
                        {/* Connector line (desktop) */}
                        <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200" />

                        {[
                            {
                                step: '1',
                                title: 'Choose Your Destination',
                                desc: 'Pick your African destination and select the data plan that fits your needs and travel duration.',
                                icon: (
                                    <svg className="h-8 w-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                            },
                            {
                                step: '2',
                                title: 'Complete Purchase',
                                desc: 'Secure checkout with multiple payment options. Your eSIM QR code is delivered instantly to your email.',
                                icon: (
                                    <svg className="h-8 w-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                ),
                            },
                            {
                                step: '3',
                                title: 'Scan & Connect',
                                desc: 'Scan the QR code with your phone, follow the simple setup, and get online immediately upon arrival.',
                                icon: (
                                    <svg className="h-8 w-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ),
                            },
                        ].map((item) => (
                            <div key={item.step} className="relative flex flex-col items-center text-center">
                                {/* Step number */}
                                <div className="relative z-10 w-14 h-14 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-brand-600/30 ring-4 ring-white">
                                    {item.step}
                                </div>

                                {/* Card */}
                                <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full hover:shadow-md transition-shadow">
                                    <div className="mx-auto w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                POPULAR PLANS
            ════════════════════════════════════════════ */}
            {popularPlans.length > 0 && (
                <section className="py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Popular Plans</h2>
                                <p className="mt-2 text-lg text-gray-600">Our best-selling data plans for Africa</p>
                            </div>
                            <Link
                                href="/countries"
                                className="inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition"
                            >
                                View all plans
                                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {popularPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100/50 transition-all duration-200"
                                >
                                    {plan.is_popular && (
                                        <div className="absolute -top-3 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sunset-500 text-white shadow-sm">
                                            Popular
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl">{plan.country?.flag_emoji || '🌍'}</span>
                                        <div>
                                            <p className="font-semibold text-gray-900">{plan.country?.name || 'Africa'}</p>
                                            <p className="text-xs text-gray-500">{plan.network_type || '4G LTE'}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <span className="text-3xl font-extrabold text-brand-900">{plan.data_amount}</span>
                                        <span className="text-lg font-medium text-gray-500 ml-1">{plan.data_unit || 'GB'}</span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                                        <span className="flex items-center gap-1">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {plan.duration_days} days
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-brand-700">
                                            ${Number(plan.price).toFixed(2)}
                                        </span>
                                        <Link
                                            href={`/checkout/${plan.slug}`}
                                            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition shadow-sm"
                                        >
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════
                COUNTRIES
            ════════════════════════════════════════════ */}
            {countries.length > 0 && (
                <section className="py-16 sm:py-20 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                                Available <span className="text-brand-600">Destinations</span>
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Choose from our growing list of African countries with reliable eSIM coverage.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {countries.map((country) => (
                                <Link
                                    key={country.id}
                                    href={`/countries/${country.iso_code?.toLowerCase()}`}
                                    className="group flex flex-col items-center p-5 bg-white rounded-2xl border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all duration-200"
                                >
                                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
                                        {country.flag_emoji || '🌍'}
                                    </span>
                                    <p className="font-semibold text-gray-900 text-sm text-center">{country.name}</p>
                                    {country.min_price && (
                                        <p className="mt-1 text-xs text-brand-600 font-medium">
                                            from ${Number(country.min_price).toFixed(2)}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-10 text-center">
                            <Link
                                href="/countries"
                                className="inline-flex items-center px-6 py-3 text-sm font-semibold text-brand-700 bg-brand-50 rounded-xl hover:bg-brand-100 transition border border-brand-200"
                            >
                                View All Countries
                                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ════════════════════════════════════════════
                WHY CHOOSE AFRISIM
            ════════════════════════════════════════════ */}
            <section className="py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            Why Choose <span className="text-brand-600">AfriSIM</span>?
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            We make staying connected in Africa simple, affordable, and reliable.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                title: 'No Physical SIM Needed',
                                desc: 'Download your eSIM digitally. No need to find a store, swap SIM cards, or worry about losing your home number.',
                                icon: (
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ),
                                color: 'brand',
                            },
                            {
                                title: 'Instant Activation',
                                desc: 'Receive your eSIM QR code immediately after purchase. Scan it, follow the quick setup, and you are online.',
                                icon: (
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                color: 'sunset',
                            },
                            {
                                title: 'Affordable Rates',
                                desc: 'Competitive pricing across all destinations. No hidden fees, no surprise charges. Pay only for what you need.',
                                icon: (
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                color: 'brand',
                            },
                            {
                                title: '24/7 Support',
                                desc: 'Our dedicated support team is available around the clock to help you with any questions or issues.',
                                icon: (
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ),
                                color: 'sunset',
                            },
                            {
                                title: 'Multiple Countries',
                                desc: 'One platform for all your African travel needs. Easily switch between destinations without any hassle.',
                                icon: (
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ),
                                color: 'brand',
                            },
                            {
                                title: 'Secure Payments',
                                desc: 'Industry-standard encryption keeps your payment data safe. We support cards, mobile money, and more.',
                                icon: (
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                color: 'sunset',
                            },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="group p-6 rounded-2xl bg-white border border-gray-200 hover:border-brand-200 hover:shadow-md transition-all duration-200"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                                    feature.color === 'sunset'
                                        ? 'bg-orange-50 text-sunset-500'
                                        : 'bg-brand-50 text-brand-600'
                                }`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════
                CTA SECTION
            ════════════════════════════════════════════ */}
            <section className="bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-sunset-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            Ready to Stay Connected?
                        </h2>
                        <p className="mt-4 text-lg text-brand-200">
                            Join thousands of travelers who trust AfriSIM for reliable mobile data across Africa.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/countries"
                                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-brand-900 bg-white rounded-xl shadow-lg hover:bg-brand-50 transition"
                            >
                                Browse Plans
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
