<template>
  <Layout>
    <template #heading>
      <header
        v-if="!pageVisited"
        class="main__image flex--set flex--content-center flex--align-items-center"
        :style="{
          backgroundImage:
            'linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)), url(' +
            $page.pageData.welcome_screen.main_image +
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
          <div class="grid__row flex--set flex--content-center flex--wrap">
            <OfferCard
              v-for="offer in $page.posts.edges"
              :key="offer.node.id"
              :offer="offer.node"
            />
          </div>
        </div>
        <div class="grid__container gradient">
          <h2>Rosco Serwis w liczbach</h2>

          <section class="grid__row flex--set flex--content-center flex--wrap">
            <CounterCard
              v-for="(counter, i) in $page.pageData.counters"
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
        title
        card_image (width: 400, height: 300, quality:100, fit: outside)
        path
      }
    }
  }

  pageData(path: "/content/pages/home/"){
    welcome_screen {
      welcome_text
      welcome_button
      main_image
    }

    offer_title

    counters {
      icon
      title
      value
    }
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
    title: "Strona główna",
    link: [
      { rel: 'canonical', href: 'https://www.roscoserwis.pl/'}
    ],
    meta: [
      // OpenGraph data (Most widely used)
      {property: 'og:title', content: 'Rosco Serwis - Strona Główna'},
      {property: 'og:site_name', content: 'Rosco Serwis'},
      // The list of types is available here: http://ogp.me/#types
      {property: 'og:type', content: 'website'},
      // Should the the same as your canonical link, see below.
      {property: 'og:url', content: 'https://www.roscoserwis.pl/'},
      {property: 'og:image', content: 'https://www.roscoserwis.pl/uploads/landing_photo.webp'},
      // Often the same as your meta description, but not always.
      {property: 'og:description', content: 'Rosco Serwis jest liderem w branży elektrycznej w Nowym Sączu - Poznaj naszą szeroką ofertę i skontaktuj się z nami!'},
      
      // Twitter card
      {name: 'twitter:card', content: 'summary'},
      {name: 'twitter:site', content: 'https://www.roscoserwis.pl/'},
      {name: 'twitter:title', content: 'Rosco Serwis - Strona Główna'},
      {name: 'twitter:description', content: 'Rosco Serwis jest liderem w branży elektrycznej w Nowym Sączu - Poznaj naszą szeroką ofertę i skontaktuj się z nami!'},
      {name: 'twitter:image:src', content: 'https://www.roscoserwis.pl/uploads/landing_photo.webp'},

    ]
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
    margin: 0 auto var(--space);
    color: white;
  }
}

.grid {
  text-align: center;

  &__container {
    margin: calc(var(--space) / 4) 0;
    width: 100%;

    & > h1, h2 {
      color: white !important;
    }
  }

  &__row {
    @include md {
      margin: 0 auto;
      width: 79%;
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
