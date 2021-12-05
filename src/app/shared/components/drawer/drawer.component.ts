import { Component, Input, OnInit } from '@angular/core';
import { QuestionGroupModel } from '../form/models/question-group.model';
import { QuestionSelectModel } from '../form/models/question-select.model';
import { FormService } from '../form/services/form.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  constructor(private formService:FormService) { }

  public isOpen: boolean;
  @Input() public items:any[];
  @Input() public title:string;
  // form
  public SELECT_OPTIONS = [
    new QuestionSelectModel({
      key: 'documents',
      label: '',
      options: [{ label: 'כל המסמכים', value: 'A' },{ label: 'מסמכי ספקים', value: 'A' }, { label: 'חוזים', value: 'B' }],
    })];
    public myFormGroup: QuestionGroupModel = {
      questions: this.SELECT_OPTIONS,
      key: 'myForm',
      label: '',
      formGroup: this.formService.setFormGroup(this.SELECT_OPTIONS)
    }
    // end form

  ngOnInit(): void {
  }
  
  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

}
