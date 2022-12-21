import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
} from '@angular/core';

import { CarEngineTypeEnum } from '../car-list/enum/car-engine-type.enum';
import { CarSizeTypeEnum } from '../car-list/enum/car-size-type.enum';
import { CarTypeEnum } from '../car-list/enum/car-type.enum';
import { FilterModel } from './model/filter.model';
import { FilterService } from 'src/app/services/filter.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterComponent implements OnInit {
  @Output() filterActive = new EventEmitter(true);
  searchControl = new FormControl('');
  filter$!: Observable<FilterModel>;
  cover = true;
  @HostBinding('class') get hostClass(): string {
    return 'app-filter';
  }
  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filter$ = this.filterService.filter$.pipe(
      tap({
        next: (filter) => {
          if (!filter.coachwork.length) {
            Object.values(CarTypeEnum).map((carType) =>
              filter.coachwork?.push({ selected: false, value: carType })
            );
          }
          if (!filter.sizes.length) {
            Object.values(CarSizeTypeEnum).map((carSize) =>
              filter.sizes?.push({ selected: false, value: carSize })
            );
          }
          if (!filter.engines.length) {
            Object.values(CarEngineTypeEnum).map((carEngine) =>
              filter.engines?.push({ selected: false, value: carEngine })
            );
          }
        },
      })
    );
  }

  applyFilter(filter: FilterModel): void {
    filter.search = this.searchControl.value;
    this.filterService.filter$.next(filter);
    this.filterActive.emit(false);
  }
}
