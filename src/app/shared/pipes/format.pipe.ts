import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { AreaPipe } from './area.pipe';
import { formatDate, formatNumber, formatCurrency } from '@angular/common';

@Pipe({
  name: 'format',
})
export class FormatPipe implements PipeTransform {
  constructor(
    private area: AreaPipe,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  private formatObj(value: any, format: string): string {
    const formats = {
      date: formatDate(value, 'M/d/yy', this.locale),
      area: this.area.transform(value),
      currency: formatCurrency(value, this.locale, '₪', 'ILS', '1.0'),
      number: formatNumber(value, this.locale),
    };
    return formats[format];
  }

  public transform(value: unknown, format?: string): unknown {
    return format ? this.formatObj(value, format) : value;
  }
}
