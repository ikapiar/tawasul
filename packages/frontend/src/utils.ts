/**
 * Groups elements of an iterable based on a selector function.
 * * @template T - The type of elements in the iterable.
 * @template K - The type of the key (string, number, or symbol).
 */
export function groupBy<T, K extends PropertyKey>(
    iterable: Iterable<T>,
    callbackFn: (element: T, index: number) => K
): Partial<Record<K, T[]>> {
    // 1. Create a null-prototype object to avoid key collisions
    const result = Object.create(null);

    let index = 0;
    for (const element of iterable) {
        const key = callbackFn(element, index);

        // 2. Safe property access
        if (result[key] === undefined) {
            result[key] = [];
        }

        result[key].push(element);
        index++;
    }

    return result;
}

export const BaseColors = ['blue', 'green', 'purple', 'pink', 'yellow', 'orange'] as const
export type BaseColor = typeof BaseColors[number]

// Standard "Deep" Base Colors
const COLOR_MAP: Record<BaseColor, string> = {
    blue: '#1E40AF',
    green: '#15803D',
    purple: '#7E22CE',
    pink: '#BE185D',
    yellow: '#A16207',
    orange: '#C2410C',
};

/**
 * Helper: Parse Hex to RGB
 */
function hexToRgb(hex: string) {
    const cleanHex = hex.replace('#', '');
    const bigint = parseInt(cleanHex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

/**
 * Helper: Convert RGB to Hex
 */
function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (c: number) => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generates a gradient of hex color codes based on a base color.
 * @param baseColor - The base color for the gradient.
 * @param howManyColors - The number of colors to generate.
 * @param lightnessCap - (Optional) 0.0 to 1.0. Limits how light the final color gets.
 * The default is 0.7 (very light tint, but not white).
 * If set to 1.0, the last color will be White.
 * @returns An array of hex color codes.
 */
export function generateGradientHexes(
    baseColor: BaseColor,
    howManyColors: number,
    lightnessCap: number = 0.7
): string[] {
    if (howManyColors < 1) return [];

    const startHex = COLOR_MAP[baseColor];
    const startRgb = hexToRgb(startHex);
    const gradient: string[] = [];

    for (let i = 0; i < howManyColors; i++) {
        // 1. Calculate normalized step (0 to 1)
        const step = howManyColors > 1 ? i / (howManyColors - 1) : 0;

        // 2. Apply the cap.
        // If step is 1 (last item) and cap is 0.9, the mix factor becomes 0.9.
        const mixFactor = step * lightnessCap;

        // 3. Interpolate towards White (255) based on the mixed factor
        const r = startRgb.r + (255 - startRgb.r) * mixFactor;
        const g = startRgb.g + (255 - startRgb.g) * mixFactor;
        const b = startRgb.b + (255 - startRgb.b) * mixFactor;

        gradient.push(rgbToHex(r, g, b));
    }

    return gradient;
}

// ordered by darkest to lightest
export function generateLabeledGradientHexes<T extends string>(baseColor: BaseColor, howManyColors: number, labels: T[]): {label: T, color: string}[] {
    return labels.map((label, i) => ({label, color: generateGradientHexes(baseColor, howManyColors)[i]}))
}