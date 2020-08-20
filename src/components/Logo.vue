<template>
  <g-link class="logo" to="/">
    <g-image
      src="@/assets/image/rosco_logo.png"
      class="logo__image"
      alt="Rosco"
      width="200px"
      height="80%"
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

<style lang="scss">
.logo {
  margin-left: 2em;
  &__image {
    vertical-align: middle;
    filter: var(--logo-filter-shadow) var(--logo-filter-brightness);
  }
}
</style>
