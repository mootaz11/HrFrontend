import { Component, OnInit } from '@angular/core';
import { sampleOne, sampleTwo } from '../calendar/simple-data/simple-data';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor() { } 

  ngOnInit() {
  }
  title = 'ngx-calendar';

  options1 = {
    outline: false
  };

  options2 = {
    outline: false,
    evenDayDimensions: true
  };

  events = sampleOne;

  addDate() {
    this.events = sampleTwo;
  }

}
