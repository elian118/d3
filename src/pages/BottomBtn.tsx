import React, { FC } from 'react';
import { IconButton } from '@material-tailwind/react';
import { ChevronLeft, ChevronRight } from '@/assets/icons';

type BottomBtnProps = {
  list: JSX.Element[];
  disIdsState: [number, (val: number) => void];
}

export const BottomBtn: FC<BottomBtnProps> = ({list, disIdsState}) => {
  const [disIdx, setDisIdx] = disIdsState;
  return (
    <div className="flex flex-row justify-center items-center">
      <IconButton
        className="mr-2"
        style={{display: list[disIdx - 1] ? 'inherit' : 'none' }}
        onClick={() => setDisIdx(disIdx - 1)}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        style={{display: list[disIdx + 1] ? 'inherit' : 'none' }}
        onClick={() => setDisIdx(disIdx + 1)}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};