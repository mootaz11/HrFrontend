import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Quiz } from '../models/quiz';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
url='http://localhost:3000/quiz'; 
  constructor(private http : HttpClient) { }
  addquiz(name): Observable<any> {
    console.log('hello')
    return this.http.post<any>(`${this.url}/create`,name)
} 


getquiz() : Observable<Quiz[]> {
  return this.http.get<Quiz[]>(`${this.url}/getall`)

}
getquizbyid(Quiz_id: string): Observable<Quiz> {
  return this.http.get<Quiz>(`${this.url}/getQuiz/${Quiz_id}`)
}


getQuizScore(idemployee,idquiz):Observable<any>{
return this.http.get<any>(`${this.url}/GetQuizScore/${idemployee}/${idquiz}`);
}


startquiz(iduser,idquiz):Observable<any>{
  return this.http.post<any>(`${this.url}/startQuiz/${iduser}/${idquiz}`,{});
}

}





  //     return this.http.get<Actualite>(`${this.url}${Article_id}`);
  //   }}
// import { Injectable } from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import { Actualite } from '../models/actualite';

// @Injectable({
//   providedIn: 'root'
// })
// export class ArticlesService {

//   url = 'http://localhost:3000/actualite/';
//   constructor(private http: HttpClient) { }
  
//   getAllArticles(): Observable<Actualite[]> {
//     return this.http.get<Actualite[]>(`${this.url}actualites`);
//   }
//   addArticle(id_admin: string, id_category:string ,Article: any): Observable<any> {
//     return  this.http.post<any>(`${this.url}create/${id_admin}/${id_category}`, Article);
//   }
//   getArticle(Article_id: string): Observable<Actualite> {
//     return this.http.get<Actualite>(`${this.url}${Article_id}`);
//   }
//   updateArticle(formdata: any, actualite_id:string, admin_id: string): Observable<any> {
//     return this.http.patch<any>(`${this.url}update/${actualite_id}/${admin_id}`, formdata);
//   }
//   deleteArticle(Article_id: string): Observable<any> {
//     return this.http.delete<any>(`${this.url}delete/${Article_id}`)
//   }
// }
