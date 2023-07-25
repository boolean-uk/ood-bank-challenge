export class NormalAccount {
    balance:number
    transactions:Transaction[]
    debit:number
    constructor()
    {
        this.balance=0
        this.transactions=[];
        this.debit =-500
    }

    deposit(amount:number) {
        if(amount>0)
        {
            this.balance += amount
        }
    }
    withdraw(amount:number)
    {
        if(amount>0)
        {
            if(this.balance- amount>=this.debit)
            {
                this.balance-=amount
            }
        }
    }
 }

 export class Transaction {
    date:number
    amount:number
    transactionType:boolean
    constructor(amount:number,transactionType:boolean)
    {
        this.date=Date.now()
        this.amount =amount
        this.transactionType=transactionType
    }
 }