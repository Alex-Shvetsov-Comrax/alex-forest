import { Directive, HostBinding, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  CardStepModel,
  StepType,
} from '../components/cards/card-step/card-step.model';
import { BreakpointService } from '../services/breakpoint.service';

@Directive({
  selector: '[appSize]',
})
export class SizeDirective {
  @Input() step: CardStepModel;
  @Input() size: number;
  @Input() type: StepType;
  @Input() divider: number;
  @Input() space: number;

  private md$: Observable<boolean>;

  private subscription: Subscription;

  @HostBinding('style.height') public height: string;
  @HostBinding('style.width') public width: string;

  constructor(private breakpointService: BreakpointService) {}

  ngOnInit(): void {
    this.setSize();
    this.md$ = this.breakpointService.isMedium();
    this.subscribeToBreakpoint();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setSize() {
    switch (this.type) {
      case 'wizard':
        this.width = '8rem';
        this.height = '7.5rem';
        break;
      case 'status':
        this.width = `${6 * (this.space || 1)}rem`;
        this.height = `6rem`;
        break;
      case 'step':
        this.width = `9rem`;
        this.height = `12rem`;
        break;
      case 'icon':
        this.width = `${this.size}rem`;
        this.height = `${this.size}rem`;
        break;
      default:
        this.width = `${this.size * (this.divider || 1)}rem`;
        this.height = `${this.size}rem`;
    }
  }

  private subscribeToBreakpoint() {
    this.subscription = this.md$.subscribe((tablet: boolean) => {
      this.setSize();
    });
  }
}
