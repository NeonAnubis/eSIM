import Logo from '@/Components/Logo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Countries', href: '/countries' },
        { label: 'How It Works', href: '/#how-it-works' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* ─── Header ─── */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="shrink-0">
                            <Logo size="md" />
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition hover:text-brand-700 hover:bg-brand-50"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop auth */}
                        <div className="hidden md:flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-lg shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition hover:text-brand-700 hover:bg-brand-50"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-brand-600 rounded-lg shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden transition-all duration-200 ease-in-out overflow-hidden ${mobileOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'}`}>
                    <div className="px-4 py-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-3 py-2 text-base font-medium text-gray-700 rounded-lg hover:text-brand-700 hover:bg-brand-50 transition"
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-3 mt-3 border-t border-gray-100 space-y-1">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="block px-3 py-2 text-base font-semibold text-brand-700 rounded-lg hover:bg-brand-50 transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="block px-3 py-2 text-base font-medium text-gray-700 rounded-lg hover:bg-brand-50 transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="block px-3 py-2 text-base font-semibold text-white bg-brand-600 rounded-lg text-center hover:bg-brand-700 transition"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* ─── Main Content ─── */}
            <main className="flex-1">{children}</main>

            {/* ─── Footer ─── */}
            <footer className="bg-brand-900 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {/* About */}
                        <div>
                            <Logo size="md" className="[&_span]:text-white [&_rect]:stroke-white [&_path]:stroke-white [&_circle]:fill-sunset-400 [&_circle]:stroke-sunset-400" />
                            <p className="mt-4 text-sm text-brand-200 leading-relaxed">
                                AfriSIM provides affordable eSIM data plans for travelers across Africa.
                                Stay connected with instant activation and reliable coverage.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300">Quick Links</h3>
                            <ul className="mt-4 space-y-2.5">
                                {[
                                    { label: 'All Countries', href: '/countries' },
                                    { label: 'Data Plans', href: '/countries' },
                                    { label: 'About Us', href: '/#about' },
                                    { label: 'Blog', href: '/blog' },
                                ].map((link) => (
                                    <li key={link.href + link.label}>
                                        <Link href={link.href} className="text-sm text-brand-200 hover:text-white transition">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300">Support</h3>
                            <ul className="mt-4 space-y-2.5">
                                {[
                                    { label: 'FAQ', href: '/faq' },
                                    { label: 'Contact Us', href: '/contact' },
                                    { label: 'Installation Guide', href: '/installation' },
                                    { label: 'Compatibility', href: '/compatibility' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-brand-200 hover:text-white transition">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300">Stay Updated</h3>
                            <p className="mt-4 text-sm text-brand-200">Get the latest deals and travel tips delivered to your inbox.</p>
                            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 min-w-0 rounded-lg border-0 bg-brand-800 px-3 py-2 text-sm text-white placeholder-brand-400 focus:ring-2 focus:ring-sunset-500"
                                />
                                <button
                                    type="submit"
                                    className="shrink-0 rounded-lg bg-sunset-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sunset-600 transition focus:outline-none focus:ring-2 focus:ring-sunset-500 focus:ring-offset-2 focus:ring-offset-brand-900"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-12 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-brand-400">&copy; {new Date().getFullYear()} AfriSIM. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="text-sm text-brand-400 hover:text-white transition">Privacy Policy</Link>
                            <Link href="/terms" className="text-sm text-brand-400 hover:text-white transition">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
