# Playground for Dwitter animations

[Dwitter](https://www.dwitter.net) is a platform for creating JavaScript animations with just 140 characters. Because of this limitation, they have their own abbreviations for some functions:

* S for Math.sin
* C for Math.cos
* T for Math.tan
* R generates rgba-strings, for example: R(255, 255, 255, 0.5)
* c is the canvas element (1920x1080) 
* x is a 2D context for the canvas
* t is the elapsed time in seconds

This repo is for creating animations with the same syntax or experiencing and learning from the animations from other Dwitterers on the own machine.


## Starting
All you have to do is downloading or cloning this repo and opening the index.html file in your editor of choice. You can start right away by writing the function.

```js
const playground = document.querySelector("#playground");
const dwitter = new Dwitter(playground, {
    width: 1920,
    height: 1080,
    playing: true,

    u: (c, x, t, S, C, T, R) => {

        /* Your code for the animation */

    }
});
```

## Example
With the example code from Dwitter when you click the "New dweet" button:


```js
const dwitter = new Dwitter(playground, {
    width: 1920,
    height: 1080,
    playing: true,

    u: (c, x, t, S, C, T, R) => {

        /* Copypasted from Dwitter */
        c.width=1920; /* clear the canvas */
	for(i=0;i<9;i++)
        x.fillRect(400+i*100+S(t)*300, 400, 50, 200) /* draw 50x200 rects */

    }
});
```

## Setting a limit
Dwitter calls the function `u` 60 times per second in an infinite loop. When you want to set a limit for the number of times the funtion should be called, you can set the `limit` property:

```js
const dwitter = new Dwitter(playground, {
    width: 1920,
    height: 1080,
    playing: true,
    limit: 1000,

    u: (c, x, t, S, C, T, R) => {

        /* Your code for the animation */

    }
});
```
## Stopping and starting the animation
You can use the methods `startAnimation` and `stopAnimation` to customize your interaction with the animation. For example you could put a button under the canvas element and toggle the animation when the button is clicked.

HTML:
```html
<canvas id="playground"></canvas>
<button id="control">Start animation</button>
```
JavaScript:
```js
const playground = document.querySelector("#playground");
const control = document.querySelector("#control");
const dwitter = new Dwitter(playground, {
    width: 1920,
    height: 1080,
    playing: false,

    u: (c, x, t, S, C, T, R) => {

        /* Your code for the animation */

    }
});

control.addEventListener("click", function () {
    if (dwitter.playing) {
        dwitter.stopAnimation();
        this.innerHTML = "Continue animation";
    } else {
        dwitter.startAnimation();
        this.innerHTML = "Stop animation";
    }
});
```
## License

Dwitter Playground is free and open-sourced software licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl.html).
