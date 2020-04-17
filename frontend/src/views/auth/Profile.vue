<template>
  <b-col cols="12" sm="12" md="11" lg="6" class="main-content mr-0 ml-0">
    <b-container fluid>
      <b-row>
        <b-container fluid class="profile-banner">
          <b-row>
            <b-col id="profile-picture" cols="5" sm="5" md="4" lg="4">
              <b-img-lazy fluid-grow :src="`${user.photoLg}`" rounded="circle" alt="photo of person"></b-img-lazy>
            </b-col>
          </b-row>
        </b-container>
      </b-row>
      <b-row class="d-flex" align-h="between">

        <b-col cols="12" sm="12" md="7" lg="9">
          <b-row class="d-flex flex-column mt-5 pt-3 pt-sm-5">
            <b-col>
              <h3>{{ user.firstName }} {{ user.lastName }}</h3>
            </b-col>
            <b-col>
              {{ user.status }}
            </b-col>
            <b-col>
              <strong>{{ followers.length }}</strong>&nbsp;followers
              <strong>{{ following.length }}</strong>&nbsp;following
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="12" sm="12" md="5" lg="3" justify-self="end">
          <template v-if="loggedInUser === this.$route.params.id">
              <b-button v-b-modal.editProfileModal pill variant="outline-primary" href="">Edit Profile</b-button>
            <b-modal id="editProfileModal" title="Edit Profile">
              <p class="my-4">Hello from modal!</p>
            </b-modal>
          </template>
          <template v-else>
                <FollowToggle
                  :isFollowing="followers.find(el => el._id === loggedInUser) ? true : false"
                />
          </template>
        </b-col>

      </b-row>
    </b-container>
  </b-col>
</template>

<script>
import FollowToggle from '../../components/profile/profile-actions/FollowToggle'

export default {
  components: {
    FollowToggle
  },
  data: () => {
    return {
      user: {},
      token: localStorage.getItem('token'),
      followers: [],
      following: [],
      loggedInUser: localStorage.getItem('userId')
    }
  },
  created () {
    this.getUserInfo()
  },
  watch: {
    // Watch for route change and refresh the info each time
    $route: 'getUserInfo'
  },
  methods: {
    getUserInfo () {
      let userData
      const vm = this

      const graphQLQuery = {
        query: `{
      getUser(_id:"${this.$route.params.id}") {
        _id
        firstName
        lastName
        bio
        status
        followers {
          _id
        }
        following {
          _id
        }
        photoLg
        photoSm
        posts {
          _id
        }
      }
    }`
      }

      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphQLQuery)
      })
        .then(res => {
          return res.json()
        })
        .then(resData => {
          if (resData.errors) {
            throw new Error('Failed to fetch user')
          }
          // loggedInUser = localStorage.getItem('userId')

          userData = resData.data.getUser

          vm.followers = resData.data.getUser.followers
          vm.following = resData.data.getUser.following
          vm.user = userData
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>

<style lang="less" scoped>
  .main-content {
    margin: 0;
    padding: 0;
  }

  #profile-picture {
    position: relative;
    top: 5rem;
  }

  .profile-banner {
    background: #f1f1f1;
    width: 100%;
    height: 10rem;
  }

</style>
