import dotTypes from "../../../constants/dotTypes";
import { DotType, GetNeighbor, DrawArgs, BasicFigureDrawArgs, RotateFigureArgs, Window } from "../../../types";

export default class QRDot {
  _element?: SVGElement;
  _svg: SVGElement;
  _type: DotType;
  _window: Window;

  constructor({ svg, type, window }: { svg: SVGElement; type: DotType; window: Window }) {
    this._svg = svg;
    this._type = type;
    this._window = window;
  }

  draw(x: number, y: number, size: number, getNeighbor: GetNeighbor): void {
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

    drawFunction.call(this, { x, y, size, getNeighbor });
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

  //if rotation === 0 - right side is rounded
  _basicSideRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` + //go to top left position
            `v ${size}` + //draw line to left bottom corner
            `h ${size / 2}` + //draw line to left bottom corner + half of size right
            `a ${size / 2} ${size / 2}, 0, 0, 0, 0 ${-size}` // draw rounded corner
        );
      }
    });
  }

  //if rotation === 0 - right side is rhombus
  _basicSideRhombus(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` + //go to top left position
            `v ${size}` + //draw line to left bottom corner
            `h ${size / 2}` + //draw line to left bottom corner + half of size right
            `l ${size / 2} ${-size / 2}` + //draw line to center of right side
            `l ${-size / 2} ${-size / 2}` + //draw line to center of top side
            `h ${-size / 2}` + //draw line to left top corner
            `z`
        );
      }
    });
  }

  //if rotation === 0 - right side is cut
  _basicSmallSideSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y + dotSize}` + `v ${5 * dotSize}` + `h ${6 * dotSize}` + `v ${-5 * dotSize}` + `z`
        );
      }
    });
  }

  //if rotation === 0 - right side is cut
  _basicSmallSideDot(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y + dotSize}` +
            `h ${3.5 * dotSize}` +
            `a ${size / 3} ${size / 3}, 0, 0, 1, ${0} ${5 * dotSize}` +
            `h ${-3.5 * dotSize}` +
            `v ${-5 * dotSize}` +
            `z`
        );
      }
    });
  }

  //if rotation === 0 - top right corner is rounded
  _basicCornerRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` + //go to top left position
            `v ${size}` + //draw line to left bottom corner
            `h ${size}` + //draw line to right bottom corner
            `v ${-size / 2}` + //draw line to right bottom corner + half of size top
            `a ${size / 2} ${size / 2}, 0, 0, 0, ${-size / 2} ${-size / 2}` // draw rounded corner
        );
      }
    });
  }

  //if rotation === 0 - top right corner is rounded
  _basicCornerExtraRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` + //go to top left position
            `v ${size}` + //draw line to left bottom corner
            `h ${size}` + //draw line to right bottom corner
            `a ${size} ${size}, 0, 0, 0, ${-size} ${-size}` // draw rounded top right corner
        );
      }
    });
  }

  //if rotation === 0 - left bottom and right top corners are rounded
  _basicCornersRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` + //go to left top position
            `v ${size / 2}` + //draw line to left top corner + half of size bottom
            `a ${size / 2} ${size / 2}, 0, 0, 0, ${size / 2} ${size / 2}` + // draw rounded left bottom corner
            `h ${size / 2}` + //draw line to right bottom corner
            `v ${-size / 2}` + //draw line to right bottom corner + half of size top
            `a ${size / 2} ${size / 2}, 0, 0, 0, ${-size / 2} ${-size / 2}` // draw rounded right top corner
        );
      }
    });
  }

  _drawDot({ x, y, size }: DrawArgs): void {
    this._basicDot({ x, y, size, rotation: 0 });
  }

  _drawSquare({ x, y, size }: DrawArgs): void {
    this._basicSquare({ x, y, size, rotation: 0 });
  }

  _drawRounded({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicDot({ x, y, size, rotation: 0 });
      return;
    }

    if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
      this._basicSquare({ x, y, size, rotation: 0 });
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

      this._basicCornerRounded({ x, y, size, rotation });
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

      this._basicSideRounded({ x, y, size, rotation });
      return;
    }
  }

  _drawExtraRounded({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicDot({ x, y, size, rotation: 0 });
      return;
    }

    if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
      this._basicSquare({ x, y, size, rotation: 0 });
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

      this._basicCornerExtraRounded({ x, y, size, rotation });
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

      this._basicSideRounded({ x, y, size, rotation });
      return;
    }
  }

  _drawClassy({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicCornersRounded({ x, y, size, rotation: Math.PI / 2 });
      return;
    }

    if (!leftNeighbor && !topNeighbor) {
      this._basicCornerRounded({ x, y, size, rotation: -Math.PI / 2 });
      return;
    }

    if (!rightNeighbor && !bottomNeighbor) {
      this._basicCornerRounded({ x, y, size, rotation: Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, rotation: 0 });
  }

  _drawClassyRounded({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicCornersRounded({ x, y, size, rotation: Math.PI / 2 });
      return;
    }

    if (!leftNeighbor && !topNeighbor) {
      this._basicCornerExtraRounded({ x, y, size, rotation: -Math.PI / 2 });
      return;
    }

    if (!rightNeighbor && !bottomNeighbor) {
      this._basicCornerExtraRounded({ x, y, size, rotation: Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, rotation: 0 });
  }

  _basicSmallSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x + dotSize} ${y + dotSize}` + `v ${5 * dotSize}` + `h ${5 * dotSize}` + `v ${-5 * dotSize}` + `z`
        );
      }
    });
  }

  _basicSmallRectangle(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y + dotSize}` + `v ${5 * dotSize}` + `h ${size}` + `v ${-5 * dotSize}` + `z`
        );
      }
    });
  }

  _basicSmallDots(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this._element.setAttribute("cx", String(x + size / 2));
        this._element.setAttribute("cy", String(y + size / 2));
        this._element.setAttribute("r", String(size / 3));
      }
    });
  }

  _drawRhombus({ x, y, size }: DrawArgs): void {
    this._basicSmallSquare({ x, y, size, rotation: Math.PI / 4 });
  }

  _drawSmallSquare({ x, y, size }: DrawArgs): void {
    this._basicSmallSquare({ x, y, size, rotation: 0 });
  }

  _drawSmallDots({ x, y, size }: DrawArgs): void {
    this._basicSmallDots({ x, y, size, rotation: 0 });
  }

  _drawRandomDots({ x, y, size }: DrawArgs): void {
    Math.random() < 0.25
      ? this._basicDot({ x, y, size, rotation: 0 })
      : this._basicSmallDots({ x, y, size, rotation: 0 });
  }

  _drawDotsHorizontal({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0 || (!leftNeighbor && !rightNeighbor)) {
      this._basicDot({ x, y, size, rotation: 0 });
      return;
    }

    if (leftNeighbor && !rightNeighbor) {
      this._basicSideRounded({ x, y, size, rotation: 0 });
      return;
    } else if (!leftNeighbor && rightNeighbor) {
      this._basicSideRounded({ x, y, size, rotation: Math.PI });
      return;
    }

    this._basicSquare({ x, y, size, rotation: 0 });
  }

  _drawDotsVertical({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0 || (!topNeighbor && !bottomNeighbor)) {
      this._basicDot({ x, y, size, rotation: 0 });
      return;
    }

    if (topNeighbor && !bottomNeighbor) {
      this._basicSideRounded({ x, y, size, rotation: Math.PI / 2 });
      return;
    } else if (!topNeighbor && bottomNeighbor) {
      this._basicSideRounded({ x, y, size, rotation: -Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, rotation: 0 });
  }

  _drawRhombusVertical({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0 || (!topNeighbor && !bottomNeighbor)) {
      this._basicSmallSquare({ x, y, size, rotation: Math.PI / 4 });
      return;
    }

    if (topNeighbor && !bottomNeighbor) {
      this._basicSideRhombus({ x, y, size, rotation: Math.PI / 2 });
      return;
    } else if (!topNeighbor && bottomNeighbor) {
      this._basicSideRhombus({ x, y, size, rotation: -Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, rotation: 0 });
  }

  _drawSquareStripe({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0 || (!topNeighbor && !bottomNeighbor)) {
      this._basicSmallSquare({ x, y, size, rotation: 0 });
      return;
    }

    if (topNeighbor && !bottomNeighbor) {
      this._basicSmallSideSquare({ x, y, size, rotation: Math.PI / 2 });
      return;
    } else if (!topNeighbor && bottomNeighbor) {
      this._basicSmallSideSquare({ x, y, size, rotation: -Math.PI / 2 });
      return;
    }

    this._basicSmallRectangle({ x, y, size, rotation: Math.PI / 2 });
  }

  _drawRoundedStripe({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0 || (!topNeighbor && !bottomNeighbor)) {
      this._basicSmallDots({ x, y, size, rotation: 0 });
      return;
    }

    if (topNeighbor && !bottomNeighbor) {
      this._basicSmallSideDot({ x, y, size, rotation: Math.PI / 2 });
      return;
    } else if (!topNeighbor && bottomNeighbor) {
      this._basicSmallSideDot({ x, y, size, rotation: -Math.PI / 2 });
      return;
    }

    this._basicSmallRectangle({ x, y, size, rotation: Math.PI / 2 });
  }

  _drawRandom({ x, y, size }: DrawArgs): void {
    const randomValue = Math.random();
    const angle = [0, 90, 180, 270][Math.floor(Math.random() * 4)] * (Math.PI / 180);

    if (randomValue < 0.25) {
      this._basicDot({ x, y, size, rotation: 0 });
      return;
    } else if (randomValue < 0.5) {
      this._basicSideRounded({ x, y, size, rotation: angle });
      return;
    } else if (randomValue < 0.75) {
      this._basicCornerRounded({ x, y, size, rotation: angle });
      return;
    }

    this._basicSquare({ x, y, size, rotation: 0 });
  }
}
