let setPointColor;
let drawLine;
let drawPoint;

let assignContextForDrawLine = (context) => (
  beginPoint = [0, 0],
  endPoint = [0, 0],
  strokeColor = 'black'
) => {
  context.beginPath();

  context.moveTo(beginPoint[0], beginPoint[1]);
  context.lineTo(endPoint[0], endPoint[1]);
  context.strokeStyle = strokeColor;
  context.stroke();
};
let assignContextForSetPointColor = (context) => (color = 'white') => {
  context.fillStyle = color;
  context.fill();
};
let assignContextForDrawPoint = (context) => (
  x = 0,
  y = 0,
  label = 1,
  markPointFontSize = 0,
  yMaxiMum = 0,
  classColors = []
) => {
  context.beginPath();
  context.rect(x * 100 + markPointFontSize, yMaxiMum - y * 100 - 10, 10, 10);

  setPointColor(classColors[label - 1]);
};
let assignContext = (context) => {
  drawLine = assignContextForDrawLine(context);
  setPointColor = assignContextForSetPointColor(context);
  drawPoint = assignContextForDrawPoint(context);
};

export let drawCoordinateAxes = (allProps = {}) => {
  let {
    context,
    Y_MAXIMUM: yMaxiMum,
    STROKECOLOR: strokeColor,
    MARKPOINT_COLOR: markPointColor,
    MARKPOINT_FONT_SIZE: markPointFontSize,
    MARKPOINT_FONT_FAMILY: markPointFontFamily
  } = allProps;

  assignContext(context);

  drawLine(
    [markPointFontSize, yMaxiMum, strokeColor],
    [yMaxiMum + markPointFontSize, yMaxiMum, strokeColor]
  ); // axis x
  drawLine([markPointFontSize, 0], [markPointFontSize, yMaxiMum]); // axis y

  for (let i = 0; i <= yMaxiMum; i++) {
    if (i % 100 == 0) {
      context.font = `${markPointFontSize}pt ${markPointFontFamily}`;
      context.fillStyle = markPointColor;

      context.fillText(
        i / 100,
        i + markPointFontSize,
        yMaxiMum + markPointFontSize
      ); // axis x
      context.fillText(i / 100, 0, yMaxiMum - i); // axis y
    }
  }
};

export let drawChart = (allProps = {}) => {
  let {
    context,
    irisTwoCross: data,
    MARKPOINT_FONT_SIZE: markPointFontSize,
    Y_MAXIMUM: yMaxiMum,
    CLASSCOLORS: classColors
  } = allProps;

  drawPoint = assignContextForDrawPoint(context);

  data.forEach((val) => {
    drawPoint(...val, markPointFontSize, yMaxiMum, classColors);
  });
};

export let getDataSetTwoCross = (dataset = [], preservedValue = [0, 1]) =>
  dataset.map((attrVal) => {
    const PRESERVEDVALUE = [
      preservedValue[0],
      preservedValue[1],
      attrVal.length - 1
    ];

    return attrVal.filter((val, index) =>
      PRESERVEDVALUE.includes(index) ? val : null
    );
  });
