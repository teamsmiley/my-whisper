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
  asrFormGroup: FormGroup;

  fileName: string;
  resultASR: any;

  constructor(private service: AsrService) {
    //
    this.asrFormGroup = new FormGroup({
      //email: new FormControl('test@gmail.com'),
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

  selectedFiles(event) {
    const fileInput = event.target as HTMLInputElement;
    this.fileName = fileInput.value.replace(/.*(\/|\\)/, '');

    if (event.target.files.length > 0) {
      this.audioFile.setValue(event.target.files[0]);
    }
  }

  submit() {
    this.service.uploadAsr(this.asrFormGroup.value).subscribe((result) => {
      console.log(result);
      this.resultASR = result;
    });
  }
}
