import './App.css';
import { Ruler } from '@/pages/2-7.Ruler';
import { Sample } from '@/pages/2-1.Sample';
import { BarGraph } from '@/pages/2-2.BarGraph';
import { UdtData } from '@/pages/2-3.UdtData';
import { Animation } from '@/pages/2-4.Animation';
import { useEffect, useState } from 'react';
import { BottomBtn } from '@/pages/BottomBtn';

const App = () => {
  const list = [<Sample />, <BarGraph />, <UdtData />, <Animation />, <Ruler />];

  const [disIdx, setDisIdx] = useState<number>(0);

  useEffect(() => {
    setDisIdx(4);
  }, []);

  return (
    <div className="App">
      {list[disIdx]}
      <BottomBtn list={list} disIdsState={[disIdx, setDisIdx]} />
    </div>
  )
}

export default App
