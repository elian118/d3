import { Colors } from '@/consts/Colors';
// @ts-ignore
import myData2020q3 from '../csv/myData2020q3.csv';
// @ts-ignore
import myData2020q4 from '../csv/myData2020q4.csv';
// @ts-ignore
import myData2021q1 from '../csv/myData2021q1.csv';
// @ts-ignore
import myData2021q2 from '../csv/myData2021q2.csv';
// @ts-ignore
import myData2021q3 from '../csv/myData2021q3.csv';
// @ts-ignore
import myData2021q4 from '../csv/myData2021q4.csv';
// @ts-ignore
import myData2022q1 from '../csv/myData2022q1.csv';
// @ts-ignore
import myData2022q2 from '../csv/myData2022q2.csv';

export const svgWidth = 320;
export const svgHeight = 240;
export const initDataSet = [50, 30, 12, 5, 3];
export const initDataSet2 = [50, 10, 8, 12, 16, 12, 18, 6, 9, 10, 6, 15, 20];
export const cstColors = [
  Colors.Red500,
  Colors.Orange500,
  Colors.Amber500,
  Colors.Yellow500,
  Colors.Lime500,
  Colors.Green500,
  Colors.Emerald500,
  Colors.Teal500,
  Colors.Cyan500,
  Colors.Sky500,
  Colors.Blue500,
  Colors.Indigo500,
  Colors.Violet500,
  Colors.Purple500,
  Colors.Fuchsia500,
  Colors.Pink500,
  Colors.Rose500,
];

export const options = [
  { name: '2020년 3분기', fileName: myData2020q3 },
  { name: '2020년 4분기', fileName: myData2020q4 },
  { name: '2021년 1분기', fileName: myData2021q1 },
  { name: '2021년 2분기', fileName: myData2021q2 },
  { name: '2021년 3분기', fileName: myData2021q3 },
  { name: '2021년 4분기', fileName: myData2021q4 },
  { name: '2022년 1분기', fileName: myData2022q1 },
  { name: '2022년 2분기', fileName: myData2022q2 },
];
