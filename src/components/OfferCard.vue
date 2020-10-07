<template>
  <div class="offer-card" v-scrollAnimation>
    <g-link :to="offer.path">
      <g-image
        alt="Cover image"
        v-if="offer.cover_image"
        class="offer-card__image"
        :src="offer.cover_image"
      />
      <div class="offer-card__overlay">
        <span class="offer-card__title">
          <h3>{{ offer.title }}</h3>
        </span>
        <span class="offer-card__blocker"> </span>
      </div>
    </g-link>
  </div>
</template>

<script>
export default {
  props: {
    offer: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.offer-card {
  height: 300px;
  overflow: hidden;
  margin: calc(var(--space) / 4) calc(var(--space) / 2);
  text-align: center;
  color: white;
  position: relative;
  width: calc(100% - (var(--space)));

  @include md {
    margin: calc(var(--space) / 4);
    width: calc(50% - (var(--space) / 4 * 3));
  }

  @include lg {
    height: 300px;
    margin: calc(var(--space) / 4);
    width: calc(100% / 3 - var(--space) / 4 * 2);
  }

  @include big {
    height: 350px;
  }

  @include xl {
    height: 400px;
  }

  &:hover .offer-card__overlay {
    opacity: 0.9;
    cursor: pointer;
  }

  &:hover .offer-card__blocker {
    opacity: 0.9;
    cursor: pointer;
  }
  &:hover .offer-card__title {
    opacity: 1;
  }
  &:hover .offer-card__title {
    transform: translate(-50%, -50%);
  }

  &__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    filter: brightness(80%) blur(0px);
  }

  &__overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: var(--transition-time);
    background-color: var(--overlay-color);
  }

  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 80%);
    opacity: 0;
    transition: opacity 0.7s ease-out,
      transform var(--transition-time-long) ease;

    pointer-events: none;

    > h3 {
      color: white;
    }
  }

  &__blocker {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 69%);
    transition: var(--transition-time-long);
    pointer-events: none;
    height: 30%;
    width: 100%;
    background: inherit;
  }
}

.before-enter {
  opacity: 0;
  transition: all calc(var(--transition-time-long) * 2);
}
.enter {
  opacity: 1;
}
</style>
