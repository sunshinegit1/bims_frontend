import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BimsRoutingModule } from './bims-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { NgAntdModule } from 'src/app/shared/common/ng-antd.module';
import { MastersModule } from './masters/masters.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BimsRoutingModule,
    DxDataGridModule,
    DxLoadPanelModule,
    NgAntdModule,
    MastersModule,
    SharedModule
  ]
})
export class BimsModule { }
