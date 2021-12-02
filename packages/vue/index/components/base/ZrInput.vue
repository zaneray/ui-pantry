<template>
  <base-input-wrapper v-bind="$props" class="zr-input">
    <label v-if="label" :class="{'hidden': labelHidden}" :for="id">{{label}}</label>
    <input :type="type"
           :id="id"
           :name="name ? name : id"
           :value="value"
           :aria-label="!label ? placeholder : !label"
           :placeholder="placeholder"
           :title="title"
           :required="required"
           :class="{'input-sm': size === 'sm', 'input-lg': size === 'lg'}"
           :disabled="disabled"
           :readonly="readonly"
           :min="min"
           :max="max"
           :autocomplete="autocomplete"
           @input="updateValue"
           @blur="$emit('blur')"
           @focus="$emit('focus')"
           :autofocus="autofocus"
    />
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
      ...inputShared.props,
      /**
       * input type options. `text` (default), `email`, `password`, `search`, `number`, `tel`, `date`
       */
      type: {
        type: String,
        default: 'text',
        validator: function (value) {
          return ['text', 'email', 'password', 'search', 'number', 'tel', 'date'].indexOf(value) !== -1
        }
      },
      /**
       * predefined value of the input
       */
      value: {
        type: [String, Number, Date],
        default: ''
      },
      /**
       * Visually hide the input label
       */
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
      },
      /**
       * Minimum allowed value for date inputs
       */
      min: {
        type: [Date, String],
        default: ''
      },
      /**
       * Maximum allowed value for date inputs
       */
      max: {
        type: [Date, String],
        default: ''
      },
      /**
       * Value for autocomplete
       */
      autocomplete: {
        type: String,
        default: null
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
  @import '../../styles/imports';

  .zr-input {
    input {
      display: block;
      font-size: $font-size-base;
      padding: $input-padding;
      border: 1px solid $input-border-color;
      width: 100%;
      color: $color-darkest;
      font-family: sans-serif;
      transition: $transition-base;

      &::placeholder {
        color: rgba($color-darkest, .5);
      }

      &:focus {
        border-color: $input-border-color-focus;
        outline: none;
      }

      &.input-sm {
        padding: $input-padding-sm;
      }

      &.input-lg {
        padding: $input-padding-lg;
        font-size: $font-size-medium;
      }

      .invalid & {
        border-color: $color-warning;
      }
    }

    label {
      display: inline-block;
      padding-bottom: 0.25em;
      cursor: pointer;
      user-select: none;

      @include font-label();
      line-height: 1rem;

      &.hidden {
        display: none;
      }
    }
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

  ### Invalid Input
  #### <sub><sup>(See 'invalid' class on parent)</sup></sub>
  ```jsx
  <ZrInput
    label="Full Name"
    placeholder="Example: John S. Smith"
    id="full-name"
    :invalid="true"
    validation-message="invalid input"
  >
  </ZrInput>
  ```

  ### Multiple input's with invalid messages
  ```jsx
  <ZrInput
    label="Email"
    placeholder="Email"
    value="creative@zaneray.com"
    id="email"
    :required="true"
    :invalid="false"
    validation-message="invalid input"
  >
  </ZrInput>
  <ZrInput
    label="First Name"
    placeholder="Example: John"
    id="first-name"
    :required="true"
    :invalid="true"
    validation-message="invalid input"
  >
  </ZrInput>
  <ZrInput
    label="Last Name"
    placeholder="Smith"
    id="last-name"
    :required="true"
    :invalid="true"
    validation-message="invalid input"
  >
  </ZrInput>
  ```

  ### Valid Input
  #### <sub><sup>(See 'valid' class on parent)</sup></sub>
  ```jsx
  <ZrInput
    label="Full Name"
    placeholder="Example: John S. Smith"
    id="full-name"
    :valid="true"
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

  ### Default input Number Disabled
  ```jsx
  <ZrInput
    label="Enter a Number"
    type="number"
    id="full-name"
    :disabled="true"
  >
  </ZrInput>
  ```

  ### full width Input without a label
  ```jsx
  <ZrInput
    placeholder="First Name"
    id="first-name"
    label="No Label"
    :label-hidden="true"
    full
  >
  </ZrInput>
  ```

  ### readonly Input
  ```jsx
  <ZrInput
      placeholder="Readonly input"
      id="read-only"
      label="Read Only"
      readonly
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

  ### Date Input
  ```jsx
  <ZrInput
      type="date"
      id="date-picker"
      label="Pick a Date"
      min="2021-11-22"
      max="2022-12-01"
  >
  </ZrInput>
  ```

  ### Address Input - Autocomplete off
  ```jsx
  <ZrInput
      id="address1"
      label="Address Line 1"
      autocomplete="chrome-off"
  >
  </ZrInput>
  ```
</docs>
