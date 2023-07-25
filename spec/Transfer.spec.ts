import { Transfer } from "../src/Transfer";

describe("Transfer tests", () => {
    let transfer: Transfer;

    beforeEach(() => {
        transfer = new Transfer(10000)
    })

    it("should create account", () => {
        expect(transfer.amountOfMoney).toEqual(10000)
    })

})