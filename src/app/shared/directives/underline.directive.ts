import { Directive, HostBinding, Input } from '@angular/core';
import { Palette, palette } from 'src/styles/theme';

@Directive({
  selector: '[appUnderline]',
})
export class UnderlineDirective {
  private palette = palette;

  @Input() color: Palette;
  @Input() size: number;

  @HostBinding('style.border-bottom') private underline: string;

  constructor() {}

  ngOnInit(): void {
    this.underline = `${this.size || 1}px solid ${this.palette[this.color || 'primary']}`;
  }
}
