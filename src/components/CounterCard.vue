<template>
  <div class="counter-card flex--column flex--align-items-center">
    <transition name="slide">
      <span
        v-if="isVisible"
        role="img"
        :aria-label="counter.iconalt"
        class="icon-big"
        >{{ counter.icon }}</span
      >
    </transition>
    <CountTo
      ref="counter"
      :startVal="0"
      :endVal="counter.endValue"
      :duration="3000"
      :autoplay="false"
      v-view.once="viewHandler"
      class="counter-card__counter"
    ></CountTo>
    <h3 class="counter-card__title">{{ counter.title }}</h3>
  </div>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  data() {
    return {
      isVisible: false,
    };
  },
  props: {
    counter: {
      type: Object,
      required: true,
    },
  },
  components: {
    CountTo,
  },
  methods: {
    viewHandler(event) {
      if (event.type === "enter") {
        this.$refs["counter"].start();
        this.isVisible = true;
      }

      if (event.type === "exit") {
        this.isVisible = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.counter-card {
  margin: var(--space) 0;
  font-family: "Montserrat", "Verdana", "sans-serif";
  font-weight: 600;
  letter-spacing: 0.03rem;
  color: white;
  display: flex;
  font-size: 0.75em;

  > h3 {
    color: white;
  }

  @include md {
    width: 25%;
    margin: calc(var(--space) / 4) 0;
  }

  @include lg {
    margin: calc(var(--space));
    width: calc(25% - (var(--space) * 3));
  }

  &__counter {
    font-size: 1.5rem;
    margin: calc(var(--space) / 4) 0;
  }
}

.before-enter {
  opacity: 0;
  transition: all calc(var(--transition-time-long) * 2);
}
.enter {
  opacity: 1;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
