import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';

import { DepotComponent } from './depot/depot.component';
import { ZoneComponent } from './zone/zone.component';
import { ShopComponent } from './shop/shop.component';
import { AgentComponent } from './agent/agent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxButtonModule, DxLoadPanelModule } from 'devextreme-angular';
import { NgAntdModule } from 'src/app/shared/common/ng-antd.module';


@NgModule({
  declarations: [
    DepotComponent,
    ZoneComponent,
    ShopComponent,
    AgentComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxLoadPanelModule,
    FormsModule,
    ReactiveFormsModule,
    NgAntdModule
  ]
})
export class MastersModule { }
