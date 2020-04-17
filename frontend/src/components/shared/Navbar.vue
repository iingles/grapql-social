<template>
    <b-navbar fixed="top" fluid class="main-nav container-tw">
        <b-container class="d-flex justify-content-center">
            <b-row class="d-flex">
                <b-col cols="10" sm="10" md="10" lg="12">
                    <b-form >
                        <b-input-group size="sm" class="mb-2">
                            <b-input-group-prepend is-text>
                                <b-icon icon="search"></b-icon>
                            </b-input-group-prepend>
                            <b-form-input type="search" placeholder="Search"></b-form-input>
                        </b-input-group>
                    </b-form>
                </b-col>
                <b-col cols="2" sm="2" md="2">
                </b-col>
            </b-row>
        </b-container>
    </b-navbar>
</template>

<style lang="less" scoped>
    .main-nav {
        background: #fff;
    }
</style>
