<template>
  <b-dropdown variant="link" no-caret>
      <template v-slot:button-content>
          <b-icon icon="three-dots-vertical"></b-icon>
      </template>
      <template v-if="currentUser">
        <!-- Only show these if they belong to the logged in user -->
        <b-dropdown-item href="#">Edit Post</b-dropdown-item>
        <b-dropdown-item href="#">Delete Post</b-dropdown-item>
      </template>
      <b-dropdown-item href="#">Report Post</b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  data: () => {
    return {
      // set this to true for now.
      currentUser: true
    }
  }
}
</script>
