import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Subject, EMPTY } from 'rxjs';
import { switchAll, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService


{
  private socket$: WebSocketSubject<any>;
  private notificationSubject$ = new Subject();
  public notifications$ = this.notificationSubject$.pipe(switchAll());

  public connect(): void {
 
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const notifications = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.notificationSubject$.next(notifications);
    }
  }
 
  private getNewWebSocket() {
    return  webSocket("ws://localhost:3030");
  }
  sendNotication(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete(); }
  
  }


