import { NgModule } from '@angular/core';
import { PrimengModule } from './primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [FormsModule, ReactiveFormsModule, PrimengModule, RouterModule],
  exports: [FormsModule, ReactiveFormsModule, PrimengModule, RouterModule],
  providers: [],
  entryComponents: [],
})
export class SharedModule {}
