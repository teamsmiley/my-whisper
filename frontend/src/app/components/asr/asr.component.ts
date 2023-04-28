import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-asr',
  templateUrl: './asr.component.html',
})
export class AsrComponent implements OnInit {
  fileUploadUrl: string;

  acceptedFiles: string = '.mp3, .m4a, .mp4, .wav, .ts, .mka, .mov,';

  uploadedFiles: any[] = [];

  asrFormGroup: FormGroup;

  constructor(private messageService: MessageService) {
    this.asrFormGroup = new FormGroup({
      file: new FormControl(''),
    });
  }

  ngOnInit() {
    this.fileUploadUrl = `${environment.ws_file_upload_url}`;
  }

  onUpload(event, type: string): void {
    if (type === 'file') {
      this.setFile(event.originalEvent.body);
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

  get file() {
    return this.asrFormGroup.get('file');
  }

  setFile(value: any) {
    this.file.setValue(value);
  }
}
