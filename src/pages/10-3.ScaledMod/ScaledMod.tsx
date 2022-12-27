import React, { useEffect, useRef, useState } from 'react';
import { axisBottom, axisLeft, easeLinear, max, scaleLinear, select } from 'd3';
import {
  dataSet,
  offsetX,
  offsetY,
  svgHeight,
  svgWidth,
} from '@/consts/measureOfDispersion';
import '../../styles/mod/measureOfDispersionStyle.css';
import {
  DescView,
  ScaledLineView,
  SelectBoxView,
} from '@/pages/10-3.ScaledMod';
import { useInterval } from '@/hooks';

export const ScaledMod = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [data, setData] = useState<number[][]>([]);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [term, setTerm] = useState<number>(1000);
  const [easeType, setEaseType] = useState<((val: number) => number)[]>([
    easeLinear,
  ]);

  const maxX = Number(max(data, (d) => d[0]));
  const maxY = Number(max(data, (d) => d[1]));

  const rescale = () => {
    const xScale = scaleLinear().domain([0, maxX]).range([0, maxX]);
    const yScale = scaleLinear().domain([0, maxY]).range([maxY, 0]);

    svg.select('.axisX').call(axisBottom(xScale) as any);
    svg.select('.axisY').call(axisLeft(yScale) as any);
  };

  const updateData = () => {
    setData(
      data.map(() => [Math.random() * svgWidth, Math.random() * svgHeight]),
    );
  };

  const updateGraph = () => {
    svg
      .selectAll('circle')
      .data(data)
      .transition()
      .ease(easeType[0])
      .duration(term)
      .attr('cx', (d) => d[0] + offsetX) // 점이 X축 외부로 벗어나지 않도록 오프셋 보정치 추가
      .attr('cy', (d) => svgHeight - d[1] - offsetY); // 점이 Y축 외부로 벗어나지 않도록 오프셋 보정치 추가
  };

  useEffect(() => {
    // 그래프 애니메이션과 스케일링(X, Y축 눈금 그리기)은 데이터셋 변경 직후 실행돼야 한다.
    data.length > 0 && updateGraph();
    rescale();
  }, [data]);

  useInterval(() => updateData(), isReload ? term : null);

  useEffect(() => {
    setData(dataSet);
    return () => setData([]);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>산포도 - 데이터에 따른 눈금 조정</h1>
      <DescView />
      <SelectBoxView
        termState={[term, setTerm]}
        isReloadState={[isReload, setIsReload]}
        setEaseType={setEaseType}
      />
      <svg ref={svgRef} className="w-[400px] h-[250px] overflow-visible">
        <ScaledLineView maxX={maxX} maxY={maxY} />
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
