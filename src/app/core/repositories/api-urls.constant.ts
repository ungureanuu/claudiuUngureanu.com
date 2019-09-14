import { InjectionToken } from '@angular/core';
export const API_URLS = new InjectionToken('apiUrls');

export interface IApiUrl {
  [key: string]: IApiUrls;
}

export interface IApiUrls {
  url?: string;
  children?: IApiUrl;
}

export const apiUrls: IApiUrls = {
  children: {
    SAT: {
      url: 'SAT',
      children: {
        domains: { url: 'domains' },
        cultureDomains: { url: 'domains/{domainId}/cultures' }
      }
    }
  }
};
