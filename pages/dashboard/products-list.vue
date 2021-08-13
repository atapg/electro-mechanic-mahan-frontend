<template>
  <div>
    <v-card class="mb-5">
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
        item-key="id"
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
import Cookies from 'js-cookie'
import { Toast } from '@/plugins/sweetalertMixins'

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
        const modifiedProducts = data?.reverse().map((product, index) => ({
          index: index + 1,
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
      this.$router.push(`/dashboard/edit-product/${product._id}`)
    },
    deleteHandler(product) {
      this.$swal({
        title: 'آیا از حذف این محصول مطمئن هستید؟',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios({
            method: 'DELETE',
            url: `/products/delete/${product._id}`,
            headers: {
              Authorization: `Bearer ${Cookies.get('_token')}`,
            },
          })
            .then(() => {
              this.$swal({
                icon: 'success',
                title: 'محصول با موفقیت حذف شد!',
                ...Toast,
              })
              this.$router.push('/dashboard')
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
