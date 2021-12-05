import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BeePastureRoutingModule } from './bee-pasture-routing.module';
import { AddBeePastureComponent } from './components/add-bee-pasture/add-bee-pasture.component';
import { AddBeePastureTableComponent } from './components/add-bee-pasture/components/add-bee-pasture-table/add-bee-pasture-table.component';
import { ResultsBeePastureComponent } from './components/results-bee-pasture/results-bee-pasture.component';
import { ResultsBeePastureTotalTableComponent } from './components/results-bee-pasture/components/results-bee-pasture-total-table/results-bee-pasture-total-table.component';
import { ResultsBeePastureSingalTableComponent } from './components/results-bee-pasture/components/results-bee-pasture-singal-table/results-bee-pasture-singal-table.component';


@NgModule({
  declarations: [
    AddBeePastureComponent,
    AddBeePastureTableComponent,
    ResultsBeePastureComponent,
    ResultsBeePastureTotalTableComponent,
    ResultsBeePastureSingalTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    BeePastureRoutingModule

  ]
})
export class BeePastureModule { }



