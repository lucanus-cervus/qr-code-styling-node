import { CornerSquareType, DrawArgs, BasicFigureDrawArgs, RotateFigureArgs, Window } from "../../../types";
export default class QRCornerSquare {
    _element?: SVGElement;
    _svg: SVGElement;
    _type: CornerSquareType;
    _window: Window;
    constructor({ svg, type, window }: {
        svg: SVGElement;
        type: CornerSquareType;
        window: Window;
    });
    draw(x: number, y: number, size: number, rotation: number): void;
    _rotateFigure({ x, y, size, rotation, draw }: RotateFigureArgs): void;
    _basicDot(args: BasicFigureDrawArgs): void;
    _basicDotOneClassy(args: BasicFigureDrawArgs): void;
    _basicSquare(args: BasicFigureDrawArgs): void;
    _basicExtraRounded(args: BasicFigureDrawArgs): void;
    _basicOneClassy(args: BasicFigureDrawArgs): void;
    _basicClassy(args: BasicFigureDrawArgs): void;
    _basicMiddleRounded(args: BasicFigureDrawArgs): void;
    _basicGear(args: BasicFigureDrawArgs): void;
    _drawDot({ x, y, size, rotation }: DrawArgs): void;
    _drawSquare({ x, y, size, rotation }: DrawArgs): void;
    _drawExtraRounded({ x, y, size, rotation }: DrawArgs): void;
    _drawOneClassy({ x, y, size, rotation }: DrawArgs): void;
    _drawOneClassyRotate({ x, y, size, rotation }: DrawArgs): void;
    _drawClassy({ x, y, size, rotation }: DrawArgs): void;
    _drawDotOneClassy({ x, y, size, rotation }: DrawArgs): void;
    _drawMiddleRounded({ x, y, size, rotation }: DrawArgs): void;
    _drawGear({ x, y, size }: DrawArgs): void;
}
