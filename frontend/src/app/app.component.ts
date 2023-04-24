//src\app\app.component.ts
import { Component } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'frontend';
  content = '';
  received = [];
  sent = [];

  constructor(private WebsocketService: WebSocketService) {
    WebsocketService.messages.subscribe((msg) => {
      this.received.push(msg);
      console.log('Response from websocket: ' + msg);
    });
  }

  sendMsg() {
    let message = {
      source: '',
      content: '',
    };
    message.source = 'localhost';
    message.content = this.content;

    this.sent.push(message);
    this.WebsocketService.messages.next(message);
  }
}
