import React, { FC } from 'react';
import { Option, Select } from '@material-tailwind/react';
import { curves } from '@/consts/dataSets/lineGraph';
import { CurveFactory } from 'd3-shape';

type SelectBoxViewProps = {
  setCurve: (val: CurveFactory[]) => void;
};

export const SelectBoxView: FC<SelectBoxViewProps> = ({ setCurve }) => {
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
    </div>
  );
};
