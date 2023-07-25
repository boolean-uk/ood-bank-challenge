export class Banking {
    private balance: number = 100;

    getBalance(): number {
        return this.balance;
    }

    setBalance(): void {
        this.balance += 5;
    }

    withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    deposit(amount: number): boolean {
        if (amount > 0) {
            this.balance += amount;
            return true;
        }
        return false;
    }
}