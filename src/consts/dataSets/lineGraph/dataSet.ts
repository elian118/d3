import { curveCatmullRom, CurveFactory } from 'd3-shape';
import {
  curveBasis,
  curveBumpX,
  curveBumpY,
  curveCardinal,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
} from 'd3';

export const dataSet1 = [10, 47, 65, 8, 64, 99, 75, 22, 63, 80];
export const dataSet2 = [90, 77, 55, 48, 64, 90, 85, 42, 13, 40];
export const dataSet3 = [50, 27, 45, 58, 84, 70, 45, 22, 30, 90];

export const curves: { label: string; value: CurveFactory }[] = [
  { label: 'curveBasis', value: curveBasis },
  { label: 'curveBumpX', value: curveBumpX },
  { label: 'curveBumpY', value: curveBumpY },
  { label: 'curveCardinal', value: curveCardinal },
  { label: 'curveCatmullRom', value: curveCatmullRom },
  { label: 'curveMonotoneX', value: curveMonotoneX },
  { label: 'curveMonotoneY', value: curveMonotoneY },
  { label: 'curveNatural', value: curveNatural },
  { label: 'curveStep', value: curveStep },
  { label: 'curveStepAfter', value: curveStepAfter },
  { label: 'curveStepBefore', value: curveStepBefore },
];
