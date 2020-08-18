import { Component, OnInit } from '@angular/core';
import{FormGroup, FormControl,FormBuilder} from "@angular/forms"
import {  Admin } from 'src/app/models/admin';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  Myform: FormGroup ; 
  loader : boolean= false ;
selectedpicture; 
selectedcv ;
  constructor(private Fb:FormBuilder ,
    private router:Router ,
    private authService:AuthService,
    ) { 
    let formcontrols={
      nom :new FormControl(),
      prenom :new FormControl(),
      email : new FormControl(),
      motdepasse :  new FormControl(),
      datedenais :  new FormControl()
    }
    this.Myform=this.Fb.group(formcontrols);
  }
  oncvselected(event){
this.selectedcv=event.target.files[0]
console.log(this.selectedcv)
  }
  onpictureselected(event){
    console.log(event)
    this.selectedpicture=event.target.files[0]
  }
  roletype="admin"
  saveuser(){
    this.loader = true;
    var formdata : any = new FormData();
    formdata.append('nom',this.Myform.value.nom)
    formdata.append('prenom',this.Myform.value.prenom)
    formdata.append('email',this.Myform.value.email)
    formdata.append('motdepasse',this.Myform.value.motdepasse)
    formdata.append('image',this.selectedpicture)
    formdata.append('cv',this.selectedcv)
    formdata.append('datenaissance',this.Myform.value.datedenais)
    formdata.append('roleType',this.roletype)
    const admin= new Admin()
    admin.nom = this.Myform.value.nom ; 
    admin.prenom = this.Myform.value.prenom
    admin.email=this.Myform.value.email
    admin.motdepasse =this.Myform.value.motdepasse
    admin.image =this.selectedpicture
    admin.cv =this.selectedcv
    admin.datenaissance=this.Myform.value.datedenais
    admin.roleType =this.roletype
    this.authService.signUpAdmin(formdata).subscribe(
      () =>{
        const usercord = {
          'email':this.Myform.value.email, 
          'motdepasse':this.Myform.value.motdepasse
         };
        this.authService.signInAdmin(usercord).subscribe(
          (data)=>{
       this.authService.initializeLocalStorage(data.token);
       this.authService.getTokenClaims(data.token);
       setTimeout (() => {
         this.router.navigateByUrl('/admin');
      }, 1500);
          }
        );
      }
    );
  }

  ngOnInit() {
  }

}
