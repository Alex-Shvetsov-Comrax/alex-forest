import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaialProductionProgramComponent } from './components/spaial-production-program/spaial-production-program.component';
import { FMPPPSpatialProductionProgramRoutingModule } from './fm-pp-spatial-production-program.routing-model';
import { SharedModule } from '../shared/shared.module';
import { SpatialTotalTableComponent } from './components/spatial-total-table/spatial-total-table.component';



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
