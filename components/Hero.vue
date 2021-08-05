<template>
  <div class="container">
    <div class="img">
      <img :src="hero_bg" alt="electro_mechanic_mahan" />
      <div class="overlay" />
    </div>
    <vue-typed-js
      :strings="typings"
      :typeSpeed="100"
      :loop="true"
      :autoInsertCss="false"
      :cursorChar="''"
    >
      <h1 class="contents display-2 typing"></h1>
    </vue-typed-js>
    <div class="more">
      <v-btn color="primary" to="/products" large>مشاهده محصولات</v-btn>
    </div>
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
}
</script>

<style scoped lang="scss">
.container {
  position: relative;

  .more {
    position: absolute;
    top: 60%;
    color: $white;
    transform: translateY(-50%);
    margin: 20px 40px 20px 0;
  }

  .contents {
    position: absolute;
    top: 40%;
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

@media screen and(max-width: 600px) {
  .container {
    .more {
      top: 70%;
    }
  }
}
</style>
