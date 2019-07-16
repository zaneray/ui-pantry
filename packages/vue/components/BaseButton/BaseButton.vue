<template>
    <button>{{label}}</button>
</template>

<script>
  export default {
    name: "BaseButton",
    props: {
      label: {
        type: String,
        default: 'Base Button'
      },
    },
  }
</script>

<style scoped lang="scss">

</style>

<docs>
    ### Examples

    #### Basic Button
    ```jsx
    <BaseButton :label="'Button Label'"></BaseButton>
    ```
</docs>