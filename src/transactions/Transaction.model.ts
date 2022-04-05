import TransactionSource from "./TransactionSource";

export default interface Transaction {
    id: string;
    amount: number;
    from: TransactionSource;
    to: TransactionSource;
}