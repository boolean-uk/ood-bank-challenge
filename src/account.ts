import { Transaction } from "./transaction";

export class Account{
    private transactions: Transaction[] = []

    deposit(date:Date, amount:number): void{

    }

    withdraw(date:Date, amount:number): void{

    }

    getBalance(): number {
        return -1;
    }

    getBalanceBetween(startDate: Date, endDate: Date): number{
        return -1;
    }

    getTransactions(): Transaction[] {
        return this.transactions;
      }

}

export class BankStatement{
    account: Account;
    constructor(account: Account) {
        this.account = account;
      }

    printStatement(): string{
        return ""
    }
}