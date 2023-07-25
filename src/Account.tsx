// src/Account.tsx

import React, { FormEvent, useEffect, useState } from 'react';
import Statement from './Statement';

type TransactionType = 'deposit' | 'withdrawal';

interface TransactionProps {
  date: string;
  amount: number;
  type: TransactionType;
}

const Account: React.FC = () => {
  const [balance, setBalance] = useState(0.00);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [depositValue, setDepositValue] = useState("")
  const [withdrawValue, setWithdrawValue] = useState("")
  const [overdraftActive, setOverdraftActive] = useState(false)

  const OVERDRAFT = 500.00

  useEffect(() => {
    const currentBalance = transactions.map(transaction => transaction.type === 'deposit' ? transaction.amount : -transaction.amount).reduce((x,y)=>x+y,0)
    setBalance(currentBalance)
  },[transactions])

  const deposit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(depositValue)
    const date = new Date().toLocaleDateString();
    setTransactions([...transactions, { date, amount, type: 'deposit' }]);


    setDepositValue("");
  };

  const withdraw = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(withdrawValue)
    const date = new Date().toLocaleDateString();
    const available = overdraftActive ? balance + OVERDRAFT : balance
    if (available >= amount) {
      setTransactions([...transactions, { date, amount, type: 'withdrawal' }]);
    } else {
      alert('Insufficient funds.');
    }
    setWithdrawValue("")
  };


  return (
    <div>
      <h2>Bank Account</h2>
      <p>Balance: ${balance.toFixed(2)}</p>
      <div className="container">
        <form className="input-group" onSubmit={deposit}>
          <input
            data-testid="deposit"
            type="text"
            className="form-control"
            value={depositValue}
            onChange={(e) => setDepositValue(e.target.value)}
            pattern="^\d+(\.\d{1,2})?$"
            title="Please enter a valid amount." />
          <button className="btn btn-primary" type='submit'>Deposit</button>
        </form>
      </div>
      <div className="container mt-5">
        <form className="input-group" onSubmit={withdraw}>
          <input
            data-testid="withdraw"
            type="text"
            className="form-control"
            value={withdrawValue}
            onChange={(e) => setWithdrawValue(e.target.value)}
            pattern="^\d+(\.\d{1,2})?$"
            title="Please enter a valid amount." />
          <button className="btn btn-primary" type='submit'>Withdraw</button>
        </form>
      </div>

      <button className='btn btn-primary mt-5' data-bs-toggle="modal" data-bs-target="#statementModal">Generate Statement</button>
      <div className="modal fade" id='statementModal' tabIndex={-1} aria-labelledby='statementModalLabel' aria-hidden="true">
        <Statement transactions={transactions} />
      </div>
      <div>
      <button className="btn btn-primary mt-5" onClick={() => setOverdraftActive((prev)=>!prev)}>{overdraftActive ? "Disable Overdraft" : "Allow overdraft(500$)"}</button>
      </div>

    
    </div>
  );
};

export default Account;
