import dayjs from "dayjs"

class DateProvider {
  currentDate() {
    return dayjs().format('DD/MM/YYYY')
  }
}

export { DateProvider }
