<template>
  <v-footer :padless="true">
    <v-card flat tile width="100%" class="primary text-center">
      <v-card-text>
        <v-btn
          v-for="link in links"
          :to="link.url"
          :key="link.index"
          color="white"
          text
          rounded
          class="my-2 ml-2 mr-2"
        >
          <div class="overline">{{ link.title }}</div>
        </v-btn>
        <v-btn to="/login" color="white" text rounded class="my-2 ml-2 mr-2">
          <div class="overline">ورود</div>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        <strong>{{ brand }}</strong> —
        {{ new Date().toLocaleDateString('fa-IR', { year: 'numeric' }) }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  computed: {
    brand() {
      return this.$store.state.siteInfo.brandPer
    },
    links() {
      return this.$store.state.siteInfo.nav_items
    },
  },
}
</script>

<style></style>
