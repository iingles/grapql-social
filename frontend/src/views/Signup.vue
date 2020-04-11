<template>
    <b-container class="d-flex justify-content-center">
      <div>
        <b-card
        title="Sign Up"
        >
          <b-form @submit.prevent="signUpHandler" @keyup.enter="signUpHandler">
              <b-form-group
              id="input-group-1"
              label="First Name"
              label-for="firstname"
              >
                <input
                  v-model.lazy="userInput.firstName"
                  type="text"
                  name="firstName"
                  >
              </b-form-group>
              <b-form-group
              id="input-group-2"
              label="Last Name"
              label-for="lastName"
              >
                <input v-model.lazy="userInput.lastName" type="text" name="lastName">
              </b-form-group>
              <b-form-group
              id="input-group-3"
              label="Email"
              label-for="email"
              >
                <input v-model.lazy="userInput.email" type="text" name="email">
              </b-form-group>
              <b-form-group
              id="input-group-4"
              label="Choose a Password"
              label-for="password"
              >
                <input v-model.lazy="userInput.password" type="password" name="password">
              </b-form-group>
              <b-form-group
              id="input-group-5"
              label="Verify Password"
              label-for="redopassword"
              >
                <input v-model.lazy="userInput.rePass" type="password" name="redoPassword">
              </b-form-group>
              <b-button pill type="submit" variant="outline-primary">Sign Up</b-button>
            </b-form>
          </b-card>
          <p>Already have an account?<router-link to="/login">&nbsp;Log in here.</router-link></p>
        </div>
    </b-container>
</template>

<script>
export default {
  data: () => {
    return {
      userInput: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePass: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // If there is a token, redirect to home.  Should modify this later to check for token expiry.
    if (localStorage.getItem('token')) next('/home')
    next()
  },
  methods: {
    signUpHandler (event) {
      const vm = this
      event.preventDefault()

      const graphQuery = {
        query: `
            mutation {
                createUser(userInput: {
                    firstName: "${vm.userInput.firstName}",
                    lastName: "${vm.userInput.lastName}",
                    email: "${vm.userInput.email}",
                    password: "${vm.userInput.password}"
                }) {
                    _id
                    email
                }
            }
        `
      }
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
            throw new Error(
              "validation failed.  Make sure that email address isn't used yet!"
            )
          }
          if (resData.errors) {
            console.log(resData.errors)
            throw new Error('User creation failed.')
          }

          // If everything was successful, redirect the user to Login
          vm.$router.push('Login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
