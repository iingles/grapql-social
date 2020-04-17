<template>
  <div id="app">
    <Navbar />
    <b-container class="mt-5">
      <b-row d-flex flex-direction-column>
        <b-col cols="12" sm="1" md="1" lg="2">
          <MainMenu v-if="this.$store.getters.user.auth" />
        </b-col>
          <router-view />
        <b-col cols="12" sm="12" md="11" lg="4">
          <div class="side-content">
            <router-view class="sidebar-view" name="SidebarView" />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/shared/Navbar'
import MainMenu from './components/shared/MainMenu'

export default {
  components: {
    Navbar,
    MainMenu
  }
}
</script>

<style lang="less">
  @twblue: #15202B;
  // @twgray: #3D5466;
  @twgray: #CCD6DD;

  .btn-primary {
    background: @twblue;
    color: #fff;
  }

   .container-tw {
      border-bottom: 1px solid @twgray;
  }

  .container {
      max-width: 1200px;
  }

  .main-view {
      min-height: 100vh;
  }

  .main-content {
      min-height: 100vh;
      margin: 0;
      padding: 0;

      @media screen and (min-width: 992px) {
          border-left: 1px solid @twgray;
          border-right: 1px solid @twgray;
          padding: 20px;
      }
  }

  .side-content {
      border: 1px solid @twgray;
      border-radius: 10px;

      @media screen and (min-width: 800px) {
          margin: 20px 10px;
          padding: 20px;
      }
  }
</style>
