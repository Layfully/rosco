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

import MontserratRegular from "~/assets/fonts/MontserratRegular.woff2"
import MontserratSemiBold from "~/assets/fonts/MontserratSemiBold.woff2"
import LatoRegular from "~/assets/fonts/LatoRegular.woff2"


  function check_webp_feature (feature, callback) {
    var kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
        callback(feature, result);
    };
    img.onerror = function () {
        callback(feature, false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
  }

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

  if (isClient) {
    check_webp_feature('lossy', function (feature, isSupported) {
      if (isSupported) {
        Vue.prototype.$hasWebpSupport = isSupported
      }  
    });
  }

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
  }

  head.link.push({
    rel: 'preconnect',
    href: 'https://www.gstatic.com'
  })


  head.link.push({
    rel: 'preconnect',
    href: 'https://www.google.com'
  })

  head.link.push({
    rel: 'preload',
    as: 'font',
    crossorigin: 'crossorigin',
    type: 'font/woff2',
    href: MontserratRegular
  })

  head.link.push({
    rel: 'preload',
    as: 'font',
    crossorigin: 'anonymous',
    type: 'font/woff2',
    href: MontserratSemiBold
  })

  head.link.push({
    rel: 'preload',
    as: 'font',
    crossorigin: 'anonymous',
    type: 'font/woff2',
    href: LatoRegular
  })

  head.meta.push({
    name: 'keywords',
    content: 'Usługi elektryczne, pomiary, remonty silników, obsługa techniczna, instalacje elektryczne, konserwacje suwnic, przeglądy suwnic, utrzymanie ruchu przemysłowego, firma elektryczna'
  })

  head.htmlAttrs = { lang: 'pl-PL'}
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}
