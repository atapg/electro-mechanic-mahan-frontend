<template>
  <div>
    <v-card class="mb-5">
      <v-card-title>ویرایش محصول</v-card-title>
    </v-card>
    <v-card class="mb-5">
      <v-card-title>اطلاعات محصول</v-card-title>
      <v-card-text v-if="product">
        <v-text-field label="نام محصول" v-model="title" outlined></v-text-field>

        <v-textarea color="primary" v-model="description" outlined no-resize>
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
            <v-text-field label="اندازه" v-model="size" outlined></v-text-field>
          </v-col>
          <v-col sm="6" cols="12">
            <v-text-field label="وزن" v-model="weight" outlined></v-text-field>
          </v-col>
          <v-col sm="6" cols="12">
            <v-text-field label="سرعت" v-model="speed" outlined></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <div class="action" @click="editHandler">
        <v-btn color="primary">ذخیره</v-btn>
      </div>
    </v-card>
    <v-card>
      <v-card-title>عکس های محصول</v-card-title>
      <v-card-text>
        <v-card class="mb-5" v-if="existedImages">
          <v-card-title>عکس ها</v-card-title>
          <v-card-title>
            <v-row>
              <v-col
                v-for="(image, index) in existedImages"
                xl="4"
                lg="4"
                md="6"
                sm="6"
                xs="12"
                :key="index"
              >
                <v-card>
                  <v-card-text>
                    <img class="existed-images" :src="image" />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="deleteImage(image)" color="primary"
                      >حذف عکس</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>

        <v-card class="mb-5">
          <v-card-title>افزودن عکس</v-card-title>
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
          <v-card-actions>
            <v-btn @click="uploadNewImages" color="primary">ذخیره</v-btn>
          </v-card-actions>
        </v-card>
        <v-card>
          <v-card-title>افزودن عکس با لینک (بدون آپلود بر سرور)</v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              label="image"
              v-for="input in inputs"
              :key="input"
              v-model="imagesWithUrl[input - 1]"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="secondary"
              @click="addField"
              class="btn-add-field mr-2"
            >
              افزودن فیلد
            </v-btn>
            <v-btn
              color="secondary"
              @click="deleteField"
              class="btn-add-field mr-2"
            >
              حذف فیلد
            </v-btn>
            <v-btn color="primary" @click="addImagesWithUrl">ذخیره</v-btn>
          </v-card-actions>
        </v-card>
      </v-card-text>
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
      title: '',
      description: '',
      price: 0,
      size: '',
      weight: '',
      speed: '',
      existedImages: null,
      images: null,
      product: null,
      imagesWithUrl: [],
      inputs: 1,
    }
  },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  mounted() {
    this.getTheProduct()
  },
  methods: {
    addField() {
      this.inputs++
    },
    deleteField() {
      if (this.inputs > 1) {
        this.inputs--
      }
    },
    addImagesWithUrl() {
      //delete empty string element
      // this.imagesWithUrl.shift()

      this.$axios({
        method: 'POST',
        url: '/upload/image-with-url',
        data: {
          product_id: this.product._id,
          images: this.imagesWithUrl,
        },
        headers: {
          Authorization: `Bearer ${Cookies.get('_token')}`,
        },
      })
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'لینک عکس با موفقیت اضافه شد!',
            ...Toast,
          })
          this.getTheProduct()
          this.imagesWithUrl = []
          this.inputs = 1
        })
        .catch(() => {
          this.$swal({
            icon: 'error',
            title: 'ناموفق',
            ...Toast,
          })
        })
    },
    getTheProduct() {
      this.$axios({
        method: 'GET',
        url: `/products/${this.id}`,
      })
        .then(({ data }) => {
          this.product = data

          if (data.images) {
            this.existedImages = data.images
          }

          this.title = data.title
          this.description = data.description
          this.price = data.price
          this.size = data.size
          this.weight = data.weight
          this.speed = data.speed
        })
        .catch((err) => {})
    },
    editHandler() {
      this.$axios({
        method: 'PATCH',
        url: `/products/update/${this.product._id}`,
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
        },
      })
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'محصول با موفقیت ویرایش شد!',
            ...Toast,
          })
        })
        .catch((err) => {
          this.$swal({
            icon: 'error',
            title: 'ناموفق',
            ...Toast,
          })
        })
    },
    deleteImage(img_url) {
      this.$swal({
        title: 'آیا از حذف عکس مطمئن هستید؟',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios({
            method: 'DELETE',
            url: '/upload/images',
            headers: {
              Authorization: `Bearer ${Cookies.get('_token')}`,
            },
            data: {
              img_url,
              product_id: this.product._id,
            },
          })
            .then(() => {
              this.$swal({
                icon: 'success',
                title: 'عکس با موفقیت حذف شد!',
                ...Toast,
              })
              this.getTheProduct()
            })
            .catch(() => {
              this.$swal({
                icon: 'error',
                title: 'ناموفق',
                ...Toast,
              })
              this.getTheProduct()
            })
        }
      })
    },
    uploadNewImages() {
      const imageData = new FormData()

      for (let i = 0; i < this.images.length; i++) {
        imageData.append(`images`, this.images[i])
      }

      this.$axios({
        method: 'POST',
        url: `/upload/images/${this.product._id}`,
        data: imageData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('_token')}`,
        },
      })
        .then(() => {
          this.$swal({
            icon: 'success',
            title: 'عکس با موفقیت اضافه شد!',
            ...Toast,
          })

          this.getTheProduct()
          this.images = null
        })
        .catch((err) => {
          this.$swal({
            icon: 'error',
            title: 'ناموفق',
            ...Toast,
          })
        })
    },
  },
}
</script>

<style scoped lang="scss">
.action {
  padding: $spacing / 2;
}

.existed-images {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.inputs {
  display: flex;
  justify-content: center;
  align-items: center;

  .btn-add-field {
    align-self: flex-start;
  }
}
</style>
