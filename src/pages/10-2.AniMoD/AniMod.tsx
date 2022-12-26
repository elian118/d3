import React, { useEffect, useRef, useState } from 'react';
import { easeLinear, select } from 'd3';
import { dataSet, svgHeight, svgWidth } from '@/consts/measureOfDispersion';
import { useInterval } from '@/hooks';
import { SelectBoxView } from '@/pages/10-2.AniMoD/SelectBoxView';
import { DescView } from '@/pages/10-2.AniMoD/DescView';
import '../../styles/measureOfDispersion/measureOfDispersionStyle.css';

export const AniMod = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);
  const [easeType, setEaseType] = useState<((val: number) => number)[]>([
    easeLinear,
  ]);

  const [data, setData] = useState<number[][]>([]);
  const [isReload, setIsReload] = useState<boolean>(false);

  const updateData = (dataSet) => {
    setData(
      dataSet.map(() => [Math.random() * svgWidth, Math.random() * svgHeight]),
    );
  };

  const updateGraph = () => {
    svg
      .selectAll('circle')
      .data(data)
      .transition()
      .ease(easeType[0])
      .duration(1000)
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => svgHeight - d[1]);
  };

  useInterval(
    () => {
      updateData(data);
      data.length > 0 && updateGraph();
    },
    isReload ? 1000 : null,
  );

  useEffect(() => {
    setData(dataSet);
    setEaseType([easeLinear]);
    return () => setData([]);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>산포도 - 애니메이션</h1>
      <DescView />
      <SelectBoxView
        isReloadState={[isReload, setIsReload]}
        setEaseType={setEaseType}
      />
      <svg
        ref={svgRef}
        className="w-[360px] h-[250px] border border-gray-200 overflow-visible"
      >
        {data.map((d, i) => (
          <circle
            key={i}
            className="mark"
            cx={d[0]}
            cy={svgHeight - d[1]}
            r="5"
          />
        ))}
      </svg>
    </div>
  );
};
