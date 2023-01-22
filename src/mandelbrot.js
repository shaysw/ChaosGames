import { Complex, add, multiply, sqrt, re, im } from "mathjs"

export function getName(){
    return "Mabdelbrot set"
}

let zoomFactor = 1,
    xOffset = 0, 
    yOffset = 0
export const maxNumberOfIterations = 20

export function getNumberOfIterationsUntilScattered(row, col) {
    var x = (row - 250) / 125 / zoomFactor + xOffset
    var y = (col - 250) / 125 / zoomFactor + yOffset
    let currentPoint = Complex(0, 0)

    for (var i = 0; i < maxNumberOfIterations; i++){
        let c = Complex(x, y)
        currentPoint = add(multiply(currentPoint, currentPoint), c)
        var radius = sqrt(re(currentPoint) ** 2 + im(currentPoint) ** 2) 
        if (radius > 2){
            return i
        }
    }
    return maxNumberOfIterations
}

export function zoomIn(x, y){
    zoomFactor *= 2
    xOffset = xOffset + (x - 250) / 125 / zoomFactor
    yOffset = yOffset + (y - 250) / 125 / zoomFactor
}

export function erase() {
    zoomFactor = 1
    xOffset = 0
    yOffset = 0
}