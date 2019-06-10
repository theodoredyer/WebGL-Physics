/**
 * Specifies a Camera that can Dolly/Truck and Tilt/Pan.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Camera {
  /**
   * Constructor for Camera.
   *
   * @constructor
   * @returns {Camera} Camera object created
   */
  constructor(shader) {
    this.speed = 0.3;
    // Camera view attributes
    this.eye = new Vector3([22, 4, -3]);
    this.center = new Vector3([-16, 4, -3]);
    this.up = new Vector3([0, 1, 0]);
    
    this.animationStack = [];
    this.animationStack.push([0,0,-8]);
    this.animationStack.push([-25,0,0]);
    this.animationStack.push([-10,-9,-6]);

    this.z = 8;
    this.canRotate = 1;
    //camera animation data - includes
    this.time = 1 / 60;

    this.animating = 0;
    this.startPosEye = new Vector3(this.eye.elements);
    this.endPosEye = new Vector3([0, 0, -this.z]);
    this.endPosEye = this.endPosEye.add(this.startPosEye);

    this.startPosCenter = new Vector3(this.center.elements);
    this.endPosCenter = new Vector3([0, 0, -this.z]);
    this.endPosCenter = this.endPosCenter.add(this.startPosCenter);
    this.duration = 1;

    //camera movementand projection
    this.viewMatrix = new Matrix4();
    this.rotationMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.projectionMatrix.setPerspective(
      45,
      window.innerWidth / window.innerHeight,
      0.5,
      80
    );
    this.updateView();
  }

  truck(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    // Scale the u axis to the desired distance to move
    u = u.mul(dir * this.speed);

    // Add the direction vector to both the eye and center positions
    this.eye = this.eye.add(u);
    this.center = this.center.add(u);

    this.updateView();
  }
  dolley(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    // Scale the u axis to the desired distance to move
    n = n.mul(dir * this.speed);

    // Add the direction vector to both the eye and center positions
    this.eye = this.eye.add(n);
    this.center = this.center.add(n);

    this.updateView();
  }
  pan(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    var v = this.up.normalize();
    var originCenter = this.center.sub(this.eye);

    this.rotationMatrix.setRotate(
      -dir * 0.9,
      v.elements[0],
      v.elements[1],
      v.elements[2]
    );
    var rotatedCenter = this.rotationMatrix.multiplyVector3(originCenter);

    this.center = rotatedCenter.add(this.eye);
    this.updateView();
  }
  tilt(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    var bigVec = new Vector3([0, -0.1 * dir, 0.0]);
    this.center = this.center.add(bigVec);

    this.updateView();
  }
  zoom(dir) {
    // Calculate the n camera axis
    var n = this.eye.sub(this.center);
    n = n.normalize();

    // Calculate the u camera axis
    var u = this.up.cross(n);
    u = u.normalize();

    //var bigVec = new Vector3([0, 0.0, ]);

    this.projectionMatrix.setPerspective(30, 1, 0.5, 100 - dir);
  }
  /**
   * Animates the camera along a line using linear interpolation 
   * 
   * Starts at @eye ends at specified point
   */
  updateAnimation(){
    this.time+= .008;
    if(this.time >=this.duration){
      this.resetAnimation(120,0);
    }else{
      var eyeProgress = this.endPosEye.sub(this.startPosEye).mul(this.time).add(this.startPosEye);
      var centerProgress = this.endPosCenter.sub(this.startPosCenter).mul(this.time).add(this.startPosCenter);
      this.eye = eyeProgress;
      this.center = centerProgress;
      this.updateView();
    }


  }
  //Specifies direction for next animation
  resetAnimation(forward,right){
    this.animating = 0;
      this.time = 0;
      this.startPosEye = new Vector3(this.eye.elements);
      this.endPosEye = new Vector3([-forward, 0, -right]);
      this.endPosEye = this.endPosEye.add(this.startPosEye);
  
      this.startPosCenter = new Vector3(this.center.elements);
      this.endPosCenter = new Vector3([-forward, 0, -right]);
      this.endPosCenter = this.endPosCenter.add(this.startPosCenter);
  }
  updateView() {
    this.viewMatrix.setLookAt(
      this.eye.elements[0],
      this.eye.elements[1],
      this.eye.elements[2],
      this.center.elements[0],
      this.center.elements[1],
      this.center.elements[2],
      this.up.elements[0],
      this.up.elements[1],
      this.up.elements[2]
    );
  }
}
