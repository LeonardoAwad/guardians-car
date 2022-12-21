import { Component, Input } from '@angular/core';

import { CarModel } from '../model/car.model';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent {
  @Input() car!: CarModel;

  srcReplace(): string {
    const img = this.car.name == 'Ford Ká' ? 'Ka' : this.car.name;
    return `../../../../assets/Carros/${img}.png`;
  }
}
