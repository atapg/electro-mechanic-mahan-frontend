<template>
  <div class="container">
    <div class="img">
      <img :src="hero_bg" alt="electro_mechanic_mahan" />
      <div class="overlay" />
    </div>
    <vue-typed-js :strings="typings" :typeSpeed="150" :loop="true">
      <h1 class="contents display-2 typing"></h1>
    </vue-typed-js>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hero_bg: this.$store.state.siteInfo.hero_bg,
      typings: this.$store.state.siteInfo.typings,
    }
  },
  computed: {},
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  .contents {
    position: absolute;
    top: 50%;
    color: $white;
    transform: translateY(-50%);
    margin: 20px 40px 20px 0;
  }

  .img {
    width: 100%;
    position: relative;
    height: 400px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .overlay {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: rgba($primary, 0.5);
    }
  }
}
</style>
