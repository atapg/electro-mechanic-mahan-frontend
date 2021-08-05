<template>
  <div class="container">
    <div class="img">
      <img :src="hero_bg" alt="electro_mechanic_mahan" />
      <div class="overlay" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hero_bg: this.$store.state.siteInfo.hero_bg,
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  .img {
    width: 100%;
    position: relative;
    max-height: 400px;

    img {
      width: 100%;
      max-height: inherit;
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
