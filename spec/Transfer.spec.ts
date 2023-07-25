import { Account } from "../src/Account"
import { Transfer } from "../src/Transfer";

describe("Account tests", () => {
    let transfer: Transfer;

    beforeEach(() => {
        transfer = new Transfer(10000)
    })

    it("should create account", () => {
        expect(transfer.amountOfMoney).toEqual(10000)
        expect(transfer.date.getFullYear).toEqual(2023)
    })

})