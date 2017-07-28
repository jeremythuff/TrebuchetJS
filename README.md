TrebuchetJS
===========

TrebuchetJS is a new physics engine for the web, currently powered
behind-the-scenes by [AmmoJS](https://github.com/kripken/ammo.js), which in
turn is a direct port of the [BulletJS physics engine](https://github.com/bulletphysics/bullet3).

:warning: This library is under construction. Parts of the API might still not work or not work as expected.

This library was created as an alternative to the relatively biased
[PhysiJS](http://chandlerprall.github.io/Physijs/) physics engine, which
provides somewhat similar behaviour but is tightly integrated with ThreeJS.

## Features
 
 - **Elegant and simple API:** much work went into making the API as easy to
   use as possible, while at the same time not giving back on flexibility and
   performance.
 - **TypeScript integration:** allowing you to fix many common mistakes before
   the code is even run
 - **Multithreaded:** if available, TrebuchetJS will use Web Workers to
   distribute load
 - **Performance-oriented:** try to get the maximum performance out of
   JavaScript's engine
 - **Unbiased:** do not make any assumptions about the rendering engine that is
   used

## Example

Directly importing the library will give you access to all of the components
for building your own simulation.

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

If you would like to create a worker, paste the following code somewhere where
your browser has access to it:

**myphysics.worker.js**
```ts
import "trebuchet.js/worker/register"
```

Next, spawn a new worker in the main thread and make the client point towards it:

**mygame.js**
```ts
import * as TREBU from "trebuchet.js/client"

// make sure your browser has access to the following resource
const worker = new Worker('myphysics.worker.js');

TREBU.setDefaultWorker(worker);

const world = new TREBU.World({ gravity: /** ... */ });

// ...

```

Alternatively, you can pass the worker as an option while creating a new object
through the `worker` attribute.

