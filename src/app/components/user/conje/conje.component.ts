import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ConjeService } from 'src/app/services/conje.service';
import { ModalDirective } from 'projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive';

@Component({
  selector: 'app-conje',
  templateUrl: './conje.component.html',
  styleUrls: ['./conje.component.scss']
})
export class ConjeComponent implements OnInit {
  @ViewChild('success', { static: true }) success: ModalDirective;

  myform : FormGroup;
  constructor(private fb : FormBuilder, 
    private userService: UserService , 
    // private toastr: ToastService,

    private conjeservice :ConjeService) { 
    let formcontrols={
      datededebut: new FormControl(),
      datedefin: new FormControl(),
      cause: new FormControl(),
      detaille : new FormControl(),
    }
    this.myform=this.fb.group(formcontrols)
  }

  ngOnInit() {
  }
  employeename=''
  onSubmit(){
    console.log(this.myform.value)
    const tokenloc = localStorage.getItem('access_token');
    var token : any = tokenloc;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenInfo = JSON.parse(window.atob(base64));
    this.userService.getemployee(tokenInfo.employee_id).subscribe(res=>{
   console.log(res.nom)
   this.employeename=res.nom
  //  this.employeename.concat(res.nom.toString()+" "+res.prenom.toString())
   console.log(this.employeename)

  })
  const conjcor: any ={
    'employeename' : this.employeename , 
    'datededebut': this.myform.value.datededebut,
    'datedefin': this.myform.value.datededefin,
    'cause': this.myform.value.cause,
    'detaille': this.myform.value.detaille
   }
   this.conjeservice.addconje(conjcor).subscribe(()=>{
    this.success.show();
    setTimeout (() => {
      this.success.hide();
   }, 3000);
   })
} }
