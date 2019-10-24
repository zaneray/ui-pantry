<template>
    <modal :name="modalName">
        <slot></slot>
    </modal>
</template>

<script>
  import Vue from 'vue';
  import Vmodal from 'vue-js-modal';

  Vue.use(Vmodal);

  export default {
    name: "ZrModal",
    props: {
      modalName: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">

</style>

<docs>
    ###Examples

    #### Basic Modal
    ```jsx
    const modalName = 'basic';
    <ZrModal :modal-name="modalName">
        <h2>Hi I am a basic modal.  No styling whatsoever</h2>
    </ZrModal>
    <div style="{display: flex;}">
        <button @click="$modal.show(modalName)">Show Modal</button>
    </div>
    ```
</docs>