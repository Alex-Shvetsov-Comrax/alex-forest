import { Directive, HostBinding, Input } from '@angular/core';
import { palette, Palette } from 'src/styles/theme';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective {

  private palette = palette;

  @Input() color: Palette;
  @Input() size: number;

  @HostBinding('style.border') private border: string;

  constructor() {}

  ngOnInit(): void {
    this.border = `${this.size || 1}px solid ${this.palette[this.color || 'primary']}`;
  }
}
