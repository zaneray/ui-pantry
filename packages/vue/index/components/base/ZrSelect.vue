<template>
  <base-input-wrapper v-bind="$props" class="zr-select">
    <label :class="{'visually-hidden': hideLabel}" v-if="label" :for="id">{{label}}</label>
    <div class="select-wrapper">
      <select :id="id"
              :name="name ? name : id"
              :value="value"
              :class="{'input-sm': size === 'sm', 'input-lg': size === 'lg'}"
              :required="required"
              @change="updateValue"
              :disabled="disabled">
        <option v-if="placeholder" value="" disabled selected>{{placeholder}}</option>
        <option v-for="option of options"
                :value="option.value"
                :disabled="option.disabled"
                :key="option.value">
          {{option.label}}
        </option>
      </select>
    </div>
  </base-input-wrapper>
</template>

<script>
    import BaseInputWrapper from "./ZrInputWrapper.vue";
    import {inputShared} from "../../mixins/inputShared";

    export default {
    name: "ZrSelect",
    components: {BaseInputWrapper},
    mixins: [
      inputShared
    ],
    props: {
      ...inputShared.props,
      /**
       * Preselected value
       */
      value: {
        type: [String, Number]
      },
      /**
       * Size of select to render
       */
      size: {
        type: String,
        default: 'md',
        validator: function (value) {
          return ['sm', 'md', 'lg'].indexOf(value) !== -1
        }
      },
      /**
       * Array of options to display in the select.  Each option should be an object of this shape:
       * { label: 'optionLabel', value: 'optionValue', disabled: true }.
       */
      options: {
        type: Array,
        required: true
      },
      /**
       * Placeholder text to display before first selection is made
       */
      placeholder: {
        type: String,
        default: ''
      },
      /**
       * In some cases it makes sense to not show a label. ADA still requires it to be in the code.
       * This boolean turns it on an off visually.
       */
      hideLabel: {
        type: Boolean,
        required: false
      }
    },
    methods: {
      updateValue(event) {
        this.$emit('input', event.target.value)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/imports';

  $select-icon-width: 2.5em;

  .select-wrapper {
    display: block;
    position: relative;
    width: 100%;

    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: $select-icon-width;
      display: block;
      content: "";
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGFBMVEUAAAAZJCYWISIYIyQYIiUWIiIYIyQYIiXh0rToAAAACHRSTlMA/hTRqiinvwFkb0sAAABCSURBVHjajchBDsAgDAPBOJDw/x+XVN0icQGfPGs3i+2GEqeiLCXWLENzvdzrDfP2ls/NjfKbgimYglfBq2Dm+LwHguMA235EdKYAAAAASUVORK5CYII=") center no-repeat;
      pointer-events: none;
    }

    .invalid & {
      select {
        color: $color-warning;
        border-color: $color-warning;
      }
    }
  }

  .zr-select {
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
    select {
      display: block;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      font-size: $input-font-size;
      padding: $input-padding;
      padding-right: $select-icon-width + 1em;
      border: 1px solid $input-border-color;
      background-color: $color-white;
      color: $color-darker;
      border-radius: 0;
      width: 100%;
      cursor: pointer;

      &.input-sm {
        padding: $input-padding-sm;
      }

      &.input-lg {
        padding: $input-padding-lg;
      }
    }

    label {
      display: inline-block;
      padding-bottom: 0.25em;
      cursor: pointer;
      user-select: none;

      @include font-label();
      line-height: 1em;
    }
  }
</style>

<docs>
  ### Basic Select
  ```jsx
  <ZrSelect label="Basic Select" :options="selectOptions" id="basic-select"></ZrSelect>
  ```

  ### Basic Select Disabled
  ```jsx
  <ZrSelect label="Basic Select" :options="selectOptions" id="basic-select" :disabled="true"></ZrSelect>
  ```

  ### Select with placeholder
  ```jsx
  <ZrSelect label="Placeholder Select" :options="selectOptions" placeholder="Placeholder text"
            id="Placeholder-select"></ZrSelect>
  ```

  ### Select with preselected value
  ```jsx
  <ZrSelect label="Preselected Select" :options="selectOptions" :value="3" id="Preselected-select"></ZrSelect>
  ```

  ### Select with required attribute
  ```jsx
  <ZrSelect label="Required Select" :options="selectOptions" :value="1" id="Preselected-select"
            :required="true"></ZrSelect>
  ```

  ### Invalid Select
  ```jsx
  <ZrSelect label="Required Select" :options="selectOptions" placeholder="Placeholder text" id="Preselected-select"
            :required="true" :invalid="true"></ZrSelect>
  ```

  ### Disabled Select Options
  ```jsx
  <ZrSelect label="Select An Option" :options="disabledSelectOptions" placeholder="Placeholder text" id="Preselected-select"
            :required="true"></ZrSelect>
  ```

  ### Disabled Select Options and hidden Label
  ```jsx
  <ZrSelect :hide-label="true" label="Select An Option" :options="disabledSelectOptions" placeholder="Placeholder text" id="Preselected-select"
            :required="true"></ZrSelect>
  ```
</docs>
