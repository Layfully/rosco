<template>
  <Layout>
    <main>
      <header
        class="main__image flex--set flex--align-items-center"
        :style="{
          backgroundImage:
            'linear-gradient(50deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(' +
            $page.pageData.main_image.src +
            ')',
        }"
      >
        <div
          class="main__image__container flex--column flex--align-items-center text-center"
        >
          <transition name="fade-image" appear>
            <h1 class="main__image__message text-large space-bottom">
              {{ $page.pageData.title }}
            </h1>
          </transition>
          <transition name="fade-image" appear>
            <p
              class="page-container main__image__message text-medium space-bottom"
              v-html="$page.pageData.description"
            ></p>
          </transition>
          <transition name="fade-image" appear>
            <ScrollDown anchor="#content" />
          </transition>
        </div>
      </header>
      <article id="content">
        <div class="about page-container" v-html="$page.pageData.content"></div>
      </article>
    </main>
  </Layout>
</template>

<page-query>
query {
  pageData(path: "/content/pages/about/") {
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
    link: [{ rel: "canonical", href: window.location.origin + "/o-firmie/" }],
    meta: [
      {
        name: "description",
        content:
          "Rosco Serwis to firma, która powstała w roku 2020 w wyniku podziału branży elektrycznej Erbetu. Chcesz wiedzieć więcej? Odwiedź tą stronę.",
      },
      // OpenGraph data (Most widely used)
      { property: "og:title", content: "Rosco Serwis - O firmie" },
      { property: "og:site_name", content: "Rosco Serwis" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.origin + "/o-firmie/" },
      {
        property: "og:image",
        content: window.location.origin + "/uploads/onas1.webp",
      },
      {
        property: "og:description",
        content:
          "Rosco Serwis to firma, która powstała w roku 2020 w wyniku podziału branży elektrycznej Erbetu. Chcesz wiedzieć więcej? Odwiedź tą stronę.",
      },

      // Twitter card
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: window.location.origin + "/o-firmie/" },
      { name: "twitter:title", content: "Rosco Serwis - O firmie" },
      {
        name: "twitter:description",
        content:
          "Rosco Serwis to firma, która powstała w roku 2020 w wyniku podziału branży elektrycznej Erbetu. Chcesz wiedzieć więcej? Odwiedź tą stronę.",
      },
      {
        name: "twitter:image:src",
        content: window.location.origin + "/uploads/onas1.webp",
      },
    ],
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
