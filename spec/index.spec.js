import Bank from "../src/index.js";

describe('Bank', () => {
    let bank

    beforeEach(() => {
        bank = new Bank()
    })

    it('should exist', () => {
        expect(bank).toBeInstanceOf(Bank)
    })
})