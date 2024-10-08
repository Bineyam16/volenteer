import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsComponent } from '../organizations/organizations.component';
import { AssignComponent } from '../assign/assign.component';
import { OrganizationRequestComponent } from '../organization-request/organization-request.component';


const routes: Routes = [
  
  // {
  //   path: 'service/:id',
  //   component: OrganizationsComponent,
  //   pathMatch: 'prefix'
  // }, {
  //   path: 'service',
  //   component: OrganizationsComponent,
  //   pathMatch: 'prefix'
  // },

  // {
  //   path: "**",
  //   component: OrganizationRequestComponent,
  //   pathMatch: "prefix",
  // },
  {
    path: "service/:formcode",
    component: ServiceComponent,
    pathMatch: "prefix",
  },

  // {
  //   //path: 'services/:ServiceId/:SDP/:ServiceRegCode',
  //   path: 'services/:ServiceId/:SDP/:ServiceRegCode/:serviceProviderCode',
  //   component: ServiceComponent,
  //   pathMatch: 'prefix'
  // },
  {
    
    path: 'services/:ServiceId/:tskID/:formcode',
    // path: 'services/:ServiceId/:SDP/:ServiceRegCode/:serviceProviderCode',
    component: ServiceComponent,
    pathMatch: 'prefix'
  },
  {
    
    path: 'services/:id/:ServiceId/:tskID/:formcode',
    // path: 'services/:ServiceId/:SDP/:ServiceRegCode/:serviceProviderCode',
    component: ServiceComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'services/:id/:AppNo/:tskTyp/:tskID/:docid/:todoID',
    component: ServiceComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'services/:id/:AppNo/:tskTyp/:tskID/:docid/:todoID/:formcode',
    component: ServiceComponent,
    pathMatch: 'prefix'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
