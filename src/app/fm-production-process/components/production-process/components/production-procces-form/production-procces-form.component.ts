import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionGroupModel } from 'src/app/shared/components/form/models/question-group.model';
import { QuestionSelectModel } from 'src/app/shared/components/form/models/question-select.model';
import { QuestionTextModel } from 'src/app/shared/components/form/models/question-text.model';
import {
  FormService,
  Question,
} from 'src/app/shared/components/form/services/form.service';

@Component({
  selector: 'app-production-procces-form',
  templateUrl: './production-procces-form.component.html',
  styleUrls: ['./production-procces-form.component.scss'],
})
export class ProductionProccesFormComponent implements OnInit {
  public questions!: QuestionGroupModel;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.questions = this.formService.createQuestionGroup({
      key: '',
      questions: this.dataInputs,
      options: { gridProps: { cols: 9 }, hasButton: true },
    });
  }

  onSubmit(data: any) {
    console.log(this.myFormGroup.formGroup.value);
  }

  public dataInputs: Question[] = [
    new QuestionSelectModel({
      key: 'confirmLawyer',
      label: 'עורך דין מאשר',
      gridProps: {
        cols: 2,
      },
      options: [
        { label: 'A ', value: 'A ' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
      ],
    }),
    new QuestionSelectModel({
      key: 'planType',
      label: 'סוג תוכנית',

      gridProps: {
        cols: 2,
      },
      options: [
        { label: ' מרחבית ', value: 'A ' },
        { label: ' יער משקי', value: 'B' },
        { label: 'מרעה דבורים', value: 'C' },
      ],
    }),
    new QuestionSelectModel({
      key: 'gardening',
      label: 'משתלה',
      gridProps: {
        cols: 2,
      },
      options: [
        { label: 'גולני', value: 'golni' },
        { label: 'אשתאול', value: 'ashdaal' },
        { label: 'גילת', value: 'gilat' },
      ],
    }),
    new QuestionSelectModel({
      key: 'status',
      label: 'סטטוס',
      gridProps: {
        cols: 2,
      },
      options: [
        { label: 'מאושר', value: 'posetice ' },
        { label: 'לא מאושר', value: 'negetive' },
      ],
    }),
  ];

  public myFormGroup: QuestionGroupModel = {
    questions: this.dataInputs,
    key: 'myForm',
    label: '',
    formGroup: this.formService.setFormGroup(this.dataInputs),
  };
}
