import { CornerDotType, RotateFigureArgs, BasicFigureDrawArgs, DrawArgs, Window } from "../../../types";
export default class QRCornerDot {
    _element?: SVGElement;
    _svg: SVGElement;
    _type: CornerDotType;
    _window: Window;
    constructor({ svg, type, window }: {
        svg: SVGElement;
        type: CornerDotType;
        window: Window;
    });
    draw(x: number, y: number, size: number, rotation: number): void;
    _rotateFigure({ x, y, size, rotation, draw }: RotateFigureArgs): void;
    _basicDot(args: BasicFigureDrawArgs): void;
    _basicSquare(args: BasicFigureDrawArgs): void;
    _basicRounded(args: BasicFigureDrawArgs): void;
    _basicOneClassy(args: BasicFigureDrawArgs): void;
    _basicClassy(args: BasicFigureDrawArgs): void;
    _basicClassyReflect(args: BasicFigureDrawArgs): void;
    _basicStar(args: BasicFigureDrawArgs): void;
    _basicGear(args: BasicFigureDrawArgs): void;
    _drawDot({ x, y, size, rotation }: DrawArgs): void;
    _drawSquare({ x, y, size, rotation }: DrawArgs): void;
    _drawRounded({ x, y, size, rotation }: DrawArgs): void;
    _drawOneClassy({ x, y, size, rotation }: DrawArgs): void;
    _drawOneClassyRotate({ x, y, size, rotation }: DrawArgs): void;
    _drawClassy({ x, y, size, rotation }: DrawArgs): void;
    _drawClassyReflect({ x, y, size, rotation }: DrawArgs): void;
    _drawRhombus({ x, y, size, rotation }: DrawArgs): void;
    _drawRhombusExtraRounded({ x, y, size, rotation }: DrawArgs): void;
    _drawStar({ x, y, size }: DrawArgs): void;
    _drawGear({ x, y, size }: DrawArgs): void;
}
