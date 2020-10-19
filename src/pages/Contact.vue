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
            <h3 class="text-center">{{ $page.pageData.contact_title }}</h3>
            <p v-html="$page.pageData.contact_content"></p>
            <p
              class="footer__contact"
              v-for="(contact_detail, i) in $static.contact_data
                .contact_details"
              :key="'contact-' + i"
              v-html="contact_detail.contact"
            ></p>
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
        <!--<section v-html="$page.pageData.content"></section>-->
      </article>
    </main>
  </Layout>
</template>

<page-query>
query {
  pageData: pageData(path: "/content/pages/contact/") {
    contact_title
    contact_content
    form_title
  }
}
</page-query>

<script>
import Modal from "@/components/Modal.vue";
import RecaptchaInfo from "@/components/RecaptchaInfo.vue";

const axios = require("axios");

export default {
  name: "About",
  metaInfo: {
    title: "O firmie",
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

<static-query>
query {
  contact_data: pageData(path: "/content/pages/footer/footer-contact-details/") {
    title
    contact_details {
      contact
    }
  }
}
</static-query>

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
