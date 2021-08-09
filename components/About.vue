<template>
  <div class="about-container mb-10">
    <div class="about-title title mb-5 mt-5">درباره ی ما</div>
    <div class="wrapper">
      <v-row>
        <v-col xl="4" lg="4" md="4" sm="12" cols="12">
          <v-card class="card-container">
            <v-card-title class="card-title">
              ساخت انواع پرس های داغی و هیدرولیکی</v-card-title
            >
            <v-card-text class="card-text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xl="4" lg="4" md="4" sm="12" cols="12">
          <v-card class="card-container">
            <v-card-title class="card-title"
              >ساخت انواع دستگاه های برشی</v-card-title
            >
            <v-card-text class="card-text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده
            </v-card-text>
          </v-card>
        </v-col>
        <v-col xl="4" lg="4" md="4" sm="12" cols="12">
          <v-card class="card-container">
            <v-card-title class="card-title"
              >ساخت انواع دستگاه های جلد زنی</v-card-title
            >
            <v-card-text class="card-text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.about-container {
  padding: 0 $spacing / 2;

  .about-title {
    text-align: right;
    margin-right: $spacing / 2;
    padding: 0 15px;
    border-right: 5px solid $primary;
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
