import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
myform:FormGroup ; 
  constructor(private fb:FormBuilder,
    private userservice: UserService,
    private router: Router) {
    let formcontrols={
      email : new FormControl(),
      motdepasse: new FormControl()
    }
    this.myform=this.fb.group(formcontrols)
   }

  ngOnInit() {
  }
  role:"employee"
  submit(){
    const usercord={
      'email':this.myform.value.email ,
      'motdepasse':this.myform.value.motdepasse,
    }
    console.log(usercord)

    this.userservice.signInemployee(usercord).subscribe((data)=>{
      this.userservice.initializeLocalStorage(data.token) ; 
      this.userservice.getTokenClaims(data.token);
      setTimeout(() => {
        this.router.navigateByUrl('/user')
      }, 1500);
    }

    )
  }

}
