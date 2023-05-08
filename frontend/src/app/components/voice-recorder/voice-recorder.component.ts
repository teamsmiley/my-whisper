import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as RecordRTC from 'recordrtc';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { AsrService } from 'src/app/services/asr.service';
@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
})
export class VoiceRecorderComponent implements OnInit {
  isRecorder = false;
  asrFormGroup: FormGroup;
  resultASR: any;

  stream: MediaStream;
  recordRTC: RecordRTC;

  constructor(
    //
    public wsService: WebSocketService,
    private service: AsrService
  ) {
    this.wsService.connect();
    this.asrFormGroup = new FormGroup({
      audio_file: new FormControl(''),
    });
  }

  ngOnInit() {}

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
      this.setAudioFile(blob);
    });
  }

  uploadHttp() {
    this.service.uploadAsr(this.asrFormGroup.value).subscribe((result) => {
      console.log(result);
      this.resultASR = result;
    });
  }

  uploadWebSocket() {
    console.log('upload form');
    // this.wsService.sendMessage(sound);
  }
}
