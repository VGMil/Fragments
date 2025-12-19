export class Wallet {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly currencyId: number,
        public readonly balance: number,
    ) { }

    public getWalletDetails(): String {
        return `${this.id} - ${this.userId} - ${this.currencyId} - ${this.balance}`;
    }
}
