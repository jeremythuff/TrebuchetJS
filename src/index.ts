
import { Counter } from "./util"
import * as interfaces from "./interfaces"
import { Vec3Like, Vec3, Vec3Operations } from "lineal/vec3"
import { Quat, QuatOperations } from "lineal/quat"

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor).forEach(name => {
      derivedCtor.prototype[name] = baseCtor[name];
    });
  });
}

export let AmmoInstance;

export class World implements interfaces.World {

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
    const btGravity = new AmmoInstance.btVector3(newGravity[0], newGravity[1], newGravity[2]);
    this.btDynamicsWorld.setGravity(btGravity);
    AmmoInstance.destroy(btGravity);
  }

  constructor(options: interfaces.WorldOptions) {
    this.btCollisionConfiguration = new AmmoInstance.btDefaultCollisionConfiguration();
    this.btDispatcher = new AmmoInstance.btCollisionDispatcher(this.btCollisionConfiguration);
    this.btOverlappingPairCache = new AmmoInstance.btDbvtBroadphase();
    this.btSolver = new AmmoInstance.btSequentialImpulseConstraintSolver();
    this.btDynamicsWorld = new AmmoInstance.btDiscreteDynamicsWorld(this.btDispatcher, this.btOverlappingPairCache, this.btSolver, this.btCollisionConfiguration);

    const gravity = options.gravity 
      ? new AmmoInstance.btVector3(options.gravity[0], options.gravity[1], options.gravity[2])
      : new AmmoInstance.btVector3(0, -10, 0)
    this.btDynamicsWorld.setGravity(gravity);
    AmmoInstance.destroy(gravity);
  }

  addRigidBody(body: RigidBody) {
    this.btDynamicsWorld.addRigidBody(body.btBody);
    return this;
  }

  removeRigidBody(body: RigidBody) {
    this.btDynamicsWorld.removeRigidBody(body.btBody);
    return this;
  }

  addSoftBody(body: interfaces.SoftBody) {
    console.error(`Adding and removing soft bodies is currently not supported.`);
    return this;
  }

  removeSoftBody(body: interfaces.SoftBody) {
    console.error(`Adding and removing soft bodies is currently not supported.`);
    return this;
  }

  update(delta: number, maxNumSteps = 1) {
    this.btDynamicsWorld.stepSimulation(delta, maxNumSteps);
  }

  destroy() {
    AmmoInstance.destroy(this.btCollisionConfiguration);
    AmmoInstance.destroy(this.btDispatcher);
    AmmoInstance.destroy(this.btOverlappingPairCache);
    AmmoInstance.destroy(this.btSolver);
    AmmoInstance.destroy(this.btDynamicsWorld);
  }

}

export interface Shape extends interfaces.Shape {
  btShape;
}

export class Capsule implements Shape, interfaces.Capsule {

  btShape;

  get margin(): number {
    return this.btShape.getMargin();
  }

  set margin(newMargin: number) {
    this.btShape.setMargin(newMargin);
  }

  constructor(public radius: number, public height: number) {
    this.btShape = new AmmoInstance.btCapsuleShape(radius, height);   
  }

  destroy() {
    AmmoInstance.destroy(this.btShape);
  }

}

export class Plane implements Shape, interfaces.Plane {

  btShape;

  get margin(): number {
    return this.btShape.getMargin();
  }

  set margin(newMargin: number) {
    this.btShape.setMargin(newMargin);
  }

  constructor(public normal: [number,number,number], public offset: number) {
    const btNormal = new AmmoInstance.btVector3(normal[0], normal[1], normal[2]);
    this.btShape = new AmmoInstance.btPlaneShape(btNormal, offset);
    AmmoInstance.destory(btNormal);
  }

