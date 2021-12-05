import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  tap,
} from 'rxjs/operators';
import { FormatPipe } from 'src/app/shared/pipes/format.pipe';
import { RangePipe } from 'src/app/shared/pipes/range.pipe';
import { QuestionGroupModel } from '../../form/models/question-group.model';
import { SelectOption } from '../../form/models/question-select.model';
import { QuestionTextModel } from '../../form/models/question-text.model';
import { TableFilterService } from '../../table/table-filters/table-filter.service';
import { ColumnModel } from '../column.model';

import { ColumnFilterService } from './column-filter.service';

export interface Range {
  from: any;
  to: any;
}

export interface FilterOption<T> {
  column: ColumnModel<T>;
  option?: SelectOption;
  filter?: string;
  value$?: Observable<string>;
}

@Component({
  selector: 'kkl-column-filter',
  templateUrl: './column-filter.component.html',
  styleUrls: ['./column-filter.component.scss'],
})
export class ColumnFilterComponent<T> implements OnInit {
  @Input() column: ColumnModel<T>;
  @Input() filterSlots: TemplateRef<any>;

  private range: Range;

  public searchQuestion: QuestionTextModel;
  public searchFilter: FormControl;

  public amountFilter: QuestionGroupModel;

  public filterSubject: Subject<FilterOption<T>>;
  public filter$: Observable<FilterOption<T>>;

  public active$: Observable<boolean>;

  @Output() optionSelect: EventEmitter<Observable<FilterOption<T>>> =
    new EventEmitter();

  @Output() dateSelect: EventEmitter<FilterOption<T>> = new EventEmitter();
  @Output() filterAutocomplete: EventEmitter<FilterOption<T>> =
    new EventEmitter();

  constructor(
    private columnFilterService: ColumnFilterService<T>,
    private filterService: TableFilterService<T>,
    private rangePipe: RangePipe
  ) {}

  ngOnInit(): void {
    this.setSearchFilter();

    this.amountFilter = this.columnFilterService.getAmountGroup();

    this.filterSubject = new Subject();

    // handle for active filter style
    this.active$ = this.filterService.isColumnActive$(this.column.columnDef);

    this.filter$ = this.setFilter$();
  }

  private setSearchFilter() {
    const { question, control } = this.columnFilterService.getSearchFilter();
    this.searchFilter = control;
    this.searchQuestion = question;
  }

  // method to fire option value when select
  public onOptionSelect(option: SelectOption): void {
    this.filterEvent({ filter: option.label });
  }

  private emitFilter(value: string): FilterOption<T> {
    const filter: FilterOption<T> = {
      column: this.column,
      value$: of(value),
    };
    if (value.length > 0 && value !== undefined) {
      this.filterAutocomplete.emit(filter);
      this.filterEvent({ filter: value });
    }

    return filter;
  }

  // method which fire filterAutocomplete  search value
  public onAutocomplete(): Observable<FilterOption<T>> {
    return this.searchFilter.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map((value: string) => {
        return this.emitFilter(value);
      })
    );
  }

  // method which fire currency filter value
  private onCurrencyFilter(): Observable<FilterOption<T>> {
    return this.amountFilter.formGroup.valueChanges.pipe(
      debounceTime(400),
      map((range: Range) => {
        return this.rangePipe.transform(range, 'currency');
      }),
      map((value: string) => {
        return this.emitFilter(value);
      })
    );
  }

  // method which combine the stream od autocomplete and currency
  private setFilter$(): Observable<FilterOption<T>> {
    const currencyFilter$ = this.onCurrencyFilter();
    const autocompleteFilter$ = this.onAutocomplete();
    return merge(currencyFilter$, autocompleteFilter$);
  }

  // method which emit range data : date, number
  public rangeEvent(name: string, value: any): void {
    const range = { ...this.range };

    name === 'from' ? (range.from = value) : (range.to = value);
    this.range = { ...range };

    const filter = this.rangePipe.transform(this.range, 'date');

    this.filterEvent({ filter });
  }

  // main method to emit filter option
  public filterEvent(options: { filter?: string }) {
    const { filter } = options;

    const filterOption: FilterOption<T> = { column: this.column, filter };

    // push to table-filter array
    this.filterService.push(filterOption);

    // emit data outside
    this.optionSelect.emit(of(filterOption));
  }
}
