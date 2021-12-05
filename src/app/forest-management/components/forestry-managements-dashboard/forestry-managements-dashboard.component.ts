import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardDashboardModel } from 'src/app/shared/components/cards/card-dashboard/card-dashboard.model';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { RouterService } from 'src/app/shared/services/route.service';
import { ForestryManagementService } from '../../services/forestry-management.service';

@Component({
  selector: 'app-forestry-managements-dashboard',
  templateUrl: './forestry-managements-dashboard.component.html',
  styleUrls: ['./forestry-managements-dashboard.component.scss']
})
export class ForestryManagementsDashboardComponent implements OnInit {

  public cards: CardDashboardModel[];
  public md$: Observable<boolean>;

  constructor(
    private forestryManagementService: ForestryManagementService,
    private routerService: RouterService,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {
    this.cards = this.forestryManagementService.getCards();
    this.md$ = this.breakpointService.isMedium();
  }

  public onCardClick(card) {
    console.log(card);
    
    const path: string = `forestry/forest-management/${card}`;
    this.routerService.navigate(path);
  }
}
