import React, { FC } from 'react';
import { line } from 'd3';
import { margin, offsetX, offsetY, scale, svgHeight } from '@/consts/lineGraph';
import { CurveFactory } from 'd3-shape';

type DrawGraphProps = {
  data: number[];
  idx: number;
  curve: CurveFactory[];
};

export const DrawGraph: FC<DrawGraphProps> = ({ data, idx, curve }) => {
  let myLines = line<number>()
    .x((d, i) => offsetX + i * margin)
    .y((d) => svgHeight - Number(d) * scale - offsetY)
    .curve(curve[0]); // 곡선의 구부러짐 형태를 D3의 CurveFactory 인터페이스 구현체들 중에서 선택할 수 있다.

  return <path className={`line item${idx + 1}`} d={myLines(data) ?? '0'} />;
};
