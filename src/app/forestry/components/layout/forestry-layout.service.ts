import { Injectable } from '@angular/core';
import { CardDashboardModel } from 'src/app/shared/components/cards/card-dashboard/card-dashboard.model';
import { CardStatusModel } from 'src/app/shared/components/cards/card-status/card-status.model';
import { CardStepModel } from 'src/app/shared/components/cards/card-step/card-step.model';
import { IconModel } from 'src/app/shared/components/icon/icon.model';

@Injectable({
  providedIn: 'root',
})
export class ForestryLayoutService {

  //dashboaed icons
  private steps: CardStepModel[] = [
    new CardStepModel({
      label: 'ניהול יער',
      svgUrl: 'group',
      path: 'forest-management', 
      size: 3,
      variant: 'square', 
      type: 'wizard',
    }),
    new CardStepModel({
      label: 'תכנון תוכניות עבודה',
      svgUrl: 'connect',
      path: 'existing-procedures',
      size: 3,
      variant: 'square',
      type: 'wizard',
    }),

  ];


  //nav icons
  public status: CardStatusModel[] = [
    new CardStatusModel({
      label: 'בטיפול - הזנת פרטים',
      svgUrl: 'reload',
      value: 6,
      type: 'status',
      options: [
        {
          label: 'בטיפול', value : 1,
        },
        {
          label: 'ממתין', value : 3,
        },
        {
          label: 'ספקים', value : 6,
        },
      ],
    }),

    
    new CardStatusModel({
      label: 'בטיפול - עריכת ספקים',
      svgUrl: 'reload',
      value: 2,
      type: 'status',
    }),
    new CardStatusModel({
      label: 'ממתין לשליחת הצעת מחיר',
      svgUrl: 'flag',
      value: 3,
      type: 'status',
    }),
    new CardStatusModel({
      label: 'ממתין לקבלת הצעת מחיר',
      svgUrl: 'time',
      value: 4,
      type: 'status',
    }),
    new CardStatusModel({
      label: 'ממתין לבחירת זוכים',
      svgUrl: 'flag',
      value: 6,
      type: 'status',
    }),
  ];

  public logos: IconModel[] = [new IconModel('logo', 7, 'svg')];

  public titles: Map<string, string> = new Map([]);

  constructor() {}

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

  public getStatus() {
    return this.status;
  }
}
