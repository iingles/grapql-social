<template>
    <div>
        <b-btn variant="link" @click="showModal"><b-icon icon="trash"></b-icon>Delete</b-btn>

        <b-modal :ref="`${postId}-modal-delete`"  centered title="Delete Post">
            <p>Are you sure you want to delete this post?</p>
            <template slot="modal-footer">
                <b-btn @click="hideModal">Cancel</b-btn>
                <b-btn @click="deleteOnePost">Delete</b-btn>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
  props: {
    postId: String,
    token: String
  },
  methods: {
    showModal () {
      const vm = this
      this.$refs[`${vm.postId}-modal-delete`].show()
    },

    hideModal () {
      const vm = this
      this.$refs[`${vm.postId}-modal-delete`].hide()
    },

    deleteOnePost () {
      const vm = this

      const graphqlQuery = {
        query: `
            mutation {
                deleteOnePost(id: "${vm.postId}")
            }
            
        `
      }

      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${vm.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
      })
        .then(res => {
          return res.json()
        })
        .then(resData => {
          if (resData.errors) {
            throw new Error('Failed to delete post!')
          }
          vm.hideModal()
        })
        .catch(error => error)
    }
  }
}
</script>
