import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'help', loadChildren: () => import('./help-docs/help-docs.module').then(m => m.HelpDocsModule) },
    { path: 'bims', loadChildren: () => import('../apps/bims/bims.module').then(m => m.BimsModule) },
    { path: '**', redirectTo: 'bims' },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppsRoutingModule { }
