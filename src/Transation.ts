export class Transaction{
    amount:number
    dateTime:Date
    type: 'DEBIT' | 'CREDIT'
    constructor(amount:number,type:'DEBIT' | 'CREDIT'){
        this.amount=amount
        this.type=type
        this.dateTime=new Date()
    }
    
}
