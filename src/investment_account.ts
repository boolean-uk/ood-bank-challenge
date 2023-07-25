import { Account } from './account'

export class InvestmentAccount extends Account {
    public static readonly INTEREST_PER_MONTH = 0.02
    private readonly creationDate

    // for testing purposes only
    constructor(creationDate: Date = new Date()) {
        super()
        this.creationDate = creationDate
    }

    override getBalance(now: Date = new Date()): number {
        let baseBalance = super.getBalance();

        let monthsSinceCreationDate = this.monthDifference(this.creationDate, now)

        let interest = baseBalance * InvestmentAccount.INTEREST_PER_MONTH * monthsSinceCreationDate;

        return baseBalance + interest;
    }

    private monthDifference(dateFrom: Date, dateTo: Date) {
        return dateTo.getMonth() - dateFrom.getMonth() +
            (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
    }


}
