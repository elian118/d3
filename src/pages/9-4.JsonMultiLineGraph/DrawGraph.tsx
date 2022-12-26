import React, { FC } from 'react';
import { line } from 'd3';
import { margin, offsetX, offsetY, scale, svgHeight } from '@/consts/lineGraph';
import { CurveFactory } from 'd3-shape';
import { JsonData } from '@/types/lineChart';

type DrawGraphProps = {
  data: JsonData[];
  idx: number;
  curve: CurveFactory[];
};

export const DrawGraph: FC<DrawGraphProps> = ({ data, idx, curve }) => {
  const myLines = line<JsonData>()
    .x((d, i) => offsetX + i * margin)
    .y((d) => svgHeight - Number(d.value) * scale - offsetY)
    .curve(curve[0]);

  return <path className={`line item${idx + 1}`} d={myLines(data) ?? '0'} />;
};
