import React from 'react';

interface TransactionProps {
  date: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
}

const Transaction: React.FC<TransactionProps> = ({ date, amount, type }) => {
  return (
    <tr>
      <td>{date}</td>
      {type === 'deposit' ? <td>{amount.toFixed(2)}</td> : <td></td>}
      {type === 'withdrawal' ? <td>{amount.toFixed(2)}</td> : <td></td>}
    </tr>
  );
};

export default Transaction;
