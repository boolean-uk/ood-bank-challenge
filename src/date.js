class DateProvider {
  currentDate() {
    return new Date().toISOString().slice(0, 10)
  }
}

export { DateProvider }
let date = new DateProvider
console.log(date.currentDate())