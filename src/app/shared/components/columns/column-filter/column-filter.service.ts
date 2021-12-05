import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { RangePipe } from 'src/app/shared/pipes/range.pipe';
import { QuestionGroupModel } from '../../form/models/question-group.model';
import { QuestionNumberModel } from '../../form/models/question-number.model';
import { SelectOption } from '../../form/models/question-select.model';
import { QuestionTextModel } from '../../form/models/question-text.model';
import { FormService } from '../../form/services/form.service';
import { FilterOption, Range } from './column-filter.component';

@Injectable({
  providedIn: 'root',
})
export class ColumnFilterService<T> {
  private searchQuestion: QuestionTextModel = new QuestionTextModel({
    key: 'search',
    label: '',
    icon: 'search',
  });

  private amountQuestions: QuestionNumberModel[] = [
    {
      key: 'from',
      label: '',
      controlType: 'number',
      format: 'currency',
    },
    {
      key: 'to',
      label: '',
      controlType: 'number',
      format: 'currency',
    },
  ];

  public filter$: Observable<FilterOption<T>>;

  constructor(private formService: FormService) {}

  public getSearchFilter(): {
    control: FormControl;
    question: QuestionTextModel;
  } {
    const control = this.formService.getFieldControl(this.searchQuestion);
    return { control, question : this.searchQuestion };
  }

  public getAmountGroup(): QuestionGroupModel {
    return this.formService.createQuestionGroup({
      key: 'amount',
      questions: this.amountQuestions,
      options : {
        gridProps : {
          cols : 2
        }
      }
    });
  }
}
