import fs from "fs";
// @ts-ignore
import PDFDocument from 'pdfkit';
export class PdfGenerator{

    static generatePDFFromText(text: string, outputPath: string): void {
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(outputPath);

        doc.pipe(stream);

        doc.text('Bank Statement:', {align: 'center'})
            .font('Helvetica-Bold')
        doc.font('Helvetica-Bold')
            .fontSize(12)
            .fillColor('green')
            .text(text, {align:'center'});

        doc.end();
    }
}