const { PDFDocument, StandardFonts } = require('pdf-lib');
const fs = require('fs');

class BankStatement {
    static printStatement(transactions) {
        console.log("date       || credit  || debit  || balance");
        let balance = 0;
        transactions.reverse().forEach(transaction => {
            const date = transaction.date;
            if (transaction.transactionType === "credit") {
                balance += transaction.amount;
                console.log(`${date} || ${transaction.amount.toFixed(2)} ||        || ${balance.toFixed(2)}`);
            } else if (transaction.transactionType === "debit") {
                balance -= transaction.amount;
                console.log(`${date} ||        || ${transaction.amount.toFixed(2)} || ${balance.toFixed(2)}`);
            }
        });
    }

    static async generatePDF(transactions) {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 12;
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        let yPosition = height - fontSize * 2;

        page.drawText('date       || credit  || debit  || balance', {
            x: 50,
            y: yPosition,
            size: fontSize,
            font: timesRomanFont
        });

        let balance = 0;
        transactions.reverse().forEach(transaction => {
            yPosition -= fontSize * 2;
            const date = transaction.date;
            if (transaction.transactionType === "credit") {
                balance += transaction.amount;
                page.drawText(`${date} || ${transaction.amount.toFixed(2)} ||        || ${balance.toFixed(2)}`, {
                    x: 50,
                    y: yPosition,
                    size: fontSize,
                    font: timesRomanFont
                });
            } else if (transaction.transactionType === "debit") {
                balance -= transaction.amount;
                page.drawText(`${date} ||        || ${transaction.amount.toFixed(2)} || ${balance.toFixed(2)}`, {
                    x: 50,
                    y: yPosition,
                    size: fontSize,
                    font: timesRomanFont
                });
            }
        });

        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync('BankStatement.pdf', pdfBytes);
    }
}

module.exports = BankStatement;
