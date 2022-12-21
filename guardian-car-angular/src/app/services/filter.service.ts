import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FilterModel } from '../components/filter/model/filter.model';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class FilterService implements OnDestroy {
  destroyed$ = new Subject();
  filter$: BehaviorSubject<FilterModel> = new BehaviorSubject(
    new FilterModel()
  );

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
