<template>
  <Layout>
    <template #footer>
      <p>
        Ta strona jest chroniona przez reCAPTCHA.
        <a
          class="footer__link-alt-color"
          href="https://policies.google.com/privacy"
          >Polityka Prywatności</a
        >
        oraz
        <a
          class="footer__link-alt-color"
          href="https://policies.google.com/terms"
          >Warunki Usługi</a
        >
        Google zobowiązują.
      </p>
    </template>
    <main>
      <article>
        <div class="contact__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10346.79074415049!2d20.667892!3d49.5845913!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2704aba2804e3887!2sROSCO%20SERWIS!5e0!3m2!1spl!2spl!4v1599122860461!5m2!1spl!2spl"
            width="100%"
            height="400"
            frameborder="0"
            style="border: 0"
            allowfullscreen
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>

        <div class="contact page-container flex--set">
          <section>
            <span v-html="$page.pageData.content"></span>
            <p
              class="footer__contact"
              v-for="(contact_detail, i) in $static.contact_data.contacts"
              :key="'contact-' + i"
            >
              <span class="icon">{{ contact_detail.icon }}</span>
              <a
                v-if="contact_detail.type === 'telefon'"
                class="footer__link link--hover-small"
                :href="'tel:+48' + contact_detail.contact"
                >(+48) {{ contact_detail.contact }}</a
              >
              <a
                v-else-if="contact_detail.type === 'adres'"
                class="footer__link link--hover-small"
                href="https://www.google.com/maps/place/ROSCO+SERWIS/@49.5845913,20.6657033,17z/data=!3m1!4b1!4m5!3m4!1s0x473de57ba4cdad8f:0x2704aba2804e3887!8m2!3d49.5845913!4d20.667892"
                >Węgierska 188, 33-300 Nowy Sącz</a
              >
              <a
                v-else-if="contact_detail.type === 'e-mail'"
                class="footer__link link--hover-small"
                :href="'mailto:' + contact_detail.contact"
                >{{ contact_detail.contact }}</a
              >
              <template v-else>
                {{ contact_detail.contact }}
              </template>
            </p>
          </section>
          <section>
            <form class="contact__form" @submit.prevent="sendEmail">
              <h3 class="text-center">{{ $page.pageData.form_title }}</h3>
              <fieldset class="contact__fieldset flex--set flex--column">
                <legend class="contact__fieldset__legend">
                  Formularz kontaktowy
                </legend>
                <label class="contact__fieldset__label-required" for="sender"
                  >Imię i nazwisko</label
                >
                <input
                  class="contact__fieldset__input"
                  v-model="formData.sender"
                  id="sender"
                  name="sender"
                  type="text"
                  placeholder="Podaj imię i nazwisko"
                  required
                />
                <label class="contact__fieldset__label-required" for="email"
                  >Adres e-mail</label
                >
                <input
                  class="contact__fieldset__input"
                  v-model="formData.email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Podaj email"
                  required
                />
                <label
                  class="contact__fieldset__label-required"
                  for="emailConfirmation"
                  >Potwierdź email</label
                >
                <input
                  class="contact__fieldset__input"
                  v-model="formData.emailConfirmation"
                  id="emailConfirmation"
                  name="emailConfirmation"
                  type="email"
                  placeholder="Potwierdź email"
                />
                <label class="contact__fieldset__label-required" for="message"
                  >Wiadomość</label
                >
                <textarea
                  class="contact__fieldset__input-textarea"
                  v-model="formData.message"
                  id="message"
                  name="message"
                  cols="50"
                  rows="7"
                  placeholder="Podaj treść wiadomości"
                  required
                />
                <input
                  class="button button--black"
                  type="submit"
                  name="submit"
                  value="Wyślij"
                />
              </fieldset>
            </form>
          </section>
        </div>

        <modal v-if="showModal" @close="showModal = false">
          <h4
            slot="header"
            :class="
              modalMessage.success
                ? 'modal__title-success'
                : 'modal__title-error'
            "
          >
            {{ modalMessage.title }}
          </h4>
          <div slot="body" v-html="modalMessage.body"></div>
        </modal>
      </article>
    </main>
  </Layout>
