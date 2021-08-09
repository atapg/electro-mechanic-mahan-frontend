<template>
  <div>
    <v-card>
      <v-card-title> لیست محصولات</v-card-title>
    </v-card>
    <v-card>
      <v-data-table
        :headers="tableData.headers"
        :items="tableData.items"
        :items-per-page="10"
        class="elevation-1"
        loading="data"
        :loading-text="loading"
        :footer-props="{
          'items-per-page-text': 'تعداد تراکنش در هر صفحه',
        }"
      >
        <template #item.price="{ item }"> {{ item.price }} تومان </template>
        <template v-slot:item.controls="props">
          <v-btn
            fab
            dark
            x-small
            color="primary"
            @click="editHandler(props.item)"
          >
            <v-icon dark>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            x-small
            color="primary"
            @click="deleteHandler(props.item)"
          >
            <v-icon dark>mdi-delete-empty-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      loading: 'در حال بارگزاری...',
      tableData: {
        headers: [
          {
            text: 'شماره',
            align: 'start',
            sortable: true,
            value: 'index',
          },
          { text: 'نام محصول', value: 'title' },
          { text: 'قیمت', value: 'price' },
          { text: '', value: 'controls', sortable: false },
        ],
        items: [],
      },
    }
  },
  mounted() {
    this.$axios({
      method: 'GET',
      url: '/products/get-all',
    })
      .then(({ data }) => {
        const modifiedProducts = data?.map((product, index) => ({
          index,
          ...product,
        }))

        if (data.length < 1) {
          this.loading = 'هیچ محصولی وجود ندارد'
        } else {
          this.tableData.items = modifiedProducts
        }
      })
      .catch((err) => {
        this.loading = 'مشکلی به وجود آمده است'
      })
  },
  methods: {
    editHandler(product) {
      console.log(product)
    },
    deleteHandler(product) {
      console.log(product)
    },
  },
}
</script>

<style></style>
