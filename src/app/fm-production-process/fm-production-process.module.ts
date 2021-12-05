import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductionProcessComponent } from './components/production-process/production-process.component';
import { FMProductionProccesRoutingModule } from './fm-production-process-routing.module';
import { ProductionProccesHeaderComponent } from './components/production-process/components/production-procces-header/production-procces-header.component';
import { ProductionProccesFormComponent } from './components/production-process/components/production-procces-form/production-procces-form.component';
import { ProductionProccesTableComponent } from './components/production-process/components/production-procces-table/production-procces-table.component';
import { AddProductionProcessComponent } from './components/add-production-process/add-production-process.component';
import { ProductionProcessStatusTableComponent } from './components/production-process-status-table/production-process-status-table.component';



@NgModule({
  declarations: [
    ProductionProcessComponent,
    ProductionProccesHeaderComponent,
    ProductionProccesFormComponent,
    ProductionProccesTableComponent,
    AddProductionProcessComponent,
    ProductionProcessStatusTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    FMProductionProccesRoutingModule
  ]
})
export class FMProductionProcessModule { }



