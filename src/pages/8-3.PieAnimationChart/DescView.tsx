import React from 'react';

export const DescView = () => {
  return (
    <div className="mt-4">
      원 그래프는 원본 데이터가 어떻든 간에
      <br />
      크기 순으로만 자동 나열하므로
      <br />
      원본 인덱스 순으로 처리되는 애니메이션과
      <br />
      등장 순서에서 차이가 발생한다.
      <br />
      <br />
      굳이, 순서대로 나오게 하고 싶다면
      <br />
      원본을 크기순으로 정렬한 복사본을
      <br />
      D3 데이터셋으로 사용하면 된다.
    </div>
  );
};
