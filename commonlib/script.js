import {Plot} from './plot.js'

const canvas = document.querySelector('#canvas1');
const canvas_w = 500;
const canvas_h = 300;
canvas.width = canvas_w;
canvas.height = canvas_h;

const plot = new Plot(100, -100, 10, -10, canvas);
function func(x) {
    return 100*Math.sin(x);
}
const points = [];
let xstart = -10;
const delta = 0.1;
while (xstart < 10) {
    points.push([xstart, func(xstart)]);
    xstart += delta;
}

plot.draw(points);

console.log(canvas);