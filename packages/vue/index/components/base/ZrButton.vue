<template>
    <button :class="btnClass"
            :type="type"
            :title="title"
            :disabled="disabled">
        <span class="label">
            <slot></slot>
        </span>
        <span class="loading-container">
            <span class="loading-indicator"></span>
        </span>
    </button>
</template>

<script>
  /**
   * BaseButton is a robust button component built to handle all use cases of a basic button
   */

  export default {
    name: "ZrButton",
    props: {
      /**
       * Theme of button to display.  This adds a class of ".btn-{{theme}}", which can be used to scope styles
       */
      theme: {
        type: String,
        default: 'default'
      },
      /**
       * Size of button to be displayed
       */
      size: {
        type: String,
        default: 'md'
      },
      /**
       * Type of button to render (button, reset, submit)
       */
      type: {
        type: String,
        default: 'button',
        validator: function (value) {
          return ['button', 'reset', 'submit'].indexOf(value) !== -1
        }
      },
      /**
       * Whether or not the button is disabled
       */
      disabled: {
        type: Boolean,
        default: false
      },
      /**
       * Text to use in the HTML title attribute on the button
       */
      title: {
        type: String,
        default: ''
      },
      /**
       * Gives button a width of 100% of its parent container
       */
      full: {
        type: Boolean,
        default: false
      },
      /**
       * Displays button inline
       */
      inline: {
        type: Boolean,
        default: false
      },
      /**
       * Toggles the button loading state
       */
      loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      btnClass() {
        return [
          'btn', `btn-${this.size}`, `btn-${this.theme}`,
          {
            'disabled': this.disabled,
            'active': this.active,
            'full-width': this.full,
            'inline': this.inline,
            'loading': this.loading
          }
        ];
      }
    },
  }
</script>

<style scoped lang="scss">
    @import '../../styles/imports';

    .btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: $button-padding;
        font-size: 1rem;
        color: $color-lightest;
        cursor: pointer;
        user-select: none;
        background-color: $color-darker;
        border: 2px solid transparent;
        transition: all 0.25s ease-out;

        &:hover, &.active {
            background-color: $color-darkest;
        }

    }

    .btn-default {
        background-color: $color-primary;

        &:hover, &.active {
            background-color: $color-primary-dark;
        }
    }

    .btn-action {
        background-color: $color-action;

        &:hover, &.active {
            background-color: $color-action-dark;
        }
    }

    .btn-info {
        background-color: $color-info;

        &:hover, &.active {
            background-color: darken($color-info, 10%);
        }
    }

    .btn-negative {
        background-color: $color-white;
        color: $color-darkest;

        &:hover, &.active {
            background-color: darken($color-white, 10%);
        }
    }

    .btn-transparent {
        background-color: transparent;
        border-color: $color-darker;
        color: $color-darker;

        &:hover, &.active {
            background-color: rgba(0, 0, 0, .05);
        }
    }

    .btn-sm {
        padding: $button-padding-sm;
    }

    .btn-lg {
        padding: $button-padding-lg;
        font-size: $font-size-medium;
    }

    .btn-responsive {
        min-width: 0;
        padding: $button-padding-sm;
        @media(min-width: $screen-sm) {
            min-width: $input-default-width;
            padding: $button-padding;
        }
    }

    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .full-width {
        width: 100%;
    }

    .inline {
        display: inline-block;
        width: auto;
    }

    .loading {
        height: $font-size-base;
        width: $font-size-base;
        border-radius: 50%;
        border: 3px solid $color-white;
        border-left-color: transparent;
        border-top-color: transparent;
        display: inline-block;
        animation: SPIN 1s infinite cubic-bezier(.48,.17,.49,.78);
    }
</style>

<docs>
    ### Examples

    #### Button Themes
    ```jsx
    <ZrButton :label="'Default'" style="margin-bottom: 10px"></ZrButton>
    <ZrButton :label="'Action'" theme="action" style="margin-bottom: 10px"></ZrButton>
    <ZrButton :label="'Info'" theme="info" style="margin-bottom: 10px"></ZrButton>
    <ZrButton :label="'Transparent'" theme="transparent" style="margin-bottom: 10px"></ZrButton>
    <ZrButton :label="'Negative'" theme="negative" style="margin-bottom: 10px"></ZrButton>
    ```

    #### Button Sizes
    ```jsx
    <ZrButton label="Small" size="sm" style="margin-bottom: 10px"></ZrButton>
    <ZrButton label="Default" style="margin-bottom: 10px"></ZrButton>
    <ZrButton label="Large" size="lg" style="margin-bottom: 10px"></ZrButton>
    ```

    #### Button States
    ```jsx
    <ZrButton label="Disabled" disabled style="margin-bottom: 10px"></ZrButton>
    <ZrButton label="Loading" loading style="margin-bottom: 10px"></ZrButton>
    ```
    #### Button Display Options
    ```jsx
    <ZrButton label="Full Width" full style="margin-bottom: 10px"></ZrButton>
    <ZrButton label="Button Inline 1" inline></ZrButton>
    <ZrButton label="Button Inline 2" inline></ZrButton>
    ```

</docs>
