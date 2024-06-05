import cornerDotTypes from "../../../constants/cornerDotTypes";
import { CornerDotType, RotateFigureArgs, BasicFigureDrawArgs, DrawArgs, Window } from "../../../types";

export default class QRCornerDot {
  _element?: SVGElement;
  _svg: SVGElement;
  _type: CornerDotType;
  _window: Window;

  constructor({ svg, type, window }: { svg: SVGElement; type: CornerDotType; window: Window }) {
    this._svg = svg;
    this._type = type;
    this._window = window;
  }

  draw(x: number, y: number, size: number, rotation: number): void {
    const type = this._type;
    let drawFunction;

    switch (type) {
      case cornerDotTypes.square:
        drawFunction = this._drawSquare;
        break;
      case cornerDotTypes.extraRounded:
        drawFunction = this._drawRounded;
        break;
      case cornerDotTypes.classy:
        drawFunction = this._drawClassy;
        break;
      case cornerDotTypes.oneClassy:
        drawFunction = this._drawOneClassy;
        break;
      case cornerDotTypes.oneClassyRotate:
        drawFunction = this._drawOneClassyRotate;
        break;
      case cornerDotTypes.classyReflect:
        drawFunction = this._drawClassyReflect;
        break;
      case cornerDotTypes.rhombus:
        drawFunction = this._drawRhombus;
        break;
      case cornerDotTypes.rhombusExtraRounded:
        drawFunction = this._drawRhombusExtraRounded;
        break;
      case cornerDotTypes.star:
        drawFunction = this._drawStar;
        break;
      case cornerDotTypes.gear:
        drawFunction = this._drawGear;
        break;
      case cornerDotTypes.dot:
      default:
        drawFunction = this._drawDot;
    }

    drawFunction.call(this, { x, y, size, rotation });
  }

  _rotateFigure({ x, y, size, rotation = 0, draw }: RotateFigureArgs): void {
    const cx = x + size / 2;
    const cy = y + size / 2;

    draw();
    this._element?.setAttribute("transform", `rotate(${(180 * rotation) / Math.PI},${cx},${cy})`);
  }

