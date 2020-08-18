import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  socket =webSocket("ws://localhost:3030/");

  constructor() { 
  }
  

  ngOnInit() {
  }

  
      }
  

