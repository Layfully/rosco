<template functional>
  <g-link class="logo" to="/">
    <g-image
      src="@/assets/image/rosco_logo.webp"
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

<style lang="scss" scoped>
.logo {
  width: 80px;
  display: flex;

  filter: var(--logo-filter-shadow) var(--logo-filter-brightness)
    var(--logo-filter-invert);

  @include md {
    width: 110px;
  }
}
</style>
