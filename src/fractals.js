import { randomInt } from "mathjs"

export var anchorPoints = []

export function getName(){
    return "Fractals"
}

export function getNextPoint(currentPoint) {
    var nextDirectionPoint = anchorPoints[randomInt(anchorPoints.length)]
    var midwayX = currentPoint[0] + (nextDirectionPoint[0] - currentPoint[0]) * (2 + anchorPoints.length) / 10
    var midwayY = currentPoint[1] + (nextDirectionPoint[1] - currentPoint[1]) * (2 + anchorPoints.length) / 10

    return [midwayX, midwayY]
}

export function onClick(x, y, ctx) {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, 4, 4);
        ctx.closePath();

        anchorPoints.push([x, y])
}

export function erase() {
    anchorPoints = []
}