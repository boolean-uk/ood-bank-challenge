import TsMoney from "ts-money";
import Identity from "./utils/UUID";
export enum TransactionType {
	CREDIT = "credit",
	DEBIT = "debit",
}

export interface Transaction extends Identity {
	date: Date;
	type: TransactionType;
	amount: TsMoney.Money;
}
