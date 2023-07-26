import { Account } from "./Account";

export class SavingAccount extends Account{
     depositLimitperYear:number=20000
    constructor(amount:number){
        super(amount)
        this.depositLimitperYear=20000
    }

   
   
}