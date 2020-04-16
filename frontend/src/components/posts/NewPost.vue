<template>
    <b-card
    title="Write a new post"
    class="mb-1"
    >
        <b-form class="d-flex flex-column">
            <b-form-group
            label="What do you want to say?"
            >
                <b-form-textarea
                rows="3"
                max-rows="6"
                v-model="newPostData.content"
                >
                </b-form-textarea>
            </b-form-group>
            <b-button class="align-self-end" @click="createPost(newPostData)" pill variant="primary">Post</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {
  data: () => {
    return {
      newPostData: {
        creator: localStorage.getItem('userId'),
        content: ''
      },
      local: localStorage.getItem('userId')
    }
  },
  methods: {
    createPost (postData) {
      const vm = this
      // vm.newPostData.creator = vm.userId

      if (postData.content === '') {
        return {
          message: 'Message cannot be empty.'
        }
      }
      const formData = new FormData()
      formData.append('creator', vm.newPostData.creator)
      formData.append('content', vm.newPostData.content)
      formData.append('image', vm.newPostData.image)

      const graphqlQuery = {
        query: `
          mutation {
              createPost(postInput: {creatorId:"${vm.newPostData.creator}", content: "${vm.newPostData.content}"}) {
                  content
              }
          }

        `
      }

      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(graphqlQuery),
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          return res.json()
        })
        .then(resData => {
          if (resData.errors) {
            throw new Error('Creating a post failed.')
          } else {
            vm.newPostData.content = ''
          }
        })
    }
  }
}
</script>

<style scoped>
    .post {
        padding: 1rem;
    }
</style>
