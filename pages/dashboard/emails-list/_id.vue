<template>
  <div>
    <v-card class="mb-5">
      <v-card-title>مشاهده درخواست</v-card-title>
    </v-card>
    <v-card>
      <v-card-title>متن</v-card-title>
      <v-card-text>
        <v-card class="mb-5">
          <v-card-title>ایمیل: {{ email.email }} </v-card-title>
          <v-card-title> تلفن: {{ email.phone }}</v-card-title>
          <v-card-text><strong>متن:</strong> {{ email.text }}</v-card-text>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="sendEmail" color="primary"
          >تغییر به وضعیت پاسخ داده شده</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { Toast } from '~/plugins/sweetalertMixins'

export default {
  layout: 'dashboard',
  data() {
    return {
      email: {},
      answer: '',
    }
  },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  mounted() {
    this.getMassage()
  },
  methods: {
    getMassage() {
      this.$axios({
        method: 'GET',
        url: `/messages/${this.id}`,
        headers: {
          Authorization: `Bearer ${Cookies.get('_token')}`,
        },
      })
        .then(({ data }) => {
          this.email = data
        })
        .catch((err) => {})
    },
    sendEmail() {
      this.$swal({
        title: 'آیا برای تغییر وضعیت مطمئن هستید؟',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios({
            method: 'POST',
            url: `/messages/answer`,
            data: {
              id: this.id,
            },
            headers: {
              Authorization: `Bearer ${Cookies.get('_token')}`,
            },
          })
            .then(() => {
              this.$swal({
                icon: 'success',
                title: 'موفق!',
                ...Toast,
              })
              this.$router.push('/dashboard/emails-list')
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
  },
}
</script>

<style scoped></style>
