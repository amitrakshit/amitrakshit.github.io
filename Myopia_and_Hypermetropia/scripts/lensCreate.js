/*
Author: Amit Rakshit
email: amit.rakshit@byjus.com
 */

class lens {
    constructor(x = 0, y = 0, width = 100, height = 100, type = 'parallel') {
        this.height = height;
        this.width = width;
        this.type = type;
        this.x = x;
        this.y = y;
        // this.radius = 0;
        this.power = 1;
    }
    draw(ctx) {
        var ctx2D = ctx;
        var height = this.height;
        var width = this.width;
        var originX = this.x;
        var originY = this.y;
        // var radius = this.radius;
        var power = this.power;
        if (ctx2D == undefined) {
            console.error('Canvas context is not defined.');
        }
        else {
            if (ctx2D !== 'undefined' && this.type === 'parallel') {
                ctx2D.clearRect(originX - width / 2, originY - height / 2, width, height);
                // Adding a linear gradient
                var linearGradient = ctx2D.createLinearGradient(originX - width / 2, originY, originX + width / 2, originY);
                // Add three color stops
                linearGradient.addColorStop(0., '#74B5A8');
                linearGradient.addColorStop(0.35, '#90E3D3');
                linearGradient.addColorStop(0.5, '#C5FFF4');
                linearGradient.addColorStop(0.65, '#90E3D3');
                linearGradient.addColorStop(1, '#74B5A8');
                // The path
                ctx2D.beginPath();
                ctx2D.moveTo(originX - width / 2, originY - height / 2);
                ctx2D.lineTo(originX + width / 2, originY - height / 2);
                ctx2D.lineTo(originX + width / 2, originY + height / 2);
                ctx2D.lineTo(originX - width / 2, originY + height / 2);
                ctx2D.lineTo(originX - width / 2, originY - height / 2);
                ctx2D.strokeStyle = 'white';
                ctx2D.fillStyle = linearGradient;
                // ctx2D.stroke();
                ctx2D.fill();
            }
            else if (ctx2D !== 'undefined' && this.type === 'convex') {
                //Calculations for drawing
                var xOffset = width / 2 * power;  //Power variable has to be put here
                var xOff2 = xOffset;
                var distanceBwnTopRightAndMiddleLeft = Math.sqrt((height / 2) ** 2 + (xOff2) ** 2);
                var radius = (distanceBwnTopRightAndMiddleLeft ** 2 / (xOff2)) / 2;
                var theta = Math.asin((height / 2) / radius);
                var forReducingExtraX = radius * (1 - Math.cos(theta));
                //Drawing 
                ctx2D.clearRect(originX - width / 2, originY - height / 2, width, height);
                ctx2D.beginPath();
                ctx2D.moveTo(originX - width / 2 + forReducingExtraX, originY - height / 2);
                ctx2D.lineTo(originX + width / 2 - forReducingExtraX, originY - height / 2);
                ctx2D.arc(originX - radius + width / 2, originY, radius, - theta, theta, false);
                ctx2D.lineTo(originX + width / 2 - forReducingExtraX, originY + height / 2);
                ctx2D.lineTo(originX - width / 2 + forReducingExtraX, originY + height / 2);
                ctx2D.arc(originX + radius - width / 2, originY, radius, Math.PI - theta, Math.PI + theta, false);
                ctx2D.lineTo(originX - width / 2 + forReducingExtraX, originY - height / 2);
                ctx2D.strokeStyle = 'white';

                //Linear gradient
                var linearGradient = ctx2D.createLinearGradient(originX - width / 2, originY, originX + width / 2, originY);
                // Add three color stops
                linearGradient.addColorStop(0., '#74B5A8');
                linearGradient.addColorStop(0.35, '#90E3D3');
                linearGradient.addColorStop(0.5, '#C5FFF4');
                linearGradient.addColorStop(0.67, '#90E3D3');
                linearGradient.addColorStop(1, '#74B5A8');
                // ctx2D.clearRect(originX - width / 2, originY - height / 2, width, height);
                // ctx2D.beginPath();
                // ctx2D.ellipse(originX, originY, width / 2, height / 2, 0, 0, 2 * Math.PI); //(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
                // ctx2D.strokeStyle = 'white';
                ctx2D.fillStyle = linearGradient;
                ctx2D.fill();
                // ctx2D.stroke();
            }
            else if (ctx2D !== 'undefined' && this.type === 'concave') {
                var xOffset = width / 4 * (2 - power);  //Power variable has to be put here
                var xOff2 = width / 2 - xOffset;
                var distanceBwnTopRightAndMiddleLeft = Math.sqrt((height / 2) ** 2 + (xOff2) ** 2);
                var radius = (distanceBwnTopRightAndMiddleLeft ** 2 / (xOff2)) / 2;
                var theta = Math.asin((height / 2) / radius);
                //Addigng a linear gradient
                var linearGradient = ctx2D.createLinearGradient(originX - width / 2, originY, originX + width / 2, originY);
                // Add three color stops
                linearGradient.addColorStop(0., '#74B5A8');
                linearGradient.addColorStop(0.35, '#90E3D3');
                linearGradient.addColorStop(0.5, '#C5FFF4');
                linearGradient.addColorStop(0.67, '#90E3D3');
                linearGradient.addColorStop(1, '#74B5A8');

                ctx2D.clearRect(originX - width / 2, originY - height / 2, width, height);
                ctx2D.beginPath();
                ctx2D.moveTo(originX - width / 2, originY - height / 2);
                ctx2D.lineTo(originX + width / 2, originY - height / 2);
                ctx2D.arc(originX + radius + xOffset, originY, radius, Math.PI + theta, Math.PI - theta, true);
                ctx2D.lineTo(originX + width / 2, originY + height / 2);
                ctx2D.lineTo(originX - width / 2, originY + height / 2);
                ctx2D.arc(originX - radius - xOffset, originY, radius, theta, 2 * Math.PI - theta, true);
                ctx2D.lineTo(originX - width / 2, originY - height / 2);
                ctx2D.strokeStyle = 'white';
                ctx2D.fillStyle = linearGradient;
                ctx2D.fill();
                // ctx2D.stroke();
            }
        }
    }
    clearRect(ctx) {
        var ctx2D = ctx;
        var height = this.height;
        var width = this.width;
        var originX = this.x;
        var originY = this.y;
        ctx2D.clearRect(originX - (width * 1.1 / 2), originY - (height * 1.1 / 2), width * 1.1, height * 1.1);
    }
}

