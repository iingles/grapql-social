<template>
    <b-container class="container mt-5 d-flex justify-content-center align-content-center">
      <div>
        <b-card
        title="Login"
        >
          <b-form @submit.prevent="loginHandler" @keyup.enter="loginHandler">
              <b-button @click="setDemoUser('demouser@example.com', 'iiiiiiiiii1')">Log in as a demo user</b-button>

              <b-form-group
              id="input-group-1"
              label="Email"
              label-for="email"
              >
                  <input id="email" type="email" v-model="authData.email">
              </b-form-group>
              <b-form-group
              id="input-group-2"
              label="Password"
              label-for="password"
              >
                  <input id="password" type="password" v-model="authData.password">
              </b-form-group>
              <b-button variant="link" href="/account-recovery">Forgot Password?</b-button>
              <b-button type="submit" pill variant="outline-primary">log in</b-button>
          </b-form>
        </b-card>
        <p>Need an account?<router-link to="/signup">&nbsp;Sign up here.</router-link></p>
        </div>
    </b-container>
</template>

<script>
export default {
  data: () => {
    return {
      authData: {
        email: '',
        password: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // If there is a token, redirect to home.  Should modify this later to check for token expiry.
    if (localStorage.getItem('token')) next('/home')
    next()
  },
  methods: {
    loginHandler (event) {
      const vm = this

      event.preventDefault()
      const graphQuery = {
        query: `{ 
            login(email: "${vm.authData.email}", password:"${vm.authData.password}") {
                token
                userId
            }
        }`
      }

      // Set the authloading state here

      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphQuery)
      })
        .then(res => {
          return res.json()
        })
        .then(resData => {
          if (resData.errors && resData.errors[0].status === 422) {
            throw new Error("Validation failed.  Make sure the email isn't used yet.")
          }
          if (resData.errors) {
            console.log(resData.errors)
            throw new Error('Login failed.')
          }

          console.log(resData)

          // Set the token in localstorage (for now, have to learn how to do this better)
          localStorage.setItem('token', resData.data.login.token)
          localStorage.setItem('userId', resData.data.login.userId)

          // Redirect to home
          this.$router.push('Home')
        })
        .catch(err => {
          console.log(err)
        })
    },
    setDemoUser (email, password) {
      const vm = this
      vm.authData.email = email
      vm.authData.password = password
    }
  }
}
</script>

<style scoped>

</style>
