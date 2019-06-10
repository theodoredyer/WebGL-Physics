/**
 * Specifies a square. A subclass of geometry.
 *
 * @author Marshall Morse
 * @this {Square}
 */
class CoordSquare extends Geometry {
    /**
     * Constructor for Square.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @returns {Square} Square created
     */
    constructor(shader, image, x, z) {
      super(shader);
      this.image = image;
      this.x = x;
      this.z = z;
      this.vertices = this.generateSquareVertices(this.x, this.z);
      this.faces = { 0: this.vertices };
  
      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
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
    generateSquareVertices(x, z) {
      var vertices = [];
      // top right
      var vertex0 = new Vertex(x - 100, 9, z);
      // bot right
      var vertex1 = new Vertex(x - 100, -1, z);
      // bot left
      var vertex2 = new Vertex(x, -1, z);
      // top left
      var vertex3 = new Vertex(x, 9, z);
  
      vertex0.texCoord = [1, 1];
      vertex1.texCoord = [1, 0];
      vertex2.texCoord = [0, 0];
      vertex3.texCoord = [0, 1];
  
      //first triangle
      vertices.push(vertex0);
      vertices.push(vertex1);
      vertices.push(vertex2);
  
      //second triangle
      vertices.push(vertex0);
      vertices.push(vertex3);
      vertices.push(vertex2);
      //top right vertex normal
      vertices[0].normal = [1, 0, 0];
      vertices[1].normal = [1, 0, 0];
      vertices[2].normal = [1, 0, 0];
      vertices[3].normal = [1, 0, 0];
      vertices[4].normal = [1, 0, 0];
      vertices[5].normal = [1, 0, 0];
  
      return vertices;
    }
  }
  