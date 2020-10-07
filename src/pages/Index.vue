<template>
  <Layout>
    <template #heading>
      <header
        v-show="!pageVisited"
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
            <h2 class="main__image__message text-large text-center">
              {{ $page.pageData.welcome_screen.welcome_text }}
            </h2>
          </transition>
          <transition name="fade-image" appear>
            <a
              href="#content-start"
              v-scroll-to="{
                el: '#content-start',
                onDone: pageVisitedHanlder,
              }"
              class="main__image__button"
              >{{ $page.pageData.welcome_screen.welcome_button }}</a
            >
          </transition>
        </div>
      </header>
    </template>
    <main class="main-nomargin">
      <div class="grid">
        <h1>{{ $page.pageData.offer_title }}</h1>

        <div class="grid__container">
          <!--
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
-->
          <div class="grid__row">
            <OfferCard
              v-for="offer in $page.posts.edges"
              :key="offer.node.id"
              :offer="offer.node"
            />
          </div>
        </div>
        <div class="grid__container gradient">
          <h1>Rosco Serwis w liczbach</h1>

          <section class="grid__row">
            <CounterCard
              v-for="(counter, i) in counters"
              :key="'counter' + i"
              :counter="counter"
            />
          </section>
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
import CounterCard from "@/components/CounterCard.vue";

export default {
  components: {
    Author,
    OfferCard,
    CounterCard,
  },
  metaInfo: {
    title: "Home",
  },

  data() {
    return {
      offersPerRow: 2,
      isMounted: false,
      pageVisited: false,
      counters: [
        {
          endValue: 700000,
          title: "Metrów położonych kabli",
          icon: "swap_calls",
        },
        { endValue: 700000, title: "Lat doświadczenia", icon: "access_time" },
        { endValue: 700000, title: "Wypitych kaw", icon: "local_cafe" },
        {
          endValue: 700000,
          title: "Przewiniętych silników",
          icon: "shutter_speed",
        },
      ],
    };
  },
  mounted() {
    this.pageVisited = JSON.parse(localStorage.getItem("pageVisited"))
      ? true
      : false;
  },
  computed: {
    offerRowCount() {
      return Math.ceil(this.$page.posts.edges.length / this.offersPerRow);
    },
  },
  methods: {
    pageVisitedHanlder() {
      this.pageVisited = true;
      localStorage.setItem("pageVisited", this.pageVisited);
    },
  },
};
</script>
<style lang="scss">
.main__image {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)),
    url("/images/uploads/landing_photo.jpg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  min-height: 100vh;
  width: 100%;
  padding: 15% 5%;
  display: flex;
  align-items: center;
  justify-content: center;

  @include md {
    padding: 0;
  }

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
    color: white;

    @include sm {
      margin-bottom: 1em;
    }
    font-family: "Montserrat", "New York,", serif !important;
  }

  &__button {
    font-weight: bold;
    border: 2px solid var(--title-color);
    padding: 7px 20px;
    color: white !important;
    border-color: white;
    transition: background-color var(--transition-time-long) ease,
      color var(--transition-time-long) ease,
      border-color var(--transition-time-long) ease;

    &:hover {
      background-color: white;
      color: black !important;
    }
  }
}

.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &__container {
    margin: calc(var(--space) / 4) 0;
    width: 100%;

    & > h1 {
      color: white !important;
    }
  }

  &__row {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;

    @include md {
      margin: 0 auto;
      width: 79%;
      flex-direction: row;
    }
  }
}

.gradient {
  background: url("~@/assets/image/bar.jpg");
  background-size: cover;
  background-attachment: fixed;
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
