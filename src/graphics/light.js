class Light {
  constructor(x, y, z) {
    this.pos = new Vector3();
    // light colors
    this.ambient = [0.4, 0.4, 0.4];
    this.diffuse = [0.7, 0.7, 0.7];
    this.specular = [1.0, 1.0, 1.0];
    this.rotationMatrix = new Matrix4();
    this.rotationMatrix.setRotate(0.05, 1, 0, 0);
    this.translationMatrix = new Matrix4();
    this.translationMatrix.setTranslate(x, y, z);
    this.pos = this.translationMatrix.multiplyVector3(this.pos);
    // Later you will add specular here too.
  }
  orbit() {
    this.pos = this.rotationMatrix.multiplyVector3(this.pos);
  }
}
