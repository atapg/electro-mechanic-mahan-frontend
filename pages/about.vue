<template>
  <div class="about-container">
    <v-card>
      <v-card-title>درباره ما</v-card-title>
      <v-card-text>
        {{ about }}
      </v-card-text>
    </v-card>
    <v-card class="mt-5">
      <v-card-title>جهت خرید با ما در ارتباط باشید</v-card-title>
      <v-card-text>
        <v-row>
          <v-col xl="6" lg="6" md="6" sm="12" cols="12">
            <div class="center items">
              <div class="ico ml-2">
                <v-icon>mdi-cellphone</v-icon>
              </div>
              <div class="overline">{{ phone }}</div>
            </div>
          </v-col>
          <v-col xl="6" lg="6" md="6" sm="12" cols="12">
            <div class="center items">
              <div class="ico ml-2">
                <v-icon>mdi-phone</v-icon>
              </div>
              <div class="overline">{{ telephone }}</div>
            </div>
          </v-col>
          <v-col
            v-for="social in socials"
            :key="social.info"
            xl="6"
            lg="6"
            md="6"
            sm="12"
            cols="12"
          >
            <div class="center items">
              <div class="ico ml-2">
                <v-icon>{{ social.icon }}</v-icon>
              </div>
              <div class="overline">{{ social.info }}</div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'home',
  computed: {
    phone() {
      return this.$store.state.siteInfo.phone
    },
    telephone() {
      return this.$store.state.siteInfo.telephone
    },
    socials() {
      return this.$store.state.siteInfo.socials
    },
    about() {
      return this.$store.state.siteInfo.about
    },
  },
}
</script>
<style scoped lang="scss">
.about-container {
  padding: $spacing;

  .items {
    justify-content: flex-start;
  }

  i{
    color: $primary;
  }
}
</style>
