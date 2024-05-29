import cornerSquareTypes from "../../../constants/cornerSquareTypes";
import { CornerSquareType, RotateFigureArgsCanvas, BasicFigureDrawArgsCanvas, DrawArgsCanvas } from "../../../types";

export default class QRCornerSquare {
  _context: CanvasRenderingContext2D;
  _type: CornerSquareType;

  constructor({ context, type }: { context: CanvasRenderingContext2D; type: CornerSquareType }) {
    this._context = context;
    this._type = type;
  }

  draw(x: number, y: number, size: number, rotation: number): void {
    const context = this._context;
    const type = this._type;
    let drawFunction;

    switch (type) {
      case cornerSquareTypes.square:
        drawFunction = this._drawSquare;
        break;
      case cornerSquareTypes.extraRounded:
        drawFunction = this._drawExtraRounded;
        break;
      case cornerSquareTypes.oneClassy:
        drawFunction = this._drawOneClassy;
        break;
      case cornerSquareTypes.classy:
        drawFunction = this._drawClassy;
        break;
      case cornerSquareTypes.oneClassyRotate:
        drawFunction = this._drawOneClassyRotate;
        break;
      case cornerSquareTypes.dotOneClassy:
        drawFunction = this._drawDotOneClassy;
        break;
      case cornerSquareTypes.middleRounded:
        drawFunction = this._drawMiddleRounded;
        break;
      case cornerSquareTypes.gear:
        drawFunction = this._drawGear;
        break;
      case cornerSquareTypes.dot:
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
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(0, 0, size / 2, 0, Math.PI * 2);
        context.arc(0, 0, size / 2 - dotSize, 0, Math.PI * 2);
      }
    });
  }

  _basicSquare(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.rect(-size / 2, -size / 2, size, size);
        context.rect(-size / 2 + dotSize, -size / 2 + dotSize, size - 2 * dotSize, size - 2 * dotSize);
      }
    });
  }

  _basicExtraRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(-dotSize, -dotSize, 2.5 * dotSize, Math.PI, -Math.PI / 2);
        context.lineTo(dotSize, -3.5 * dotSize);
        context.arc(dotSize, -dotSize, 2.5 * dotSize, -Math.PI / 2, 0);
        context.lineTo(3.5 * dotSize, -dotSize);
        context.arc(dotSize, dotSize, 2.5 * dotSize, 0, Math.PI / 2);
        context.lineTo(-dotSize, 3.5 * dotSize);
        context.arc(-dotSize, dotSize, 2.5 * dotSize, Math.PI / 2, Math.PI);
        context.lineTo(-3.5 * dotSize, -dotSize);

        context.arc(-dotSize, -dotSize, 1.5 * dotSize, Math.PI, -Math.PI / 2);
        context.lineTo(dotSize, -2.5 * dotSize);
        context.arc(dotSize, -dotSize, 1.5 * dotSize, -Math.PI / 2, 0);
        context.lineTo(2.5 * dotSize, -dotSize);
        context.arc(dotSize, dotSize, 1.5 * dotSize, 0, Math.PI / 2);
        context.lineTo(-dotSize, 2.5 * dotSize);
        context.arc(-dotSize, dotSize, 1.5 * dotSize, Math.PI / 2, Math.PI);
        context.lineTo(-2.5 * dotSize, -dotSize);
      }
    });
  }

  _basicOneClassy(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;
    const halfSize = size / 2;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        context.arc(-dotSize, -dotSize, 2.5 * dotSize, Math.PI, -Math.PI / 2);
        context.lineTo(dotSize, -3.5 * dotSize);
        context.arc(dotSize, -dotSize, 2.5 * dotSize, -Math.PI / 2, 0);
        context.lineTo(halfSize, halfSize);
        context.lineTo(halfSize - 4.5 * dotSize, halfSize);
        context.arc(-dotSize, dotSize, 2.5 * dotSize, Math.PI / 2, Math.PI);
        context.lineTo(-3.5 * dotSize, -dotSize);

        context.arc(-dotSize, -dotSize, 1.5 * dotSize, Math.PI, -Math.PI / 2);
        context.lineTo(dotSize, -2.5 * dotSize);
        context.arc(dotSize, -dotSize, 1.5 * dotSize, -Math.PI / 2, 0);
        context.lineTo(2.5 * dotSize, 2.5 * dotSize);
        context.lineTo(-1.5 * dotSize, 2.5 * dotSize);
        context.arc(-dotSize, dotSize, 1.5 * dotSize, Math.PI / 2, Math.PI);
        context.lineTo(-2.5 * dotSize, -dotSize);
      }
    });
  }

  _basicClassy(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;
    const halfSize = size / 2;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.moveTo(-halfSize, -halfSize);
        context.lineTo(halfSize - 4.5 * dotSize, -halfSize);
        context.arc(dotSize, -dotSize, 2.5 * dotSize, -Math.PI / 2, 0);
        context.lineTo(halfSize, halfSize);
        context.lineTo(halfSize - 4.5 * dotSize, halfSize);
        context.arc(-dotSize, dotSize, 2.5 * dotSize, Math.PI / 2, Math.PI);
        context.lineTo(-halfSize, -halfSize);

        context.moveTo(-halfSize + dotSize, -halfSize + dotSize);
        context.lineTo(1.5 * dotSize, -2.5 * dotSize);
        context.arc(dotSize, -dotSize, 1.5 * dotSize, -Math.PI / 2, 0);
        context.lineTo(2.5 * dotSize, 2.5 * dotSize);
        context.arc(-dotSize, dotSize, 1.5 * dotSize, Math.PI / 2, Math.PI);
        context.lineTo(-2.5 * dotSize, -2.5 * dotSize);
      }
    });
  }

  _basicDotOneClassy(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        context.arc(3 * dotSize, 3 * dotSize, dotSize / 2, 0, Math.PI / 2);
        context.lineTo(0, 3.5 * dotSize);
        context.arc(0, 0, 3.5 * dotSize, Math.PI / 2, 2 * Math.PI);
        context.lineTo(3.5 * dotSize, 3 * dotSize);
        context.moveTo(2.5 * dotSize, 2.5 * dotSize);
        context.lineTo(0, 2.5 * dotSize);
        context.arc(0, 0, 2.5 * dotSize, Math.PI / 2, 2 * Math.PI);
        context.lineTo(2.5 * dotSize, 2.5 * dotSize);
      }
    });
  }

  _basicMiddleRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(-2.5 * dotSize, -2.5 * dotSize, dotSize, Math.PI, -Math.PI / 2);
        context.lineTo(2.5 * dotSize, -3.5 * dotSize);
        context.arc(2.5 * dotSize, -2.5 * dotSize, dotSize, -Math.PI / 2, 0);
        context.lineTo(3.5 * dotSize, 2.5 * dotSize);
        context.arc(2.5 * dotSize, 2.5 * dotSize, dotSize, 0, Math.PI / 2);
        context.lineTo(-2.5 * dotSize, 3.5 * dotSize);
        context.arc(-2.5 * dotSize, 2.5 * dotSize, dotSize, Math.PI / 2, Math.PI);
        context.lineTo(-3.5 * dotSize, -2.5 * dotSize);

        context.arc(-2 * dotSize, -2 * dotSize, dotSize / 2, Math.PI, -Math.PI / 2);
        context.lineTo(2 * dotSize, -2.5 * dotSize);
        context.arc(2 * dotSize, -2 * dotSize, dotSize / 2, -Math.PI / 2, 0);
        context.lineTo(2.5 * dotSize, 2 * dotSize);
        context.arc(2 * dotSize, 2 * dotSize, dotSize / 2, 0, Math.PI / 2);
        context.lineTo(-2 * dotSize, 2.5 * dotSize);
        context.arc(-2 * dotSize, 2 * dotSize, dotSize / 2, Math.PI / 2, Math.PI);
        context.lineTo(-2.5 * dotSize, -2 * dotSize);
      }
    });
  }

  _basicGear(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const scale = size / 32.5;
    const yOffset = -scale / 3;
    const offset = -(size - size / 2);
    this._rotateFigure({
      ...args,
      draw: () => {
        context.beginPath();
        context.moveTo(offset + 14.0179 * scale, offset + 1.10681 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 15.1806 * scale,
          offset + 0.195027 * scale + yOffset * scale,
          offset + 16.8157 * scale,
          offset + 0.195028 * scale + yOffset * scale,
          offset + 17.9784 * scale,
          offset + 1.10681 * scale + yOffset * scale
        );
        context.lineTo(offset + 19.3272 * scale, offset + 2.1645 * scale + yOffset * scale);
        context.lineTo(offset + 21.0013 * scale, offset + 1.79677 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 22.4445 * scale,
          offset + 1.47976 * scale + yOffset * scale,
          offset + 23.9176 * scale,
          offset + 2.18917 * scale + yOffset * scale,
          offset + 24.5695 * scale,
          offset + 3.51514 * scale + yOffset * scale
        );
        context.lineTo(offset + 25.3258 * scale, offset + 5.0533 * scale + yOffset * scale);
        context.lineTo(offset + 26.9937 * scale, offset + 5.44836 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 28.4315 * scale,
          offset + 5.78892 * scale + yOffset * scale,
          offset + 29.4509 * scale,
          offset + 7.06724 * scale + yOffset * scale,
          offset + 29.463 * scale,
          offset + 8.54477 * scale + yOffset * scale
        );
        context.lineTo(offset + 29.477 * scale, offset + 10.2587 * scale + yOffset * scale);
        context.lineTo(offset + 30.8083 * scale, offset + 11.3383 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 31.956 * scale,
          offset + 12.269 * scale + yOffset * scale,
          offset + 32.3198 * scale,
          offset + 13.863 * scale + yOffset * scale,
          offset + 31.6896 * scale,
          offset + 15.1995 * scale + yOffset * scale
        );
        context.lineTo(offset + 30.9586 * scale, offset + 16.7498 * scale + yOffset * scale);
        context.lineTo(offset + 31.6896 * scale, offset + 18.3001 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 32.3198 * scale,
          offset + 19.6366 * scale + yOffset * scale,
          offset + 31.956 * scale,
          offset + 21.2306 * scale + yOffset * scale,
          offset + 30.8083 * scale,
          offset + 22.1613 * scale + yOffset * scale
        );
        context.lineTo(offset + 29.477 * scale, offset + 23.2409 * scale + yOffset * scale);
        context.lineTo(offset + 29.463 * scale, offset + 24.9549 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 29.4509 * scale,
          offset + 26.4324 * scale + yOffset * scale,
          offset + 28.4315 * scale,
          offset + 27.7107 * scale + yOffset * scale,
          offset + 26.9937 * scale,
          offset + 28.0513 * scale + yOffset * scale
        );
        context.lineTo(offset + 25.3258 * scale, offset + 28.4463 * scale + yOffset * scale);
        context.lineTo(offset + 24.5695 * scale, offset + 29.9845 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 23.9176 * scale,
          offset + 31.3105 * scale + yOffset * scale,
          offset + 22.4445 * scale,
          offset + 32.0199 * scale + yOffset * scale,
          offset + 21.0013 * scale,
          offset + 31.7029 * scale + yOffset * scale
        );
        context.lineTo(offset + 19.3272 * scale, offset + 31.3351 * scale + yOffset * scale);
        context.lineTo(offset + 17.9784 * scale, offset + 32.3928 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 16.8157 * scale,
          offset + 33.3046 * scale + yOffset * scale,
          offset + 15.1806 * scale,
          offset + 33.3046 * scale + yOffset * scale,
          offset + 14.0179 * scale,
          offset + 32.3928 * scale + yOffset * scale
        );
        context.lineTo(offset + 12.6691 * scale, offset + 31.3351 * scale + yOffset * scale);
        context.lineTo(offset + 10.995 * scale, offset + 31.7029 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 9.55185 * scale,
          offset + 32.0199 * scale + yOffset * scale,
          offset + 8.07875 * scale,
          offset + 31.3105 * scale + yOffset * scale,
          offset + 7.42678 * scale,
          offset + 29.9845 * scale + yOffset * scale
        );
        context.lineTo(offset + 6.67049 * scale, offset + 28.4463 * scale + yOffset * scale);
        context.lineTo(offset + 5.00261 * scale, offset + 28.0513 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 3.5648 * scale,
          offset + 27.7107 * scale + yOffset * scale,
          offset + 2.54539 * scale,
          offset + 26.4324 * scale + yOffset * scale,
          offset + 2.53331 * scale,
          offset + 24.9549 * scale + yOffset * scale
        );
        context.lineTo(offset + 2.51929 * scale, offset + 23.2409 * scale + yOffset * scale);
        context.lineTo(offset + 1.18799 * scale, offset + 22.1613 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 0.0403373 * scale,
          offset + 21.2306 * scale + yOffset * scale,
          offset - 0.323487 * scale,
          offset + 19.6366 * scale + yOffset * scale,
          offset + 0.306707 * scale,
          offset + 18.3001 * scale + yOffset * scale
        );
        context.lineTo(offset + 1.03775 * scale, offset + 16.7498 * scale + yOffset * scale);
        context.lineTo(offset + 0.306707 * scale, offset + 15.1995 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset - 0.323488 * scale,
          offset + 13.863 * scale + yOffset * scale,
          offset + 0.0403399 * scale,
          offset + 12.269 * scale + yOffset * scale,
          offset + 1.18799 * scale,
          offset + 11.3383 * scale + yOffset * scale
        );
        context.lineTo(offset + 2.51929 * scale, offset + 10.2587 * scale + yOffset * scale);
        context.lineTo(offset + 2.53331 * scale, offset + 8.54477 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 2.54539 * scale,
          offset + 7.06723 * scale + yOffset * scale,
          offset + 3.56481 * scale,
          offset + 5.78892 * scale + yOffset * scale,
          offset + 5.00261 * scale,
          offset + 5.44836 * scale + yOffset * scale
        );
        context.lineTo(offset + 6.67049 * scale, offset + 5.0533 * scale + yOffset * scale);
        context.lineTo(offset + 7.42678 * scale, offset + 3.51514 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 8.07875 * scale,
          offset + 2.18917 * scale + yOffset * scale,
          offset + 9.55185 * scale,
          offset + 1.47976 * scale + yOffset * scale,
          offset + 10.995 * scale,
          offset + 1.79677 * scale + yOffset * scale
        );
        context.lineTo(offset + 12.6691 * scale, offset + 2.1645 * scale + yOffset * scale);
        context.lineTo(offset + 14.0179 * scale, offset + 1.10681 * scale + yOffset * scale);

        context.moveTo(offset + 15.9982 * scale, offset + 4.74101 * scale + yOffset * scale);
        context.lineTo(offset + 14.8641 * scale, offset + 5.63034 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 14.1101 * scale,
          offset + 6.22162 * scale + yOffset * scale,
          offset + 13.1313 * scale,
          offset + 6.44503 * scale + yOffset * scale,
          offset + 12.1954 * scale,
          offset + 6.23945 * scale + yOffset * scale
        );
        context.lineTo(offset + 10.7877 * scale, offset + 5.93025 * scale + yOffset * scale);
        context.lineTo(offset + 10.1518 * scale, offset + 7.22357 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 9.72902 * scale,
          offset + 8.08346 * scale + yOffset * scale,
          offset + 8.94409 * scale,
          offset + 8.70942 * scale + yOffset * scale,
          offset + 8.01168 * scale,
          offset + 8.93027 * scale + yOffset * scale
        );
        context.lineTo(offset + 6.60929 * scale, offset + 9.26245 * scale + yOffset * scale);
        context.lineTo(offset + 6.5975 * scale, offset + 10.7036 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 6.58967 * scale,
          offset + 11.6618 * scale + yOffset * scale,
          offset + 6.15407 * scale,
          offset + 12.5663 * scale + yOffset * scale,
          offset + 5.40982 * scale,
          offset + 13.1698 * scale + yOffset * scale
        );
        context.lineTo(offset + 4.29043 * scale, offset + 14.0776 * scale + yOffset * scale);
        context.lineTo(offset + 4.9051 * scale, offset + 15.3812 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 5.31378 * scale,
          offset + 16.2478 * scale + yOffset * scale,
          offset + 5.31378 * scale,
          offset + 17.2518 * scale + yOffset * scale,
          offset + 4.9051 * scale,
          offset + 18.1185 * scale + yOffset * scale
        );
        context.lineTo(offset + 4.29043 * scale, offset + 19.422 * scale + yOffset * scale);
        context.lineTo(offset + 5.40982 * scale, offset + 20.3298 * scale + yOffset * scale);
        context.lineTo(offset + 4.12436 * scale, offset + 21.9149 * scale + yOffset * scale);
        context.lineTo(offset + 5.40982 * scale, offset + 20.3298 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 6.15407 * scale,
          offset + 20.9333 * scale + yOffset * scale,
          offset + 6.58967 * scale,
          offset + 21.8379 * scale + yOffset * scale,
          offset + 6.5975 * scale,
          offset + 22.796 * scale + yOffset * scale
        );
        context.lineTo(offset + 6.60929 * scale, offset + 24.2372 * scale + yOffset * scale);
        context.lineTo(offset + 8.01168 * scale, offset + 24.5694 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 8.94409 * scale,
          offset + 24.7902 * scale + yOffset * scale,
          offset + 9.72902 * scale,
          offset + 25.4162 * scale + yOffset * scale,
          offset + 10.1518 * scale,
          offset + 26.2761 * scale + yOffset * scale
        );
        context.lineTo(offset + 10.7877 * scale, offset + 27.5694 * scale + yOffset * scale);
        context.lineTo(offset + 12.1954 * scale, offset + 27.2602 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 13.1313 * scale,
          offset + 27.0546 * scale + yOffset * scale,
          offset + 14.1101 * scale,
          offset + 27.278 * scale + yOffset * scale,
          offset + 14.8641 * scale,
          offset + 27.8693 * scale + yOffset * scale
        );
        context.lineTo(offset + 15.9982 * scale, offset + 28.7586 * scale + yOffset * scale);
        context.lineTo(offset + 17.1322 * scale, offset + 27.8693 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 17.8862 * scale,
          offset + 27.278 * scale + yOffset * scale,
          offset + 18.865 * scale,
          offset + 27.0546 * scale + yOffset * scale,
          offset + 19.8009 * scale,
          offset + 27.2602 * scale + yOffset * scale
        );
        context.lineTo(offset + 21.2086 * scale, offset + 27.5694 * scale + yOffset * scale);
        context.lineTo(offset + 21.8445 * scale, offset + 26.2761 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 22.2673 * scale,
          offset + 25.4162 * scale + yOffset * scale,
          offset + 23.0522 * scale,
          offset + 24.7902 * scale + yOffset * scale,
          offset + 23.9846 * scale,
          offset + 24.5694 * scale + yOffset * scale
        );
        context.lineTo(offset + 25.387 * scale, offset + 24.2372 * scale + yOffset * scale);
        context.lineTo(offset + 25.3988 * scale, offset + 22.796 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 25.4066 * scale,
          offset + 21.8379 * scale + yOffset * scale,
          offset + 25.8422 * scale,
          offset + 20.9333 * scale + yOffset * scale,
          offset + 26.5865 * scale,
          offset + 20.3298 * scale + yOffset * scale
        );
        context.lineTo(offset + 27.7059 * scale, offset + 19.422 * scale + yOffset * scale);
        context.lineTo(offset + 27.0912 * scale, offset + 18.1185 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 26.6825 * scale,
          offset + 17.2518 * scale + yOffset * scale,
          offset + 26.6825 * scale,
          offset + 16.2478 * scale + yOffset * scale,
          offset + 27.0912 * scale,
          offset + 15.3812 * scale + yOffset * scale
        );
        context.lineTo(offset + 27.7059 * scale, offset + 14.0776 * scale + yOffset * scale);
        context.lineTo(offset + 26.5865 * scale, offset + 13.1699 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 25.8422 * scale,
          offset + 12.5663 * scale + yOffset * scale,
          offset + 25.4066 * scale,
          offset + 11.6618 * scale + yOffset * scale,
          offset + 25.3988 * scale,
          offset + 10.7036 * scale + yOffset * scale
        );
        context.lineTo(offset + 25.387 * scale, offset + 9.26245 * scale + yOffset * scale);
        context.lineTo(offset + 23.9846 * scale, offset + 8.93027 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 23.0522 * scale,
          offset + 8.70942 * scale + yOffset * scale,
          offset + 22.2673 * scale,
          offset + 8.08346 * scale + yOffset * scale,
          offset + 21.8445 * scale,
          offset + 7.22358 * scale + yOffset * scale
        );
        context.lineTo(offset + 21.2086 * scale, offset + 5.93025 * scale + yOffset * scale);
        context.lineTo(offset + 19.8009 * scale, offset + 6.23945 * scale + yOffset * scale);
        context.bezierCurveTo(
          offset + 18.865 * scale,
          offset + 6.44503 * scale + yOffset * scale,
          offset + 17.8863 * scale,
          offset + 6.22163 * scale + yOffset * scale,
          offset + 17.1322 * scale,
          offset + 5.63034 * scale + yOffset * scale
        );
        context.lineTo(offset + 15.9982 * scale, offset + 4.74101 * scale + yOffset * scale);
        context.closePath();
      }
    });
  }

  _drawDot({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicDot({ x, y, size, context, rotation });
  }

  _drawSquare({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicSquare({ x, y, size, context, rotation });
  }

  _drawExtraRounded({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicExtraRounded({ x, y, size, context, rotation });
  }

  _drawOneClassy({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicOneClassy({ x, y, size, context, rotation });
  }

  _drawOneClassyRotate({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    const rotate = rotation ? rotation - Math.PI : -Math.PI;
    this._basicOneClassy({ x, y, size, context, rotation: rotate });
  }

  _drawClassy({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicClassy({ x, y, size, context, rotation });
  }

  _drawDotOneClassy({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicDotOneClassy({ x, y, size, context, rotation });
  }

  _drawMiddleRounded({ x, y, size, context, rotation }: DrawArgsCanvas): void {
    this._basicMiddleRounded({ x, y, size, context, rotation });
  }

  _drawGear({ x, y, size, context }: DrawArgsCanvas): void {
    const rotate = 0;
    this._basicGear({ x, y, size, context, rotation: rotate });
  }
}
