import { type Account } from "@domain/account/account";
import { useEffect, useState } from "react";

export default function AccountBalance({ account }: { account: Account }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(account.getBalance());
  }, [account]);

  return (
    <div className="hero bg-base-200 pb-24 pt-12">
      <div className="hero-content text-center">
        <div className="max-w-md text-xl">
          <label tabIndex={0} className="avatar w-32">
            <div className="w-32 rounded-full">
              <img src="https://cataas.com/cat" alt="User Avatar" />
            </div>
          </label>
          <h1 className="text-4xl font-bold">Welcome back, we missed you.</h1>
          <p className="pt-4">
            Your current balance is: <br />
            <span className="font-semibold">${balance}</span>
          </p>

          <p className="pt-2">What would you like to do?</p>
        </div>
      </div>
    </div>
  );
}
