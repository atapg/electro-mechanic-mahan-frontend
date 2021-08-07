<template>
  <div>
    <!-- Components -->
    <Hero />
    <ProductSlider />
    <!-- Components -->

    <!-- Page specifics -->
    <div class="about-section-container mb-10">
      <v-container>
        <v-row>
          <v-col xl="6" lg="6" md="6" sm="6" cols="12">
            <v-card class="contact" elevation="1" tile>
              <v-card-title> ارتباط با ما از طریق ایمیل </v-card-title>
              <v-card-text>
                <v-text-field
                  color="primary"
                  label="ایمیل"
                  outlined
                ></v-text-field>
                <v-textarea color="primary" outlined>
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
            <v-card class="contact" elevation="1" tile>
              <v-card class="contact" elevation="1" tile>
                <v-card-title> ارتباط با ما از طریق ایمیل </v-card-title>
                <v-card-text>
                  <v-text-field
                    color="primary"
                    label="ایمیل"
                    outlined
                  ></v-text-field>
                  <v-textarea color="primary" outlined>
                    <template v-slot:label>
                      <div>متن</div>
                    </template>
                  </v-textarea>
                  <div style="text-align: left">
                    <v-btn color="primary">ارسال</v-btn>
                  </div>
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
  components: {
    Hero,
    ProductSlider,
  },
}
</script>
<style scoped lang="scss">
.about-section-container {
  width: 100%;
  min-height: 300px;
  padding: 20px $spacing;

  .contact {
  }
}
</style>
