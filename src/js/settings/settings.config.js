// settings-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { AuthGuard } from '../core/guards/auth.guard';

// Converting UI-Router state to Angular Router routes
// - Replaced $stateProvider.state with Routes array
// - Converted 'app.settings' state to a route with path 'settings'
// - Replaced auth resolve with AuthGuard
const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Settings' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}