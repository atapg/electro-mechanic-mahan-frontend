<template>
  <div>single product{{ this.id }}</div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
    }
  },
  async asyncData({ params }) {
    const paramId = params.id
    return { paramId }
  },
  mounted() {
    this.id = this.paramId
  },
}
</script>

<style></style>
