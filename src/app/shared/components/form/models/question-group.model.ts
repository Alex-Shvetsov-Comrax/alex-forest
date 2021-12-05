import { FormGroup } from '@angular/forms';
import { Question } from '../services/form.service';
import { ControlType, GridProps } from './question.model';

export type GroupType = 'default' | 'group' | 'custom';

export interface GroupOptions {
  label?: string;
  type?: GroupType;
  controlType?: ControlType;
  formGroup?: FormGroup;
  gridProps?: GridProps;
  hasButton?: boolean;
}

export class QuestionGroupModel {
  public key: string;
  public questions?: Question[];
  public label?: string;
  public icon?: string;
  public type?: GroupType;
  public controlType?: ControlType;
  public formGroup?: FormGroup;
  public gridProps?: GridProps;
  public hasButton?: boolean;
  

  constructor(options?: {
    key: string;
    questions?: Question[];
    label?: string;
    icon?: string;
    type?: GroupType;
    formGroup?: FormGroup;
    gridProps?: GridProps;
    hasButton?: boolean;
  }) {
    this.key = options.key;
    this.label = options.label;
    this.type = options.type || 'default';
    this.controlType = 'group';
    this.icon = '';
    this.questions = options.questions || [];
    this.formGroup = options.formGroup;
    this.gridProps = options.gridProps || { cols: 1 };
    this.hasButton = options.hasButton || false;
  }
}