"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BankStatement_1 = require("./BankStatement");
const CheckingAccount_1 = require("./CheckingAccount");
const app = (0, express_1.default)();
const port = 3000;
const account = new CheckingAccount_1.CheckingAccount(12345, 'mypassword');
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.get('/print-statement', (req, res) => {
    const bankStatement = new BankStatement_1.BankStatement();
    const statement = BankStatement_1.BankStatement.printStatement();
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
