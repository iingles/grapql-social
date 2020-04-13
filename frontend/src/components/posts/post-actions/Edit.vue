<template>
    <div>
        <b-btn @click="showModal" variant="link"><b-icon icon="pencil"></b-icon>Edit</b-btn>
        <b-modal hide-footer :ref="`${postId}-modal-edit`"  centered title="Edit Post">
            <b-form>
                <b-textarea
                v-model="postData.content"
                >
                </b-textarea>
                 <b-button class="align-self-end" @click="editHandler(postData)" pill variant="primary">Post</b-button>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
export default {
  props: {
    token: String,
    postId: String,
    content: String,
    creator: String
  },
  data: () => {
    return {
      postData: {
        creatorId: '',
        content: ''
      }

    }
  },
  created () {
    this.postData.content = this.content
    this.postData.creatorId = this.creator
  },
  methods: {

    showModal () {
      const vm = this
      this.$refs[`${vm.postId}-modal-edit`].show()
    },

    hideModal () {
      const vm = this
      this.$refs[`${vm.postId}-modal-edit`].hide()
    },

    editHandler (postData) {
      const vm = this

      if (postData === vm.newContent) {
        return {
          message: 'Content did not change.'
        }
      }

      const graphqlQuery = {
        query: `
          mutation {
            updatePost(id:"${vm.postId}", postInput: {content:"${vm.postData.content}", creatorId:"${vm.postData.creatorId}"}) {
                creator {
                    _id
                }
                content
            }
            
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
            throw new Error('Updating post failed.')
          }
          vm.hideModal()
        })
        .catch(error => {
          throw error
        })
    }
  }
}
</script>
