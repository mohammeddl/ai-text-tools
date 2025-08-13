import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger, SplitText);

function createScrollTrigger(triggerElement) {
  // Play tl when scrolled into view (60% from top of screen)
  return {
    trigger: triggerElement,
    start: "top 80%",
    markers: false,
  };
}

export const fxotaryUtility = {
  customMouse() {
    var mouse = { x: 0, y: 0 }; // Cursor position
    var pos = { x: 0, y: 0 }; // Cursor position
    var ratio = 0.15; // delay follow cursor
    var active = false;
    var ball = document.getElementById("ball");

    /** default */
    const defaultValue = {
      duration: 0.3,
      opacity: 0.5,
      width: "30px",
      height: "30px",
      backgroundColor: "transparent",
      border: "2px solid #555",
    };
    const hoverBall = {
      duration: 0.3,
      borderWidth: 0,
      opacity: "1!important",
      width: "100px!important",
      height: "100px!important",
      backgroundColor: "#2c7365",
    };
    gsap.set(ball, {
      // scale from middle and style ball
      xPercent: -50,
      yPercent: -50,
    });
    document.addEventListener("mousemove", mouseMove);
    function mouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    gsap.ticker.add(updatePosition);
    function updatePosition() {
      if (!active) {
        pos.x += (mouse.x - pos.x) * ratio;
        pos.y += (mouse.y - pos.y) * ratio;

        gsap.set(ball, { x: pos.x, y: pos.y });
      }
    }
    // link
    var links = document.querySelectorAll(
      "a,.c-pointer,button,.progress,.slick-arrow"
    );
    links.forEach((link) => {
      if (!link.classList.contains("project_slider")) {
        link.addEventListener("mouseenter", function () {
          gsap.to(ball, {
            duration: 0.3,
            borderWidth: 0,
            opacity: 0.5,
            backgroundColor: "#CCC",
            width: "80px",
            height: "80px",
          });
        });
        link.addEventListener("mouseleave", function () {
          gsap.to(ball, defaultValue);
        });
      }
    });

    // Data cursor
    var dataCursorElements = document.querySelectorAll("[data-cursor]");
    dataCursorElements.forEach((dataCursorElement) => {
      dataCursorElement.addEventListener("mouseenter", function () {
        ball.innerHTML = '<div class="ball-view"></div>';
        ball.querySelector(".ball-view").innerHTML =
          this.getAttribute("data-cursor");
        gsap.to(ball, hoverBall);
      });
      dataCursorElement.addEventListener("mouseleave", function () {
        var ballView = ball.querySelector(".ball-view");
        if (ballView) {
          ball.removeChild(ballView);
        }
        gsap.to(ball, defaultValue);
      });
    });

    // cursor-arrow
    var cursorArrows = document.querySelectorAll(".cursor-arrow");
    cursorArrows.forEach((cursorArrow) => {
      cursorArrow.addEventListener("mouseenter", function () {
        ball.innerHTML =
          '<div class="ball-arrow"><i class="fx-icon-long-next-arrow"></i></div>';
        gsap.to(ball, hoverBall);
      });
      cursorArrow.addEventListener("mouseleave", function () {
        var ballArrow = ball.querySelector(".ball-arrow");
        if (ballArrow) {
          ball.removeChild(ballArrow);
        }
        gsap.to(ball, defaultValue);
      });
    });

    // Slider
    var cursorArrows = document.querySelectorAll(".slick-list");
    cursorArrows.forEach((cursorArrow) => {
      cursorArrow.addEventListener("mouseenter", function () {
        ball.innerHTML =
          '<div class="ball-arrow slider-arrow"><i class="fa-light fa-chevron-left"></i><i class="fa-light fa-chevron-right"></i></div>';
        gsap.to(ball, hoverBall);
      });
      cursorArrow.addEventListener("mouseleave", function () {
        var ballArrow = ball.querySelector(".ball-arrow");
        if (ballArrow) {
          ball.removeChild(ballArrow);
        }
        gsap.to(ball, defaultValue);
      });
    });

    // Image view
    var imageViews = document.querySelectorAll(".image-view");
    imageViews.forEach((imageView) => {
      imageView.addEventListener("mouseenter", function () {
        ball.innerHTML = '<div class="ball-image-view"></div>';
        ball.querySelector(".ball-image-view").innerHTML =
          this.getAttribute("data-img-cursor");
        gsap.to(ball, {
          duration: 0.3,
          borderWidth: 0,
          opacity: "1!important",
          width: "250px!important",
          height: "250px!important",
          borderRadius: "50%",
        });
      });
      imageView.addEventListener("mouseleave", function () {
        var ballImageView = ball.querySelector(".ball-image-view");
        if (ballImageView) {
          ball.removeChild(ballImageView);
        }
        gsap.to(ball, defaultValue);
      });
    });

    // Gallery
    var galleries = document.querySelectorAll(".gallery");
    galleries.forEach((gallery) => {
      gallery.addEventListener("mouseenter", function () {
        ball.innerHTML =
          '<div class="ball-gallery"><i class="fa-sharp fa-solid fa-eye"></i></div>';
        gsap.to(ball, hoverBall);
      });
      gallery.addEventListener("mouseleave", function () {
        var ballGallery = ball.querySelector(".ball-gallery");
        if (ballGallery) {
          ball.removeChild(ballGallery);
        }
        gsap.to(ball, defaultValue);
      });
    });
  },
  preloader() {
    const svg = document.getElementById("svg");
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
    const tl = gsap.timeline();

    tl.to(".preloader-text", {
      delay: 0.5,
      y: -100,
      opacity: 0,
      onComplete() {
        var hasAnim = document.querySelectorAll(".banner_title");
        hasAnim.forEach(function (element) {
          var splitType = "lines, chars";
          var splitto = new SplitText(element, {
            type: splitType,
            linesClass: "anim_line",
            charsClass: "anim_char",
            wordsClass: "anim_word",
          });
          var lines = element.querySelectorAll(".anim_line"),
            words = element.querySelectorAll(".anim_word"),
            chars = element.querySelectorAll(".anim_char");
          gsap.fromTo(
            chars,
            { y: "100%", opacity: 0 },
            {
              y: "0%",
              duration: 0.8,
              stagger: 0.01,
              opacity: 1,
              ease: "circ.out",
            }
          );
        });
        var banner_img = document.querySelectorAll(".banner_img img");
        gsap.to(banner_img, {
          scale: "1",
          filter: "blur(0)",
          duration: 1,
        });
        gsap.set(banner_img, {
          scale: "1.3",
          filter: "blur(5px)",
        });
      },
    })
      .to(svg, {
        duration: 0.1,
        // attr: { d: curve },
        ease: "power2.easeIn",
      })
      .to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.easeOut",
      })
      .to(".preloader", {
        y: -1500,
      })
      .to(".preloader", {
        zIndex: -1,
        display: "none",
      });
  },
  imgToSVG() {
    document.querySelectorAll("img.svg").forEach((el) => {
      const imgID = el.getAttribute("id");
      const imgClass = el.getAttribute("class");
      const imgURL = el.getAttribute("src");

      fetch(imgURL)
        .then((data) => data.text())
        .then((response) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(response, "text/html");
          let svg = xmlDoc.querySelector("svg");

          if (typeof imgID !== "undefined") {
            svg.setAttribute("id", imgID);
          }

          if (typeof imgClass !== "undefined") {
            svg.setAttribute("class", imgClass + " replaced-svg");
          }

          svg.removeAttribute("xmlns:a");
          if (el.parentNode) {
            el.parentNode.replaceChild(svg, el);
          }
        });
    });
  },
  buttonHover() {
    class Magnet {
      constructor(target, magnetism = 0.2) {
        this.target = target;
        this.magnetism = magnetism;
        this.interval;
        this.hover = false;
        this.bubble;
        this.content;
        this.initX;
        this.initY;
        this.cursorX = 0;
        this.cursorY = 0;
        this.buttonX = 0;
        this.buttonY = 0;
        this.contentX = 0;
        this.contentY = 0;
        this.bubbleX = 0;
        this.bubbleY = 0;
        this.init();
      }

      init() {
        this.initX =
          this.target.getBoundingClientRect().left +
          this.target.offsetWidth / 2;
        this.initY =
          this.target.getBoundingClientRect().top +
          this.target.offsetHeight / 2;

        let inner = this.target.innerHTML;
        inner = `<span class="js-magnet-content magnet-content">${inner}</span>`;
        inner = `<i class="js-magner-bubble magnet-bubble"></i>${inner}`;
        this.target.innerHTML = inner;
        this.bubble = this.target.querySelector(".js-magner-bubble");
        this.content = this.target.querySelector(".js-magnet-content");

        let timelineBubble = gsap
          .timeline({ paused: true })
          .to(this.bubble, {
            duration: 0,
            opacity: 1,
          })
          .to(this.bubble, {
            duration: 0.6,
            scaleX: "15000%",
            scaleY: "15000%",
          });
        const ball = document.getElementById("ball");
        this.target.addEventListener("mouseenter", (e) => {
          this.hover = true;
          this.moveBubble(e);
          timelineBubble.play();
          let that = this;
          this.interval = setInterval(this.magnetize, 30, that);
          ball.classList.remove("d-block");
          ball.classList.add("d-none");
        });

        this.target.addEventListener("mouseleave", (e) => {
          this.moveBubble(e);
          timelineBubble.reverse();
          this.hover = false;
          this.cursorX = 0;
          this.cursorY = 0;
          ball.classList.remove("d-none");
          ball.classList.add("d-block");
        });

        this.target.addEventListener("mousemove", (e) => {
          let targetX =
            this.target.getBoundingClientRect().left +
            this.target.offsetWidth / 2;
          let targetY =
            this.target.getBoundingClientRect().top +
            this.target.offsetHeight / 2;
          this.cursorX =
            ((e.clientX - targetX) * 100) / (this.target.offsetWidth / 2);
          this.cursorY =
            ((e.clientY - targetY) * 100) / (this.target.offsetHeight / 2);
        });
      }

      moveBubble(e) {
        this.bubbleX = (e.layerX * 100) / this.target.offsetWidth;
        this.bubbleY = (e.layerY * 100) / this.target.offsetHeight;
        this.bubble.style.left = this.bubbleX + "%";
        this.bubble.style.top = this.bubbleY + "%";
      }

      magnetize(that) {
        let distance = Math.sqrt(
          (that.initX - that.buttonX) ** 2 + (that.initY - that.buttonY) ** 2
        );
        let magnetized = distance > 0.01 && that.hover ? true : false;

        if (magnetized) {
          that.buttonX += (that.cursorX - that.buttonX) * 0.2;
          that.buttonY += (that.cursorY - that.buttonY) * 0.2;
          that.contentX += (that.cursorX - that.contentX) * 0.2;
          that.contentY += (that.cursorY - that.contentY) * 0.2;
          let buttonTranslateX = `translateX(${
            that.buttonX * that.magnetism
          }%)`;
          let buttonTranslateY = `translateY(${
            that.buttonY * that.magnetism
          }%)`;
          let contentTranslateX = `translateX(${
            (-that.contentX * that.magnetism) / 2
          }%)`;
          let contentTranslateY = `translateY(${
            (-that.contentY * that.magnetism) / 2
          }%)`;
          that.target.style.transform =
            buttonTranslateX + " " + buttonTranslateY;
          that.content.style.transform =
            contentTranslateX + " " + contentTranslateY;
        } else {
          that.target.style.transform = "translateX(0%) translateY(0%)";
          that.content.style.transform = "translateX(0%) translateY(0%)";
          clearInterval(that.interval);
        }
      }
    }

    let magnets = document.querySelectorAll(".circle_btn");
    magnets.forEach((magnet) => {
      new Magnet(magnet);
    });
  },
  lenisScrollAnimation() {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  },
  scrollAnimation() {
    let animations = gsap.utils.toArray("[data-animation]");

    animations.forEach((animation, i) => {
      let direction = animation.getAttribute("data-animation") || "fade-bottom",
        duration = animation.getAttribute("data-duration") || 1.5,
        offset = animation.getAttribute("data-offset") || 50,
        delay = animation.getAttribute("data-delay") || 0,
        scroll = animation.getAttribute("data-scroll") || 1,
        stagger = animation.getAttribute("data-stagger") || 0.2,
        ease = animation.getAttribute("data-ease") || "power2.out";

      switch (direction) {
        case "fade-top":
          gsap.set(animation, {
            opacity: 0,
            y: -offset,
          });
          gsap.to(animation, {
            scrollTrigger: createScrollTrigger(animation),
            y: 0,
            opacity: 1,
            ease,
            duration,
            delay,
            stagger: { amount: stagger },
          });
          break;

        case "fade-bottom":
          gsap.set(animation, {
            opacity: 0,
            y: offset,
          });
          gsap.to(animation, {
            scrollTrigger: createScrollTrigger(animation),
            y: 0,
            opacity: 1,
            ease,
            duration,
            delay,
            stagger: { amount: stagger },
          });
          break;

        case "fade-left":
          gsap.set(animation, {
            opacity: 0,
            x: -offset,
          });
          gsap.to(animation, {
            scrollTrigger: createScrollTrigger(animation),
            opacity: 1,
            x: 0,
            ease,
            duration,
            delay,
            stagger: { each: stagger },
          });
          break;

        case "fade-right":
          gsap.set(animation, {
            opacity: 0,
            x: offset,
          });
          gsap.to(animation, {
            scrollTrigger: createScrollTrigger(animation),
            opacity: 1,
            x: 0,
            ease,
            duration,
            delay,
            stagger: { each: stagger },
          });
          break;

        case "fade-in":
          gsap.set(animation, {
            opacity: 0,
          });
          gsap.to(animation, {
            scrollTrigger: createScrollTrigger(animation),
            opacity: 1,
            ease,
            duration,
            delay,
            stagger: { each: stagger },
          });
          break;

        case "img-blur":
          let img = animation.getElementsByTagName("img")[0];
          gsap.to(img, {
            scrollTrigger: createScrollTrigger(img),
            scale: "1",
            filter: "blur(0)",
            ease,
            duration: 1,
            delay,
            stagger: { each: stagger },
          });
          gsap.set(img, {
            scale: "1.3",
            filter: "blur(5px)",
            duration: 1,
          });
          break;

        default:
          break;
      }
    });
  },
  scrollTextAnimation() {
    let typeSplit = new SplitType("[data-text-animation]", {
      types: "lines,words, chars",
      className: "line",
    });
    const animations = document.querySelectorAll("[data-text-animation]");
    animations.forEach((animation) => {
      let direction =
          animation.getAttribute("data-text-animation") || "slide-up",
        duration = animation.getAttribute("data-duration") || 0.75,
        offset = animation.getAttribute("data-offset") || 80,
        delay = animation.getAttribute("data-delay") || 0,
        scroll = animation.getAttribute("data-scroll") || 1,
        stagger = animation.getAttribute("data-stagger") || 0.6,
        split = animation.getAttribute("data-split") || "line",
        ease = animation.getAttribute("data-ease") || "power2.out";
      switch (direction) {
        case "slide-up":
          gsap.set(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            yPercent: offset,
          });
          gsap.to(animation.querySelectorAll(`.${split}`), {
            scrollTrigger: createScrollTrigger(
              animation.querySelectorAll(`.${split}`)
            ),
            yPercent: 0,
            opacity: 1,
            ease,
            duration,
            delay,
            stagger: { amount: stagger },
          });
          break;

        case "slide-down":
          gsap.set(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            yPercent: -offset,
          });
          gsap.to(animation.querySelectorAll(`.${split}`), {
            scrollTrigger: createScrollTrigger(
              animation.querySelectorAll(`.${split}`)
            ),
            yPercent: 0,
            opacity: 1,
            ease,
            duration,
            delay,
            stagger: { amount: stagger },
          });
          break;

        case "rotate-in":
          gsap.set(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            rotationX: -offset,
            transformPerspective: 400,
          });
          gsap.to(animation.querySelectorAll(`.${split}`), {
            scrollTrigger: createScrollTrigger(
              animation.querySelectorAll(`.${split}`)
            ),
            rotationX: 0,
            opacity: 1,
            ease,
            duration,
            delay,
            stagger: { amount: stagger },
          });
          break;

        case "slide-from-left":
          gsap.set(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            xPercent: -offset,
          });
          gsap.to(animation.querySelectorAll(`.${split}`), {
            scrollTrigger: createScrollTrigger(
              animation.querySelectorAll(`.${split}`)
            ),
            xPercent: 0,
            opacity: 1,
            ease,
            duration,
            delay,
            stagger: { amount: stagger },
          });
          break;

        case "slide-from-right":
          gsap.set(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
            xPercent: offset,
          });
          gsap.to(animation.querySelectorAll(`.${split}`), {
            scrollTrigger: createScrollTrigger(
              animation.querySelectorAll(`.${split}`)
            ),
            xPercent: 0,
            opacity: 1,
            ease,
            duration,
            delay,
            stagger: { amount: stagger },
          });
          break;

        case "fade-in":
          gsap.set(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
          });
          gsap.to(animation.querySelectorAll(`.${split}`), {
            scrollTrigger: createScrollTrigger(
              animation.querySelectorAll(`.${split}`)
            ),
            opacity: 1,
            ease,
            duration,
            delay,
            stagger: { amount: stagger },
          });
          break;

        case "fade-in-random":
          gsap.set(animation.querySelectorAll(`.${split}`), {
            opacity: 0,
          });
          gsap.to(animation.querySelectorAll(`.${split}`), {
            scrollTrigger: createScrollTrigger(
              animation.querySelectorAll(`.${split}`)
            ),
            opacity: 1,
            ease,
            duration,
            delay,
            stagger: { amount: stagger, from: "random" },
          });
          break;

        case "scrub":
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: animation,
              start: "top 90%",
              end: "top center",
              scrub: true,
            },
          });
          tl.from(animation.querySelectorAll(`.${split}`), {
            opacity: 0.2,
            duration,
            ease,
            stagger: { amount: stagger },
          });
          break;

        default:
          break;
      }
    });
  },
  stickyNav() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollpos = window.pageYOffset;
      if (prevScrollpos > currentScrollpos) {
        document.querySelector(".main_menu").style.top = "0";
      } else {
        document.querySelector(".main_menu").style.top = "-100px";
      }

      prevScrollpos = currentScrollpos;
    };
  },
  scrollBtn() {
    var scrollBtn = document.querySelector(".tf__scroll_btn");
    if (scrollBtn) {
      scrollBtn.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
    window.addEventListener("scroll", function () {
      var scrolling = window.pageYOffset || document.documentElement.scrollTop;

      if (scrolling > 500) {
        document.querySelector(".tf__scroll_btn").style.display = "flex";
      } else {
        document.querySelector(".tf__scroll_btn").style.display = "none";
      }
    });
  },
};
