import useBank from './composables/useBank';
import useExport from './composables/useExport';

const bank = useBank;

const user = bank.registerUser('Mark', 'Roberts');

// Mark starts with $0

// Mark deposits $1000 the 10th of January
user.accounts[0].deposit(1000, new Date('01/10/2012'));

// Mark depositis $2000 the 13th of January
user.accounts[0].deposit(2000, new Date('01/13/2012'));

// Mark withdraws $500 the 14th of January
user.accounts[0].withdraw(500, new Date('01/14/2012'));

console.log(user.accounts[0].statement.print);
useExport(user.accounts[0].statement.data).toCSV();
