<template>
    <b-container class="container mt-5 d-flex justify-content-center align-content-center">
      <div>
        <b-card
        title="Login"
        >
          <b-form method="POST">
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
              <b-button pill variant="outline-primary">log in</b-button>
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

      fetch('http://localhost:3000/graphql', {
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
          localStorage.setItem('token', resData.data.login.token)
          localStorage.setItem('userId', resData.data.login.userId)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
