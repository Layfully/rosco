<template>
  <Layout :showFooter="false">
    <main>
      <header
        class="offer__title text-center flex--set flex--content-center"
        :style="{
          backgroundImage:
            'linear-gradient(50deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .3)), url(' +
               bgImage +
            ')',
        }"
      >
        <h1>{{ $page.offer.title }}</h1>
      </header>
      <article class="page-container" v-html="$page.offer.content"></article>
    </main>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.offer.title,
      meta: [
        {
          name: "description",
          key: "description",
          content: this.$page.offer.meta_description,
        },
        // OpenGraph data (Most widely used)
        {
          property: "og:title",
          content: "Rosco Serwis - " + this.$page.offer.title,
        },
        { property: "og:site_name", content: "Rosco Serwis" },
        // The list of types is available here: http://ogp.me/#types
        { property: "og:type", content: "website" },
        // Should the the same as your canonical link, see below.
        {
          property: "og:url",
          content: "https://www.roscoserwis.pl".concat(this.$page.offer.path),
        },
        {
          property: "og:image",
          content: "https://www.roscoserwis.pl".concat(
            this.$page.offer.offer_image
          ),
        },
        // Often the same as your meta description, but not always.
        {
          property: "og:description",
          content: this.$page.offer.meta_description,
        },

        // Twitter card
        { name: "twitter:card", content: "summary" },
        {
          name: "twitter:site",
          content: "https://www.roscoserwis.pl".concat(this.$page.offer.path),
        },
        {
          name: "twitter:title",
          content: "Rosco Serwis - " + this.$page.offer.title,
        },
        {
          name: "twitter:description",
          content: this.$page.offer.meta_description,
        },
        {
          name: "twitter:image:src",
          content: "https://www.roscoserwis.pl".concat(
            this.$page.offer.offer_image_png
          ),
        },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://www.roscoserwis.pl".concat(this.$page.offer.path),
        },
      ],
    };
  },
  computed: {
    bgImage() {
      return this.$hasWebpSupport ? this.$page.offer.offer_image : this.$page.offer.offer_image_png
    }
  }
};
</script>

<page-query>
query Offer ($id: ID!) {
  offer: offer (id: $id) {
    title
    content
    meta_description
    offer_image (width: 1349, height: 286)
    offer_image_png (width: 1349, height: 286)
    path
  }
}
</page-query>

<style lang="scss" scoped>
.offer__title {
  padding: 100px;
  background-size: cover;
  background-position-x: center;

  & > h1 {
    color: white;
    text-shadow: 2px 5px 4px rgba(0, 0, 0, 1);
  }
}
</style>
