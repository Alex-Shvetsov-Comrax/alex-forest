import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CardStepModel } from './card-step.model';

@Component({
  selector: 'kkl-card-step',
  templateUrl: './card-step.component.html',
  styleUrls: ['./card-step.component.scss']
})
export class CardStepComponent implements OnInit {

  @Input() public step: CardStepModel;

  public active$: Observable<boolean>;


  @Output() onStepChange: EventEmitter<CardStepModel> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.active$ = this.step.getActiveObs();
  }

  public onStepClick(): void {
    if (!this.step.isActive) {
      this.onStepChange.emit(this.step);
    }
  }

}
