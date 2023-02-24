import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'masters', loadChildren:()=> import('./masters/masters.module').then(m => m.MastersModule)},
  {path:'dashboard', component: DashboardComponent},
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BimsRoutingModule { }
