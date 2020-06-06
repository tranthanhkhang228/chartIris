import iris from './data.js';
import {
  getDataSetTwoCross,
  drawCoordinateAxes,
  drawChart
} from './utility.js';

//  0,1 0,2 0,3 1,2 1,3 2,3
const irisTwoCross = getDataSetTwoCross(iris, [2, 3]);
let myCanvas = document.getElementById('my-canvas');
let context = myCanvas.getContext('2d');

const allProps = {
  irisTwoCross: irisTwoCross,
  context: context,
  Y_MAXIMUM: 1000,
  CLASSCOLORS: ['#f50212', '#02db23', '#1958f7'],
  STROKECOLOR: '#7322f5',
  MARKPOINT_COLOR: '#e0387e',
  MARKPOINT_FONT_SIZE: 20,
  MARKPOINT_FONT_FAMILY: 'Calibri'
};

drawCoordinateAxes({ ...allProps });
drawChart({ ...allProps });
