
import { vec3 } from "gl-matrix"
import * as THREE from "three"
import { World, Box, RigidBody } from "trebuchet.js"

/// Scene setup

const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
  
const scene = new THREE.Scene();
  
const camera = new THREE.PerspectiveCamera(
  45,				// Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1,			 // Near plane
  10000			// Far plane
);
camera.position.set( 0, 15, 30 );
camera.lookAt( scene.position );

const geometry = new THREE.BoxGeometry( 5, 5, 5 );
const materialA = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
const materialB = new THREE.MeshLambertMaterial( { color: 0x0000FF } );
const meshA = new THREE.Mesh( geometry, materialA );
const meshB = new THREE.Mesh( geometry, materialB );
scene.add( meshA, meshB );
  
const light = new THREE.PointLight( 0xFFFF00 );
light.position.set( 10, 0, 10 );
scene.add( light );

const ambient = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambient );

renderer.setClearColor( 0xdddddd, 1);

const world = new World();

const cubeA = new RigidBody({
  position: vec3.fromValues(-5,0,5),
  shape: new Box(vec3.fromValues(1,1,1)),
  velocity: vec3.fromValues(1, 0, 0),
  world,
})

const cubeB = new RigidBody({
  position: vec3.fromValues(5,0,6),
  shape: new Box(vec3.fromValues(1,1,1)),
  velocity: vec3.fromValues(-1, 0, 0),
  world,
})

/// Main loop

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  world.update(clock.getDelta());
  meshA.position.x = cubeA.position[0];
  meshA.position.y = cubeA.position[1];
  meshA.position.z = cubeA.position[2];
  meshB.position.x = cubeB.position[0];
  meshB.position.y = cubeB.position[1];
  meshB.position.z = cubeB.position[2];
  renderer.render( scene, camera );
}

requestAnimationFrame(animate);

