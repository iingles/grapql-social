<template>
    <div>
        <b-navbar fixed="top" fluid class="main-nav container-tw">
            <b-container class="d-flex justify-content-center">
                <b-row>
                    <b-col col sm="12" md="12" lg="12">
                        <b-form>
                            <b-input-group size="sm" class="mb-2">
                                <b-input-group-prepend is-text>
                                    <b-icon icon="search"></b-icon>
                                </b-input-group-prepend>
                                <b-form-input type="search" placeholder="Search"></b-form-input>
                            </b-input-group>
                        </b-form>
                    </b-col>
                </b-row>
            </b-container>
        </b-navbar>
        <b-container fluid class="container-tw pt-5 main-view">
            <b-container>
                <b-row>
                   <b-col cols="12" sm="1" md="1" lg="1">
                       <div class="menu">
                           <MainMenu />
                        </div>
                   </b-col>
                   <b-col col sm="12" md="11" lg="7" class="main-content">
                       <b-card
                       title="Write a new post"
                       class="mb-1"
                       >
                        <b-form>
                            <b-form-group
                            label="What do you want to say?"
                            >
                                <b-form-textarea
                                rows="3"
                                max-rows="6"
                                >
                                </b-form-textarea>
                            </b-form-group>
                            <b-button pill variant="primary">Post</b-button>
                        </b-form>
                       </b-card>
                       <Feed />
                   </b-col>
                   <b-col col sm="12" md="12" lg="3">
                       <div class="side-content">
                           <h4>Side Content</h4>
                       </div>
                   </b-col>
                </b-row>
            </b-container>
        </b-container>
    </div>
</template>

<script>
// import News from '../../components/News'
import Feed from '../../components/Feed'
import MainMenu from '../../components/shared/MainMenu'
// import Recent from '../../components/Recent'

export default {
  components: {
    // News,
    Feed,
    MainMenu
    // Recent
  }
}
</script>

<style lang="less" scoped>
    @twgray: #CCD6DD;
    .menu {
        position: fixed;
        @media screen and (max-width: 800px) {

            display: none;
        }
    }

    .main-nav {
        background: #fff;
    }

    .container-tw {
        border-bottom: 1px solid @twgray;
    }

    .container {
        max-width: 960px;
    }

    .main-view {
        min-height: 100vh;
    }

    .main-content {
        min-height: 100vh;
        border-left: 1px solid @twgray;
        border-right: 1px solid @twgray;
        padding: 20px;
    }

    .side-content {
        border: 1px solid @twgray;
        border-radius: 10px;
        margin: 20px 10px;
        padding: 20px;
    }

</style>
