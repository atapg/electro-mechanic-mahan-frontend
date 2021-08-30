<template>
  <div>
    <!-- Components -->
    <Hero />
    <ProductSlider :products="products" />
    <!-- Components -->

    <!-- Page specifics -->
    <!--    <div class="about-container mb-10">-->
    <!--      <div class="about-title title mb-5 mt-5">درباره ی ما</div>-->
    <!--      <div class="wrapper">-->
    <!--        <v-row>-->
    <!--          <v-col xl="4" lg="4" md="4" sm="12" cols="12">-->
    <!--            <v-card class="card-container" min-height="250">-->
    <!--              <v-card-title class="card-title">-->
    <!--                ساخت انواع پرس های داغی و هیدرولیکی</v-card-title-->
    <!--              >-->
    <!--              <v-card-text class="card-text">-->
    <!--                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با-->
    <!--                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله-->
    <!--                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد-->
    <!--                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،-->
    <!--                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده-->
    <!--              </v-card-text>-->
    <!--            </v-card>-->
    <!--          </v-col>-->
    <!--          <v-col xl="4" lg="4" md="4" sm="12" cols="12">-->
    <!--            <v-card class="card-container" min-height="250">-->
    <!--              <v-card-title class="card-title"-->
    <!--                >ساخت انواع دستگاه های برشی</v-card-title-->
    <!--              >-->
    <!--              <v-card-text class="card-text">-->
    <!--                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با-->
    <!--                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله-->
    <!--                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد-->
    <!--                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،-->
    <!--                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده-->
    <!--              </v-card-text>-->
    <!--            </v-card>-->
    <!--          </v-col>-->
    <!--          <v-col xl="4" lg="4" md="4" sm="12" cols="12">-->
    <!--            <v-card class="card-container" min-height="250">-->
    <!--              <v-card-title class="card-title"-->
    <!--                >ساخت انواع دستگاه های جلد زنی</v-card-title-->
    <!--              >-->
    <!--              <v-card-text class="card-text">-->
    <!--                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با-->
    <!--                استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله-->
    <!--                در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد-->
    <!--                نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،-->
    <!--                کتابهای زیادی در شصت و سه درصد گذشته حال و آینده-->
    <!--              </v-card-text>-->
    <!--            </v-card>-->
    <!--          </v-col>-->
    <!--        </v-row>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="about-section-container mb-10">
      <v-container>
        <v-row>
          <v-col xl="6" lg="6" md="6" sm="6" cols="12">
            <v-card elevation="1" min-height="500" class="contact">
              <v-card-title> ارتباط با ما از طریق ایمیل </v-card-title>
              <v-card-text>
                <v-text-field
                  color="primary"
                  label="ایمیل"
                  v-model="email"
                  outlined
                ></v-text-field>
                <v-text-field
                  color="primary"
                  label="شماره تلفن"
                  outlined
                  v-model="phone"
                ></v-text-field>
                <v-textarea color="primary" v-model="text" outlined no-resize>
                  <template v-slot:label>
                    <div>متن</div>
                  </template>
                </v-textarea>
                <div style="text-align: left">
                  <v-btn color="primary" @click="sendMessage">ارسال</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xl="6" lg="6" md="6" sm="6" cols="12">
            <v-card class="contact" elevation="1">
              <v-card elevation="1" min-height="500" class="contact">
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
import Cookies from 'js-cookie'
import { Toast } from '~/plugins/sweetalertMixins'

export default {
  layout: 'home',
  data() {
    return {
      products: [],
      phone: '',
      email: '',
      text: '',
    }
  },
  head() {
    return {
      title: 'خانه',
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
        this.products = data.products
      })
      .catch((err) => {})
  },
  methods: {
    sendMessage() {
      this.$swal({
        title: 'آیا برای ارسال مطمئن هستید؟',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios({
            method: 'POST',
            url: `/messages/send`,
            data: {
              phone: this.phone,
              email: this.email,
              text: this.text,
            },
          })
            .then(() => {
              this.$swal({
                icon: 'success',
                title: 'موفق!',
                ...Toast,
              })
            })
            .catch((err) => {
              this.$swal({
                icon: 'error',
                title: 'ناموفق - لطفا همه ی فیلد هارا پر کنید',
                ...Toast,
              })
            })
        }
      })
    },
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
.about-container {
  padding: 0 $spacing / 2;

  .about-title {
    text-align: right;
    margin-right: $spacing / 2;
    padding: 0 15px;
    border-right: 5px solid $primary;
    font-family: IRANSans !important;
  }

  .wrapper {
    padding: 0 $spacing / 2;
    .card-container {
      .card-title {
        font-weight: bolder;
      }

      .card-text {
        text-align: justify;
      }
    }
  }
}
</style>
