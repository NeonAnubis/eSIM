import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const statusConfig = {
    active: { bg: 'bg-green-50', text: 'text-green-700', ring: 'ring-green-600/20', dot: 'bg-green-500', label: 'Active' },
    inactive: { bg: 'bg-gray-50', text: 'text-gray-600', ring: 'ring-gray-500/20', dot: 'bg-gray-400', label: 'Inactive' },
    expired: { bg: 'bg-red-50', text: 'text-red-700', ring: 'ring-red-600/20', dot: 'bg-red-500', label: 'Expired' },
    installed: { bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-600/20', dot: 'bg-blue-500', label: 'Installed' },
};

const filterOptions = [
    { key: 'All', icon: null },
    { key: 'Active', icon: 'bg-green-500' },
    { key: 'Expired', icon: 'bg-red-500' },
];

export default function Esims({ esims = [] }) {
    const [filter, setFilter] = useState('All');
    const [expandedQr, setExpandedQr] = useState(null);

    const filteredEsims = filter === 'All'
        ? esims
        : esims.filter((esim) => esim.status?.toLowerCase() === filter.toLowerCase());

    const activeCount = esims.filter(e => e.status === 'active').length;
    const expiredCount = esims.filter(e => e.status === 'expired').length;

    return (
        <AuthenticatedLayout>
            <Head title="My eSIMs" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My eSIMs</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your eSIM profiles and scan QR codes to install.</p>
                </div>
                <Link
                    href={route('countries.index')}
                    className="inline-flex items-center gap-2 self-start rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Buy New eSIM
                </Link>
            </div>

            {esims.length > 0 ? (
                <>
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/60">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total</p>
                            <p className="mt-1 text-2xl font-bold text-gray-900">{esims.length}</p>
                        </div>
                        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/60">
                            <p className="text-xs font-medium text-green-600 uppercase tracking-wider">Active</p>
                            <p className="mt-1 text-2xl font-bold text-green-700">{activeCount}</p>
                        </div>
                        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200/60">
                            <p className="text-xs font-medium text-red-500 uppercase tracking-wider">Expired</p>
                            <p className="mt-1 text-2xl font-bold text-red-600">{expiredCount}</p>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="mb-6">
                        <div className="inline-flex rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-200/60">
                            {filterOptions.map(({ key, icon }) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key)}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                                        filter === key
                                            ? 'bg-brand-600 text-white shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    {icon && (
                                        <span className={`h-2 w-2 rounded-full ${filter === key ? 'bg-white/70' : icon}`} />
                                    )}
                                    {key}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* eSIM Cards */}
                    {filteredEsims.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {filteredEsims.map((esim) => (
                                <EsimCard
                                    key={esim.id}
                                    esim={esim}
                                    isQrExpanded={expandedQr === esim.id}
                                    onToggleQr={() => setExpandedQr(expandedQr === esim.id ? null : esim.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white py-12 text-center shadow-sm ring-1 ring-gray-200/60">
                            <svg className="mx-auto h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                            </svg>
                            <p className="mt-3 text-sm text-gray-500">No eSIMs match the "{filter}" filter.</p>
                            <button
                                onClick={() => setFilter('All')}
                                className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700 transition"
                            >
                                Show all eSIMs
                            </button>
                        </div>
                    )}
                </>
            ) : (
                /* Empty State */
                <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 overflow-hidden">
                    <div className="px-6 py-16 sm:py-20 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50">
                            <svg className="h-10 w-10 text-brand-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                            </svg>
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-gray-900">No eSIMs yet</h3>
                        <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
                            Purchase your first eSIM data plan to stay connected across Africa. Setup takes less than 2 minutes.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href={route('countries.index')}
                                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Browse Countries
                            </Link>
                        </div>

                        {/* How it works mini */}
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-left">
                            {[
                                { step: '1', title: 'Choose a plan', desc: 'Pick your destination and data amount' },
                                { step: '2', title: 'Get QR code', desc: 'Receive your eSIM instantly after payment' },
                                { step: '3', title: 'Scan & go', desc: 'Install on your phone and connect' },
                            ].map((item) => (
                                <div key={item.step} className="flex items-start gap-3">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                                        {item.step}
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

/* ═══════════════════════════════════════════════
   eSIM CARD
═══════════════════════════════════════════════ */
function EsimCard({ esim, isQrExpanded, onToggleQr }) {
    const plan = esim.order_item?.plan;
    const country = plan?.country;
    const sc = statusConfig[esim.status] || statusConfig.inactive;

    const isActive = esim.status === 'active';
    const expiresAt = esim.expires_at ? new Date(esim.expires_at) : null;
    const daysLeft = expiresAt ? Math.max(0, Math.ceil((expiresAt - new Date()) / (1000 * 60 * 60 * 24))) : null;

    return (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60 overflow-hidden transition-all hover:shadow-md">
            {/* Top color bar */}
            <div className={`h-1.5 ${isActive ? 'bg-gradient-to-r from-brand-500 to-brand-600' : esim.status === 'expired' ? 'bg-gradient-to-r from-red-400 to-red-500' : 'bg-gray-300'}`} />

            <div className="p-5 sm:p-6">
                {/* Header: Country + Status */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl ring-1 ring-gray-100">
                            {country?.flag_emoji || '🌍'}
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-base font-semibold text-gray-900 truncate">
                                {country?.name || 'Unknown'}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">{plan?.name || 'eSIM Plan'}</p>
                        </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${sc.bg} ${sc.text} ${sc.ring}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                        {sc.label}
                    </span>
                </div>

                {/* Plan Details Grid */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <DetailItem
                        label="Data"
                        value={plan?.data_amount || '—'}
                        icon={
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                        }
                    />
                    <DetailItem
                        label="Duration"
                        value={plan?.duration_days ? `${plan.duration_days} days` : '—'}
                        icon={
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                    />
                    {daysLeft !== null && (
                        <DetailItem
                            label={isActive ? 'Remaining' : 'Expired'}
                            value={isActive ? `${daysLeft} days` : 'Ended'}
                            icon={
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            }
                            highlight={isActive && daysLeft <= 3}
                        />
                    )}
                </div>

                {/* ICCID */}
                <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">ICCID</p>
                            <p className="mt-0.5 font-mono text-xs text-gray-700 truncate" title={esim.iccid}>
                                {esim.iccid}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(esim.iccid);
                            }}
                            className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-white hover:text-gray-600 hover:shadow-sm transition"
                            title="Copy ICCID"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* QR Code Toggle */}
                {esim.qr_code_data && (
                    <div className="mt-4">
                        <button
                            onClick={onToggleQr}
                            className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                            {isQrExpanded ? 'Hide QR Code' : 'Show QR Code'}
                            <svg className={`h-4 w-4 text-gray-400 transition-transform ${isQrExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Expanded QR code */}
                        {isQrExpanded && (
                            <div className="mt-4 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 p-6">
                                <div className="flex justify-center">
                                    <div
                                        className="w-48 h-48 sm:w-56 sm:h-56 [&_svg]:w-full [&_svg]:h-full"
                                        dangerouslySetInnerHTML={{ __html: esim.qr_code_data }}
                                    />
                                </div>
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    Scan this QR code in your phone's eSIM settings to install
                                </p>

                                {/* Action buttons under QR */}
                                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
                                    <button
                                        onClick={() => {
                                            const blob = new Blob([esim.qr_code_data], { type: 'image/svg+xml' });
                                            const url = URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = `esim-${country?.name || 'qr'}-${esim.iccid.slice(-6)}.svg`;
                                            a.click();
                                            URL.revokeObjectURL(url);
                                        }}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100 transition w-full sm:w-auto justify-center"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download QR
                                    </button>
                                    {esim.activation_code && (
                                        <button
                                            onClick={() => navigator.clipboard.writeText(esim.activation_code)}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition w-full sm:w-auto justify-center"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy Activation Code
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* View Order link */}
                {esim.order_item?.order_id && (
                    <div className="mt-4">
                        <Link
                            href={route('dashboard.orders.show', esim.order_item.order_id)}
                            className="flex items-center justify-center gap-2 w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Order Details
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

function DetailItem({ label, value, icon, highlight = false }) {
    return (
        <div className={`rounded-lg px-3 py-2.5 ${highlight ? 'bg-red-50 ring-1 ring-red-100' : 'bg-gray-50'}`}>
            <div className={`flex items-center gap-1.5 ${highlight ? 'text-red-500' : 'text-gray-400'}`}>
                {icon}
                <span className={`text-[10px] font-medium uppercase tracking-wider ${highlight ? 'text-red-500' : 'text-gray-400'}`}>
                    {label}
                </span>
            </div>
            <p className={`mt-1 text-sm font-semibold ${highlight ? 'text-red-700' : 'text-gray-900'}`}>
                {value}
            </p>
        </div>
    );
}
