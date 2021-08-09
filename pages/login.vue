<template>
  <v-app>
    <div class="login-container center">
      <v-row class="center">
        <v-col xl="4" lg="4" md="4" sm="8" cols="8">
          <v-card elevation="2">
            <v-card-title class="display-1 my-5"> ورود کاربر </v-card-title>
            <v-card-text>
              <v-text-field
                color="primary"
                label="ایمیل"
                outlined
                v-model="email"
              ></v-text-field>
              <v-text-field
                color="primary"
                label="رمز عبور"
                type="password"
                outlined
                v-model="password"
              ></v-text-field>
              <v-checkbox
                v-model="checkbox"
                label="مرا به خاطر بسپار"
              ></v-checkbox>
              <div class="btn-actions">
                <NuxtLink to="/">
                  <v-btn large color="primary">بازگشت به صفحه اصلی</v-btn>
                </NuxtLink>
                <v-btn @click="loginHandler" large color="primary">ورود</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import { Toast } from '@/plugins/sweetalertMixins'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      checkbox: false,
      email: null,
      password: null,
    }
  },
  head() {
    return {
      title: 'ورود',
    }
  },
  mounted() {
    const token = Cookies.get('_token')

    if (token) {
      this.$axios({
        method: 'GET',
        url: 'admins/authenticate',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            this.$router.push('/dashboard')
          }
        })
        .catch((err) => {})
    }
  },
  methods: {
    loginHandler() {
      this.$axios({
        method: 'POST',
        url: 'admins/login',
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then(({ data }) => {
          console.log(data)
          this.$swal({
            icon: 'success',
            title: '!شما با موفقیت وارد شدید',
            ...Toast,
          })

          if (this.checkbox) {
            Cookies.set('_token', data.token, { expires: 7 })
          }

          this.$router.push('/dashboard')
        })
        .catch((err) => {
          if (err.response.status === 403) {
            this.$swal({
              icon: 'error',
              title: '!اطلاعات ورود اشتباه است',
              ...Toast,
            })
          } else {
            this.$swal({
              icon: 'error',
              title: '!خطایی رخ داده است',
              ...Toast,
            })
          }
        })
    },
  },
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100vw;
  height: 100vh;
  text-align: center;
  direction: rtl;

  .btn-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