</template>

<page-query>
query {
  pageData: pageData(path: "/content/pages/contact/") {
    contact_title
    content
    form_title
  }
}
</page-query>

<static-query>
query {
  contact_data: configData(path: "/content/config/contact/") {
    contacts {
      contact
      icon
      type
    }
  }
}
</static-query>

<script>
import Modal from "@/components/Modal.vue";
import RecaptchaInfo from "@/components/RecaptchaInfo.vue";

const axios = require("axios");

export default {
  name: "About",
  metaInfo: {
    title: "Kontakt",
    link: [{ rel: "canonical", href: "https://www.roscoserwis.pl/kontakt/" }],
    meta: [
      {
        name: "description",
        key: "description",
        content:
          "Skontaktuj się z Rosco Serwis. Odpowiadamy na pytania od poniedziałku do piątku w godzinach 7:00 - 15:00.",
      },
      // OpenGraph data (Most widely used)
      { property: "og:title", content: "Rosco Serwis - Kontakt" },
      { property: "og:site_name", content: "Rosco Serwis" },
      // The list of types is available here: http://ogp.me/#types
      { property: "og:type", content: "website" },
      // Should the the same as your canonical link, see below.
      { property: "og:url", content: "https://www.roscoserwis.pl/kontakt/" },
      {
        property: "og:image",
        content:
          "https://www.roscoserwis.pl/uploads/InstalacjeElektryczne.webp",
      },
      // Often the same as your meta description, but not always.
      {
        property: "og:description",
        content:
          "Skontaktuj się z Rosco Serwis. Odpowiadamy na pytania od poniedziałku do piątku w godzinach 7:00 - 15:00.",
      },

      // Twitter card
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "https://www.roscoserwis.pl/kontakt/" },
      { name: "twitter:title", content: "Rosco Serwis - Kontakt" },
      {
        name: "twitter:description",
        content:
          "Skontaktuj się z Rosco Serwis. Odpowiadamy na pytania od poniedziałku do piątku w godzinach 7:00 - 15:00.",
      },
      {
        name: "twitter:image:src",
        content:
          "https://www.roscoserwis.pl/uploads/InstalacjeElektryczne.webp",
      },
    ],
  },
  components: {
    Modal,
    RecaptchaInfo,
  },
  data() {
    return {
      formData: {
        sender: null,
        email: null,
        emailConfirmation: null,
        message: null,
        errors: [],
      },
      showModal: false,
      modalMessage: { title: "", body: "", success: false },
    };
  },
  methods: {
    async sendEmail(event) {
      this.resetModal();

      if (!this.formData.sender) {
        this.formData.errors.push(
          "<li>Imię i nazwisko nie może być puste</li>"
        );
      }

      if (!this.formData.email) {
        this.formData.errors.push("<li>Email nie może być pusty</li>");
      }

      if (!this.formData.emailConfirmation) {
        this.formData.errors.push(
          "<li>Potwierdzenie email'a nie może być puste</li>"
        );
      }

      if (!this.formData.message) {
        this.formData.errors.push(
          "<li>Treść wiadomości nie może być pusta</li>"
        );
      }

      if (this.formData.email !== this.formData.emailConfirmation) {
        this.formData.errors.push("<li>Adresy email muszą być takie same</li>");
      }

      if (this.formData.errors.length) {
        this.showModal = true;
        this.modalMessage.success = false;
        this.modalMessage.title = "Błąd walidacji formularza";

        this.modalMessage.body += "<ul>";

        for (const errorMessage of this.formData.errors) {
          this.modalMessage.body += errorMessage;
        }

        this.modalMessage.body += "</ul>";

        return;
      }

      await this.$recaptchaLoaded();

      this.$recaptcha("sendEmail")
        .then((token) => {
          axios
            .post("/.netlify/functions/sendgrid", {
              recaptchaToken: token,
              emailSender: this.formData.email,
              senderName: this.formData.sender,
              message: this.formData.message,
            })
            .then(() => {
              this.modalMessage.success = true;
              this.modalMessage.title = "Pomyślnie wysłano wiadomość";
              this.modalMessage.body =
                "<p>Wiadomość została dostarczona. Nasz zespół odpowie najszybciej jak tylko to możliwe.</p>";
              this.clearForm(event);
              this.showModal = true;
            })
            .catch(() => {
              this.setErrorModal();
              this.showModal = true;
            });
        })
        .catch(() => {
          this.setErrorModal();
          this.showModal = true;
        });
    },
    clearForm(event) {
      this.formData.sender = this.formData.email = this.formData.emailConfirmation = this.formData.message =
        "";
      event.target.reset();
    },
    resetModal() {
      this.formData.errors = [];
      this.modalMessage.title = "";
      this.modalMessage.body = "";
    },
    setErrorModal() {
      this.modalMessage.success = false;
      this.modalMessage.title = "Nie udało się wysłać wiadomości";
      this.modalMessage.body =
        "<p>Nie udało się wysłać wiadomości. Prosimy spróbować ponownie, lub o kontakt przy użyciu innych metod.</p>";
    },
  },
};
</script>

