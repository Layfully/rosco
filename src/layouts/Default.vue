<template>
  <div id="app">
    <header class="header">
      <div class="header__left">
        <Logo v-if="showLogo" />
      </div>
      <nav class="header__menu">
        <g-link
          v-for="link in links"
          :key="link.name"
          :to="link.src"
          class="header__menu__link"
          exact-active-class="header__menu__link__active "
        >{{link.name}}</g-link>
      </nav>
      <div class="header__right">
        <ToggleTheme />
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <div class="footer__container">
        <div class="footer__column space-bottom-small content-box">
          <h4 class="space-bottom-small">O nas</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam euismod
            purus sit amet ultrices. Ut dictum aliquet mollis. Pellentesque posuere mattis augue, ac vehicula erat bibendum in. Pellentesque vel massa quis nisi malesuada sollicitudin.
            Phasellus nisl erat, consequat sodales tempus sit amet, dignissim sit amet tortor.
          </p>
        </div>
        <div class="footer__column footer__menu space-bottom-small content-box">
          <h4 class="space-bottom-small">Menu</h4>
          <nav>
            <p v-for="link in links" :key="link.name">
              <g-link :to="link.src" class="footer__link">{{link.name}}</g-link>
            </p>
          </nav>
        </div>
        <div class="footer__column space-bottom-small content-box">
          <h4 class="space-bottom-small">Dane teleadresowe</h4>
          <p class="footer__text">
            <span class="material-icons">call</span>
            <a class="footer__link" href="tel:+48184414032">(+48) 18 441 40 32</a>
          </p>
          <p class="footer__text">
            <span class="material-icons">business</span>ul. Węgierska 188, 33-300 Nowy Sącz
          </p>
          <p class="footer__text">
            <span class="material-icons">email</span>
            <a class="footer__link" href="mailto:rosco-serwis@mail.pl">rosco-serwis@mail.pl</a>
          </p>
          <p class="footer__text">
            <span class="material-icons">menu_book</span>NIP: 734 357 88 31
          </p>
          <p class="footer__text">
            <span class="material-icons">menu_book</span>REGON: 385289456
          </p>
          <p class="footer__text">
            <span class="material-icons">menu_book</span>KRS:0000822991
          </p>
        </div>
      </div>
      <div class="footer__meta text-center">
        <span
          class="footer__copyright"
        >Wszystkie prawa zastrzeżone Copyright © {{ new Date().getFullYear() }} Rosco sp. z o.o.</span>
        |
        <span class="footer__links">
          Designed by
          <a class="footer__link" href="//www.suits.at">Adrian Gaborek</a>
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import ToggleTheme from "~/components/ToggleTheme.vue";

export default {
  props: {
    showLogo: { default: true },
  },
  data: function () {
    return {
      links: [
        { name: "O firmie", src: "/o-firmie/" },
        { name: "Oferta", src: "/oferta/" },
        { name: "Kontakt", src: "/kontakt/" },
      ],
    };
  },
  components: {
    Logo,
    ToggleTheme,
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--header-height);
  padding: 0 calc(var(--space) / 2);
  top: 0;
  z-index: 10;
  border-bottom: solid 1px var(--border-color);

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  &__menu {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    &__link {
      margin: 0 15px;
      font-size: 1.05rem;
      color: var(--bg-title) !important;
      &:after {
        content: "";
        display: block;
        visibility: hidden;
        width: 0px;
        border-bottom: 3px solid;
        border-color: transparent;
        transition: 0.3s;
      }
      &:hover:after {
        visibility: visible;
        width: 100%;
        border-color: var(--link-color);
      }
      &__active:after {
        content: "";
        visibility: visible;
        display: block;
        width: 100% !important;
        border-bottom: 3px solid;
        border-color: var(--link-color) !important;
      }
    }
  }

  @include lg {
    //Make header sticky for large screens
    position: sticky;
    width: 100%;
  }
}

.main {
  margin: 0 auto;
  padding: 1.5vw 15px 0;
}

.footer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  padding-left: calc(var(--space) / 2);
  padding-right: calc(var(--space) / 2);
  padding-bottom: calc(var(--space) / 4);

  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
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
    padding: 0px calc(var(--space) / 2) calc(var(--space) / 2)
      calc(var(--space) / 4);
    margin-left: calc(var(--space) / 4);
    margin-right: calc(var(--space) / 4);
    width: 100%;
  }

  &__link {
    color: var(--body-color) !important;
    transition: all ease 0.3s !important;
    padding-bottom: 1px !important;
    border-bottom: 2px solid transparent;
    &:hover {
      border-color: var(--body-color);
    }
  }

  &__meta {
    font-size: 0.8em;
    opacity: 0.8;
  }

  p {
    display: flex;
    align-items: center;
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
</style>
