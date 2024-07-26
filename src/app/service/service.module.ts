import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';
import { MyTaskModule } from '../my-task/my-task.module';
import { ServiceRoutingModule } from './service-routing.module';
import { ToastModule } from 'primeng/toast'; 
import { VolunteerComponent } from '../volunteer/volunteer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { AssignComponent } from '../assign/assign.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MatSelectModule } from '@angular/material/select';
import { MessageService } from 'primeng/api'; 
import { ServyjsonComponent } from '../servyjson/servyjson.component';
import { DialogModule } from "primeng/dialog";
//import { TabViewModule } from 'primeng/tabview';
import { TabsModule } from "ngx-bootstrap/tabs";
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OrganizationsComponent } from '../organizations/organizations.component';
import {MatStepperModule} from '@angular/material/stepper';
import { OrganizationRequestComponent } from '../organization-request/organization-request.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HomeComponent } from '../home/home.component';
import { FormDisplayComponent } from '../form-display/form-display.component';
import { FileUploadModule } from 'primeng/fileupload';
import { FilesComponent } from '../files/files.component';
import { MatDialogModule } from '@angular/material/dialog';
//import { SidebarModule } from "ng-sidebar";
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { ValidationComponent } from '../validation/validation.component';
import { FormPrintComponent } from '../form-print/form-print.component';
import { AccordionModule } from 'primeng/accordion';
import { CookieService } from "ngx-cookie-service";
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
ServiceComponent,VolunteerComponent,AssignComponent,
ServyjsonComponent,OrganizationsComponent,OrganizationRequestComponent,HomeComponent,FormDisplayComponent,FilesComponent,FormPrintComponent,
ValidationComponent
  ],
  imports: [
    MatDialogModule,
    CardModule,
    TranslateModule.forChild({}),

    MatIconModule,
    FileUploadModule,
    ProgressSpinnerModule,
    SidebarModule ,
    MatDatepickerModule,
    MatStepperModule,
   TabViewModule,
   AccordionModule,MatRadioModule,
    FormsModule ,
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,ServiceRoutingModule,
    MyTaskModule,  
    MatSelectModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    AvatarModule,
    ToastModule ,
    TabsModule.forRoot()
    
  ],
  
  providers: [MessageService,CookieService],
  exports: [FilesComponent]
})
export class ServiceModule { }
