<template>
  <Layout>
    <main>
      <header
        class="main__image"
        :style="{
          backgroundImage:
            'linear-gradient(50deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(' +
            $page.pageData.main_image +
            ')',
        }"
      >
        <div class="main__image__container text-center">
          <transition name="fade-image" appear>
            <h1 class="main__image__message text-large space-bottom">
              {{ $page.pageData.title }}
            </h1>
          </transition>
          <transition name="fade-image" appear>
            <p
              class="page-container main__image__message text-medium space-bottom"
            >
              {{ $page.pageData.description }}
            </p>
          </transition>
          <transition name="fade-image" appear>
            <ScrollDown anchor="#content" />
          </transition>
        </div>
      </header>
      <article id="content">
        <div class="about page-container">
          <h2 class="text-center margin-space-auto">
            Opis działalności firmy Rosco Serwis
          </h2>
          <hr class="margin-space-auto" />
          <section v-html="$page.pageData.content"></section>
        </div>
      </article>
    </main>
  </Layout>
</template>

<page-query>
query {
  pageData: pageData(path: "/content/pages/about/") {
    main_image
    description
    title
    content
  }
}
</page-query>

<script>
import ScrollDown from "@/components/ScrollDown.vue";

export default {
  name: "About",
  metaInfo: {
    title: "O firmie",
  },
  components: {
    ScrollDown,
  },
};
</script>

<style lang="scss">
.margin-space-auto {
  //move to general class
  margin: calc(var(--space) / 1.5) auto;
}

li {
  margin-left: 0.5rem;
}
</style>