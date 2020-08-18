
import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { QuizService } from 'src/app/services/quiz.service';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: SidenavComponent;
  allowaccess :boolean ;
user_prenom: string;
  image  ; 
  quizes=[]
  socket =webSocket("ws://localhost:3030/");
  notif="0";
  notification=""
  
  constructor(private userservice :UserService, private router:Router
    , private quizService : QuizService
 ) { 
    const tokenloc = localStorage.getItem('access_token');
    var token : any = tokenloc;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenInfo = JSON.parse(window.atob(base64));
    this.user_prenom = tokenInfo.prenom;
       this.allowaccess = tokenInfo.role == 'employee';
       this.socket.subscribe((res)=>
       {
        const notification = JSON.parse(JSON.stringify(res));
        if(notification.destination==tokenInfo.role){
        this.notification=notification.message;
         this.notif="1";
        }
     
      })

  } 

  ngOnInit() {
    this.takeemployee()
    this.quizService.getquiz().subscribe(res=>{
      this.quizes=JSON.parse(JSON.stringify(res));

    })


  }

  onLogOut(): void{
    this.userservice.logOut();
    this.router.navigate(['/userlogin']);
  }

  hideSidenavAfterClick() {
    if (window.innerWidth <= 1300) {
      this.sidenav.hide();
    }
  }
nom ; 
prenom ; 
takeemployee(){
  const tokenloc = localStorage.getItem('access_token');
  var token : any = tokenloc;
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  var tokenInfo = JSON.parse(window.atob(base64));
  this.userservice.getemployee(tokenInfo.employee_id).subscribe(res=>{
 // this.image=res.image;
 this.nom=res.nom;
 this.prenom=res.prenom;
this.image="http://localhost:3000/"+res.image.toString().split("\\")[0]+"/"+
res.image.toString().split("\\")[1]+"/"+res.image.toString().split("\\")[2];
console.log(res.image)
console.log(this.image)
  })}

employee ; 



}
