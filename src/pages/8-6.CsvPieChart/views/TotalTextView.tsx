import React from 'react';
import { svgHeight2, svgWidth2 } from '@/consts/verticalBarGraph';

export const TotalTextView = () => {
  return (
    <text
      className="total"
      transform={`translate(${svgWidth2 / 2}, ${svgHeight2 / 2 + 5})`}
    >
      점유율
    </text>
  );
};
