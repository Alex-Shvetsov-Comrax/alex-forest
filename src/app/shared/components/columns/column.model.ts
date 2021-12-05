import { ControlType } from 'src/app/shared/components/form/models/question.model';
import { SelectOption } from '../form/models/question-select.model';
import { ElementRef } from '@angular/core';
import { Question } from '../form/services/form.service';

export interface ColumnState {
  expendable?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  data: any
}

export declare type ColumnDef<T> = keyof T | 'select' | 'actions' | '' | string;

export declare type SortDir = 'desc' | 'asc';

export declare type ColumnType =
  | 'number'
  | 'date'
  | 'text'
  | 'custom'
  | 'actions'
  | 'select'
  | 'calender'
  | 'file'
  | 'expend';


export class ColumnModel<T> {
  public columnDef?: ColumnDef<T>;
  public label?: string;
  public format?: string;
  public type?: ColumnType;
  public slotRef?: ElementRef;
  public center?: boolean;
  public expendable?: boolean;
  public selectable?: boolean;

  public sortable?: boolean;
  public sortDir?: SortDir;

  public footer?: boolean;

  public control?: ControlType;
  public controlCustom?: ControlType;

  public inputIcon?: string;
  public selectOptions? : SelectOption[];
  public questions?: Question[];

  // question
public question?:Question

  public filterable?: boolean;
  public filterSlots?: any[]; 
  public filterOptions?: SelectOption[];

  constructor(options?: {
    columnDef?: ColumnDef<T>;
    label?: string;
    type?: ColumnType;
    format?: string;
    slotRef?: ElementRef;
    expendable?: boolean;
    selectable?: boolean;
    center?: boolean;
    sortable?: boolean;
    sortDir?: SortDir;
    filterable?: boolean;
    filterOptions?: SelectOption[];
    filterSlots?: any[];
    footer?: boolean;
    inputIcon?: string;
    selectOptions? : SelectOption[];
    questions?: Question[];
    question?: Question;
    control?: ControlType;
    controlCustom?: ControlType;
  }) {
    this.columnDef = options?.columnDef || '';
    this.label = options?.label || '';
    this.type = options?.type || 'text';
    this.control = options?.control;
    this.controlCustom = options?.controlCustom;
    this.format = options?.format;
    this.slotRef = options?.slotRef || null;
    this.center = options?.center || false;
    this.expendable = options?.expendable || false;
    this.selectable = options?.selectable || false;
    this.sortable = options?.sortable || false;
    this.sortDir = options?.sortDir || 'asc';
    this.filterable = options?.filterable || false;
    this.filterOptions = options?.filterOptions || [];
    this.filterSlots = options?.filterSlots || null;
    this.footer = options?.footer || false;
    this.inputIcon = options?.inputIcon;
    this.selectOptions = options?.selectOptions || []
    this.questions = options?.questions || []
    this.question = options?.question
  }
}
 