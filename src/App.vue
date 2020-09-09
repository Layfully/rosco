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
<style>
.grecaptcha-badge {
  visibility: hidden;
}
</style>