<template>
  <v-app>
    <div class="dashboard-container">
      <div class="sidebar-container" style="height: 100vh">
        <v-navigation-drawer
          v-model="drawer"
          :mini-variant.sync="mini"
          permanent
          dark
          color="primary"
        >
          <v-list-item class="px-2">
            <v-btn icon @click.stop="mini = !mini" v-if="mini">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <v-list-item-title>
              <div class="sidebar-title">سلام {{ user }} !</div>
            </v-list-item-title>

            <v-btn icon @click.stop="mini = !mini">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <NuxtLink :to="item.url" v-for="item in items" :key="item.title">
              <v-list-item link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </NuxtLink>

            <v-list-item link to="/">
              <v-list-item-icon>
                <v-icon>mdi-web</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>مشاهده سایت</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link @click="logoutHandler">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>خروج</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
      <div class="content-container">
        <nuxt-child />
      </div>
    </div>
  </v-app>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      items: [
        {
          title: 'داشبورد',
          icon: 'mdi-view-dashboard-outline',
          url: '/dashboard',
        },
        {
          title: 'افزودن محصول',
          icon: 'mdi-plus-box-multiple-outline',
          url: '/dashboard/add-product',
        },
        {
          title: 'لیست محصولات',
          icon: 'mdi-format-list-bulleted',
          url: '/dashboard/products-list',
        },
        {
          title: 'تنظیمات ادمین',
          icon: 'mdi-account-cog-outline',
          url: '/dashboard/admin-setting',
        },
        {
          title: 'تنظیمات سایت',
          icon: 'mdi-cog-outline',
          url: '/dashboard/site-setting',
        },
        {
          title: 'تنظیمات تصاویر',
          icon: 'mdi-image-edit-outline',
          url: '/dashboard/images-setting',
        },
      ],
      right: null,
      drawer: true,
      mini: true,
    }
  },
  head() {
    return {
      title: 'داشبورد',
    }
  },
  methods: {
    logoutHandler() {
      this.$swal({
        title: 'آیا میخواهید خارج شوید؟',
        showCancelButton: true,
        cancelButtonText: 'خیر',
        confirmButtonText: 'بله',
      }).then((result) => {
        if (result.isConfirmed) {
          Cookies.remove('_token')
          this.$router.push('/')
        }
      })
    },
  },
  computed: {
    user() {
      return this.$store.state.user.name
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  transition: 0.3s all ease;
  z-index: 10;
  display: flex;
  position: relative;

  .sidebar-container {
    height: 100%;
    position: sticky;
    top: 0;
    right: 0;
    bottom: 0;

    .sidebar-title {
      padding: $spacing / 3;
    }
  }

  .content-container {
    width: 100%;
    flex-shrink: 100%;
    padding: $spacing / 2;
  }
}
</style>
