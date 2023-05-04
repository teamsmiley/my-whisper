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

  files: File[] = [];

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

    if (event.target.files.length > 0) {
      this.files = this.files.concat([...event.target.files]);
    }
  }

  submit() {
    for (let i = 0; i < this.files.length; i++) {
      //this.upload(i, this.files[i]);
      this.service.uploadAsr(this.files[i]).subscribe();
    }
  }

  // upload(idx, file) {
  //   this.service.uploadAsr(file).subscribe();
  // }
}
