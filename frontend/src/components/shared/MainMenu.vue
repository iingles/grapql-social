<template>
    <ul class="main-menu">
        <li><b-nav-item to="/home"><b-icon icon="house-door" class="mr-2"></b-icon><span class="menu-text">Home</span></b-nav-item></li>
        <li><b-nav-item to="/notifications"><b-icon icon="bell" class="mr-2"></b-icon><span class="menu-text">Notifications</span></b-nav-item></li>
        <li><b-nav-item to="/messages"><b-icon icon="envelope" class="mr-2"></b-icon><span class="menu-text">Messages</span></b-nav-item></li>
        <li><b-nav-item :to="`/profile/${userId}`"><b-icon icon="person" class="mr-2"></b-icon><span class="menu-text">Profile</span></b-nav-item></li>
        <li><b-nav-item to="/settings"><b-icon icon="gear" class="mr-2"></b-icon><span class="menu-text">Settings</span></b-nav-item></li>
        <li><b-nav-item to="/help"><b-icon icon="question-circle" class="mr-2"></b-icon><span class="menu-text">Help</span></b-nav-item></li>
        <li><b-nav-item @click="logout()"><b-icon icon="box-arrow-right" class="mr-2"></b-icon><span class="menu-text">Logout</span></b-nav-item></li>
    </ul>
</template>

<script>
export default {
  data: () => {
    return {
      userId: ''
    }
  },
  created () {
    this.userId = localStorage.getItem('userId')
  },
  methods: {
    logout () {
      // Add a logout verification modal

      this.$store.dispatch('logout')

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')

      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  .main-menu {
    position: fixed;
    height: 100%;
    padding: 1rem 0;
    list-style-type: none;
    z-index: 1000;
    background: #fff;

  @media screen and (min-width: 992px) {
      position: fixed;
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

        }
    }

    .nav-link {
        padding: .5rem 0;
    }
  }
</style>
