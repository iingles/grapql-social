<template>
    <section>
        <template v-if="feedStack.length > 0">
          <div v-for="post in feedStack" :key="post._id">
        <SinglePost
          :post="post"
          :token="token"
          :userId="userId"
          />
        </div>
        </template>
        <template v-else>
          <h4>You don't have anything in your feed.</h4>
        </template>
    </section>
</template>

<script>

import SinglePost from './posts/SinglePost'

export default {
  data: () => {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      feedStack: []
    }
  },
  components: {
    SinglePost
  },
  // On creation, load in all posts in the user's feed stack
  created () {
    const vm = this
    let page = 1
    const direction = 0

    if (!direction) {
      vm.posts = []
    }

    if (direction === 'next') {
      page++
      // this.setState({ postPage: page})
    }

    if (direction === 'previous') {
      page--
      // this.setState({ postPage: page})
    }

    const graphQLQuery = {
      query: `{
        posts(page: ${page}) {
          posts {
            _id
            content 
            creator {
              _id
              firstName
              lastName
              photoSm
            }
            createdAt
          }
        }
      }`
    }

    // For now, grab all posts in database
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${vm.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphQLQuery)
    })
      .then(res => {
        return res.json()
      })
      .then(resData => {
        if (resData.errors) {
          throw new Error('Fetching Posts Failed')
        }
        this.$store.dispatch('loadFeed', {
          feedStack: resData.data.posts.posts.map(p => {
            return {
              ...p
            }
          })
        })
        vm.feedStack = this.$store.getters.feed.feedStack
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
