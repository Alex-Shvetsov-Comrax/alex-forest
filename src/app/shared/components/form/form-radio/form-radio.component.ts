import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { QuestionRadio } from '../models/question-radio';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'kkl-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss']
})
export class FormRadioComponent implements OnInit {

  @Input() public question: QuestionRadio
  @Input() public control: FormControl

  constructor() { }

  ngOnInit(): void {
  }

  public handleChange(radio: MatRadioChange) {
    this.control.setValue(radio.value)

  }
}
