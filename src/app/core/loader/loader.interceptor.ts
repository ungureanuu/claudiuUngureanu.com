import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  private requests: Array<HttpRequest<any>> = [];
  private searchRequests: Array<HttpRequest<any>> = [];
  private levelViewRequests: Array<HttpRequest<any>> = [];

  constructor(private loaderService: LoaderService) { }

  public removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    const si = this.searchRequests.indexOf(req);
    const lvi = this.levelViewRequests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    if (si >= 0) {
      this.searchRequests.splice(si, 1);
    }
    if (lvi >= 0) {
      this.levelViewRequests.splice(lvi, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
    this.loaderService.isLoadingForSearch.next(this.searchRequests.length > 0);
    this.loaderService.isLoadingForLevelView.next(
      this.levelViewRequests.length > 0
    );
  }

  public isSearchReq(req: HttpRequest<any>): boolean {
    if (
      req.url.indexOf('GetCustomerHierarchyForSuggest') !== -1 ||
      req.url.indexOf('GetCustomerSearchResultFlat') !== -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  public isLevelViewReq(req: HttpRequest<any>): boolean {
    if (
      req.url.indexOf('GetCustomerByKgIdForFirstLevel') !== -1 ||
      req.url.indexOf('GetCustomerHierarchyByParent') !== -1
    ) {
      return true;
    } else {
      return false;
    }
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isSearchReq(req)) {
      this.searchRequests.push(req);
      this.loaderService.isLoadingForSearch.next(true);
    } else if (this.isLevelViewReq(req)) {
      this.levelViewRequests.push(req);
      this.loaderService.isLoadingForLevelView.next(true);
    } else {
      this.requests.push(req);
      this.loaderService.isLoading.next(true);
    }

    return new Observable(observer => {
      const subscription = next.handle(req).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        err => {
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        }
      );
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
