<template>
    <modal :name="modalName" class="zr-modal">
        <slot></slot>
    </modal>
</template>

<script>
  import Vue from 'vue';
  import Vmodal from 'vue-js-modal';

  Vue.use(Vmodal);

  /**
   * A base modal component that leverages the vue-js-modal documented here: https://www.npmjs.com/package/vue-js-modal
   */

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
    @import '../../styles/imports';

    .zr-modal {
        &.v--modal-overlay {
            background: rgba($color-darker, 0.6);
        }
    }
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