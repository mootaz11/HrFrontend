import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavComponent } from 'ng-uikit-pro-standard';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AdminsService } from 'src/app/services/admins.service';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav: SidenavComponent;
  allowaccess :boolean ;
  admin_prenom: string;
  image  ; 
  socket =webSocket("ws://localhost:3030/");
  notif="0"
  notification=""


  constructor(private authService:AuthService, private router:Router
    ,private adminservice : AdminsService,
 ) { 
    const tokenloc = localStorage.getItem('access_token');
    var token : any = tokenloc;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenInfo = JSON.parse(window.atob(base64));
    this.admin_prenom = tokenInfo.prenom;
       this.allowaccess = tokenInfo.role == 'admin';
       this.socket.subscribe((res)=>{
        const notification = JSON.parse(JSON.stringify(res));
        if(tokenInfo.role==notification.destination){
          this.notification=notification.message;
          this.notif="1";
 
        }
      })

  } 

  ngOnInit() {
    this.takeadmin()
  }

  onLogOut(): void{
    this.authService.logOut();
    this.router.navigate(['/adminlogin']);
  }

  hideSidenavAfterClick() {
    if (window.innerWidth <= 1300) {
      this.sidenav.hide();
    }
  }
nom ; 
prenom ; 
takeadmin(){
  const tokenloc = localStorage.getItem('access_token');
  var token : any = tokenloc;
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  var tokenInfo = JSON.parse(window.atob(base64));
  this.adminservice.getAdmin(tokenInfo.admin_id).subscribe(res=>{
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
