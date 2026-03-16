import Logo from '@/Components/Logo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const sidebarLinks = [
    {
        label: 'Dashboard',
        route: 'dashboard',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        ),
    },
    {
        label: 'My Orders',
        route: 'dashboard.orders',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
        ),
    },
    {
        label: 'My eSIMs',
        route: 'dashboard.esims',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            </svg>
        ),
    },
    {
        label: 'Profile',
        route: 'profile.edit',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
    },
];

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ─── Mobile sidebar overlay ─── */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl">
                        <SidebarContent user={user} onClose={() => setSidebarOpen(false)} />
                    </aside>
                </div>
            )}

            {/* ─── Desktop sidebar ─── */}
            <aside className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col bg-white border-r border-gray-200">
                    <SidebarContent user={user} />
                </div>
            </aside>

            {/* ─── Main area ─── */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-gray-200 bg-white/95 backdrop-blur px-4 sm:px-6 lg:px-8">
                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden -ml-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Page title area */}
                    <div className="flex-1" />

                    {/* Browse plans link */}
                    <Link
                        href={route('countries.index')}
                        className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100 transition"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Browse Plans
                    </Link>

                    {/* User dropdown */}
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-gray-50">
                                    {user.avatar_url ? (
                                        <img src={user.avatar_url} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                                    ) : (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white text-xs font-bold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="hidden sm:block font-medium text-gray-700">{user.name}</span>
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile Settings
                                </Dropdown.Link>
                                <Dropdown.Link href={route('home')}>
                                    Back to Website
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Sign Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Page content */}
                <main className="py-8 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarContent({ user, onClose }) {
    const currentRoute = route().current();

    return (
        <>
            {/* Logo + close */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5">
                <Link href="/">
                    <Logo size="md" />
                </Link>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition lg:hidden"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {sidebarLinks.map((link) => {
                    const isActive = currentRoute === link.route;
                    return (
                        <Link
                            key={link.route}
                            href={route(link.route)}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                                isActive
                                    ? 'bg-brand-50 text-brand-700 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <span className={isActive ? 'text-brand-600' : 'text-gray-400'}>
                                {link.icon}
                            </span>
                            {link.label}
                            {isActive && (
                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom user card */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-3">
                    {user.avatar_url ? (
                        <img src={user.avatar_url} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white text-sm font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
