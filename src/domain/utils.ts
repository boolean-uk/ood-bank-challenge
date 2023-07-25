export function formatDate(date: Date) {
    const day = (date.getDate() < 10 ? "0" : "") + date.getDate()
    const month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

export function formatMoney(amount: number) {
    return (amount / 100).toFixed(2)
}