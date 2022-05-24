<template>
  <div class="container relative">
    <main>
      <div class="d-flex ap-list">
        <div class="p-2 ap-list-item">First flex item</div>
        <div class="p-2 ap-list-item">Second flex item</div>
        <div class="p-2 ap-list-item">Third flex item</div>
      </div>

      <div class="d-flex ap-list">
        <div class="p-2 bd-highlight ap-item">First flex item</div>
        <div class="p-2 bd-highlight ap-item">Second flex item</div>
        <div class="p-2 bd-highlight ap-item">Third flex item</div>
      </div>

      <div class="d-flex flex-row-reverse bd-highlight ap-list">
        <div class="p-2 bd-highlight ap-item">Flex item 1</div>
        <div class="p-2 bd-highlight ap-item">Flex item 2</div>
        <div class="p-2 bd-highlight ap-item">Flex item 3</div>
      </div>
      <div class="d-flex justify-content-start">Flex item 項目一</div>
      <div class="d-flex justify-content-end">Flex item 項目二</div>
      <div class="d-flex justify-content-center">Flex item xxx</div>
      <div class="d-flex justify-content-between">Flex item xxx</div>
      <div class="d-flex justify-content-around">Flex item xxx</div>
      <div class="d-flex justify-content-evenly">Flex item xxx</div>
    </main>
  </div>
</template>
<script setup lang="ts">
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// function animateFrom(elem: HTMLElement | null, direction: number) {
//   direction = direction || 1;
//   let x = 0,
//     y = direction * 100;

//   if (elem !== null) {
//     if (elem.classList.contains("gs_reveal_fromLeft")) {
//       x = -100;
//       y = 0;
//     } else if (elem.classList.contains("gs_reveal_fromRight")) {
//       x = 100;
//       y = 0;
//     }
//     elem.style.transform = "translate(" + x + "px, " + y + "px)";
//     elem.style.opacity = "0";
//     gsap.fromTo(
//       elem,
//       { x: x, y: y, autoAlpha: 0 },
//       {
//         duration: 1.25,
//         x: 0,
//         y: 0,
//         autoAlpha: 1,
//         ease: "expo",
//         overwrite: "auto",
//       }
//     );
//   }
// }

// function hide(elem: HTMLElement | null) {
//   gsap.set(elem, { autoAlpha: 0 });
// }

onMounted(() => {
  // const t1 = gsap.timeline();
  // t1.to("#heading", {
  //   duration: 1,
  //   x: 100,
  // })
  //   .to("#heading", {
  //     duration: 1,
  //     y: 100,
  //   })
  //   .to("#heading", {
  //     duration: 1,
  //     x: 0,
  //   })
  //   .to("#heading", {
  //     duration: 1,
  //     y: 0,
  //   })
  //   .to("#heading", {
  //     duration: 1,
  //     rotation: 360,
  //   });
  // document.addEventListener("DOMContentLoaded", function () {
  //   console.log("DOMContentLoaded!!!!!");
  //   gsap.registerPlugin(ScrollTrigger);
  //   const gsapArr: HTMLElement[] = gsap.utils.toArray(".gs_reveal");
  //   gsapArr.forEach((elem) => {
  //     hide(elem);
  //     ScrollTrigger.create({
  //       trigger: elem,
  //       onEnter: function () {
  //         animateFrom(elem, 0);
  //       },
  //       onEnterBack: function () {
  //         animateFrom(elem, -1);
  //       },
  //       onLeave: function () {
  //         hide(elem);
  //       },
  //     });
  //   });
  // });
});
</script>
<style scoped lang="scss">
.sp-font {
  width: 650px;
  height: 60px;
}

.ipsType_right {
  text-align: right;
}

.ipsType_center {
  text-align: center;
}

.cInnerContent {
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
}

.ipsSpacer_bottom_double {
  margin-bottom: 30px;
}

.ipsGrid {
  display: inline-block;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
}

.ipsGrid::before,
.ipsGrid::after {
  display: table;
  content: "";
  line-height: 0;
}

.ipsGrid > [class*="ipsGrid_span"] {
  display: block;
  width: 100%;
  min-height: 30px;
  box-sizing: border-box;
}

.ipsGrid > .ipsGrid_span5 {
  width: 40.42553191489362%;
}

.ipsGrid > .ipsGrid_span7 {
  width: 57.44680851063829%;
}

.ipsGrid > [class*="ipsGrid_span"] {
  float: left;
  margin-left: 2%;
}

.ipsGrid > [class*="ipsGrid_span"]:first-child {
  margin-left: 0;
}

.feature {
  display: flex;
  align-items: center;
}

.card {
  margin-bottom: 30px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 1px 1px 5px 1px #cccccc;
  /*   transition: 0.3s; */
}

.featured-image-container .card {
  padding: 10px;
  height: 0;
  padding-bottom: calc(100% - 10px);
}

h2.heading_large {
  font-size: 1.8em;
}

img {
  max-width: 100%;
}

.header-section {
  margin: 200px auto;
}

.gs_reveal {
  opacity: 0;
  visibility: hidden;
  will-change: transform, opacity;
}
</style>
