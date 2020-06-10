import iris from './data.js';
import { drawChart, getDataSetTwoCross } from './utility.js';

const irisTwoCrossWithLabel = getDataSetTwoCross(iris, [1, 2]);
let myCanvas = document.getElementById('my-canvas');
let changeButton = document.querySelector('#change');

let twoCross = [
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 4],
  [3, 4]
];
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

let currentIndex = 1;

drawChart({ ...allProps });

changeButton.addEventListener('click', (e) => {
  context.clearRect(0, 0, myCanvas.width, myCanvas.height);

  ++currentIndex > 6 ? (currentIndex = 1) : currentIndex;

  allProps.irisTwoCross = getDataSetTwoCross(iris, twoCross[currentIndex]);

  drawChart({ ...allProps });
});
