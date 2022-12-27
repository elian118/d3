import React, { FC } from 'react';

type DescViewProps = {
  term: number;
};

export const DescView: FC<DescViewProps> = ({ term }) => {
  return (
    <div className="my-4">
      산포도 또한 애니메이션 적용이 가능하다.
      <br />
      <br />
      아래 산포도는 데이터셋 갱신을 시작하면 {term / 1000}초(duration)마다
      데이터가 갱신되는데,
      <br />
      이 때마다 미리 선택된 D3 EASE 패턴으로 점들이 움직인다.
      <br />
      <br />
      참고로 EASE는 D3뿐만 아니라,
      <br />
      CSS를 포함한 모든 종류의 프론트 애니메이션 효과에 적용될 수 있는 개념이다.
      <br />
      물론, d3에서도 transition()이 쓰인 곳이라면 어디든 적용 가능하다.
    </div>
  );
};
