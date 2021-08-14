<template>
  <div>
    <v-card class="mb-5">
      <v-card-title>تنظیمات سایت</v-card-title>
    </v-card>
    <v-card class="mb-5">
      <v-card-title>اطلاعات</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            sm="6"
            cols="12"
            v-for="(value, index) in settings"
            :key="index"
          >
            <v-text-field
              outlined
              v-model="siteInfo[index]"
              :label="changeToPer(index)"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mb-5">
      <v-card-title>شبکه های اجتماعی</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            sm="6"
            cols="12"
            v-for="(value, index) in socials"
            :key="index"
          >
            <div>
              <v-subheader>
                <v-icon>{{ newSocials[index].icon }}</v-icon>
                <v-divider vertical class="mx-3"></v-divider>
                <v-btn
                  @click="deleteSocial(newSocials[index].info)"
                  x-small
                  elevation="0"
                  fab
                  ><v-icon>mdi-close</v-icon>
                </v-btn>
              </v-subheader>
              <v-divider class="mb-5"></v-divider>
              <v-text-field
                outlined
                v-model="newSocials[index].info"
                :label="changeToPer('info')"
              ></v-text-field>
              <v-text-field
                outlined
                v-model="newSocials[index].icon"
                :label="changeToPer('icon')"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="addNew(newSocials)">افزودن</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mb-5">
      <v-card-title>تنظیمات هدر</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            sm="6"
            cols="12"
            v-for="(value, index) in nav_items"
            :key="index"
          >
            <div>
              <v-subheader>
                شماره {{ index + 1 }}
                <v-divider vertical class="mx-3"></v-divider>
                <v-btn
                  @click="deleteNavItems(newNavItems[index].title)"
                  x-small
                  elevation="0"
                  fab
                  ><v-icon>mdi-close</v-icon>
                </v-btn>
              </v-subheader>
              <v-divider class="mb-5"></v-divider>
              <v-text-field
                outlined
                v-model="newNavItems[index].title"
                :label="changeToPer('title')"
              ></v-text-field>
              <v-text-field
                outlined
                v-model="newNavItems[index].url"
                :label="changeToPer('url')"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="addNew(newNavItems)">افزودن</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mb-5">
      <v-card-title>تنظیمات نوشتار صفحه اصلی</v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            sm="6"
            cols="12"
            v-for="(value, index) in typings"
            :key="index"
          >
            <v-subheader>
              شماره {{ index + 1 }}
              <v-divider vertical class="mx-3"></v-divider>
              <v-btn x-small elevation="0" fab @click="deleteTypings(index)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-subheader>
            <v-divider class="mb-5"></v-divider>
            <v-text-field
              outlined
              v-model="newTypings[index]"
              :label="`شماره ${index + 1}`"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" @click="addNew(newTypings)">افزودن</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-actions>
        <v-btn color="primary" @click="editSettings">ذخیره</v-btn>
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
      siteInfo: {},
      settings: {},
      socials: [],
      newSocials: [],
      typings: [],
      nav_items: [],
      newNavItems: [],
      newTypings: [],
    }
  },
  mounted() {
    this.getSiteInfo()
  },
  methods: {
    addNew(arr) {
      if (arr === this.newSocials) {
        this.newSocials.push({
          info: '',
          icon: '',
        })
      } else if (arr === this.newNavItems) {
        this.newNavItems.push({
          url: '',
          title: '',
        })
      } else {
        this.newTypings.push('')
      }
    },
    deleteSocial(item) {
      const arr = this.newSocials.findIndex((inf) => inf.info === item)
      this.newSocials.splice(arr, 1)
    },
    deleteNavItems(item) {
      const arr = this.newNavItems.findIndex((inf) => inf.title === item)
      this.newNavItems.splice(arr, 1)
    },
    deleteTypings(item) {
      console.log(item)
      this.newTypings.splice(item, 1)
    },
    editSettings() {
      this.$swal({
        title: 'آیا برای ذخیره مطمئن هستید؟',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله',
      }).then((result) => {
        if (result.isConfirmed) {
          const wholeSettins = {}

          for (let i in this.settings) {
            wholeSettins[i] = this.settings[i]
          }
          wholeSettins.nav_items = this.newNavItems
          wholeSettins.typings = this.typings
          wholeSettins.socials = this.newSocials

          this.$axios({
            method: 'PATCH',
            url: '/site-setting',
            data: wholeSettins,
            headers: {
              Authorization: `Bearer ${Cookies.get('_token')}`,
            },
          })
            .then((res) => {
              this.$swal({
                icon: 'success',
                title: 'تنظیمات سایت اعمال شد!',
                ...Toast,
              })
            })
            .catch((err) => {
              console.log(err)
              console.log(err.response)
              this.$swal({
                icon: 'error',
                title: 'ناموفق',
                ...Toast,
              })
            })
        }
      })
    },
    getSiteInfo() {
      this.$axios({
        method: 'GET',
        url: '/public',
      })
        .then(({ data }) => {
          this.siteInfo = data

          this.socials = data.socials
          this.newSocials = data.socials

          this.nav_items = data.nav_items
          this.newNavItems = data.nav_items

          this.typings = data.typings
          this.newTypings = data.typings

          this.settings = data
          delete this.settings.typings
          delete this.settings.nav_items
          delete this.settings.socials
          delete this.settings._id
          delete this.settings.__v
        })
        .catch((err) => {
          console.log(err)

          this.$swal({
            icon: 'error',
            title: 'مشکلی پیش آمد!',
            ...Toast,
          })
        })
    },
    changeToPer(item) {
      switch (item) {
        case 'phone':
          return 'همراه'
        case 'phone2':
          return 'همراه 2'
        case 'telephone':
          return 'تلفن'
        case 'address':
          return 'آدرس'
        case 'name':
          return 'نام'
        case 'lastName':
          return 'نام خانوادگی'
        case 'email':
          return 'ایمیل'
        case 'title':
          return 'عنوان'
        case 'brand':
          return 'برند'
        case 'brandPer':
          return 'برند به فارسی'
        case 'logo':
          return 'لوگو'
        case 'hero_bg':
          return 'پس زمینه صفحه اصلی'
        case 'icon':
          return 'آیکون'
        case 'info':
          return 'مشخصات'
        case 'title':
          return 'عنوان'
        case 'url':
          return 'لینک'
        default:
          break
      }
    },
  },
}
</script>

<style></style>
