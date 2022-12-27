import React, { FC } from 'react';
import { offsetX, offsetY, svgHeight } from '@/consts/lineGraph';

type ScaledLineViewProps = {
  maxY: number;
};

export const ScaledLineView: FC<ScaledLineViewProps> = ({ maxY }) => {
  return (
    <>
      {/* x축 눈금자 */}
      <g
        className="axisX"
        transform={`translate(${offsetX}, ${svgHeight - offsetY})`}
      />
      {/* y축 눈금자 */}
      <g
        className="axisY"
        transform={`translate(${offsetX}, ${svgHeight - offsetY - maxY})`}
      />
    </>
  );
};