class xParallelRays {
    constructor(startX = 0, startY = 0, endX = 0, focusPoint = 0, spread = 0, type = 'parallel') {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.focusPoint = focusPoint;
        this.spread = spread;
        this.type = type;
        this.strokeStyle = '#000000';
        this.fillStyle = '#000000';
        this.stroke = true;
        this.fill = true;
        this.height = this.spread;
        this.width = Math.abs(this.endX - this.startX);
        if (this.type == 'convergent') {
            var endY = Math.abs(this.endX - this.focusPoint) * ((this.spread / 2) / Math.abs(this.startX - this.focusPoint));
            this.endSpread = 2 * endY;
        }
        else if (this.type == 'divergent') {
            var endY = Math.abs(this.endX - this.focusPoint) * ((this.spread / 2) / Math.abs(this.startX - this.focusPoint));
            this.endSpread = 2 * endY;
        }
        else if (this.type == 'parallel') {
            this.endSpread = this.spread;
        }
        this.lineWidth = 1;
    }
    getEndSpread() {
        if (this.type == 'convergent') {
            var endY = Math.abs(this.endX - this.focusPoint) * ((this.spread / 2) / Math.abs(this.startX - this.focusPoint));
            this.endSpread = 2 * endY;
        }
        else if (this.type == 'divergent' && this.startX != this.focusPoint) {
            var endY = Math.abs(this.endX - this.focusPoint) * ((this.spread / 2) / Math.abs(this.startX - this.focusPoint));
            this.endSpread = 2 * endY;
        }
        else if (this.type == 'divergent' && this.startX == this.focusPoint) {
            this.endSpread = this.endSpread;
        }
        else if (this.type == 'parallel') {
            this.endSpread = this.spread;
        }
        return this.endSpread;
    }
    draw(ctx2D) {
        var originX = this.startX;
        var originY = this.startY;
        var spread = this.spread;
        var endX = this.endX;
        var focusPoint = this.focusPoint;
        var ctx = ctx2D;
        if (ctx == undefined) {
            console.error('Canvas context is not defined.');
        }
        if (this.type == 'parallel') {
            ctx.clearRect(1 * originX, originY - 1.0 * spread / 2, 1.0 * endX, originY + 1.0 * spread / 2);
            ctx.beginPath();
            ctx.moveTo(originX, originY - spread / 2);
            ctx.lineTo(endX, originY - spread / 2);
            // ctx.lineTo(endX, originY + spread / 2);
            ctx.moveTo(endX, originY + spread / 2);
            ctx.lineTo(originX, originY + spread / 2);
            // ctx.lineTo(originX, originY - spread / 2);
            ctx.moveTo(originX, originY - spread / 2);
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.fillStyle = this.fillStyle;
            if (this.fill == true) {
                ctx.fill();
            }
            if (this.stroke == true) {
                ctx.stroke();
            }
            // this.endSpread = this.spread;
        }
        else if (this.type == 'convergent') {
            var endY = Math.abs(focusPoint - endX) * (spread / 2) / Math.abs(focusPoint - originX);
            ctx.clearRect(1 * originX, originY - 1.0 * spread / 2, 1.0 * endX, originY + 1.0 * spread / 2);
            ctx.beginPath();
            ctx.moveTo(originX, originY - spread / 2);
            ctx.lineTo(endX, originY - endY);
            // ctx.lineTo(endX, originY + endY);
            ctx.moveTo(endX, originY + endY);
            ctx.lineTo(originX, originY + spread / 2);
            // ctx.lineTo(originX, originY - spread / 2);
            ctx.moveTo(originX, originY - spread / 2);
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.fillStyle = this.fillStyle;
            if (this.fill == true) {
                ctx.fill();
            }
            if (this.stroke == true) {
                ctx.stroke();
            }
            // this.endSpread = 2 * endY;
        }
        // For drawing a divergent rays which originate from the focus
        else if (this.type == 'divergent' && this.startX == this.focusPoint) {
            var endY = this.endSpread / 2;
            ctx.clearRect(1 * originX, originY - 1.0 * endY, 1.0 * endX, originY + 1.0 * endY);
            ctx.beginPath();
            ctx.moveTo(originX, originY);
            ctx.lineTo(endX, originY - endY);
            ctx.moveTo(endX, originY + endY);
            // ctx.lineTo(endX, originY + endY);
            ctx.lineTo(originX, originY);
            // ctx.lineTo(originX, originY - spread / 2);
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.fillStyle = this.fillStyle;
            if (this.fill == true) {
                ctx.fill();
            }
            if (this.stroke == true) {
                ctx.stroke();
            }
            // this.endSpread = 2 * endY;
        }
        else if (this.type == 'divergent' && this.startX != this.focusPoint) {
            var endY = Math.abs(endX - focusPoint) * ((spread / 2) / Math.abs(originX - focusPoint));
            ctx.clearRect(1 * originX, originY - 1.0 * spread / 2, 1.0 * endX, originY + 1.0 * spread / 2);
            ctx.beginPath();
            ctx.moveTo(originX, originY - spread / 2);
            ctx.lineTo(endX, originY - endY);
            ctx.moveTo(endX, originY + endY);
            // ctx.lineTo(endX, originY + endY);
            ctx.lineTo(originX, originY + spread / 2);
            // ctx.lineTo(originX, originY - spread / 2);
            ctx.moveTo(originX, originY - spread / 2);
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.fillStyle = this.fillStyle;
            if (this.fill == true) {
                ctx.fill();
            }
            if (this.stroke == true) {
                ctx.stroke();
            }
            // this.endSpread = 2 * endY;
        }
    }
    clearRect(ctx2D) {
        var originX = this.startX;
        var originY = this.startY;
        var spread = this.spread;
        var endX = this.endX;
        var ctx = ctx2D;
        ctx.clearRect(1 * originX, originY - 1.0 * spread / 2, 1.0 * endX, originY + 1.01 * spread / 2);
    }
}