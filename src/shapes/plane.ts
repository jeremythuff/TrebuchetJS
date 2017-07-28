
import { vec3 } from "gl-matrix"
import * as interfaces from "../interfaces"

export class Plane implements interfaces.Shape {
  
  constructor(public normal: vec3, public offset: number, public margin = 0) {
    
  }

}

