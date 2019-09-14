import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { DomainService } from '../../../../core/repositories/domain.service';
import { ApiResponse } from '../../../../core/repositories/models/api.model';
import { Domain } from '../../../../core/repositories/models/app.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  public domain: Domain;

  private subscription: Subscription = new Subscription();

  constructor(
    private domainService: DomainService
  ) { }

  public ngOnInit(): void {
    if (!this.subscription) {
      this.subscription = new Subscription();
    }

    this.subscription.add(this.domainService.getDomainByKGId(1).subscribe(
      (data: ApiResponse<Domain>) => {
        if (data && data.items && data.items.length > 0) {
          this.domain = data.items[0];
        }
      }
    ));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
