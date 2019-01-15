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
  heightStep: 10
};
