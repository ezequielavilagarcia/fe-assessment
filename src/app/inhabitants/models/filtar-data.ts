import { Injectable } from '@angular/core';
import { Gnome } from 'src/app/shared/models/gnome';

interface RangeValue {
  lower: number;
  upper: number;
}
@Injectable({
  providedIn: 'root'
})
export class FilterData {
  filtersApplied: string[];
  name: string;
  sorting: { asc: boolean; desc: boolean };
  ageRange: RangeValue;
  weightRange: RangeValue;
  heightRange: RangeValue;
  hairColors: string[];
  professions: string[];

  constructor() {
    this.name = '';
    this.sorting = { asc: false, desc: false };
    this.ageRange = {
      lower: 0,
      upper: 500
    };
    this.weightRange = {
      lower: 20,
      upper: 60
    };
    this.heightRange = {
      lower: 0,
      upper: 300
    };
    this.hairColors = [];
    this.professions = [];
    this.filtersApplied = [];
  }

  copyFilters(filter: FilterData) {
    this.name = filter.name;
    [this.sorting.asc, this.sorting.desc] = [filter.sorting.asc, filter.sorting.desc];
    [this.ageRange.lower, this.ageRange.upper] = [filter.ageRange.lower, filter.ageRange.upper];
    [this.weightRange.lower, this.weightRange.upper] = [
      filter.weightRange.lower,
      filter.weightRange.upper
    ];
    [this.heightRange.lower, this.heightRange.upper] = [
      filter.heightRange.lower,
      filter.heightRange.upper
    ];
    this.hairColors = [];
    this.hairColors.push(...filter.hairColors);
    this.professions = [];
    this.professions.push(...filter.professions);
  }

  executeAllStrategies(dataset: Gnome[]) {
    let filterDataset = dataset;

    this.filtersApplied = [];

    filterDataset = this.nameStrategy(filterDataset);
    filterDataset = this.sortingStrategy(filterDataset);
    filterDataset = this.ageRangeStrategy(filterDataset);
    filterDataset = this.weightRangeStrategy(filterDataset);
    filterDataset = this.heightRangeStrategy(filterDataset);
    filterDataset = this.hairColorsStrategy(filterDataset);
    filterDataset = this.professionsStrategy(filterDataset);

    return filterDataset;
  }

  /**
   * Filter by name value. It returns a new instance of dataset only when it filter something
   *
   * @param {Gnome[]} dataset
   * @returns
   * @memberof FilterData
   */
  nameStrategy(dataset: Gnome[]) {
    let filteredDataset = dataset;
    if (this.name !== '') {
      this.filtersApplied.push('Name');

      filteredDataset = dataset.filter(gnome => {
        const gnomeName = gnome.name.toLowerCase();
        const nameToCompare = this.name.trim().toLowerCase();
        return gnomeName.includes(nameToCompare);
      });
    }
    return filteredDataset;
  }

  /**
   * Sorting by name value
   *
   * @param {Gnome[]} dataset
   * @returns
   * @memberof FilterData
   */
  sortingStrategy(dataset: Gnome[]) {
    let sortedDataset = dataset;
    if (this.sorting.asc) {
      this.filtersApplied.push('Name asc');

      sortedDataset = sortedDataset.sort((gnomeA: Gnome, gnomeB: Gnome) => {
        const gnomeAName = gnomeA.name.toLowerCase().trim();
        const gnomeBName = gnomeB.name.toLowerCase().trim();

        if (gnomeAName < gnomeBName) {
          return -1;
        }
        if (gnomeAName > gnomeBName) {
          return 1;
        }
        return 0;
      });
    }
    if (this.sorting.desc) {
      this.filtersApplied.push('Name desc');

      sortedDataset = sortedDataset.sort((gnomeA: Gnome, gnomeB: Gnome) => {
        const gnomeAName = gnomeA.name.toLowerCase().trim();
        const gnomeBName = gnomeB.name.toLowerCase().trim();

        if (gnomeAName > gnomeBName) {
          return -1;
        }
        if (gnomeAName < gnomeBName) {
          return 1;
        }
        return 0;
      });
    }
    return sortedDataset;
  }

  /**
   * Filter by age range. It returns a new instance of dataset.
   *
   * @param {Gnome[]} dataset
   * @returns
   * @memberof FilterData
   */
  ageRangeStrategy(dataset: Gnome[]) {
    if (this.ageRange.lower !== 0 || this.ageRange.upper !== 500) {
      this.filtersApplied.push('Age');
    }
    return dataset.filter(gnome => {
      return gnome.age <= this.ageRange.upper && gnome.age >= this.ageRange.lower;
    });
  }

  /**
   * Filter by weight range. It returns a new instance of dataset.
   *
   * @param {Gnome[]} dataset
   * @returns
   * @memberof FilterData
   */
  weightRangeStrategy(dataset: Gnome[]) {
    if (this.weightRange.lower !== 20 || this.weightRange.upper !== 60) {
      this.filtersApplied.push('Weight');
    }
    return dataset.filter(gnome => {
      return gnome.weight <= this.weightRange.upper && gnome.weight >= this.weightRange.lower;
    });
  }

  /**
   * Filter by height range. It returns a new instance of dataset.

   *
   * @param {Gnome[]} dataset
   * @returns
   * @memberof FilterData
   */
  heightRangeStrategy(dataset: Gnome[]) {
    if (this.heightRange.lower !== 0 || this.heightRange.upper !== 300) {
      this.filtersApplied.push('Height');
    }
    return dataset.filter(gnome => {
      return gnome.height <= this.heightRange.upper && gnome.height >= this.heightRange.lower;
    });
  }

  /**
   * Filter by hair colors array.
   * It returns a new instance of dataset only when it filter something
   *
   * @param {Gnome[]} dataset
   * @returns
   * @memberof FilterData
   */
  hairColorsStrategy(dataset: Gnome[]) {
    let filteredDataset = dataset;
    if (this.hairColors.length !== 0) {
      this.filtersApplied.push('Hair');

      filteredDataset = dataset.filter(gnome => {
        return this.hairColors.includes(gnome.hair_color.trim());
      });
    }

    return filteredDataset;
  }

  /**
   * Filter by professions array.
   * It returns a new instance of dataset only when it filter something
   *
   * @param {Gnome[]} dataset
   * @returns
   * @memberof FilterData
   */
  professionsStrategy(dataset: Gnome[]) {
    let filteredDataset = dataset;
    if (this.professions.length !== 0) {
      this.filtersApplied.push('Professions');

      filteredDataset = dataset.filter(gnome => {
        for (const profession of gnome.professions) {
          if (this.professions.includes(profession.trim())) {
            return true;
          }
        }
        return false;
      });
    }

    return filteredDataset;
  }
}
