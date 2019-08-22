<template>
    <div :class="['input-wrapper', {'full-width': full}]">
        <p v-if="required && requiredLabel" class="required-label">Required</p>
        <slot></slot>
    </div>
</template>

<script>
  import {inputShared} from "../../mixins/inputShared";

  export default {
    name: "ZrInputWrapper",
    mixins: [inputShared]
  }
</script>

<style scoped lang="scss">
    @import '../../../../../styles/imports';

    .input-wrapper {
        display: block;
        margin-bottom: $margin-base;
        width: $input-default-width;

        &.full-width {
            width: 100%;
        }
    }

    .required-label {
        display: block;
        font-size: $font-size-xxsmall;
        text-transform: uppercase;
        margin: 0;
        color: $color-warning;
        font-weight: $font-weight-bold;
    }
</style>