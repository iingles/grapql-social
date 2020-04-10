<template>
    <b-card class="mb-1">
        <b-row class="d-flex post-header">
            <b-col cols="2">
                <b-avatar variant="info" :text="post.creator.firstName[0]" href="#"></b-avatar>
            </b-col>
            <b-col cols="10" class="d-flex mt-0 mb-0 pb-0">
                <h5 class="pb-0 mb-0">{{ `${post.creator.firstName} ${post.creator.lastName}` }}</h5>
                <span class="date-time pb-0 mb-0 ml-3">{{ post.createdAt }}</span>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="2" class="pr-0">
            </b-col>
            <b-col cols="10">
                <b-card-body class="pl-0 pt-0">
                    {{post.content}}
                </b-card-body>
            </b-col>
        </b-row>
        <b-card-footer class="d-flex pt-2 pb-1 justify-content-around">
            <Reply
            :post="post"
            />
            <Like
            :post="post"
            />
            <Repost
            :post="post"
            />
            <Share
            :post="post"
            />
        </b-card-footer>
    </b-card>
</template>

<script>
import Reply from './post-actions/Reply'
import Like from './post-actions/Like'
import Repost from './post-actions/Repost'
import Share from './post-actions/Share'

export default {
  components: {
    Reply,
    Like,
    Repost,
    Share
  },
  props: {
    post: Object
  }
}
</script>

<style lang="less" scoped>

    .date-time {
        color: #707070;
        font-size: .9rem;
        font-style: italic;
        line-height: 1.9;
    }

    .card-body {
        font-size: 1.3rem;

        @media screen and (min-width: 992px) {
            font-size: 1rem;
        }
    }

     .card-footer {
        background-color: #fff;

        .btn {
            font-size: 2rem;
            color: #CCD6DD;

            @media screen and (min-width: 992px) {
                font-size: 1.4rem;
            }
        }
    }
</style>
