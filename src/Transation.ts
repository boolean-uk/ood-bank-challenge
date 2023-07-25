export class Transaction{
    amount:number
    dateTime:Date
    type: accountType
    constructor(amount:number,type:accountType){
        this.amount=amount
        this.type=type
        this.dateTime=new Date()
    }
    
}
export enum accountType{
        DEBET,
        CREDIT
}