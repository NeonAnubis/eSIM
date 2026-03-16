import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';

export default function Edit({ mustVerifyEmail, status, stats = {} }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Profile Settings" />

            {/* Profile Header Card */}
            <ProfileHeader user={user} stats={stats} />

            {/* Two-column layout */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - Main settings */}
                <div className="lg:col-span-2 space-y-6">
                    <PersonalInfoSection user={user} mustVerifyEmail={mustVerifyEmail} status={status} />
                    <PasswordSection />
                </div>

                {/* Right column - Side panels */}
                <div className="space-y-6">
                    <AccountOverview user={user} stats={stats} />
                    <DangerZone />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

/* ═══════════════════════════════════════════════
   PROFILE HEADER - Avatar + Banner
═══════════════════════════════════════════════ */
function ProfileHeader({ user, stats }) {
    const fileInput = useRef(null);
    const [dragOver, setDragOver] = useState(false);

    const handleAvatarUpload = (file) => {
        if (!file) return;
        const formData = new FormData();
        formData.append('avatar', file);
        router.post(route('profile.avatar'), formData, {
            forceFormData: true,
        });
    };

    const handleRemoveAvatar = () => {
        router.delete(route('profile.avatar.delete'));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleAvatarUpload(file);
        }
    };

    return (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 overflow-hidden">
            {/* Banner */}
            <div className="h-36 sm:h-44 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.07]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-sunset-500/15 blur-3xl" />
            </div>

            {/* Content below banner */}
            <div className="relative px-6 pb-6">
                {/* Avatar */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 sm:-mt-16">
                    <div
                        className={`relative group cursor-pointer shrink-0 ${dragOver ? 'scale-105' : ''} transition-transform`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInput.current?.click()}
                    >
                        <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl ring-4 ring-white shadow-lg overflow-hidden ${dragOver ? 'ring-brand-400' : ''}`}>
                            {user.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                                    <span className="text-4xl sm:text-5xl font-bold text-white">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="text-center">
                                <svg className="w-6 h-6 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-white text-xs font-medium mt-1 block">Change</span>
                            </div>
                        </div>

                        <input
                            ref={fileInput}
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(e) => handleAvatarUpload(e.target.files[0])}
                        />
                    </div>

                    {/* Name + info */}
                    <div className="flex-1 sm:pb-1">
                        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
                    </div>

                    {/* Avatar action buttons */}
                    <div className="flex items-center gap-2 sm:pb-1">
                        <button
                            type="button"
                            onClick={() => fileInput.current?.click()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-brand-700 bg-brand-50 rounded-xl hover:bg-brand-100 transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Upload Photo
                        </button>
                        {user.avatar_url && (
                            <button
                                type="button"
                                onClick={handleRemoveAvatar}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   PERSONAL INFO SECTION
═══════════════════════════════════════════════ */
function PersonalInfoSection({ user, mustVerifyEmail, status }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50">
                    <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
                    <p className="text-xs text-gray-500">Update your name and email address</p>
                </div>
            </div>

            <form onSubmit={submit} className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name
                        </label>
                        <input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                            className="block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                            placeholder="Your full name"
                        />
                        <InputError className="mt-1.5" message={errors.name} />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                            className="block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                            placeholder="you@example.com"
                        />
                        <InputError className="mt-1.5" message={errors.email} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3">
                        <div className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-amber-800">
                                Your email address is unverified.{' '}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="font-semibold underline hover:text-amber-900"
                                >
                                    Resend verification email
                                </Link>
                            </p>
                        </div>
                        {status === 'verification-link-sent' && (
                            <p className="mt-2 text-sm font-medium text-green-700">
                                A new verification link has been sent to your email.
                            </p>
                        )}
                    </div>
                )}

                <div className="mt-6 flex items-center justify-end gap-3">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveTo="opacity-0"
                    >
                        <span className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Changes saved
                        </span>
                    </Transition>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 rounded-xl shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   PASSWORD SECTION
═══════════════════════════════════════════════ */
function PasswordSection() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Change Password</h2>
                    <p className="text-xs text-gray-500">Use a strong password to secure your account</p>
                </div>
            </div>

            <form onSubmit={submit} className="p-6">
                <div className="space-y-5">
                    <div>
                        <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Current Password
                        </label>
                        <input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            autoComplete="current-password"
                            className="block w-full max-w-md rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                            placeholder="Enter current password"
                        />
                        <InputError message={errors.current_password} className="mt-1.5" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-md sm:max-w-none">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                                New Password
                            </label>
                            <input
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                autoComplete="new-password"
                                className="block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                                placeholder="Min. 8 characters"
                            />
                            <InputError message={errors.password} className="mt-1.5" />
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Confirm New Password
                            </label>
                            <input
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                autoComplete="new-password"
                                className="block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-brand-500 focus:ring-brand-500"
                                placeholder="Repeat new password"
                            />
                            <InputError message={errors.password_confirmation} className="mt-1.5" />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveTo="opacity-0"
                    >
                        <span className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Password updated
                        </span>
                    </Transition>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 rounded-xl shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {processing ? 'Updating...' : 'Update Password'}
                    </button>
                </div>
            </form>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   ACCOUNT OVERVIEW (RIGHT SIDEBAR)
═══════════════════════════════════════════════ */
function AccountOverview({ user, stats }) {
    return (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                </div>
                <h2 className="text-base font-semibold text-gray-900">Account Overview</h2>
            </div>

            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50">
                            <svg className="h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Total Orders</p>
                            <p className="text-xs text-gray-500">Lifetime purchases</p>
                        </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{stats.total_orders || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Active eSIMs</p>
                            <p className="text-xs text-gray-500">Currently usable</p>
                        </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{stats.active_esims || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                            <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Member Since</p>
                            <p className="text-xs text-gray-500">Account created</p>
                        </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{stats.member_since || 'N/A'}</span>
                </div>
            </div>

            <div className="px-6 pb-6">
                <Link
                    href={route('dashboard')}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-brand-700 bg-brand-50 rounded-xl hover:bg-brand-100 transition"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════
   DANGER ZONE
═══════════════════════════════════════════════ */
function DangerZone() {
    const [confirming, setConfirming] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => setConfirming(false),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    return (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-red-200/60 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-red-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                    <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                </div>
                <h2 className="text-base font-semibold text-red-700">Danger Zone</h2>
            </div>

            <div className="p-6">
                <p className="text-sm text-gray-600 leading-relaxed">
                    Permanently delete your account and all associated data including orders and eSIM records. This action cannot be undone.
                </p>
                <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition ring-1 ring-red-200"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Account
                </button>
            </div>

            <Modal show={confirming} onClose={() => { setConfirming(false); clearErrors(); reset(); }}>
                <form onSubmit={submit} className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Delete Account</h2>
                            <p className="text-sm text-gray-500">This action is permanent and irreversible</p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600">
                        All your data including orders, eSIMs, and personal information will be permanently deleted.
                        Please enter your password to confirm.
                    </p>

                    <div className="mt-4">
                        <input
                            type="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="block w-full rounded-xl border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-red-500 focus:ring-red-500"
                            placeholder="Enter your password to confirm"
                            autoFocus
                        />
                        <InputError message={errors.password} className="mt-1.5" />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => { setConfirming(false); clearErrors(); reset(); }}
                            className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white rounded-xl ring-1 ring-gray-300 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl shadow-sm hover:bg-red-700 transition disabled:opacity-50"
                        >
                            {processing ? 'Deleting...' : 'Yes, Delete My Account'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
