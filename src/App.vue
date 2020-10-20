<template>
  <transition name="fade" appear>
    <router-view />
  </transition>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$static.metadata.siteDescription,
        },
      ],
    };
  },
};
</script>

<style scoped>
#app {
  background: url("~@/assets/image/background.webp");
}

.fade-enter-active {
  transition: opacity 1s, transform var(--transition-time-long);
}

.fade-enter {
  opacity: 0;
}
</style>
<style lang="scss">
@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/MontserratRegular.eot"); /* IE9 Compat Modes */
  src: url("./assets/fonts/MontserratRegular.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/MontserratRegular.woff2") format("woff2"),
    /* Modern Browsers */ /* IE6-IE8 */
      url("./assets/fonts/MontserratRegular.otf") format("opentype"),
    /* Open Type Font */ url("./assets/fonts/MontserratRegular.svg")
      format("svg"),
    /* Legacy iOS */ url("./assets/fonts/MontserratRegular.ttf")
      format("truetype"),
    /* Safari, Android, iOS */ url("./assets/fonts/MontserratRegular.woff")
      format("woff");
  /* Modern Browsers */
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* font converted using font-converter.net. thank you! */
@font-face {
  font-family: "Lato";
  src: url("./assets/fonts/LatoRegular.eot"); /* IE9 Compat Modes */
  src: url("./assets/fonts/LatoRegular.eot?#iefix") format("embedded-opentype"),
    url("./assets/fonts/LatoRegular.woff2") format("woff2"),
    /* Modern Browsers */ /* IE6-IE8 */ url("./assets/fonts/LatoRegular.otf")
      format("opentype"),
    /* Open Type Font */ url("./assets/fonts/LatoRegular.svg") format("svg"),
    /* Legacy iOS */ url("./assets/fonts/LatoRegular.ttf") format("truetype"),
    /* Safari, Android, iOS */ url("./assets/fonts/LatoRegular.woff")
      format("woff");
  /* Modern Browsers */
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* font converted using font-converter.net. thank you! */
@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/MontserratSemiBold.eot"); /* IE9 Compat Modes */
  src: url("./assets/fonts/MontserratSemiBold.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/MontserratSemiBold.woff2") format("woff2"),
    /* Modern Browsers */ /* IE6-IE8 */
      url("./assets/fonts/MontserratSemiBold.otf") format("opentype"),
    /* Open Type Font */ url("./assets/fonts/MontserratSemiBold.svg")
      format("svg"),
    /* Legacy iOS */ url("./assets/fonts/MontserratSemiBold.ttf")
      format("truetype"),
    /* Safari, Android, iOS */ url("./assets/fonts/MontserratSemiBold.woff")
      format("woff");
  /* Modern Browsers */
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "icons";
  src: url("./assets/fonts/icons.eot");
  src: url("./assets/fonts/icons.eot#iefix") format("embedded-opentype"),
    url("./assets/fonts/icons.svg?#icons") format("svg"),
    url("./assets/fonts/icons.ttf") format("truetype"),
    url("./assets/fonts/icons.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.grecaptcha-badge {
  visibility: hidden;
}

.page-container {
  margin: calc(var(--space) / 4) calc(var(--space) / 2);

  @include sm {
    margin: calc(var(--space) / 4) auto;
    width: 79%;
  }
}

//general hr move somewhere global
hr {
  height: 5px;
  width: 70px;
  border: none;

  color: var(--overlay-color);
  background-color: var(--overlay-color);
}
</style>