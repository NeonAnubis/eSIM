import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recentOrders }) {
    const statCards = [
        {
            label: 'Total Users',
            value: stats.totalUsers,
            icon: (
                <svg className="h-8 w-8 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
            ),
            bg: 'bg-brand-50',
        },
        {
            label: 'Total Orders',
            value: stats.totalOrders,
            icon: (
                <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
            ),
            bg: 'bg-blue-50',
        },
        {
            label: 'Total Revenue',
            value: '$' + Number(stats.totalRevenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            icon: (
                <svg className="h-8 w-8 text-sunset-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            ),
            bg: 'bg-orange-50',
        },
        {
            label: 'Active eSIMs',
            value: stats.activeEsims,
            icon: (
                <svg className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                </svg>
            ),
            bg: 'bg-purple-50',
        },
    ];

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        failed: 'bg-red-100 text-red-800',
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((card) => (
                            <div
                                key={card.label}
                                className="overflow-hidden rounded-lg bg-white shadow"
                            >
                                <div className="p-5">
                                    <div className="flex items-center">
                                        <div className={'flex-shrink-0 rounded-lg p-3 ' + card.bg}>
                                            {card.icon}
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                            <dl>
                                                <dt className="truncate text-sm font-medium text-gray-500">
                                                    {card.label}
                                                </dt>
                                                <dd className="text-2xl font-bold text-gray-900">
                                                    {card.value}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Links */}
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <Link
                            href={route('admin.orders.index')}
                            className="flex items-center rounded-lg bg-white p-5 shadow transition hover:shadow-md"
                        >
                            <div className="rounded-lg bg-blue-50 p-3">
                                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-semibold text-gray-900">Manage Orders</p>
                                <p className="text-xs text-gray-500">View and update orders</p>
                            </div>
                        </Link>
                        <Link
                            href={route('admin.plans.index')}
                            className="flex items-center rounded-lg bg-white p-5 shadow transition hover:shadow-md"
                        >
                            <div className="rounded-lg bg-brand-50 p-3">
                                <svg className="h-6 w-6 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-semibold text-gray-900">Manage Plans</p>
                                <p className="text-xs text-gray-500">Add and edit eSIM plans</p>
                            </div>
                        </Link>
                        <Link
                            href={route('admin.users.index')}
                            className="flex items-center rounded-lg bg-white p-5 shadow transition hover:shadow-md"
                        >
                            <div className="rounded-lg bg-purple-50 p-3">
                                <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-semibold text-gray-900">Manage Users</p>
                                <p className="text-xs text-gray-500">View user accounts</p>
                            </div>
                        </Link>
                    </div>

                    {/* Recent Orders */}
                    <div className="mt-8">
                        <div className="overflow-hidden rounded-lg bg-white shadow">
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                                <Link
                                    href={route('admin.orders.index')}
                                    className="text-sm font-medium text-brand-600 hover:text-brand-500"
                                >
                                    View all
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order #</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Customer</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {recentOrders && recentOrders.length > 0 ? (
                                            recentOrders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50">
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                        <Link
                                                            href={route('admin.orders.show', order.id)}
                                                            className="text-brand-600 hover:text-brand-500"
                                                        >
                                                            #{order.order_number}
                                                        </Link>
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
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                                                    No orders yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
