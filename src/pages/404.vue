<template>
  <Layout :showFooter="false">
    <main class="error__container">
      <section class="page-container text-center">
        <header>
          <h1 class="error-number">404</h1>
          <h2>Oops! Ta strona nie istnieje.</h2>
        </header>
        <p>
          Przykro nam, ale strona, której szukasz nie istnieje. Prosimy o
          sprawdzenie wprowadzonego adresu, lub o skorzystanie z nawigacji.
        </p>
        <div class="button__container">
          <g-link to="/" class="button">Powrót do strony głównej </g-link>
          <g-link to="/kontakt" class="button">Skontaktuj się z nami </g-link>
        </div>
      </section>
    </main>
  </Layout>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.error-number {
  font-size: 6rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(255, 0, 0, 0.3)),
    url("~@/assets/image/electricpower.webp");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-clip: text;
  color: transparent;

  @include sm {
    font-size: 10rem;
  }
}

.button__container {
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;

  @include sm {
    width: 90%;
  }

  @include md {
    width: 80%;
  }

  @include lg {
    width: 70%;
  }
}

.error__container {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  height: calc(100vh - var(--header-height));
  margin: 0 5px;
}

.button {
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  align-items: center;
  justify-content: center;

  border: 2px solid var(--title-color);
  padding: calc(var(--space) / 4) 5px;
  margin: 0 10px;

  font-weight: 600;
  text-decoration: none;

  border-color: black;
  color: black;

  font-size: 0.95rem;

  transition: background-color var(--transition-time-long) ease,
    color var(--transition-time-long) ease;

  @include sm {
    font-size: 1rem;
    padding: calc(var(--space) / 6) 0px;
  }

  &:hover {
    background-color: black;
    color: white;
  }
}
</style>