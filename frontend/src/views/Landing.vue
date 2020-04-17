<template>
    <div>
        <b-container fluid class="dark-grad p-5">
            <b-container class="d-flex justify-content-center">
                <div>
                    <header class="section-header">
                       <h1>Twitter Clone</h1>
                    </header>
                    <b-button pill variant="primary" href="/signup">sign up</b-button>
                </div>
            </b-container>
        </b-container>
        <b-container fluid class="p-5">
            <b-container class="d-flex justify-content-center">
                <div>
                    <header class="section-header">
                        <h1>Have an account?</h1>
                    </header>
                    <b-button pill variant="outline-primary" href="/login">log in</b-button>
                </div>
            </b-container>
        </b-container>
    </div>
</template>

<style lang="less" scoped>

    .dark-grad {
        background: rgb(62,80,91);
        background: radial-gradient(circle, rgba(62,80,91,1) 0%, rgba(38,65,60,1) 35%, rgba(26,29,26,1) 100%);
        color: #fff;
    }

</style>
