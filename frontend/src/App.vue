<template>
  <div id="app">
    <router-view />
    <!-- <router-view
    :token="this.$store.getters.user.token"
    :userId="this.$store.getters.user.userId"
    :auth="this.$store.getters.user.auth"
    /> -->
  </div>
</template>

<script>
export default {
  data: () => {

  }
}
</script>

<style lang="less">
  @twblue: #15202B;
  @twgray: #3D5466;

  .btn-primary {
    background: @twblue;
    color: #fff;
  }
</style>
