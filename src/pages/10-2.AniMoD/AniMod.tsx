import React, { useEffect, useRef, useState } from 'react';
import { easeLinear, select } from 'd3';
import { dataSet, svgHeight, svgWidth } from '@/consts/measureOfDispersion';
import { useInterval } from '@/hooks';
import { SelectBoxView } from '@/pages/10-2.AniMoD/SelectBoxView';
import { DescView } from '@/pages/10-2.AniMoD/DescView';
import '../../styles/mod/measureOfDispersionStyle.css';

export const AniMod = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [data, setData] = useState<number[][]>([]);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [term, setTerm] = useState<number>(1000); // 애니메이션과 데이터 갱신 간격(밀리초)
  const [easeType, setEaseType] = useState<((val: number) => number)[]>([
    easeLinear,
  ]); // D3 EASE 패턴

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
      .ease(easeType[0]) // ease 패턴 적용
      .duration(term) // easeType[0](term) => ex. easeExp(term)과 같다.
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => svgHeight - d[1]);
  };

  useInterval(
    () => {
      updateData(data);
      data.length > 0 && updateGraph();
    },
    isReload ? term : null,
  );

  useEffect(() => {
    setData(dataSet);
    setEaseType([easeLinear]);
    return () => setData([]);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>산포도 - 애니메이션</h1>
      <DescView term={term} />
      <SelectBoxView
        termState={[term, setTerm]}
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
            className={isReload ? 'markAct' : 'mark'}
            cx={d[0]}
            cy={svgHeight - d[1]}
            r="5"
          />
        ))}
      </svg>
    </div>
  );
};
