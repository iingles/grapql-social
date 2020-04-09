<template>
    <b-card
    title="Write a new post"
    class="mb-1"
    >
        <b-form>
            <b-form-group
            label="What do you want to say?"
            >
                <b-form-textarea
                rows="3"
                max-rows="6"
                >
                </b-form-textarea>
            </b-form-group>
            <b-button pill variant="primary">Post</b-button>
        </b-form>
    </b-card>
</template>

<script>
export default {

}
</script>

<style scoped>
    .post {
        padding: 1rem;
    }
</style>
