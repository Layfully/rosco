<template>
  <div class="recaptcha">
    <span class="material-icons">info</span>
    <p class="recaptcha__content">
      Ta strona jest chroniona przez reCAPTCHA.
      <a class="recaptcha__link" href="https://policies.google.com/privacy"
        >Polityka Prywatności</a
      >
      oraz
      <a class="recaptcha__link" href="https://policies.google.com/terms"
        >Warunki Usługi</a
      >
      Google zobowiązują.
    </p>
  </div>
</template>
<style lang="scss" scoped>
.recaptcha {
  margin: var(--space) 0;
  background: var(--bg-color-dark);
  padding: 15px;
  display: flex;
  align-items: center;

  @include sm {
    margin: 0;
    margin-top: calc(var(--space) / 4);
  }

  &__link {
    border: 1px solid white;
    padding: 2px 8px;
    font-weight: bold;
    transition: background-color var(--transition-time-long),
      color var(--transition-time-long);
    white-space: nowrap;
    &:hover {
      background: white;
      color: black;
    }
  }

  &__content {
    width: 100%;
    font-size: 0.8rem;
    margin: 0 0 0 15px;
    line-height: 1.4rem;
    word-wrap: none;
    word-break: keep-all;
  }
}
</style>
