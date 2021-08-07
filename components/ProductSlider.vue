<template>
  <div class="mb-5 container">
    <carousel
      :per-page="4"
      :autoplay="true"
      :autoplay-timeout="5000"
      :loop="true"
      :centerMode="true"
      autoplayDirection="backward"
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
                <v-btn color="primary">مشاهده محصول</v-btn>
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
    return {}
  },
  components: { Carousel, Slide },
  methods: {},
  mounted() {},
}
</script>

<style scoped lang="scss">
.container {
  direction: ltr;
  padding: 0 $spacing / 2;

  .slide {
    display: flex;
    align-content: center;
    margin: 10px 0;

    .slider-container {
      padding: 0 $spacing / 2;

      .items {
        padding: 10px;
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
        }
      }
    }

    .image {
      margin: auto;
      width: 100%;
    }
  }
}
</style>
