<template>
  <div class="home-container">
    <v-app>
      <Navbar />
      <nuxt />
      <Footer />
    </v-app>
  </div>
</template>

<script>
import Navbar from '/components/Navbar.vue'
import Footer from '/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style lang="scss" scoped>
.home-container {
  max-width: 2000px;
  margin: auto;
}
</style>
