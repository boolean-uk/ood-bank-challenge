import { Account } from "./Account";

export class CurrentAccount extends Account{
    overdraftLimit=-400
    constructor(amount:number){
        super(amount)
    }
    withdraw(withdraw: number): void {
        var newAmount = this.amount-(withdraw);
        if( newAmount > 0){
            this.amount = newAmount;

        } else if(newAmount>this.overdraftLimit){
                this.amount = newAmount;
        } else{
            throw "";
        }
    }
    changeoverdraftLimit(limit:number):void{
        this.overdraftLimit=limit
    }
}