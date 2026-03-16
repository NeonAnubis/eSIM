import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children, header }) {
    const { url } = usePage();

    const links = [
        {
            name: 'Dashboard',
            href: route('admin.dashboard'),
            active: url.startsWith('/admin') && !url.includes('/orders') && !url.includes('/plans') && !url.includes('/users'),
        },
        {
            name: 'Orders',
            href: route('admin.orders.index'),
            active: url.includes('/admin/orders'),
        },
        {
            name: 'Plans',
            href: route('admin.plans.index'),
            active: url.includes('/admin/plans'),
        },
        {
            name: 'Users',
            href: route('admin.users.index'),
            active: url.includes('/admin/users'),
        },
    ];

    return (
        <AuthenticatedLayout header={header}>
            <div className="bg-gray-900 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-12 items-center justify-between">
                        <div className="flex items-center space-x-1">
                            <span className="mr-4 flex items-center rounded bg-brand-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                                Admin Panel
                            </span>
                            <nav className="hidden space-x-1 sm:flex">
                                {links.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={
                                            'rounded-md px-3 py-2 text-sm font-medium transition duration-150 ease-in-out ' +
                                            (link.active
                                                ? 'bg-brand-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white')
                                        }
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Mobile nav */}
                    <div className="flex space-x-1 overflow-x-auto pb-2 sm:hidden">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={
                                    'whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition ' +
                                    (link.active
                                        ? 'bg-brand-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white')
                                }
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div>{children}</div>
        </AuthenticatedLayout>
    );
}
