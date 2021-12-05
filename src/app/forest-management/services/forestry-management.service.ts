import { Injectable } from '@angular/core';
import { CardDashboardModel } from 'src/app/shared/components/cards/card-dashboard/card-dashboard.model';
import { CardStepModel } from 'src/app/shared/components/cards/card-step/card-step.model';

@Injectable({
  providedIn: 'root'
})
export class ForestryManagementService {
  private steps: CardStepModel[] = [
    new CardStepModel({
      label: 'תהליך דילול',
      svgUrl: 'group',
      path: 'dilution-process', 
      size: 3,
      variant: 'square', 
      type: 'wizard',
    }),
    new CardStepModel({
      label: ' תוכנית יצור',
      svgUrl: 'connect',
      path: 'production-process',
      size: 3,
      variant: 'square',
      type: 'wizard',
    }),
    new CardStepModel({
      label: 'איסוף זרעים',
      svgUrl: 'group',
      path: 'seed-collection', 
      size: 3,
      variant: 'square', 
      type: 'wizard',
    }),
    new CardStepModel({
      label: 'ניהול מלאי',
      svgUrl: 'connect',
      path: 'Inventory-management',
      size: 3,
      variant: 'square',
      type: 'wizard',
    }),

  ];

  constructor() { }

  
  public getCards(): CardDashboardModel[] {
    return this.getSteps().map((item: CardStepModel) => {
      return new CardDashboardModel({
        ...item,
      });
    });
  }

  public getSteps(): CardStepModel[] {
    return [...this.steps];
  }

  // public getStatus() {
  //   return this.status;
  // }
}
