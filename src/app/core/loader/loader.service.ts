import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoadingForSearch: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isLoadingForLevelView: BehaviorSubject<boolean> = new BehaviorSubject(false);
}
