// Vertex Shader
var ASG1_VSHADER = `precision mediump float;
  attribute vec4 a_Position;
  varying vec3 v_Position;

  attribute vec4 a_Color;
  varying vec4 v_Color;

  attribute vec4 a_Normal;
  varying vec3 v_Normal;

  uniform mat4 u_NormalMatrix;
  uniform mat4 u_ModelMatrix;

  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  void main() {
    v_Color = a_Color;
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    
    gl_Position = u_ProjectionMatrix * u_ViewMatrix* u_ModelMatrix * a_Position;
    vec4 vertPos4 = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
    v_Position = vec3(vertPos4) / vertPos4.w;
  }`;

// Fragment Shader
var ASG1_FSHADER = `precision mediump float;
  varying vec4 v_Color;
  varying vec3 v_Normal;
  varying vec3 v_Position;

  uniform vec3 u_LightPos;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_DiffuseColor;
  uniform vec3 u_SpecularColor;

  void main() {
    vec3 lightDir = normalize(u_LightPos - v_Position);
    vec3 reflectDir = reflect(-lightDir, v_Normal);
    vec3 viewDir = normalize(-v_Position);

    float lambertian = max(dot(lightDir,v_Normal), 0.0);
    float specular = 0.0;

    if(lambertian > 0.0) {
       float specAngle = max(dot(reflectDir, viewDir), 0.0);
       specular = pow(specAngle, 2.0);
    }
    gl_FragColor = vec4(vec3(v_Color) + u_AmbientColor +
      lambertian*u_DiffuseColor +specular * u_SpecularColor
                      , 1.0);
    
  }`;
//specular*specColor
