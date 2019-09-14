import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse, ApiCallObject } from './models/api.model';
import { ApiService } from './api.service';
import { CultureDomain, Domain } from './models/app.model';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  constructor(
    private api: ApiService
  ) { }

  // Use this if you need to use a different api endpoint than the one used inside ./api.service.ts
  get baseUrl(): string {
    return environment.apiEndPoint;
  }

  public getDomainByKGId(KGId: number): Observable<ApiResponse<Domain>> {
    return this.api.get<Domain>(
      new ApiCallObject(
        this.baseUrl,
        'SAT.domains',
        undefined,
        {
          'kg-id': KGId
        }
      )
    );
  }

  public addCulturesToDomain(domainId: number, cultures: CultureDomain[]): Observable<ApiResponse<boolean>> {
    return this.api.post<boolean>(
      new ApiCallObject(
        this.baseUrl,
        'SAT.cultureDomains',
        {
          domainId: domainId
        },
        undefined,
        cultures,
        'Domain cultures updated successfully'
      )
    );
  }
}
