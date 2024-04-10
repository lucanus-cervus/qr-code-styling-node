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
}
