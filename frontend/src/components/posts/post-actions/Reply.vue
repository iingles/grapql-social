<template>
    <b-btn variant="link" @click="reply()"><b-icon icon="chat-dots"></b-icon></b-btn>
</template>

<script>
export default {
  props: {
    post: Object
  },
  methods: {
    reply () {
      // Do modal stuff here
    }
  }
}
</script>

<style scoped>
    .btn:hover {
        color: #007BFF!important;
    }
</style>
