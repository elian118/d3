import React, { FC } from 'react';
import { Button, Input, Option, Select } from '@material-tailwind/react';
import { eases } from '@/consts/measureOfDispersion';

type SelectBoxViewProps = {
  isReloadState: [boolean, (val: boolean) => void];
  setEaseType: (x: any[]) => void;
  termState: [number, (val: number) => void];
};

export const SelectBoxView: FC<SelectBoxViewProps> = ({
  isReloadState,
  setEaseType,
  termState,
}) => {
  const [isReload, setIsReload] = isReloadState;
  const [term, setTerm] = termState;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4 mb-14 flex flex-row items-center justify-center">
        <Button color="teal" size="sm" onClick={() => setIsReload(!isReload)}>
          데이터셋 갱신 {isReload ? '중지' : '시작'}
        </Button>
        <div className="mx-2">
          <Input
            label="갱신 간격(밀리초)"
            type="number"
            value={term}
            onChange={(e) => {
              const val = Number(e.target.value);
              val > 0 &&
                val < 10000 &&
                Number.isSafeInteger(val) &&
                setTerm(val);
            }}
          />
        </div>
        <div className="w-48">
          <Select
            label="EASE 패턴 선택"
            color="teal"
            onChange={(name) =>
              setEaseType([
                eases[eases.findIndex((x) => x.label === name)].value,
              ])
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
    </div>
  );
};
