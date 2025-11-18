export function unformatRut(value: string): string {
    if (!value) return '';
    return value.replace(/[^0-9kK]/g, '');
}

export function formatRutUtil(value: string): string {
    const raw = unformatRut(value).toUpperCase();
    if (!raw) return '';

    if (raw.length === 1) {
        return raw;
    }

    const body = raw.slice(0, -1);
    const dv = raw.slice(-1);

    const bodyWithDots = body
        .split('')
        .reverse()
        .join('')
        .replace(/(\d{3})(?=\d)/g, '$1.')
        .split('')
        .reverse()
        .join('');

    return `${bodyWithDots}-${dv}`;
}

export function computeRutDV(body: string | number): string {
    const bodyStr = String(body).replace(/\D/g, '');
    if (!bodyStr) return '';

    let sum = 0;
    let multiplier = 2;

    for (let i = bodyStr.length - 1; i >= 0; i--) {
        sum += parseInt(bodyStr[i], 10) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const rest = 11 - (sum % 11);
    if (rest === 11) return '0';
    if (rest === 10) return 'K';
    return String(rest);
}

export function isValidRut(value: string): boolean {
    const raw = unformatRut(value).toUpperCase();

    if (!/^\d+[0-9K]$/.test(raw)) return false;

    const body = raw.slice(0, -1);
    const dv = raw.slice(-1);

    if (!body || Number(body) === 0) return false;

    const expectedDV = computeRutDV(body);
    return dv === expectedDV;
}
