import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsrComponent } from './components/asr/asr.component';
import { HomeComponent } from './components/home/home.component';

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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
