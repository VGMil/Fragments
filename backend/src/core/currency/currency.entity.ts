export class Currency {
    constructor(
        public readonly id: number,
        public readonly code: string,
        public readonly name: string,
        public readonly isTradable: boolean,
    ) { }

    getCurrencyDetails(): string {
        return `${this.name} (${this.code}) ${this.isTradable ? 'Tradable' : 'No tradable'}`;
    }
}