import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ plans }) {
    function handleDelete(plan) {
        if (confirm(`Are you sure you want to delete "${plan.name}"?`)) {
            router.delete(route('admin.plans.destroy', plan.id));
        }
    }

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Manage Plans
                    </h2>
                    <Link
                        href={route('admin.plans.create')}
                        className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                    >
                        <svg className="-ml-0.5 mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Plan
                    </Link>
                </div>
            }
        >
            <Head title="Admin - Plans" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Country</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Data</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Duration</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {plans && plans.length > 0 ? (
                                        plans.map((plan) => (
                                            <tr key={plan.id} className="hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    <div className="flex items-center">
                                                        {plan.name}
                                                        {plan.is_popular ? (
                                                            <span className="ml-2 inline-flex rounded-full bg-sunset-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                                                Popular
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {plan.country?.name || 'N/A'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {plan.data_amount}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                    {plan.duration_days} days
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900">
                                                    ${Number(plan.price).toFixed(2)}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-center text-sm">
                                                    {plan.is_active ? (
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-600">
                                                            Inactive
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <Link
                                                            href={route('admin.plans.edit', plan.id)}
                                                            className="font-medium text-brand-600 hover:text-brand-500"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(plan)}
                                                            className="font-medium text-red-600 hover:text-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-8 text-center text-sm text-gray-500">
                                                No plans found. Create your first plan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
