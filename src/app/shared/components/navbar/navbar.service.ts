import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeAll } from 'rxjs/operators';
import { CardStepModel } from '../cards/card-step/card-step.model';
import { IconModel } from '../icon/icon.model';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {

  private logos: IconModel[] = [new IconModel('logo', 7)];

  private headers: { [key: string]: string }

  private title$: BehaviorSubject<string>;
  private headers$: BehaviorSubject<Observable<string>>;
  private status$: BehaviorSubject<CardStepModel[]>;
  private showStatus$: BehaviorSubject<boolean>;

  constructor() {
    this.title$ = new BehaviorSubject<string>('');

    this.status$ = new BehaviorSubject<CardStepModel[]>([]);
    this.showStatus$ = new BehaviorSubject<boolean>(false)
  }


  public setHeaders(headers: { [key: string]: string }): void {
    this.headers = headers;
  }

  public setHeadersObs(headers:Observable<string>): void {
    this.headers$ = new BehaviorSubject<Observable<string>>(headers);
  }

  public getHeadersObs(): Observable<string> {
    return this.headers$.asObservable().pipe(mergeAll())
  }

  public getTitleObs(): Observable<string> {
    return this.title$.asObservable();
  }

  public emitTitle(key: string): void {
    this.title$.next(this.headers[key])
  }

  public getStatusObs(): Observable<CardStepModel[]> {
    return this.status$.asObservable();
  }

  public emitStatus(value: CardStepModel[]): void {
    this.status$.next(value);
  }

  public getShowStatusObs(): Observable<boolean> {
    return this.showStatus$.asObservable();
  }

  public emitShowStatus(value: boolean): void {
    this.showStatus$.next(value);
  }

  public toggleStatus(show: boolean, status: CardStepModel[]): void {
    show ? this.emitStatus(status) : this.emitStatus([]);
  }
}
