import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

const statusColors = {
    completed: 'bg-green-50 text-green-700 ring-green-600/20',
    pending: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    processing: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    failed: 'bg-red-50 text-red-700 ring-red-600/20',
    refunded: 'bg-gray-50 text-gray-700 ring-gray-600/20',
};

export default function Dashboard({ orders = [], stats = {} }) {
    const user = usePage().props.auth.user;
    const { total_orders = 0, active_esims = 0, total_spent = 0 } = stats;
    const recentOrders = orders.slice(0, 5);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Welcome banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 p-6 sm:p-8 mb-8">
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-sunset-500/15 blur-3xl" />
                <div className="relative">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                Welcome back, {user.name}!
                            </h1>
                            <p className="mt-1.5 text-brand-200 text-sm sm:text-base">
                                Here's what's happening with your eSIM account.
                            </p>
                        </div>
                        <Link
                            href={route('countries.index')}
                            className="inline-flex items-center gap-2 self-start rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Buy New eSIM
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                <StatCard
                    label="Total Orders"
                    value={total_orders}
                    change="+0 this month"
                    color="indigo"
                    icon={
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    }
                />
                <StatCard
                    label="Active eSIMs"
                    value={active_esims}
                    change="Ready to use"
                    color="green"
                    icon={
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                        </svg>
                    }
                />
                <StatCard
                    label="Total Spent"
                    value={`$${parseFloat(total_spent).toFixed(2)}`}
                    change="Lifetime"
                    color="amber"
                    icon={
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders - takes 2 cols */}
                <div className="lg:col-span-2 rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60">
                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                        <h3 className="text-base font-semibold text-gray-900">Recent Orders</h3>
                        {orders.length > 0 && (
                            <Link
                                href={route('dashboard.orders')}
                                className="text-sm font-medium text-brand-600 hover:text-brand-700 transition"
                            >
                                View all
                            </Link>
                        )}
                    </div>

                    {recentOrders.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {recentOrders.map((order) => (
                                <Link
                                    key={order.id}
                                    href={route('dashboard.orders.show', order.id)}
                                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{order.order_number}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset capitalize ${statusColors[order.status] || 'bg-gray-50 text-gray-700 ring-gray-600/20'}`}>
                                            {order.status}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-900">
                                            ${parseFloat(order.total).toFixed(2)}
                                        </span>
                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="px-6 py-14 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                <svg className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-sm font-semibold text-gray-900">No orders yet</h3>
                            <p className="mt-1 text-sm text-gray-500">Purchase your first eSIM to get connected.</p>
                            <Link
                                href={route('countries.index')}
                                className="mt-5 inline-flex items-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition"
                            >
                                Browse eSIM Plans
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right column - Quick Actions + Installation Guide */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 p-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <QuickAction
                                href={route('countries.index')}
                                icon={
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                    </svg>
                                }
                                label="Browse Plans"
                                desc="Find the right eSIM for your trip"
                                color="brand"
                            />
                            <QuickAction
                                href={route('dashboard.esims')}
                                icon={
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                    </svg>
                                }
                                label="My eSIMs"
                                desc="View active eSIM profiles"
                                color="green"
                            />
                            <QuickAction
                                href={route('profile.edit')}
                                icon={
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                }
                                label="Settings"
                                desc="Manage your account"
                                color="gray"
                            />
                        </div>
                    </div>

                    {/* Installation Guide Card */}
                    <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-white shadow-sm ring-1 ring-brand-100 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100">
                                <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-brand-900">How to Install</h3>
                        </div>
                        <ol className="space-y-2.5 text-sm text-brand-700">
                            <li className="flex gap-2.5">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white mt-0.5">1</span>
                                <span>Go to Settings &rarr; Cellular &rarr; Add eSIM</span>
                            </li>
                            <li className="flex gap-2.5">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white mt-0.5">2</span>
                                <span>Scan the QR code from your order</span>
                            </li>
                            <li className="flex gap-2.5">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white mt-0.5">3</span>
                                <span>Enable data roaming and connect!</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ label, value, change, color, icon }) {
    const colorMap = {
        indigo: 'bg-indigo-50 text-indigo-600',
        green: 'bg-green-50 text-green-600',
        amber: 'bg-amber-50 text-amber-600',
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/60">
            <div className="flex items-center justify-between">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorMap[color]}`}>
                    {icon}
                </div>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-900">{value}</p>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
            <p className="mt-0.5 text-xs text-gray-400">{change}</p>
        </div>
    );
}

function QuickAction({ href, icon, label, desc, color }) {
    const colorMap = {
        brand: 'bg-brand-50 text-brand-600 group-hover:bg-brand-100',
        green: 'bg-green-50 text-green-600 group-hover:bg-green-100',
        gray: 'bg-gray-100 text-gray-600 group-hover:bg-gray-200',
    };

    return (
        <Link
            href={href}
            className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-gray-50"
        >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${colorMap[color]}`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-500 truncate">{desc}</p>
            </div>
            <svg className="h-4 w-4 text-gray-300 group-hover:text-gray-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
        </Link>
    );
}
