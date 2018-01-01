class Dwitter {
    constructor(canvas, options = []) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.limit = options.limit;
        this.playing = !!options.playing;
        this.u = options.u;
        this._time = 0;
        this._frame = 0;
        
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
        this.R = (r = 0, g = 0, b = 0, a = 1) => `rgba(${r}, ${g}, ${b}, ${a})`;
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
        if (this.playing && (this.limit === undefined || this.limit > this._frame)) {
            this._time = this._frame / 60;
            
            if (this._time * 60 | 0 == this._frame - 1) {
                this._time += 0.000001;
            }

            this._frame++;

            this.u(this.canvas, this.context, this._time, this.S, this.C, this.T, this.R);
            window.requestAnimationFrame(this._loop.bind(this, this.u));
        }
    }
}