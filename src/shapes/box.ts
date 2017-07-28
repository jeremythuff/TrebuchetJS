
import { vec3 } from "gl-matrix"
import { Shape } from "../interfaces"

export class Box implements Shape {

  constructor(public size: vec3, public margin = 0) {
    
  }

}

export default Box

