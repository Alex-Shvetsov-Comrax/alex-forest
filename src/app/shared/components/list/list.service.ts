import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor() {}

  public findItem(items: Array<any>, key: string, value: string): any {
    return items.find((item) => item[key] === value);
  }

  public findItemIndex(items: Array<any>, key: string, value: any): number {
    return items.findIndex((item) => item[key] === value);
  }
}
