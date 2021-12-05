import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForestryManagementsDashboardComponent } from './components/forestry-managements-dashboard/forestry-managements-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ForestryManagementRoutingModule } from './forest-management-routing.module';



@NgModule({
  declarations: [
    ForestryManagementsDashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ForestryManagementRoutingModule
  ]
})
export class ForestryManagementModule { }
 