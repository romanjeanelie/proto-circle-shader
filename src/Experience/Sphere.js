import * as THREE from "three";
import Experience from "./Experience";

// Shaders
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

export default class Triangle {
  constructor() {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("sphere");
    }

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.IcosahedronGeometry(1, 10);
  }

  setMaterial() {
    console.log(vertex);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 0 },
        uNoiseDensity: { value: 1 },
        uNoiseStrength: { value: 1 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      wireframe: true,
    });

    if (this.config.debug) {
      this.debugFolder.add(this.material.uniforms.uNoiseDensity, "value", 0, 10).name("uNoiseDensity");
      this.debugFolder.add(this.material.uniforms.uNoiseStrength, "value", 0, 10).name("uNoiseStrength");
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value += this.time.delta;
  }
}
