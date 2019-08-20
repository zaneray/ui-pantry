<template>
  <base-input-wrapper :id="id" :full="full">
    <label v-if="label" :class="{'visuallyhidden': labelHidden}" :for="id">{{label}}</label>
    <input :type="type"
           :id="id"
           :name="name ? name : id"
           :value="value"
           :aria-label="!label ? placeholder : !label"
           :placeholder="placeholder"
           :title="title"
           :required="required"
           :class="{'input-sm': size === 'sm', 'input-lg': size === 'lg'}"
           @input="updateValue"/>
  </base-input-wrapper>
</template>

<script>
  import {inputShared} from "../../mixins/inputShared";
  import BaseInputWrapper from './ZrInputWrapper.vue';

  export default {
    name: "ZrInput",
    components: {
      BaseInputWrapper
    },
    mixins: [inputShared],
    props: {
      /**
       * input type options. `text` (default), `email`, `password`, `search`, `number`
       */
      type: {
        type: String,
        default: 'text',
        validator: function (value) {
          return ['text', 'email', 'password', 'search', 'number'].indexOf(value) !== -1
        }
      },
      /**
       * predefined value of the input
       */
      value: {
        type: [String, Number],
        default: ''
      },

      labelHidden: {
        type: Boolean,
        default: false
      },
      /**
       * `sm`, `md`, or `lg`. Default is `md`. corresponds to button styles
       */
      size: {
        type: String,
        default: 'md',
        validator: function (value) {
          return ['sm', 'md', 'lg'].indexOf(value) !== -1
        }
      },
      /**
       * Text to display as a placeholder in the input
       */
      placeholder: {
        type: String,
        default: ''
      }
    },
    methods: {
      updateValue(event) {
        this.$emit('input', event.target.value);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../../../styles/imports';

  input {
    display: block;
    font-size: $font-size-base;
    padding: $input-padding;
    border: 1px solid $input-border-color;
    width: 100%;
    color: $color-darkest;
    font-family: sans-serif;
    transition: $transition-base;
    background-color: rgba($color-white, .36);

    &::placeholder {
      color: rgba($color-darkest, .5);
    }

    &:focus {
      border-color: $input-border-color-focus;
      outline: none;
      background-color: rgba($color-white, .6);
    }

    &.input-sm {
      padding: $input-padding-sm;
    }

    &.input-lg {
      padding: $input-padding-lg;
      font-size: $font-size-medium;
    }
  }

  label {
    display: inline-block;
    padding-bottom: 0.25em;
    cursor: pointer;
    user-select: none;

    @include font-label();
    line-height: 1rem;
  }
</style>


<docs>
  ### Default input with Label
  ```jsx
  <ZrInput
    label="Full Name"
    placeholder="Example: John S. Smith"
    id="full-name"
  >
  </ZrInput>
  ```


  ### Default input Number
  ```jsx
  <ZrInput
    label="Enter a Number"
    type="number"
    id="full-name"
  >
  </ZrInput>
  ```


  ### full width Input without a label
  ```jsx
  <ZrInput
    placeholder="First Name"
    id="first-name"
    full
  >
  </ZrInput>
  ```



  ### Stacked inputs with a submit
  ```jsx
  <form>
    <ZrInput
      label="First Name"
      id="first-name"
    >
    </ZrInput>
    <ZrInput
      label="Last Name"
      id="first-name"
    >
    </ZrInput>
  </form>
  ```

</docs>
