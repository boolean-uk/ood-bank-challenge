import { CurrentAccount } from "./CurrentAccount";
import { SavingAccount } from "./SavingAccount";
import { Transaction } from "./Transation";

export class Bank{
    currentAccount:CurrentAccount
    savingAccount:SavingAccount
    transactions:Transaction[]
    constructor(){
        this.currentAccount=new CurrentAccount(0)
        this.savingAccount=new SavingAccount(0)
        this.transactions=[]
    }
    getCurrentAccount():CurrentAccount{
        return this.currentAccount
    }
    getSavingAccount():SavingAccount{
        return this.savingAccount
    }
    setSavingAccount(number:number):void{
        if(number>0){
            this.savingAccount.deposit(number)
        }else{
            this.savingAccount.withdraw(Math.abs(number))
        }
    }
    setCurrentAccount(number:number):void{
        if(number>0){
            this.currentAccount.deposit(number)
        }else{
            this.currentAccount.withdraw(Math.abs(number))
        }
    }
    makeNewTransaction(amount:number,type:'DEBIT' | 'CREDIT'):string{
        this.transactions.push(new Transaction(amount, type));
        if(type==('CREDIT')){
            this.setSavingAccount(amount);
        }else{
            this.setCurrentAccount(amount);
        }

      return this.generateTransactionsSummary(this.transactions);
    }
    getBalance():number{
        return this.getCurrentAccount().amount + (this.getSavingAccount().amount)
    }

    generateTransactionsSummary(transaction:Transaction[]): string {
       // const format = "%-15s|| %-15s|| %-15s|| %-15s\n";
        const sb = new StringBuilder();
        sb.append(`${"date"} - ${"DEBIT"} | ${"CREDIT"} | ${"blance"}\n`)
    
        const reversed = transaction.reverse()//[...this.transactions].reverse();
        let amount: number = 0;
        let balance: number = this.savingAccount.amount + (this.currentAccount.amount);
    
        for (const t of reversed) {
         // const date = t.dateTime.toISOString().split('T')[0];
          const date=this.formatDateToDDMMYYYY(t.dateTime)
          const type = t.type;
          let amountD: number|null =null;
          let amountC: number|null =null;
    
          if (type == 'DEBIT') {
            amountD = t.amount;
          } else {
            amountC = t.amount;
          }
    
          sb.append(this.formatString(date, amountD, amountC , balance-(amount)));
          amount = t.amount;
        }
    
        return sb.toString().replace(/null/g, " ".repeat(4));
      }

    generateTransactionsSummaryBetweenDates(startDate:Date,endDate:Date):string{
        let transaction:Transaction[]=[];
        for (const t of this.transactions) {
            if(t.dateTime >= startDate && t.dateTime <= endDate){
                transaction.push(t)
            }
        }
        return this.generateTransactionsSummary(transaction)
    }

//     generateTransactionsSummary(transactions:Transaction[]):string{

//         const format = "%-15s|| %-15s|| %-15s|| %-15s\n";
//         let output = "";

//   // Create an array of transactions in reversed order
//         const reversed: Transaction[] = [...transactions].reverse();

//         let amount: number = 0;
//         let balance: number = this.getSavingAccount().amount + (this.getCurrentAccount().amount);

//         for (const t of reversed) {
//             const date = this.formatDateToDDMMYYYY(t.dateTime)//t.dateTime.toISOString().split('T')[0]; // Get the date part from dateTime
//             let amountD: number | null = null;
//             let amountC: number | null = null;

//             if (t.type === 'DEBIT') {
//             amountD = t.amount;
//             } else {
//             amountC = t.amount;
//             }

//     // Format and append the output to the 'output' string
//             output += this.formatString(format, date, amountD || "", amountC || "", balance - (amount));

//             amount = t.amount;
//         }

//         return output.replace(/null/g, " ".repeat(4));
//     }

    formatDateToDDMMYYYY(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
        const year = date.getFullYear().toString();
      
        return `${day}/${month}/${year}`;
    }
    
     formatString(date: string, num1: number|null, num2: number|null, num3: number|null): string {
        //const formattedDate = date.toISOString().split('T')[0];
        return `${date} - ${num1} | ${num2} | ${num3} \n`;
      }
     
}
class StringBuilder {
    private content: string[] = [];
  
    append(text: string): void {
      this.content.push(text);
    }
  
    toString(): string {
      return this.content.join("");
    }
  }