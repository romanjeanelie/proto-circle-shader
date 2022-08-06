import { split } from "../../utils/text";
import gsap from "gsap";
export default class AnimateDOM {
  constructor() {
    console.log("animate");

    this.title = document.querySelector(".title");
    this.subtitle = document.querySelector(".subtitle");
    this.link = document.querySelector(".link");

    this.init();
    this.animReset();
    this.animIn();
  }

  init() {
    console.log(this.title);
    split({
      element: this.title,
      expression: "<br>",
    });
    split({
      element: this.title,
      expression: "<br>",
    });

    this.titleWrappers = this.title.querySelectorAll("span");
    this.titleLines = this.title.querySelectorAll("span span");

    console.log(this.titleLines);
  }

  animReset() {
    console.log("anim");
    gsap.set(this.titleWrappers, {});
    gsap.set([this.titleLines, this.subtitle, this.link], {
      xPercent: -10,
      opacity: 0,
    });
  }

  animIn() {
    gsap.to([this.titleLines, this.subtitle, this.link], {
      xPercent: 0,
      opacity: 1,
      delay: 0.3,
      stagger: 0.1,
      duration: 1,
    });
  }
}
