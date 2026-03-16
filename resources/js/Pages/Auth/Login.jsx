import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Sign In" />

            <div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                <p className="mt-2 text-sm text-gray-500">
                    Sign in to your account to manage your eSIMs and orders.
                </p>
            </div>

            {status && (
                <div className="mt-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-8 space-y-5">
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
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1.5 block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                        placeholder="you@example.com"
                    />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-medium text-brand-600 hover:text-brand-700 transition"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        className="mt-1.5 block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                        placeholder="Enter your password"
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                    <input
                        id="remember"
                        type="checkbox"
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                        Keep me signed in
                    </label>
                </div>

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
                        'Sign in'
                    )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-gray-400">New to AfriSIM?</span>
                    </div>
                </div>

                {/* Register link */}
                <Link
                    href={route('register')}
                    className="w-full flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 hover:border-gray-300"
                >
                    Create an account
                </Link>
            </form>
        </GuestLayout>
    );
}
