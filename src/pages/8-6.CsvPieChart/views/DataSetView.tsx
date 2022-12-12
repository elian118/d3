import React, { FC } from 'react';
import { svgHeight2, svgWidth2 } from '@/consts/verticalBarGraph';
import { cstColors } from '@/consts/pieChart';
import { CsvFileType } from '@/types/pieChart';
import { Arc, PieArcDatum } from 'd3';

type DataSetViewProps = {
  dataSet: CsvFileType[];
  pie: PieArcDatum<CsvFileType>[];
  arc: Arc<any, PieArcDatum<CsvFileType>>;
};

export const DataSetView: FC<DataSetViewProps> = ({ dataSet, pie, arc }) => {
  return (
    <>
      {dataSet.length > 0 &&
        pie.map((d, idx) => (
          <g
            key={idx}
            transform={`translate(${svgWidth2 / 2}, ${svgHeight2 / 2})`}
          >
            <path
              className="pie"
              d={arc(d) ?? undefined}
              style={{ fill: cstColors[idx] }}
            />
            <text
              className="pieNum"
              transform={`translate(${arc.centroid(d)})`}
            >
              {`${d.data.label} ${d.data.ratio}%`}
            </text>
          </g>
        ))}
    </>
  );
};
