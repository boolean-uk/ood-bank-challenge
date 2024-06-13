import { Money } from "ts-money";
import { TransactionType } from "../../types/Transaction.type";
import { StatementParser } from "../../types/utils/statement.parser";
//@ts-ignore
import isOdd from "is-odd";

const parseDate = (date: Date) => {
	return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
};

const toStringParser: StatementParser<string> = (data, initalBalance) => {
	//find largest credit/debit/balance string len
	let maxCreditLen = " credit ".length,
		maxDebitLen = " debit ".length,
		maxBalanceLen = " balance".length;

	data.forEach((e) => {
		maxCreditLen = Math.max(maxCreditLen, e.amount.toString().length);
		maxDebitLen = Math.max(maxDebitLen, e.amount.toString().length);
		maxBalanceLen = Math.max(maxBalanceLen, e.amount.toString().length);
	});

	//center string
	const centerString = (space: number, str: string) => {
		const remaining = space - str.length;
		const evenRemaining = !isOdd(remaining)
			? remaining
			: remaining > 2
			? remaining - 1
			: remaining + 1;

		return (
			" ".repeat(evenRemaining / 2) + str + " ".repeat(evenRemaining / 2)
		);
	};

	//balance calc
	let balance = initalBalance;

	const header = [
		"date" + " ".repeat(10-"date".length),
		centerString(maxCreditLen, "credit"),
		centerString(maxDebitLen, "debit "),
		" ".repeat(maxBalanceLen - "balance".length) + "balance",
	].join("||");

	return [
		header,
		data.map((e) => {
			const tBalance =
				e.type === TransactionType.CREDIT
					? balance.add(e.amount)
					: balance.subtract(e.amount);

			balance = tBalance;

			return [
				parseDate(e.date) + " ",
				centerString(
					maxCreditLen,
					e.type === TransactionType.CREDIT ? e.amount.toString() : ""
				),
				centerString(
					maxCreditLen,
					e.type === TransactionType.DEBIT ? e.amount.toString() : ""
				),
				" " + tBalance,
			].join("||");
		}).join("\n"),
	].join(`\n`);
};

export default toStringParser;
