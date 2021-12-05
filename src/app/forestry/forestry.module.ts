import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ForestryRootComponent } from './components/forestry-root/forestry-root.component';
import { ForestryLayoutComponent } from './components/layout/forestry-layout.component';
import { ForestryDashboardComponent } from './components/forestry-dashboard/forestry-dashboard.component';
import { ForestryRoutingModule } from './forestry-routing.module';
import { PREFIX_MODULE } from '../shared/constants/prefix-module';


@NgModule({
  declarations: [
    ForestryRootComponent,
    ForestryLayoutComponent,
    ForestryDashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ForestryRoutingModule
  ],
  providers: [{ provide: PREFIX_MODULE, useValue: 'forestry' }], 

}) 
export class ForestryModule { }
