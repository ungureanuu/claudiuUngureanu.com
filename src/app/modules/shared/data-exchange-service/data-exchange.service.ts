import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataExchangeService {
  private subject: Subject<any> = new Subject<any>();

  public send(type: string, event: string, payload: any): void {
    this.subject.next({ type, event, payload });
  }

  public receive(tp: string, evt: string): Observable<any> {
    return this.subject.asObservable().pipe(
      filter(({ type, event, payload }) => {
        return type === tp && event === evt;
      }),
      map(({ type, event, payload }) => {
        return payload;
      })
    );
  }
}
