import cornerSquareTypes from "../../../constants/cornerSquareTypes";
import { CornerSquareType, DrawArgs, BasicFigureDrawArgs, RotateFigureArgs, Window } from "../../../types";

export default class QRCornerSquare {
  _element?: SVGElement;
  _svg: SVGElement;
  _type: CornerSquareType;
  _window: Window;

  constructor({ svg, type, window }: { svg: SVGElement; type: CornerSquareType; window: Window }) {
    this._svg = svg;
    this._type = type;
    this._window = window;
  }

  draw(x: number, y: number, size: number, rotation: number): void {
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
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x + size / 2} ${y}` + // M cx, y //  Move to top of ring
            `a ${size / 2} ${size / 2} 0 1 0 0.1 0` + // a outerRadius, outerRadius, 0, 1, 0, 1, 0 // Draw outer arc, but don't close it
            `z` + // Z // Close the outer shape
            `m 0 ${dotSize}` + // m -1 outerRadius-innerRadius // Move to top point of inner radius
            `a ${size / 2 - dotSize} ${size / 2 - dotSize} 0 1 1 -0.1 0` + // a innerRadius, innerRadius, 0, 1, 1, -1, 0 // Draw inner arc, but don't close it
            `Z` // Z // Close the inner ring. Actually will still work without, but inner ring will have one unit missing in stroke
        );
      }
    });
  }

  _basicDotOneClassy(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x} ${y + size / 2}` +
            `a ${3.5 * dotSize} ${3.5 * dotSize}, 0, 0, 0, ${dotSize * 3.5} ${dotSize * 3.5}` +
            `h ${3 * dotSize}` +
            `a ${0.5 * dotSize} ${0.5 * dotSize}, 0, 0, 0, ${dotSize * 0.5} ${-dotSize * 0.5}` +
            `v ${-3 * dotSize}` +
            `a ${3.5 * dotSize} ${3.5 * dotSize}, 0, 0, 0, ${-dotSize * 3.5} ${-dotSize * 3.5}` +
            `a ${3.5 * dotSize} ${3.5 * dotSize}, 0, 0, 0, ${-dotSize * 3.5} ${dotSize * 3.5}` +
            `z` +
            `M ${x + size / 2} ${y + dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 1, ${dotSize * 2.5} ${dotSize * 2.5}` +
            `v ${2.5 * dotSize}` +
            `h ${-2.5 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 1, ${-dotSize * 2.5} ${-dotSize * 2.5}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 1, ${dotSize * 2.5} ${-dotSize * 2.5}` +
            `z`
        );
      }
    });
  }

  _basicSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` +
            `v ${size}` +
            `h ${size}` +
            `v ${-size}` +
            `z` +
            `M ${x + dotSize} ${y + dotSize}` +
            `h ${size - 2 * dotSize}` +
            `v ${size - 2 * dotSize}` +
            `h ${-size + 2 * dotSize}` +
            `z`
        );
      }
    });
  }

  _basicExtraRounded(args: BasicFigureDrawArgs): void {
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
            `h ${2 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${dotSize * 2.5} ${-dotSize * 2.5}` +
            `v ${-2 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${-dotSize * 2.5}` +
            `h ${-2 * dotSize}` +
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${dotSize * 2.5}` +
            `M ${x + 2.5 * dotSize} ${y + dotSize}` +
            `h ${2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${dotSize * 1.5} ${dotSize * 1.5}` +
            `v ${2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${-dotSize * 1.5} ${dotSize * 1.5}` +
            `h ${-2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${-dotSize * 1.5} ${-dotSize * 1.5}` +
            `v ${-2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${dotSize * 1.5} ${-dotSize * 1.5}`
        );
      }
    });
  }

  _basicOneClassy(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
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
            `a ${2.5 * dotSize} ${2.5 * dotSize}, 0, 0, 0, ${-dotSize * 2.5} ${dotSize * 2.5}` +
            `M ${x + 2.5 * dotSize} ${y + dotSize}` +
            `h ${2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${dotSize * 1.5} ${dotSize * 1.5}` +
            `v ${3.5 * dotSize}` +
            `h ${-3.5 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${-dotSize * 1.5} ${-dotSize * 1.5}` +
            `v ${-2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${dotSize * 1.5} ${-dotSize * 1.5}`
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
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
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
            `z` +
            `M ${x + 2.5 * dotSize} ${y + dotSize}` +
            `h ${2 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${dotSize * 1.5} ${dotSize * 1.5}` +
            `v ${3.5 * dotSize}` +
            `h ${-3.5 * dotSize}` +
            `a ${1.5 * dotSize} ${1.5 * dotSize}, 0, 0, 1, ${-dotSize * 1.5} ${-dotSize * 1.5}` +
            `v ${-3.5 * dotSize}` +
            `z`
        );
      }
    });
  }

  _basicMiddleRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const dotSize = size / 7;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M ${x} ${y + dotSize}` +
            `v ${5 * dotSize}` +
            `a ${dotSize} ${dotSize}, 0, 0, 0, ${dotSize} ${dotSize}` +
            `h ${5 * dotSize}` +
            `a ${dotSize} ${dotSize}, 0, 0, 0, ${dotSize} ${-dotSize}` +
            `v ${-5 * dotSize}` +
            `a ${dotSize} ${dotSize}, 0, 0, 0, ${-dotSize} ${-dotSize}` +
            `h ${-5 * dotSize}` +
            `a ${dotSize} ${dotSize}, 0, 0, 0, ${-dotSize} ${dotSize}` +
            `z` +
            `M ${x + 1.5 * dotSize} ${y + dotSize}` +
            `h ${4 * dotSize}` +
            `a ${0.5 * dotSize} ${0.5 * dotSize}, 0, 0, 1, ${dotSize * 0.5} ${dotSize * 0.5}` +
            `v ${4 * dotSize}` +
            `a ${0.5 * dotSize} ${0.5 * dotSize}, 0, 0, 1, ${-dotSize * 0.5} ${dotSize * 0.5}` +
            `h ${-4 * dotSize}` +
            `a ${0.5 * dotSize} ${0.5 * dotSize}, 0, 0, 1, ${-dotSize * 0.5} ${-dotSize * 0.5}` +
            `v ${-4 * dotSize}` +
            `a ${0.5 * dotSize} ${0.5 * dotSize}, 0, 0, 1, ${dotSize * 0.5} ${-dotSize * 0.5}` +
            `z`
        );
      }
    });
  }

  _basicGear(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const scale = size / 32.5;
    const yOffset = -scale / 3;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("clip-rule", "evenodd");
        this._element.setAttribute(
          "d",
          `M${x + 14.0179 * scale} ${y + 1.10681 * scale + yOffset * scale}` +
            `C${x + 15.1806 * scale} ${y + 0.195027 * scale + yOffset * scale}, ${x + 16.8157 * scale} ${
              y + 0.195028 * scale + yOffset * scale
            }, ${x + 17.9784 * scale} ${y + 1.10681 * scale + yOffset * scale}` +
            `L${x + 19.3272 * scale} ${y + 2.1645 * scale + yOffset * scale}` +
            `L${x + 21.0013 * scale} ${y + 1.79677 * scale + yOffset * scale}` +
            `C${x + 22.4445 * scale} ${y + 1.47976 * scale + yOffset * scale}, ${x + 23.9176 * scale} ${
              y + 2.18917 * scale + yOffset * scale
            }, ${x + 24.5695 * scale} ${y + 3.51514 * scale + yOffset * scale}` +
            `L${x + 25.3258 * scale} ${y + 5.0533 * scale + yOffset * scale}` +
            `L${x + 26.9937 * scale} ${y + 5.44836 * scale + yOffset * scale}` +
            `C${x + 28.4315 * scale} ${y + 5.78892 * scale + yOffset * scale}, ${x + 29.4509 * scale} ${
              y + 7.06724 * scale + yOffset * scale
            }, ${x + 29.463 * scale} ${y + 8.54477 * scale + yOffset * scale}` +
            `L${x + 29.477 * scale} ${y + 10.2587 * scale + yOffset * scale}` +
            `L${x + 30.8083 * scale} ${y + 11.3383 * scale + yOffset * scale}` +
            `C${x + 31.956 * scale} ${y + 12.269 * scale + yOffset * scale}, ${x + 32.3198 * scale} ${
              y + 13.863 * scale + yOffset * scale
            }, ${x + 31.6896 * scale} ${y + 15.1995 * scale + yOffset * scale}` +
            `L${x + 30.9586 * scale} ${y + 16.7498 * scale + yOffset * scale}` +
            `L${x + 31.6896 * scale} ${y + 18.3001 * scale + yOffset * scale}` +
            `C${x + 32.3198 * scale} ${y + 19.6366 * scale + yOffset * scale}, ${x + 31.956 * scale} ${
              y + 21.2306 * scale + yOffset * scale
            }, ${x + 30.8083 * scale} ${y + 22.1613 * scale + yOffset * scale}` +
            `L${x + 29.477 * scale} ${y + 23.2409 * scale + yOffset * scale}` +
            `L${x + 29.463 * scale} ${y + 24.9549 * scale + yOffset * scale}` +
            `C${x + 29.4509 * scale} ${y + 26.4324 * scale + yOffset * scale}, ${x + 28.4315 * scale} ${
              y + 27.7107 * scale + yOffset * scale
            }, ${x + 26.9937 * scale} ${y + 28.0513 * scale + yOffset * scale}` +
            `L${x + 25.3258 * scale} ${y + 28.4463 * scale + yOffset * scale}` +
            `L${x + 24.5695 * scale} ${y + 29.9845 * scale + yOffset * scale}` +
            `C${x + 23.9176 * scale} ${y + 31.3105 * scale + yOffset * scale}, ${x + 22.4445 * scale} ${
              y + 32.0199 * scale + yOffset * scale
            }, ${x + 21.0013 * scale} ${y + 31.7029 * scale + yOffset * scale}` +
            `L${x + 19.3272 * scale} ${y + 31.3351 * scale + yOffset * scale}` +
            `L${x + 17.9784 * scale} ${y + 32.3928 * scale + yOffset * scale}` +
            `C${x + 16.8157 * scale} ${y + 33.3046 * scale + yOffset * scale}, ${x + 15.1806 * scale} ${
              y + 33.3046 * scale + yOffset * scale
            }, ${x + 14.0179 * scale} ${y + 32.3928 * scale + yOffset * scale}` +
            `L${x + 12.6691 * scale} ${y + 31.3351 * scale + yOffset * scale}` +
            `L${x + 10.995 * scale} ${y + 31.7029 * scale + yOffset * scale}` +
            `C${x + 9.55185 * scale} ${y + 32.0199 * scale + yOffset * scale}, ${x + 8.07875 * scale} ${
              y + 31.3105 * scale + yOffset * scale
            }, ${x + 7.42678 * scale} ${y + 29.9845 * scale + yOffset * scale}` +
            `L${x + 6.67049 * scale} ${y + 28.4463 * scale + yOffset * scale}` +
            `L${x + 5.00261 * scale} ${y + 28.0513 * scale + yOffset * scale}` +
            `C${x + 3.5648 * scale} ${y + 27.7107 * scale + yOffset * scale}, ${x + 2.54539 * scale} ${
              y + 26.4324 * scale + yOffset * scale
            }, ${x + 2.53331 * scale} ${y + 24.9549 * scale + yOffset * scale}` +
            `L${x + 2.51929 * scale} ${y + 23.2409 * scale + yOffset * scale}` +
            `L${x + 1.18799 * scale} ${y + 22.1613 * scale + yOffset * scale}` +
            `C${x + 0.0403373 * scale} ${y + 21.2306 * scale + yOffset * scale}, ${x - 0.323487 * scale} ${
              y + 19.6366 * scale + yOffset * scale
            }, ${x + 0.306707 * scale} ${y + 18.3001 * scale + yOffset * scale}` +
            `L${x + 1.03775 * scale} ${y + 16.7498 * scale + yOffset * scale}` +
            `L${x + 0.306707 * scale} ${y + 15.1995 * scale + yOffset * scale}` +
            `C${x - 0.323488 * scale} ${y + 13.863 * scale + yOffset * scale}, ${x + 0.0403399 * scale} ${
              y + 12.269 * scale + yOffset * scale
            }, ${x + 1.18799 * scale} ${y + 11.3383 * scale + yOffset * scale}` +
            `L${x + 2.51929 * scale} ${y + 10.2587 * scale + yOffset * scale}` +
            `L${x + 2.53331 * scale} ${y + 8.54477 * scale + yOffset * scale}` +
            `C${x + 2.54539 * scale} ${y + 7.06723 * scale + yOffset * scale}, ${x + 3.56481 * scale} ${
              y + 5.78892 * scale + yOffset * scale
            }, ${x + 5.00261 * scale} ${y + 5.44836 * scale + yOffset * scale}` +
            `L${x + 6.67049 * scale} ${y + 5.0533 * scale + yOffset * scale}` +
            `L${x + 7.42678 * scale} ${y + 3.51514 * scale + yOffset * scale}` +
            `C${x + 8.07875 * scale} ${y + 2.18917 * scale + yOffset * scale}, ${x + 9.55185 * scale} ${
              y + 1.47976 * scale + yOffset * scale
            }, ${x + 10.995 * scale} ${y + 1.79677 * scale + yOffset * scale}` +
            `L${x + 12.6691 * scale} ${y + 2.1645 * scale + yOffset * scale}` +
            `L${x + 14.0179 * scale} ${y + 1.10681 * scale + yOffset * scale}` +
            `M${x + 15.9982 * scale} ${y + 4.74101 * scale + yOffset * scale}` +
            `L${x + 14.8641 * scale} ${y + 5.63034 * scale + yOffset * scale}` +
            `C${x + 14.1101 * scale} ${y + 6.22162 * scale + yOffset * scale}, ${x + 13.1313 * scale} ${
              y + 6.44503 * scale + yOffset * scale
            }, ${x + 12.1954 * scale} ${y + 6.23945 * scale + yOffset * scale}` +
            `L${x + 10.7877 * scale} ${y + 5.93025 * scale + yOffset * scale}` +
            `L${x + 10.1518 * scale} ${y + 7.22357 * scale + yOffset * scale}` +
            `C${x + 9.72902 * scale} ${y + 8.08346 * scale + yOffset * scale}, ${x + 8.94409 * scale} ${
              y + 8.70942 * scale + yOffset * scale
            }, ${x + 8.01168 * scale} ${y + 8.93027 * scale + yOffset * scale}` +
            `L${x + 6.60929 * scale} ${y + 9.26245 * scale + yOffset * scale}` +
            `L${x + 6.5975 * scale} ${y + 10.7036 * scale + yOffset * scale}` +
            `C${x + 6.58967 * scale} ${y + 11.6618 * scale + yOffset * scale}, ${x + 6.15407 * scale} ${
              y + 12.5663 * scale + yOffset * scale
            }, ${x + 5.40982 * scale} ${y + 13.1698 * scale + yOffset * scale}` +
            `L${x + 4.29043 * scale} ${y + 14.0776 * scale + yOffset * scale}` +
            `L${x + 4.9051 * scale} ${y + 15.3812 * scale + yOffset * scale}` +
            `C${x + 5.31378 * scale} ${y + 16.2478 * scale + yOffset * scale}, ${x + 5.31378 * scale} ${
              y + 17.2518 * scale + yOffset * scale
            }, ${x + 4.9051 * scale} ${y + 18.1185 * scale + yOffset * scale}` +
            `L${x + 4.29043 * scale} ${y + 19.422 * scale + yOffset * scale}` +
            `L${x + 5.40982 * scale} ${y + 20.3298 * scale + yOffset * scale}` +
            `L${x + 4.12436 * scale} ${y + 21.9149 * scale + yOffset * scale}` +
            `L${x + 5.40982 * scale} ${y + 20.3298 * scale + yOffset * scale}` +
            `C${x + 6.15407 * scale} ${y + 20.9333 * scale + yOffset * scale}, ${x + 6.58967 * scale} ${
              y + 21.8379 * scale + yOffset * scale
            }, ${x + 6.5975 * scale} ${y + 22.796 * scale + yOffset * scale}` +
            `L${x + 6.60929 * scale} ${y + 24.2372 * scale + yOffset * scale}` +
            `L${x + 8.01168 * scale} ${y + 24.5694 * scale + yOffset * scale}` +
            `C${x + 8.94409 * scale} ${y + 24.7902 * scale + yOffset * scale}, ${x + 9.72902 * scale} ${
              y + 25.4162 * scale + yOffset * scale
            }, ${x + 10.1518 * scale} ${y + 26.2761 * scale + yOffset * scale}` +
            `L${x + 10.7877 * scale} ${y + 27.5694 * scale + yOffset * scale}` +
            `L${x + 12.1954 * scale} ${y + 27.2602 * scale + yOffset * scale}` +
            `C${x + 13.1313 * scale} ${y + 27.0546 * scale + yOffset * scale}, ${x + 14.1101 * scale} ${
              y + 27.278 * scale + yOffset * scale
            }, ${x + 14.8641 * scale} ${y + 27.8693 * scale + yOffset * scale}` +
            `L${x + 15.9982 * scale} ${y + 28.7586 * scale + yOffset * scale}` +
            `L${x + 17.1322 * scale} ${y + 27.8693 * scale + yOffset * scale}` +
            `C${x + 17.8862 * scale} ${y + 27.278 * scale + yOffset * scale}, ${x + 18.865 * scale} ${
              y + 27.0546 * scale + yOffset * scale
            }, ${x + 19.8009 * scale} ${y + 27.2602 * scale + yOffset * scale}` +
            `L${x + 21.2086 * scale} ${y + 27.5694 * scale + yOffset * scale}` +
            `L${x + 21.8445 * scale} ${y + 26.2761 * scale + yOffset * scale}` +
            `C${x + 22.2673 * scale} ${y + 25.4162 * scale + yOffset * scale}, ${x + 23.0522 * scale} ${
              y + 24.7902 * scale + yOffset * scale
            }, ${x + 23.9846 * scale} ${y + 24.5694 * scale + yOffset * scale}` +
            `L${x + 25.387 * scale} ${y + 24.2372 * scale + yOffset * scale}` +
            `L${x + 25.3988 * scale} ${y + 22.796 * scale + yOffset * scale}` +
            `C${x + 25.4066 * scale} ${y + 21.8379 * scale + yOffset * scale}, ${x + 25.8422 * scale} ${
              y + 20.9333 * scale + yOffset * scale
            }, ${x + 26.5865 * scale} ${y + 20.3298 * scale + yOffset * scale}` +
            `L${x + 27.7059 * scale} ${y + 19.422 * scale + yOffset * scale}` +
            `L${x + 27.0912 * scale} ${y + 18.1185 * scale + yOffset * scale}` +
            `C${x + 26.6825 * scale} ${y + 17.2518 * scale + yOffset * scale}, ${x + 26.6825 * scale} ${
              y + 16.2478 * scale + yOffset * scale
            }, ${x + 27.0912 * scale} ${y + 15.3812 * scale + yOffset * scale}` +
            `L${x + 27.7059 * scale} ${y + 14.0776 * scale + yOffset * scale}` +
            `L${x + 26.5865 * scale} ${y + 13.1699 * scale + yOffset * scale}` +
            `C${x + 25.8422 * scale} ${y + 12.5663 * scale + yOffset * scale}, ${x + 25.4066 * scale} ${
              y + 11.6618 * scale + yOffset * scale
            }, ${x + 25.3988 * scale} ${y + 10.7036 * scale + yOffset * scale}` +
            `L${x + 25.387 * scale} ${y + 9.26245 * scale + yOffset * scale}` +
            `L${x + 23.9846 * scale} ${y + 8.93027 * scale + yOffset * scale}` +
            `C${x + 23.0522 * scale} ${y + 8.70942 * scale + yOffset * scale}, ${x + 22.2673 * scale} ${
              y + 8.08346 * scale + yOffset * scale
            }, ${x + 21.8445 * scale} ${y + 7.22358 * scale + yOffset * scale}` +
            `L${x + 21.2086 * scale} ${y + 5.93025 * scale + yOffset * scale}` +
            `L${x + 19.8009 * scale} ${y + 6.23945 * scale + yOffset * scale}` +
            `C${x + 18.865 * scale} ${y + 6.44503 * scale + yOffset * scale}, ${x + 17.8863 * scale} ${
              y + 6.22163 * scale + yOffset * scale
            }, ${x + 17.1322 * scale} ${y + 5.63034 * scale + yOffset * scale}` +
            `L${x + 15.9982 * scale} ${y + 4.74101 * scale + yOffset * scale}` +
            `Z`
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

  _drawExtraRounded({ x, y, size, rotation }: DrawArgs): void {
    this._basicExtraRounded({ x, y, size, rotation });
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

  _drawDotOneClassy({ x, y, size, rotation }: DrawArgs): void {
    this._basicDotOneClassy({ x, y, size, rotation });
  }

  _drawMiddleRounded({ x, y, size, rotation }: DrawArgs): void {
    this._basicMiddleRounded({ x, y, size, rotation });
  }

  _drawGear({ x, y, size }: DrawArgs): void {
    const rotate = 0;
    this._basicGear({ x, y, size, rotation: rotate });
  }
}
