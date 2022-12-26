import React, { FC } from 'react';
import { Option, Select } from '@material-tailwind/react';
import {
  curves,
  jsonDataSet1,
  jsonDataSet2,
  jsonDataSet3,
  jsonDataSet4,
  jsonDataSet5,
} from '@/consts/dataSets/lineGraph';
import { CurveFactory } from 'd3-shape';

type SelectBoxViewProps = {
  setCurve: (val: CurveFactory[]) => void;
  dataMapping: (dataSet: any[]) => void;
};

export const SelectBoxView: FC<SelectBoxViewProps> = ({
  setCurve,
  dataMapping,
}) => {
  return (
    <div className="w-80 my-4 flex flex-row items-center justify-center">
      <div className="mr-2">
        <Select
          label="커브 타입 선택"
          color="teal"
          onChange={(name) =>
            setCurve([curves[curves.findIndex((x) => x.label === name)].value])
          }
        >
          {curves.map((type, idx) => (
            <Option key={`${type.label}-${idx}`} value={type.label}>
              {type.label}
            </Option>
          ))}
        </Select>
      </div>
      <Select
        label="데이터셋"
        color="amber"
        onChange={(dataSetNo) => {
          const targets = [
            jsonDataSet1,
            jsonDataSet2,
            jsonDataSet3,
            jsonDataSet4,
            jsonDataSet5,
          ];
          dataMapping(targets[Number(dataSetNo as string) - 1]);
        }}
      >
        {[1, 2, 3, 4, 5].map((e, i) => (
          <Option key={`options-${i}`} value={String(e)}>
            데이터셋-{e}
          </Option>
        ))}
      </Select>
    </div>
  );
};
