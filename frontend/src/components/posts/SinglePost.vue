<template>
    <b-card :title="`${post.creator.firstName} ${post.creator.lastName}`" :sub-title="post.createdAt">
        <b-avatar href="#" class="align-top"></b-avatar>
        <b-card-body>
            {{post.content}}
        </b-card-body>
        <b-card-footer class="d-flex justify-content-around">
            <b-btn variant="outline-primary"><b-icon icon="chat-dots"></b-icon></b-btn>
            <b-btn variant="outline-primary"><b-icon icon="heart"></b-icon></b-btn>
            <b-btn variant="outline-primary"><b-icon icon="arrow-repeat"></b-icon></b-btn>
            <b-btn variant="outline-primary"><b-icon icon="link45deg"></b-icon></b-btn>
        </b-card-footer>
    </b-card>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style scoped>
    .post {
        padding: 1rem;
    }
</style>
