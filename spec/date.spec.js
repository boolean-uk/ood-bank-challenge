import dayjs from "dayjs"
import { DateProvider } from "../src/date.js"

describe('Date', () => {
  let date = new DateProvider
  it('should be instance of Date', ()=> {
    expect(date).toBeInstanceOf(DateProvider)
  })

  it('should return current day', () => {
    const checkDate = new dayjs().format('DD/MM/YYYY')
    expect(date.currentDate()).toEqual(checkDate)
  })
})