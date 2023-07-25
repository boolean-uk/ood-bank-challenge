export interface Transaction {
  type: Operation,
  balance: number,
  balanceBefore: number,
  balanceAfter: number,
  date: Date
}


export enum Operation {
  deposit = 'Deposit', withdraw = 'Withdraw'
}
