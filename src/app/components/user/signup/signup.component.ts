import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms"
import { webSocket } from 'rxjs/webSocket';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  Myform: FormGroup;
  selectedpicture: File;
  selectedcv: File;
  socket =webSocket("ws://localhost:3030/");
  constructor(private Fb: FormBuilder,private userService : UserService
  ) {

    //this.socket.connect();
    let formcontrols = {
      nom: new FormControl(),
      prenom: new FormControl(),
      email: new FormControl(),
      motdepasse: new FormControl(),
      datedenais: new FormControl()}
    this.Myform = this.Fb.group(formcontrols);
  
  }
  oncvselected(event) {
    this.selectedcv = <File>event.target.files[0]
  }
  onpictureselected(event) {
    this.selectedpicture = <File>event.target.files[0]
  }
  roletype = "employee"







  saveuser() {

    var formdata = new FormData();
    formdata.append('nom', this.Myform.value.nom)
    formdata.append('prenom', this.Myform.value.prenom)
    formdata.append('email', this.Myform.value.email)
    formdata.append('motdepasse', this.Myform.value.motdepasse)
    formdata.append('image', this.selectedpicture, this.selectedpicture.name);
    formdata.append('cv', this.selectedcv, this.selectedcv.name);
    formdata.append('datenaissance', this.Myform.value.datedenais)
    formdata.append('roleType', this.roletype)
    
    
    this.userService.singupEmployee(formdata).subscribe(()=>{
      this.socket.subscribe();
      this.socket.next({message:'a new employee has registred check in your employees list ',destination:"admin",employee:{
        nom:formdata.get('nom'),
        prenom:formdata.get('prenom')},
        email:formdata.get('email')
      });
        this.socket.complete();
        console.log("done");


    },err=>{
      console.error(err);
    })
    
   
    
  
  
    }

  

  ngOnInit() {
  
  }
 

} 
