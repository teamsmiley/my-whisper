import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebSocketService } from './services/web-socket.service';
import { SharedModule } from 'src/shared/shared.module';
import { AsrComponent } from './components/asr/asr.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AsrComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent],
})
export class AppModule {}
