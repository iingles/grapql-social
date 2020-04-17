<template>
  <b-col cols="12" sm="12" md="11" lg="6" class="main-content">
    <b-form-group label="Inline switch style checkboxes">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        switches
      ></b-form-checkbox-group>
    </b-form-group>

    <b-form-group label="Stacked (vertical) switch style checkboxes">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        switches
        stacked
      ></b-form-checkbox-group>
    </b-form-group>
  </b-col>
</template>

<script>
export default {
  data () {
    return {
      selected: [], // Must be an array reference!
      options: [
        { text: 'Red', value: 'red' },
        { text: 'Green', value: 'green' },
        { text: 'Yellow (disabled)', value: 'yellow', disabled: true },
        { text: 'Blue', value: 'blue' }
      ]
    }
  }
}
</script>
