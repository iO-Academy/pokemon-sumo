export function capitaliseFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

export type weightUnits = 'kg' | 'lb'

export function formatWeight(value: number, format: weightUnits): string {
    let message: string = ''
    // the weight from pokeAPI is stored in hectograms
    if (format === 'kg') {
        const kgValue = value * 0.1;
        message = kgValue.toFixed(1) + ' kg';
    }
    if (format === 'lb') {
        const rawOunces = value * 3.527396195;
        let pounds = Math.floor(rawOunces * 0.0625);
        let ounces = Math.round(rawOunces % 16);
        if (ounces === 16) {
            pounds += 1;
            ounces = 0;
        }
        message = `${pounds} lbs`
        if (ounces > 0) { message += ` ${ounces} oz`;}
    }
    return message;
}
