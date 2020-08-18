import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 myForm: FormGroup ; 
  constructor( private fb:FormBuilder) { 
    let formcontrols={
      nom : new FormControl(),
      prenom: new FormControl(),
      email :  new FormControl(),
      datedenais:  new FormControl(), 
      motdepasse:  new FormControl()
    }
    this.myForm=this.fb.group(formcontrols)
  }

  ngOnInit() {
  }

}
