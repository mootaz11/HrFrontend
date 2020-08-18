import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from 'src/app/models/admin';
import { AdminsService } from 'src/app/services/admins.service';
import {ModalDirective} from '../../../../../projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive'
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editProfilForm: FormGroup;
  @ViewChild('info', { static: true }) info: ModalDirective;
  constructor(private authService: AuthService, private fb: FormBuilder, private adminsService: AdminsService, private router: Router) { 
    this.createForm();
  }

  ngOnInit() {
    this.initializer();
  }

  createForm(){
    this.editProfilForm = this.fb.group({
      'nom': this.fb.control(null,[Validators.required]),
      'prenom': this.fb.control(null,[Validators.required]),
      'email': this.fb.control({value:null, disabled:true},[Validators.required]),
      'newpassword': this.fb.control(null)
    });
  }

  initializer():void{
    this.editProfilForm.setValue({
      'nom': this.authService.adminAuth.nom,
      "prenom": this.authService.adminAuth.prenom,
      "email": this.authService.adminAuth.email,
      "newpassword":''
    });
  }


  onUpdateProfil(): void{
    const adminToupdate = new Admin();
    adminToupdate.nom = this.editProfilForm.value.nom;
    adminToupdate.prenom = this.editProfilForm.value.prenom;
    if(this.editProfilForm.value.newpassword !== '')
    adminToupdate.motdepasse = this.editProfilForm.value.newpassword;

    this.adminsService.updateAdmin(this.authService.adminAuth._id,adminToupdate).subscribe(
      (data) =>{
        this.authService.adminAuth = data.admin;
        this.info.show();
        setTimeout (
          () => {
          this.info.hide();
          this.router.navigate(['/admin/dashboard']);
       }, 3000);
      }
    );

  }

}
