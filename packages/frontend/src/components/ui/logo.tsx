import logoUrl from "../../../ikapiar.jpg";

export function Logo({ size }: { size?: number}) {
    return (
        size
            ? <img
                src={logoUrl}
                alt="Tawasul logo"
                className={`h-${size} w-${size} rounded-lg mx-auto`}
                loading="eager"
            />
            : <img
                src={logoUrl}
                alt="Tawasul logo"
                className="h-10 w-10 rounded-lg mx-auto"
                loading="eager"
            />
    )
}