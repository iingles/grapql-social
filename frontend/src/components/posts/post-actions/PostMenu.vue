<template>
  <b-dropdown class="post-menu-button" variant="link" no-caret>
      <template v-slot:button-content>
          <b-icon class="post-menu-button" icon="three-dots-vertical"></b-icon>
      </template>
      <template v-if="currentUser">
        <!-- Only show these if they belong to the logged in user -->
        <b-dropdown-item>
          <Edit
        :token="token"
        :creator="creatorId"
        :postId="postId"
        :content="content"
        /></b-dropdown-item>
        <b-dropdown-item href="#">
          <Delete
            :postId="postId"
            :token="token"
          />
        </b-dropdown-item>
      </template>
      <template v-else>
        <b-dropdown-item href="#"><Report/></b-dropdown-item>
      </template>
  </b-dropdown>
</template>

<script>
import Edit from './Edit'
import Delete from './Delete'
import Report from './Report'

export default {
  components: {
    Edit,
    Delete,
    Report
  },
  props: {
    token: String,
    userId: String,
    creatorId: String,
    postId: String,
    content: String
  },
  data: () => {
    return {
      // set this to true for now.
      currentUser: true
    }
  },
  created () {
    const vm = this

    if (vm.creatorId === vm.userId) {
      vm.currentUser = true
    } else {
      vm.currentUser = false
    }
  }

}
</script>

<style lang="less" scoped>
    .post-menu-button {
        color: #CCD6DD;
    }
</style>
