import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ users }) {
    const roleBadge = {
        admin: 'bg-purple-100 text-purple-800',
        customer: 'bg-blue-100 text-blue-800',
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage Users
                </h2>
            }
        >
            <Head title="Admin - Users" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Role</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Orders</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {users.data && users.data.length > 0 ? (
                                        users.data.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {user.email}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                                                    <span className={'inline-flex rounded-full px-2 text-xs font-semibold leading-5 ' + (roleBadge[user.role] || 'bg-gray-100 text-gray-800')}>
                                                        {user.role || 'customer'}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                                                    {user.orders_count ?? 0}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {users.links && users.links.length > 3 && (
                            <div className="border-t border-gray-200 px-6 py-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{users.from}</span> to{' '}
                                        <span className="font-medium">{users.to}</span> of{' '}
                                        <span className="font-medium">{users.total}</span> results
                                    </p>
                                    <div className="flex gap-1">
                                        {users.links.map((link, index) => (
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
