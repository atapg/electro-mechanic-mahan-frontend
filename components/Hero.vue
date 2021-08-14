<template>
  <div class="hero-container mb-5">
    <div class="img">
      <img :src="hero_bg" alt="electro_mechanic_mahan" />
      <div class="overlay" />
    </div>
    <Typing :typeArray="typings" className="typing" />
    <div class="more">
      <v-btn color="primary" to="/products" large>مشاهده محصولات</v-btn>
    </div>
  </div>
</template>

<script>
import Typing from './Typing.vue'
export default {
  data() {
    return {}
  },
  components: {
    Typing,
  },
  computed: {
    hero_bg() {
      return this.$store.state.siteInfo.hero_bg
    },
    typings() {
      return this.$store.state.siteInfo.typings
    },
  },
  watch: {
    typings() {
      return this.typings
    },
  },
}
</script>

<style scoped lang="scss">
.hero-container {
  position: relative;

  .typing {
    font-family: IRANSans !important;
    position: absolute;
    left: 50%;
    top: 50%;
    color: $white;
    transform: translateY(-50%) translateX(-50%);
    padding: $spacing / 2;
  }

  .more {
    position: absolute;
    bottom: 5%;
    color: $white;
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
  .hero-container {
    .more {
      bottom: 1%;
    }
    .typing {
      top: 40%;
      font-size: 1.5rem !important;
    }
  }
}
</style>
