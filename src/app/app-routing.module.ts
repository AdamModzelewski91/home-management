import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full', },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'prefix' },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
