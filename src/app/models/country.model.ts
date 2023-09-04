export interface CountryModel {
    readonly name: string;
    readonly population: number;
    readonly region: string;
    readonly capital: string;
    readonly borders: string[];
    readonly nativeName: string;
    readonly subregion: string;
    readonly flags: {
        svg: string,
        png: string
    }
}