  _basicDot(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this._element.setAttribute("cx", String(x + size / 2));
        this._element.setAttribute("cy", String(y + size / 2));
        this._element.setAttribute("r", String(size / 2));
      }
    });
  }

  _basicSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this._element.setAttribute("x", String(x));
        this._element.setAttribute("y", String(y));
        this._element.setAttribute("width", String(size));
        this._element.setAttribute("height", String(size));
      }
    });
  }

  _basicRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this._element.setAttribute("x", String(x));
        this._element.setAttribute("y", String(y));
        this._element.setAttribute("width", String(size));
        this._element.setAttribute("height", String(size));
        this._element.setAttribute("rx", String(size / 4));
        this._element.setAttribute("ry", String(size / 4));
      }
    });
  }

  _basicOneClassy(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;
    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x} ${y + 2.5 * dotSize}` +
            `v ${2 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${dotSize * 2.5} ${dotSize * 2.5}` +
            `h ${4.5 * dotSize}` +
            `v ${-4.5 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${-dotSize * 2.5}` +
            `h ${-2 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${dotSize * 2.5}`
        );
      }
    });
  }

  _basicClassy(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;
    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x} ${y + 2.5 * dotSize}` +
            `v ${2 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${dotSize * 2.5} ${dotSize * 2.5}` +
            `h ${4.5 * dotSize}` +
            `v ${-4.5 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${-dotSize * 2.5}` +
            `h ${-2 * dotSize}` +
            `H ${x}` +
            `z`
        );
      }
    });
  }

  _basicClassyReflect(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;
    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x} ${y + 2.5 * dotSize}` +
            `v ${4.5 * dotSize}` +
            `h ${4.5 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${dotSize * 2.5} ${-dotSize * 2.5}` +
            `v ${-4.5 * dotSize}` +
            `h ${-4.5 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${dotSize * 2.5}` +
            `z`
        );
      }
    });
  }

  _basicStar(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const scale = size / 13;
    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x + 6 * scale},${y + 0.67 * scale}` +
            `c${0.29 * scale},${-0.44 * scale},${0.96 * scale},${-0.44 * scale},${1.25 * scale},0` +
            `l${1.75 * scale},${2.63 * scale}` +
            `c${0.1 * scale},${0.15 * scale},${0.26 * scale},${0.26 * scale},${0.44 * scale},${0.31 * scale}` +
            `l${3.13 * scale},${0.79 * scale}` +
            `c${0.52 * scale},${0.13 * scale},${0.73 * scale},${0.74 * scale},${0.39 * scale},${1.15 * scale}` +
            `l${-2.05 * scale},${2.42 * scale}` +
            `c${-0.12 * scale},${0.14 * scale},${-0.18 * scale},${0.32 * scale},${-0.17 * scale},${0.49 * scale}` +
            `l${0.19 * scale},${3.12 * scale}` +
            `c${0.03 * scale},${0.52 * scale},${-0.51 * scale},${0.9 * scale},${-1.01 * scale},${0.71 * scale}` +
            `l${-3.02 * scale},${-1.13 * scale}` +
            `c${-0.17 * scale},${-0.07 * scale},${-0.37 * scale},${-0.07 * scale},${-0.54 * scale},0` +
            `l${-3.02 * scale},${1.13 * scale}` +
            `c${-0.5 * scale},${0.19 * scale},${-1.04 * scale},${-0.19 * scale},${-1.01 * scale},${-0.71 * scale}` +
            `l${0.19 * scale},${-3.12 * scale}` +
            `c${0.01 * scale},${-0.18 * scale},${-0.05 * scale},${-0.36 * scale},${-0.17 * scale},${-0.49 * scale}` +
            `l${-2.05 * scale},${-2.42 * scale}` +
            `c${-0.34 * scale},${-0.4 * scale},${-0.14 * scale},${-1.01 * scale},${0.39 * scale},${-1.15 * scale}` +
            `l${3.13 * scale},${-0.79 * scale}` +
            `c${0.18 * scale},${-0.05 * scale},${0.34 * scale},${-0.15 * scale},${0.44 * scale},${-0.31 * scale}` +
            `l${1.75 * scale},${-2.63 * scale}` +
            `z`
        );
      }
    });
  }

  _basicGear(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const scale = size / 13;
    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M${x + 5.73498 * scale} ${y + 0.478283 * scale}` +
            `C${x + 5.96208 * scale} ${y + 0.293535 * scale}, ${x + 6.28767 * scale} ${y + 0.293535 * scale}, ${
              x + 6.51478 * scale
            } ${y + 0.478283 * scale}` +
            `L${x + 7.26947 * scale} ${y + 1.09221 * scale}` +
            `C${x + 7.40605 * scale} ${y + 1.20332 * scale}, ${x + 7.58355 * scale} ${y + 1.25088 * scale}, ${
              x + 7.75739 * scale
            } ${y + 1.22295 * scale}` +
            `L${x + 8.71793 * scale} ${y + 1.06862 * scale}` +
            `C${x + 9.00699 * scale} ${y + 1.02217 * scale}, ${x + 9.28896 * scale} ${y + 1.18497 * scale}, ${
              x + 9.39326 * scale
            } ${y + 1.45852 * scale}` +
            `L${x + 9.73988 * scale} ${y + 2.36754 * scale}` +
            `C${x + 9.80261 * scale} ${y + 2.53205 * scale}, ${x + 9.93255 * scale} ${y + 2.66199 * scale}, ${
              x + 10.0971 * scale
            } ${y + 2.72472 * scale}` +
            `L${x + 11.0061 * scale} ${y + 3.07134 * scale}` +
            `C${x + 11.2796 * scale} ${y + 3.17564 * scale}, ${x + 11.4424 * scale} ${y + 3.45761 * scale}, ${
              x + 11.396 * scale
            } ${y + 3.74667 * scale}` +
            `L${x + 11.2417 * scale} ${y + 4.70721 * scale}` +
            `C${x + 11.2137 * scale} ${y + 4.88105 * scale}, ${x + 11.2613 * scale} ${y + 5.05855 * scale}, ${
              x + 11.3724 * scale
            } ${y + 5.19513 * scale}` +
            `L${x + 11.9863 * scale} ${y + 5.94982 * scale}` +
            `C${x + 12.1711 * scale} ${y + 6.17693 * scale}, ${x + 12.1711 * scale} ${y + 6.50252 * scale}, ${
              x + 11.9863 * scale
            } ${y + 6.72962 * scale}` +
            `L${x + 11.3724 * scale} ${y + 7.48431 * scale}` +
            `C${x + 11.2613 * scale} ${y + 7.6209 * scale}, ${x + 11.2137 * scale} ${y + 7.79839 * scale}, ${
              x + 11.2417 * scale
            } ${y + 7.97223 * scale}` +
            `L${x + 11.396 * scale} ${y + 8.93278 * scale}` +
            `C${x + 11.4424 * scale} ${y + 9.22183 * scale}, ${x + 11.2796 * scale} ${y + 9.5038 * scale}, ${
              x + 11.0061 * scale
            } ${y + 9.60811 * scale}` +
            `L${x + 10.0971 * scale} ${y + 9.95472 * scale}` +
            `C${x + 9.93255 * scale} ${y + 10.0175 * scale}, ${x + 9.80261 * scale} ${y + 10.1474 * scale}, ${
              x + 9.73988 * scale
            } ${y + 10.3119 * scale}` +
            `L${x + 9.39326 * scale} ${y + 11.2209 * scale}` +
            `C${x + 9.28896 * scale} ${y + 11.4945 * scale}, ${x + 9.00699 * scale} ${y + 11.6573 * scale}, ${
              x + 8.71793 * scale
            } ${y + 11.6108 * scale}` +
            `L${x + 7.75739 * scale} ${y + 11.4565 * scale}` +
            `C${x + 7.58355 * scale} ${y + 11.4286 * scale}, ${x + 7.40605 * scale} ${y + 11.4761 * scale}, ${
              x + 7.26947 * scale
            } ${y + 11.5872 * scale}` +
            `L${x + 6.51478 * scale} ${y + 12.2012 * scale}` +
            `C${x + 6.28767 * scale} ${y + 12.3859 * scale}, ${x + 5.96208 * scale} ${y + 12.3859 * scale}, ${
              x + 5.73498 * scale
            } ${y + 12.2012 * scale}` +
            `L${x + 4.98029 * scale} ${y + 11.5872 * scale}` +
            `C${x + 4.8437 * scale} ${y + 11.4761 * scale}, ${x + 4.66621 * scale} ${y + 11.4286 * scale}, ${
              x + 4.49237 * scale
            } ${y + 11.4565 * scale}` +
            `L${x + 3.53182 * scale} ${y + 11.6108 * scale}` +
            `C${x + 3.24277 * scale} ${y + 11.6573 * scale}, ${x + 2.9608 * scale} ${y + 11.4945 * scale}, ${
              x + 2.85649 * scale
            } ${y + 11.2209 * scale}` +
            `L${x + 2.50988 * scale} ${y + 10.3119 * scale}` +
            `C${x + 2.44715 * scale} ${y + 10.1474 * scale}, ${x + 2.31721 * scale} ${y + 10.0175 * scale}, ${
              x + 2.1527 * scale
            } ${y + 9.95472 * scale}` +
            `L${x + 1.24367 * scale} ${y + 9.60811 * scale}` +
            `C${x + 0.970124 * scale} ${y + 9.5038 * scale}, ${x + 0.807329 * scale} ${y + 9.22183 * scale}, ${
              x + 0.853772 * scale
            } ${y + 8.93278 * scale}` +
            `L${x + 1.0081 * scale} ${y + 7.97223 * scale}` +
            `C${x + 1.03603 * scale} ${y + 7.79839 * scale}, ${x + 0.988474 * scale} ${y + 7.6209 * scale}, ${
              x + 0.877366 * scale
            } ${y + 7.48431 * scale}` +
            `L${x + 0.263439 * scale} ${y + 6.72962 * scale}` +
            `C${x + 0.0786909 * scale} ${y + 6.50252 * scale}, ${x + 0.0786909 * scale} ${y + 6.17693 * scale}, ${
              x + 0.263439 * scale
            } ${y + 5.94982 * scale}` +
            `L${x + 0.877366 * scale} ${y + 5.19513 * scale}` +
            `C${x + 0.988474 * scale} ${y + 5.05855 * scale}, ${x + 1.03603 * scale} ${y + 4.88105 * scale}, ${
              x + 1.0081 * scale
            } ${y + 4.70721 * scale}` +
            `L${x + 0.853772 * scale} ${y + 3.74667 * scale}` +
            `C${x + 0.807329 * scale} ${y + 3.45761 * scale}, ${x + 0.970124 * scale} ${y + 3.17564 * scale}, ${
              x + 1.24367 * scale
            } ${y + 3.07134 * scale}` +
            `L${x + 2.1527 * scale} ${y + 2.72472 * scale}` +
            `C${x + 2.31721 * scale} ${y + 2.66199 * scale}, ${x + 2.44715 * scale} ${y + 2.53205 * scale}, ${
              x + 2.50988 * scale
            } ${y + 2.36754 * scale}` +
            `L${x + 2.85649 * scale} ${y + 1.45852 * scale}` +
            `C${x + 2.9608 * scale} ${y + 1.18497 * scale}, ${x + 3.24277 * scale} ${y + 1.02217 * scale}, ${
              x + 3.53182 * scale
            } ${y + 1.06862 * scale}` +
            `L${x + 4.49237 * scale} ${y + 1.22295 * scale}` +
            `C${x + 4.66621 * scale} ${y + 1.25088 * scale}, ${x + 4.8437 * scale} ${y + 1.20332 * scale}, ${
              x + 4.98029 * scale
            } ${y + 1.09221 * scale}` +
            `L${x + 5.73498 * scale} ${y + 0.478283 * scale}` +
            `Z`
        );
      }
    });
  }

  _basicSmallSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x + dotSize} ${y + dotSize}` + `v ${5 * dotSize}` + `h ${5 * dotSize}` + `v ${-5 * dotSize}` + `z`
        );
      }
    });
  }

  _basicSmallRoundedSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;
    const radius = dotSize; // Radius of the rounded corners

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x + dotSize + radius} ${y + dotSize}` +
            `h ${5 * dotSize - 2 * radius}` +
            `c ${radius} 0 ${radius} ${radius} ${radius} ${radius}` +
            `v ${5 * dotSize - 2 * radius}` +
            `c 0 ${radius} -${radius} ${radius} -${radius} ${radius}` +
            `h -${5 * dotSize - 2 * radius}` +
            `c -${radius} 0 -${radius} -${radius} -${radius} -${radius}` +
            `v -${5 * dotSize - 2 * radius}` +
            `c 0 -${radius} ${radius} -${radius} ${radius} -${radius}` +
            `z`
        );
      }
    });
  }

  _drawDot({ x, y, size, rotation }: DrawArgs): void {
    this._basicDot({ x, y, size, rotation });
  }

  _drawSquare({ x, y, size, rotation }: DrawArgs): void {
    this._basicSquare({ x, y, size, rotation });
  }

  _drawRounded({ x, y, size, rotation }: DrawArgs): void {
    this._basicRounded({ x, y, size, rotation });
  }

  _drawOneClassy({ x, y, size, rotation }: DrawArgs): void {
    this._basicOneClassy({ x, y, size, rotation });
  }

  _drawOneClassyRotate({ x, y, size, rotation }: DrawArgs): void {
    const rotate = rotation ? rotation - Math.PI : -Math.PI;
    this._basicOneClassy({ x, y, size, rotation: rotate });
  }

  _drawClassy({ x, y, size, rotation }: DrawArgs): void {
    this._basicClassy({ x, y, size, rotation });
  }

  _drawClassyReflect({ x, y, size, rotation }: DrawArgs): void {
    this._basicClassyReflect({ x, y, size, rotation });
  }

  _drawRhombus({ x, y, size, rotation }: DrawArgs): void {
    const rotate = rotation ? rotation + Math.PI / 4 : Math.PI / 4;
    this._basicSmallSquare({ x, y, size, rotation: rotate });
  }

  _drawRhombusExtraRounded({ x, y, size, rotation }: DrawArgs): void {
    const rotate = rotation ? rotation + Math.PI / 4 : Math.PI / 4;
    this._basicSmallRoundedSquare({ x, y, size, rotation: rotate });
  }

  _drawStar({ x, y, size }: DrawArgs): void {
    const rotate = 0;
    this._basicStar({ x, y, size, rotation: rotate });
  }

  _drawGear({ x, y, size }: DrawArgs): void {
    const rotate = 0;
    this._basicGear({ x, y, size, rotation: rotate });
  }
}
