import { QuestionSelectModel } from 'src/app/shared/components/form/models/question-select.model';
import { Observable } from 'rxjs';
import { GridProps } from '../models/question.model';
import { QuestionGroupModel } from './../models/question-group.model';
import { FormGroup } from '@angular/forms';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Question } from '../services/form.service';

@Component({
  selector: 'kkl-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  @Input() public group: QuestionGroupModel;
  @Input() public questions: Question[];
  @Input() public editMode: boolean;
  @Input() public rowHeight: number;

  @Input() private $questions: Observable<Question[]>;

  @Input() public slots: {
    button?: ElementRef;
    group?: ElementRef;
  };

  @Output() register: EventEmitter<FormGroup> = new EventEmitter();

  public formGroup: FormGroup;
  public grid: GridProps;
  public hasButton: boolean = false;
  public cols: string | number;
  public gutter: number;

  constructor() {}

  ngOnInit() {  
    console.log(this.slots);
    
    this.formGroup = this.group.formGroup;
    this.questions = this.questions || this.group.questions;
    this.grid = this.group.gridProps;
    this.cols = this.group.gridProps?.cols || 1;
    this.gutter = this.group.gridProps?.gutter || 1;
    this.hasButton = this.group.hasButton || false;

    if (this.group.formGroup) {
    this.register.emit(this.formGroup);
    }

    if (this.editMode) {
      this.formGroup.disable();
    }
  }

  onSubmit() {
    this.register.emit(this.formGroup.value);
  }

  private subscribeToFormValues() {
    this.formGroup.valueChanges.subscribe((value) => {
      this.register.emit(this.formGroup);
    });
  }

  public onSelect(question: QuestionSelectModel) {
    console.log(question);
  }
}
