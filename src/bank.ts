export class NormalAccount {
    balance:number
    transactions:Transaction[]
    constructor()
    {
        this.balance=0
        this.transactions=[];
    }
 }

 export class Transaction {
    date:Date
    amount:number
    constructor(date:Date,amount:number)
    {
        this.date=date
        this.amount =amount
    }
 }