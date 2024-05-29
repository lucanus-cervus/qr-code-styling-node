import dotTypes from "../../../constants/dotTypes";
import {
  DotType,
  GetNeighbor,
  RotateFigureArgsCanvas,
  BasicFigureDrawArgsCanvas,
  DrawArgsCanvas
} from "../../../types";

export default class QRDot {
  _context: CanvasRenderingContext2D;
  _type: DotType;

  constructor({ context, type }: { context: CanvasRenderingContext2D; type: DotType }) {
    this._context = context;
    this._type = type;
  }

  draw(x: number, y: number, size: number, getNeighbor: GetNeighbor): void {
    const context = this._context;
    const type = this._type;
    let drawFunction;

    switch (type) {
      case dotTypes.dots:
        drawFunction = this._drawDot;
        break;
      case dotTypes.classy:
        drawFunction = this._drawClassy;
        break;
      case dotTypes.classyRounded:
        drawFunction = this._drawClassyRounded;
        break;
      case dotTypes.rounded:
        drawFunction = this._drawRounded;
        break;
      case dotTypes.extraRounded:
        drawFunction = this._drawExtraRounded;
        break;
      case dotTypes.rhombus:
        drawFunction = this._drawRhombus;
        break;
      case dotTypes.smallSquare:
        drawFunction = this._drawSmallSquare;
        break;
      case dotTypes.smallDots:
        drawFunction = this._drawSmallDots;
        break;
      case dotTypes.randomDots:
        drawFunction = this._drawRandomDots;
        break;
      case dotTypes.dotsHorizontal:
        drawFunction = this._drawDotsHorizontal;
        break;
      case dotTypes.dotsVertical:
        drawFunction = this._drawDotsVertical;
        break;
      case dotTypes.rhombusVertical:
        drawFunction = this._drawRhombusVertical;
        break;
      case dotTypes.squareStripe:
        drawFunction = this._drawSquareStripe;
        break;
      case dotTypes.roundedStripe:
        drawFunction = this._drawRoundedStripe;
        break;
      case dotTypes.random:
        drawFunction = this._drawRandom;
        break;
      case dotTypes.square:
      default:
        drawFunction = this._drawSquare;
    }

    drawFunction.call(this, { x, y, size, context, getNeighbor });
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

  _basicSmallSquare(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.moveTo(-2.5 * dotSize, -2.5 * dotSize);
        context.lineTo(2.5 * dotSize, -2.5 * dotSize);
        context.lineTo(2.5 * dotSize, 2.5 * dotSize);
        context.lineTo(-2.5 * dotSize, 2.5 * dotSize);
        context.lineTo(-2.5 * dotSize, -2.5 * dotSize);
      }
    });
  }

  //if rotation === 0 - right side is rounded
  _basicSideRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.moveTo(0, 0);
        context.arc(0, 0, size / 2, -Math.PI / 2, Math.PI / 2);
        context.lineTo(-size / 2, size / 2);
        context.lineTo(-size / 2, -size / 2);
        context.lineTo(0, -size / 2);
      }
    });
  }

  //if rotation === 0 - right side is rhombus
  _basicSideRhombus(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.moveTo(-size / 2, -size / 2);
        context.lineTo(-size / 2, size / 2);
        context.lineTo(0, size / 2);
        context.lineTo(size / 2, 0);
        context.lineTo(0, -size / 2);
        context.lineTo(-size / 2, -size / 2);
      }
    });
  }

  //if rotation === 0 - right side is cut
  _basicSmallSideSquare(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.moveTo(-size / 2, -2.5 * dotSize);
        context.lineTo(-size / 2, 2.5 * dotSize);
        context.lineTo(2.5 * dotSize, 2.5 * dotSize);
        context.lineTo(2.5 * dotSize, -2.5 * dotSize);
        context.lineTo(-size / 2, -2.5 * dotSize);
      }
    });
  }

  _basicSmallRectangle(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.moveTo(-size / 2, -2.5 * dotSize);
        context.lineTo(-size / 2, 2.5 * dotSize);
        context.lineTo(size / 2, 2.5 * dotSize);
        context.lineTo(size / 2, -2.5 * dotSize);
        context.lineTo(-size / 2, -2.5 * dotSize);
      }
    });
  }

  //if rotation === 0 - right side is cut
  _basicSmallSideDot(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.moveTo(0, 0);
        context.arc(0, 0, size / 3, -Math.PI / 2, Math.PI / 2);
        context.lineTo(-size / 2, 2.5 * dotSize);
        context.lineTo(-size / 2, -2.5 * dotSize);
        context.lineTo(0, -2.5 * dotSize);
      }
    });
  }

  //if rotation === 0 - top right corner is rounded
  _basicCornerRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(0, 0, size / 2, -Math.PI / 2, 0);
        context.lineTo(size / 2, size / 2);
        context.lineTo(-size / 2, size / 2);
        context.lineTo(-size / 2, -size / 2);
        context.lineTo(0, -size / 2);
      }
    });
  }

  //if rotation === 0 - top right corner is rounded
  _basicCornerExtraRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(-size / 2, size / 2, size, -Math.PI / 2, 0);
        context.lineTo(-size / 2, size / 2);
        context.lineTo(-size / 2, -size / 2);
      }
    });
  }

  _basicCornersRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(0, 0, size / 2, -Math.PI / 2, 0);
        context.lineTo(size / 2, size / 2);
        context.lineTo(0, size / 2);
        context.arc(0, 0, size / 2, Math.PI / 2, Math.PI);
        context.lineTo(-size / 2, -size / 2);
        context.lineTo(0, -size / 2);
      }
    });
  }

  _basicCornersExtraRounded(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(-size / 2, size / 2, size, -Math.PI / 2, 0);
        context.arc(size / 2, -size / 2, size, Math.PI / 2, Math.PI);
      }
    });
  }

  _basicSmallDots(args: BasicFigureDrawArgsCanvas): void {
    const { size, context } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        context.arc(0, 0, size / 3, 0, Math.PI * 2);
      }
    });
  }

  _drawDot({ x, y, size, context }: DrawArgsCanvas): void {
    this._basicDot({ x, y, size, context, rotation: 0 });
  }

  _drawSquare({ x, y, size, context }: DrawArgsCanvas): void {
    this._basicSquare({ x, y, size, context, rotation: 0 });
  }

  _drawRounded({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicDot({ x, y, size, context, rotation: 0 });
      return;
    }

    if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
      this._basicSquare({ x, y, size, context, rotation: 0 });
      return;
    }

    if (neighborsCount === 2) {
      let rotation = 0;

      if (leftNeighbor && topNeighbor) {
        rotation = Math.PI / 2;
      } else if (topNeighbor && rightNeighbor) {
        rotation = Math.PI;
      } else if (rightNeighbor && bottomNeighbor) {
        rotation = -Math.PI / 2;
      }

      this._basicCornerRounded({ x, y, size, context, rotation });
      return;
    }

    if (neighborsCount === 1) {
      let rotation = 0;

      if (topNeighbor) {
        rotation = Math.PI / 2;
      } else if (rightNeighbor) {
        rotation = Math.PI;
      } else if (bottomNeighbor) {
        rotation = -Math.PI / 2;
      }

      this._basicSideRounded({ x, y, size, context, rotation });
      return;
    }
  }

  _drawExtraRounded({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicDot({ x, y, size, context, rotation: 0 });
      return;
    }

    if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
      this._basicSquare({ x, y, size, context, rotation: 0 });
      return;
    }

    if (neighborsCount === 2) {
      let rotation = 0;

      if (leftNeighbor && topNeighbor) {
        rotation = Math.PI / 2;
      } else if (topNeighbor && rightNeighbor) {
        rotation = Math.PI;
      } else if (rightNeighbor && bottomNeighbor) {
        rotation = -Math.PI / 2;
      }

      this._basicCornerExtraRounded({ x, y, size, context, rotation });
      return;
    }

    if (neighborsCount === 1) {
      let rotation = 0;

      if (topNeighbor) {
        rotation = Math.PI / 2;
      } else if (rightNeighbor) {
        rotation = Math.PI;
      } else if (bottomNeighbor) {
        rotation = -Math.PI / 2;
      }

      this._basicSideRounded({ x, y, size, context, rotation });
      return;
    }
  }

  _drawClassy({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicCornersRounded({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    }

    if (!leftNeighbor && !topNeighbor) {
      this._basicCornerRounded({ x, y, size, context, rotation: -Math.PI / 2 });
      return;
    }

    if (!rightNeighbor && !bottomNeighbor) {
      this._basicCornerRounded({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, context, rotation: 0 });
  }

  _drawClassyRounded({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicCornersRounded({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    }

    if (!leftNeighbor && !topNeighbor) {
      this._basicCornerExtraRounded({ x, y, size, context, rotation: -Math.PI / 2 });
      return;
    }

    if (!rightNeighbor && !bottomNeighbor) {
      this._basicCornerExtraRounded({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, context, rotation: 0 });
  }

  _drawRhombus({ x, y, size, context }: DrawArgsCanvas): void {
    this._basicSmallSquare({ x, y, size, context, rotation: Math.PI / 4 });
  }

  _drawSmallSquare({ x, y, size, context }: DrawArgsCanvas): void {
    this._basicSmallSquare({ x, y, size, context, rotation: 0 });
  }

  _drawSmallDots({ x, y, size, context }: DrawArgsCanvas): void {
    this._basicSmallDots({ x, y, size, context, rotation: 0 });
  }

  _drawRandomDots({ x, y, size, context }: DrawArgsCanvas): void {
    Math.random() < 0.25
      ? this._basicDot({ x, y, size, context, rotation: 0 })
      : this._basicSmallDots({ x, y, size, context, rotation: 0 });
  }

  _drawDotsHorizontal({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0 || (!leftNeighbor && !rightNeighbor)) {
      this._basicDot({ x, y, size, context, rotation: 0 });
      return;
    }

    if (leftNeighbor && !rightNeighbor) {
      this._basicSideRounded({ x, y, size, context, rotation: 0 });
      return;
    } else if (!leftNeighbor && rightNeighbor) {
      this._basicSideRounded({ x, y, size, context, rotation: Math.PI });
      return;
    }

    this._basicSquare({ x, y, size, context, rotation: 0 });
  }

  _drawDotsVertical({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0 || (!topNeighbor && !bottomNeighbor)) {
      this._basicDot({ x, y, size, context, rotation: 0 });
      return;
    }

    if (topNeighbor && !bottomNeighbor) {
      this._basicSideRounded({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    } else if (!topNeighbor && bottomNeighbor) {
      this._basicSideRounded({ x, y, size, context, rotation: -Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, context, rotation: 0 });
  }

  _drawRhombusVertical({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0 || (!topNeighbor && !bottomNeighbor)) {
      this._basicSmallSquare({ x, y, size, context, rotation: Math.PI / 4 });
      return;
    }

    if (topNeighbor && !bottomNeighbor) {
      this._basicSideRhombus({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    } else if (!topNeighbor && bottomNeighbor) {
      this._basicSideRhombus({ x, y, size, context, rotation: -Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, context, rotation: 0 });
  }

  _drawSquareStripe({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0 || (!topNeighbor && !bottomNeighbor)) {
      this._basicSmallSquare({ x, y, size, context, rotation: 0 });
      return;
    }

    if (topNeighbor && !bottomNeighbor) {
      this._basicSmallSideSquare({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    } else if (!topNeighbor && bottomNeighbor) {
      this._basicSmallSideSquare({ x, y, size, context, rotation: -Math.PI / 2 });
      return;
    }

    this._basicSmallRectangle({ x, y, size, context, rotation: Math.PI / 2 });
  }

  _drawRoundedStripe({ x, y, size, context, getNeighbor }: DrawArgsCanvas): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0 || (!topNeighbor && !bottomNeighbor)) {
      this._basicSmallDots({ x, y, size, context, rotation: 0 });
      return;
    }

    if (topNeighbor && !bottomNeighbor) {
      this._basicSmallSideDot({ x, y, size, context, rotation: Math.PI / 2 });
      return;
    } else if (!topNeighbor && bottomNeighbor) {
      this._basicSmallSideDot({ x, y, size, context, rotation: -Math.PI / 2 });
      return;
    }

    this._basicSmallRectangle({ x, y, size, context, rotation: Math.PI / 2 });
  }

  _drawRandom({ x, y, context, size }: DrawArgsCanvas): void {
    const randomValue = Math.random();
    const angle = [0, 90, 180, 270][Math.floor(Math.random() * 4)] * (Math.PI / 180);

    if (randomValue < 0.25) {
      this._basicDot({ x, y, size, context, rotation: 0 });
      return;
    } else if (randomValue < 0.5) {
      this._basicSideRounded({ x, y, size, context, rotation: angle });
      return;
    } else if (randomValue < 0.75) {
      this._basicCornerRounded({ x, y, size, context, rotation: angle });
      return;
    }

    this._basicSquare({ x, y, size, context, rotation: 0 });
  }
}
