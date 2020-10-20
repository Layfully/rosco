<template>
  <Layout :showFooter="false">
    <main>
      <header
        class="offer__title text-center"
        :style="{
          backgroundImage:
            'linear-gradient(50deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .3)), url(' +
            $page.offer.offer_image.src +
            ')',
        }"
      >
        <h1>{{ $page.offer.title }}</h1>
      </header>
      <article class="page-container" v-html="$page.offer.content">
      </article>
    </main>
  </Layout>
</template>

<script>
export default {
  components: {},
  metaInfo() {
    return {
      //title: this.$page.post.title,
      meta: [
        {
          //  name: 'description',
          //  content: this.$page.post.description
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
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    content
    offer_image (width: 1349, height: 286)
  }
}
</page-query>

<style lang="scss" scoped>
.offer__title {
  padding: 100px;
  background-size:cover;
  background-position-x: center;

  & > h1 {
    color: white;
    text-shadow: 2px 5px 4px rgba(0, 0, 0, 1);
  }
}
</style>
