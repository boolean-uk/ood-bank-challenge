export class Account{
    amount:number
    constructor(amount:number){
        this.amount=amount
    }
    deposit(deposit:number):void{
        this.amount+= (deposit)
    }
    withdraw(withdraw:number):void{
        var newAmount=this.amount-(withdraw);
        if(newAmount>0){
        this.amount=newAmount;
        }else{
            throw "";
        }
    }
}