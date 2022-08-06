import * as THREE from "three";
import Experience from "../Experience";
import { gsap } from "gsap";

// Shaders
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

export default class Circle {
  constructor() {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    this.isAnimated = false;

    if (this.debug) {
      this.debugFolder = this.debug.addFolder("sphere");
    }

    this.mouse = {
      current: {
        x: 0.5,
        y: 0.5,
      },
      end: {
        x: 0.5,
        y: 0.5,
      },
    };

    this.isAnimated = { value: 0 };

    this.setMouse();

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setGroup();

    this.animIn();
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(1, 100);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uGradient: { value: 1 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
      wireframe: false,
      transparent: true,
    });

    if (this.config.debug) {
      this.debugFolder.add(this.material.uniforms.uGradient, "value", 0, 1).name("uGradient");
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  setGroup() {
    const nb = 20;
    this.group = new THREE.Group();

    for (let i = 0; i < nb; i++) {
      const newCircle = this.mesh.clone();
      // newCircle.position.y = i * 0.05;
      // newCircle.position.x = i * 0.04;
      // newCircle.position.z = -i * 0.2;

      this.group.add(newCircle);
    }

    this.group.position.x = 1.7;
    this.group.position.y = 0.1;

    this.scene.add(this.group);
  }

  setMouse() {
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
  }

  onMouseMove(e) {
    this.mouse.end.x = e.clientX / window.innerWidth;
    this.mouse.end.y = e.clientY / window.innerHeight;
  }

  updateMouse() {
    this.mouse.current.x += (this.mouse.end.x - this.mouse.current.x) * 0.02;
    this.mouse.current.y += (this.mouse.end.y - this.mouse.current.y) * 0.02;
  }

  updateGroup() {
    const amtPosition = 0.005;
    const amtRotation = 0.0006;

    this.group.children.forEach((mesh, i) => {
      const index = i + 1;
      mesh.rotation.z = this.time.elapsed * amtRotation + index * 0.2;

      mesh.position.x = this.isAnimated.value * (this.mouse.current.x * index * index * amtPosition * 0.7);
      mesh.position.y = this.isAnimated.value * ((this.mouse.current.y - 0.5) * index * index * amtPosition * 0.7);

      if (i > 0) {
        mesh.material.opacity = 0;
      }
    });
  }

  animIn() {
    const tl = gsap.timeline();

    tl.to(this.material.uniforms.uGradient, {
      value: 0,
      duration: 4,
      ease: "expo.out",
    });
    tl.to(
      this.group.position,
      {
        x: 1.3,
        duration: 3,
        ease: "expo.out",
      },
      "<"
    );
    tl.to(
      this.isAnimated,
      {
        value: 1,
        duration: 4,
        ease: "expo.inOut",
      },
      "<"
    );
    this.group.children.forEach((mesh, i) => {
      gsap.to(mesh.position, {
        z: -i * 0.2,
        duration: 4,
        ease: "expo.inOut",
      });
    });
  }

  update() {
    this.updateMouse();

    if (!this.group.children.length) return;
    this.updateGroup();
  }
}
