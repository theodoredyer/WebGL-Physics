class Sphere extends Geometry {
  /**
   * Constructor for Sphere.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Sphere} Sphere created
   */
  constructor(shader, segments, x, y, z) {
    super(shader);
    this.x = x;
    // Random start velocity 
    this.xvel = Math.random() - 0.5;
    this.y = y;
    this.yvel = 0.5;
    this.z = z;
    // Random start velocity
    this.zvel = Math.random() - 0.5;
    this.accel = -0.015;
    this.vertices = this.generateSphereVertices(segments);
    this.transformMatrix = new Matrix4();
    this.transformMatrix.setTranslate(this.x, this.y, this.z);
    this.modelMatrix = this.modelMatrix.multiply(this.transformMatrix);
    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
    this.interleaveVertices();
  }

  generateSphereVertices(segments) {
    var outerVerts = [];

    // Generate coordinates
    for (var j = 0; j <= segments; j++) {
      var aj = (j * Math.PI) / segments;
      var sj = Math.sin(aj);
      var cj = Math.cos(aj);
      for (var i = 0; i <= segments; i++) {
        var ai = (i * 2 * Math.PI) / segments;
        var si = Math.sin(ai);
        var ci = Math.cos(ai);

        outerVerts.push({ x: si * sj, y: cj, z: ci * sj });
      }
    }

    var vertices = [];

    // Generate vertices
    for (var j = 0; j < segments; j++) {
      for (var i = 0; i < segments; i++) {
        var p1 = j * (segments + 1) + i;
        var p2 = p1 + (segments + 1);

        var vertex0 = new Vertex(
          outerVerts[p1].x,
          outerVerts[p1].y,
          outerVerts[p1].z
        );
        vertex0.normal.elements[0] = outerVerts[p1].x;
        vertex0.normal.elements[1] = outerVerts[p1].y;
        vertex0.normal.elements[2] = outerVerts[p1].z;

        var vertex1 = new Vertex(
          outerVerts[p2].x,
          outerVerts[p2].y,
          outerVerts[p2].z
        );
        vertex1.normal.elements[0] = outerVerts[p2].x;
        vertex1.normal.elements[1] = outerVerts[p2].y;
        vertex1.normal.elements[2] = outerVerts[p2].z;

        var vertex2 = new Vertex(
          outerVerts[p1 + 1].x,
          outerVerts[p1 + 1].y,
          outerVerts[p1 + 1].z
        );
        vertex2.normal.elements[0] = outerVerts[p1 + 1].x;
        vertex2.normal.elements[1] = outerVerts[p1 + 1].y;
        vertex2.normal.elements[2] = outerVerts[p1 + 1].z;

        vertices.push(vertex0, vertex1, vertex2);

        var vertex3 = new Vertex(
          outerVerts[p1 + 1].x,
          outerVerts[p1 + 1].y,
          outerVerts[p1 + 1].z
        );
        vertex3.normal.elements[0] = outerVerts[p1 + 1].x;
        vertex3.normal.elements[1] = outerVerts[p1 + 1].y;
        vertex3.normal.elements[2] = outerVerts[p1 + 1].z;

        var vertex4 = new Vertex(
          outerVerts[p2].x,
          outerVerts[p2].y,
          outerVerts[p2].z
        );
        vertex4.normal.elements[0] = outerVerts[p2].x;
        vertex4.normal.elements[1] = outerVerts[p2].y;
        vertex4.normal.elements[2] = outerVerts[p2].z;

        var vertex5 = new Vertex(
          outerVerts[p2 + 1].x,
          outerVerts[p2 + 1].y,
          outerVerts[p2 + 1].z
        );
        vertex5.normal.elements[0] = outerVerts[p2 + 1].x;
        vertex5.normal.elements[1] = outerVerts[p2 + 1].y;
        vertex5.normal.elements[2] = outerVerts[p2 + 1].z;

        vertices.push(vertex3, vertex4, vertex5);
      }
    }
    return vertices;
  }

  render() {
    // Transform geometry here!
    // Rotations!
    super.render();

    // Collision Detection x bounds
    if(this.x > 6) {
      this.xvel = -1 * Math.abs(this.xvel);
    } else if(this.x < -1) {
      this.xvel = Math.abs(this.xvel);
    }

    // Collision Detection y bounds
    if(this.y > 29) {
      this.yvel = -1 * Math.abs(this.yvel);
    } else if(this.y < 0.8) {
      this.yvel = Math.abs(this.yvel);
      this.yvel = this.yvel * 0.82;
    }

    // Collision Detection z bounds
    if(this.z > -2) {
      this.zvel = -1 * Math.abs(this.zvel);
    } else if(this.z < -20) {
      this.zvel = Math.abs(this.zvel);
    }

    // Apply acceleration due to gravity if sphere is off the ground
    if(this.y > 0.5) {
      this.yvel = this.yvel + this.accel;
    }
    
    // Account for friction
    if(this.y < 0.51 && this.xvel > 0) {
      this.xvel = this.xvel - 0.0016;
    } else if(this.y < 0.51 && this.xvel < 0) {
      this.xvel = this.xvel + 0.0016;
    }

    // Account for friction
    if(this.y < 0.51 && this.zvel > 0) {
      this.zvel = this.zvel - 0.0025;
    } else if(this.y < 0.51 && this.zvel < 0) {
      this.zvel = this.zvel + 0.0025;
    }

    

    this.transformMatrix.setTranslate(this.xvel,this.yvel,this.zvel);
    this.x = this.x + this.xvel;
    //console.log("xpos = " + this.x);
    this.y = this.y + this.yvel;
    //console.log("ypos = " + this.y);
    this.z = this.z + this.zvel;
    //console.log("zpos = " + this.z);
    this.modelMatrix = this.modelMatrix.multiply(this.transformMatrix);

  }
}
