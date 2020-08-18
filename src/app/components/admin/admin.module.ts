import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../../material/material.module';
import {NgxSimpleCalendarModule} from 'ngx-simple-calendar'; 
import { MDBSpinningPreloader } from '../../../../projects/ng-uikit-pro-standard/src/lib/pro/preloader';
import { ToastModule, ToastService } from '../../../../projects/ng-uikit-pro-standard/src/lib/pro/alerts';
import { MDBBootstrapModulesPro } from '../../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { AdminComponent } from './admin.component';
import { ToolbarComponent } from './adminmanager/toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { AdmininfoComponent } from './admininfo/admininfo.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { GestiondequipeComponent } from './gestiondequipe/gestiondequipe.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { EditequipeComponent } from './gestiondequipe/editequipe/editequipe.component';
import { AjoutequipeComponent } from './gestiondequipe/ajoutequipe/ajoutequipe.component';



@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    AdminComponent,
    ToolbarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,

    RegisterComponent,
    PageNotFoundComponent,
    ProfileComponent,
    AdmininfoComponent,
    CalendarComponent,
    ChatComponent,
    EvaluationComponent,
    GestiondequipeComponent,
    EditequipeComponent,
    AjoutequipeComponent,
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSimpleCalendarModule,
    MDBBootstrapModulesPro.forRoot(),
    ToastModule.forRoot(),
    AdminsRoutingModule,
    MaterialModule,
    ChartsModule,
  ],
  providers: [MDBSpinningPreloader, ToastService],
  entryComponents: [
  ],
  exports: [
    AdminComponent,
    PageNotFoundComponent,
  ],
})
export class AdminModule { }
