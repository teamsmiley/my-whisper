import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'asr',
  templateUrl: './asr.component.html',
})
export class AsrComponent implements OnInit {
  fileUploadUrl: string;

  acceptedFiles: string =
    '.pdf, .jpg, .jpeg, .png, .gif, .doc, .docx, .xls, .xlsx, .csv, .tsv, .xml, .txt, .html';

  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.fileUploadUrl = `${environment.ws_file_upload_url}`;
  }

  onUpload(event, type: string): void {
    if (type === 'file') {
      for (let file of event.files) {
        this.uploadedFiles.push(file);
      }
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Success Upload File!',
    });
  }
  onErrorFileUpload() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'File Not Uploaded.',
    });
  }
}
