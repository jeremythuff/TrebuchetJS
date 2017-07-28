
import Vec3 from "lineal/vec3"
import Quat from "lineal/quat"

export interface RigidBodyOptions {
  position?: [number,number,number];
  rotation?: [number,number,number,number];
  velocity?: [number,number,number];
  angularFactor?: [number,number,number];
  mass?: number
  friction?: number
  restitution?: number
	linearDamping?: number
	angularDamping?: number
  gravity?: [number,number,number];
  world?: World,
  worker?: Worker;
  shape: Shape
}

export interface RigidBody {
  shape: Shape;
  position: Vec3;
  rotation: Quat;
  velocity: Vec3;
  angularFactor: Vec3;
  mass: number;
  friction: number;
  restitution: number;

  applyImpulse(impulse: [number,number,number], relPos?: [number,number,number]): this;
  //linearDamping: number;
  //angularDamping: number;
  //gravity: [number,number,number];
}

export interface SoftBodyOptions {
  // TODO
}

export interface SoftBody {
  // TODO
}

export interface Shape {
  margin: number;
}

export interface BoxConstructor {
  new (size: [number,number,number]): Box;
}

export interface Box extends Shape {
  size: [number,number,number];
}

export interface CapsuleConstructor {
  new (radius: number, height: number): Capsule;
}

export interface Capsule extends Shape {
  radius: number;
  height: number;
}

export interface SphereConstructor {
  new (radius: number): Sphere
}

export interface Sphere extends Shape {
  radius: number
}

export interface PlaneConstructor {
  new (normal: [number,number,number], offset: number): Plane;
}

export interface Plane extends Shape {
  normal: [number,number,number];
  offset: number;
}

export interface WorldOptions {
  gravity?: [number,number,number];
  worker?: Worker
}

export interface World {
  addRigidBody(body: RigidBody): this
  removeRigidBody(shape: Shape): this
  addSoftBody(body: SoftBody): this
  removeSoftBody(body: SoftBody): this
}

