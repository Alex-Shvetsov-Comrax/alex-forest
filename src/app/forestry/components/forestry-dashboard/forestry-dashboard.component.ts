import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardDashboardModel } from 'src/app/shared/components/cards/card-dashboard/card-dashboard.model';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { RouterService } from 'src/app/shared/services/route.service';
import { ForestryLayoutService } from '../layout/forestry-layout.service';

@Component({
  selector: 'app-forestry-dashboard',
  templateUrl: './forestry-dashboard.component.html',
  styleUrls: ['./forestry-dashboard.component.scss'],
})
export class ForestryDashboardComponent implements OnInit {
  public cards: CardDashboardModel[];
  public md$: Observable<boolean>;

  constructor(
    private forestryService: ForestryLayoutService,
    private routerService: RouterService,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {
    this.cards = this.forestryService.getCards();
    this.md$ = this.breakpointService.isMedium();
  }

  public onCardClick(card) {
    console.log(card);
    
    const path: string = `forestry/${card}`;
    this.routerService.navigate(path);
  }
}
