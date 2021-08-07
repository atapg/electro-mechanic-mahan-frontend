<template>
  <div class="mb-5 carousel-section-container">
    <div class="carousel-title title">محصولات ما</div>
    <carousel
      :perPage="perPage"
      :autoplay="true"
      :autoplay-timeout="5000"
      :loop="true"
      :centerMode="true"
      autoplayDirection="forward"
      class="carousel-container"
    >
      <slide
        v-for="product in 10"
        :key="product.index"
        class="slide center flex-col"
      >
        <div class="slider-image-container slider-container center">
          <v-card>
            <img
              src="https://lh3.googleusercontent.com/proxy/Qz1dTH27olRgWssGHdro1pok3jaY7IbCp62abIzFLBuMw5aoUf1tyVC9oJV9-FPqmMsbj681rtYcsU3kyCrACfy_2WRRUgnADbsUS205lTeeBow7rSfWJiFFp8TmlwPfVL9uWrt8B45PoexHvoE6zSMa"
              class="image"
            />
            <div class="items">
              <div class="subtitle-1 title mb-10">
                سلام علیکم کفوز اخوالوز داداش لار نخبر یاخجیسور؟
              </div>
              <div class="subtitle-2 description"></div>
              <div class="action">
                <v-btn color="primary" @click="() => (perPage = 1)"
                  >مشاهده محصول</v-btn
                >
              </div>
            </div>
          </v-card>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  data() {
    return {
      perPage: 4,
      xl: window.matchMedia('(min-width: 1904px)'),
      lg: window.matchMedia('(max-width: 1903px)'),
      md: window.matchMedia('(max-width: 1264px)'),
      sm: window.matchMedia('(max-width: 960px)'),
      xs: window.matchMedia('(max-width: 600px)'),
    }
  },
  components: { Carousel, Slide },
  mounted() {
    if (this.xl.matches) {
      this.perPage = 5
    }
    if (this.lg.matches) {
      this.perPage = 4
    }
    if (this.md.matches) {
      this.perPage = 3
    }
    if (this.sm.matches) {
      this.perPage = 2
    }
    if (this.xs.matches) {
      this.perPage = 1
    }
  },
}
</script>

<style scoped lang="scss">
.carousel-section-container {
  direction: ltr;
  padding: 0 $spacing / 2;

  .carousel-title {
    text-align: right;
    margin-right: $spacing / 2;
    padding: 0 15px;
    border-right: 5px solid $primary;
  }

  .carousel-container {
    margin-top: 10px;

    .slide {
      display: flex;
      align-content: center;
      margin: 10px 0;

      .slider-container {
        padding: 0 $spacing / 2;

        .items {
          padding: 5px 10px;
          text-align: right;

          .title {
            line-height: 17px;
            color: $black;
          }

          .description {
            line-height: 17px;
            color: $description;
          }

          .action {
            text-align: left;
            margin-bottom: 5px;
          }
        }
      }

      .image {
        margin: auto;
        width: 100%;
      }
    }
  }
}
</style>
