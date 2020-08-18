import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
myform:FormGroup ; 
  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private router: Router) {
    let formcontrols={
      email : new FormControl(),
      motdepasse: new FormControl()
    }
    this.myform=this.fb.group(formcontrols)
   }

  ngOnInit() {
  }
  loader: boolean = false;

  role:"admin"
  submit(){
    this.loader = true;

    const usercord={
      'email':this.myform.value.email ,
      'motdepasse':this.myform.value.motdepasse,
    }
    console.log(usercord)

    this.authService.signInAdmin(usercord).subscribe(
      (data) => {
        this.authService.initializeLocalStorage(data.token);
        this.authService.getTokenClaims(data.token);
        setTimeout (() => {
          this.router.navigateByUrl('/admin');
       }, 1500); }
    )
  }

}
