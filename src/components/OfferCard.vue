<template>
  <div class="offer-card" v-scrollAnimation>
    <g-link :to="offer.path">
      <span>
        <g-image
          alt="Cover image"
          v-if="offer.cover_image"
          class="offer-card__image"
          :src="offer.cover_image"
        />
        <span class="offer-card__title">
          <h3>{{ offer.title }}</h3>
        </span>
      </span>
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
  margin: calc(var(--space) / 4);
  text-align: center;
  color: white;
  position: relative;
  width: 100%;

  &__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: all ease 0.4s;
    filter: brightness(80%) blur(0px);
    &:hover {
      transform: scale(1.05);
      filter: brightness(65%);
    }
  }

  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    > h3 {
      margin: 0;
      color: white;
      text-shadow: 0 4px 4px black;
    }
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
