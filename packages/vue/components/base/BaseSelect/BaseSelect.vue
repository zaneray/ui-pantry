<template>
    <base-input-wrapper :full="full">
        <label v-if="label" :for="id">{{label}}</label>
        <div class="select-wrapper">
            <select :id="id"
                    :name="name ? name : id"
                    :value="value"
                    :class="{'input-sm': size === 'sm', 'input-lg': size === 'lg'}"
                    :required="required"
                    @change="updateValue">
                <option v-if="placeholder" value="" disabled selected>{{placeholder}}</option>
                <option v-for="option of options"
                        :value="option.value"
                        :key="option.value">
                    {{option.label}}
                </option>
            </select>
        </div>
    </base-input-wrapper>
</template>

<script>
  import BaseInputWrapper from "../BaseInputWrapper/BaseInputWrapper.vue";

  export default {
    name: "BaseSelect",
    components: {BaseInputWrapper},
    props: {
      /**
       * This value populates the id attribute AND the name attribute, if omitted
       */
      id: {
        type: [String, Number],
        required: true
      },
      /**
       * This value populates the name attribute of the input
       */
      name: {
        type: String,
      },
      /**
       * Label to display above the select
       */
      label: {
        type: String,
        default: ''
      },
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
       * { label: 'optionLabel', value: 'optionValue' }.
       */
      options: {
        type: Array,
        required: true
      },
      placeholder: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      },
      full: {
        type: Boolean,
        default: false
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
  @import '../../../../../styles/imports';
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
</style>

<docs>
    ### Basic Select
    ```jsx
    <base-select label="Basic Select" :options="selectOptions" id="basic-select"></base-select>
    ```

    ### Select with placeholder
    ```jsx
    <base-select label="Placeholder Select" :options="selectOptions" placeholder="Placeholder text" id="Placeholder-select"></base-select>
    ```

    ### Select with preselected value
    ```jsx
    <base-select label="Preselected Select" :options="selectOptions" :value="3" id="Preselected-select"></base-select>
    ```
</docs>