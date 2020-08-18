import {Component,EventEmitter, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import { Admin } from 'src/app/models/admin';
import {role} from 'src/app/models/role';
import { UploadFile, UploadInput, UploadOutput } from 'ng-uikit-pro-standard';
// import { FormGroup, Validators, FormBuilder} from "@angular/forms";

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f',{static:false}) registerForm: NgForm;
  files: UploadFile[];
  dragOver: boolean;
  uploadInput: EventEmitter<UploadInput>;
  selectedFile: File ;

  loader: boolean = false;
  constructor(private authService: AuthService, private router: Router) { 
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  ngOnInit() {
  }
  showFiles() {
    let files = '';
    for (let i = 0; i < this.files.length; i ++) {
      files += this.files[i].name;
      if (!(this.files.length - 1 === i)) {
        files += ',';
      }
    }
    return files;
  }
  
  onUploadOutput(output: UploadOutput | any): void {
    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
    this.showFiles();
  }
  onSubmit(): void {
      this.loader = true;
      const newrole = new role();
      newrole.type="admin" 
          const newAdmin  = new Admin();
      newAdmin.email = this.registerForm.value.email;
      newAdmin.nom = this.registerForm.value.nom;
      newAdmin.prenom = this.registerForm.value.prenom;
      newAdmin.motdepasse = this.registerForm.value.password;
      newAdmin.image=this.registerForm.value.image ; 
      newAdmin.cv=this.registerForm.value.pdf ; 
      newAdmin.role=newrole 
      newAdmin.datenaissance=""
      newAdmin.roleType=newrole.type

      this.authService.signUpAdmin(newAdmin).subscribe(
        () =>{
          const usercord = {
            'email': newAdmin.email, 
            'motdepasse': newAdmin.motdepasse
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
}
