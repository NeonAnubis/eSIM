import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function CheckoutConfirmation({ order }) {
    const item = order.items?.[0];
    const plan = item?.plan;
    const country = plan?.country;
    const esim = item?.esim;

    return (
        <MainLayout>
            <Head title="Order Confirmed" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Success Header */}
                <div className="text-center mb-10">
                    <div className="mx-auto w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Order Confirmed!</h1>
                    <p className="mt-3 text-lg text-gray-500">Your eSIM is ready to be installed</p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                        <span className="text-sm text-gray-500">Order number:</span>
                        <span className="text-sm font-bold text-gray-900">#{order.order_number}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Details */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-4">
                            <div className="text-4xl">{country?.flag_emoji}</div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{plan?.name}</h3>
                                <p className="text-sm text-gray-500">{country?.name}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Data</span>
                                <span className="text-gray-900 font-medium">{plan?.data_amount}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Duration</span>
                                <span className="text-gray-900 font-medium">{plan?.duration_days} days</span>
                            </div>
                            <div className="border-t border-gray-100 pt-3">
                                <div className="flex justify-between">
                                    <span className="text-sm font-semibold text-gray-900">Amount Paid</span>
                                    <span className="text-xl font-bold text-brand-700">
                                        ${parseFloat(order.total).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your eSIM QR Code</h2>

                        <div className="flex justify-center p-6 bg-gray-50 rounded-xl">
                            {esim?.qr_code_data ? (
                                <div
                                    className="w-48 h-48 [&_svg]:w-full [&_svg]:h-full"
                                    dangerouslySetInnerHTML={{ __html: esim.qr_code_data }}
                                />
                            ) : (
                                <div className="w-48 h-48 bg-gray-200 rounded-xl flex items-center justify-center">
                                    <div className="text-center">
                                        <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                        <p className="text-sm text-gray-500">QR code generating...</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {esim?.qr_code_data && (
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => {
                                        const blob = new Blob([esim.qr_code_data], { type: 'image/svg+xml' });
                                        const url = URL.createObjectURL(blob);
                                        window.open(url, '_blank');
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-700 bg-brand-50 rounded-lg hover:bg-brand-100 transition"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download QR Code
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Installation Instructions */}
                <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Installation Instructions</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-white">1</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Open Settings</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Go to <span className="font-medium text-gray-700">Settings &gt; Cellular</span> (or Mobile Data) on your device.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-white">2</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Add eSIM</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Tap <span className="font-medium text-gray-700">Add eSIM</span> or <span className="font-medium text-gray-700">Scan QR Code</span> and scan the code above.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center">
                                <span className="text-sm font-bold text-white">3</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Activate</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Select the data plan and <span className="font-medium text-gray-700">enable data roaming</span> when you arrive at your destination.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compatible Devices */}
                <div className="mt-8 bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Compatible Devices</h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            'iPhone XS and later',
                            'Google Pixel 3 and later',
                            'Samsung Galaxy S20 and later',
                        ].map((device) => (
                            <span
                                key={device}
                                className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg"
                            >
                                {device}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Links */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={route('dashboard.esims')}
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-brand-600 rounded-xl shadow-sm hover:bg-brand-700 transition focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        View My eSIMs
                    </Link>
                    <Link
                        href={route('countries.index')}
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-brand-700 bg-brand-50 rounded-xl hover:bg-brand-100 transition focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Browse More Plans
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
