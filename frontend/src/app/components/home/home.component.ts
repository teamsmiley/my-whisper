//src\app\app.component.ts
import { Component, OnDestroy } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
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
