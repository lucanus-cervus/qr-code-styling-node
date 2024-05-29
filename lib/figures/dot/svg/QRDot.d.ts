import { DotType, GetNeighbor, DrawArgs, BasicFigureDrawArgs, RotateFigureArgs, Window } from "../../../types";
export default class QRDot {
    _element?: SVGElement;
    _svg: SVGElement;
    _type: DotType;
    _window: Window;
    constructor({ svg, type, window }: {
        svg: SVGElement;
        type: DotType;
        window: Window;
    });
    draw(x: number, y: number, size: number, getNeighbor: GetNeighbor): void;
    _rotateFigure({ x, y, size, rotation, draw }: RotateFigureArgs): void;
    _basicDot(args: BasicFigureDrawArgs): void;
    _basicSquare(args: BasicFigureDrawArgs): void;
    _basicSideRounded(args: BasicFigureDrawArgs): void;
    _basicSideRhombus(args: BasicFigureDrawArgs): void;
    _basicSmallSideSquare(args: BasicFigureDrawArgs): void;
    _basicSmallSideDot(args: BasicFigureDrawArgs): void;
    _basicCornerRounded(args: BasicFigureDrawArgs): void;
    _basicCornerExtraRounded(args: BasicFigureDrawArgs): void;
    _basicCornersRounded(args: BasicFigureDrawArgs): void;
    _drawDot({ x, y, size }: DrawArgs): void;
    _drawSquare({ x, y, size }: DrawArgs): void;
    _drawRounded({ x, y, size, getNeighbor }: DrawArgs): void;
    _drawExtraRounded({ x, y, size, getNeighbor }: DrawArgs): void;
    _drawClassy({ x, y, size, getNeighbor }: DrawArgs): void;
    _drawClassyRounded({ x, y, size, getNeighbor }: DrawArgs): void;
    _basicSmallSquare(args: BasicFigureDrawArgs): void;
    _basicSmallRectangle(args: BasicFigureDrawArgs): void;
    _basicSmallDots(args: BasicFigureDrawArgs): void;
    _drawRhombus({ x, y, size }: DrawArgs): void;
    _drawSmallSquare({ x, y, size }: DrawArgs): void;
    _drawSmallDots({ x, y, size }: DrawArgs): void;
    _drawRandomDots({ x, y, size }: DrawArgs): void;
    _drawDotsHorizontal({ x, y, size, getNeighbor }: DrawArgs): void;
    _drawDotsVertical({ x, y, size, getNeighbor }: DrawArgs): void;
    _drawRhombusVertical({ x, y, size, getNeighbor }: DrawArgs): void;
    _drawSquareStripe({ x, y, size, getNeighbor }: DrawArgs): void;
    _drawRoundedStripe({ x, y, size, getNeighbor }: DrawArgs): void;
    _drawRandom({ x, y, size }: DrawArgs): void;
}
