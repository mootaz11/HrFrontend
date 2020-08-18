import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { ModalDirective } from 'package/public_api';
import { EquipeService } from 'src/app/services/equipe.service';
import { equipe } from 'src/app/models/equipe';
import { ModalDirective } from 'projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive';

@Component({
  selector: 'app-editequipe',
  templateUrl: './editequipe.component.html',
  styleUrls: ['./editequipe.component.scss']
})
export class EditequipeComponent implements OnInit {
  @ViewChild('info', { static: true }) info: ModalDirective;
  formData: FormData;
  editEquipeForm: FormGroup;
  paramsSubscription: Subscription
  constructor(private router: Router, private route: ActivatedRoute, private EquipeService: EquipeService,private fb: FormBuilder ) {
    this.createForm();
  }

  ngOnInit() {
    this.getEpisodeToUpdate(this.route.snapshot.params['id']);
    
  }
  episodeToUpdate ; 
  createForm(){
    this.editEquipeForm = this.fb.group({
      'name': this.fb.control(null,[Validators.required]),
      'teamLeader': this.fb.control(null,[Validators.required]),
      // 'sequence': this.fb.control(null),
      // 'sequence_name': this.fb.control(null)
    });
  }

 


  editEpisode(): void{
    /*console.log(this.editEpisodeForm);
    console.log(this.files[0]);*/
    var equipecord={
     "name" : this.editEquipeForm.value.name , 
// "teamLeader" : this.editEquipeForm.value.teamLeader
    }
    
    this.EquipeService.updateequipe(equipecord,this.route.snapshot.params['id']).subscribe(
      () =>{
        this.info.show();
        setTimeout (() => {
          this.init();
          this.info.hide();
          this.router.navigate(["/admin"]);
       }, 2500);
      }
      );
  }

  getEpisodeToUpdate(id: string): any{
    this.EquipeService.getEquipe(id).subscribe(
      (data: equipe) =>{
        this.episodeToUpdate = data;
        this.editEquipeForm.setValue({
          'name': data.name,
          "teamLeader": data.teamLeader,
       

        });
      }
    );
  }

  init():void{
    this.editEquipeForm.reset();
  }


}
