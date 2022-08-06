import * as THREE from "three";
import Experience from "./Experience.js";
import Sphere from "./Sphere.js";
import Circle from "./Circle";

export default class World {
  constructor(_options) {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("groupEnd", (_group) => {
      if (_group.name === "base") {
        // this.setSphere();
        this.setCircle();
      }
    });
  }

  setSphere() {
    this.sphere = new Sphere();
  }

  setCircle() {
    this.circle = new Circle();
  }

  resize() {}

  update() {
    if (this.sphere) this.sphere.update();
    if (this.circle) this.circle.update();
  }

  destroy() {}
}
