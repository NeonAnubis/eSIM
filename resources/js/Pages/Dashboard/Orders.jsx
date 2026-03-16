import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
};

function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div className="inline-flex -space-x-px rounded-md shadow-sm">
                    {links.map((link, index) => {
                        if (!link.url && !link.active) {
                            return (
                                <span
                                    key={index}
                                    className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                                    link.active
                                        ? 'z-10 border-indigo-500 bg-indigo-50 text-indigo-600'
                                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                preserveScroll
                            />
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

export default function Orders({ orders }) {
    const { data = [], links = [] } = orders || {};

    return (
        <AuthenticatedLayout>
            <Head title="My Orders" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                <p className="mt-1 text-sm text-gray-500">View and track all your eSIM purchases.</p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60">
                        {data.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order #</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Items</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Total</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {data.map((order) => {
                                                const itemsSummary = (order.items || []).map((item) => {
                                                    const country = item.plan?.country?.name || 'Unknown';
                                                    return country;
                                                }).join(', ');

                                                return (
                                                    <tr key={order.id} className="hover:bg-gray-50">
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                            {order.order_number}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            {new Date(order.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500">
                                                            <span className="max-w-xs truncate block">
                                                                {itemsSummary || 'N/A'}
                                                            </span>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                                            ${parseFloat(order.total).toFixed(2)}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                            <Link
                                                                href={route('dashboard.orders.show', order.id)}
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                View Details
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination links={links} />
                            </>
                        ) : (
                            <div className="px-6 py-12 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <h3 className="mt-4 text-sm font-semibold text-gray-900">No orders yet</h3>
                                <p className="mt-1 text-sm text-gray-500">Get started by browsing our eSIM plans.</p>
                                <div className="mt-6">
                                    <Link
                                        href={route('countries.index')}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                    >
                                        Browse Plans
                                    </Link>
                                </div>
                            </div>
                        )}
            </div>
        </AuthenticatedLayout>
    );
}
