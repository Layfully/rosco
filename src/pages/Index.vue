<template>
  <Layout :show-logo="true" :applyMargin="false">
    <!-- Author intro -->
    <!--<Author :show-title="true" /> -->
    <!-- List offers -->
    <div class="grid">
      <h2>Nasza oferta</h2>
      <div class="grid__row" v-for="i in offerRowCount" :key="'row-' + i">
        <OfferCard
          v-for="offer in $page.posts.edges.slice((i - 1) * offerRowCount, i * offerRowCount)"
          :key="offer.node.id"
          :offer="offer.node"
        />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  posts: allOffer(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "D. MMMM YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10)
        ...on Offer {
        id
        title
        path
        }
        path
      }
    }
  }
}
</page-query>

<script>
import Author from "@/components/Author.vue";
import OfferCard from "@/components/OfferCard.vue";

export default {
  components: {
    Author,
    OfferCard,
  },
  metaInfo: {
    title: "Home",
  },
  data() {
    return {
      offersPerRow: 2,
    };
  },
  computed: {
    offerRowCount() {
      return Math.ceil(this.$page.posts.edges.length / this.offersPerRow);
    },
  },
};
</script>
<style lang="scss" scoped>
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    @include md {
      flex-direction: row;
    }
  }
}
</style>
