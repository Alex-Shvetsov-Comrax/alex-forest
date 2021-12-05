import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOption } from '../../form/models/question-select.model';
import { CardStatusModel } from './card-status.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'kkl-card-status',
  templateUrl: './card-status.component.html',
  styleUrls: ['./card-status.component.scss'],
})
export class CardStatusComponent implements OnInit {
  @Input() public status: CardStatusModel;

  @Output() optionSelect: EventEmitter<Observable<SelectOption>> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  // method to fire option value when select
  public onOptionSelect(option: SelectOption): void {
    this.optionSelect.emit(of(option));
  }
}
