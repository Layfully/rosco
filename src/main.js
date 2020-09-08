// Import main css
import "~/assets/style/index.scss";

// Import default layout so we don't need to import it to every page
import DefaultLayout from "~/layouts/Default.vue";

// Import scroll animation
import ScrollAnimation from "~/directives/scrollAnimation.js";
var VueScrollTo = require("vue-scrollto");

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function(Vue, { router, head, isClient }) {
  Vue.directive("scrollAnimation", ScrollAnimation);
  Vue.use(VueScrollTo, {
    container: "body",
    duration: 1000,
    easing: [0.16, 1, 0.3, 1],
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true,
  });

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}
