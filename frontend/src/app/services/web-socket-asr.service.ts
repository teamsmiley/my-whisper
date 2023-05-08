import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';

interface MessageData {
  message: string;
  time?: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketAsrService {
  private socket$!: WebSocketSubject<any>;
  public receivedData: MessageData[] = [];

  constructor() {}

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(environment.ws_url + '/asr');

      this.socket$.subscribe((data: MessageData) => {
        this.receivedData.push(data);
      });
    }
  }

  sendMessage(blob: Blob) {
    this.socket$.next({ blob });
  }

  close() {
    this.socket$.complete();
  }
}