<style lang="scss">
.contact {
  flex-direction: column;
  padding-bottom: calc(var(--space) / 2);
  align-items: center;

  @include md {
    flex-direction: row;
    align-items: flex-start;
  }

  & > section {
    width: 100%;
    flex: 2;

    &:first-of-type {
      text-align: center;

      @include sm {
        text-align:start;
      }
    }

    @include md {
      max-width: 500px;
    }
  }

  & > section:first-child {
    max-width: 100%;
    flex: 2;
    order: 2;

    & > p {
      text-align: center;

      @include md {
        text-align: initial;
      }
    }

    @include md {
      order: initial;
      box-sizing: border-box;
      padding-right: 40px;
    }
  }

  &__map {
    filter: var(--google-map-filter);
  }

  &__fieldset {
    margin-inline-start: 2px;
    margin-inline-end: 2px;
    border: groove 2px ThreeDFace;
    padding-block-start: 0.35em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    padding-inline-start: 0.75em;
    min-inline-size: min-content;

    padding: 0 var(--space) var(--space);

    @include sm {
      padding: 0 calc(var(--space) / 2) calc(var(--space) / 2);
    }

    &__legend {
      color: var(--title-color);
      font-weight: bold;
    }
    &__label {
      margin: 0 0 3px 0;
      padding: 0;
      font-weight: bold;
      color: var(--title-color);

      &-required {
        @extend .contact__fieldset__label;
        &:after {
          color: #e32;
          content: "*";
          display: inline;
        }
      }
    }

    &__input {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid var(--title-color);
      color: var(--title-color);
      background-color: var(--bg-color);
      padding: calc(var(--space) / 3);
      transition: box-shadow var(--transition-time) ease-in-out;
      outline: none;
      font-size: 0.8rem;

      @include sm {
        padding: 10px 15px;
      }

      &::placeholder {
        opacity: 0.8;
        color: var(--title-color);
      }

      &:focus {
        -moz-box-shadow: 0 0 8px var(--link-border-color);
        -webkit-box-shadow: 0 0 8px var(--link-border-color);
        box-shadow: 0 0 8px var(--link-border-color);
        border: 1px solid var(--body-color);
      }

      &-textarea {
        @extend .contact__fieldset__input;
        resize: vertical;
      }
    }
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:active {
  transition: background-color 999999s ease-in-out 0s;
  -webkit-text-fill-color: var(--title-color);
}

input:-webkit-autofill:focus {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: var(--title-color);
  box-shadow: 0 0 8px var(--link-border-color);
  border: 1px solid var(--body-color);
}
</style>
