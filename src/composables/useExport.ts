import fs from 'fs';

export class Exportable {
  data: Array<any>;

  constructor(data: any) {
    this.data = data;
  }

  async toCSV() {
    if (this.data[0] === undefined) return;
    fs.writeFileSync('bank-statement.csv', this.data.map((item) => `\n${Object.values(item).join(',')}`).join(''));
  }
}

export default function useExport(data: any) {
  return new Exportable(data);
}
