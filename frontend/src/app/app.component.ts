//src\app\app.component.ts
import { Component, OnDestroy } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy {
  message = '';

  constructor(public wsService: WebSocketService) {
    this.wsService.connect();
  }

  sendMessage(message: string) {
    this.wsService.sendMessage(message);
  }

  ngOnDestroy() {
    this.wsService.close();
  }
}
