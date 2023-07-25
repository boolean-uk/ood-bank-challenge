import { useState } from "react";

export default function TileDeposit({
  onDeposit,
}: {
  onDeposit: (amount: number) => void;
}) {
  const [amount, setAmount] = useState(0);

  const handleDeposit = () => {
    if (amount <= 0 || isNaN(amount) || amount === null) {
      alert("Please enter a positive number");
      return;
    }

    setAmount(amount);
    onDeposit(amount);
    console.log("Deposit" + amount);
  };

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
      <button className="btn btn-primary" onClick={handleDeposit}>
        Deposit
      </button>
    </div>
  );
}
