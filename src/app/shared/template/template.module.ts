import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from '../shared.module';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { HeaderComponent } from "./header/header.component";
import { SearchComponent } from "./search/search.component";
import { QuickViewComponent } from './quick-view/quick-view.component';
import { SideNavComponent } from "./side-nav/side-nav.component";
import { FooterComponent } from "./footer/footer.component";

import { SideNavDirective } from "../directives/side-nav.directive";
import { ThemeConstantService } from '../services/theme-constant.service';


import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMenuModule } from 'ng-zorro-antd/menu';

const antdModule = [
    NzAvatarModule,
    NzBadgeModule,
    NzRadioModule,
    NzDropDownModule,
    NzListModule,
    NzDrawerModule,
    NzDividerModule,
    NzSwitchModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule,
    NzMenuModule
]

@NgModule({
    exports: [
        CommonModule,
        HeaderComponent,
        SearchComponent,
        QuickViewComponent,
        SideNavComponent,
        SideNavDirective,
        FooterComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        SharedModule,
        NzSkeletonModule,
        NzSpaceModule,
        ...antdModule
    ],
    declarations: [
        HeaderComponent,
        SearchComponent,
        QuickViewComponent,
        SideNavComponent,
        SideNavDirective,
        FooterComponent
    ],
    providers: [ 
        ThemeConstantService
    ]
})

export class TemplateModule { }
