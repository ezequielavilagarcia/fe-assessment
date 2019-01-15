import { InjectionToken } from '@angular/core';

export const INHABITANTS_CONFIG = new InjectionToken<InhabitantsConfig>('inhabitants.config');

export interface InhabitantsConfig {
  minAgeRange: number;
  maxAgeRange: number;
  ageStep: number;
  minWeightRange: number;
  maxWeightRange: number;
  weightStep: number;
  minHeightRange: number;
  maxHeightRange: number;
  heightStep: number;
  nameFilterName: string;
  sortingFilterAscName: string;
  sortingFilterDescName: string;
  ageFilterName: string;
  heightFilterName: string;
  weightFilterName: string;
  hairColorFilterName: string;
  professionFilterName: string;
}
export const INHABITANTS_CONSTANTS: InhabitantsConfig = {
  minAgeRange: 0,
  maxAgeRange: 500,
  ageStep: 10,
  minWeightRange: 20,
  maxWeightRange: 60,
  weightStep: 1,
  minHeightRange: 0,
  maxHeightRange: 300,
  heightStep: 10,
  nameFilterName: 'Name',
  sortingFilterAscName: 'Name asc',
  sortingFilterDescName: 'Name desc',
  ageFilterName: 'Age',
  weightFilterName: 'Weight',
  heightFilterName: 'Height',
  hairColorFilterName: 'Hair',
  professionFilterName: 'Professions'
};
