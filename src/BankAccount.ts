
export interface BankAccount {
    getBalance(): number
    withdraw(): boolean
    deposit(): void
    getOverdraft(): boolean
    generateStatement(): void
}