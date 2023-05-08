import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as RecordRTC from 'recordrtc';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { AsrService } from 'src/app/services/asr.service';
import { WebSocketAsrService } from 'src/app/services/web-socket-asr.service';
@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
})
export class VoiceRecorderComponent implements OnInit, OnDestroy {
  isRecorder = false;

  asrFormGroup: FormGroup;
  resultASR: any;

  stream: MediaStream;
  recordRTC: RecordRTC;
  blob: Blob;

  constructor(
    //
    public wsAsrService: WebSocketAsrService,
    private service: AsrService
  ) {
    this.wsAsrService.connect();
    this.asrFormGroup = new FormGroup({
      audio_file: new FormControl(''),
    });
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.wsAsrService.close();
  }

  get audioFile() {
    return this.asrFormGroup.get('audio_file');
  }

  setAudioFile(value: any) {
    this.audioFile.setValue(value);
  }

  startRecorder() {
    this.isRecorder = true;
    navigator.mediaDevices.getUserMedia({ audio: true }).then((s) => {
      this.stream = s;
      this.recordRTC = new RecordRTC.StereoAudioRecorder(this.stream, {
        type: 'audio',
        mimeType: 'audio/webm',
      });
      this.recordRTC.record();
    });
  }

  stopRecorder() {
    this.isRecorder = false;
    this.recordRTC.stop((blob) => {
      this.stream.getAudioTracks().forEach((track) => track.stop());
      this.blob = blob;
      this.setAudioFile(blob);
    });
  }

  uploadHttp() {
    this.service.uploadAsr(this.asrFormGroup.value).subscribe((result) => {
      this.resultASR = result;
    });
  }

  uploadWebSocket() {
    this.wsAsrService.sendMessage(this.blob);
  }
}
