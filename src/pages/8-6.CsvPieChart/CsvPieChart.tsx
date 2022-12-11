import React, { useEffect, useRef, useState } from 'react';
import { Option, Select } from '@material-tailwind/react';
import { cstColors, options } from '@/consts/pieChart';
import * as d3 from 'd3';
import { interpolate, PieArcDatum, select } from 'd3';
import { svgHeight2, svgWidth2 } from '@/consts/verticalBarGraph';

export const CsvPieChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [keys, setKeys] = useState<string[]>([]);
  const [dataSet, setDataSet] = useState<number[]>([]);

  let pie = d3.pie<number>().value((d) => d)(dataSet);
  let arc = d3.arc<PieArcDatum<number>>().innerRadius(30).outerRadius(180);
  let pieElement;
  let textElement;

  const importData = (file) => {
    const keys = Object.keys(file[0]);
    const values = Object.values<number>(file[0]);
    setDataSet(values);
    setKeys(keys);
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

  const updateData = () => {
    pieElement = svg.selectAll('path').data(pie);
    pieElement
      .style('opacity', 0)
      .transition()
      .duration(dataSet.length * (1000 / (dataSet.length * 2)))
      .delay((d, i) => i * (1000 / (dataSet.length * 2)))
      .style('opacity', 1)
      .attrTween('d', (d) => {
        const interpol = interpolate(
          { startAngle: d.startAngle, endAngle: d.startAngle },
          { startAngle: d.startAngle, endAngle: d.endAngle },
        );
        // @ts-ignore
        return (t) => arc(interpol(t));
      });
  };

  useEffect(() => {
    updateData();
    updateText();
  }, [dataSet]);

  useEffect(() => {
    importData(options[0].fileName);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>리액트 CSV 원 그래프</h1>
      <div className="my-4">
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
      <svg ref={svgRef} className="w-[360px] h-[360px]">
        <text
          className="total"
          transform={`translate(${svgWidth2 / 2}, ${svgHeight2 / 2 + 5})`}
        >
          점유율
        </text>
        {dataSet.length > 0 &&
          pie.map((data, idx) => (
            <g
              key={idx}
              transform={`translate(${svgWidth2 / 2}, ${svgHeight2 / 2})`}
            >
              <path
                className="pie"
                d={arc(data) ?? undefined}
                style={{ fill: cstColors[idx] }}
              />
              <text
                className="pieNum"
                transform={`translate(${arc.centroid(data)})`}
              >
                {`${keys[idx]}`} {`${data.value}%`}
              </text>
            </g>
          ))}
      </svg>
    </div>
  );
};
