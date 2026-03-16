import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ orders }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        failed: 'bg-red-100 text-red-800',
    };

    function handleSearch(e) {
        e.preventDefault();
        router.get(route('admin.orders.index'), { search, status: statusFilter }, { preserveState: true });
    }

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage Orders
                </h2>
            }
        >
            <Head title="Admin - Orders" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        {/* Search & Filter Bar */}
                        <div className="border-b border-gray-200 px-6 py-4">
                            <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search by order number or customer..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-brand-500 focus:ring-brand-500"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="rounded-md border-gray-300 text-sm shadow-sm focus:border-brand-500 focus:ring-brand-500"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="failed">Failed</option>
                                    </select>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order #</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Total</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {orders.data && orders.data.length > 0 ? (
                                        orders.data.map((order) => (
                                            <tr key={order.id} className="hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    #{order.order_number}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {order.user?.name || 'N/A'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    <span className={'inline-flex rounded-full px-2 text-xs font-semibold leading-5 ' + (statusColors[order.status] || 'bg-gray-100 text-gray-800')}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                                                    ${Number(order.total).toFixed(2)}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                    <Link
                                                        href={route('admin.orders.show', order.id)}
                                                        className="font-medium text-brand-600 hover:text-brand-500"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                                                No orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {orders.links && orders.links.length > 3 && (
                            <div className="border-t border-gray-200 px-6 py-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{orders.from}</span> to{' '}
                                        <span className="font-medium">{orders.to}</span> of{' '}
                                        <span className="font-medium">{orders.total}</span> results
                                    </p>
                                    <div className="flex gap-1">
                                        {orders.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={
                                                    'inline-flex items-center rounded-md px-3 py-1.5 text-sm ' +
                                                    (link.active
                                                        ? 'bg-brand-600 font-semibold text-white'
                                                        : link.url
                                                          ? 'bg-white font-medium text-gray-700 hover:bg-gray-50'
                                                          : 'cursor-default bg-white text-gray-400')
                                                }
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                preserveState
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
