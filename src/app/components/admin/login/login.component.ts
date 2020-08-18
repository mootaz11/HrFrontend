import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('f',{static:false}) loginForm: NgForm;
  loader: boolean = false;
  constructor(private router: Router, private authService:AuthService) { }
  view="password"
  $event: any ; 
    ngOnInit() {

  }
  onSubmit(): void{
    this.loader = true;
    const usercord = {
       'email': this.loginForm.value.email, 
       'motdepasse': this.loginForm.value.password,
      };
    this.authService.signInAdmin(usercord).subscribe(
      (data) => {
        this.authService.initializeLocalStorage(data.token);
        this.authService.getTokenClaims(data.token);
        setTimeout (() => {
          this.router.navigateByUrl('/admin');
       }, 1500);
      }
    );
  }
}
