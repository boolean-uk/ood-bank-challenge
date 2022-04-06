import fs from 'fs';

export class Exportable {
  data: Array<any>;

  constructor(data: any) {
    this.data = data;
  }

  async toCSV(fileName?: string) {
    if (this.data[0] === undefined) return;
    fs.writeFileSync(`${fileName}.csv`, this.data.map((item) => `${Object.values(item).join(',')}\n`).join(''));
  }
}

export default function useExport(data: any) {
  return new Exportable(data);
}
