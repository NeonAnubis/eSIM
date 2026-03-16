import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';

function FaqItem({ question, answer }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-4 text-left"
            >
                <span className="font-medium text-gray-900">{question}</span>
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && (
                <div className="pb-4 text-gray-600 text-sm leading-relaxed">
                    {answer}
                </div>
            )}
        </div>
    );
}

export default function PlanShow({ plan }) {
    const country = plan.country || {};

    const installSteps = [
        {
            icon: (
                <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Purchase & Receive QR Code',
            description: 'Complete your purchase and receive a QR code via email instantly.',
        },
        {
            icon: (
                <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
            ),
            title: 'Scan QR Code',
            description: 'Open your device settings and scan the QR code to install the eSIM profile.',
        },
        {
            icon: (
                <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Activate & Connect',
            description: 'Enable your eSIM data plan when you arrive at your destination and start browsing.',
        },
    ];

    const faqs = [
        {
            question: 'What is an eSIM?',
            answer: 'An eSIM (embedded SIM) is a digital SIM that allows you to activate a cellular plan without using a physical SIM card. It is built into your device and can be programmed with different carrier profiles.',
        },
        {
            question: 'How do I know if my device supports eSIM?',
            answer: 'Most modern smartphones support eSIM, including iPhone XS and later, Samsung Galaxy S20 and later, Google Pixel 3 and later, and many other devices. Check your device settings for an "Add eSIM" or "Add Cellular Plan" option.',
        },
        {
            question: 'Can I use my regular SIM and eSIM at the same time?',
            answer: 'Yes! Most eSIM-compatible devices support dual SIM functionality, allowing you to keep your regular phone number active while using the eSIM for data. This is perfect for international travel.',
        },
        {
            question: 'When does my plan validity start?',
            answer: 'Your plan validity period begins when you first connect to a network in the destination country, not when you purchase or install the eSIM. This means you can purchase and install before your trip.',
        },
        {
            question: 'What happens if I use all my data?',
            answer: 'Once you exhaust your data allowance, your data connection will stop. You can purchase an additional plan through our platform to continue using data. There are no surprise charges or overage fees.',
        },
        {
            question: 'Can I get a refund?',
            answer: 'Unused eSIM plans are eligible for a refund within 30 days of purchase. Once the eSIM has been activated on a network, it is no longer eligible for a refund. Please contact our support team for assistance.',
        },
    ];

    const compatibleDevices = [
        'iPhone XS / XR and later',
        'Samsung Galaxy S20 and later',
        'Google Pixel 3 and later',
        'iPad Pro (3rd gen) and later',
        'iPad Air (3rd gen) and later',
        'Motorola Razr (2019) and later',
    ];

    return (
        <MainLayout>
            <Head title={`${plan.name} - ${country.name || ''} eSIM`} />

            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <nav className="flex items-center text-sm text-gray-500 space-x-2">
                        <Link href={route('countries.index')} className="hover:text-brand-600 transition-colors">
                            Countries
                        </Link>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {country.iso_code && (
                            <>
                                <Link
                                    href={route('countries.show', country.iso_code.toLowerCase())}
                                    className="hover:text-brand-600 transition-colors"
                                >
                                    {country.flag_emoji} {country.name}
                                </Link>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </>
                        )}
                        <span className="text-gray-900 font-medium">{plan.name}</span>
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                    {/* Left side - Plan details */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-2">
                            {country.flag_emoji && (
                                <span className="text-3xl">{country.flag_emoji}</span>
                            )}
                            <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                                {country.name}
                            </span>
                            {plan.is_popular && (
                                <span className="text-sm font-bold text-white bg-orange-500 px-3 py-1 rounded-full">
                                    Most Popular
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mt-3">{plan.name}</h1>

                        {plan.description && (
                            <p className="text-gray-600 mt-3 text-lg leading-relaxed">{plan.description}</p>
                        )}

                        {/* Plan specs */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-500 mb-1">Data</div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {plan.data_amount} <span className="text-base font-normal text-gray-500">{plan.data_unit || 'GB'}</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-500 mb-1">Validity</div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {plan.duration_days} <span className="text-base font-normal text-gray-500">{plan.duration_days === 1 ? 'day' : 'days'}</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="text-sm text-gray-500 mb-1">Coverage</div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {plan.network_type || '4G/LTE'}
                                </div>
                            </div>
                        </div>

                        {/* What's included */}
                        <div className="mt-10">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h2>
                            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
                                {[
                                    { label: 'Mobile Data', value: `${plan.data_amount} ${plan.data_unit || 'GB'}` },
                                    { label: 'Plan Validity', value: `${plan.duration_days} days` },
                                    { label: 'Network', value: plan.network_type || '4G/LTE' },
                                    { label: 'Activation Policy', value: 'Starts on first connection' },
                                    { label: 'Top-up Available', value: plan.top_up_available ? 'Yes' : 'No' },
                                    { label: 'Hotspot / Tethering', value: plan.hotspot_allowed !== false ? 'Allowed' : 'Not allowed' },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-5 py-3">
                                        <span className="text-gray-600">{item.label}</span>
                                        <span className="font-medium text-gray-900">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        {plan.features && plan.features.length > 0 && (
                            <div className="mt-10">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <svg className="w-5 h-5 text-brand-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right side - Price card */}
                    <div className="mt-8 lg:mt-0">
                        <div className="sticky top-8 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-5 text-white">
                                <p className="text-brand-100 text-sm">Total Price</p>
                                <div className="flex items-end gap-1 mt-1">
                                    <span className="text-4xl font-bold">${parseFloat(plan.price).toFixed(2)}</span>
                                    <span className="text-brand-200 mb-1">USD</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-brand-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Instant delivery via email
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-brand-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        No physical SIM needed
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-brand-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        24/7 customer support
                                    </li>
                                    <li className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-brand-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        No hidden fees
                                    </li>
                                </ul>

                                <Link
                                    href={route('checkout.create', plan.slug || plan.id)}
                                    className="block w-full text-center bg-brand-600 text-white py-3.5 px-6 rounded-xl font-semibold hover:bg-brand-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                                >
                                    Buy Now
                                </Link>

                                <p className="text-center text-xs text-gray-400 mt-3">
                                    Secure payment via Stripe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Installation steps */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">How It Works</h2>
                    <p className="text-gray-500 text-center mb-10">Get connected in three easy steps</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {installSteps.map((step, idx) => (
                            <div key={idx} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-50 rounded-2xl mb-4">
                                    {step.icon}
                                </div>
                                <div className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-2">
                                    Step {idx + 1}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-500 text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compatible devices */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Compatible Devices</h2>
                    <p className="text-gray-500 text-center mb-10">Works with most modern eSIM-enabled devices</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                        {compatibleDevices.map((device, idx) => (
                            <div key={idx} className="flex items-center bg-gray-50 rounded-xl px-5 py-3">
                                <svg className="w-5 h-5 text-brand-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-700 text-sm font-medium">{device}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ accordion */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Frequently Asked Questions</h2>
                    <p className="text-gray-500 text-center mb-10">Everything you need to know about eSIMs</p>
                    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl px-6">
                        {faqs.map((faq, idx) => (
                            <FaqItem key={idx} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
