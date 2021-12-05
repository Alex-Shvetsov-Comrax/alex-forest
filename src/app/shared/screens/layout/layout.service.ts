import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private hideWizard$: BehaviorSubject<boolean>;
  private currentPath$: BehaviorSubject<string>;
  private listen$: BehaviorSubject<boolean>;

  constructor() {
    this.hideWizard$ = new BehaviorSubject<boolean>(false);
    this.currentPath$ = new BehaviorSubject<string>('');
    this.listen$ = new BehaviorSubject<boolean>(true);
  }

  public getWizardObs(): Observable<boolean> {
    return this.hideWizard$.asObservable();
  }

  public toggleWizard(value: boolean) {
    return this.hideWizard$.next(value);
  }

  public getCurrentPathObs(): Observable<string> {
    return this.currentPath$.asObservable();
  }
  

  public emitCurrentPath(value: string) {
    return this.currentPath$.next(value);
  }

  public getListen(): Observable<boolean>{
    return this.listen$.asObservable();
  }

  public setListen(bool:boolean){
    console.log(bool);
    
    return this.listen$.next(bool);
  }
}
