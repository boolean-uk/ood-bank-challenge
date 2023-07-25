import fs from "fs";
import { Account } from "./account";

export const ACCOUNTS_PATH = "accounts.json";
const ACCOUNT_ID_LENGTH = 6;

export function openAccount() {
  let lastAccountNo = getLastAccountNo();
  const accountNo = (++lastAccountNo).toString();
  const id = "0".repeat(ACCOUNT_ID_LENGTH - accountNo.length) + accountNo;
  const accounts = getAccounts();
  const account = new Account(id);
  accounts.push(account.toJsonObject());
  fs.writeFileSync(ACCOUNTS_PATH, JSON.stringify({ lastAccountNo, accounts }, null, 2));
  return account;
}

export function getAccount(id: string): Account {
  const accounts = getAccounts();
  const accountData = accounts.find(
    (account: { id: string; transactions: [] }) => account.id === id
  );

  if (accountData) {
    const account = new Account(accountData.id);
    return account;
  } else {
    throw "Incorrect account id.";
  }
}

export function getAccounts() {
  createAccountsIfNonexistent();
  return JSON.parse(fs.readFileSync(ACCOUNTS_PATH, "utf-8")).accounts;
}

export function getLastAccountNo() {
  createAccountsIfNonexistent();
  return JSON.parse(fs.readFileSync(ACCOUNTS_PATH, "utf-8")).lastAccountNo;
}

function createAccountsIfNonexistent() {
  if (!fs.existsSync(ACCOUNTS_PATH)) {
    fs.writeFileSync(ACCOUNTS_PATH, JSON.stringify({ lastAccountNo: 0, accounts: [] }, null, 2));
  }
}

export function clearAccounts() {
  fs.writeFileSync(ACCOUNTS_PATH, JSON.stringify({ lastAccountNo: 0, accounts: [] }, null, 2));
}

export function removeAccounts() {
  if (fs.existsSync(ACCOUNTS_PATH)) {
    fs.unlinkSync(ACCOUNTS_PATH);
  }
}
