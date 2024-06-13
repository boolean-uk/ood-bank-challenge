import { Money } from "ts-money";
import { Transaction } from "../Transaction.type";

export type StatementParser<T> = (
	data: Transaction[],
	initialBalance: Money
) => T;
