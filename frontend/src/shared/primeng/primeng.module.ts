import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
  exports: [
    FileUploadModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    SplitButtonModule,
  ],
  providers: [MessageService],
})
export class PrimengModule {}
