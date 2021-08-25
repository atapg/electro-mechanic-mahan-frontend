<template>
  <div class="mb-5 carousel-section-container">
    <div class="carousel-title title">برخی از محصولات ما</div>
    <carousel
      :perPageCustom="perPage"
      :autoplay="true"
      :autoplay-timeout="5000"
      :loop="true"
      :centerMode="true"
      autoplayDirection="forward"
      class="carousel-container"
      :paginationEnabled="false"
      :minSwipeDistance="1"
    >
      <slide
        v-for="product in products"
        :key="product.index"
        class="slide center flex-col"
      >
        <div class="slider-image-container slider-container center">
          <v-card
            elevation="1"
            width="300px"
            height="360px"
            class="card-container"
          >
            <img :src="product.images[0]" class="image" />
            <div class="items">
              <div class="subtitle-1 title mb-10">
                {{ product.title }}
              </div>
              <div class="subtitle-2 description">
                {{ product.smallDesc }}
              </div>
            </div>
            <div class="action">
              <NuxtLink :to="`/products/${product._id}`">
                <v-btn color="primary">مشاهده محصول</v-btn>
              </NuxtLink>
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
      perPage: [
        [4000, 6],
        [1902, 5],
        [1264, 4],
        [960, 3],
        [600, 2],
        [1, 1],
      ],
    }
  },
  props: ['products'],
  components: { Carousel, Slide },
  mounted() {},
}
</script>

<style scoped lang="scss">
.carousel-section-container {
  direction: ltr;
  padding: 0 $spacing / 2;
  font-family: IRANSans !important;

  .carousel-title {
    text-align: right;
    margin-right: $spacing / 2;
    padding: 0 15px;
    border-right: 5px solid $primary;
    font-family: IRANSans !important;
  }

  .carousel-container {
    margin-top: 10px;

    .slide {
      display: flex;
      align-content: center;
      margin: 10px 0;

      .slider-container {
        padding: 0 $spacing / 2;

        .card-container {
          position: relative;

          .action {
            position: absolute;
            bottom: $spacing/2;
            left: $spacing/2;
          }
        }

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
        }
      }

      .image {
        margin: auto;
        width: 100%;
        height: 200px;
      }
    }
  }
}
</style>
