import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';

@Injectable()
export class VoiceRecorderService {
  private stream;
  private recorder;
  private interval;
  private startTime;
  private _recorderTime = new Subject<string>();

  getRecorderTime(): Observable<string> {
    return this._recorderTime.asObservable();
  }

  startRecorder() {
    this._recorderTime.next('00:00');
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.stream = stream;
      this.recorder = RecordRTC(stream, {
        type: 'audio',
      });
      this.recorder.startRecording();
      this.startTime = moment();
      this.interval = setInterval(() => {
        const currentTime = moment();
        const diffTime = moment.duration(currentTime.diff(this.startTime));
        const time =
          this.toString(diffTime.minutes()) +
          ':' +
          this.toString(diffTime.seconds());
        this._recorderTime.next(time);
      }, 1000);
    });
  }

  private toString(value) {
    let val = value;
    if (!value) val = '00';
    if (value < 10) val = '0' + value;
    return val;
  }

  stopRecorder() {
    this.recorder.stopRecording(() => {
      const blob = this.recorder.getBlob();
      const recordedAudioURL = URL.createObjectURL(blob);
      const formData = new FormData();
      formData.append('audio', blob, 'audio.webm');
      fetch('http://whisper/asr', {
        method: 'POST',
        body: formData,
      });
      this.stream.getTracks().forEach((track) => track.stop());
    });
  }
}
