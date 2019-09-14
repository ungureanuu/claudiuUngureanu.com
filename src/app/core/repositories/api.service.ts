import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ApiCallObject, ApiResponse } from './models/api.model';
import { API_URLS, IApiUrls } from './api-urls.constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    @Inject(API_URLS) private apiUrls: IApiUrls,
    private router: Router,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  get baseUrl(): string {
    return environment.apiEndPoint;
  }

  private getBasePath(apiCall: ApiCallObject): string {
    if (apiCall.basePath === undefined) {
      return this.baseUrl;
    }

    return apiCall.basePath;
  }

  private constructUrl(apiCall: ApiCallObject): string {
    let url: string = this.getBasePath(apiCall);

    const params: any = apiCall.queryParams;

    const urlParams: any = apiCall.urlParams;

    const parts: string[] = apiCall.urlPath.split('.');

    let pathFragment: any = this.apiUrls;

    for (let i = 0; i < parts.length; i++) {
      pathFragment = pathFragment.children[parts[i]];

      if (i) {
        // for the first element then avoid to put the slash
        url += pathFragment.url ? '/' + pathFragment.url : '';
      } else {
        url += pathFragment.url ? pathFragment.url : '';
      }
    }

    if (urlParams) {
      for (const key in urlParams) {
        if (key) {
          url = url.replace(`{${key}}`, urlParams[key]);
        }
      }
    }

    if (params) {
      url = url + this.getUrlQueryParams(params);
    }

    return url;
  }

  private getUrlQueryParams(params: any, page?: number): string {
    let first = true;
    let path = '';

    for (const field in params) {
      if (params.hasOwnProperty(field)) {
        if (params[field] !== null && params[field] !== undefined) {
          if (Array.isArray(params[field])) {
            params[field].forEach(search => {
              path += (first ? '?' : '&') + field + '[]=' + search;
              first = false;
            });
          } else {
            path += (first ? '?' : '&') + field + '=' + params[field];
            first = false;
          }
        }
      }
    }

    if (page) {
      path += (first ? '?' : '&') + 'page=' + page;
    }

    return path;
  }

  private handleResponse(res: any, apiCall: ApiCallObject): void {
    // TODO: more on handling message (translation)
    if (apiCall.useSnackBar && apiCall.successMessage) {
      this.snackBar.open(apiCall.successMessage, null, { duration: 3000 });
    }
  }

  private validateApiCallObject(apiCall: ApiCallObject): any {
    if (!apiCall) {
      throw new Error(
        'ApiCallService validateApiCallObject method error: ApiCallObject undefined'
      );
    }

    if (!apiCall.urlPath) {
      throw new Error(
        'ApiCallService validateApiCallObject method error: ApiCallObject urlPath undefined'
      );
    }
  }

  // Standard HTTP requests
  public get<T>(apiCall: ApiCallObject): Observable<ApiResponse<T>> {
    this.validateApiCallObject(apiCall);

    return this.httpClient.get<any>(this.constructUrl(apiCall)).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        event => this.handleResponse(event, apiCall),
        // Operation failed; error is an HttpErrorResponse
        error => this.handleError(error)
      )
    );
  }

  public post<T>(apiCall: ApiCallObject): Observable<ApiResponse<T>> {
    this.validateApiCallObject(apiCall);

    if (!apiCall.payload) {
      throw new Error(
        'ApiCallService post method error: ApiCallObject payload undefined'
      );
    }

    if (apiCall.useSnackBar) {
      this.snackBar.open('Creation in progress..');
    }

    if (!apiCall.successMessage) {
      apiCall.successMessage = 'Item created successfully';
    }

    return this.httpClient
      .post<any>(this.constructUrl(apiCall), apiCall.payload)
      .pipe(
        tap(
          event => this.handleResponse(event, apiCall),
          error => this.handleError(error)
        )
      );
  }

  public put<T>(apiCall: ApiCallObject): Observable<ApiResponse<T>> {
    this.validateApiCallObject(apiCall);

    if (!apiCall.payload) {
      throw new Error(
        'ApiCallService put method error: apiCall payload undefined'
      );
    }

    if (apiCall.useSnackBar) {
      this.snackBar.open('Update in progress..');
    }

    if (!apiCall.successMessage) {
      apiCall.successMessage = 'Item updated successfully';
    }

    return this.httpClient
      .put<any>(this.constructUrl(apiCall), apiCall.payload)
      .pipe(
        tap(
          event => this.handleResponse(event, apiCall),
          error => this.handleError(error)
        )
      );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.snackBar.open('An error occured: ' + error.error.message, null, {
        duration: 20000
      });

      if (!environment.production) {
        console.error('An error occurred:', error.error.message);
      }
    } else {
      if (error.status === 412) {
        this.snackBar.open('Error.', null, { duration: 5000 });
        return error.error;
      }

      if (error.status === 400) {
        if (error.error.answerMessage) {
          this.snackBar.open(error.error.answerMessage, null, {
            duration: 20000
          });
        } else {
          this.snackBar.open('An error occured.', null, { duration: 20000 });
        }
      } else if (error.status === 0) {
        this.snackBar.open('Internet connection unavailable.', null, {
          duration: 60000
        });
      } else {
        if (error.status === 403) {
          this.snackBar.open('Access denied!', null, { duration: 60000 });
          this.router.navigate(['/account/login']);
        } else if (error.status === 401) {
          this.snackBar.open('Please login again.', null, { duration: 15000 });
          this.router.navigate(['/account/login']);
        } else if (error.status === 500) {
          this.snackBar.open(
            'Server error. Please refresh the page and try again. If the problem persists please contact us.',
            null,
            { duration: 60000 }
          );
        } else if (error.status === 0) {
          this.snackBar.open('Internet connection unavailable.', null, {
            duration: 60000
          });
        }
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        if (!environment.production) {
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`
          );
        }
      }
      // TODO: return an observable with a user-facing error message
      return throwError('Something bad happened; please try again later.');
    }
  }
}
