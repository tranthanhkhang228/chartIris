let setPointColor;
let drawLine;
let drawPoint;
let context;

let assignContextForDrawLine = (context) => (
  beginPoint = [0, 0],
  endPoint = [0, 0],
  strokeColor = 'black'
) => {
  console.log('draw line');
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
  yMaxiMum = 0,
  classColors = [],
  markPointFontSize = 0
) => {
  context.beginPath();
  context.rect(x * 100 + markPointFontSize, yMaxiMum - y * 100 - 10, 10, 10);

  setPointColor(classColors[label - 1]);
};

let assignContext = (contextR) => {
  context = contextR;
  drawLine = assignContextForDrawLine(contextR);
  setPointColor = assignContextForSetPointColor(contextR);
  drawPoint = assignContextForDrawPoint(contextR);
};

export let drawCoordinateAxes = (
  yMaximum,
  strokeColor,
  markPointColor,
  markPointFontSize,
  markPointFontFamily
) => {
  drawLine(
    [markPointFontSize, yMaximum],
    [yMaximum + markPointFontSize, yMaximum],
    strokeColor
  ); // axis x
  drawLine([markPointFontSize, 0], [markPointFontSize, yMaximum], strokeColor); // axis y

  // draw mark points
  for (let i = 0; i <= yMaximum; i++) {
    if (i % 100 == 0) {
      context.font = `${markPointFontSize}pt ${markPointFontFamily}`;
      context.fillStyle = markPointColor;

      context.fillText(
        i / 100,
        i + markPointFontSize,
        yMaximum + markPointFontSize
      ); // axis x
      context.fillText(i / 100, 0, yMaximum - i); // axis y
    }
  }
};

export let displayData = (data, yMaximum, classColors, markPointFontSize) => {
  data.forEach((instanceFeatures) => {
    drawPoint(...instanceFeatures, yMaximum, classColors, markPointFontSize);
  });
};

export let drawChart = (allProps = {}) => {
  let {
    irisTwoCross: data,
    context: context,
    Y_MAXIMUM: yMaximum,
    CLASSCOLORS: classColors,
    STROKECOLOR: strokeColor,
    MARKPOINT_COLOR: markPointColor,
    MARKPOINT_FONT_SIZE: markPointFontSize,
    MARKPOINT_FONT_FAMILY: markPointFontFamily
  } = allProps;

  assignContext(context);

  drawCoordinateAxes(
    yMaximum,
    strokeColor,
    markPointColor,
    markPointFontSize,
    markPointFontFamily
  );
  displayData(data, yMaximum, classColors, markPointFontSize);
};

export let getDataSetTwoCross = (dataset = [], retainedFeatures = [1, 2]) =>
  dataset.map((instance) => {
    const retainedIndex = [
      retainedFeatures[0] - 1,
      retainedFeatures[1] - 1,
      instance.length - 1 // label index
    ];

    return instance.filter((feature, index) =>
      retainedIndex.includes(index) ? feature : null
    );
  });
