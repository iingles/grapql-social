<template>
    <ul>
        <li><b-nav-item><b-icon icon="house-door" class="mr-2"></b-icon><span>Home</span></b-nav-item></li>
        <li><b-nav-item><b-icon icon="bell" class="mr-2"></b-icon>Notifications</b-nav-item></li>
        <li><b-nav-item><b-icon icon="envelope" class="mr-2"></b-icon>Messages</b-nav-item></li>
        <li><b-nav-item><b-icon icon="person" class="mr-2"></b-icon>Profile</b-nav-item></li>
        <li><b-nav-item><b-icon icon="gear" class="mr-2"></b-icon>Settings</b-nav-item></li>
        <li><b-nav-item><b-icon icon="question-circle" class="mr-2"></b-icon>Help</b-nav-item></li>
        <li><b-nav-item @click="logout()"><b-icon icon="box-arrow-right" class="mr-2"></b-icon>Logout</b-nav-item></li>
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
    ul {
        padding: 1rem 0;
        list-style-type: none;
    }

    ul a {
        color: #000;
        font-size: 1.6rem;
    }

    .nav-link {
        padding: .5rem 0;
    }
</style>
