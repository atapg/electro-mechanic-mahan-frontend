<template>
  <div class="products-page-container mt-5 mb-10">
    <v-card elevation="0">
      <v-text-field
        label="جستجوی محصول مورد نظر..."
        solo
        v-model="search"
      ></v-text-field>
    </v-card>

    <v-row v-if="this.products.length > 0">
      <v-col
        v-for="product in products"
        :key="product._id"
        xl="3"
        lg="4"
        md="4"
        sm="6"
        cols="12"
        class="mb-5"
      >
        <v-card height="500" class="card-container">
          <v-row>
            <v-col
              xl="12"
              lg="12"
              md="12"
              sm="12"
              cols="12"
              class="img-container"
            >
              <img :src="product.images[0]" :alt="product.title" />
            </v-col>
            <v-col
              xl="12"
              lg="12"
              md="12"
              sm="12"
              cols="12"
              class="info-container"
            >
              <v-card elevation="0">
                <v-card-title>{{ product.title }}</v-card-title>
                <v-card-text>{{ reduceDesc(product.description) }}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <div class="actions-container">
            <NuxtLink :to="`/products/${product._id}`">
              <v-btn color="primary">مشاهده محصول</v-btn>
            </NuxtLink>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="this.products.length === 0 && !this.search">
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
    <v-row v-if="this.products.length === 0 && this.search">
      <v-col xl="12" lg="12" md="12" sm="12" cols="12">
        <v-card>
          <v-card-title>هیچ محصولی وجود ندارد!</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-card elevation="0" class="mt-5" v-if="this.products.length > 0">
      <v-pagination v-model="page" :length="numberOfPages"></v-pagination>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'home',
  data() {
    return {
      products: [],
      search: '',
      page: 1,
      numberOfPages: 0,
      error: false,
    }
  },
  head() {
    return {
      title: 'محصولات',
    }
  },
  mounted() {
    //get products
    this.$axios({
      method: 'GET',
      url: '/products',
    })
      .then(({ data }) => {
        this.products = data.products
        this.page = data.page
        this.numberOfPages = data.numberOfPages
      })
      .catch((err) => {})
  },
  methods: {
    reduceDesc(desc) {
      return desc.substring(150, 0)
    },
  },
  watch: {
    search() {
      this.$axios({
        method: 'GET',
        url: `/products/search?search=${this.search}&page=${this.page}`,
      })
        .then(({ data }) => {
          this.products = data.products
        })
        .catch((err) => {})
    },
    page() {
      this.$axios({
        method: 'GET',
        url: `/products?page=${this.page}`,
      })
        .then(({ data }) => {
          this.products = data.products
          this.page = data.page
          this.numberOfPages = data.numberOfPages
        })
        .catch((err) => {})
    },
  },
}
</script>

<style scoped lang="scss">
.products-page-container {
  padding: 0 $spacing;

  .img-container {
    padding-top: 0;
    border-radius: 4px;
    overflow: hidden;

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }
  }

  .card-container {
    position: relative;

    .actions-container {
      position: absolute;
      bottom: 15px;
      left: 15px;
    }
  }
}
</style>
