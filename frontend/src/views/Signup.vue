<template>
    <section class="container">
        <div class="card">
            <header class="card-header">
                <h1>Join Us.</h1>
            </header>
            <form class="signup-form"  @submit.prevent="signUpHandler" @keyup.enter="signUpHandler">
                <div class="form-row">
                    <label for="firstName">First Name</label>
                    <input
                    v-model.lazy="userInput.firstName"
                    type="text"
                    name="firstName"
                    >
                </div>
                <div class="form-row">
                    <label for="lastName">Last Name</label>
                    <input v-model.lazy="userInput.lastName" type="text" name="lastName">
                </div>
                <div class="form-row">
                    <label for="email">Email</label>
                    <input v-model.lazy="userInput.email" type="text" name="email">
                </div>
                <div class="form-row">
                    <label for="password">Password</label>
                    <input v-model.lazy="userInput.password" type="password" name="password">
                </div>
                <div class="form-row">
                    <label for="redoPassword">Re-type Password</label>
                    <input v-model.lazy="userInput.rePass" type="password" name="redoPassword">
                </div>
                <button type="submit" class="btn btn-green"  @click="signUpHandler">Sign Up</button>
            </form>
        </div>
        <p>Already have an account?<router-link to="/login">&nbsp;Log in here.</router-link></p>
    </section>
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
    .container {
        height: 100vh;
        background: #f3f3f3;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .card {
        margin-bottom: 2.5rem;
        padding: 3rem 5rem;
        box-shadow: .5rem .5rem .9rem #000;
        background: #fff;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: center;
    }

    .recovery-link {
        margin: 1rem 0 2.5rem 0;
    }

    .card-header h1 {
        margin-bottom: 3rem;
        font-size: 34px;
        font-weight: bold;
        text-align: center;
    }

    .form-row {
        display: flex;
        flex-direction: column;
        margin: 1rem 0;
    }

    .form-row label {
        font-size: 1.3rem;
    }

    .form-row input {
        margin: 1rem 0;
        padding: 1rem;
        border: 1px solid #ccc;
    }
</style>
