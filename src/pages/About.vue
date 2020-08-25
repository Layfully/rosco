<template>
  <Layout :show-logo="true">
    <h2 class="text-center space-bottom-zero">O Firmie</h2>
    <hr />
    <p>
      Veolia Energia Warszawa zarządza największą w Unii Europejskiej siecią ciepłowniczą,
      dostarczającą ciepło systemowe i ciepłą wodę do 80% budynków w Warszawie.
      Od października 2011 jest częścią międzynarodowej grupy Veolia, europejskiego lidera w
      zakresie usług energetycznych.
    </p>
    <p>
      Od 60 lat zapewniamy bezpieczeństwo i pewność dostaw ciepła systemowego w Warszawie.
      Około 850 pracowników każdego dnia czuwa nad właściwym funkcjonowaniem 1800 kilometrów sieci ciepłowniczej oraz tysięcy węzłów ciepłowniczych.
      Pracownicy Veolii Energii Warszawa brali udział w powojennej odbudowie stolicy, a dzisiaj, wykorzystując nowoczesne rozwiązania i technologie,
      aktywnie uczestniczą w jej rozwoju poprzez obecność na większości warszawskich placów budowy,
      modernizacje istniejących sieci ciepłowniczych oraz nowe inwestycje realizowane we współpracy z władzami m.st. Warszawy, inwestorami i deweloperami.
    </p>
    <p>
      Zgodnie z filozofią Veolii nasza firma kreuje i wdraża w stolicy rozwiązania efektywne energetycznie,
      zgodne z polityką zrównoważonego rozwoju grupy Veolia, której jest częścią. Aktywnie angażuje się w życie miasta,
      działa na rzecz ochrony środowiska naturalnego wdrażając szereg inwestycji proekologicznych i współpracując w zakresie edukacji dzieci i młodzieży.
      Poprzez aktywne wspieranie przedsięwzięć związanych z edukacją, sportem, kulturą,
      sztuką i nauką Veolia Energia Warszawa przyczynia się do rozwoju miasta i społeczności lokalnych.
    </p>
  </Layout>
</template>


<script>
export default {
  name: "About",
  metaInfo: {
    title: "O firmie",
  },
};
</script>

<style lang="scss" scoped>
hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    var(--hr-color),
    rgba(0, 0, 0, 0)
  );
}
</style>