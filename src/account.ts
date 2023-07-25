export class Account {

    private accountNumber : string;
    private isOverdraftPossible: boolean = false;

    constructor(accountnumber:string){
        this.accountNumber = accountnumber;
    }


    setIsOverdraftPossible(isOverdraftPossible : boolean){
        this.isOverdraftPossible = isOverdraftPossible;
    }

    getAccountNumber() : string{
        return this.accountNumber;
    }

}



export class SavingAccount extends Account{
    
    
    private accountType : string;

    constructor(accountnumber:string){
        super(accountnumber);
        this.setIsOverdraftPossible(false);
        this.accountType = "saving";
    }


    getAccountType(): string {
       return this.accountType;
    }
}


export class InvestmentAccount extends Account{
    
    
    private accountType : string;

    constructor(accountnumber:string){
        super(accountnumber);
        this.setIsOverdraftPossible(false);
        this.accountType = "investment";
    }


    getAccountType(): string {
       return this.accountType;
    }
}