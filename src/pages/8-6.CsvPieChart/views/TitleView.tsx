import React, { FC } from 'react';
import { Option, Select } from '@material-tailwind/react';
import { options } from '@/consts/pieChart';

export type TitleViewProps = {
  importData: (val: any) => void;
};

export const TitleView: FC<TitleViewProps> = ({ importData }) => {
  return (
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
  );
};
