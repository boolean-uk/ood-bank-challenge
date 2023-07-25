import express from 'express';
import { BankStatement } from './BankStatement';
import { Account } from './Account';
import { CheckingAccount } from './CheckingAccount';

const app = express();
const port = 3000;
const account = new CheckingAccount(12345, 'mypassword');

app.use(express.static('public'));
app.use(express.json());

app.get('/print-statement', (req, res) => {
  const bankStatement = new BankStatement();
  const statement = BankStatement.printStatement();
  res.send(statement);
});

app.post('/deposit', (req, res) => {
  const { amount } = req.body;
  const isSuccess = account.deposit(amount);
  res.send(isSuccess ? 'Successfully deposited.' : 'Deposit failed.');
});

app.post('/withdraw', (req, res) => {
  const { amount } = req.body;
  const isSuccess = account.withdraw(amount);
  res.send(isSuccess ? 'Successfully withdrawn.' : 'Withdrawal failed.');
});

app.post('/set-overdraft', (req, res) => {
  account.Overdraft(true); 
  res.send(`Overdraft set to: true`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});