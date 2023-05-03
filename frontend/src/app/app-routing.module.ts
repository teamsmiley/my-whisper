import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsrComponent } from './components/asr/asr.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { VoiceRecorderComponent } from './components/voice-recorder/voice-recorder.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'upload',
    component: AsrComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'voice-recorder',
    component: VoiceRecorderComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
