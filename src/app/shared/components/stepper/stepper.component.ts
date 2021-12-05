import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CardStepModel, StepperDirection } from '../cards/card-step/card-step.model';

@Component({
  selector: 'kkl-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {

  @Input() sm$: Observable<boolean>
  @Input() steps$: Observable<CardStepModel[]>;
  @Input() steps: CardStepModel[];
  @Input() direction: StepperDirection;
  @Input() stepWidth: number;
  @Input() stepRef: ElementRef;

  @Output() changStep = new EventEmitter<CardStepModel>();

  ngOnInit(): void {
  }

  public onStepChange(step: CardStepModel) {
    this.changStep.emit(step);
  }

}
