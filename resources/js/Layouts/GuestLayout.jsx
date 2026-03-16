import Logo from '@/Components/Logo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            {/* ─── Left panel: branding ─── */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                {/* Decorative circles */}
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-600/20 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-sunset-500/10 blur-3xl" />

                <div className="relative flex flex-col justify-between w-full p-12">
                    {/* Logo */}
                    <Link href="/">
                        <Logo size="lg" className="[&_span]:text-white [&_rect]:stroke-white [&_path]:stroke-white [&_circle]:fill-sunset-400 [&_circle]:stroke-sunset-400" />
                    </Link>

                    {/* Center content */}
                    <div className="max-w-md">
                        <h1 className="text-4xl font-bold text-white leading-tight">
                            Stay Connected{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-sunset-400">
                                Across Africa
                            </span>
                        </h1>
                        <p className="mt-5 text-lg text-brand-200 leading-relaxed">
                            Purchase eSIM data plans for 10+ African countries.
                            Activate instantly with a QR code scan. No physical SIM card needed.
                        </p>

                        {/* Feature pills */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            {['Instant Activation', '10+ Countries', '24/7 Support', 'Secure Payments'].map((f) => (
                                <span
                                    key={f}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm text-brand-100"
                                >
                                    <svg className="h-3.5 w-3.5 text-sunset-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {f}
                                </span>
                            ))}
                        </div>

                        {/* Phone mockup mini */}
                        <div className="mt-10 flex items-center gap-4">
                            <div className="w-16 h-28 rounded-xl bg-white/10 backdrop-blur border border-white/20 p-1.5 shadow-lg">
                                <div className="w-full h-full rounded-lg bg-white/90 flex items-center justify-center">
                                    <div className="w-8 h-8 grid grid-cols-3 grid-rows-3 gap-0.5">
                                        {[1,1,1,1,0,1,1,1,1].map((c, i) => (
                                            <div key={i} className={`rounded-[1px] ${c ? 'bg-brand-800' : 'bg-transparent'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">Scan & Connect</p>
                                <p className="text-xs text-brand-300 mt-0.5">Get online in under 2 minutes</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <p className="text-sm text-brand-400">
                        &copy; {new Date().getFullYear()} AfriSIM. All rights reserved.
                    </p>
                </div>
            </div>

            {/* ─── Right panel: form ─── */}
            <div className="flex w-full lg:w-1/2 flex-col">
                {/* Mobile logo header */}
                <div className="lg:hidden flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <Link href="/">
                        <Logo size="md" />
                    </Link>
                    <Link
                        href="/"
                        className="text-sm font-medium text-gray-500 hover:text-gray-700 transition"
                    >
                        Back to home
                    </Link>
                </div>

                {/* Form area */}
                <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
