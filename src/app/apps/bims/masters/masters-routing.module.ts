import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
import { DepotComponent } from './depot/depot.component';
import { ShopComponent } from './shop/shop.component';
import { ZoneComponent } from './zone/zone.component';

const routes: Routes = [
  {path:'depot', component: DepotComponent},
  {path:'shop', component: ShopComponent},
  {path:'zone', component: ZoneComponent},
  {path:'agent', component: AgentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
