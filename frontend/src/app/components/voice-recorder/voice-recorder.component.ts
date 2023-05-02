import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  recordedAudioURL;

  fileUploadUrl: string;

  uploadedFiles: any[] = [];

  asrFormGroup: FormGroup;

  constructor(
    private messageService: MessageService,
    private audioRecorderService: VoiceRecorderService
  ) {
    this.asrFormGroup = new FormGroup({
      audio_file: new FormControl(''),
    });
  }

  ngOnInit() {
    this.audioRecorderService
      .getRecorderTime()
      .subscribe((time) => (this.recordedTime = time));
    this.fileUploadUrl = `${environment.ws_file_upload_url}`;
  }

  startRecorder() {
    this.isRecorder = true;
    this.audioRecorderService.startRecorder();
  }
  stopRecorder() {
    this.isRecorder = false;
    this.audioRecorderService.stopRecorder();
  }

  get audioFile() {
    return this.asrFormGroup.get('audio_file');
  }

  setAudioFile(value: any) {
    this.audioFile.setValue(value);
  }
}
