<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__header">
            <slot name="header">default header</slot>
          </div>

          <div>
            <slot name="body">default body</slot>
          </div>

          <div>
            <slot name="footer">
              <button class="button button--black" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.modal {
  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    display: table;
    transition: opacity var(--transition-time) ease;
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    width: 100%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: var(--bg-color-dark);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all var(--transition-time) ease;

    @include sm {
      width: 500px;
    }
  }

  &__title {
    margin-top: 0;
    text-align: center;

    &-error {
      @extend .modal__title;
      color: var(--error-color);
    }

    &-success {
      @extend .modal__title;
      color: var(--success-color);
    }
  }
}
p {
  white-space: pre-line;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal__container,
.modal-leave-active .modal__container {
  transform: scale(1.1);
}
</style>
