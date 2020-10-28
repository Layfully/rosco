<template>
  <Layout :showFooter="false">
    <main>
      <header
        class="offer__title text-center"
        :style="{
          backgroundImage:
            'linear-gradient(50deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .3)), url(' +
            $page.offer.offer_image +
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
          content: this.$page.offer.meta_description,
        },
        // OpenGraph data (Most widely used)
        {
          property: "og:title",
          content: "Rosco Serwis - " + this.$page.offer.title,
        },
        { property: "og:site_name", content: "Rosco Serwis" },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: window.location.origin + this.$page.offer.path,
        },
        {
          property: "og:image",
          content: window.location.origin + this.$page.offer.offer_image,
        },
        {
          property: "og:description",
          content: this.$page.offer.meta_description,
        },

        // Twitter card
        { name: "twitter:card", content: "summary" },
        {
          name: "twitter:site",
          content: window.location.origin + this.$page.offer.path,
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
          content: window.location.origin + this.$page.offer.offer_image,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: window.location.origin + this.$page.offer.path,
        },
      ],
    };
  },
};
</script>

<page-query>
query Offer ($id: ID!) {
  offer: offer (id: $id) {
    title
    content
    meta_description
    offer_image (width: 1349, height: 286)
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
