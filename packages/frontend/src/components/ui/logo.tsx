import logoUrl from "../../../ikapiar.jpg";

export function Logo({ size, className: className }: { size?: number, className?: string }) {
    return (
        size
            ? <img
                src={logoUrl}
                alt="Tawasul logo"
                className={`h-${size} w-${size} rounded-lg ${className || ''}`}
                loading="eager"
            />
            : <img
                src={logoUrl}
                alt="Tawasul logo"
                className={`h-10 w-10 rounded-lg ${className || ''}`}
                loading="eager"
            />
    )
}