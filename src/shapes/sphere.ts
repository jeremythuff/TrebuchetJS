
import { Shape } from "../interfaces"

export class Sphere implements Shape {

  constructor(public radius: number, public margin = 0) {
    
  }

}

export default Sphere

