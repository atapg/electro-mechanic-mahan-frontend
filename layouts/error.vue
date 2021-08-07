<template>
  <div class="notfound-container center">
    <v-card elevation="2" class="card">
      <p class="title">404</p>
      <p class="desc">! صفحه مورد نظر پیدا نشد</p>
      <NuxtLink to="/"><p class="return">برگشت به صفحه اصلی</p></NuxtLink>
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.notfound-container {
  width: 100vw;
  height: 100vh;
  text-align: center;
  .card {
    padding: $spacing;

    .title {
      font-size: 5vw;
      margin-bottom: 20px;
    }

    .desc {
      font-size: 30px;
      margin-bottom: 20px;
    }

    .return {
      color: $primary;
    }
  }
}
</style>
