// home-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

// Converting UI-Router state configuration to Angular Router routes
// Changed from $stateProvider.state to Routes array with path/component pairs
// Removed 'app.' prefix from state name and converted to path
// Controller and controllerAs are no longer needed as they're defined in the component
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }