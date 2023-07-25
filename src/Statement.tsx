// src/Statement.tsx

import React from 'react';

interface TransactionProps {
  date: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
}

interface StatementProps {
  transactions: TransactionProps[];
}

const Statement: React.FC<StatementProps> = ({ transactions }) => {
  let balance = 0;

  return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Bank Statement</h5>
          </div>
          <div className="modal-body">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Credit</th>
                  <th>Debit</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => {
                  if (transaction.type === 'deposit') {
                    balance += transaction.amount;
                  } else if (transaction.type === 'withdrawal') {
                    balance -= transaction.amount;
                  }
                  return (
                    <tr key={index}>
                      <td>{transaction.date}</td>
                      {transaction.type === 'deposit' ? <td>{transaction.amount.toFixed(2)}</td> : <td></td>}
                      {transaction.type === 'withdrawal' ? <td>{transaction.amount.toFixed(2)}</td> : <td></td>}
                      <td>{balance.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default Statement;
