import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { QuestionCurrency } from '../models/question-currency';
import { QuestionGroupModel } from '../models/question-group.model';

@Component({
  selector: 'kkl-form-currency',
  templateUrl: './form-currency.component.html',
  styleUrls: ['./form-currency.component.scss'],
})
export class FormCurrencyComponent implements OnInit {
  @Input() public question: QuestionGroupModel;
  // ------ FIRST FORM CONTROL([0]) IS THE FIRST QUESTION !! -------- //
  @Input() public controls: FormControl[];

  @Input() secondInputWidth:string='50' 

  @Input() formGroup: FormGroup;


  public controlKeys: string[] = [];
  constructor() {}

  ngOnInit(): void {
    console.log(this.formGroup);
    
    this.controlKeys = Object.keys(this.formGroup.controls);
  }
}
 // EXAMPLE OF QUESTION //
//  new QuestionCurrency({
//   key: 'expandingAmount',
//   label: '',
//   currency: new QuestionSelectModel({
//     key: 'currency',
//     label: 'מטבע',
//     appearance: 'none',
//     options: [{ label: '€', value: 'euro' }, { label: '$', value: 'dollar' }, { label: '₪', value: 'shekel' }]
//   })