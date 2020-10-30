<template>
  <div id="app">
    <slot name="heading" />

    <header
      id="content-start"
      class="header flex--set flex--align-items-center"
    >
      <Logo v-if="showLogo" />

      <input type="checkbox" id="nav-toggle" class="header__menu__toggle" />
      <nav class="header__menu">
        <ul class="header__menu__list">
          <transition-group name="slide" appear tag="li" class="flex--set">
            <span
              v-for="link in singleLinks"
              :key="link.name"
              class="flex--set"
            >
              <g-link
                :to="link.src"
                class="header__menu__link"
                exact-active-class="header__menu__link__active "
                >{{ link.name }}</g-link
              >
            </span>
            <span v-for="link in dropdownLinks" :key="link.name">
              <Dropdown :title="link.name" :items="link.src" />
            </span>
          </transition-group>
        </ul>
      </nav>
      <div class="header__menu__buttons">
        <label
          for="nav-toggle"
          class="header__menu__toggle__label flex--set flex--column"
        >
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
    </header>

    <slot />

    <footer class="footer flex--column">
      <div
        v-if="showFooter"
        class="footer__container flex--set flex--align-items-center"
      >
        <section class="footer__column content-box">
          <div v-html="$static.footer_about.content"></div>
        </section>
        <section
          class="footer__column footer__menu content-box"
        >
          <h4 class="space-bottom-small">Menu</h4>
          <nav>
            <p v-for="link in singleLinks" :key="link.name">
              <g-link :to="link.src" class="footer__link link--hover">{{
                link.name
              }}</g-link>
            </p>

            <span v-for="link in dropdownLinks" :key="link.name">
              <div>
                <div
                  class="footer__dropdown__container content-box flex--set flex--column"
                >
                  <h5>{{ link.name }}</h5>
                  <g-link
                    v-for="(item, i) in link.src"
                    :key="i"
                    :to="item.node.path"
                    class="footer__link link--hover"
                    >{{ item.node.title }}</g-link
                  >
                </div>
              </div>
            </span>
          </nav>
        </section>
        <section class="footer__column content-box">
          <h4 class="space-bottom-small">{{ $static.footer_contact.title }}</h4>
          <p
            class="footer__text footer__contact flex--set flex--content-center"
            v-for="(contact_detail, i) in $static.contact_data.contacts"
            :key="'contact-' + i"
          >
            <span class="icon">{{ contact_detail.icon }}</span>
            <a
              v-if="contact_detail.type === 'telefon'"
              class="footer__link link--hover"
              :href="'tel:+48' + contact_detail.contact"
              >(+48) {{ contact_detail.contact }}</a
            >
            <a
              v-else-if="contact_detail.type === 'adres'"
              class="footer__link link--hover"
              href="https://www.google.com/maps/place/ROSCO+SERWIS/@49.5845913,20.6657033,17z/data=!3m1!4b1!4m5!3m4!1s0x473de57ba4cdad8f:0x2704aba2804e3887!8m2!3d49.5845913!4d20.667892"
              >Węgierska 188, 33-300 Nowy Sącz</a
            >
            <a
              v-else-if="contact_detail.type === 'e-mail'"
              class="footer__link link--hover"
              :href="'mailto:' + contact_detail.contact"
              >{{ contact_detail.contact }}</a
            >
            <template v-else>
              {{ contact_detail.contact }}
            </template>
          </p>
        </section>
      </div>
      <div class="footer__meta text-center">
        <slot name="footer" />

        <span class="footer__copyright">
          Wszystkie prawa zastrzeżone Copyright ©
          {{ new Date().getFullYear() }} Rosco Serwis sp. z o.o.
        </span>
        |
        <span class="footer__links">
          Designed by
          <a class="footer__link link--hover-small" :href="$static.contact_data.site_creator_link"
            >Adrian Gaborek</a
          >
        </span>
      </div>
    </footer>
  </div>
</template>

<static-query>
query {
  posts: allOffer(filter: { published: { eq: true }}) {
    edges {
      node {
        title
        path
      }
    }
  }

  footer_about: pageData(path: "/content/pages/footer/footer-about/") {
    title
    content
  }
  
  footer_contact: pageData(path: "/content/pages/footer/footer-contact") {
    title
  }

  contact_data: configData(path: "/content/config/contact/") {
    contacts {
      contact
      icon
      type
    }
    site_creator_link
  }
}
</static-query>

<script>
import Logo from "~/components/Logo.vue";
import Dropdown from "~/components/Dropdown.vue";

export default {
  props: {
    showLogo: { default: true },
    showFooter: { default: true },
  },
  data() {
    return {
      links: [
        { name: "O firmie", src: "/o-firmie/" },
        {
          name: "Oferta",
          src: "",
        },
        { name: "Kontakt", src: "/kontakt/" },
      ],
    };
  },
  mounted() {
    this.links[1].src = this.$static.posts.edges;
  },
  components: {
    Logo,
    Dropdown,
  },
  computed: {
    singleLinks() {
      return this.links.filter((link) => !Array.isArray(link.src));
    },
    dropdownLinks() {
      return this.links.filter((link) => Array.isArray(link.src));
    },
  },
};
</script>

