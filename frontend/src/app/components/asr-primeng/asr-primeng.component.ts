import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-asr-primeng',
  templateUrl: './asr-primeng.component.html',
})
export class AsrPrimengComponent implements OnInit {
  fileUploadUrl: string;

  asrFormGroup: FormGroup;

  acceptedFiles: string = '.mp3, .m4a, .mp4, .wav, .ts, .mka, .mov,';

  uploadedFiles: any[] = [];

  constructor(
    //
    private messageService: MessageService
  ) {
    //
    this.asrFormGroup = new FormGroup({
      //email: new FormControl('test@gmail.com'),
      audio_file: new FormControl(''),
    });
  }

  ngOnInit() {
    this.fileUploadUrl = `${environment.file_upload_url}`;
  }

  get audioFile() {
    return this.asrFormGroup.get('audio_file');
  }

  setAudioFile(value: any) {
    this.audioFile.setValue(value);
  }

  onUpload(event, type: string): void {
    if (type === 'file') {
      this.setAudioFile(event.originalEvent.body);
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
