<template>
    <div>
        <template v-if="!isFollowing">
            <b-button @click="changeFollow(()=>this.$route.params.id, 'add')" pill variant="outline-primary">Follow</b-button>
        </template>
        <template v-else>
            <b-button @click="changeFollow(()=>this.$route.params.id, 'remove')" pill variant="outline-primary">Unfollow</b-button>
        </template>
    </div>
</template>

<script>
export default {
  props: {
    isFollowing: Boolean
  },
  methods: {
    changeFollow (id, act) {
      const graphQLQuery = {
        query: `
          mutation {
            updateFollows(id: "${localStorage.getItem('userId')}", followInput: { _id:"${this.$route.params.id}", action: "${act}"} ) {
              following {
                _id
            }
          }
        }`
      }

      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(graphQLQuery),
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
            throw new Error('Failed to update followers')
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
