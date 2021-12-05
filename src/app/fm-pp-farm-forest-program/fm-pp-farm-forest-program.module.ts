import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FMPPPFarmForestProgramRoutingModule } from './fm-pp-farm-forest-program.routing-model';
import { SharedModule } from '../shared/shared.module';
import { FarmForestComponent } from './components/farm-forest/farm-forest.component';
import { FarmForestTableComponent } from './components/farm-forest/components/farm-forest-table/farm-forest-table.component';
import { FarmForestResultsComponent } from './components/farm-forest-results/farm-forest-results.component';
import { FarmForestTotalTableComponent } from './components/farm-forest-results/components/farm-forest-total-table/farm-forest-total-table.component';
import { FarmForestTreeTableComponent } from './components/farm-forest-results/components/farm-forest-tree-table/farm-forest-tree-table.component';
import { FarmForestTreeTableExpandableComponent } from './components/farm-forest-results/components/farm-forest-tree-table-expandable/farm-forest-tree-table-expandable.component';



@NgModule({
  declarations: [
    FarmForestComponent,
    FarmForestTableComponent,
    FarmForestResultsComponent,
    FarmForestTotalTableComponent,
    FarmForestTreeTableComponent,
    FarmForestTreeTableExpandableComponent
  ],
  imports: [
    CommonModule,
    FMPPPFarmForestProgramRoutingModule,
    SharedModule
  ]
})
export class FmPpFarmForestProgramModule { }
