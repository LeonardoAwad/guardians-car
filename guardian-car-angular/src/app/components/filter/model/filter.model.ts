export class FilterModel {
  coachwork: FilterOptionModel[] = [];
  engines: FilterOptionModel[] = [];
  sizes: FilterOptionModel[] = [];
  search?: string;
}

export class FilterOptionModel {
  selected = false;
  value?: string;
}
