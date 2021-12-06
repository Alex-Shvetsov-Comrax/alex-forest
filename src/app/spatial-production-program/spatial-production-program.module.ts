import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FMPPPSpatialProductionProgramRoutingModule } from './spatial-production-program.routing-model';
import { SharedModule } from '../shared/shared.module';
import { SpaialProductionProgramComponent } from './spaial-production-program/spaial-production-program.component';
import { SpatialTotalTableComponent } from './spatial-total-table/spatial-total-table.component';



@NgModule({
  declarations: [
    SpaialProductionProgramComponent,
    SpatialTotalTableComponent
  ],
  imports: [
    CommonModule,
    FMPPPSpatialProductionProgramRoutingModule,
    SharedModule
  ]
})
export class FmPpSpatialProductionProgramModule { }
