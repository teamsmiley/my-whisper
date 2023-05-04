import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AsrService } from 'src/app/services/asr.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-asr',
  templateUrl: './asr.component.html',
})
export class AsrComponent implements OnInit {
  fileUploadUrl: string;
  asrFormGroup: FormGroup;

  fileText: string;

  files: File;

  constructor(
    private service: AsrService,
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.asrFormGroup = new FormGroup({
      audio_file: new FormControl(''),
    });
  }

  ngOnInit() {
    this.fileUploadUrl = `${environment.ws_file_upload_url}`;
  }

  get audioFile() {
    return this.asrFormGroup.get('audio_file');
  }

  setAudioFile(value: any) {
    this.audioFile.setValue(value);
  }

  selectedFiles(event) {
    // 인풋에 사용할 파일 이름
    const fileInput = event.target as HTMLInputElement;
    const fileName = fileInput.value.replace(/.*(\/|\\)/, '');
    this.fileText = fileName;

    // 선택된 파일 정의
    this.files = event.target.files[0];
    //this.asrFormGroup.get('audio_file').setValue(this.files);
  }

  submit() {
    const formData = new FormData();
    formData.append('audio_file', this.files);
    this.http
      .post(this.fileUploadUrl, formData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Success Upload File!',
        });
      });
    this.asrFormGroup.get('audio_file').setValue(this.files);
  }
}
