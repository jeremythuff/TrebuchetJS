TrebuchetJS
===========

TrebuchetJS is a physics engine consolidation library that allows swapping of
your favorite physics engine without any code modification. Additionally,
TrebuchetJS natively supports web workers, allowing high-performance physics
simulations without blocking the UI.

## Features

 - **Performance-oriented:** make messages between the worker and the main thread as small as possible
 - **Unbiased:** do not make any assumptions about the rendering engine you that is used

## Example

**trebuchet-ammojs.worker.js**
```ts
import AmmoWorker from "trebuchet.js/ammo"

const myWorker = new AmmoWorker(postMessage);

onmessage = myWorker.onmessage;
```

**main.js**
```ts
import * as TREBUCHET from "trebuchet.js"

const myWorker = new Worker('trebuchet-ammojs.worker.js');

const simulator = new TREBUCHET.Simulator(myWorker);

const myWorld = simulator.addWorld();

myWorld.addShape(new Sphere(5));

```
