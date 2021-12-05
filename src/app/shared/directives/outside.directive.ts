import { Directive, ElementRef, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[appOutside]',
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class OutsideDirective {
  @Output() public clickOutside:EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }
  public counter = 0;

  public onClick(event: any) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.counter++;
      if (this.counter > 1) {
        this.clickOutside.emit();
      }
    }

  }
}