<style lang="scss">
.main-margin {
  padding: 0;
  margin: 0 calc(var(--space) / 4);
}

.main-nomargin {
  padding: 1.5vw 0 0;
  margin: 0;
}

.footer {
  text-align: center;
  font-size: 0.8em;

  padding: calc(var(--space) / 8) var(--space);

  &__container {
    flex-direction: column;

    @include lg {
      flex-direction: row;
      align-items: stretch;
    }
  }

  &__menu {
    display: none;

    @include lg {
      display: block;
    }
  }

  &__column {
    padding: 0px calc(var(--space) / 2);
    margin-left: calc(var(--space) / 8);
    margin-right: calc(var(--space) / 8);
    margin-bottom: calc(var(--space) / 8);
    width: 100%;
  }

  &__link {
    padding-bottom: 1px !important;
    border-bottom: 2px solid transparent;
    &-alt-color {
      @extend .footer__link;
      color: var(--link-alt-color) !important;
    }
  }

  &__meta {
    font-size: 0.8em;
    opacity: 0.8;
  }

  &__dropdown__container {
    background: var(--bg-color);
    padding: 5px;
    > * {
      margin: 5px 0;
    }
  }

  &__contact {
    margin-bottom: 0.9em;

    > span {
      margin-right: var(--icon-space);
    }
  }

  h4 {
    margin-top: 1rem;
    text-align: center;
  }
}

.header {
  background: var(--header-color);
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  top: -1px;
  z-index: 10;
  border-bottom: solid 1px var(--border-color);
  position: sticky;

  &__menu {
    position: absolute;
    text-align: left;
    top: 100%;
    left: 0;
    background: var(--bg-color);
    width: 100%;
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform var(--transition-time) ease-in-out,
      background-color var(--transition-time-long) ease;
    border-bottom: solid 1px var(--border-color);

    @include md {
      position: relative;
      text-align: left;
      transform: scale(1, 1);
      background: none;
      top: initial;
      left: initial;
      border: none;
      /* end Edge support stuff */

      display: flex;
      justify-content: flex-end;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        flex-direction: column;

        text-align: center;

        @include md {
          margin-bottom: 0;
          flex-direction: row;
        }
      }
    }

    &__link {
      transition: var(--transition-time) !important;
      margin: 0 15px;
      font-size: 0.9rem;
      font-family: "Montserrat", "Verdana", "sans-serif";
      line-height: var(--header-height) !important;
      color: var(--title-color) !important;
      width: calc(100% - 30px);

      @include md {
        width: initial;
        font-size: 0.8rem;
      }

      &__active {
        background-color: var(--bg-color-dark);
      }

      &:hover {
        background-color: var(--bg-color-dark);
      }

      @include md {
        &:after {
          content: "";
          display: block;
          visibility: hidden;
          width: 0;
          border-bottom: 3px solid;
          border-color: transparent;
          transition: var(--transition-time);
          margin: -3px 0 0 0 !important;
        }
        &:hover {
          background-color: initial;
          &:after {
            visibility: visible;
            width: 100%;
            border-color: var(--link-border-color) !important;
          }
        }
        &__active {
          background-color: initial;

          &:after {
            content: "";
            visibility: visible;
            display: block;
            width: 100% !important;
            border-bottom: 3px solid;
            border-color: var(--link-border-color) !important;
          }
        }
      }
    }

    &__toggle {
      position: absolute !important;
      top: -9999px !important;
      left: -9999px !important;
      display: none;

      &:checked ~ div > &__label {
        span {
          opacity: 1;
          transform: rotate(45deg) translate(1px, -5px);
        }
        span:nth-child(2) {
          transform: rotate(0deg);
          opacity: 0;
        }
        span:last-child {
          transform: rotate(-45deg) translate(-1px, 4px);
        }
      }

      &:checked ~ nav {
        transform: scale(1, 1);
      }

      &:checked ~ nav a {
        opacity: 1;
        transition: opacity var(--transition-time) ease;
      }

      &__label {
        cursor: pointer;

        @include md {
          display: none;
        }

        &:hover {
          opacity: 0.8;
        }

        span {
          width: 29px;
          height: 2px;
          margin: 2.5px 0;
          position: relative;
          background: var(--title-color);
          border-radius: 3px;
          z-index: 1;
          transform-origin: 5px 0px;
          transition: transform var(--transition-time)
              cubic-bezier(0.77, 0.2, 0.05, 1),
            background-color var(--transition-time)
              cubic-bezier(0.77, 0.2, 0.05, 1),
            opacity var(--transition-time) ease;

          &:first-child {
            transform-origin: 0% 0%;
          }
          &:last-child {
            transform-origin: 0% 0%;
          }
        }
      }
    }
  }
}

.slide-enter-active {
  transition: opacity 1s, transform var(--transition-time-long);
}

.slide-enter {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
