import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
};

const esimStatusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    expired: 'bg-red-100 text-red-800',
    installed: 'bg-blue-100 text-blue-800',
};

export default function OrderShow({ order }) {
    return (
        <AuthenticatedLayout>
            <Head title={`Order ${order.order_number}`} />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <Link
                        href={route('dashboard.orders')}
                        className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition mb-2"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Orders
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Order {order.order_number}</h1>
                </div>
            </div>

            <div>
                    {/* Order Header */}
                    <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
                        <div className="px-6 py-5">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Order #{order.order_number}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                                <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {(order.items || []).map((item, index) => (
                                <div key={item.id || index} className="px-6 py-5">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-gray-900">
                                                {item.plan?.name || 'eSIM Plan'}
                                            </h4>
                                            <div className="mt-1 space-y-1 text-sm text-gray-500">
                                                {item.plan?.country && (
                                                    <p>
                                                        <span className="font-medium">Country:</span>{' '}
                                                        {item.plan.country.emoji && (
                                                            <span className="mr-1">{item.plan.country.emoji}</span>
                                                        )}
                                                        {item.plan.country.name}
                                                    </p>
                                                )}
                                                {item.plan?.data && (
                                                    <p>
                                                        <span className="font-medium">Data:</span>{' '}
                                                        {item.plan.data}
                                                    </p>
                                                )}
                                                {item.plan?.duration && (
                                                    <p>
                                                        <span className="font-medium">Duration:</span>{' '}
                                                        {item.plan.duration} days
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-gray-900">
                                                ${parseFloat(item.unit_price || item.total_price || 0).toFixed(2)}
                                            </p>
                                            {item.quantity > 1 && (
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* eSIM Details */}
                                    {item.esim && (
                                        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5 overflow-hidden">
                                            <h5 className="mb-4 text-sm font-semibold text-gray-700">eSIM Details</h5>
                                            <div className="flex flex-col sm:flex-row gap-5">
                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <dl className="space-y-3">
                                                        <div>
                                                            <dt className="text-xs font-medium text-gray-500">ICCID</dt>
                                                            <dd className="mt-0.5 font-mono text-sm text-gray-900 break-all">{item.esim.iccid}</dd>
                                                        </div>
                                                        <div>
                                                            <dt className="text-xs font-medium text-gray-500">Status</dt>
                                                            <dd className="mt-0.5">
                                                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${esimStatusColors[item.esim.status] || 'bg-gray-100 text-gray-800'}`}>
                                                                    {item.esim.status}
                                                                </span>
                                                            </dd>
                                                        </div>
                                                        {item.esim.activation_code && (
                                                            <div>
                                                                <dt className="text-xs font-medium text-gray-500">Activation Code</dt>
                                                                <dd className="mt-0.5 break-all font-mono text-xs text-gray-900">
                                                                    {item.esim.activation_code}
                                                                </dd>
                                                            </div>
                                                        )}
                                                    </dl>
                                                </div>
                                                {/* QR Code */}
                                                {item.esim.qr_code_data && (
                                                    <div className="flex justify-center sm:justify-end shrink-0">
                                                        <div className="w-40 h-40 rounded-lg bg-white p-2 shadow-sm border border-gray-100">
                                                            <div
                                                                className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_svg]:block"
                                                                dangerouslySetInnerHTML={{ __html: item.esim.qr_code_data }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Installation Instructions */}
                    {order.status === 'completed' && (
                        <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
                            <div className="border-b border-gray-200 px-6 py-4">
                                <h3 className="text-lg font-semibold text-gray-900">Installation Instructions</h3>
                            </div>
                            <div className="px-6 py-5">
                                <ol className="list-decimal space-y-3 pl-5 text-sm text-gray-700">
                                    <li>
                                        <strong>Scan the QR Code:</strong> Go to your device Settings &gt; Cellular/Mobile Data &gt; Add eSIM &gt; Scan QR Code. Point your camera at the QR code shown above.
                                    </li>
                                    <li>
                                        <strong>Manual Entry (alternative):</strong> If scanning doesn't work, select "Enter Details Manually" and type in the activation code provided above.
                                    </li>
                                    <li>
                                        <strong>Label your eSIM:</strong> Give it a recognizable name (e.g., "AfriSIM Travel Data").
                                    </li>
                                    <li>
                                        <strong>Enable Data Roaming:</strong> Go to Settings &gt; Cellular &gt; select your new eSIM &gt; turn on Data Roaming.
                                    </li>
                                    <li>
                                        <strong>Select for Data:</strong> Set the new eSIM as your data line when you arrive at your destination.
                                    </li>
                                </ol>
                                <div className="mt-4 rounded-md bg-amber-50 p-3">
                                    <p className="text-sm text-amber-800">
                                        <strong>Important:</strong> Install your eSIM before traveling. You need a Wi-Fi or cellular connection to complete the installation. The eSIM data plan activates when you first connect to a network at your destination.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Payment Details */}
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
                        </div>
                        <div className="px-6 py-5">
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                {order.payment_method && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                                        <dd className="mt-1 text-sm capitalize text-gray-900">{order.payment_method}</dd>
                                    </div>
                                )}
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Amount</dt>
                                    <dd className="mt-1 text-sm font-semibold text-gray-900">
                                        ${parseFloat(order.total).toFixed(2)}
                                    </dd>
                                </div>
                                {order.paid_at && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Paid On</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {new Date(order.paid_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </dd>
                                    </div>
                                )}
                                {order.currency && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Currency</dt>
                                        <dd className="mt-1 text-sm uppercase text-gray-900">{order.currency}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}
