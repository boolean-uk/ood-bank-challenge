// backend.ts

class Banking {
    private balance: number = 0;

    getBalance(): number {
        return this.balance;
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

export const bankingInstance = new Banking();