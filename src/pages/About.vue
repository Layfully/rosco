<template>
  <Layout :show-logo="true">
    <h2 class="text-center space-bottom-zero">{{ $page.pageData.title }}</h2>
    <hr />
    <section v-html="$page.pageData.content"></section>
  </Layout>
</template>

<page-query>
query {
  pageData: pageData(path: "/content/pages/about/") {
    title
    content
  }
}
</page-query>

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
