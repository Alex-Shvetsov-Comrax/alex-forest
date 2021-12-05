import { ValidatorFn } from '@angular/forms';
import { GridProps } from './question.model';
import { QuestionSelectModel, SelectOption } from './question-select.model';

export class QuestionAutocompleteModel extends QuestionSelectModel {
  public onOptionSelect?: Function;

  constructor(options?: {
    key: string;
    label?: string;
    validations?: ValidatorFn[];
    gridProps?: GridProps;
    icon?: string;
    options?: SelectOption[];
    onOptionSelect?: Function;
  }) {
    super(options);
    (this.controlType = 'autocomplete'), (this.options = options.options || []);
    this.onOptionSelect =
      options.onOptionSelect || (() => console.log('select'));
  }
}
