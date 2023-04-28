import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { VoiceRecorderService } from 'src/app/services/voice-recorder.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
})
export class VoiceRecorderComponent implements OnInit {
  isRecorder = false;
  recordedTime;
  blobUrl;
  voiceData;

  fileUploadUrl: string;

  uploadedFiles: any[] = [];

  asrFormGroup: FormGroup;

  constructor(
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private audioRecorderService: VoiceRecorderService
  ) {
    this.asrFormGroup = new FormGroup({
      file: new FormControl(''),
    });

    this.audioRecorderService
      .recorderFail()
      .subscribe(() => (this.isRecorder = false));
    this.audioRecorderService
      .getRecorderTime()
      .subscribe((time) => (this.recordedTime = time));
    this.audioRecorderService.getRecorderBlob().subscribe((data) => {
      this.voiceData = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }

  ngOnInit() {
    this.fileUploadUrl = `${environment.ws_file_upload_url}`;
  }

  onUpload(): void {
    this.setFile(this.voiceData.title);
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

  startRecorder() {
    if (!this.isRecorder) {
      this.isRecorder = true;
      this.audioRecorderService.startRecorder();
    }
  }

  abortRecorder() {
    if (this.isRecorder) {
      this.isRecorder = false;
      this.audioRecorderService.abortRecorder();
    }
  }

  stopRecorder() {
    if (this.isRecorder) {
      this.audioRecorderService.stopRecorder();
      this.isRecorder = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecorder();
  }

  download(): void {
    const url = window.URL.createObjectURL(this.voiceData.blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.voiceData.title;
    console.log('cccccc', link.href, link.download);
    link.click();
  }

  get file() {
    return this.asrFormGroup.get('file');
  }

  setFile(value: any) {
    this.file.setValue(value);
  }
}
