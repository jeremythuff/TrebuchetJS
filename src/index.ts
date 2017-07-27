
import { Counter } from "./util"
import * as interfaces from "./interfaces"

declare const Ammo;

let ammo = Ammo();

export class World {

  btCollisionConfiguration
  btDispatcher
  btOverlappingPairCache 
  btSolver
  btDynamicsWorld

  get gravity() {
    const g = this.btDynamicsWorld.get_m_gravity();
    return [g.x(), g.y(), g.z()];
    // FIXME: should I deallocate this vector?
  }

  set gravity(newGravity: [number,number,number]) {
    const btGravity = new ammo.btVector3(newGravity[0], newGravity[1], newGravity[2]);
    this.btDynamicsWorld.setGravity(btGravity);
    ammo.destroy(btGravity);
  }

  constructor(options: interfaces.WorldOptions) {
    this.btCollisionConfiguration = new ammo.btDefaultCollisionConfiguration();
    this.btDispatcher = new ammo.btCollisionDispatcher(this.btCollisionConfiguration);
    this.btOverlappingPairCache = new ammo.btDbvtBroadphase();
    this.btSolver = new ammo.btSequentialImpulseConstraintSolver();
    this.btDynamicsWorld = new ammo.btDiscreteDynamicsWorld(this.btDispatcher, this.btOverlappingPairCache, this.btSolver, this.btCollisionConfiguration);

    const gravity = options.gravity 
      ? new ammo.btVector3(options.gravity[0], options.gravity[1], options.gravity[2])
      : new ammo.btVector3(0, -10, 0)
    this.btDynamicsWorld.setGravity(gravity);
    ammo.destroy(gravity);

    ammo.destroy(gravity);
  }

  destroy() {
    ammo.destroy(this.btCollisionConfiguration);
    ammo.destroy(this.btDispatcher);
    ammo.destroy(this.btOverlappingPairCache);
    ammo.destroy(this.btSolver);
    ammo.destroy(this.btDynamicsWorld);
  }

}

export interface Shape extends interfaces.Shape {
  btShape;
}

export class Plane implements Shape, interfaces.Plane {

  btShape;

  get margin(): number {
    return this.btShape.getMargin();
  }

  set margin(newMargin: number) {
    this.btShape.setMargin(newMargin);
  }

  constructor(distance: [number,number,number], offset: number) {
    const btDistance = new ammo.btVector3(distance[0], distance[1], distance[2]);
    this.btShape = new ammo.btPlaneShape(btDistance, offset);
    ammo.destory(btDistance);
  }

  destroy() { 
    ammo.destroy(this.btShape);
  }

}

export class Sphere implements Shape, interfaces.Sphere {

  btShape;

  get margin(): number {
    return this.btShape.getMargin();
  }

  set margin(newMargin: number) {
    this.btShape.setMargin(newMargin);
  }

  constructor(radius: number) {
    this.btShape = new ammo.btSphereShape(radius);
  }

  destroy() {
    ammo.destroy(this.btShape);
  }

}

export class Box implements Shape, interfaces.Box {

  btShape;

  get margin(): number {
    return this.btShape.getMargin();
  }

  set margin(newMargin: number) {
    this.btShape.setMargin(newMargin);
  }

  constructor(public size: [number,number,number]) {
    const btSize = new ammo.btVector3(size[0], size[1], size[2]);
    this.btShape = new ammo.btBoxShape(btSize);
    ammo.destroy(btSize);
  }

  destroy() {
    ammo.destroy(this.btShape);
  }

}

export interface RigidBodyOptions extends interfaces.RigidBodyOptions {
  shape: Shape;
}

export class RigidBody {

  btBody;
  btMotionState;

  constructor(options: RigidBodyOptions) {

    if (options.shape === undefined)
      throw new Error(`could not create rigid body: no shape defined`);

    const mass = options.mass || 1;
    const position = options.position !== undefined 
      ? new ammo.btVector3(options.position[0], options.position[1], options.position[2]) 
      : new ammo.btVector3(0,0,0);
    const shape = options.shape;
      
    const startTransform = new ammo.btTransform();
    startTransform.setIdentity();
    const localInertia = new ammo.btVector3(0, 0, 0);
    shape.btShape.calculateLocalInertia(mass, localInertia);

    this.btMotionState = new ammo.btDefaultMotionState(startTransform);
    const rbInfo = new ammo.btRigidBodyConstructionInfo(mass, this.btMotionState, shape.btShape, localInertia);
    this.btBody = new ammo.btRigidBody(rbInfo);
    ammo.destroy(rbInfo);

  }

  setWorld(world: World) {
    world.btDynamicsWorld.addRigidBody(this.btBody);
  }

  destroy() {
    ammo.destroy(this.btMotionState);
    ammo.destroy(this.btBody);
  }

}

