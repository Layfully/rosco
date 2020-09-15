<template>
  <Layout>
    <template #heading>
      <header
        class="main__image"
        :style="{
          backgroundImage:
            'linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(' +
            $page.pageData.welcome_screen.welcome_image +
            ')',
        }"
      >
        <div class="main__image__container">
          <transition name="fade-image" appear>
            <h2
              class="main__image__message text-center"
            >{{ $page.pageData.welcome_screen.welcome_text }}</h2>
          </transition>
          <transition name="fade-image" appear>
            <a
              href="#"
              v-scroll-to="'#content-start'"
              class="main__image__button"
            >{{ $page.pageData.welcome_screen.welcome_button }}</a>
          </transition>
        </div>
      </header>
    </template>
    <main class="main-nomargin">
      <CountTo
        :startVal="0"
        :endVal="700000"
        :duration="3000"
        :autoplay="false"
        v-view="countHandler()"
      ></CountTo>
      <CountTo
        :startVal="0"
        :endVal="1800"
        :duration="3000"
        :autoplay="false"
        v-view="countHandler()"
      ></CountTo>
      <CountTo
        :startVal="0"
        :endVal="1800"
        :duration="3000"
        :autoplay="false"
        v-view="countHandler()"
      ></CountTo>
      <CountTo
        :startVal="0"
        :endVal="1800"
        :duration="3000"
        :autoplay="false"
        v-view="countHandler()"
      ></CountTo>
      <div class="grid">
        <h2>{{ $page.pageData.offer_title }}</h2>
        <div class="grid__row" v-for="i in offerRowCount" :key="'row-' + i">
          <OfferCard
            v-for="offer in $page.posts.edges.slice(
              (i - 1) * offerRowCount,
              i * offerRowCount
            )"
            :key="offer.node.id"
            :offer="offer.node"
          />
        </div>
      </div>
    </main>
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

  pageData: pageData(path: "/content/pages/home/"){
    welcome_screen {
      welcome_text
      welcome_button
      welcome_image
    }

    offer_title
  }
}
</page-query>

<script>
import Author from "@/components/Author.vue";
import OfferCard from "@/components/OfferCard.vue";
import CountTo from "vue-count-to";

export default {
  components: {
    Author,
    OfferCard,
    CountTo,
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
  methods: {
    viewHandler() {},
  },
};
</script>
<style lang="scss">
.main__image {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)),
    url("/images/uploads/landing_photo.jpg");
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  width: 100%;
  &__container {
    height: 100%;
    color: var(--title-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__message {
    margin: 0;
    margin-bottom: 1em;
    font-family: "MS Serif", "New York,", serif !important;
    font-size: 4em;
  }

  &__button {
    font-weight: bold;
    border: 2px solid var(--title-color);
    padding: 7px 20px;
    color: var(--title-color);
    transition: background-color var(--transition-time-long) ease,
      color var(--transition-time-long) ease,
      border-color var(--transition-time-long) ease;

    &:hover {
      background-color: white;
      color: black;
    }
  }
}

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
    width: 100%;

    @include md {
      flex-direction: row;
    }
  }
}

.fade-image-enter-active {
  transition: opacity calc(var(--transition-time-long) * 3),
    transform var(--transition-time-long);
}

.fade-image-enter {
  opacity: 0;
  transform: translateY(-50px);
}
</style>
