import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { CategoriesComponent } from './categories/quiz.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/app/auth/auth-guard.service';
 import { AdmininfoComponent } from './admininfo/admininfo.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { GestiondequipeComponent } from './gestiondequipe/gestiondequipe.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { EditequipeComponent } from './gestiondequipe/editequipe/editequipe.component';
import { AjoutequipeComponent } from './gestiondequipe/ajoutequipe/ajoutequipe.component';

const adminsRoutes: Routes = [
     {path: '', redirectTo: 'adminlogin', pathMatch:'full'},
    {path: 'adminlogin', component: SigninComponent},
    {path: 'adminregister', component: SignupComponent},
    {path: 'admin' , canActivate:[AuthGuard],  component: AdminComponent ,
      children: [
        {path: 'dashboard' , component: DashboardComponent},
        {path: 'profil' , component: ProfileComponent},
        {path: 'teams' , component: GestiondequipeComponent},
        {path: 'calendar' , component: CalendarComponent},
        {path: 'admininfo' , component: AdmininfoComponent},
        {path : "Evaluation" , component:EvaluationComponent},
        {path: 'addequipe' , component: AjoutequipeComponent},
        {path: 'team/:id/edit' , component: EditequipeComponent},

        {path: '', component: DashboardComponent}
      ]
    },

];

@NgModule({
imports: [RouterModule.forChild(adminsRoutes)],
exports: [RouterModule]
})
export class AdminsRoutingModule {
}