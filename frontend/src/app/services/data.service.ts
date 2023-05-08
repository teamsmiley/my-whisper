import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export class DataService {
  constructor(
    //
    private url: string,
    private http: HttpClient
  ) {}

  getList(queryString?: any) {
    return this.http
      .get(this.url + this.toQueryString(queryString), {
        observe: 'response',
        headers: { Accept: 'application/json' },
      })
      .pipe(
        map((res) => {
          const payload = res.body;
          const pagination = JSON.parse(res.headers.get('X-Pagination'));
          return { payload, pagination };
        }),
        catchError(this.handleError)
      );
  }

  get(id: string, queryString?: any) {
    return this.http
      .get(this.url + '/' + id + this.toQueryString(queryString), {
        headers: { Accept: 'application/json' },
      })
      .pipe(catchError(this.handleError));
  }

  create(resource: any) {
    return this.http
      .post(this.url, JSON.stringify(resource), {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(catchError(this.handleError));
  }

  createWithBinary(resource: any) {
    return this.http
      .post(this.url, this.toFormData(resource), {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((res) => {
          return res['body'];
        }),
        catchError(this.handleError)
      );
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }

  toQueryString(obj: any) {
    const init = '?';

    const parts = [];
    for (const property in obj) {
      const value = obj[property];
      if (value !== null && value !== undefined) {
        parts.push(
          encodeURIComponent(property) + '=' + encodeURIComponent(value)
        );
      }
    }

    if (parts.length !== 0) {
      const query = init + parts.join('&');
      return query;
    } else {
      return '';
    }
  }

  handleError(res: HttpErrorResponse) {
    if (res.status === 400)
      return throwError(console.log('error!!!', res.error));
    if (res.status === 404)
      return throwError(console.log('error!!!', res.error.title));

    return throwError(console.log('error!!!', res));
  }
}
