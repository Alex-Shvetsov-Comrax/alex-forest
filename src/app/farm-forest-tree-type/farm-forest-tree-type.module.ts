import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FarmForestTreeTypeRoutingModule } from './farm-forest-tree-type.routing-model';
import { FarmForestTreeTypeComponent } from './components/farm-forest-tree-type/farm-forest-tree-type.component';
import { FarmForestTreeTypeTotalTableComponent } from './components/farm-forest-tree-type/components/farm-forest-tree-type-total-table/farm-forest-tree-type-total-table.component';
import { FarmForestTreeTypeSingalTableComponent } from './components/farm-forest-tree-type/components/farm-forest-tree-type-singal-table/farm-forest-tree-type-singal-table.component';
import { FarmForestSingalExpandableTableComponent } from './components/farm-forest-tree-type/components/farm-forest-singal-expandable-table/farm-forest-singal-expandable-table.component';



@NgModule({
  declarations: [
    FarmForestTreeTypeComponent,
    FarmForestTreeTypeTotalTableComponent,
    FarmForestTreeTypeSingalTableComponent,
    FarmForestSingalExpandableTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FarmForestTreeTypeRoutingModule
  ]
})
export class FarmForestTreeTypeModule { }
