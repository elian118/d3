import { useEffect, useRef } from 'react';
// setInterval 대체 커스덤 훅
export const useInterval = (callback, delay: number | null) => {
  const savedCallback = useRef<any>(null); // 최근에 들어온 콜백을 저장할 ref

  useEffect(() => {
    savedCallback.current = callback; // 콜백이 바뀔 때마다 ref 갱신
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current(); // tick 이 실행되면, 콜백 실행
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]); // delay 가 바뀔 때마다 interval 제거 후 새로 실행
};

/*
  setInterval 은 비동기 콜백함수와 함께 다룰 때 상당히 골치 아프다.

  리덕스 상태관리 변수를 포함한 모든 state 들은
  useEffect 훅이 지정한 리액트 생애주기에 맞춰 바뀌지만,

  브라우저 명령 처리 대기열에 한 번 등록된 비동기 interval 콜백들은
  대기열에서 clearInterval 되기 전까지
  setInterval 당시의 state 값을 계속 기억하고 있기 때문이다.(값이 그대로임)

  이 현상은 아래 과정을 통해 나타난다.

  useEffect(() => {
    const id = setInterval(async (state: boolean) => {
        ... // 생략된 코드
        !state && clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [state]); // state 가 변경돼도 이미 실행된 interval state 는 바뀌지 않는다.

  1. 컴포넌트가 생성될 때 setInterval 도 실행되며 비동기 콜백이 대기열에 등록된다.
  2. state 가 바뀌면 새 컴포넌트가 생성되고 기존 컴포넌트는 파괴된다.
  3. 곧 이어, 새로운 setInterval 이 실행되며 id가 다른 비동기 콜백도 대기열에 등록된다.
  4. 하지만, 파괴된 컴포넌트에서 생성된 interval 은 등록 당시 state 만 기억한 채 계속 실행된다.
  5. 콜백지옥이 펼쳐진다.

  특히, 이렇게 한 번 비동기 interval 콜백이 대기열에 등록되고 나면
  비동기 콜백은 초기 state 만 기억하므로,
  clearInterval 로 제거할 방법도 없는 게 문제다.(Closure)

  당연히, 이 상태에서 또 다시 state 가 바뀌고 useEffect 가 실행되면,
  기존 interval 은 유지한 채 새로운 interval 이 대기열에 새로 등록된다.
  이런 식으로 interval 비동기 콜백은 계속해서 대기열에 누적되며
  콜백지옥이 나타난다.

  useInterval 훅은 이 문제를 해결하는 방법으로
  훅 안에서 콜백을 바꿔주는 useEffect 를 선언했다.
  clearInterval 이 소용 없으니 콜백을 교체하는 방법으로 우회한 셈이다.
  다시 말해, 콜백 안의 state 는 바꿀 수 없지만, 콜백 자체는 변경 가능하다.

  또, 아래처럼 delay 에 3항식을 사용하면 clearInterval 이 실행돼
  비동기 interval 콜백에 실행 조건절을 추가한 것과 같은 효과를 낸다.

  useInterval(() => {
    setCount(count + 1);
  }, isRunning ? delay : null);

  delay 에 3항식을 사용하는 방법 대신
  비동기 interval 콜백 안에 실행 조건절을 써도 무방하지만,
  이 방식은 메모리에서 clearInterval 을 수행하지 않고
  단순히 타이머를 멈춘 것에 불과하므로 권하지 않는다.

  제공: Dan.
*/
