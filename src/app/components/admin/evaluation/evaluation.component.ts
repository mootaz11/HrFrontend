import { Component, OnInit ,ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup ,FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material';
import { QuizService } from 'src/app/services/quiz.service';
import { ModalDirective } from 'projects/ng-uikit-pro-standard/src/lib/free/modals/modal.directive';
import { QcmService } from 'src/app/services/qcm.service';
import { webSocket } from 'rxjs/webSocket';

// import {Quiz} from 'src/app/models/quiz'
export interface FormData {
  name: string;
  page: number;
  display: boolean;
}
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  myForm2:FormGroup ; 
  myForm: FormGroup;
  @ViewChild('info', { static: true }) info: ModalDirective;
  @ViewChild('success', { static: true }) success: ModalDirective;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // length: number;
  variable: boolean =true ; 
  length = 40;
  pageSize = 4;
  pageSizeOptions: number[] = [1, 3, 4, 5];
  pageEvent: PageEvent;
  a: number =0 ; 
  correctanswers: any ; ; 

  constructor(private fb: FormBuilder,
    private quizservice : QuizService,
     private questionService : QcmService
    ) { 
    // this.myForm = this.fb.group(this.formValues);
    let formcontrol2={
      question : new FormControl('',
      Validators.required,
      ),
      answer1 : new FormControl('',
      Validators.required,
      ),
      correctanswer1 : new FormControl('',
      Validators.required,
      )   , 
      answer2 : new FormControl('',
      Validators.required,
      )  ,
      correctanswer2 : new FormControl('',
      Validators.required,
      ) , 
      answer3 : new FormControl('',
      Validators.required,
      ) ,
      correctanswer3 : new FormControl('',
      Validators.required,
      )}
      this.myForm=this.fb.group(formcontrol2)
 let formcontrol={
name : new FormControl('',[
Validators.required,
Validators.pattern("[a-z.'-]+"),
Validators.minLength(3)]
)
 }
 this.myForm2=this.fb.group(formcontrol)
  }
  get name(){
    return this.myForm2.get('name')
  }
  get question(){
    return this.myForm.get('question')
  }
  get answer1(){
    return this.myForm.get('answer1')
  }
  get correctanswer1(){
    return this.myForm.get('correctanswer1')
  }
  get answer2(){
    return this.myForm.get('answer2')
  }
  get correctanswer2(){
    return this.myForm.get('correctanswer2')
  }
  get answer3(){
    return this.myForm.get('answer3')
  }
  get correctanswer3(){
    return this.myForm.get('correctanswer3')
  }

  ngOnInit() {
   
  }
  socket =webSocket("ws://localhost:3030/");

latestquiz:any ;
getthequizname(){
// let data =this.myForm2.value; 
// console.log(  this.myForm2.value.quizname  )
this.quizservice.addquiz(this.myForm2.value).subscribe(result=>{
  this.socket.subscribe();
  this.socket.next({message:'a new quiz has been added ',destination:"employee"});
    this.socket.complete();
  console.log(result)
  this.latestquiz=result.quizSaved._id
this.success.show();
  setTimeout (() => {
    this.variable=false 
  this.success.hide();
    }, 3000);
})
console.log(this.latestquiz)
}
quizname : any ; 
truequestion1: boolean = false 
truequestion2 : boolean = false 
truequestion3 :boolean = false 

trueanswer1($event){
  if ($event.target.checked === true) {
    this.truequestion1=true ; 
    this.truequestion2 = false ;
  this.truequestion3  = false   ;
  }
  if ($event.target.checked === false) {
    this.truequestion1=false ; 

  }
}
trueanswer2($event){
  if ($event.target.checked === true) {
    this.truequestion1=false ; 
    this.truequestion2 = true ;  
  this.truequestion3  = false    
 }
  if ($event.target.checked === false) {
    this.truequestion2=false ; 

  }
}


trueanswer3($event){
  if ($event.target.checked === true) {
    this.truequestion1=false ; 
    this.truequestion2 = false ;  
  this.truequestion3  = true ;     
 
 }
  if ($event.target.checked === false) {
    this.truequestion3=false ; 

  }
}
N=100; 
Answerstable:any=[{reponse:""},
{reponse:""},
{reponse:""}
];
questions : any=[] ;
i=0 ;
getqanda(){
  console.log(this.myForm.value)  
  this.Answerstable[0].reponse=this.myForm.value.answer1 ; 
  this.Answerstable[1].reponse=this.myForm.value.answer2 ;
  this.Answerstable[2].reponse=this.myForm.value.answer3 ; 
  console.log(this.Answerstable)
  this.questions=this.myForm.value.question
  console.log(this.questions)
  if(this.myForm.value.correctanswer1 != ""){
this.correctanswers=this.myForm.value.correctanswer1
  }
  if(this.myForm.value.correctanswer2 != ""){
    this.correctanswers=this.myForm.value.correctanswer2
      } 
      if(this.myForm.value.correctanswer3 != ""){
        this.correctanswers=this.myForm.value.correctanswer3
          } 
            const newForm ={
   question : this.questions ,
   reponses : this.Answerstable ,
   correctReponse: this.correctanswers,
  }
  console.log(newForm)
   this.questionService.addQcm(this.latestquiz,newForm).subscribe( () =>{
    this.info.show();
    setTimeout (() => {
      this.info.hide();
      //this.router.navigate(["/admin/episodes"]);
   }, 2500);
  }
  );
   
} 
}

