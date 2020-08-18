import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConjeService {
  url = 'http://127.0.0.1:3000/conje';
  constructor( private http : HttpClient) { }
// postconje(conje : any ) : Observable<any>{
//   return this.http.post<any>(`${this.url}/postforconje`, conje)
// }
addconje(conjecor: any): Observable<any> {
  return  this.http.post<any>(`${this.url}/postforconje`, conjecor);
}

}
