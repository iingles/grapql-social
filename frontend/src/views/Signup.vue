<template>
    <section class="container">
        <div class="card">
            <header class="card-header">
                <h1>Join Us.</h1>
            </header>
            <form class="signup-form" method="POST">
                <div class="form-row">
                    <label for="firstName">First Name</label>
                    <input type="text" name="firstName">
                </div>
                <div class="form-row">
                    <label for="lastName">Last Name</label>
                    <input type="text" name="lastName">
                </div>
                <div class="form-row">
                    <label for="email">Email</label>
                    <input type="text" name="email">
                </div>
                <div class="form-row">
                    <label for="password">Password</label>
                    <input type="password" name="password">
                </div>
                <div class="form-row">
                    <label for="redoPassword">Re-type Password</label>
                    <input type="password" name="redoPassword">
                </div>
                <button type="submit" class="btn btn-green">Sign Up</button>
            </form>
        </div>
        <p>Already have an account?<router-link to="/login">&nbsp;Log in here.</router-link></p>
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
