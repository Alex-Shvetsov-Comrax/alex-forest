import { FormGroup } from '@angular/forms';
import { ColumnDef } from '../../columns/column.model';
import { Question } from '../../form/services/form.service';

export interface RowState {
  pending: boolean;
  editable: boolean;
  expanded: boolean;
  data: any;
}

export class RowModel<T> {
  public item: T;
  public formGroup: FormGroup;
  public pending: boolean;
  public editable: boolean;
  public expanded: boolean;
  public questionsGroup: { [x: string]: Question };
  public activeColumn: ColumnDef<T>;

  constructor(options?: {
    item?: T;
    pending?: boolean;
    editable?: boolean;
    expanded?: boolean;
    questionsGroup?: {};
  }) {
    this.item = options?.item;
    this.pending = options?.pending || false;
    this.editable = options?.editable || false;
    this.expanded = options?.expanded || false;
    this.questionsGroup = options?.questionsGroup || {};
  }
}
