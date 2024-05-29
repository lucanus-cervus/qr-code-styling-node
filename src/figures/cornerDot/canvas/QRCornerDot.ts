import cornerDotTypes from "../../../constants/cornerDotTypes";
import { CornerDotType, RotateFigureArgsCanvas, BasicFigureDrawArgsCanvas, DrawArgsCanvas } from "../../../types";

export default class QRCornerDot {
  _context: CanvasRenderingContext2D;
  _type: CornerDotType;

  constructor({ context, type }: { context: CanvasRenderingContext2D; type: CornerDotType }) {
    this._context = context;
    this._type = type;
  }

  draw(x: number, y: number, size: number, rotation: number): void {
    const context = this._context;
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

    drawFunction.call(this, { x, y, size, context, rotation });
  }

  _rotateFigure({ x, y, size, context, rotation = 0, draw }: RotateFigureArgsCanvas): void {
    const cx = x + size / 2;
    const cy = y + size / 2;

    context.translate(cx, cy);
    rotation && context.rotate(rotation);
    draw();
    context.closePath();
    rotation && context.rotate(-rotation);
    context.translate(-cx, -cy);
  }

  _basicDot(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(0, 0, size / 2, 0, Math.PI * 2);
      }
    });
  }

  _basicSquare(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.rect(-size / 2, -size / 2, size, size);
      }
    });
  }

  _basicRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const cornerRadius = size / 4;
    const halfSize = size / 2;
    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        // Top left corner
        context.arc(-halfSize + cornerRadius, -halfSize + cornerRadius, cornerRadius, Math.PI, Math.PI * 1.5);
        // Top right corner
        context.arc(halfSize - cornerRadius, -halfSize + cornerRadius, cornerRadius, Math.PI * 1.5, Math.PI * 2);
        // Bottom right corner
        context.arc(halfSize - cornerRadius, halfSize - cornerRadius, cornerRadius, 0, Math.PI * 0.5);
        // Bottom left corner
        context.arc(-halfSize + cornerRadius, halfSize - cornerRadius, cornerRadius, Math.PI * 0.5, Math.PI);
        context.closePath();
        context.stroke();
      }
    });
  }

  _basicClassy(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;
    const cornerRadius = size / 4;
    const halfSize = size / 2;
    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        context.arc(halfSize - cornerRadius, -halfSize + cornerRadius, cornerRadius, Math.PI * 1.5, Math.PI * 2);
        context.lineTo(halfSize, halfSize);
        context.lineTo(halfSize - 4.5 * dotSize, halfSize);
        context.arc(-halfSize + cornerRadius, halfSize - cornerRadius, cornerRadius, Math.PI * 0.5, Math.PI);
        context.lineTo(-halfSize, -halfSize);
        context.closePath();
        context.stroke();
      }
    });
  }

  _basicOneClassy(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;
    const cornerRadius = size / 4;
    const halfSize = size / 2;
    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        context.arc(-halfSize + cornerRadius, -halfSize + cornerRadius, cornerRadius, Math.PI, Math.PI * 1.5);
        context.arc(halfSize - cornerRadius, -halfSize + cornerRadius, cornerRadius, Math.PI * 1.5, Math.PI * 2);
        context.lineTo(halfSize, halfSize);
        context.lineTo(halfSize - 4.5 * dotSize, halfSize);
        context.arc(-halfSize + cornerRadius, halfSize - cornerRadius, cornerRadius, Math.PI * 0.5, Math.PI);
        context.closePath();
        context.stroke();
      }
    });
  }

  _basicClassyReflect(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;
    const cornerRadius = size / 4;
    const halfSize = size / 2;
    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        context.arc(-halfSize + cornerRadius, -halfSize + cornerRadius, cornerRadius, Math.PI, Math.PI * 1.5);
        context.lineTo(halfSize, -halfSize);
        context.lineTo(halfSize, halfSize - 4.5 * dotSize);
        context.arc(halfSize - cornerRadius, halfSize - cornerRadius, cornerRadius, 0, Math.PI * 0.5);
        context.lineTo(-halfSize, halfSize);
        context.closePath();
        context.stroke();
      }
    });
  }

  _basicStar(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const scale = size / 13;

    const offset = -(size - size / 2);
    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        context.moveTo(offset + 6 * scale, offset + 0.67 * scale);
        context.bezierCurveTo(
          offset + 6.29 * scale,
          offset + 0.23 * scale,
          offset + 7.16 * scale,
          offset + 0.23 * scale,
          offset + 7.41 * scale,
          offset + 0.67 * scale
        );
        context.lineTo(offset + 9.16 * scale, offset + 3.3 * scale);
        context.bezierCurveTo(
          offset + 9.26 * scale,
          offset + 3.45 * scale,
          offset + 9.42 * scale,
          offset + 3.56 * scale,
          offset + 9.6 * scale,
          offset + 3.61 * scale
        );
        context.lineTo(offset + 12.73 * scale, offset + 4.4 * scale);
        context.bezierCurveTo(
          offset + 13.25 * scale,
          offset + 4.53 * scale,
          offset + 13.46 * scale,
          offset + 5.24 * scale,
          offset + 13.1 * scale,
          offset + 5.65 * scale
        );
        context.lineTo(offset + 11.05 * scale, offset + 8.07 * scale);
        context.bezierCurveTo(
          offset + 10.93 * scale,
          offset + 8.21 * scale,
          offset + 10.87 * scale,
          offset + 8.39 * scale,
          offset + 10.88 * scale,
          offset + 8.56 * scale
        );
        context.lineTo(offset + 11.07 * scale, offset + 11.68 * scale);
        context.bezierCurveTo(
          offset + 11.08 * scale,
          offset + 12.2 * scale,
          offset + 10.52 * scale,
          offset + 12.58 * scale,
          offset + 10.02 * scale,
          offset + 12.39 * scale
        );
        context.lineTo(offset + 6.99 * scale, offset + 11.26 * scale);
        context.bezierCurveTo(
          offset + 6.82 * scale,
          offset + 11.19 * scale,
          offset + 6.62 * scale,
          offset + 11.19 * scale,
          offset + 6.45 * scale,
          offset + 11.26 * scale
        );
        context.lineTo(offset + 3.42 * scale, offset + 12.39 * scale);
        context.bezierCurveTo(
          offset + 2.92 * scale,
          offset + 12.58 * scale,
          offset + 2.36 * scale,
          offset + 12.2 * scale,
          offset + 2.37 * scale,
          offset + 11.68 * scale
        );
        context.lineTo(offset + 2.56 * scale, offset + 8.56 * scale);
        context.bezierCurveTo(
          offset + 2.57 * scale,
          offset + 8.39 * scale,
          offset + 2.51 * scale,
          offset + 8.21 * scale,
          offset + 2.39 * scale,
          offset + 8.07 * scale
        );
        context.lineTo(offset + 0.34 * scale, offset + 5.65 * scale);
        context.bezierCurveTo(
          offset - 0.02 * scale,
          offset + 5.24 * scale,
          offset + 0.19 * scale,
          offset + 4.53 * scale,
          offset + 0.71 * scale,
          offset + 4.4 * scale
        );
        context.lineTo(offset + 3.84 * scale, offset + 3.61 * scale);
        context.bezierCurveTo(
          offset + 4.02 * scale,
          offset + 3.56 * scale,
          offset + 4.18 * scale,
          offset + 3.45 * scale,
          offset + 4.28 * scale,
          offset + 3.3 * scale
        );
        context.lineTo(offset + 6.03 * scale, offset + 0.67 * scale);
        context.bezierCurveTo(
          offset + 6.28 * scale,
          offset + 0.23 * scale,
          offset + 7.16 * scale,
          offset + 0.23 * scale,
          offset + 7.41 * scale,
          offset + 0.67 * scale
        );
        context.closePath();
        context.stroke();
      }
    });
  }

  _basicGear(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const scale = size / 13;

    const offset = -(size - size / 2);
    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        context.moveTo(offset + 5.73498 * scale, offset + 0.478283 * scale);
        context.bezierCurveTo(
          offset + 5.96208 * scale,
          offset + 0.293535 * scale,
          offset + 6.28767 * scale,
          offset + 0.293535 * scale,
          offset + 6.51478 * scale,
          offset + 0.478283 * scale
        );
        context.lineTo(offset + 7.26947 * scale, offset + 1.09221 * scale);
        context.bezierCurveTo(
          offset + 7.40605 * scale,
          offset + 1.20332 * scale,
          offset + 7.58355 * scale,
          offset + 1.25088 * scale,
          offset + 7.75739 * scale,
          offset + 1.22295 * scale
        );
        context.lineTo(offset + 8.71793 * scale, offset + 1.06862 * scale);
        context.bezierCurveTo(
          offset + 9.00699 * scale,
          offset + 1.02217 * scale,
          offset + 9.28896 * scale,
          offset + 1.18497 * scale,
          offset + 9.39326 * scale,
          offset + 1.45852 * scale
        );
        context.lineTo(offset + 9.73988 * scale, offset + 2.36754 * scale);
        context.bezierCurveTo(
          offset + 9.80261 * scale,
          offset + 2.53205 * scale,
          offset + 9.93255 * scale,
          offset + 2.66199 * scale,
          offset + 10.0971 * scale,
          offset + 2.72472 * scale
        );
        context.lineTo(offset + 11.0061 * scale, offset + 3.07134 * scale);
        context.bezierCurveTo(
          offset + 11.2796 * scale,
          offset + 3.17564 * scale,
          offset + 11.4424 * scale,
          offset + 3.45761 * scale,
          offset + 11.396 * scale,
          offset + 3.74667 * scale
        );
        context.lineTo(offset + 11.2417 * scale, offset + 4.70721 * scale);
        context.bezierCurveTo(
          offset + 11.2137 * scale,
          offset + 4.88105 * scale,
          offset + 11.2613 * scale,
          offset + 5.05855 * scale,
          offset + 11.3724 * scale,
          offset + 5.19513 * scale
        );
        context.lineTo(offset + 11.9863 * scale, offset + 5.94982 * scale);
        context.bezierCurveTo(
          offset + 12.1711 * scale,
          offset + 6.17693 * scale,
          offset + 12.1711 * scale,
          offset + 6.50252 * scale,
          offset + 11.9863 * scale,
          offset + 6.72962 * scale
        );
        context.lineTo(offset + 11.3724 * scale, offset + 7.48431 * scale);
        context.bezierCurveTo(
          offset + 11.2613 * scale,
          offset + 7.6209 * scale,
          offset + 11.2137 * scale,
          offset + 7.79839 * scale,
          offset + 11.2417 * scale,
          offset + 7.97223 * scale
        );
        context.lineTo(offset + 11.396 * scale, offset + 8.93278 * scale);
        context.bezierCurveTo(
          offset + 11.4424 * scale,
          offset + 9.22183 * scale,
          offset + 11.2796 * scale,
          offset + 9.5038 * scale,
          offset + 11.0061 * scale,
          offset + 9.60811 * scale
        );
        context.lineTo(offset + 10.0971 * scale, offset + 9.95472 * scale);
        context.bezierCurveTo(
          offset + 9.93255 * scale,
          offset + 10.0175 * scale,
          offset + 9.80261 * scale,
          offset + 10.1474 * scale,
          offset + 9.73988 * scale,
          offset + 10.3119 * scale
        );
        context.lineTo(offset + 9.39326 * scale, offset + 11.2209 * scale);
        context.bezierCurveTo(
          offset + 9.28896 * scale,
          offset + 11.4945 * scale,
          offset + 9.00699 * scale,
          offset + 11.6573 * scale,
          offset + 8.71793 * scale,
          offset + 11.6108 * scale
        );
        context.lineTo(offset + 7.75739 * scale, offset + 11.4565 * scale);
        context.bezierCurveTo(
          offset + 7.58355 * scale,
          offset + 11.4286 * scale,
          offset + 7.40605 * scale,
          offset + 11.4761 * scale,
          offset + 7.26947 * scale,
          offset + 11.5872 * scale
        );
        context.lineTo(offset + 6.51478 * scale, offset + 12.2012 * scale);
        context.bezierCurveTo(
          offset + 6.28767 * scale,
          offset + 12.3859 * scale,
          offset + 5.96208 * scale,
          offset + 12.3859 * scale,
          offset + 5.73498 * scale,
          offset + 12.2012 * scale
        );
        context.lineTo(offset + 4.98029 * scale, offset + 11.5872 * scale);
        context.bezierCurveTo(
          offset + 4.8437 * scale,
          offset + 11.4761 * scale,
          offset + 4.66621 * scale,
          offset + 11.4286 * scale,
          offset + 4.49237 * scale,
          offset + 11.4565 * scale
        );
        context.lineTo(offset + 3.53182 * scale, offset + 11.6108 * scale);
        context.bezierCurveTo(
          offset + 3.24277 * scale,
          offset + 11.6573 * scale,
          offset + 2.9608 * scale,
          offset + 11.4945 * scale,
          offset + 2.85649 * scale,
          offset + 11.2209 * scale
        );
        context.lineTo(offset + 2.50988 * scale, offset + 10.3119 * scale);
        context.bezierCurveTo(
          offset + 2.44715 * scale,
          offset + 10.1474 * scale,
          offset + 2.31721 * scale,
          offset + 10.0175 * scale,
          offset + 2.1527 * scale,
          offset + 9.95472 * scale
        );
        context.lineTo(offset + 1.24367 * scale, offset + 9.60811 * scale);
        context.bezierCurveTo(
          offset + 0.970124 * scale,
          offset + 9.5038 * scale,
          offset + 0.807329 * scale,
          offset + 9.22183 * scale,
          offset + 0.853772 * scale,
          offset + 8.93278 * scale
        );
        context.lineTo(offset + 1.0081 * scale, offset + 7.97223 * scale);
        context.bezierCurveTo(
          offset + 1.03603 * scale,
          offset + 7.79839 * scale,
          offset + 0.988474 * scale,
          offset + 7.6209 * scale,
          offset + 0.877366 * scale,
          offset + 7.48431 * scale
        );
        context.lineTo(offset + 0.263439 * scale, offset + 6.72962 * scale);
        context.bezierCurveTo(
          offset + 0.0786909 * scale,
          offset + 6.50252 * scale,
          offset + 0.0786909 * scale,
          offset + 6.17693 * scale,
          offset + 0.263439 * scale,
          offset + 5.94982 * scale
        );
        context.lineTo(offset + 0.877366 * scale, offset + 5.19513 * scale);
        context.bezierCurveTo(
          offset + 0.988474 * scale,
          offset + 5.05855 * scale,
          offset + 1.03603 * scale,
          offset + 4.88105 * scale,
          offset + 1.0081 * scale,
          offset + 4.70721 * scale
        );
        context.lineTo(offset + 0.853772 * scale, offset + 3.74667 * scale);
        context.bezierCurveTo(
          offset + 0.807329 * scale,
          offset + 3.45761 * scale,
          offset + 0.970124 * scale,
          offset + 3.17564 * scale,
          offset + 1.24367 * scale,
          offset + 3.07134 * scale
        );
        context.lineTo(offset + 2.1527 * scale, offset + 2.72472 * scale);
        context.bezierCurveTo(
          offset + 2.31721 * scale,
          offset + 2.66199 * scale,
          offset + 2.44715 * scale,
          offset + 2.53205 * scale,
          offset + 2.50988 * scale,
          offset + 2.36754 * scale
        );
        context.lineTo(offset + 2.85649 * scale, offset + 1.45852 * scale);
        context.bezierCurveTo(
          offset + 2.9608 * scale,
          offset + 1.18497 * scale,
          offset + 3.24277 * scale,
          offset + 1.02217 * scale,
          offset + 3.53182 * scale,
          offset + 1.06862 * scale
        );
        context.lineTo(offset + 4.49237 * scale, offset + 1.22295 * scale);
        context.bezierCurveTo(
          offset + 4.66621 * scale,
          offset + 1.25088 * scale,
          offset + 4.8437 * scale,
          offset + 1.20332 * scale,
          offset + 4.98029 * scale,
          offset + 1.09221 * scale
        );
        context.lineTo(offset + 5.73498 * scale, offset + 0.478283 * scale);
        context.closePath();

        // Set stroke or fill
        context.stroke(); // or
      }
    });
  }

  _drawDot({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicDot({ x, y, size, context, rotation });
  }

  _drawSquare({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicSquare({ x, y, size, context, rotation });
  }

  _drawRounded({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicRounded({ x, y, size, context, rotation });
  }

  _drawClassy({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicClassy({ x, y, size, context, rotation });
  }

  _drawOneClassy({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicOneClassy({ x, y, size, context, rotation });
  }

  _drawOneClassyRotate({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    const rotate = rotation ? rotation - Math.PI : -Math.PI;
    this._basicOneClassy({ x, y, size, context, rotation: rotate });
  }

  _drawClassyReflect({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicClassyReflect({ x, y, size, context, rotation });
  }

  _drawRhombus({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    const rotate = rotation ? rotation + Math.PI / 4 : Math.PI / 4;
    this._basicSquare({ x, y, size, context, rotation: rotate });
  }

  _drawRhombusExtraRounded({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    const rotate = rotation ? rotation + Math.PI / 4 : Math.PI / 4;
    this._basicRounded({ x, y, size, context, rotation: rotate });
  }

  _drawStar({ x, y, size, context }: DrawArgsCanvas): void {
    const rotate = 0;
    this._basicStar({ x, y, size, context, rotation: rotate });
  }

  _drawGear({ x, y, size, context }: DrawArgsCanvas): void {
    const rotate = 0;
    this._basicGear({ x, y, size, context, rotation: rotate });
  }
}
