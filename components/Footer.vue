<template>
  <v-footer v-bind="localAttrs" :padless="true" class="mt-5">
    <v-card flat tile width="100%" class="primary lighten-1 text-center">
      <v-card-text>
        <v-btn
          v-for="social in socials"
          :to="social.info"
          :key="social"
          class="mx-4"
          icon
        >
          <v-icon size="24px" class="white--text">
            {{ social.icon }}
          </v-icon>
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
  data() {
    return {
      brand: this.$store.state.siteInfo.brandPer,
      socials: this.$store.state.siteInfo.socials,
    }
  },
}
</script>

<style></style>
