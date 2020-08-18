import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
// import { Router } from '@angular/router';
import { ModalDirective } from 'projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive';
// import { EquipeService } from 'src/app/services/equipe.service';
import { UserService } from 'src/app/services/user.service';
import { EquipeService } from 'src/app/services/equipe.service';
@Component({
  selector: 'app-ajoutequipe',
  templateUrl: './ajoutequipe.component.html',
  styleUrls: ['./ajoutequipe.component.scss']
})
export class AjoutequipeComponent implements OnInit {

  @ViewChild('success', { static: true }) success: ModalDirective;
  optionsSelect: Array<any>;
  addEquipeForm: FormGroup;
  constructor( private employeeService: UserService,
    private equipeService : EquipeService) {

  }

  ngOnInit() {
    this.addEquipeForm = new FormGroup({
      'name': new FormControl(null,[Validators.required]),
      'teamLeader': new FormControl(null,[Validators.required]),
      'employee': new FormControl(null,[Validators.required]),
    });
    this.getemployename()
  }
  data =[]; 
getemployename(){
  this.employeeService.getallemployee().subscribe(res=>{
    this.data=JSON.parse(JSON.stringify(res))
  })
}
  addNewEquipe(){
let usercord: any ={
  "name":this.addEquipeForm.value.name,
}
 this.equipeService.addEquipe(usercord).subscribe(res=>{
   console.log(res)
 })
 
  }
  // addNewEquipe(): void {
    /*console.log(this.addEquipeForm);
    console.log(this.files[0]);*/
    // var formdata : any = new FormData();
    // formdata.append("nom",this.addEquipeForm.value.nom);
    // formdata.append("invites",this.addEquipeForm.value.invites);
    // formdata.append("sequence",this.files[0].nativeFile);
  //   this.episodesService.addEpisode(formdata, this.addEquipeForm.value.podcast).subscribe(
  //     () => {
  //       this.success.show();
  //       setTimeout (() => {
  //         this.addEquipeForm.reset();
  //         this.success.hide();
  //         this.router.navigate(["/admin/episodes"]);
  //      }, 3000);
  //     }
  //     );
  // }
  // getPodcasts(): void{
  //   this.podcastsService.getAllPodcasts().subscribe(
  //     (data) =>{
  //       this.podcasts = data;
  //     }
  //   );
  // }
  init(): void{
    this.addEquipeForm.reset();
  }

}
