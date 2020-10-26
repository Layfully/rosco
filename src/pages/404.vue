<template>
  <Layout :showFooter="false">
    <main class="error__container flex--set flex--align-items-center">
      <section class="page-container text-center">
        <header>
          <h1 class="error-number">{{ $static.pageData.error_number }}</h1>
          <h2>{{ $static.pageData.error_title }}</h2>
        </header>
        <<<<<<< HEAD
        <p>
          Przykro nam, ale strona, której szukasz nie istnieje. Prosimy o
          sprawdzenie wprowadzonego adresu, lub o skorzystanie z nawigacji.
        </p>
        =======
        <span v-html="$static.pageData.content"></span>
        >>>>>>> 2f343cdc5ea4c5face493bcae12f558a1168a5a7
        <div class="button__container flex--set">
          <!-- flex classes on button may be not needed review it-->
          <g-link
            to="/"
            class="button flex--content-center flex--align-items-center"
            <<<<<<<
            HEAD
            >Powrót do strony głównej ======= >{{
              $static.pageData.home_button_title
            }}
            >>>>>>> 2f343cdc5ea4c5face493bcae12f558a1168a5a7
          </g-link>
          <g-link
            to="/kontakt"
            class="button flex--content-center flex--align-items-center"
            >{{ $static.pageData.contact_button_title }}
          </g-link>
        </div>
      </section>
    </main>
  </Layout>
</template>

<static-query>
query {
  pageData(path: "/content/pages/not-found/") {
    error_number
    error_title
    contact_button_title
    home_button_title
    content
  }
}
</static-query>

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
  flex-wrap: wrap;

  height: calc(100vh - var(--header-height));
  margin: 0 5px;
}

.button {
  display: flex;
  flex-grow: 1;
  flex-basis: 0;

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
