
import { vec3, vec2 } from "gl-matrix"
import { RigidBody } from "./bodies/rigid"
import * as interfaces from "./interfaces"
import { pull } from "./util"

export class World implements interfaces.World {

  gravity: vec3

  constructor(options: interfaces.WorldOptions) {
    this.gravity = options.gravity || vec3.create();
  }

  rigidBodies: RigidBody[] = []

  update(dt: number, maxSteps: number) {
    const dGVel = vec3.clone(this.gravity);
    vec3.scale(dGVel, dGVel, dt);     
    for (const body of this.rigidBodies) {
      const dVel = vec3.clone(body.totalForce);
      vec3.scale(dVel, dVel, 1 / body.mass);
      vec3.scale(dVel, dVel, dt);
      vec3.add(body.velocity, body.velocity, dVel);
      vec3.add(body.velocity, body.velocity, dGVel);
      const dPos = vec3.clone(body.velocity);
      vec3.scale(dPos, dPos, dt);
      vec3.add(body.position, body.position, dPos);
    }
  }

  addRigidBody(body: RigidBody) {
    this.rigidBodies.push(body);
    return this;
  }

  removeRigidBody(body: RigidBody) {
    pull(this.rigidBodies, body);
    return this;
  }

}

export default World

