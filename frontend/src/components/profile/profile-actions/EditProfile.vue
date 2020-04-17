<template>
    <div>
        <b-button v-b-modal.editProfileModal pill variant="outline-primary" href="">Edit Profile</b-button>
        <!-- Edit profile modal window -->
        <b-modal id="editProfileModal" title="Edit Profile">
            <b-form>
                <b-form-group
                id="profile-group-1"
                label="First Name"
                label-for="firstname"
                >
                    <input
                        v-model.lazy="userInput.firstName"
                        type="text"
                        name="firstName"
                    >
                </b-form-group>
                <b-form-group
                id="profile-group-2"
                label="Last Name"
                label-for="lastname"
                >
                    <input
                        v-model.lazy="userInput.lastName"
                        type="text"
                        name="lastName"
                    >
                </b-form-group>
                <b-form-group
                id="profile-group-3"
                label="Bio"
                label-for="bio"
                >
                    <b-form-textarea
                        rows="3"
                        max-rows="3"
                        v-model="userInput.bio"
                    >
                    </b-form-textarea>
                </b-form-group>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
export default {
  props: {
    userData: Object
  },
  data: () => {
    return {
      userInput: {
        firstName: '',
        lastName: '',
        bio: ''
      }
    }
  }
}
</script>
