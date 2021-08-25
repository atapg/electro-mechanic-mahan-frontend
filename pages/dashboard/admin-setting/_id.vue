<template>
  <div>
    <v-card class="mb-5">
      <v-card-title>تغییر ادمین</v-card-title>
    </v-card>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col sm="6" cols="12">
            <v-text-field label="نام" v-model="name" outlined></v-text-field>
          </v-col>
          <v-col sm="6" cols="12">
            <v-text-field
              label="نام خانوادگی"
              v-model="lastName"
              outlined
            ></v-text-field>
          </v-col>
          <v-col sm="6" cols="12">
            <v-text-field label="ایمیل" v-model="email" outlined></v-text-field>
          </v-col>
          <v-col sm="6" cols="12">
            <v-text-field
              label="همراه"
              type="number"
              v-model="phone"
              outlined
            ></v-text-field>
          </v-col>
          <v-col sm="6" cols="12">
            <v-subheader class="mb-2">
              جهت تغییر رمز عبور آنرا اینجا تایپ کنید. در غیر اینصورت این فیلد
              را خالی بگذارید
            </v-subheader>
            <v-text-field
              label="رمز عبور"
              v-model="password"
              outlined
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="changeHandler">ثبت</v-btn>
      </v-card-actions>
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
      name: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    }
  },
  async asyncData({ params }) {
    const id = params.id
    return { id }
  },
  mounted() {
    this.getAdmin()
  },
  methods: {
    getAdmin() {
      this.$axios({
        method: 'GET',
        url: `/admins/${this.id}`,
        headers: {
          Authorization: `Bearer ${Cookies.get('_token')}`,
        },
      })
        .then(({ data }) => {
          this.name = data.name
          this.lastName = data.lastName
          this.email = data.email
          this.phone = data.phone
        })
        .catch((err) => {})
    },
    changeHandler() {
      this.$swal({
        title: 'آیا مطمئن هستید؟',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios({
            method: 'PATCH',
            url: `/admins/update`,
            headers: {
              Authorization: `Bearer ${Cookies.get('_token')}`,
            },
            data: {
              id: this.id,
              name: this.name,
              lastName: this.lastName,
              email: this.email,
              phone: this.phone,
              password: this.password,
            },
          })
            .then(({ data }) => {
              this.$swal({
                icon: 'success',
                title: 'ادمین با موفقیت تغییر داده شد!',
                ...Toast,
              })
              this.$router.push('/dashboard/admin-setting')
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

<style></style>
