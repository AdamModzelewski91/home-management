import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { UserProfileService } from './core/user-profile.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { SmallWidgetComponent } from './shared/small-widget/small-widget.component';
import { TemperatureComponent } from './home/temperature/temperature.component';
import { ConsumptionComponent } from './home/consumption/consumption.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeComponent,
    SmallWidgetComponent,
    TemperatureComponent,
    ConsumptionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [UserProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
