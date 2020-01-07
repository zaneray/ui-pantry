<template>
    <div :class="['input-wrapper', {'full-width': full, 'valid': valid, 'invalid': invalid, 'required': required}]">
        <p v-if="required && requiredLabel" class="required-label">Required</p>
        <slot></slot>
        <p v-if="invalid" class="invalid-message">{{validationMessage}}</p>
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
    @import '../../styles/imports';

    .input-wrapper {
        display: block;
        position: relative;
        margin-bottom: $margin-small;
        padding-bottom: $margin-smedium;
        width: $input-default-width;

        &.full-width {
            width: 100%;
        }

        &.required {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .required-label {
                order: 2;
            }

            label {
                order: 1;
            }

            input,
            .select-wrapper {
                order: 3;
                width: 100%;
            }

            .invalid-message {
                order: 4;
            }
        }

        .invalid-message {
            position: absolute;
            bottom: 0;
            margin: 0;
            font-size: $font-size-xsmall;
            color: $color-warning;
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
