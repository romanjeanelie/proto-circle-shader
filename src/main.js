import "./style.css";
import Experience from "./Experience/Experience.js";
import AnimateDOM from "./DOM/AnimateDOM";

const experience = new Experience({
  targetElement: document.querySelector(".experience"),
});

const animateDOM = new AnimateDOM();
