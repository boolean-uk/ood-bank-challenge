import { useState } from "react";

export default function TileDeposit({
  onDeposit,
}: {
  onDeposit: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Deposit</h3>
      <p className="mb-2">How much would you like to deposit</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        className="input input-bordered mb-2 w-full"
        placeholder="Enter amount"
      />
      <button className="btn btn-primary" onClick={() => onDeposit(amount)}>
        Deposit
      </button>
    </div>
  );
}
