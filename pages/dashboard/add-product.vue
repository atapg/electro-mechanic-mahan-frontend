<template>
  <div>
    <v-card class="mb-5">
      <v-card-title>افزودن محصول</v-card-title>
    </v-card>
    <v-card>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">
            اطلاعات محصول
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2">
            افزودن عکس
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <!-- step 1 -->
          <v-stepper-content step="1">
            <v-card elevation="0">
              <v-card-text>
                <v-text-field
                  label="نام محصول"
                  v-model="title"
                  outlined
                ></v-text-field>

                <v-text-field
                  label="توضیح مختصر محصول"
                  v-model="smallDesc"
                  outlined
                ></v-text-field>

                <v-textarea
                  color="primary"
                  v-model="description"
                  outlined
                  no-resize
                >
                  <template v-slot:label>
                    <div>درباره ی محصول</div>
                  </template>
                </v-textarea>

                <v-row>
                  <v-col sm="6" cols="12">
                    <v-text-field
                      label="قیمت"
                      v-model="price"
                      type="number"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col sm="6" cols="12">
                    <v-text-field
                      label="اندازه"
                      v-model="size"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col sm="6" cols="12">
                    <v-text-field
                      label="وزن"
                      v-model="weight"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col sm="6" cols="12">
                    <v-text-field
                      label="سرعت"
                      v-model="speed"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <v-btn color="primary" @click="step = 2"> ذخیره و بعدی </v-btn>
          </v-stepper-content>
          <!-- step 1 -->

          <!-- step 2 -->
          <v-stepper-content step="2">
            <v-card elevation="0">
              <v-card-text>
                <v-file-input
                  outlined
                  counter
                  multiple
                  accept="image/png, image/jpeg, image/gif, image/jpg"
                  show-size
                  placeholder="عکس های محصول"
                  truncate-length="15"
                  v-model="images"
                ></v-file-input>
              </v-card-text>
            </v-card>
            <v-btn color="primary" @click="createProduct">
              ذخیره و پایان
            </v-btn>
            <v-btn color="secondary" @click="step = 1"> قبلی </v-btn>
          </v-stepper-content>
          <!-- step 2 -->
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { Toast } from '@/plugins/sweetalertMixins'

export default {
  layout: 'dashboard',
  data() {
    return {
      step: 1,
      title: '',
      description: '',
      price: 0,
      size: '',
      weight: '',
      speed: '',
      images: null,
      smallDesc: '',
    }
  },
  methods: {
    createProduct() {
      this.$axios({
        method: 'POST',
        url: '/products/create',
        headers: {
          Authorization: `Bearer ${Cookies.get('_token')}`,
        },
        data: {
          title: this.title,
          description: this.description,
          price: this.price,
          size: this.size,
          weight: this.weight,
          speed: this.speed,
          smallDesc: this.smallDesc,
        },
      })
        .then(({ data }) => {
          const imageData = new FormData()

          for (let i = 0; i < this.images.length; i++) {
            imageData.append(`images`, this.images[i])
          }

          this.$axios({
            method: 'POST',
            url: `/upload/images/${data._id}`,
            data: imageData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${Cookies.get('_token')}`,
            },
          })
            .then(() => {
              this.$swal({
                icon: 'success',
                title: 'محصول با موفقیت ساخته شد!',
                ...Toast,
              })
              this.$router.push('/dashboard')
            })
            .catch((err) => {
              this.$swal({
                icon: 'error',
                title: 'ناموفق',
                ...Toast,
              })
            })
        })
        .catch((err) => {
          this.$swal({
            icon: 'error',
            title: 'ناموفق',
            ...Toast,
          })
        })

      this.$router.push('/dashboard/products-list')
    },
  },
}
</script>

<style scoped lang="scss">
.margin-btn {
  padding: $spacing;
}
</style>
