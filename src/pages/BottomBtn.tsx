import React, { FC } from 'react';
import { IconButton } from '@material-tailwind/react';
import { ChevronLeft, ChevronRight } from '@/assets/icons';
import { compList } from '@/consts/compList';

type BottomBtnProps = {
  disIdsState: [number, (val: number) => void];
}

export const BottomBtn: FC<BottomBtnProps> = ({disIdsState}) => {
  const [disIdx, setDisIdx] = disIdsState;
  return (
    <div className="flex flex-row justify-center items-center">
      <IconButton
        className="mr-2"
        style={{display: compList[disIdx - 1] ? 'inherit' : 'none' }}
        onClick={() => setDisIdx(disIdx - 1)}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        style={{display: compList[disIdx + 1] ? 'inherit' : 'none' }}
        onClick={() => setDisIdx(disIdx + 1)}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};