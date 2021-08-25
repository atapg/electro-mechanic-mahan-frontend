<template>
  <div class="product-container my-5">
    <v-row v-if="this.product">
      <v-col xl="6" lg="6" md="6" sm="12" cols="12">
        <v-card min-height="550" height="100%" class="product-card">
          <v-card-title class="mb-3 display-1">
            {{ product.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ product.description }}
          </v-card-subtitle>

          <v-card-actions class="product-info subtitle-1">
            <strong>مشخصات :</strong>
          </v-card-actions>
          <v-card-actions>
            وزن : {{ product.weight ? product.weight : '-' }}
          </v-card-actions>
          <v-card-actions>
            سرعت : {{ product.speed ? product.speed : '-' }}
          </v-card-actions>
          <v-card-actions>
            اندازه : {{ product.size ? product.size : '-' }}
          </v-card-actions>
          <v-card-actions>
            قیمت :
            {{ product.price ? formatNumber(product.price) : '-' }} تومان
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col xl="6" lg="6" md="6" sm="12" cols="12">
        <v-card
          min-height="550"
          height="100%"
          elevation="1"
          class="product-card"
        >
          <div class="image-section">
            <carousel
              :perPage="1"
              :autoplay="true"
              :autoplay-timeout="3000"
              :loop="true"
              :centerMode="true"
              autoplayDirection="forward"
              class="carousel-container"
            >
              <slide
                v-for="(item, index) in this.product.images"
                class="slide center flex-col"
                :key="index"
              >
                <img :src="item" class="image" />
              </slide>
            </carousel>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="this.error">
      <v-col xl="12" lg="12" md="12" sm="12" cols="12">
        <v-card>
          <v-card-title>محصول مورد نظر وجود ندارد!</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col xl="12" lg="12" md="12" sm="12" cols="12">
        <div class="spinner center my-5">
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
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
import { Carousel, Slide } from 'vue-carousel'

export default {
  layout: 'home',
  data() {
    return {
      product: null,
      title: 'product',
      error: false,
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  components: { Carousel, Slide },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  mounted() {
    this.$axios({
      method: 'GET',
      url: `/products/${this.id}`,
    })
      .then(({ data }) => {
        this.product = data
        this.title = data.title
      })
      .catch((err) => {
        this.error = true
      })
  },
  methods: {
    formatNumber(num) {
      const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
      return num
        .toString()
        .split('')
        .map((x) => farsiDigits[x])
        .reverse()
        .join('')
        .match(/.{1,3}/g)
        .join(',')
        .split('')
        .reverse()
        .join('')
    },
  },
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
  },
}
</script>

<style lang="scss" scoped>
.product-container {
  padding: 0 $spacing;

  .carousel-container {
    direction: ltr;

    .slide {
      max-height: 300px;
      img {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }
    }
  }

  .product-card {
    padding: $spacing / 2;

    .product-info {
      color: $secondary;
    }
  }

  .items {
    justify-content: flex-start;
  }
  .ico i {
    color: $primary;
  }
}
</style>
