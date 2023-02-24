import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyIn',
})
export class CurrencyPipe implements PipeTransform {
  transform(val: string) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(Number(val));
  }
}
