/**
 * Specifies a Cube. A subclass of geometry.
 *
 * @author Marshall Morse
 * @this {Cube}
 */
class SkyCube extends Geometry {
  /**
   * Constructor for Cube.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Cube} Cube created
   */
  constructor(shader, image) {
    super(shader);
    this.image = image;

    this.vertices = this.generateCubeVertices();
    this.faces = { 0: this.vertices };
    var transMatrix = new Matrix4();
    transMatrix.setTranslate(1, 0, 1);
    this.modelMatrix = this.modelMatrix.multiply(transMatrix);
    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);

    // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR

    this.interleaveVertices();
  }
  calculateSurfaceNormal(vert0, vert1, vert2) {
    var vectora = new Vector3();
    var vectorb = new Vector3();
    vectorb = vert1.point.sub(vert0.point);
    vectora = vert2.point.sub(vert0.point);

    vert0.normal.elements[0] =
      vectorb.elements[2] * vectora.elements[1] -
      vectorb.elements[1] * vectora.elements[2];
    vert0.normal.elements[1] =
      vectorb.elements[2] * vectora.elements[0] -
      vectorb.elements[0] * vectora.elements[2];
    vert0.normal.elements[2] =
      vectorb.elements[1] * vectora.elements[0] -
      vectorb.elements[0] * vectora.elements[1];
    vert0.normal = vert0.normal.normalize();
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
  generateCubeVertices() {
    var vertices = [];
    //front face
    var vertex0 = [32, 32, 0];
    var vertex1 = [0, 32, 0];
    var vertex2 = [0, -1, 0];
    var vertex3 = [32, -1, 0];
    var vertex4 = [32, -1, -32];
    var vertex5 = [32, 32, -32];
    var vertex6 = [-0, 32, -32];
    var vertex7 = [-0, -1, -32];

    //front
    this.pushFaces(vertices, vertex0, vertex1, vertex2, vertex3);
    //right
    this.pushFaces(vertices, vertex5, vertex4, vertex3, vertex0);
    //back
    this.pushFaces(vertices, vertex6, vertex7, vertex4, vertex5);
    //left
    this.pushFaces(vertices, vertex1, vertex2, vertex7, vertex6);
    //top
    this.pushFaces(vertices, vertex5, vertex0, vertex1, vertex6);
    //bottom
    this.pushFaces(vertices, vertex3, vertex4, vertex7, vertex2);

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
    for (var i = 0; i < 6; i++) {
      vertices[i].normal.elements[0] = vertices[i].normal.elements[0] * -1;
      vertices[i].normal.elements[1] = vertices[i].normal.elements[1] * -1;
      vertices[i].normal.elements[2] = vertices[i].normal.elements[2] * -1;
    }
    for (var i = 24; i < 36; i++) {
      vertices[i].normal.elements[0] = vertices[i].normal.elements[0] * -1;
      vertices[i].normal.elements[1] = vertices[i].normal.elements[1] * -1;
      vertices[i].normal.elements[2] = vertices[i].normal.elements[2] * -1;
    }
    return vertices;
  }
}
