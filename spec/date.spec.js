import { DateProvider } from "../src/date.js"

describe('Date', () => {
  let date = new DateProvider
  it('should be instance of Date', ()=> {
    expect(date).toBeInstanceOf(DateProvider)
  })

  it('should return current day', () => {
    expect(date.currentDate()).toBe('2024-06-12')
  })
})