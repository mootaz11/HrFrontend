import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { questions } from '../models/questions';
@Injectable({
  providedIn: 'root'
})
export class QcmService {     
    url = 'http://localhost:3000/question/';
  constructor(private http:HttpClient) { }
   addQcm(id_quiz: string,qcm: any): Observable<any> {
        return  this.http.post<any>(`${this.url}create/${id_quiz}`, qcm);
      }

      getquestionbyquiz(idquiz: string ) : Observable<questions[]>{
       return  this.http.get<questions[]>(`${this.url}getquestionsByquiz/${idquiz}`)
      }

      answerQuestion(iduser,idquestion,answer):Observable<any>{
        console.log(idquestion)
          return this.http.post<any>(`${this.url}answerQuestion/${iduser}/${idquestion}`,answer);
      }
    }

