<template>
  <div>
    <!-- Components -->
    <Hero />
    <ProductSlider :products="products" />
    <!-- Components -->

    <!-- Page specifics -->
    <div class="about-section-container mb-10">
      <v-container>
        <v-row>
          <v-col xl="6" lg="6" md="6" sm="6" cols="12">
            <v-card min-height="400" class="contact" elevation="1">
              <v-card-title> ارتباط با ما از طریق ایمیل </v-card-title>
              <v-card-text>
                <v-text-field
                  color="primary"
                  label="ایمیل"
                  outlined
                ></v-text-field>
                <v-textarea color="primary" outlined no-resize>
                  <template v-slot:label>
                    <div>متن</div>
                  </template>
                </v-textarea>
                <div style="text-align: left">
                  <v-btn color="primary">ارسال</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xl="6" lg="6" md="6" sm="6" cols="12">
            <v-card class="contact" elevation="1">
              <v-card min-height="400" class="contact" elevation="1">
                <v-card-title>
                  ارتباط با ما از طریق شبکه های اجتماعی
                </v-card-title>
                <v-card-text>
                  <v-card
                    v-for="social in socials"
                    :key="social.info"
                    elevation="0"
                    class="mb-3"
                  >
                    <div class="center items">
                      <div class="ico ml-2">
                        <v-icon>{{ social.icon }}</v-icon>
                      </div>
                      <div class="overline">{{ social.info }}</div>
                    </div>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- Page specifics -->
  </div>
</template>
<script>
import Hero from '/components/Hero.vue'
import ProductSlider from '/components/ProductSlider.vue'

export default {
  layout: 'home',
  data() {
    return {
      products: [],
    }
  },
  components: {
    Hero,
    ProductSlider,
  },
  computed: {
    socials() {
      return this.$store.state.siteInfo.socials
    },
  },
  mounted() {
    //get products
    this.$axios({
      method: 'GET',
      url: '/products',
    })
      .then(({ data }) => {
        this.products = data
      })
      .catch((err) => {})
  },
}
</script>
<style scoped lang="scss">
.about-section-container {
  width: 100%;
  min-height: 300px;
  padding: 20px $spacing;

  .contact {
    .items {
      justify-content: flex-start;
    }
    .ico i {
      color: $primary;
    }
  }
}
</style>
