<template>
  <div>
    <v-card class="mb-5">
      <v-card-title>تنظیمات تصاویر</v-card-title>
    </v-card>
    <v-card class="mb-5">
      <v-card-title>افزودن تصاویر</v-card-title>
      <v-card-text>
        <v-file-input
          outlined
          counter
          multiple
          accept="image/png, image/jpeg, image/gif, image/jpg"
          show-size
          placeholder="تصاویر"
          truncate-length="15"
          v-model="images"
        ></v-file-input>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="uploadNewImages">افزودن</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>تصاویر عمومی موجود</v-card-title>
      <v-card-text v-if="allImages.length > 0">
        <v-row class="mb-5">
          <v-col
            sm="4"
            cols="12"
            v-for="(image, index) in allImages"
            :key="index"
          >
            <v-card>
              <img
                class="images"
                :src="image.url"
                alt="electro-mechanic-mahan"
              />
              <v-card-actions>
                <v-btn color="primary" @click="deleteImage(image.url)"
                  >حذف</v-btn
                >
                <v-btn color="secondary" @click="copyUrl(image.url)">کپی</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-pagination v-model="page" :length="numberOfPages"></v-pagination>
      </v-card-text>
      <v-card-text v-else>
        <p class="title">هیچ تصویری وجود ندارد</p>
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
      allImages: [],
      page: 1,
      numberOfPages: 0,
      images: [],
    }
  },
  mounted() {
    this.getImages()
  },
  methods: {
    getImages() {
      this.$axios({
        method: 'GET',
        url: `/images?page=${this.page}`,
        headers: {
          Authorization: `Bearer ${Cookies.get('_token')}`,
        },
      })
        .then(({ data }) => {
          this.allImages = data.images
          this.page = data.page
          this.numberOfPages = data.numberOfPages
        })
        .catch((err) => {})
    },
    uploadNewImages() {
      const imageData = new FormData()

      for (let i = 0; i < this.images.length; i++) {
        imageData.append(`images`, this.images[i])
      }

      this.$axios({
        method: 'POST',
        url: 'images/post',
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

          this.getImages()
          this.images = []
        })
        .catch((err) => {
          this.$swal({
            icon: 'error',
            title: 'ناموفق',
            ...Toast,
          })
        })
    },
    deleteImage(imageUrl) {
      this.$swal({
        title: 'آیا از حذف عکس مطمئن هستید؟',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios({
            method: 'DELETE',
            url: '/images/delete',
            headers: {
              Authorization: `Bearer ${Cookies.get('_token')}`,
            },
            data: {
              image: imageUrl,
            },
          })
            .then(({ data }) => {
              this.$swal({
                icon: 'success',
                title: 'عکس با موفقیت حذف شد!',
                ...Toast,
              })

              this.getImages()
            })
            .catch((err) => {
              this.$swal({
                icon: 'error',
                title: 'ناموفق',
                ...Toast,
              })
            })
        }
      })
    },
    copyUrl(imageUrl) {
      navigator.clipboard.writeText(imageUrl)

      this.$swal({
        icon: 'success',
        title: 'لینک عکس کپی شد!',
        ...Toast,
      })
    },
  },
  watch: {
    page() {
      this.getImages()
    },
  },
}
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
