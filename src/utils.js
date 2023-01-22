export function drawPoint(x, y, style = "black", size = 1) {
    ctx.beginPath();
    ctx.fillStyle = style;
    ctx.fillRect(x, y, size, size);
    ctx.closePath();
}