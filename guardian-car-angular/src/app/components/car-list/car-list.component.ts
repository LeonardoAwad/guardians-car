import * as carrosJson from '../../../assets/carros.json';

import { Component, Input, OnInit } from '@angular/core';

import { CarModel } from './model/car.model';
import { FilterService } from 'src/app/services/filter.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  @Input() carList!: CarModel[];
  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.filterInit;
  }

  filterInit(): void {
    const cars: CarModel[] = Object.values(carrosJson);
    this.filterService.filter$
      .pipe(
        tap({
          next: (filter) => {
            let carFilted: CarModel[] = cars.filter((car) => {
              return car.name
                ?.toLowerCase()
                .includes(filter.search?.toLowerCase() ?? '');
            });

            filter.coachwork.forEach((fil) => {
              if (!fil.selected) {
                return;
              }
              const carType = cars.filter((car) => {
                return car.type?.includes(fil.value ?? '');
              });

              carFilted = [...carType, ...carFilted];
            });

            filter.engines.forEach((fil) => {
              if (!fil.selected) {
                return;
              }

              const carEngine = carFilted.filter((car) => {
                return car.engine?.includes(fil.value ?? '');
              });
              carFilted = carEngine;
            });

            filter.sizes.forEach((fil) => {
              if (!fil.selected) {
                return;
              }

              const carEngine = carFilted.filter((car) => {
                return car.size?.includes(fil.value ?? '');
              });

              carFilted = carEngine;
            });

            this.carList = carFilted;
          },
        })
      )
      .subscribe();
  }
}
