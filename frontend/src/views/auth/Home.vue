<template>
    <b-col cols="12" sm="12" md="11" lg="6" class="main-content">
      <NewPost :token="token" :userId="userId" />
      <Feed :token="token" :userId="userId" />
    </b-col>
</template>

<script>
// import News from '../../components/News'
import NewPost from '../../components/posts/NewPost'
import Feed from '../../components/Feed'

export default {
  props: {
    token: String,
    userId: String
  },
  components: {
    NewPost,
    Feed
    // News
  }
}
</script>

<style lang="less" scoped>

</style>
