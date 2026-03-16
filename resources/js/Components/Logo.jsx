export default function Logo({ className = '', size = 'md' }) {
    const sizes = { sm: 'h-8', md: 'h-10', lg: 'h-14' };
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg viewBox="0 0 40 48" className={sizes[size]} fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SIM card outline with Africa silhouette inside */}
                <rect x="2" y="6" width="36" height="40" rx="3" stroke="#16a34a" strokeWidth="2.5" fill="#f0fdf4"/>
                <polygon points="26,2 38,14 38,6 26,6" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinejoin="round"/>
                {/* Simplified Africa continent shape */}
                <path d="M20 14 C22 13, 25 14, 26 16 C27 18, 26 20, 27 22 C28 24, 27 26, 26 28 C25 30, 24 33, 22 35 C20 37, 18 36, 17 34 C16 32, 14 30, 14 28 C14 26, 15 24, 15 22 C15 20, 14 18, 15 16 C16 14, 18 13, 20 14Z" fill="#16a34a" opacity="0.2" stroke="#16a34a" strokeWidth="1.5"/>
                {/* Signal dots */}
                <circle cx="20" cy="24" r="2" fill="#f97316"/>
                <circle cx="20" cy="24" r="5" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.5"/>
                <circle cx="20" cy="24" r="8" fill="none" stroke="#f97316" strokeWidth="0.7" opacity="0.3"/>
            </svg>
            <span className="font-bold text-xl tracking-tight">
                <span className="text-brand-700">Afri</span>
                <span className="text-sunset-500">SIM</span>
            </span>
        </div>
    );
}
