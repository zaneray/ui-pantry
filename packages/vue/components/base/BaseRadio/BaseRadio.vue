<template>
    <div class="radio">
        <input type="radio"
               :name="name"
               :id="id"
               :value="value"
               :checked="selected"
               @change="inputChanged"
               v-bind="$attrs"
        />
        <label :for="id">{{label}}</label>
    </div>
</template>

<script>
  import {inputShared} from "../../../mixins/inputShared";

  export default {
    name: "BaseRadio",
    inheritAttrs: false,
    mixins: [inputShared],
    props: {
      value: {
        type: [String, Number],
        required: true
      },
      label: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      name: String,
      selected: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      inputChanged() {
        this.$emit('change', this.value);
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '../../../../../styles/imports';

    $radio-outer-width: 1.5em;
    $radio-inner-width: 1em;

    input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        margin: 0;
        padding: 0;

        &:checked + label {
            &:after {
                opacity: 1;
                transform: scale(1);
            }
        }
    }

    label {
        position: relative;
        display: block;
        font-family: sans-serif;
        font-size: 16px;
        line-height: 1.5em;
        padding-left: $radio-outer-width * 1.5;
        vertical-align: middle;
        cursor: pointer;

        &:before,
        &:after {
            content: '';
            position: absolute;
            display: block;
            border-radius: 50%;
        }

        &:before {
            top: 50%;
            left: 0;
            width: $radio-outer-width;
            height: $radio-outer-width;
            border: 1px solid $color-darker;
            transform: translateY(-50%);
        }

        &:after {
            opacity: 0;
            left: calc((#{$radio-outer-width} - #{$radio-inner-width} + 2px) / 2);
            top: calc((#{$radio-outer-width} - #{$radio-inner-width}) / 2);
            width: $radio-inner-width;
            height: $radio-inner-width;
            background-color: $color-dark;
            transform: scale(0);
            transition: all 0.25s ease-out;
        }
    }
</style>

<docs>
    ### Examples

    #### Default Radio
    ```jsx
    <base-radio label="Radio Label" value="1" id="radio1"></base-radio>
    ```

    #### Selected Radio
    ```jsx
    <base-radio label="Label Here" value="2" id="radio2" selected></base-radio>
    ```
</docs>

