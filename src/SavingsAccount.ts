// import { Account } from './Account'
// import { LocalDateTime } from 'js-joda';

// export class SavingsAccount extends Account {

//     constructor(accountNumber: number, password: string) {
//         super(accountNumber, password);
//     }

//     public calculateBalanceForOneYear(): number {
//         const currentDate = LocalDateTime.now();
//         const oneYearAgo = currentDate.minusYears(1);
    
//         let balance = 0;
//         for (let i = 0; i < Account.transactionHistory.size(); i++) {
//           const transactionDate = Account.transactionDate.get(i);
//           if (transactionDate.isAfter(oneYearAgo) && !transactionDate.isAfter(currentDate)) {
//             const transactionAmount = Account.transactionHistory.get(i);
//             balance += transactionAmount;
//           }
//         }
//         return balance;
//       }

//     public deposit(amount: number): boolean {
//         Account.balance = Account.Balance()
//         if (amount + Account.balance > 20000) {
//             if (amount > 0) {
//                 Account.transactionHistory.push(amount);
//                 Account.transactionDate.push(new Date());
//                 console.log(`Successfully deposited ${amount}$.`);
//                 return true;
//             }
//             console.log("You can't deposit a negative balance!");
//             return false;
//         }
//         console.log("You can't deposit more than 20000 per year!");
//         return false;
//     }
// }