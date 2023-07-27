import React, { useState } from "react";

function TileStatementDays({
  onEnterDays,
  MinimumDay,
  MaximumDay,
}: {
  onEnterDays: (days: Date[]) => void;
  MinimumDay: Date;
  MaximumDay: Date;
}) {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleDeposit = () => {
    if (fromDate && toDate) {
      onEnterDays([fromDate, toDate]);
    } else {
      // Handle error: both dates must be selected
      console.error("Please select both dates.");
    }
  };

  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Statements between 2 dates</h3>
      <p className="mb-2">Pick 2 dates</p>
      <label className="label"> From </label>
      <input
        type="date"
        className="input input-bordered w-full max-w-xs"
        min={MinimumDay.toISOString().split("T")[0]}
        max={MaximumDay.toISOString().split("T")[0]}
        value={fromDate ? fromDate.toISOString().split("T")[0] : ""}
        onChange={(e) => setFromDate(new Date(e.target.value))}
      />

      <label className="label"> To </label>
      <input
        type="date"
        className="input input-bordered w-full max-w-xs"
        min={MinimumDay.toISOString().split("T")[0]}
        max={MaximumDay.toISOString().split("T")[0]}
        value={toDate ? toDate.toISOString().split("T")[0] : ""}
        onChange={(e) => setToDate(new Date(e.target.value))}
      />
      <button className="btn btn-primary" onClick={handleDeposit}>
        Deposit
      </button>
    </div>
  );
}

export default TileStatementDays;
