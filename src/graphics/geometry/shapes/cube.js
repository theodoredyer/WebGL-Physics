/**
 * Specifies a Cube. A subclass of geometry.
 *
 * @author Marshall Morse
 * @this {Cube}
 */
class Cube extends Geometry {
  /**
   * Constructor for Cube.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Cube} Cube created
   */
  constructor(shader, image, x, y, z) {
    super(shader);
    this.image = image;
    this.x = x;
    this.y = y;
    this.z = z;
    this.vertices = this.generateCubeVertices(x, y, z);
    this.faces = { 0: this.vertices };
    this.rotationMatrix = new Matrix4();
    this.rotationMatrix.setRotate(2, 0.5, 0.25, 0);
    this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
    //var transMatrix = new Matrix4();
    //transMatrix.setTranslate(1, 0, 1);
    //this.modelMatrix = this.modelMatrix.multiply(transMatrix);
    //this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR

    this.interleaveVertices();
  }
  render() {
    this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
    super.render();
  }
  pushFaces(vertices, topRight, botLeft, botRight, topLeft) {
    var vertex0 = new Vertex(topRight[0], topRight[1], topRight[2]);
    var vertex1 = new Vertex(botLeft[0], botLeft[1], botLeft[2]);
    var vertex2 = new Vertex(botRight[0], botRight[1], botRight[2]);
    var vertex3 = new Vertex(topLeft[0], topLeft[1], topLeft[2]);
    vertices.push(vertex0);
    vertices.push(vertex1);
    vertices.push(vertex2);

    vertex0 = new Vertex(topRight[0], topRight[1], topRight[2]);
    vertex2 = new Vertex(botRight[0], botRight[1], botRight[2]);

    vertices.push(vertex0);
    vertices.push(vertex3);
    vertices.push(vertex2);
  }
  calculateSurfaceNormal(vert0, vert1, vert2) {
    var vectora = new Vector3();
    vectora = vert1.point.sub(vert0.point);
    var vectorb = new Vector3();
    vectorb = vert2.point.sub(vert0.point);

    vert0.normal.elements[0] =
      vectorb.elements[2] * vectora.elements[1] -
      vectorb.elements[1] * vectora.elements[2];
    vert0.normal.elements[1] =
      vectorb.elements[2] * vectora.elements[0] -
      vectorb.elements[0] * vectora.elements[2];
    vert0.normal.elements[2] =
      vectorb.elements[1] * vectora.elements[0] -
      vectorb.elements[0] * vectora.elements[1];
  }
  generateCubeVertices(x, y, z) {
    var vertices = [];
    //front face
    //z += 0.5;
    // x += 0.5;

    var vertex0 = [0.5 + x, 0.5 * y, 0.5 - z];
    var vertex1 = [0.5 + x, -0.5, 0.5 - z];
    var vertex2 = [-0.5 + x, -0.5, 0.5 - z];
    var vertex3 = [-0.5 + x, 0.5 * y, 0.5 - z];
    var vertex4 = [0.5 + x, -0.5, -0.5 - z];
    var vertex5 = [0.5 + x, 0.5 * y, -0.5 - z];
    var vertex6 = [-0.5 + x, 0.5 * y, -0.5 - z];
    var vertex7 = [-0.5 + x, -0.5, -0.5 - z];

    //front
    this.pushFaces(vertices, vertex0, vertex1, vertex2, vertex3);
    //right
    this.pushFaces(vertices, vertex5, vertex4, vertex1, vertex0);
    //back
    this.pushFaces(vertices, vertex6, vertex7, vertex4, vertex5);
    //left
    this.pushFaces(vertices, vertex3, vertex2, vertex7, vertex6);
    //top
    this.pushFaces(vertices, vertex5, vertex6, vertex3, vertex0);
    //bottom
    this.pushFaces(vertices, vertex1, vertex2, vertex7, vertex4);

    for (var i = 0; i < 6; i++) {
      vertices[i * 6].texCoord = [1, 1];
      vertices[i * 6 + 1].texCoord = [1, 0];
      vertices[i * 6 + 2].texCoord = [0, 0];

      vertices[i * 6 + 3].texCoord = [1, 1];
      vertices[i * 6 + 4].texCoord = [0, 1];
      vertices[i * 6 + 5].texCoord = [0, 0];
    }
    for (var i = 0; i < 6; i++) {
      //top right vertex normal
      this.calculateSurfaceNormal(
        vertices[i * 6],
        vertices[i * 6 + 2],
        vertices[i * 6 + 1]
      ); //bottom right vertex normal
      this.calculateSurfaceNormal(
        vertices[i * 6 + 1],
        vertices[i * 6],
        vertices[i * 6 + 2]
      ); //bottom left vertex normal
      this.calculateSurfaceNormal(
        vertices[i * 6 + 2],
        vertices[i * 6 + 1],
        vertices[i * 6]
      ); //top right vertex normal
      this.calculateSurfaceNormal(
        vertices[i * 6 + 3],
        vertices[i * 6 + 4],
        vertices[i * 6 + 5]
      ); //top left
      this.calculateSurfaceNormal(
        vertices[i * 6 + 4],
        vertices[i * 6 + 5],
        vertices[i * 6 + 3]
      ); //bottom left
      this.calculateSurfaceNormal(
        vertices[i * 6 + 5],
        vertices[i * 6 + 3],
        vertices[i * 6 + 4]
      );
    }
    return vertices;
  }
}
