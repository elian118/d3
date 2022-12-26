import React, { FC } from 'react';
import { Button, Option, Select } from '@material-tailwind/react';
import { eases } from '@/consts/measureOfDispersion';

type SelectBoxViewProps = {
  isReloadState: [boolean, (val: boolean) => void];
  setEaseType: (x: any[]) => void;
};

export const SelectBoxView: FC<SelectBoxViewProps> = ({
  isReloadState,
  setEaseType,
}) => {
  const [isReload, setIsReload] = isReloadState;
  return (
    <div className="my-4 flex flex-row items-center justify-center">
      <div className="mr-2">
        <Button color="teal" size="sm" onClick={() => setIsReload(!isReload)}>
          데이터셋 갱신 {isReload ? '중지' : '시작'}
        </Button>
      </div>
      <div className="w-48">
        <Select
          label="EASE 패턴 선택"
          color="teal"
          onChange={(name) =>
            setEaseType([eases[eases.findIndex((x) => x.label === name)].value])
          }
        >
          {eases.map((ease, idx) => (
            <Option key={`${ease.label}-${idx}`} value={ease.label}>
              {ease.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
