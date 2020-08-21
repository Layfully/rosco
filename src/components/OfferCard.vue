<template>
  <div class="offer-card">
    <g-link :to="offer.path">
      <span>
        <g-image
          alt="Cover image"
          v-if="offer.cover_image"
          class="offer-card__image"
          :src="offer.cover_image"
        />
        <span class="offer-card__title">
          <h3>{{offer.title}}</h3>
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

<style lang="scss">
.offer-card {
  height: 300px;
  overflow: hidden;
  margin: calc(var(--space) / 4);
  text-align: center;
  color: white;
  position: relative;

  &__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: all ease 0.4s;
    filter: brightness(75%);
    &:hover {
      transform: scale(1.1);
      filter: brightness(120%);
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
      color: whitesmoke;
    }
  }
}
</style>
