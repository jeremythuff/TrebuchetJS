
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
camera.position.set( -15, 10, 10 );
camera.lookAt( scene.position );

const geometry = new THREE.BoxGeometry( 5, 5, 5 );
const material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
  
const light = new THREE.PointLight( 0xFFFF00 );
light.position.set( 10, 0, 10 );
scene.add( light );
  
renderer.setClearColor( 0xdddddd, 1);

const world = new World();

const cube = new RigidBody({
  shape: new Box(vec3.fromValues(1,1,1)),
  velocity: vec3.fromValues(0.2, 0, 0.2),
  world,
})

/// Main loop

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  world.update(clock.getDelta());
  mesh.position.x = cube.position[0];
  mesh.position.y = cube.position[1];
  mesh.position.z = cube.position[2];
  renderer.render( scene, camera );
}

requestAnimationFrame(animate);

