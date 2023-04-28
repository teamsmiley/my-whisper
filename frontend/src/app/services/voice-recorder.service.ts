import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';

interface VoiceRecorderOutput {
  blob: Blob;
  title: string;
}

@Injectable()
export class VoiceRecorderService {
  private stream;
  private recorder;
  private interval;
  private startTime;
  private _recorded = new Subject<VoiceRecorderOutput>();
  private _recorderTime = new Subject<string>();
  private _recorderFail = new Subject<string>();

  getRecorderBlob(): Observable<VoiceRecorderOutput> {
    return this._recorded.asObservable();
  }

  getRecorderTime(): Observable<string> {
    return this._recorderTime.asObservable();
  }

  recorderFail(): Observable<string> {
    return this._recorderFail.asObservable();
  }

  startRecorder() {
    if (this.recorder) {
      return;
    }

    this._recorderTime.next('00:00');
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => {
        this.stream = s;
        this.record();
      })
      .catch((error) => {
        this._recorderFail.next('');
      });
  }

  abortRecorder() {
    this.stopMedia();
  }

  private record() {
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm',
    });

    this.recorder.record();
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
  }

  private toString(value) {
    let val = value;
    if (!value) val = '00';
    if (value < 10) val = '0' + value;
    return val;
  }

  stopRecorder() {
    if (this.recorder) {
      this.recorder.stop(
        (blob) => {
          if (this.startTime) {
            const mp3Name = encodeURIComponent(
              'audio_' + new Date().getTime() + '.mp3'
            );
            this.stopMedia();
            this._recorded.next({ blob: blob, title: mp3Name });
          }
        },
        () => {
          this.stopMedia();
          this._recorderFail.next('');
        }
      );
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach((track) => track.stop());
        this.stream = null;
      }
    }
  }
}
