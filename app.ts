import express from 'express';
import { BankStatement } from './src/BankStatement';
import { Account } from './src/Account';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/print-statement', (req, res) => {
  const bankStatement = new BankStatement();
  const statement = BankStatement.printStatement();
  res.send(statement);
});

app.post('/deposit', (req, res) => {
  const { amount } = req.body;
  const account = new Account(12345, 'mypassword');
  const isSuccess = account.deposit(amount);
  res.send(isSuccess ? 'Successfully deposited.' : 'Deposit failed.');
});

app.post('/withdraw', (req, res) => {
  const { amount } = req.body;
  const account = new Account(12345, 'mypassword');
  const isSuccess = account.withdraw(amount);
  res.send(isSuccess ? 'Successfully withdrawn.' : 'Withdrawal failed.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});