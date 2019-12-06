<template>
  <progress :max="maxValue" :value="currentValue"></progress>
</template>

<script>
  /**
   * A base component to display progress to user's
   */

  export default {
    name: "ZrProgress",
    props: {
      /**
       * Maximum value of the task that is being measured
       */
      maxValue: {
        type: Number,
        required: true,
        default: 100
      },
      /**
       * Current value to display in the progress bar
       */
      currentValue: {
        type: Number,
        required: true,
        default: 0
      }
    },
  }
</script>

<style scoped lang="scss">

</style>

<docs>
  ### Examples

  #### Default Progress Bar
  ```jsx
  <zr-progress></zr-progress>
  ```

  #### Max value 500, Current value 180
  ```jsx
  <zr-progress :max-value="500" :current-value="180"></zr-progress>
  ```

  #### Max value 500, Current value 480
  ```jsx
  <zr-progress :max-value="500" :current-value="480"></zr-progress>
  ```
</docs>
