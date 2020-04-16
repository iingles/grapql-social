<template>
    <div>
        <b-container class="mt-5">
            <b-row class="d-flex flex-direction-column">
                <b-col cols="12" sm="1" md="1" lg="2">
                    <MainMenu />
                </b-col>
                <b-col cols="12" sm="12" md="11" lg="6" class="main-content">
                    <NewPost
                    :token="token"
                    :userId="userId"
                    />
                    <Feed
                    :token="token"
                    :userId="userId"
                    />
                </b-col>
                <b-col cols="12" sm="12" md="11" lg="4">
                    <div class="side-content">
                        <p>Powered by <a href="https://newsapi.org/">NewsAPI</a></p>
                        <News />
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import News from '../../components/News'
import NewPost from '../../components/posts/NewPost'
import Feed from '../../components/Feed'
import MainMenu from '../../components/shared/MainMenu'

export default {
  props: {
    token: String,
    userId: String
  },
  components: {
    MainMenu,
    NewPost,
    Feed,
    News
  }
}
</script>

<style lang="less" scoped>
    @twgray: #CCD6DD;

    .main-nav {
        background: #fff;

        .mobile-menu-button {
            color: #000;
            background: #fff;
            border: none;
            font-size: 1.6rem;

            @media screen and (min-width: 769px) {
                display: none;
            }
        }
    }

    .container-tw {
        border-bottom: 1px solid @twgray;
    }

    .container {
        max-width: 1200px;
    }

    .main-view {
        min-height: 100vh;
    }

    .main-content {
        min-height: 100vh;
        margin: 0;
        padding: 0;

        @media screen and (min-width: 992px) {
            border-left: 1px solid @twgray;
            border-right: 1px solid @twgray;
            padding: 20px;
        }
    }

    .side-content {
        border: 1px solid @twgray;
        border-radius: 10px;

        @media screen and (min-width: 800px) {
            margin: 20px 10px;
            padding: 20px;
        }
    }

</style>
