
export interface RigidBodyOptions {
  position?: [number,number,number];
  velocity?: [number,number,number];
  angularFactor?: [number,number,number];
  mass?: number
  friction?: number
  restitution?: number
  linearDamping?: number
  angularDamping?: number
  gravity?: [number,number,number];
  shape: Shape
}

export interface RigidBody {
  shape: Shape;
  position: [number,number,number];
  velocity: [number,number,number];
  angularFactor: [number,number,number];
  mass: number;
  friction: number;
  restitution: number;
  linearDamping: number;
  angularDamping: number;
  gravity: [number,number,number];
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
}

export interface World {
  addRigidBody(body: RigidBody): Promise<void>
  removeRigidBody(shape: Shape): Promise<void>
  addSoftBody(body: SoftBody): Promise<void>
  removeSoftBody(body: SoftBody): Promise<void>
}

