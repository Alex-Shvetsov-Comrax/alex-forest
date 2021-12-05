import { ValidatorFn } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

export interface GridProps {
  cols?: number;
  rows?: number;
  offset?: number;
  gutter?: number;
  fullWidth?: boolean;
}

export type ControlType =
  | 'text'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'calendar'
  | 'radio'
  | 'date'
  | 'group'
  | 'custom'
  | 'currency'
  | 'autocomplete';

export type QuestionType = 'default' | 'group' | 'custom';

export type Appearance = 'none' | MatFormFieldAppearance


// key: columnDef,
// controlType: controlCustom ,
// label: label,
// icon: inputIcon,
// options: selectOptions,
export abstract class QuestionBaseModel<T> {
  public key: any;
  public label?: string;
  public value?: T | undefined;
  public appearance?: Appearance
  public type?: QuestionType;
  public format?: string;
  public controlType?: ControlType;
  public gridProps?: GridProps;
  public icon?: string;
  public customRef?: string;
  public validations?: ValidatorFn[];
  public disabled?: boolean;
  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    appearance?: Appearance;
    type?: QuestionType;
    format?: string;
    controlType?: ControlType;
    disabled?: boolean;
    gridProps?: GridProps;
    icon?: string;
    customRef?: string;
    validations?: ValidatorFn[];
  }) {
    this.key = options.key || '';
    this.value = options.value;
    this.label = options.label || '';
    this.appearance = options.appearance || 'outline';
    this.type = options.type || 'default';
    this.format = options.format;
    this.controlType = options.controlType || 'text';
    this.disabled = this.disabled || false;
    this.validations = options.validations || [];
    this.gridProps = options.gridProps || {
      cols: 1,
      rows: 1,
      gutter: 0,
      offset: 0,
      fullWidth: false,
    };
    this.icon = options.icon || '';
    this.customRef = options.customRef || '';
  }
}
