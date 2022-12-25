import React from 'react';

export const DescView = () => {
  return (
    <div className="my-4">
      꺾은선 그래프는 line() 메서드를 사용해
      <br />
      데이터별 x, y좌표를 지정하는 방법으로 그릴 수 있다.
      <br />
      <br />
      {`이 좌표를 svg > path d속성에 입력하면`}
      <br />각 좌표 사이를 잇는 직선이 그려진다.
    </div>
  );
};
