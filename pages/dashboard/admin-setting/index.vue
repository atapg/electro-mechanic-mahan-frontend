<template>
  <div>
    <v-card class="mb-5">
      <v-card-title>تنظیمات ادمین</v-card-title>
    </v-card>
    <v-card class="mb-5">
      <v-card-title>افزودن ادمین</v-card-title>
      <v-card-text>
        <v-btn color="primary" @click="addAdmin"> افزودن </v-btn>
      </v-card-text>
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
          'items-per-page-text': 'تعداد در هر صفحه',
        }"
      >
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
          { text: 'نام ادمین', value: 'name' },
          { text: 'ایمیل', value: 'email' },
          { text: 'شماره', value: 'phone' },
          { text: '', value: 'controls', sortable: false },
        ],
        items: [],
      },
    }
  },
  mounted() {
    this.getAdmins()
  },
  methods: {
    getAdmins() {
      this.$axios({
        method: 'GET',
        url: '/admins/get-all',
        headers: {
          Authorization: `Bearer ${Cookies.get('_token')}`,
        },
      })
        .then(({ data }) => {
          const modifiedAdmins = data.admins?.reverse().map((item, index) => ({
            index: index + 1,
            ...item,
          }))

          if (data.length < 1) {
            this.loading = 'هیچ ادمینی وجود ندارد'
          } else {
            this.tableData.items = modifiedAdmins
          }
        })
        .catch((err) => {
          this.loading = 'مشکلی به وجود آمده است'
        })
    },
    editHandler(item) {
      this.$router.push(`/dashboard/admin-setting/${item._id}`)
    },
    deleteHandler(item) {
      this.$swal({
        title: 'آیا از حذف ادمین مطمئن هستید؟',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios({
            method: 'DELETE',
            url: '/admins/delete',
            data: {
              admin_id: item._id,
            },
            headers: {
              Authorization: `Bearer ${Cookies.get('_token')}`,
            },
          })
            .then((res) => {
              this.$swal({
                icon: 'success',
                title: 'ادمین با موفقیت حذف شد!',
                ...Toast,
              })

              this.getAdmins()
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
    addAdmin() {
      this.$router.push(`/dashboard/admin-setting/add-admin`)
    },
  },
}
</script>

<style></style>
