import { Account } from "../Account";

export class CheckingAccount extends Account {
    constructor(accountNum: string) {
        super(accountNum)
    }
}