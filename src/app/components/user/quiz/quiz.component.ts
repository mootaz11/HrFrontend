import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { QcmService } from 'src/app/services/qcm.service';
import {FormBuilder,FormGroup,FormControl} from '@angular/forms';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  tokenInfo:any;
  quizName=""
  quizStarted=false;
  questions=[];
  question : any ; 
  questionNumber ="1";
  answer:String;
  check="answer question";
  checkForm:FormGroup;
  submit :Boolean= false ;
  score:Number=0;
  showscore=false;
  constructor(private qcm :QcmService, private quizService : QuizService,private actRoute : ActivatedRoute,private fb:FormBuilder){
    this.checkForm=this.fb.group({
      answer:new FormControl()
    })
  }


  startquiz(){

    this.quizService.startquiz(this.tokenInfo.employee_id,this.actRoute.snapshot.params["idquiz"])
    .subscribe(res=>{
      if(res){
        this.quizStarted=true;
        this.question=this.questions[parseInt(this.questionNumber)-1];
        this.questionNumber =(parseInt(this.questionNumber)+1).toString();
      }
      
    },err=>{
      if(err){
        console.log(err.error);
      }
    })

  }

  nextQuestion(){
    this.qcm.answerQuestion(this.tokenInfo.employee_id,this.question._id,this.checkForm.value)
    .subscribe(res=>
      {console.log(res)});
    if(parseInt(this.questionNumber)<=this.questions.length) {
      this.question=this.questions[parseInt(this.questionNumber)-1];
      this.questionNumber =(parseInt(this.questionNumber)+1).toString();  
    }
    if(parseInt(this.questionNumber)>this.questions.length) {
            this.submit=true
    }
      console.log(this.question)
    }

  
  submitScore(){
    this.qcm.answerQuestion(this.tokenInfo.employee_id,this.question._id,this.checkForm.value)
    .subscribe(res=>
      {console.log(res)
        this.quizService.getQuizScore(this.tokenInfo.employee_id,this.actRoute.snapshot.params["idquiz"]).subscribe(res=>{
          console.log(res);
          this.score=JSON.parse(JSON.stringify(res)).score;
          this.showscore=true;
        })
      
      });

      
    
    }
  ngOnInit(){
    const tokenloc = localStorage.getItem('access_token');
    var token : any = tokenloc;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
     this.tokenInfo = JSON.parse(window.atob(base64));
    this.quizService.getquizbyid(this.actRoute.snapshot.params["idquiz"]).subscribe(res=>{
      const quiz = JSON.parse(JSON.stringify(res));
      this.quizName=quiz.name
    })

    this.qcm.getquestionbyquiz(this.actRoute.snapshot.params["idquiz"]).subscribe(res=>{
      this.questions = JSON.parse(JSON.stringify(res));
    })

  }

}
