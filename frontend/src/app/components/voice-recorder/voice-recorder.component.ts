import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import * as RecordRTC from 'recordrtc';
import { WebSocketService } from 'src/app/services/web-socket.service';
@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
})
export class VoiceRecorderComponent implements OnInit {
  isRecorder = false;
  blobUrl;
  audioURL;

  fileUploadUrl: string;

  uploadedFiles: any[] = [];

  asrFormGroup: FormGroup;

  stream: MediaStream;
  recordRTC: RecordRTC;
  blob: Blob;
  audioBlob: Blob;

  constructor(
    public wsService: WebSocketService,
    private sanitizer: DomSanitizer
  ) {
    this.wsService.connect();
    this.asrFormGroup = new FormGroup({
      audio_file: new FormControl(''),
    });
  }

  ngOnInit() {
    this.fileUploadUrl = `${environment.ws_file_upload_url}`;
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
      const mp3Name = encodeURIComponent(new Date().getTime() + '.mp3');
      const audioURL = URL.createObjectURL(blob);
      this.stream.getAudioTracks().forEach((track) => track.stop());
      //this.stream = null;
      //server로 보냄
      // const formData = new FormData();
      // formData.append('audio_file', blob, mp3Name);
      // fetch(this.fileUploadUrl, {
      //   method: 'POST',
      //   body: formData,
      // });
      // this.sendAudio(blob);
      console.log('88888', audioURL);
      this.blobUrl = true;
    });
  }

  wwwUpload(audioURL: any) {
    const formData = new FormData();
    formData.append('audio_file', audioURL);
    fetch(this.fileUploadUrl, {
      method: 'POST',
      body: formData,
    });
  }

  wsUpload(audioURL: any) {
    this.sendAudio(audioURL);
  }

  get audioFile() {
    return this.asrFormGroup.get('audio_file');
  }

  setAudioFile(value: any) {
    this.audioFile.setValue(value);
  }

  sendAudio(sound: any) {
    this.wsService.sendMessage(sound);
  }
}
