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

    getBalance() : number{
        return 0;
    }

    addDeposit(deposit: number) {
        throw new Error("Method not implemented.");
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

export class CheckingAccount extends Account{
    
    
    private accountType : string;

    constructor(accountnumber:string){
        super(accountnumber);
        this.setIsOverdraftPossible(true);
        this.accountType = "checking";
    }


    getAccountType(): string {
       return this.accountType;
    }
}

export class Transaction{
    private date : Date;
    private credit : number =0;
    private debit : number = 0;
    private currentBalance : number ;



    constructor(amuountMoney : number, currentBalance : number){
            this.date = new Date();
            this.currentBalance = currentBalance;
            if(amuountMoney > 0){
               this.credit = amuountMoney;
               this.debit =0;
            }else if(amuountMoney < 0){
                this.debit = amuountMoney;
                this.credit = 0
            }
    }
}