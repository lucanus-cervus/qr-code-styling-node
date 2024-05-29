import { CornerDotType, RotateFigureArgsCanvas, BasicFigureDrawArgsCanvas, DrawArgsCanvas } from "../../../types";
export default class QRCornerDot {
    _context: CanvasRenderingContext2D;
    _type: CornerDotType;
    constructor({ context, type }: {
        context: CanvasRenderingContext2D;
        type: CornerDotType;
    });
    draw(x: number, y: number, size: number, rotation: number): void;
    _rotateFigure({ x, y, size, context, rotation, draw }: RotateFigureArgsCanvas): void;
    _basicDot(args: BasicFigureDrawArgsCanvas): void;
    _basicSquare(args: BasicFigureDrawArgsCanvas): void;
    _basicRounded(args: BasicFigureDrawArgsCanvas): void;
    _basicClassy(args: BasicFigureDrawArgsCanvas): void;
    _basicOneClassy(args: BasicFigureDrawArgsCanvas): void;
    _drawDot({ x, y, size, context, rotation }: DrawArgsCanvas): void;
    _drawSquare({ x, y, size, context, rotation }: DrawArgsCanvas): void;
    _drawRounded({ x, y, size, context, rotation }: DrawArgsCanvas): void;
    _drawClassy({ x, y, size, context, rotation }: DrawArgsCanvas): void;
    _drawOneClassy({ x, y, size, context, rotation }: DrawArgsCanvas): void;
}