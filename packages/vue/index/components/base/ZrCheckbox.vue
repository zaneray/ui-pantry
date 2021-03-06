<template>
    <div class="checkbox" :class="{ readonly: readonly, checked: selected}">
        <input type="checkbox"
               :name="name"
               :id="id"
               :value="value"
               :checked="selected"
               @click="inputChanged($event)"
               v-bind="$attrs"
               :disabled="disabled"
               :readonly="readonly"
        />
        <label :for="id">{{label}}</label>
    </div>
</template>

<script>
  import {inputShared} from "../../mixins/inputShared";

  /**
   * A custom checkbox component.  @change event fires on checkbox change
   */

  export default {
    name: "ZrCheckbox",
    inheritAttrs: false,
    mixins: [inputShared],
    props: {
      ...inputShared.props,
      /**
       * Value to associate with the checkbox
       */
      value: {
        type: [String, Number],
        required: true
      },
      /**
       * Whether or not the checkbox is selected by default
       */
      selected: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      inputChanged($event) {
        if (!this.readonly) {
          this.$emit('change', this.value);
          this.$emit('changeEvent', $event);
        } else {
          $event.preventDefault();
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '../../styles/imports';

    $checkbox-width: 1.5em;

    input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        margin: 0;
        padding: 0;

        .readonly.checked & + label {
            &:after {
                opacity: 1;
                transform: rotate(-50deg) scale(1);
            }
        }

        &:checked + label {
            &:after {
                opacity: 1;
                transform: rotate(-50deg) scale(1);
            }

            .readonly:not(.checked) & {
                &:after {
                    opacity: 0;
                    transform: rotate(-30deg) scale(0);
                }
            }
        }
    }

    label {
        position: relative;
        display: block;
        font-family: sans-serif;
        font-size: 16px;
        line-height: 1.5em;
        padding-left: $checkbox-width * 1.5;
        vertical-align: middle;
        cursor: pointer;

        .readonly & {
          cursor: default;
        }

        &:before,
        &:after {
            content: '';
            position: absolute;
            display: block;
        }

        &:before {
            top: 50%;
            left: 0;
            width: $checkbox-width;
            height: $checkbox-width;
            border: 1px solid $color-darker;
            transform: translateY(-50%);
        }

        &:after {
            opacity: 0;
            left: 0.3em;
            top: 25%;
            width: $checkbox-width * 0.6;
            height: $checkbox-width * 0.3;
            border-left: 2px solid $color-dark;
            border-bottom: 2px solid $color-dark;
            transform: rotate(-30deg) scale(0);
            transition: all 0.25s ease-out;
        }
    }
</style>

<docs>
    ### Examples

    #### Default Checkbox
    ```jsx
    <ZrCheckbox label="Checkbox Label" value="1" id="check1"></ZrCheckbox>
    ```

    #### Default Checkbox Disabled
    ```jsx
    <ZrCheckbox label="Checkbox Label" value="1" id="check1-disabled" :disabled="true"></ZrCheckbox>
    ```

    #### Selected Checkbox
    ```jsx
    <ZrCheckbox label="Label Here" value="2" id="check2" selected></ZrCheckbox>
    ```

    #### Readonly Selected Checkbox
    ```jsx
    <ZrCheckbox label="Readonly Selected" selected value="3" id="check3" readonly></ZrCheckbox>
    ```

    #### Readonly Unselected Checkbox
    ```jsx
    <ZrCheckbox label="Readonly Unselected" value="4" id="check4" readonly></ZrCheckbox>
    ```
</docs>

