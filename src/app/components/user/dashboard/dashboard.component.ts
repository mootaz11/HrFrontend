import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	constructor(private quizService :QuizService, private userService :UserService)
	{}
	tokenInfo:any;
	ngOnInit(){
		const tokenloc = localStorage.getItem('access_token');
    var token : any = tokenloc;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    	 this.tokenInfo = JSON.parse(window.atob(base64));
		this.userService.getemployee(this.tokenInfo.employee_id).subscribe(res=>{
			const scores = JSON.parse(JSON.stringify(res)).scores
			scores.map(score=>{
				this.chartDatasets[0].data.push(score.score);
				this.quizService.getquizbyid(score.quiz).subscribe(res=>{
					const quiz = JSON.parse(JSON.stringify(res))
					this.chartLabels.push(quiz.name);
				})
			})
		})

	}
  
	public chartType: string = 'bar';
	public chartDatasets: Array<any> = [
	  { data: [], label: 'My First dataset' }
	];
	public chartLabels: Array<any> = [];

	public chartColors: Array<any> = [
	  {
		backgroundColor: [
		  'rgba(255, 99, 132, 0.2)',
		  'rgba(54, 162, 235, 0.2)',
		  'rgba(255, 206, 86, 0.2)',
		  'rgba(75, 192, 192, 0.2)',
		  'rgba(153, 102, 255, 0.2)',
		  'rgba(255, 159, 64, 0.2)'
		],
		borderColor: [
		  'rgba(255,99,132,1)',
		  'rgba(54, 162, 235, 1)',
		  'rgba(255, 206, 86, 1)',
		  'rgba(75, 192, 192, 1)',
		  'rgba(153, 102, 255, 1)',
		  'rgba(255, 159, 64, 1)'
		],
		borderWidth: 2,
	  }
	];
  
	public chartOptions: any = {
	  responsive: true
	};
	public chartClicked(e: any): void { }
	public chartHovered(e: any): void { }


}


