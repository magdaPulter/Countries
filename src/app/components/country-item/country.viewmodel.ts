export interface CountryViewModel {
    readonly name: string;
    readonly population: number;
    readonly region: string;
    readonly capital: string;
    readonly borders: string[];
    readonly flags: {
        svg: string,
        png: string
    }
}
