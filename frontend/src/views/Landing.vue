<template>
    <main>
        <section class="jumbotron dark-grad">
            <div class="container">
                <header class="section-header hero">
                    <h1>Explore.</h1>
                    <h1>Learn.</h1>
                    <h1>Connect.</h1>
                </header>
                <router-link to="/signup" class="btn btn-green">sign up</router-link>
            </div>
        </section>
        <section class="jumbotron">
            <div class="container">
                <header class="section-header">
                    <h1>Have an account?</h1>
                </header>
                <router-link to="/login" class="btn btn-blue">log in</router-link>
            </div>
        </section>
    </main>
</template>

<style scoped>
    .jumbotron {
        padding: 3rem 0;
    }

    .jumbotron.dark-grad {
        background: rgb(62,80,91);
        background: radial-gradient(circle, rgba(62,80,91,1) 0%, rgba(38,65,60,1) 35%, rgba(26,29,26,1) 100%);
        color: #fff;
    }

    .section-header {
        margin-bottom: 2rem;
    }

    .hero h1 {
        font-size: 5.4rem;
    }

    .container {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

</style>
