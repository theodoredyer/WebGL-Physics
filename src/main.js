var texShader = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");
  var hud = document.getElementById('hud');

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  var ctx = hud.getContext('2d');


  layout = [[1,0,0,0],[1,0,0,0],[2,0,0,0],[4,0,0,0]];
  // Initialize the scene
  var light = new Light(16, 8, -16);
  var scene = new Scene();
  var camera = new Camera();
  scene.setLight(light);
  
  var inputHandler = new InputHandler(canvas, scene, camera, hud);

  // Initialize colorShader
  colorShader = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);

  // Add attibutes
  colorShader.addAttribute("a_Position");
  colorShader.addAttribute("a_Color");
  colorShader.addAttribute("a_Normal");

  colorShader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  colorShader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  colorShader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  colorShader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);

  colorShader.addUniform("u_LightPos", "vec3", new Vector3().elements);
  colorShader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  colorShader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  colorShader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);

  // Initialize texShader
  texShader = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);

  // Add attibutes
  texShader.addAttribute("a_Position");
  texShader.addAttribute("a_Color");
  texShader.addAttribute("a_TexCoord");
  texShader.addAttribute("a_Normal");

  texShader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  texShader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);
  texShader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  texShader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  texShader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);

  texShader.addUniform("u_LightPos", "vec3", new Vector3().elements);
  texShader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  texShader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  texShader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);

  // Load texture and add triangle to the scene with that texture.

  inputHandler.readTexture("objs/logo512c.png", function(image) {
    var shape = new Square(texShader, image);
    scene.addGeometry(shape);
  });

  inputHandler.readTexture("objs/backwall.png", function(image) {
    var backsq = new BackSquare(texShader, image);
    scene.addGeometry(backsq);
  });

  inputHandler.readTexture("objs/hexfloor.png", function(image) {
    var flr = new Floor(texShader, image);
    scene.addGeometry(flr);
  });

  inputHandler.readTexture("objs/hexfloor.png", function(image) {
    var flrtwo = new FloorTwo(texShader, image);
    scene.addGeometry(flrtwo);
  });

  inputHandler.readTexture("objs/blackwhite.png", function(image) {
    var shape = new CoordSquare(texShader, image, -2, -1);
    scene.addGeometry(shape);
  });
  inputHandler.readTexture("objs/blackwhite.png", function(image) {
    var shape = new CoordSquare(texShader, image, -2, -21);
    scene.addGeometry(shape);
  });
  inputHandler.readTexture("objs/blackwhite.png", function(image) {
    var shape = new CeilingSquare(texShader, image, -4);
    scene.addGeometry(shape);
  });


  inputHandler.readTexture("objs/waterwall.png", function(image) {
    var shape = new CoordSquare(texShader, image, -100, -1);
    scene.addGeometry(shape);
  });
  inputHandler.readTexture("objs/waterwall.png", function(image) {
    var shape = new CoordSquare(texShader, image, -100, -21);
    scene.addGeometry(shape);
  });
  // inputHandler.readTexture("objs/hexfloor.png", function(image) {
  //   var shape = new CeilingSquare(texShader, image, -100);
  //   scene.addGeometry(shape);
  // });

  /*
  
  inputHandler.readTexture("objs/image.jpg", function(image) {
    for (var i = 0; i < layout.length; i++) {
      for (var j = 0; j < layout[0].length; j++) {
        if (layout[i][j]) {
          var shape = new Cube(texShader, image, i, layout[i][j], j);
          scene.addGeometry(shape);
        }
      }
    }
  });*/
  var shape = new Sphere(colorShader, 30, 2, 14, -5);
  scene.addGeometry(shape);
  var shape2 = new Sphere(colorShader, 30, 2, 17, -17);
  scene.addGeometry(shape2);

 

  // var shape2 = new Sphere(colorShader, 30, 5, 15, 5);
  // scene.addGeometry(shape2);

  // var shape3 = new Sphere(colorShader, 30, 7, 15, 8);
  // scene.addGeometry(shape3);

  draw2D(ctx);

  function draw2D(ctx) {
    ctx.clearRect(0, 0, 400, 400); // Clear <hud>
    // Draw triangle with white lines
    

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);
    
    ctx.stroke(rectangle);
    
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)'; // Set the line color
    // Draw white letters
    ctx.font = '12px "Times New Roman"';
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Set the letter color
    ctx.fillText('Next Scene  ', 10, 75);
    
  }

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}
