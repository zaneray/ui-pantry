<template>
<div class="zr-radio">
    <input type="radio"
           :name="name"
           :id="id"
           :value="value"
           :checked="selected"
           @change="inputChanged"
           v-bind="$attrs"
           :disabled="disabled"
    />
    <label :for="id">{{label}}</label>
</div>
</template>

<script>
  import {inputShared} from "../../mixins/inputShared";

  export default {
    name: "ZrRadio",
    inheritAttrs: false,
    mixins: [
      inputShared
    ],
    props: {
      ...inputShared.props,
      /**
       * Value to associate with the radio input
       */
      value: {
        type: [String, Number],
        required: true
      },
      /**
       * Whether or not the radio is selected by default
       */
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
    @import '../../styles/imports';

    $radio-outer-width: 1.5em;
    $radio-inner-width: 1em;
  .zr-radio {
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
  }
</style>

<docs>
    ### Examples

    #### Default Radio
    ```jsx
    <ZrRadio label="Radio Label" value="1" id="radio1"></ZrRadio>
    ```

    #### Default Radio Disabled
    ```jsx
    <ZrRadio label="Radio Label" value="1" id="radio1-disabled" :disabled="true"></ZrRadio>
    ```

    #### Selected Radio
    ```jsx
    <ZrRadio label="Label Here" value="2" id="radio2" selected></ZrRadio>
    ```
</docs>

