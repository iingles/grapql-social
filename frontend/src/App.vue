<template>
  <div id="app">
    <router-view
    :token="token"
    :userId="userId"
    />
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId')
    }
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
