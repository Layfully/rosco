<template>
  <a
    :href="anchor"
    v-scroll-to="{
      el: anchor,
      offset: () => (isMobile() ? -76 : -111),
    }"
    class="scroll-down flex--column flex--align-items-center"
  >
    <div class="mouse">
      <span></span>
    </div>
    <div class="arrow"></div>
  </a>
</template>

<script>
export default {
  name: "ScrollDown",
  props: ["anchor"],
  methods: {
    isMobile() {
      return !window.matchMedia("(min-width: 600px)").matches;
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-down {
  display: flex;
}

.mouse {
  width: 1.3rem;
  height: 3rem;
  border: 2px solid #fff;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  display: flex;

  & span {
    width: 0.6rem;
    height: 0.6rem;
    background-color: #fff;
    display: block;
    border-radius: 50%;
    margin: auto;
    animation: move-wheel 1s linear infinite;
  }
}

.arrow {
  display: block;
  width: 0.9rem;
  height: 0.9rem;
  border: 2px solid transparent;
  border-right-color: #fff;
  border-bottom-color: #fff;
  transform: rotate(45deg);
  animation: arrow-down 1s alternate infinite;
}

@keyframes move-wheel {
  0% {
    opacity: 0;
    transform: translateY(-1rem);
  }

  100% {
    opacity: 1;
    transform: translateY(1rem);
  }
}

@keyframes arrow-down {
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.5;
  }

  75% {
    opacity: 0.75;
  }

  100% {
    opacity: 1;
  }
}
</style>