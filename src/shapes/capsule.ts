
import * as interfaces from "../interfaces"

export class Capsule implements interfaces.Shape {

  constructor(public radius: number, public height: number, public margin = 0) {

  }

}

export default Capsule

