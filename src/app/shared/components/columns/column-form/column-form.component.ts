import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  QuestionSelectModel,
  SelectOption,
} from '../../form/models/question-select.model';
import { Question, QuestionBase } from '../../form/services/form.service';
import { MessageService } from '../../form/services/message.service';
import { RowModel } from '../../table/models/row.model';
import { ColumnModel } from '../column.model';
import { QuestionGroupModel } from '../../form/models/question-group.model';

@Component({
  selector: 'kkl-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent<T> implements OnInit {
  @Input() public row: RowModel<T>;
  @Input() public column: ColumnModel<T>;
  @Input() public slot: ElementRef;

  public questions:Question[]
  public question: QuestionBase;
  public type: string;
  public label: string;
  public icon: string;
  public options: SelectOption[];
  public error: string = '';

  public color: string;
  public iconType: string = 'svg';
  public iconRotate: number = 0;

  @Output()
  public selected: EventEmitter<QuestionSelectModel> = new EventEmitter();
  @Output() public register: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.question = this.row.questionsGroup[this.column['columnDef']];

    this.type = this.question?.type;
    this.label = this.question?.label || '';
    this.icon = this.question?.icon || '';

    if (this.question instanceof QuestionSelectModel) {
      this.options = this.question.options;
    }

  }
}
