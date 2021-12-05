import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kkl-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
})
export class TableActionsComponent implements OnInit {

  @Input() public mode$: Observable<string>;

  @Input() public buttonSlots: {};

  @Input() public hasDelete: boolean;
  @Input() public hasEdit: boolean;
  @Input() public editable: boolean;

  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<void> = new EventEmitter<void>();

  public save$: Observable<boolean>;
  constructor() {}

  ngOnInit(): void {
    this.save$ = this.mode$.pipe(map((mode: string) => mode === 'edit' || mode === 'add'));
  }

  public onDelete() {
    this.delete.emit();
  }

  public onEdit() {
    this.edit.emit();
  }
  public onSave() {
    this.save.emit();
  }
}
