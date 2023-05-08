import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebSocketService } from './services/web-socket.service';
import { SharedModule } from 'src/shared/shared.module';
import { AsrComponent } from './components/asr/asr.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { VoiceRecorderComponent } from './components/voice-recorder/voice-recorder.component';
import { AsrPrimengComponent } from './components/asr-primeng/asr-primeng.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AsrComponent,
    AsrPrimengComponent,
    VoiceRecorderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'whisper-ai.us.auth0.com',
      clientId: 'Ht4maVjBL5PoXF2VVFMrGoa6iTvSKhDp',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    WebSocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
