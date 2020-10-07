// Import main css
import "~/assets/style/index.scss";

// Import default layout so we don't need to import it to every page
import DefaultLayout from "~/layouts/Default.vue";

// Import scroll animation
import ScrollAnimation from "~/directives/scrollAnimation.js";
var VueScrollTo = require("vue-scrollto");

//Import recaptcha v3
import { VueReCaptcha } from "vue-recaptcha-v3";

//Import checkView
import checkView from 'vue-check-view'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {
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
  Vue.use(VueReCaptcha, {
    siteKey: "6Le8cskZAAAAAIYn4d6487DGYYuM90XKJ79SMIHs",
  });
  Vue.use(checkView)

  router.options.scrollBehavior = function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }



    head.link.push({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap'
    })

    head.link.push({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Ubuntu&display=swap'
    })

    head.link.push({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Gotu&display=swap'
    })

    head.link.push({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Raleway&display=swap'
    })

    head.link.push({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap'
    })

    head.link.push({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Halant&display=swap'
    })
    // Set default layout as a global component
    Vue.component("Layout", DefaultLayout);

  }

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}
