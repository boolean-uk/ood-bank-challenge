import {Account} from './Account'

export class InvestmentAccount extends Account {

    constructor(accountNumber: number, password: string) {
        super(accountNumber, password);
      }
}