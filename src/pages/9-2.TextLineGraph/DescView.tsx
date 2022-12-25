import React from 'react';

export const DescView = () => {
  return (
    <div className="my-2">
      눈금자는 먼저 scaleLinear()을 사용해
      <br />
      눈금의 간격 및 범위와 표시형식 등의 스케일 값을 설정하고
      <br />
      <br />
      이렇게 계산된 스케일을
      <br />
      axisLeft(스케일), axisRight(스케일), axisBottom(스케일) axisTop(스케일)에
      입력함으로써
      <br />
      눈금자 위치까지 한 번에 간단히 지정할 수 있다.
      <br />
      <br />
      아래는 변화 추이가 잘 드러날 수 있게
      <br />
      이전 차트 y축에 2배 스케일과 axisLeft(스케일)을 적용한 모습이다.
    </div>
  );
};
