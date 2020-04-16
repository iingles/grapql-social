<template>
  <b-container class="mt-5">
    <b-row class="d-flex flex-direction-column">
      <b-col cols="12" sm="1" md="1" lg="2">
          <MainMenu />
      </b-col>
      <b-col cols="12" sm="12" md="11" lg="6" class="main-content">
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
            <b-row class="d-flex flex-column mt-5 pt-3">
              <b-col>
                <h3>{{ user.firstName }} {{ user.lastName }}</h3>
              </b-col>
              <b-col>
                {{ user.status }}
              </b-col>
              <b-col>
                <strong>{{ user.followers.length }}</strong>&nbsp;followers
                <strong>{{ user.following.length }}</strong>&nbsp;following
              </b-col>
            </b-row>
          </b-container>
      </b-col>
      <b-col cols="12" sm="12" md="11" lg="4">
          <div class="side-content">
            {{ user }}
          </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MainMenu from '../../components/shared/MainMenu'

export default {
  components: {
    MainMenu
  },
  data: () => {
    return {
      user: {},
      token: localStorage.getItem('token')
    }
  },
  created () {
    // Fetch the user from the URL on page creation

    const vm = this

    const graphQLQuery = {
      query: `{
        getUser(_id:"${this.$route.params.id}") {
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
          throw new Error('Faaailed to fetch user')
        }
        vm.user = resData.data.getUser
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
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
