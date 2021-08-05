<template>
  <div class="container center flex-col">
    <header class="center">
      <div class="logo">
        <img :src="logo" alt="logo" />
      </div>
      <div class="call-section flex">
        <v-icon>mdi-phone</v-icon>
        <v-divider vertical></v-divider>
        <div class="subtitle-1 phone">{{ phone }}</div>
      </div>
    </header>
    <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/">Home</NuxtLink></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: this.$store.state.siteInfo.phone,
      logo: this.$store.state.siteInfo.logo,
    }
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;

  & > * {
    width: 100%;
  }

  header {
    background-color: $primary;
    height: 70px;
    justify-content: flex-start;

    .logo {
      height: 100%;
      width: 200px;
      background-color: $white;
      -webkit-clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 10% 100%);
      clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 10% 100%);
      padding-right: $spacing;

      img {
        width: 90px;
        height: 100%;
      }
    }

    .call-section {
      color: $white;

      hr {
        background-color: $white;
        margin: 0 10px;
        opacity: 0.5;
      }

      i {
        color: $white;
      }
    }
  }

  nav {
    background-color: $light_grey;
    ul {
      display: flex;
      list-style-type: none;
      padding: 0 $spacing;

      li {
        margin-left: 15px;
        padding: 10px 0 10px 10px;

        & > * {
          text-decoration: none;
          color: $black;
          transition: 0.3s all ease;

          &:hover {
            color: $primary;
          }
        }
      }
    }
  }
}
</style>
