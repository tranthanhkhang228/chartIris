import iris from './data.js';
import { drawChart, getDataSetTwoCross } from './utility.js';

const irisTwoCrossWithLabel = getDataSetTwoCross(iris, [3, 4]);
let myCanvas = document.getElementById('my-canvas');
let context = myCanvas.getContext('2d');

const allProps = {
  irisTwoCross: irisTwoCrossWithLabel,
  context: context,
  Y_MAXIMUM: 1000,
  CLASSCOLORS: ['#f50212', '#02db23', '#1958f7'],
  STROKECOLOR: '#7322f5',
  MARKPOINT_COLOR: '#e0387e',
  MARKPOINT_FONT_SIZE: 20,
  MARKPOINT_FONT_FAMILY: 'Calibri'
};

drawChart({ ...allProps });
