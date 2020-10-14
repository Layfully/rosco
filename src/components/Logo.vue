<template>
  <g-link class="logo" to="/">
    <g-image
      src="@/assets/image/rosco_logo.webp"
      class="logo__image"
      alt="Rosco"
      height="65"
      width="250"
      fit="inside"
    ></g-image>
  </g-link>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  name: "logo",
  methods: {
    logoHeight() {
      return window.matchMedia("(min-width: 600px)").matches;
    },
  },
};
</script>

<style lang="scss">
.logo {
  margin-left: 2em;
  &__image {
    vertical-align: middle;
    filter: var(--logo-filter-shadow) var(--logo-filter-brightness)
      var(--logo-filter-invert);
    max-width: 50%;

    @include md {
      max-width: 70%;
    }
  }
}
</style>
