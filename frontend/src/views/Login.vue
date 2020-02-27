<template>
    <section class="container">
        <div class="card">
            <header class="card-header">
                <h1>Login</h1>
            </header>
            <form class="login-form" method="POST">
                <div class="form-row">
                    <label for="email">Email</label>
                    <input type="text" name="email">
                </div>
                <div class="form-row">
                    <label for="password">Password</label>
                    <input type="password" name="password">
                </div>
                <router-link class="recovery-link" to="/account-recovery">Forgot Password?</router-link>
                <button type="submit" class="btn btn-green">login</button>
            </form>
        </div>
        <p>Need an account?<router-link to="/signup">&nbsp;Sign up here.</router-link></p>
    </section>
</template>

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
