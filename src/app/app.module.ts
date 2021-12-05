import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootComponent } from './root/root.component';
import { SharedModule } from './shared/shared.module';
import { FormatPipe } from './shared/pipes/format.pipe';
import { ForestryManagementModule } from './forest-management/forest-management.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ForestryManagementModule
  ],
  providers: [

    FormatPipe,
  ],
  bootstrap: [RootComponent],
})
export class AppModule {}
