
export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly lastname: string,
    ) { }

    getFullName(): string {
        return `${this.name} ${this.lastname}`;
    }
}