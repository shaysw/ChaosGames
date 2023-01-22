import { random } from "mathjs"

let x = 0, 
    y = 0

const iterationFunctions = [
    (oldX, oldY) => [0, 0.16 * oldY],
    (oldX, oldY) => [0.85 * oldX + 0.04 * oldY, -0.04 * oldX + 0.85 * oldY + 1.6],
    (oldX, oldY) => [0.2 * oldX - 0.26 * oldY, 0.23 * oldX + 0.22 * oldY + 1.6],
    (oldX, oldY) => [-0.15 * oldX + 0.28 * oldY, 0.26 * oldX + 0.24 * oldY + 0.44]
]

export function getName(){
    return "Barnsley fern"
}

export function getNextPoint(currentPoint) {
    var rnd = random()
    if (rnd <= 0.01){
        var iterationFunction = iterationFunctions[0]
    }
    else if (rnd <= 0.86){
        var iterationFunction = iterationFunctions[1]
    }
    else if (rnd <= 0.93){
        var iterationFunction = iterationFunctions[2]
    }
    else{
        var iterationFunction = iterationFunctions[3]
    }
    [x, y] = iterationFunction(x, y)
    return [(x + 2.1820) * 500 / (2.6558 + 2.1820), 500 - (y * 500 / 9.9983)]
}

export function erase() {
}