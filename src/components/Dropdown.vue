<template>
  <div
    class="dropdown header__menu__link"
    :class="{'header__menu__link__active': isDropdownActive}"
    @mouseover="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <span>{{ title }}</span>
    <svg class="dropdown__triangle" viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
      />
    </svg>
    <transition name="fade" appear>
      <div class="dropdown__menu" v-if="isOpen">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="dropdown__menu__item"
          :class="{'dropdown__menu__item__active': isActive(item.node.path)}"
        >
          <g-link :to="item.node.path">{{ item.node.title }}</g-link>
        </div>
      </div>
    </transition>
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

  &__triangle {
    fill: var(--link-color);
    margin-left: calc(var(--space) / 6);
    margin-bottom: 3px;
  }

  &__menu {
    position: absolute;
    width: 250%;
    background-color: var(--bg-color);
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: var(--radius);
    border: 1px solid var(--border-color);
    z-index: 100;

    &__item {
      background-color: var(--bg-color);
      padding: 5px 14px;
      position: relative;
      text-align: center;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      font-size: 0.75em;
      transition: background-color 0.3s ease;

      &__active {
        background-color: var(--bg-color-dark);
      }

      &:hover {
        background-color: var(--bg-color-dark);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>