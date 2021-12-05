import { QuestionSelectModel } from 'src/app/shared/components/form/models/question-select.model';
import { Injectable } from '@angular/core';
import { QuestionTextareaModel } from '../models/question-textarea.model';
import { QuestionCalendar } from '../models/question-calendar';
import { QuestionTextModel } from '../models/question-text.model';
import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { QuestionBaseModel, ControlType } from '../models/question.model';
import {
  GroupOptions,
  QuestionGroupModel,
} from '../models/question-group.model';
import { QuestionNumberModel } from '../models/question-number.model';
import { QuestionAutocompleteModel } from '../models/question-autocomplete';
import { QuestionCurrency } from '../models/question-currency';

export type ControlTemplate = [
  state: any,
  validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]
];

export type QuestionBase = QuestionBaseModel<string | number | Date>;

export type Question =
  | QuestionSelectModel
  | QuestionTextModel
  | QuestionCalendar
  | QuestionCurrency
  | QuestionTextareaModel
  | QuestionNumberModel
  | QuestionAutocompleteModel
  | QuestionGroupModel;

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  // method which create a control template for FormBuilder
  private setFieldControl(question: QuestionBase): ControlTemplate {
    const { value, validations } = question;
    return [value || '', validations];
  }

  // method which create inner FormGroup instance
  private setGroupControl(control: QuestionGroupModel): FormGroup {
    const { questions } = control;
    return this.fb.group(this.setGroup(questions));
  }

  // method which create a template of to create a FormGroup instance with FormBuilder
  private setGroup(questions: Question[]): { [x: string]: ControlTemplate } {
    return questions
      .map((question: Question) => question)
      .reduce((acc, control: Question) => {
        let template;
        const { key } = control;

        
        if (control instanceof QuestionBaseModel) {
          template = this.setFieldControl(control);
        }

        if (control instanceof QuestionGroupModel) {

          template = this.setGroupControl(control);
        }
        return {
          ...acc,
          [key]: template,
        };
      }, {});
  }

  // method which return single FormControl instance
  public getFieldControl(question: Question): FormControl {
    const template = this.setFieldControl(question);
    return this.fb.control(template[0], template[1]);
  }

  // method which return QuestionGroupModel instance
  public createQuestionGroup(config: {
    key: string;
    questions: Question[];
    options?: GroupOptions;
  }): QuestionGroupModel {
    const { key, questions, options } = config;
    return new QuestionGroupModel({
      ...options,
      key,
      label: '' || options?.label,
      questions: this.setQuestionList(questions),
      formGroup: this.setFormGroup(questions),
    });
  }

  // method which create a FormGroup angular instance
  public setFormGroup(questions: Question[]): FormGroup {
    const template = this.setGroup(this.setQuestionList(questions));
    return this.fb.group(template);
  }

  // method which create a FormGroup form with multi FormGroup
  public setForm(form: QuestionGroupModel[]) {
    const template = form
      .map((group: QuestionGroupModel) => group)
      .reduce((acc, group) => {
        const { key } = group;

        return {
          ...acc,
          [key]: this.setFormGroup(group.questions),
        };
      }, {});

    return this.fb.group(template);
  }

  // method which create a questions array
  public setQuestionList(questions: Question[]): Question[] {
    return questions.map((question: Question) => {
      return this.setQuestion(question);
    });
  }

  // method which create a question instance
  public setQuestion(question: Question): Question {
    
    switch (question.controlType) {
      case 'group':
        return new QuestionGroupModel(question);

      case 'number':
        return new QuestionNumberModel(question);

      case 'select':
        return new QuestionSelectModel(question);

      case 'textarea':
        return new QuestionTextareaModel(question);

      case 'calendar':
        return new QuestionCalendar(question);

      case 'autocomplete':
        return new QuestionAutocompleteModel(question);
      default:
        return new QuestionTextModel(question);
    }
  }

  // create questions object for row instance to render to kkl-form {}
  public setQuestionsGroup(questions: Question[]): { [x: string]: Question } {
    return questions
      .map((question: Question) => question)
      .reduce((acc, control: Question) => {
        const { key } = control;
        return {
          ...acc,
          [key]: this.setQuestion(control),
        };
      }, {});
  }


  // // method which return QuestionGroupModel instance
  // public createQuestionGroup(config: {
  //   key: string;
  //   questions: Question[];
  //   options?: GroupOptions;
  // }): QuestionGroupModel {
  //   const { key, questions, options } = config;
  //   return new QuestionGroupModel({
  //     ...options,
  //     key,
  //     label: '' || options?.label,
  //     questions: this.setQuestionList(questions),
  //     formGroup: this.setFormGroup(questions),
  //   });
  // }

}
