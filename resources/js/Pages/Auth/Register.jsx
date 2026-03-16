import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account" />

            <div>
                <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                <p className="mt-2 text-sm text-gray-500">
                    Join thousands of travelers staying connected across Africa.
                </p>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full name
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        className="mt-1.5 block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                        placeholder="John Doe"
                    />
                    <InputError message={errors.name} className="mt-1.5" />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        className="mt-1.5 block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                        placeholder="you@example.com"
                    />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                {/* Password row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            className="mt-1.5 block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                            placeholder="Min. 8 characters"
                        />
                        <InputError message={errors.password} className="mt-1.5" />
                    </div>
                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirm
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            className="mt-1.5 block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                            placeholder="Repeat password"
                        />
                        <InputError message={errors.password_confirmation} className="mt-1.5" />
                    </div>
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-400 leading-relaxed">
                    By creating an account you agree to our{' '}
                    <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>.
                </p>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full flex items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? (
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : (
                        'Create account'
                    )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-gray-400">Already have an account?</span>
                    </div>
                </div>

                {/* Login link */}
                <Link
                    href={route('login')}
                    className="w-full flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:border-gray-300"
                >
                    Sign in instead
                </Link>
            </form>
        </GuestLayout>
    );
}
