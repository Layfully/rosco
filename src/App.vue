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
  src: url("./assets/fonts/Montserrat400.eot"); /* IE9 Compat Modes */
  src: url("./assets/fonts/Montserrat400.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("./assets/fonts/Montserrat400.otf") format("opentype"),
    /* Open Type Font */ url("./assets/fonts/Montserrat400.svg") format("svg"),
    /* Legacy iOS */ url("./assets/fonts/Montserrat400.ttf") format("truetype"),
    /* Safari, Android, iOS */ url("./assets/fonts/Montserrat400.woff")
      format("woff"),
    /* Modern Browsers */ url("./assets/fonts/Montserrat400.woff2")
      format("woff2"); /* Modern Browsers */
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/Montserrat700.eot"); /* IE9 Compat Modes */
  src: url("./assets/fonts/Montserrat700.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("./assets/fonts/Montserrat700.otf") format("opentype"),
    /* Open Type Font */ url("./assets/fonts/Montserrat700.svg") format("svg"),
    /* Legacy iOS */ url("./assets/fonts/Montserrat700.ttf") format("truetype"),
    /* Safari, Android, iOS */ url("./assets/fonts/Montserrat700.woff")
      format("woff"),
    /* Modern Browsers */ url("./assets/fonts/Montserrat700.woff2")
      format("woff2"); /* Modern Browsers */
  font-weight: bold;
  font-style: normal;
}

/* font converted using font-converter.net. thank you! */
@font-face {
  font-family: "Lato";
  src: url("./assets/fonts/Lato400.eot"); /* IE9 Compat Modes */
  src: url("./assets/fonts/Lato400.eot?#iefix") format("embedded-opentype"),
    /* IE6-IE8 */ url("./assets/fonts/Lato400.otf") format("opentype"),
    /* Open Type Font */ url("./assets/fonts/Lato400.svg") format("svg"),
    /* Legacy iOS */ url("./assets/fonts/Lato400.ttf") format("truetype"),
    /* Safari, Android, iOS */ url("./assets/fonts/Lato400.woff") format("woff"),
    /* Modern Browsers */ url("./assets/fonts/Lato400.woff2") format("woff2"); /* Modern Browsers */
  font-weight: normal;
  font-style: normal;
}

/* font converted using font-converter.net. thank you! */
@font-face {
  font-family: "Montserrat";
  src: url("./assets/fonts/Montserrat600.eot"); /* IE9 Compat Modes */
  src: url("./assets/fonts/Montserrat600.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("./assets/fonts/Montserrat600.otf") format("opentype"),
    /* Open Type Font */ url("./assets/fonts/Montserrat600.svg") format("svg"),
    /* Legacy iOS */ url("./assets/fonts/Montserrat600.ttf") format("truetype"),
    /* Safari, Android, iOS */ url("./assets/fonts/Montserrat600.woff")
      format("woff"),
    /* Modern Browsers */ url("./assets/fonts/Montserrat600.woff2")
      format("woff2"); /* Modern Browsers */
  font-weight: 600;
  font-style: normal;
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