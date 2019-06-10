/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */
class Vertex {
  constructor(x, y, z) {
    this.point = new Vector3([x, y, z]);
    this.color = this.getColors();
    this.texCoord = null;
    this.normal = new Vector3([0.0, 0.0, 0.0]);

  }
  getColors() {
    var sliderB = document.getElementById("bRange");
    var BsliderPos = sliderB.value / 100;
    sliderB.oninput = function() {
      BsliderPos = this.value / 100;
    };
    var slideR = document.getElementById("rRange");
    var RsliderPos = slideR.value / 100;
    slideR.oninput = function() {
      RsliderPos = this.value / 100;
    };
    var sliderG = document.getElementById("gRange");
    var GsliderPos = sliderG.value / 100;
    sliderG.oninput = function() {
      GsliderPos = this.value / 100;
    };
    return [RsliderPos, GsliderPos, BsliderPos, 1];
  }
}
