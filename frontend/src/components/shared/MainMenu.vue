<template>
    <ul class="main-menu">
        <li><b-nav-item><b-icon icon="house-door" class="mr-2"></b-icon><span class="menu-text">Home</span></b-nav-item></li>
        <li><b-nav-item><b-icon icon="bell" class="mr-2"></b-icon><span class="menu-text">Notifications</span></b-nav-item></li>
        <li><b-nav-item><b-icon icon="envelope" class="mr-2"></b-icon><span class="menu-text">Messages</span></b-nav-item></li>
        <li><b-nav-item><b-icon icon="person" class="mr-2"></b-icon><span class="menu-text">Profile</span></b-nav-item></li>
        <li><b-nav-item><b-icon icon="gear" class="mr-2"></b-icon><span class="menu-text">Settings</span></b-nav-item></li>
        <li><b-nav-item><b-icon icon="question-circle" class="mr-2"></b-icon><span class="menu-text">Help</span></b-nav-item></li>
        <li><b-nav-item @click="logout()"><b-icon icon="box-arrow-right" class="mr-2"></b-icon><span class="menu-text">Logout</span></b-nav-item></li>
    </ul>
</template>

<script>
export default {
  methods: {
    logout () {
      // Add a logout verification modal

      localStorage.removeItem('token')
      localStorage.removeItem('userId')

      this.$router.push('Login')
    }
  }
}
</script>

<style lang="less" scoped>
  .main-menu {
    position: fixed;
    padding: 1rem 0;
    list-style-type: none;
    z-index: 1000;
    background: #fff;

    @media screen and (min-width: 992px) {

    }

    a {
        color: #000;
        font-size: 1.4rem;

        .menu-text {
          display: none;

          @media screen and (min-width: 992px) {
            display: inline;
          }

        }

        @media screen and (max-width: 768px) {
          display: none;
        }
    }

    .nav-link {
        padding: .5rem 0;
    }
  }
</style>
