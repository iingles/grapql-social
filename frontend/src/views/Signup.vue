<template>
    <b-container class="container mt-5 d-flex justify-content-center align-content-center">
      <div>
        <b-card
        title="Login"
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
              id="input-group-1"
              label="First Name"
              label-for="firstname"
              >
                <input v-model.lazy="userInput.lastName" type="text" name="lastName">
              </b-form-group>
              <b-form-group>
                  <label for="email">Email</label>
                  <input v-model.lazy="userInput.email" type="text" name="email">
              </b-form-group>
              <b-form-group>
                  <label for="password">Password</label>
                  <input v-model.lazy="userInput.password" type="password" name="password">
              </b-form-group>
              <b-form-group>
                  <label for="redoPassword">Re-type Password</label>
                  <input v-model.lazy="userInput.rePass" type="password" name="redoPassword">
              </b-form-group>
              <b-button pill variant="outline-primary">Sign Up</b-button>
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
            throw new Error(
              'validation failed.'
            )
          }
          if (resData.errors) {
            console.log(resData.errors)
            throw new Error('User creation failed.')
          }
          console.log(resData)
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
