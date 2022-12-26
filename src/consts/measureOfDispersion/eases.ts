import {
  easeBack,
  easeBounce,
  easeCircle,
  easeCubic,
  easeElastic,
  easeExp,
  easeLinear,
  easePoly,
  easeQuad,
  easeSin,
} from 'd3';
import { Ease } from '@/types/measureOfDispersion';

export const eases: Ease[] = [
  { label: 'easeLinear', value: easeLinear },
  { label: 'easePoly', value: easePoly },
  { label: 'easeQuad', value: easeQuad },
  { label: 'easeCubic', value: easeCubic },
  { label: 'easeSin', value: easeSin },
  { label: 'easeExp', value: easeExp },
  { label: 'easeCircle', value: easeCircle },
  { label: 'easeElastic', value: easeElastic },
  { label: 'easeBack', value: easeBack },
  { label: 'easeBounce', value: easeBounce },
];