  destroy() { 
    AmmoInstance.destroy(this.btShape);
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

  constructor(public radius: number) {
    this.btShape = new AmmoInstance.btSphereShape(radius);
  }

  destroy() {
    AmmoInstance.destroy(this.btShape);
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
    const btSize = new AmmoInstance.btVector3(size[0], size[1], size[2]);
    this.btShape = new AmmoInstance.btBoxShape(btSize);
    AmmoInstance.destroy(btSize);
  }

  destroy() {
    AmmoInstance.destroy(this.btShape);
  }

}

export interface RigidBodyOptions extends interfaces.RigidBodyOptions {
  shape: Shape;
  world?: World;
}

class BtVector3 {

  btVec;

  constructor(btVec = null) {
    if (btVec !== null)
      this.btVec = btVec;
  }

  get 0() { return this.btVec.x(); }
  get 1() { return this.btVec.y(); }
  get 2() { return this.btVec.z(); }

  set 0(newX) { this.btVec.setX(newX); }
  set 1(newY) { this.btVec.setY(newY); }
  set 2(newZ) { this.btVec.setZ(newZ); }

  get length() {
    return 3;
  }

  get x() { return this.btVec.x(); }
  get y() { return this.btVec.y(); }
  get z() { return this.btVec.z(); }

  set x(newX) { this.btVec.setX(newX); }
  set y(newY) { this.btVec.setY(newY); }
  set z(newZ) { this.btVec.setZ(newZ); }

  //set: (x: number, y: number, z: number) => this;
  //add: (v: Vec3Like) => this;
  //mul: (v: Vec3Like) => this;
  //sub: (v: Vec3Like) => this;
  //cross: (v: Vec3Like) => this;
  //dot: (v: Vec3Like) => number;
  //scale: (a: number) => this;
  //negate: () => this;
  //maxVal: () => number;
  //round: () => this;
  //floor: () => this;
  //ceil: () => this;
  //normalize: () => this;
  //magnitude: () => number;
  //getLength: () => number;
  //clone: () => Vec3
  //copy: (v: Vec3Like) => this;
  //max: (v: Vec3Like) => this;
  //reflect: (normal: Vec3Like) => this;
  //rotate: (axis: Vec3Like, angle: number) => this;

}

applyMixins(BtVector3, [Vec3Operations]);

class BtQuaternion {

  constructor(public btQuat) {
    
  }

  get 0(): number { return this.btQuat.x(); } 
  get 1(): number { return this.btQuat.y(); } 
  get 2(): number { return this.btQuat.z(); } 
  get 3(): number { return this.btQuat.w(); } 

  set 0(newA: number) { this.btQuat.setX(newA); }
  set 1(newB: number) { this.btQuat.setY(newB); }
  set 2(newC: number) { this.btQuat.setZ(newC); }
  set 3(newD: number) { this.btQuat.setW(newD); }

  get a(): number { return this.btQuat.x(); } 
  get b(): number { return this.btQuat.y(); } 
  get c(): number { return this.btQuat.z(); } 
  get d(): number { return this.btQuat.w(); } 

  set a(newA: number) { this.btQuat.setX(newA); }
  set b(newB: number) { this.btQuat.setY(newB); }
  set c(newC: number) { this.btQuat.setZ(newC); }
  set d(newD: number) { this.btQuat.setW(newD); }

}

applyMixins(BtQuaternion, [QuatOperations]);

class BtMotionStatePosition {

  get 0() { return this.getBtVec3().x(); }
  get 1() { return this.getBtVec3().y(); }
  get 2() { return this.getBtVec3().z(); }

  get x() { return this.getBtVec3().x(); }
  get y() { return this.getBtVec3().y(); }
  get z() { return this.getBtVec3().z(); }

  btVec;

  // used as a cache for loading and storing the origin
  btTransform = new AmmoInstance.btTransform();

  getBtVec3() {
    this.btMotionState.getWorldTransform(this.btTransform)
    return this.btTransform.getOrigin();
  }

  setBtVec3(btVec) {
    console.error(`setting a world transformation matrix is currently not possible.`);
  }

  constructor(public btMotionState) {

  }

}

applyMixins(BtMotionStatePosition, [Vec3Operations]);

export class RigidBody implements interfaces.RigidBody {

  btBody;
  btMotionState;

