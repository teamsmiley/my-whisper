import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [FileUploadModule, MessagesModule, MessageModule, ToastModule],
  providers: [MessageService],
})
export class PrimengModule {}
