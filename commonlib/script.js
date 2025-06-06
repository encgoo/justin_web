import {Plot} from './plot.js'

const canvas = document.querySelector('#canvas1');
const canvas_w = 600;
const canvas_h = 600;
canvas.width = canvas_w;
canvas.height = canvas_h;

const plot = new Plot(canvas);
function func(x) {
    return 2*x*Math.sin(x);
}
const points = [];
let xstart = -10;
let delta = 0.1;
while (xstart < 10) {
    points.push([xstart, func(xstart)]);
    xstart += delta;
}
const intePoints = points.filter((cur, idx) => {
    return idx%3==0;
});

const points1 = [];
xstart = -10;
delta = 0.8
while (xstart < 10) {
    points1.push([xstart, func2(xstart)]);
    xstart += delta;
}
plot.draw([
    {points, color:'blue'},
    {points: points1, color:'green'},
    {points: intePoints, color:'rgba(0,0,255,0.3)', integration: true}
]);

function func2(x){
    return 2*x;
}


//plot.draw(points1, 'green');

console.log(canvas);