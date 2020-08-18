import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { MDBSpinningPreloader } from '../../../../projects/ng-uikit-pro-standard/src/lib/pro/preloader';
import { MDBBootstrapModulesPro } from '../../../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { UserComponent } from './user.component';
import { MaterialModule } from '../../material/material.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import{UserProfileComponent} from'./user-profile/user-profile.component' ; 
import { EvoluationComponent } from './evoluation/evoluation.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthemployeeGuard } from 'src/app/auth/components/authemployee.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ConjeComponent } from './conje/conje.component';
import { QuizComponent } from './quiz/quiz.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ToastrModule,ToastrService } from 'ngx-toastr';

import {NgxSimpleCalendarModule} from 'ngx-simple-calendar'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const userRoutes: Routes = 
  [
      {path: 'userlogin', component: SigninComponent},
  {path: 'userregister', component: SignupComponent},
  {path: 'user' , canActivate:[AuthemployeeGuard],  component: UserComponent ,
    children: [
      {path: 'dashboard' , component: DashboardComponent},
      {path :'conje',component:ConjeComponent},
      {path: 'quiz/:idquiz' , component: QuizComponent},
      {path: 'calendar' , component: CalendarComponent},

      {path: 'profil' , component: UserProfileComponent},
      {path: 'evaluation' , component: EvoluationComponent},
      {path: '', component: DashboardComponent}
    ]
  },
];
@NgModule({
  declarations: [UserComponent,DashboardComponent, SigninComponent, SignupComponent, UserProfileComponent, EvoluationComponent, ToolbarComponent, FooterComponent, ConjeComponent,CalendarComponent, QuizComponent],
  imports: [
    FormsModule,
        ReactiveFormsModule,
    CommonModule,
    NgxSimpleCalendarModule,
    MDBBootstrapModulesPro.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    MaterialModule,
    MatTooltipModule,
    RouterModule.forChild(userRoutes),
    
  ],
  providers: [MDBSpinningPreloader, ToastrService],
  exports: [
    UserComponent,
  ],
})
export class UserModule { }
