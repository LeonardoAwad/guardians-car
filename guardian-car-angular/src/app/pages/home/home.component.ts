import { Component, OnInit } from '@angular/core';

import { FilterService } from 'src/app/services/filter.service';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  filterActive = false;
  searchControl = new FormControl('');
  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.controlValuesChangeInit();
  }

  controlValuesChangeInit(): void {
    this.searchControl.valueChanges
      .pipe(
        tap({
          next: (value) => {
            const filter = this.filterService.filter$.value;
            filter.search = value;
            this.filterService.filter$.next(filter);
          },
        })
      )
      .subscribe();
  }
}
