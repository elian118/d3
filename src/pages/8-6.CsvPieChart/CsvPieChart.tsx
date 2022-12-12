import React, { useEffect, useRef, useState } from 'react';
import { Option, Select } from '@material-tailwind/react';
import { cstColors, options } from '@/consts/pieChart';
import * as d3 from 'd3';
import { interpolate, PieArcDatum, select } from 'd3';
import { svgHeight2, svgWidth2 } from '@/consts/verticalBarGraph';
import { CsvFileType } from '@/types/pieChart';

export const CsvPieChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataSet, setDataSet] = useState<CsvFileType[]>([]);

  let pie = d3.pie<CsvFileType>().value((d) => Number(d.ratio))(dataSet);
  let arc = d3.arc<PieArcDatum<CsvFileType>>().innerRadius(30).outerRadius(180);
  let pieElement;
  let textElement;

  const importData = (file) => {
    const keys = Object.keys(file[0]);
    const values = Object.values<number>(file[0]);
    let obj = keys.map((key, idx) => ({
      label: key,
      ratio: Number(values[idx]),
    }));
    setDataSet(obj);
  };

  const updateText = () => {
    textElement = svg.selectAll('text').data(pie);
    textElement
      .style('opacity', 0)
      .transition()
      .duration(dataSet.length * (1500 / (dataSet.length * 2)))
      .delay((d, i) => i * (1500 / (dataSet.length * 2)))
      .style('opacity', 1);
  };

  const updateGraph = () => {
    pieElement = svg.selectAll('path').data(pie);
    pieElement
      .style('opacity', 0)
      .transition()
      .duration(dataSet.length * (1000 / (dataSet.length * 2)))
      .delay((d, i) => i * (1000 / (dataSet.length * 2)))
      .style('opacity', 1)
      .attrTween('d', (d) => {
        const interpol = interpolate(
          { startAngle: d.startAngle, endAngle: d.startAngle }, // 애니메이션 동작 초기값 지정
          { startAngle: d.startAngle, endAngle: d.endAngle }, // 애니메이션 동작 이후 값 지정
        );
        // @ts-ignore
        return (t) => arc(interpol(t)); // 정해진 시간에 맞추어 interpolate 인자 a -> b로 적용 => 애니메이션에 반영
      });
    console.log('pie', pie);
  };

  useEffect(() => {
    updateGraph();
    updateText();
  }, [dataSet]);

  useEffect(() => {
    importData(options[0].fileName);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>리액트 CSV 원 그래프</h1>
      <div className="my-4">
        <div className="flex flex-row items-center justify-center">
          <div className="text-lg font-bold mr-4 min-w-max">
            글로벌 스마트폰 시장 점유율
          </div>
          <Select
            defaultValue={options[0].name}
            label="년도/분기 선택"
            color="teal"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            onChange={(name) =>
              importData(
                options[options.findIndex((o) => o.name === name)].fileName,
              )
            }
          >
            {options.map((opt, idx) => (
              <Option key={idx} value={opt.name}>
                {opt.name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <svg ref={svgRef} className="w-[360px] h-[360px]">
        <text
          className="total"
          transform={`translate(${svgWidth2 / 2}, ${svgHeight2 / 2 + 5})`}
        >
          점유율
        </text>
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
                {`${d.data.label}`} {`${d.data.ratio}%`}
              </text>
            </g>
          ))}
      </svg>
    </div>
  );
};

/*
  참고로 원 그래프 비율이 설정돼 있는 pie 첫 번째 요소 정보는 아래와 같다.
  0: {
    data: { label: 'Samsung', ratio: 22 }, // 원본 데이터
    endAngle: 3.769911184307752, // 부채꼴 종료 각도
    index: 1, // 인덱스
    padAngle: 0, // 부채골 패딩
    startAngle: 2.387610416728243,  // 부채꼴 시작 각도
    value: 22 // arc 계산에 전달되는 실질적인 값
  }, ...
*/
