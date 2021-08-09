<template>
  <div>
    <v-card>
      <v-card-title>خوش آمدید!</v-card-title>
    </v-card>
    <v-spacer class="my-5"></v-spacer>
    <v-card>
      <v-card-title>جدید ترین اخبار</v-card-title>
    </v-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  layout: 'dashboard',
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
        .then((res) => {})
        .catch((err) => {
          this.$router.push('/login')
        })
    }
  },
}
</script>
