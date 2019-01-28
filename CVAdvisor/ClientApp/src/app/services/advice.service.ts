import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { TextSender } from '../models/text-sender.model';
@Injectable({
  providedIn: 'root'
})
export class AdviceService {
  private readonly connection;
  private advicesBehaviour = new BehaviorSubject([]);
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl('/hub')
    .build();
    this.connection.start().catch(err => document.write(err));
    this.listenSignalR();
   }

   private listenSignalR() {
    this.connection.on('advicesReceived', (message: string) => {
     this.handleAdvices(message);
    });
   }

   subscribeOnAdvices(): Observable<any> {
     return this.advicesBehaviour.asObservable();
   }

   sendText(send: TextSender) {
    const sendString = JSON.stringify(send);
    this.connection.send('checkText', sendString).then(() => {
      console.log('send: ' + sendString);
    });
   }

   private handleAdvices(advicesString: string) {
     const advices = JSON.parse(advicesString);
     this.advicesBehaviour.next(advices);
     console.log(advices);
   }
}
