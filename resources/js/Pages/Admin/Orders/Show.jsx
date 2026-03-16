import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ order }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        failed: 'bg-red-100 text-red-800',
    };

    function handleStatusUpdate(e) {
        e.preventDefault();
        patch(route('admin.orders.updateStatus', order.id));
    }

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Order #{order.order_number}
                    </h2>
                    <Link
                        href={route('admin.orders.index')}
                        className="text-sm font-medium text-brand-600 hover:text-brand-500"
                    >
                        &larr; Back to Orders
                    </Link>
                </div>
            }
        >
            <Head title={`Admin - Order #${order.order_number}`} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Order Info */}
                        <div className="lg:col-span-2">
                            {/* Order Summary */}
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                                </div>
                                <div className="px-6 py-4">
                                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Order Number</dt>
                                            <dd className="mt-1 text-sm text-gray-900">#{order.order_number}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                            <dd className="mt-1">
                                                <span className={'inline-flex rounded-full px-2 text-xs font-semibold leading-5 ' + (statusColors[order.status] || 'bg-gray-100 text-gray-800')}>
                                                    {order.status}
                                                </span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Date</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {new Date(order.created_at).toLocaleString()}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Total</dt>
                                            <dd className="mt-1 text-sm font-semibold text-gray-900">
                                                ${Number(order.total).toFixed(2)}
                                            </dd>
                                        </div>
                                        {order.payment_method && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                                                <dd className="mt-1 text-sm text-gray-900 capitalize">{order.payment_method}</dd>
                                            </div>
                                        )}
                                        {order.payment_id && (
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Payment ID</dt>
                                                <dd className="mt-1 text-sm text-gray-900 font-mono text-xs">{order.payment_id}</dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Plan</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Country</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Data</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Duration</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {order.items && order.items.length > 0 ? (
                                                order.items.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                            {item.plan?.name || 'N/A'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {item.plan?.country?.name || 'N/A'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {item.plan?.data_amount || 'N/A'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {item.plan?.duration_days ? item.plan.duration_days + ' days' : 'N/A'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                                                            ${Number(item.price).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                                                        No items found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* eSIM Details */}
                            {order.items && order.items.some((item) => item.esim) && (
                                <div className="mt-6 overflow-hidden rounded-lg bg-white shadow">
                                    <div className="border-b border-gray-200 px-6 py-4">
                                        <h3 className="text-lg font-semibold text-gray-900">eSIM Details</h3>
                                    </div>
                                    <div className="divide-y divide-gray-200">
                                        {order.items
                                            .filter((item) => item.esim)
                                            .map((item) => (
                                                <div key={item.id} className="px-6 py-4">
                                                    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                        <div>
                                                            <dt className="text-sm font-medium text-gray-500">ICCID</dt>
                                                            <dd className="mt-1 font-mono text-xs text-gray-900">{item.esim.iccid}</dd>
                                                        </div>
                                                        {item.esim.smdp_address && (
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500">SM-DP+ Address</dt>
                                                                <dd className="mt-1 font-mono text-xs text-gray-900">{item.esim.smdp_address}</dd>
                                                            </div>
                                                        )}
                                                        {item.esim.activation_code && (
                                                            <div>
                                                                <dt className="text-sm font-medium text-gray-500">Activation Code</dt>
                                                                <dd className="mt-1 font-mono text-xs text-gray-900">{item.esim.activation_code}</dd>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <dt className="text-sm font-medium text-gray-500">Status</dt>
                                                            <dd className="mt-1">
                                                                <span className={'inline-flex rounded-full px-2 text-xs font-semibold leading-5 ' + (item.esim.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')}>
                                                                    {item.esim.status}
                                                                </span>
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Customer Info */}
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Customer</h3>
                                </div>
                                <div className="px-6 py-4">
                                    {order.user ? (
                                        <div className="space-y-3">
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{order.user.name}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                <dd className="mt-1 text-sm text-gray-900">{order.user.email}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm font-medium text-gray-500">Joined</dt>
                                                <dd className="mt-1 text-sm text-gray-900">
                                                    {new Date(order.user.created_at).toLocaleDateString()}
                                                </dd>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">Customer data unavailable.</p>
                                    )}
                                </div>
                            </div>

                            {/* Update Status */}
                            <div className="overflow-hidden rounded-lg bg-white shadow">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Update Status</h3>
                                </div>
                                <div className="px-6 py-4">
                                    <form onSubmit={handleStatusUpdate}>
                                        <div>
                                            <select
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-brand-500 focus:ring-brand-500"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                                <option value="failed">Failed</option>
                                            </select>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="mt-3 w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
                                        >
                                            {processing ? 'Saving...' : 'Save Status'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
