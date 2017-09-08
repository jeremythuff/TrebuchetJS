TrebuchetJS
===========

<img width="100" src="https://raw.githubusercontent.com/CuboidGame/trebuchet.js/master/trebuchet.png" />

TrebuchetJS is a new physics engine for the web, created from the ground up to
cover a wide range of use-cases with a focus on speed and ease of use.

TrebuchetJS aims to be a viable alternative for the following libraries:

- [cannon.js](https://github.com/schteppe/cannon.js)
- [ammo.js](https://github.com/kripken/ammo.js)
- [PhysiJS](http://chandlerprall.github.io/Physijs/)

It was heavily inspired by the [Bullet physics engine](https://githbub.com/bullet/bullet3).

:warning: This library is under construction. Parts of the API might still not work or not work as expected.

## Features

 - **Lightweight:** by being fully modular, you can only include what you need,
   thus reducing code size
 - **Elegant and simple API:** much work went into making the API as easy to
   use as possible, while at the same time not giving back on flexibility and
   performance.
 - **TypeScript integration:** allowing you to fix many common mistakes before
   the code is even run
 - **Performance-oriented:** try to get the maximum performance out of
   JavaScript's engine, by supporting web workers and eventually the
   [GPU](https://github.com/gpujs/gpu.js)
 - **Unbiased:** do not make any assumptions about the rendering engine that is
   used

## Usage

Directly importing the library will give you access to all of the high-level
components for building your own simulation.

```ts
import { World, RigidBody, Box, Sphere } from "trebuchet.js"

const world = new World({ gravity: [0,-10,0] });

const ground = new RigidBody({
  position: [0,-3,0],
  shape: new Box([50,1,50])
});

const b1 = new RigidBody({
  shape: new Box([1,1,1]),
  position: [1,5,1],
  restitution: 0.5,
  world
})
```

These components transparently defer work to an actual implementation of the
physics engine, be it the GPU or a worker thread.

### Using Web Workers

If you would like to support threaded execution using a web worker, paste the
following code somewhere where your browser has access to it:

**myphysics.worker.js**
```ts
import "trebuchet.js/worker/register"
```

Next, spawn a new worker in the main thread and make the client point towards it:

**mygame.js**
```ts
import Trebuchet from "trebuchet.js"

// make sure your browser has access to the following resource
const myWorker = new Worker('myphysics.worker.js');

const TREBU = new Trebuchet(myWorker);

const world = new TREBU.World({ gravity: /** ... */ });

// ...

```

Alternatively, you can pass the worker as an option while creating a new object
through the `engine` attribute.

