import React, { FC } from 'react';
import { offsetX, offsetY, svgHeight } from '@/consts/lineGraph';
import { range } from 'd3';

type ScaledLineViewProps = {
  maxX: number;
  maxY: number;
};

export const ScaledLineView: FC<ScaledLineViewProps> = ({ maxX, maxY }) => {
  const rangeX = range(50, maxX, 50);
  const rangeY = range(20, maxY, 20);

  return (
    <>
      {/* x축 눈금자 */}
      <g
        className="axisX"
        transform={`translate(${offsetX}, ${svgHeight - offsetY})`}
      />
      {rangeX.map((x, idx) => (
        <line
          key={`rangeX-${idx}`}
          className="grid"
          x1={x + offsetX + 1} // 눈금과 어긋남 맞춤
          y1={svgHeight - offsetY}
          x2={x + offsetX + 1} // 눈금과 어긋남 맞춤
          y2={svgHeight - offsetY - maxY}
        />
      ))}
      {/* y축 눈금자 */}
      <g
        className="axisY"
        transform={`translate(${offsetX}, ${svgHeight - offsetY - maxY})`}
      />
      {rangeY.map((y, idx) => (
        <line
          key={`rangeY-${idx}`}
          className="grid"
          x1={offsetX}
          y1={svgHeight - y - offsetY + 1} // 눈금과 어긋남 맞춤
          x2={maxX + offsetX}
          y2={svgHeight - y - offsetY + 1} // 눈금과 어긋남 맞춤
        />
      ))}
    </>
  );
};
