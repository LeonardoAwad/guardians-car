import * as carrosJson from '../../../assets/carros.json';

import { Component, Input, OnInit } from '@angular/core';

import { CarModel } from './model/car.model';
import { FilterModel } from '../filter/model/filter.model';
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
    this.filterInit();
  }

  filterInit(): void {
    this.filterService.filter$
      .pipe(
        tap({
          next: (filter) => {
            const filtersActive: FilterModel = {
              coachwork: filter.coachwork.filter((x) => x.selected == true),
              engines: filter.engines.filter((x) => x.selected == true),
              sizes: filter.sizes.filter((x) => x.selected == true),
              search: filter.search,
            };

            this.filterCars(filtersActive);
          },
        })
      )
      .subscribe();
  }

  removeDuplicate(carList: CarModel[]): CarModel[] {
    carList = carList.filter(
      (value, index, self) =>
        index === self.findIndex((car) => car.name === value.name)
    );

    return carList;
  }

  filterCars(filtersActive: FilterModel): void {
    const cars: CarModel[] = Object.values(carrosJson);
    let carFilted: CarModel[] = cars.filter((car) => {
      return car.name?.includes(filtersActive.search ?? '');
    });

    let carType: CarModel[] = [];
    filtersActive.coachwork.forEach((fil) => {
      const type = carFilted.filter((car) => car.type == fil.value);
      carType = [...carType, ...type];
    });

    if (carType.length || filtersActive.coachwork.length) {
      carFilted = this.removeDuplicate(carType);
    }

    let carEngine: CarModel[] = [];
    filtersActive.engines.forEach((fil) => {
      const engine = carFilted.filter((car) => car.engine == fil.value);

      carEngine = [...carEngine, ...engine];
    });
    if (carEngine.length || filtersActive.engines.length) {
      carFilted = this.removeDuplicate(carEngine);
    }

    let carSize: CarModel[] = [];
    filtersActive.sizes.forEach((fil) => {
      const size = carFilted.filter((car) => car.size == fil.value);
      carSize = [...carSize, ...size];
    });
    if (carSize.length || filtersActive.sizes.length) {
      carFilted = this.removeDuplicate(carSize);
    }

    this.carList = carFilted;
  }
}
