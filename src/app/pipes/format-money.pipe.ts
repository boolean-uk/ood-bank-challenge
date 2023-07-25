import { Pipe, PipeTransform } from '@angular/core';
import { formatMoney } from 'src/domain/utils';

@Pipe({
  name: 'formatMoney'
})
export class FormatMoneyPipe implements PipeTransform {

  transform(value?: string | number, ...args: any[]): string {
    return formatMoney(Number(value ?? 0));
  }

}
