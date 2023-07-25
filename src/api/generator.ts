import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = (transactionHistory: any[]) => {
    const styles = {
        header: {
            fontSize: 24,
            bold: true,
            margin: [0, 0, 0, 0] as [number, number, number, number],
        },
    };

    const docDefinition = {
        content: [
            {
                text: 'Transaction History',
                style: 'header',
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', 'auto', 'auto'],
                    body: [
                        ['Date', 'Type', 'Amount', 'Balance'],
                        ...transactionHistory.map((transaction) => [
                            transaction.date,
                            transaction.type,
                            transaction.amount,
                            transaction.balance,
                        ]),
                    ],
                },
                layout: 'lightHorizontalLines',
            },
        ],
        styles,
    };

    // Create the PDF
    const pdfDocument = pdfMake.createPdf(docDefinition);

    // Download the PDF
    pdfDocument.download('transaction_history.pdf');
}