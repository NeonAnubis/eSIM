import { Head, useForm, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function CheckoutCreate({ plan }) {
    const { data, setData, post, processing, errors } = useForm({
        plan_id: plan.id,
        payment_method: 'card',
        card_number: '',
        expiry: '',
        cvv: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    const price = parseFloat(plan.price).toFixed(2);

    return (
        <MainLayout>
            <Head title="Checkout" />

            {/* Header */}
            <div className="bg-gradient-to-r from-brand-800 to-brand-600 text-white py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('countries.show', plan.country?.iso_code?.toLowerCase())}
                            className="text-brand-200 hover:text-white transition text-sm"
                        >
                            &larr; Back to plans
                        </Link>
                    </div>
                    <h1 className="mt-3 text-3xl font-bold">Secure Checkout</h1>
                    <p className="mt-1 text-brand-100">Complete your purchase to get instant eSIM access</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Order Summary & Payment */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Order Summary Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="text-4xl">{plan.country?.flag_emoji}</div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                                        <p className="text-sm text-gray-500">{plan.country?.name}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                                                <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                                </svg>
                                                {plan.data_amount}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                                                <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {plan.duration_days} days
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold text-gray-900">${price}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Details Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
                                    <div className="flex items-center gap-2">
                                        {/* Card brand icons */}
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded text-white text-[8px] font-bold flex items-center justify-center">VISA</div>
                                            <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center">
                                                <div className="flex -space-x-1">
                                                    <div className="w-3 h-3 bg-red-600 rounded-full opacity-80"></div>
                                                    <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-80"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Card Number */}
                                    <div>
                                        <label htmlFor="card_number" className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Card Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="card_number"
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                                value={data.card_number}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
                                                    setData('card_number', val);
                                                }}
                                                className="w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 placeholder-gray-400 transition"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.card_number && (
                                            <p className="mt-1 text-sm text-red-600">{errors.card_number}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Expiry */}
                                        <div>
                                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Expiry Date
                                            </label>
                                            <input
                                                id="expiry"
                                                type="text"
                                                placeholder="MM / YY"
                                                maxLength="7"
                                                value={data.expiry}
                                                onChange={(e) => {
                                                    let val = e.target.value.replace(/\D/g, '');
                                                    if (val.length >= 2) {
                                                        val = val.slice(0, 2) + ' / ' + val.slice(2, 4);
                                                    }
                                                    setData('expiry', val);
                                                }}
                                                className="w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 placeholder-gray-400 transition"
                                            />
                                            {errors.expiry && (
                                                <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>
                                            )}
                                        </div>

                                        {/* CVV */}
                                        <div>
                                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1.5">
                                                CVV
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="cvv"
                                                    type="text"
                                                    placeholder="123"
                                                    maxLength="4"
                                                    value={data.cvv}
                                                    onChange={(e) => setData('cvv', e.target.value.replace(/\D/g, ''))}
                                                    className="w-full rounded-xl border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 placeholder-gray-400 transition"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            {errors.cvv && (
                                                <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* General error */}
                                {errors.plan_id && (
                                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                                        {errors.plan_id}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Total & Security */}
                        <div className="space-y-6">
                            {/* Order Total Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Total</h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-900 font-medium">${price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="text-gray-900 font-medium">$0.00</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-3">
                                        <div className="flex justify-between">
                                            <span className="text-base font-semibold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-brand-700">${price}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Complete Purchase Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-white bg-brand-600 rounded-xl shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Complete Purchase - ${price}
                                        </>
                                    )}
                                </button>

                                {/* Security Badges */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-xl">
                                        <div className="flex-shrink-0 w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-brand-800">256-bit SSL Encryption</p>
                                            <p className="text-xs text-brand-600">Your data is fully encrypted</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-xl">
                                        <div className="flex-shrink-0 w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-brand-800">Secure Payment</p>
                                            <p className="text-xs text-brand-600">PCI DSS compliant processing</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-xl">
                                        <div className="flex-shrink-0 w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-brand-800">Money-Back Guarantee</p>
                                            <p className="text-xs text-brand-600">Full refund if not activated</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
