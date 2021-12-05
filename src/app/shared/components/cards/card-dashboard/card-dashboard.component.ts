import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointService } from 'src/app/shared/services/breakpoint.service';
import { CardDashboardModel } from './card-dashboard.model';

@Component({
  selector: 'kkl-card-dashboard',
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss'],
})
export class CardDashboardComponent implements OnInit {
  @Input() card: CardDashboardModel;

  @Output() onClick = new EventEmitter<CardDashboardModel>();


  constructor(private breakpointService: BreakpointService) {}

  ngOnInit(): void {
    this.subscribeToTablet();
  }

  public onCardClick() {
    this.onClick.emit(this.card);
  }

  private subscribeToTablet() {
    this.breakpointService.isMedium().subscribe((table: boolean) => {
      this.card.size = table ? 6 : 8;
    });
  }
}
