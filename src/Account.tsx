// src/Account.tsx

import React, { useState } from 'react';
import Transaction from './Transaction';
import Statement from './Statement';

type TransactionType = 'deposit' | 'withdrawal';

interface TransactionProps {
  date: string;
  amount: number;
  type: TransactionType;
}

const Account: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const deposit = (amount: number) => {
    const date = new Date().toLocaleDateString();
    setBalance((prevBalance) => prevBalance + amount);
    setTransactions([...transactions, { date, amount, type: 'deposit' }]);
  };

  const withdraw = (amount: number) => {
    const date = new Date().toLocaleDateString();
    if (balance >= amount) {
      setBalance((prevBalance) => prevBalance - amount);
      setTransactions([...transactions, { date, amount, type: 'withdrawal' }]);
    } else {
      alert('Insufficient funds.');
    }
  };


  return (
    <div>
      <h2>Bank Account</h2>
      <p>Balance: ${balance.toFixed(2)}</p>
      <button onClick={() => deposit(1000)}>Deposit $1000</button>
      <button onClick={() => deposit(2000)}>Deposit $2000</button>
      <button onClick={() => withdraw(1000)}>Withdraw $1000</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Credit</th>
            <th>Debit</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <Transaction
              key={index}
              date={transaction.date}
              amount={transaction.amount}
              type={transaction.type}
            />
          ))}
        </tbody>
      </table>
      <button onClick={toggleModal}>Generate Statement</button>
      {showModal && (
        <Statement transactions={transactions} onClose={toggleModal} />
      )}
    </div>
  );
};

export default Account;
