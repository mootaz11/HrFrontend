import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { MDBSpinningPreloader } from '../../projects/ng-uikit-pro-standard/src/lib/pro/preloader';
import { MDBBootstrapModulesPro } from '../../projects/ng-uikit-pro-standard/src/lib/mdb.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UserModule } from './components/user/user.module';
import { AdminModule } from './components/admin/admin.module';

import { AdminsService } from './services/admins.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WebsocketService } from './services/websocket.service';
import { ToastrModule,ToastrService } from 'ngx-toastr';

@NgModule({
  
  declarations: [AppComponent],
  
  
  imports: [
    FlexLayoutModule ,
    BrowserModule,
    MDBBootstrapModulesPro.forRoot(),
    MaterialModule,
    UserModule,
    AdminModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added


  ],
  providers: [
    ToastrService,
    MDBSpinningPreloader, 
    AdminsService,
    AuthService,
    WebsocketService,
    {provide: HTTP_INTERCEPTORS ,  useClass:AuthInterceptor, multi: true},
    AuthGuard
    ],
  bootstrap: [AppComponent],
})

export class AppModule {}
