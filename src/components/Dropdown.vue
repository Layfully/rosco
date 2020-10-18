<template>
  <div
    class="dropdown header__menu__link"
    :class="{ header__menu__link__active: isDropdownActive }"
  >
    <span>{{ title }}</span>
    <svg class="dropdown__triangle" viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
      />
    </svg>
    <div class="dropdown__menu">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="dropdown__menu__item flex--content-center"
        :class="{ dropdown__menu__item__active: isActive(item.node.path) }"
      >
        <g-link :to="item.node.path">{{ item.node.title }}</g-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: ["title", "items"],
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    isDropdownActive() {
      return (
        this.items.filter((value) => value.node.path === this.$route.path)
          .length > 0
      );
    },
  },
  methods: {
    isActive(path) {
      return path === this.$route.path;
    },
  },
};
</script>

<style lang="scss">
.dropdown {
  position: relative;

  svg {
    transition: transform var(--transition-time);
  }

  &:hover > svg {
    transform: rotateZ(90deg);
  }

  &:hover > &__menu {
    opacity: 1;
  }

  &__triangle {
    margin-left: calc(var(--space) / 10);
    margin-bottom: 1px;
  }

  &__menu {
    opacity: 0;
    height: 0px;
    transition: var(--transition-time);

    @include md {
      border: 1px solid var(--border-color);
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      width: 250%;
      top: 100%;
    }

    &__item {
      background-color: var(--bg-color);
      padding: 10px 14px;
      display: flex;
      transition: background-color var(--transition-time) ease;

      @include md {
        font-size: 0.8em;
        border-bottom: 1px solid var(--border-color);
      }

      &__active {
        background-color: var(--bg-color-dark);
      }

      &:hover {
        background-color: var(--bg-color-dark);
      }
    }
  }
}
</style>