<template>
  <v-footer :padless="true" class="footer-container">
    <v-card flat tile width="100%" class="primary text-center">
      <v-card-text>
        <v-btn
          v-for="link in nav_items"
          :to="link.url"
          :key="link.index"
          color="white"
          text
          rounded
          class="my-2 ml-2 mr-2"
        >
          {{ link.title }}
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
      brand: 'الکترو مکانیک ماهان',
      nav_items: [
        {
          title: 'خانه',
          url: '/',
        },
        {
          title: 'محصولات',
          url: '/products',
        },
        {
          title: 'ورود',
          url: '/login',
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.footer-container {
  font-family: IRANSans !important;
  .overline {
    font-family: IRANSans !important;
  }
}
</style>
