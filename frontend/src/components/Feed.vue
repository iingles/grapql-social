<template>
    <section>
      <SinglePost />
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
      feedStack: []
    }
  },
  components: {
    SinglePost
  },
  created: {
    getAllPosts () {
    }
  }
}
</script>
