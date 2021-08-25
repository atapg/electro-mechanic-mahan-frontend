<template>
  <footer class="footer-container">
    <div class="top-section">
      <v-row>
        <v-col xl="9" lg="9" md="9" sm="9" cols="12">
          <v-row>
            <v-col xl="6" lg="6" md="6" sm="6" cols="12">
              <div class="items">
                <v-subheader dark>صفحات</v-subheader>
                <v-divider class="mb-3" dark></v-divider>
                <ul>
                  <li v-for="nav in nav_items" :key="nav.index">
                    <NuxtLink class="nav-links" :to="nav.url">{{
                      nav.title
                    }}</NuxtLink>
                    <v-divider class="divider" vertical></v-divider>
                  </li>
                </ul>
              </div>
            </v-col>
            <v-col xl="6" lg="6" md="6" sm="6" cols="12">
              <div class="items">
                <v-subheader dark>برخی از محصولات</v-subheader>
                <v-divider class="mb-3" dark></v-divider>
                <ul>
                  <li v-for="random in randomProducts" :key="random.index">
                    <NuxtLink
                      class="nav-links"
                      :to="`/products/${random._id}`"
                      >{{ random.title }}</NuxtLink
                    >
                    <v-divider class="divider" vertical></v-divider>
                  </li>
                </ul>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col xl="3" lg="3" md="3" sm="3" cols="12">
          <div class="logo center">
            <img :src="logo" alt="electro-mechanic-mahan" />
          </div>
        </v-col>
      </v-row>
    </div>
    <v-divider dark></v-divider>
    <div class="bottom-section caption center">
      © {{ new Date().toLocaleDateString('fa-IR', { year: 'numeric' }) }} -
      تمامی حقوق برای الکترو مکانیک ماهان محفوظ است.
    </div>
  </footer>
</template>

<script>
export default {
  props: ['nav_items'],
  data() {
    return {
      brand: 'الکترو مکانیک ماهان',
      products: [],
      randomProducts: [],
    }
  },
  computed: {
    logo() {
      return this.$store.state.siteInfo.logo
    },
  },
  mounted() {
    //get products
    this.$axios({
      method: 'GET',
      url: '/products',
    })
      .then(({ data }) => {
        // console.log(data)
        this.products = data.products
      })
      .catch((err) => {})
  },
  methods: {
    getRandomProducts() {
      let newArr = this.shuffle(this.products)
      for (let i = 0; i <= 3; i++) {
        this.randomProducts.push(newArr[i])
      }
    },
    shuffle(array) {
      var currentIndex = array.length,
        randomIndex

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ]
      }

      return array
    },
  },
  watch: {
    products() {
      this.getRandomProducts()
    },
  },
}
</script>

<style scoped lang="scss">
.footer-container {
  font-family: IRANSans !important;
  background-color: $primary;
  color: $white;

  .top-section {
    padding: $spacing;

    .items {
      padding: $spacing/2;

      ul {
        list-style-type: none;
        padding: 0 $spacing/2 $spacing/2 $spacing/2;

        .nav-links {
          color: $white;
          text-decoration: none;
        }
      }
    }

    .logo {
      text-align: left;
      width: 100%;
      height: 100%;

      img {
        width: 150px;
        height: 150px;
        object-fit: fill;
      }
    }
  }
  .bottom-section {
    padding: $spacing/2;
    font-family: IRANSans !important;
  }
}
</style>
