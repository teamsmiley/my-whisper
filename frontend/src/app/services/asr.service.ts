import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AsrService extends DataService {
  constructor(http: HttpClient) {
    super(environment.file_upload_url, http);
  }

  getAsrs(queryString?: any) {
    return super.getList(queryString);
  }

  getAsr(id: string, queryString?: any) {
    return super.get(id, queryString);
  }

  createAsr(resource: any) {
    return super.create(resource);
  }

  uploadAsr(resource: any) {
    return super.createWithBinary(resource);
  }
}
