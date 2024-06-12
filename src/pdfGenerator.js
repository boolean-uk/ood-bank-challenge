"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfGenerator = void 0;
const fs_1 = __importDefault(require("fs"));
// @ts-ignore
const pdfkit_1 = __importDefault(require("pdfkit"));
class PdfGenerator {
    static generatePDFFromText(text, outputPath) {
        const doc = new pdfkit_1.default();
        const stream = fs_1.default.createWriteStream(outputPath);
        doc.pipe(stream);
        doc.text('Bank Statement:', { align: 'center' })
            .font('Helvetica-Bold');
        doc.font('Helvetica-Bold')
            .fontSize(12)
            .fillColor('green')
            .text(text, { align: 'center' });
        doc.end();
    }
}
exports.PdfGenerator = PdfGenerator;
