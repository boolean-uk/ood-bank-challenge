import { Account } from "./Account";

export class SavingAccount extends Account{
    constructor(amount:number){
        super(amount)
    }
    withdraw(withdraw: number): void {
        var newAmount=this.amount-(withdraw);
        if(newAmount>0){
        this.amount=newAmount;
        }else{
            throw "";
        }
    }
}