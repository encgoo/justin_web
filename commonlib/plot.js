class Plot {
    // private
    #w;
    #h;
    #ymax; // above max will be cutoff
    #ymin; // min must be 0 or negative?
    #xmax;
    #xmin;
    #yscale; // y-scale factor
    #xscale; // x-scale factor
    #pad = 10.5; // use .5 to get the one-pixel line
    #xaxis_y = 0;
    #yaxis_x = 0;

    arrowlen = 5;
    canvas;
    constructor(canvas) {
        this.#w = canvas.width;
        this.#h = canvas.height;
        this.canvas = canvas;
    }
    // figure out the x-axis and y-axis locations
    init(data) {
        const max_mins = data.map((cur) => {
            let { points, _ } = cur;
            const maxMin = points.reduce(
                (ext, cur) => {
                    const ret = [
                        Math.max(cur[0], ext[0]),
                        Math.min(cur[0], ext[1]),
                        Math.max(cur[1], ext[2]),
                        Math.min(cur[1], ext[3]),
                    ];
                    return ret;
                },
                [points[0][0], points[0][0], points[0][1], points[0][1]]
            );
            return maxMin;
        });

        let extrems = max_mins.reduce((acc, max_min) => {
            return [
                Math.max(max_min[0], acc[0]),
                Math.min(max_min[1], acc[1]),
                Math.max(max_min[2], acc[2]),
                Math.min(max_min[3], acc[3]),
            ];
        }, max_mins[0]);
        let [xmax, xmin, ymax, ymin] = extrems;
        console.log(xmax, xmin, ymax, ymin);
        
        this.#ymax = ymax;
        this.#ymin = ymin;
        this.#xmax = xmax;
        this.#xmin = xmin;

        this.#yscale = (this.#h - 2 * this.#pad) / (ymax - ymin);
        this.#xscale = (this.#w - 2 * this.#pad) / (xmax - xmin);

        let yaxis_x = Math.floor(-this.#xmin * this.#xscale) + this.#pad;
        if (this.#xmin > 0 || this.#xmax < 0) {
            yaxis_x = this.#pad;
        }
        this.#yaxis_x = yaxis_x;

        let xaxis_y = Math.floor(this.#ymax * this.#yscale) + this.#pad;
        if (this.#ymin > 0 || this.#ymax < 0) {
            xaxis_y =
                Math.floor((this.#ymax - this.#ymin) * this.#yscale) +
                this.#pad;
        }
        this.#xaxis_y = xaxis_y;
    }
    // assume the caller is going to clear the rectangle
    draw(data) {
        const ctx = this.canvas.getContext("2d");
        this.init(data);
        this.drawX(ctx);
        this.drawY(ctx);
        data.forEach((cur) => {
            this.drawCurve(ctx, cur);
        });
    }
    convertX(x) {
        if (this.#xmin > 0 || this.#xmax < 0) {
            x -= this.#xmin;
        }
        return x * this.#xscale + this.#yaxis_x;
    }
    convertY(y) {
        if (this.#ymin > 0 || this.#ymax < 0) {
            y += this.#ymin;
        }
        return -y * this.#yscale + this.#xaxis_y;
    }
    drawCurve(ctx, curve) {
        let { points, color } = curve;
        ctx.strokeStyle = color;
        ctx.beginPath();
        let [xstart, ystart] = points[0];
        xstart = this.convertX(xstart);
        ystart = this.convertY(ystart);

        points.forEach((point) => {
            let [xend, yend] = point;
            xend = this.convertX(xend);
            yend = this.convertY(yend);
            ctx.moveTo(xstart, ystart);
            ctx.lineTo(xend, yend);
            xstart = xend;
            ystart = yend;
        });
        ctx.closePath();
        ctx.stroke();
    }
    drawY(ctx) {
        const yaxis_x = this.#yaxis_x;
        ctx.font = "8px Arial";
        ctx.textAlign = "right";
        ctx.strokeStyle = "#1a5881";
        ctx.fillStyle = "#1a5881";
        ctx.beginPath();
        let xstart = yaxis_x;
        let ystart = this.#pad;

        ctx.moveTo(xstart, ystart);
        ctx.lineTo(xstart, this.#h - this.#pad);

        ctx.moveTo(xstart, ystart);
        let xend = xstart - this.arrowlen;
        let yend = ystart + this.arrowlen;
        ctx.lineTo(xend, yend);
        ctx.moveTo(xstart, ystart);
        xend = xstart + this.arrowlen;
        ctx.lineTo(xend, yend);

        const delta = Math.floor((this.#ymax - this.#ymin) / 10);
        if (delta > 0) {
            let yvalue = Math.floor(this.#ymin / delta) * delta;
            xstart = this.#yaxis_x;

            while (yvalue < this.#ymax) {
                if (yvalue < this.#ymin) {
                    yvalue += delta;
                    continue;
                }
                if (yvalue > this.#ymax) {
                    break;
                }
                let yv = yvalue;
                if (this.#ymin > 0 || this.#ymax < 0) {
                    yv -= this.#ymin;
                }
                ystart = -yv * this.#yscale + this.#xaxis_y;
                ctx.moveTo(xstart, ystart);
                ctx.lineTo(xstart + 3.5, ystart);
                if (ystart != this.#xaxis_y) {
                    ctx.fillText(String(yvalue), xstart - 5, ystart);
                }
                yvalue += delta;
            }
            ctx.moveTo(xstart, ystart);
        }
        ctx.closePath();
        ctx.stroke();
    }

    drawX(ctx) {
        const xaxis_y = this.#xaxis_y;

        ctx.lineWidth = 1;
        ctx.font = "8px Arial";
        ctx.textAlign = "right";
        ctx.strokeStyle = "#1a5881";
        ctx.fillStyle = "#1a5881";
        ctx.beginPath();

        let xstart = this.#pad;
        let ystart = xaxis_y;
        ctx.moveTo(xstart, ystart);
        ctx.lineTo(this.#w - this.#pad, ystart);
        xstart = this.#w - this.#pad;

        ctx.moveTo(xstart, ystart);
        let xend = xstart - this.arrowlen;
        let yend = ystart - this.arrowlen;
        ctx.lineTo(xend, yend);

        yend = ystart + this.arrowlen;
        ctx.moveTo(xstart, ystart);
        ctx.lineTo(xend, yend);

        // draw 10 ticks
        const delta = Math.floor((this.#xmax - this.#xmin) / 10);
        if (delta > 0) {
            let xvalue = Math.floor(this.#xmin / delta) * delta;
            ystart = this.#xaxis_y;

            while (xvalue < this.#xmax) {
                if (xvalue < this.#xmin) {
                    xvalue += delta;
                    continue;
                }
                if (xvalue > this.#xmax) {
                    break;
                }
                let xv = xvalue;
                if (this.#xmin > 0 || this.#xmax < 0) {
                    xv -= this.#xmin;
                }
                xstart = xv * this.#xscale + this.#yaxis_x;
                ctx.moveTo(xstart, ystart);
                ctx.lineTo(xstart, ystart - 3.5);

                ctx.fillText(String(xvalue), xstart, ystart + 10);

                xvalue += delta;
            }
            ctx.moveTo(xstart, ystart);
        }

        ctx.closePath();
        ctx.stroke();
    }
}
export { Plot };
