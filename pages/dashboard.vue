<template>
  <div>dashboard</div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
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

<style></style>
