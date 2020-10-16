<template>
  <g-link to="/">
    <g-image
      src="@/assets/image/rosco_logo.webp"
      class="logo__image"
      alt="Rosco"
      height="65"
      width="250"
      quality="100"
      fit="inside"
    ></g-image>
  </g-link>
</template>
<script>
export default {
  name: "logo",
};
</script>

<style lang="scss">
.logo {
  &__image {
    max-width: 65%;

    filter: var(--logo-filter-shadow) var(--logo-filter-brightness)
      var(--logo-filter-invert);

    @include md {
      max-width: 80%;
    }
  }
}
</style>
