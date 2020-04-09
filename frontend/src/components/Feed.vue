<template>
    <section>
      <div v-for="post in posts" :key="post._id">
        <SinglePost
          :post="post"
        />
      </div>
        <!-- <template v-if="feedStack.length > 0">
        </template>
        <template v-else>
          <h4>You don't have anything in your feed.</h4>
        </template> -->
    </section>
</template>

<script>

import SinglePost from './posts/SinglePost'

export default {
  data: () => {
    return {
      feedStack: [],
      posts: []
    }
  },
  components: {
    SinglePost
  },
  // On creation, load in all posts in the user's feed stack
  created () {
    const vm = this
    const graphQLQuery = {
      query: `
      {
        posts {
          posts {
            _id
            content 
            creator {
              firstName
              lastName
            }
            createdAt
          }
        }
      }
      `
    }

    // For now, grab all posts in database
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        Authorization: '',
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
        vm.posts = resData.data.posts.posts.map(p => {
          return {
            ...p
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
