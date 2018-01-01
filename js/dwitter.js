class Dwitter {
    constructor(canvas, options = []) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.limit = options.limit;
        this.playing = !!options.playing;
        this.u = options.u;
        this.time = 0;
        this.frame = 0;
        
        this._setDimensions(options.width, options.height);
        this._setShortFunctions();

        if (this.playing) {
            this.playing = false;
            this.startAnimation();
        }
    }

    _setDimensions(width, height) {
        this.canvas.width = width || this.canvas.offsetWidth;
        this.canvas.height = height || this.canvas.offsetHeight;
    }

    _setShortFunctions() {
        this.S = Math.sin;
        this.C = Math.cos;
        this.T = Math.tan;
        this.R = (r, g, b, a = 1) => `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    startAnimation() {
        if (!this.playing) {
            this.playing = true;
            this._loop();
        }
    }

    stopAnimation() {
        this.playing = false;
    }

    _loop() {
        if (this.playing && (this.limit === undefined || this.limit > this.frame)) {
            this.time = this.frame / 60;
            
            if (this.time * 60 | 0 == this.frame - 1) {
                this.time += 0.000001;
            }

            this.frame++;

            this.u(this.canvas, this.context, this.time, this.S, this.C, this.T, this.R);
            window.requestAnimationFrame(this._loop.bind(this, this.u));
        }
    }
}