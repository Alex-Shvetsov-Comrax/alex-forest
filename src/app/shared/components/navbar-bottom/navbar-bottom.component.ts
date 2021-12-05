import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'kkl-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrls: ['./navbar-bottom.component.scss'],
})
export class NavbarBottomComponent implements OnInit {

  @Input() text: string = '';
  @Input() hasNext: boolean;
  @Input() hasSave: boolean;
  @Input() hasIcon: boolean;
  @Input() buttonSlots: ElementRef;

  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() save = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onPrevious(): void {
    this.previous.emit();
  }

  public onNext(): void {
    this.next.emit();
  }

  public onSave(): void {
    this.save.emit();
  }
}
