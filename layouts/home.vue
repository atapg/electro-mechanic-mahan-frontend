<template>
  <div class="home-container">
    <v-app>
      <div class="layout-container">
        <Navbar />
        <nuxt />
        <Footer :nav_items="nav_items" />
      </div>
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
  data() {
    return {
      nav_items: [],
    }
  },
  mounted() {
    //get site info
    this.$axios({
      method: 'GET',
      url: '/public',
    })
      .then(({ data }) => {
        data.nav_items.forEach((item) => {
          this.nav_items.push(item)
        })
        this.nav_items.push({ title: 'ورود', url: '/login' })

        this.$store.commit('addSiteInfo', data)
        this.$forceUpdate()
      })
      .catch((err) => {})
  },
}
</script>

<style lang="scss" scoped>
.home-container {
  max-width: 2000px;
  margin: auto;

  .layout-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
  }
}
</style>
