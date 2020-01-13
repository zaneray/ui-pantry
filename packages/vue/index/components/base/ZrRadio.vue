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

  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
    padding: 0;

    &:focus + label:before {
      outline: 1px dotted $color-default-focus-ring;
      outline: 5px auto -webkit-focus-ring-color;
    }

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
    font-size: 1em;
    line-height: 1.5em;
    margin: 0.25em;
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
    <ZrRadio label="Radio Label" name="group1" value="1" id="radio1"></ZrRadio>
    ```

  #### Selected Radio
  ```jsx
  <ZrRadio label="Label Here" name="group2" value="2" id="radio2" selected></ZrRadio>
  ```
</docs>