  _position: BtMotionStatePosition;
  _rotation: BtQuaternion;
  _velocity: BtVector3;

  get position(): Vec3 {
    return this._position;
  }

  set position(newPos: [number,number,number]) {
    this._position.copy(newPos);
  }   

  get velocity(): Vec3 {
    return this._velocity;
  }

  set velocity(newVel: [number,number,number]) {
    this._velocity.copy(newVel);
  }

  set angularFactor(newFactors) {
    const btFactors = new AmmoInstance.btVector3(newFactors[0], newFactors[1], newFactors[2]);
    this.btBody.setAngularFactor(btFactors);
    AmmoInstance.destroy(btFactors);
  }

  // FIXME: this is temporary until ammo.js adds the getter
  get friction(): number {
    return this._friction;
  }

  _friction: number;

  set friction(newFriction: number) {
    this.btBody.setFriction(newFriction);
    this._friction = newFriction;
  }

  _restitution: number;

  // FIXME: this is temporary until ammo.js adds the getter
  get restitution(): number {
    return this._restitution;   
  }

  set restitution(newRestitution: number) {
    this.btBody.setRestitution(newRestitution);
    this._restitution = newRestitution;
  }

  _mass: number;

  get mass() {
    return this._mass;
  }

  shape: Shape

  constructor(options: RigidBodyOptions) {

    if (options.shape === undefined)
      throw new Error(`could not create rigid body: no shape defined`);

    const mass = this._mass = options.mass !== undefined ? options.mass : 1;

    const position = options.position !== undefined 
      ? new AmmoInstance.btVector3(options.position[0], options.position[1], options.position[2]) 
      : new AmmoInstance.btVector3(0,0,0);
    const rotation = options.rotation !== undefined
      ? new AmmoInstance.btQuaternion(options.rotation[0], options.rotation[1], options.rotation[2], options.rotation[3])
      : new AmmoInstance.btQuaternion(0.0, 0.0, 0.0, 0.1)
    this.shape = options.shape;
      
    const startTransform = new AmmoInstance.btTransform();
    startTransform.setIdentity();
    startTransform.setOrigin(position);
    startTransform.setRotation(rotation);
    AmmoInstance.destroy(position);
    AmmoInstance.destroy(rotation);
    const localInertia = new AmmoInstance.btVector3(0, 0, 0);
    this.shape.btShape.calculateLocalInertia(mass, localInertia);
    
    this.btMotionState = new AmmoInstance.btDefaultMotionState(startTransform);
    this._position = new BtMotionStatePosition(this.btMotionState);
    //this.btMotionState = new BtMotionState(this._position, this._rotation);
    const rbInfo = new AmmoInstance.btRigidBodyConstructionInfo(mass, this.btMotionState, this.shape.btShape, localInertia);
    this.btBody = new AmmoInstance.btRigidBody(rbInfo);
    AmmoInstance.destroy(rbInfo);
    
    this._velocity = new BtVector3(this.btBody.getLinearVelocity());

    if (options.friction !== undefined)
      this.friction = options.friction;
    if (options.restitution !== undefined)
      this.restitution = options.restitution;
    if (options.angularFactor !== undefined)
      this.angularFactor = options.angularFactor;

    if (options.world !== undefined)
      options.world.btDynamicsWorld.addRigidBody(this.btBody);

  }

  applyImpulse(impulse: [number,number,number], relPos = [0,0,0]) {
    const impulseVec = new AmmoInstance.btVector3(impulse[0], impulse[1], impulse[2]);
    const relPosVec = new AmmoInstance.btVector3(relPos[0], relPos[1], relPos[2]);
    this.btBody.applyImpulse(impulseVec, relPosVec);
    AmmoInstance.destroy(impulseVec);
    AmmoInstance.destroy(relPosVec);
  }

  setWorld(world: World) {
    world.btDynamicsWorld.addRigidBody(this.btBody);
  }

  destroy() {
    AmmoInstance.destroy(this.btMotionState);
    AmmoInstance.destroy(this.btBody);
  }

}

