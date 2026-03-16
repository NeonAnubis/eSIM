import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ countries }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        country_id: '',
        data_amount: '',
        data_amount_mb: '',
        duration_days: '',
        price: '',
        description: '',
        is_popular: false,
        is_active: true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.plans.store'));
    }

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Create New Plan
                    </h2>
                    <Link
                        href={route('admin.plans.index')}
                        className="text-sm font-medium text-brand-600 hover:text-brand-500"
                    >
                        &larr; Back to Plans
                    </Link>
                </div>
            }
        >
            <Head title="Admin - Create Plan" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <form onSubmit={handleSubmit} className="space-y-6 p-6">
                            {/* Name */}
                            <div>
                                <InputLabel htmlFor="name" value="Plan Name" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="e.g. 5GB 30-Day Plan"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Country */}
                            <div>
                                <InputLabel htmlFor="country_id" value="Country" />
                                <select
                                    id="country_id"
                                    value={data.country_id}
                                    onChange={(e) => setData('country_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                                >
                                    <option value="">Select a country...</option>
                                    {countries && countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.country_id} className="mt-2" />
                            </div>

                            {/* Data Amount & MB */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="data_amount" value="Data Amount (display)" />
                                    <TextInput
                                        id="data_amount"
                                        type="text"
                                        value={data.data_amount}
                                        onChange={(e) => setData('data_amount', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. 5GB"
                                    />
                                    <InputError message={errors.data_amount} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="data_amount_mb" value="Data Amount (MB)" />
                                    <TextInput
                                        id="data_amount_mb"
                                        type="number"
                                        value={data.data_amount_mb}
                                        onChange={(e) => setData('data_amount_mb', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. 5120"
                                    />
                                    <InputError message={errors.data_amount_mb} className="mt-2" />
                                </div>
                            </div>

                            {/* Duration & Price */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="duration_days" value="Duration (days)" />
                                    <TextInput
                                        id="duration_days"
                                        type="number"
                                        value={data.duration_days}
                                        onChange={(e) => setData('duration_days', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. 30"
                                    />
                                    <InputError message={errors.duration_days} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="price" value="Price (USD)" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="e.g. 9.99"
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                                    placeholder="Brief description of the plan..."
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Checkboxes */}
                            <div className="flex items-center gap-6">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_popular}
                                        onChange={(e) => setData('is_popular', e.target.checked)}
                                        className="rounded border-gray-300 text-brand-600 shadow-sm focus:ring-brand-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Mark as Popular</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-gray-300 text-brand-600 shadow-sm focus:ring-brand-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Active</span>
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
                                <Link
                                    href={route('admin.plans.index')}
                                    className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create Plan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
