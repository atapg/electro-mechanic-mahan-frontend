<template>
  <div>
    <v-card class="mb-5">
      <v-card-title>لیست درخواست ها</v-card-title>
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
          'items-per-page-text': 'تعداد ایمیل در هر صفحه',
        }"
      >
        <template v-slot:item.controls="props">
          <v-btn
            fab
            dark
            x-small
            color="primary"
            @click="sendMail(props.item._id)"
          >
            <v-icon dark>mdi-email-send-outline</v-icon>
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
          { text: 'ایمیل', value: 'email' },
          { text: 'تاریخ', value: 'time' },
          { text: 'وضعیت', value: 'answered' },
          { text: '', value: 'controls', sortable: false },
        ],
        items: [],
      },
    }
  },
  mounted() {
    this.getEmails()
  },
  methods: {
    getEmails() {
      this.$axios({
        method: 'GET',
        url: '/messages',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${Cookies.get('_token')}`,
        },
      })
        .then(({ data }) => {
          const modifiedProducts = data?.reverse().map((mail, index) => ({
            index: index + 1,
            ...mail,
            answered: mail.answered ? 'پاسخ داده شده' : 'بدون پاسخ',
          }))

          if (data.length < 1) {
            this.loading = 'هیچ محصولی وجود ندارد'
          } else {
            this.tableData.items = modifiedProducts
          }
        })
        .catch((err) => {})
    },
    sendMail(id) {
      this.$router.push(`/dashboard/emails-list/${id}`)
    },
  },
}
</script>

<style scoped></style>
