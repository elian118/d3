import React, { FC } from 'react';
import { IconButton, Typography } from '@material-tailwind/react';
import { ChevronLeft, ChevronRight } from '@/assets/icons';
import { compList } from '@/consts/compList';

type BottomBtnProps = {
  disIdsState: [number, (val: number) => void];
}

export const BottomBtn: FC<BottomBtnProps> = ({disIdsState}) => {
  const [disIdx, setDisIdx] = disIdsState;
  return (
    <div className="flex flex-row justify-center items-center mt-8">
      <Typography
        style={{visibility: compList[disIdx - 1] ? 'inherit' : 'hidden' }}
        className="mr-4 font-bold"
      >
        이전
      </Typography>
      <IconButton
        className="mx-2"
        disabled={!compList[disIdx - 1]}
        onClick={() => setDisIdx(disIdx - 1)}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className="mx-2"
        disabled={!compList[disIdx + 1]}
        onClick={() => setDisIdx(disIdx + 1)}
      >
        <ChevronRight />
      </IconButton>
      <Typography
        style={{visibility: compList[disIdx + 1] ? 'inherit' : 'hidden' }}
        className="ml-4 font-bold"
      >
        다음
      </Typography>
    </div>
  );
};