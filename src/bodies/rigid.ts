
import { vec3, quat } from "gl-matrix"
import * as interfaces from "../interfaces"

export class RigidBody implements interfaces.RigidBody {

  _position: vec3
  _velocity: vec3;
  _angularVelocity: quat;
  _rotation: quat;

  get position(): vec3 {
    return this._position;
  }

  set position(newPos: vec3) {
    vec3.copy(this._position, newPos);
  }

  get velocity(): vec3 {
    return this._velocity;
  }

  set velocity(newVel: vec3) {
    vec3.copy(this.velocity, newVel);
  }

  get rotation(): quat {
    return this._rotation;
  }

  set rotation(newRot: quat) {
    quat.copy(this._rotation, newRot);
  }

  mass: number
  friction: number;
  restitution: number;
  shape: interfaces.Shape; 
  linearFactor: vec3;
  angularFactor: vec3;

  totalForce: vec3 = vec3.create();
  totalTorque: vec3 = vec3.create();

  constructor(options: interfaces.RigidBodyOptions) {
    this.mass = options.mass !== undefined ? options.mass : 0;
    this._position = options.position || vec3.create();
    this._velocity = options.velocity || vec3.create();
    this._rotation = options.rotation || vec3.create();

    if (options.world !== undefined)
      options.world.addRigidBody(this);
  }

  applyImpulse(impulse: vec3, relPos = [0,0,0]): this {
    console.error(`applying impulse to a body is currently not supported`);
    return this;   
  }

}

export default RigidBody
