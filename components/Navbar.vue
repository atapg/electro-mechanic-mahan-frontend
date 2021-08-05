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
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
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
      padding-right: 20px;

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
    background-color: green;
  }
}
</style>
