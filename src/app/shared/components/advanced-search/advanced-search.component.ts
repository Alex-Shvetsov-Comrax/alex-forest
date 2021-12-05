import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuestionGroupModel } from '../form/models/question-group.model';
import { QuestionRadio } from '../form/models/question-radio';
import { QuestionTextModel } from '../form/models/question-text.model';
import { FormService, Question } from '../form/services/form.service';

@Component({
  selector: 'kkl-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  constructor(private formService: FormService) { }

  @Input() public toggleInputs: Question[];
  @Input() public radios: QuestionRadio;

  @Input() public searchInput: QuestionTextModel =
    new QuestionTextModel({
      key: 'search',
      label: 'הקלד/י מילת חיפוש',
      icon: 'search',
    });
  // emit var
  @Output() public formValue: EventEmitter<any> = new EventEmitter();

  //form vars
  public radioControl: FormControl;
  public searchControl: FormControl;

  public toggleFormGroup: QuestionGroupModel;
  //// 
  public toggle: boolean = false;

  ngOnInit(): void {
    this.searchControl = this.formService.getFieldControl(this.searchInput);
    //set default value for radio
    if (this.radios) {
      this.radioControl = this.formService.getFieldControl(this.radios);
      this.radioControl.setValue(this.radios.options[0].value);
    }
    if (this.toggleInputs) {
      this.toggleFormGroup = {
        questions: this.toggleInputs,
        key: 'toggleSearchForm',
        label: '',
        formGroup: this.formService.setFormGroup(this.toggleInputs),
      };
    }
  }
  // toggle inputs 
  public toggleFun(): void {
    this.toggle = !this.toggle;
  }

  //emit functions 
  public iconClickEmit(): void {
    const searchInput = { search: this.searchControl?.value };
    const radio = { radio: this.radioControl?.value };
    const objectToEmit = Object.assign(radio, searchInput, this.toggleFormGroup.formGroup?.value);
    this.formValue.emit(objectToEmit);
  }
}
