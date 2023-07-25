import { formatDate, formatMoney } from "../src/utils"

describe("Date format", () => {
    it("should return date in format DD/MM/YYYY", () => {
        const date = new Date(2023, 6, 25)
        expect(formatDate(date)).toEqual("25/07/2023")

        const date2 = new Date(2023, 0, 1)
        expect(formatDate(date2)).toEqual("01/01/2023")
    })
})


describe("Money format", () => {
    it("should return money in as decimal string with two decimal places", () => {
        expect(formatMoney(10000)).toEqual("100.00")
    })
})