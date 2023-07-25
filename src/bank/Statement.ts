import BankAccount from "./BankAccount";
import LineItem from "./LineItem";
import Transaction from "./Transaction";
const PDFDocument = require("pdfkit");
const fs = require("fs");

class Statement {
  constructor(private _bankaccount: BankAccount) {}

  print(from?: Date, to?: Date) {
    let transactions: Transaction[] = this._bankaccount.transactions;
    const lineItem: LineItem = new LineItem();
    console.log(
      `${"date".padEnd(11)}|| ${"credit".padEnd(10)}|| ${"debit".padEnd(
        9
      )}|| balance`
    );

    let balance = 0;
    for (const transaction of transactions) {
      balance += transaction.amount;
      if (from !== undefined && to !== undefined) {
        if (transaction.date >= from && transaction.date <= to) {
          this.printLineItem(transaction, balance);
        }
      } else {
        this.printLineItem(transaction, balance);
      }
    }
  }

  generatePDF(filename: String) {
    const doc = new PDFDocument();
    const outputStream = fs.createWriteStream(filename);

    doc.pipe(outputStream);

    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Bank Statement", { align: "center" });
    doc.moveDown();

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(
        `${"Date".padEnd(12)}|| ${"Credit".padEnd(10)}|| ${"Debit".padEnd(
          9
        )}|| Balance`,
        { align: "left" }
      );

    let balance = 0;
    for (const transaction of this._bankaccount.transactions) {
      balance += transaction.amount;
      const credit =
        transaction.type === "credit" ? transaction.amount.toFixed(2) : " ";
      const debit =
        transaction.type === "debit"
          ? (transaction.amount * -1).toFixed(2)
          : " ";
      doc
        .font("Helvetica")
        .fontSize(10)
        .text(
          `${transaction.date
            .toISOString()
            .slice(0, 10)
            .padEnd(11)}|| ${credit.padEnd(
            19 - credit.length
          )}|| ${debit.padEnd(18 - debit.length)}|| ${balance
            .toFixed(2)
            .padEnd(7)}`,
          { align: "left" }
        );
    }

    doc.end();

    outputStream.on("finish", () => {
      console.log(`PDF statement generated: ${filename}`);
    });
  }

  private printLineItem(transaction: Transaction, balance: number) {
    const lineItem: LineItem = new LineItem();
    console.log(
      lineItem.formatLineItem(
        transaction.date,
        transaction.amount,
        transaction.type
      ) + `|| ${balance.toFixed(2).padEnd(7)}`
    );
  }
}

export default Statement;
