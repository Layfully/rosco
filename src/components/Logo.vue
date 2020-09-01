<template>
  <g-link class="logo" to="/">
    <g-image
      src="@/assets/image/rosco_logo.png"
      class="logo__image"
      alt="Rosco"
      height="65px"
      width="250px"
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
    filter: var(--logo-filter-shadow) var(--logo-filter-brightness);
    max-width: 50%;

    @include md {
      max-width: 100%;
    }
  }
}
</style>
