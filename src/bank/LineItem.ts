class LineItem {
  constructor() {}

  private formatCurrency(amount: number): string {
    return amount.toFixed(2);
  }

  formatLineItem(date: Date, amount: number, type: "credit" | "debit"): string {
    const dateStr = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const credit = type === "credit" ? this.formatCurrency(amount) : "";
    const debit = type === "debit" ? this.formatCurrency(amount * -1) : "";

    return `${dateStr} || ${credit.padEnd(8)} || ${debit.padEnd(8)}`;
  }
}

export default LineItem;
