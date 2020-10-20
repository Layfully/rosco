<template>
  <Layout>
    <template #heading>
      <header
        v-if="!pageVisited"
        class="main__image flex--set flex--content-center flex--align-items-center"
        :style="{
          backgroundImage:
            'linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(' +
            $page.pageData.welcome_screen.welcome_image +
            ')',
        }"
      >
        <div
          class="main__image__container flex--set flex--column flex--align-items-center"
        >
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
              class="button button--white"
              >{{ $page.pageData.welcome_screen.welcome_button }}</a
            >
          </transition>
        </div>
      </header>
    </template>
    <main class="main-nomargin">
      <div class="grid flex--set flex--column">
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
          <div class="grid__row flex--set flex--content-center">
            <OfferCard
              v-for="offer in $page.posts.edges"
              :key="offer.node.id"
              :offer="offer.node"
            />
          </div>
        </div>
        <div class="grid__container gradient">
          <h1>Rosco Serwis w liczbach</h1>

          <section class="grid__row flex--set flex--content-center">
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
        card_image (width: 400, height: 300, quality:100, fit: outside)
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
import OfferCard from "@/components/OfferCard.vue";
import CounterCard from "@/components/CounterCard.vue";

export default {
  components: {
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
          iconalt: "ikona kabli",
        },
        {
          endValue: 700000,
          title: "Lat doświadczenia",
          icon: "access_time",
          iconalt: "ikona zegaru",
        },
        {
          endValue: 700000,
          title: "Wypitych kaw",
          icon: "local_cafe",
          iconalt: "ikona kubka kawy",
        },
        {
          endValue: 700000,
          title: "Przewiniętych silników",
          icon: "shutter_speed",
          iconalt: "ikona silnika",
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
    url("/images/uploads/landing_photo.webp");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;

  min-height: 100vh;
  width: 100%;
  padding: 15% 5%;

  @include md {
    padding: 0;
  }

  &__container {
    color: var(--title-color);
  }

  &__message {
    margin: 0 auto;
    color: white;

    @include sm {
      margin-bottom: 1em;
    }
  }
}

.grid {
  text-align: center;

  &__container {
    margin: calc(var(--space) / 4) 0;
    width: 100%;

    & > h1 {
      color: white !important;
    }
  }

  &__row {
    flex-direction: column;
    flex-wrap: wrap;

    @include md {
      margin: 0 auto;
      width: 79%;
      flex-direction: row;
    }
  }
}

.gradient {
  background: url("~@/assets/image/bar.webp");
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
