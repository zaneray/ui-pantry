<template>
  <div>
    <ZrRadio v-for="radio in radios"
             :key="radio.id"
             :id="radio.id"
             :label="radio.label"
             :name="name"
             :value="radio.value"
             @change="radioChanged(radio.value)">
    </ZrRadio>
  </div>
</template>

<script>
  import ZrRadio from "./ZrRadio.vue";

  export default {
    name: "ZrRadioGroup",
    inheritAttrs: false,
    components: {
      ZrRadio
    },

    props: {
      /**
       * Name attribute for the group of radio buttons. Required in order for the radios to be semantically linked.
       */
      name: {
        type: String,
        required: true
      },

      /**
       * Each object in the array creates a radio button. Label (string), ID (string), and Value (string, number) are required.
       */
      radios: {
        type: Array,
        required: true
      }
    },
    methods: {
      radioChanged(event) {
        this.$emit('change', event);
      }
    }
  }
</script>

<style scoped>

</style>

<docs>
  ### Examples

  ### Default radio group
  ```jsx
  const radioGroupData = [
    {
      label: 'Option 1',
      id: 'radio1',
      value: 'yes'
    },
    {
      label: 'Option 2',
      id: 'radio2',
      value: 'no'
    },
    {
      label: 'Option 3',
      id: 'radio3',
      value: 'maybe'
    }
  ];

  <ZrRadioGroup :radios="radioGroupData" name="radioGroup1"></ZrRadioGroup>
  ```

</docs>
