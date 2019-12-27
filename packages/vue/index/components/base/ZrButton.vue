<template>
    <component
            :is="componentType"
            :class="btnClass"
            :type="type"
            :href="href"
            :to="to"
            :target="finalTarget"
            :title="title"
            :disabled="disabled">
        <span class="label">
            <slot></slot>
        </span>
        <span class="loading-container">
            <span class="loading-indicator"></span>
        </span>
    </component>
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
        default: null,
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
        default: null
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
      },
      /**
       * Link to follow on click. Renders an <a> instead of <button>
       */
      href: {
        type: String,
        default: null
      },
      /**
       * Path to follow on click.  Renders <router-link> or <nuxt-link> (if nuxt prop is true) instead of <button>
       */
      to: {
        type: String,
        default: null
      },
      /**
       * Whether to render <nuxt-link> instead of <router-link> when using the 'to' prop
       */
      nuxt: {
        type: Boolean,
        default: false
      },
      /**
       * Target for traditional link
       */
      target: {
        type: String,
        default: '_self',
        validator: function (value) {
          return ['_self', '_blank', '_parent', '_top'].includes(value)
        }
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
      },
      componentType() {
        if (this.to) {
          return this.nuxt ? 'nuxt-link' : 'router-link'
        } else if (this.href) {
          return 'a'
        } else {
          return 'button'
        }
      },
      finalTarget() {
        return this.href ? this.target : null
      }
    },
  }
</script>

<style scoped lang="scss">
    @import '../../styles/imports';

    .btn {
        appearance: none;
        -webkit-appearance: none;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        text-align: center;
        text-decoration: none;
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
        display: inline-flex;
        width: auto;
    }

    .loading {
        pointer-events: none;

        .label {
            opacity: 0;
        }

        .loading-container {
            opacity: 1;
        }
    }

    .label {
        opacity: 1;
        transition: opacity $transition-base;
    }

    .loading-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        opacity: 0;
        transition: opacity $transition-base;
    }

    .loading-indicator {
        height: 1em;
        width: 1em;
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
    <ZrButton style="margin-bottom: 10px">Default</ZrButton>
    <ZrButton theme="action" style="margin-bottom: 10px">Action</ZrButton>
    <ZrButton theme="info" style="margin-bottom: 10px">Info</ZrButton>
    <ZrButton theme="transparent" style="margin-bottom: 10px">Transparent</ZrButton>
    <ZrButton theme="negative" style="margin-bottom: 10px">Negative</ZrButton>
    ```

    #### Button Sizes
    ```jsx
    <ZrButton size="sm" style="margin-bottom: 10px">Small</ZrButton>
    <ZrButton style="margin-bottom: 10px">Default</ZrButton>
    <ZrButton size="lg" style="margin-bottom: 10px">Large</ZrButton>
    ```

    #### Button States
    ```jsx
    <ZrButton disabled style="margin-bottom: 10px">Disabled</ZrButton>
    <ZrButton loading style="margin-bottom: 10px">Loading</ZrButton>
    ```
    #### Button Display Options
    ```jsx
    <ZrButton full style="margin-bottom: 10px">Full Width</ZrButton>
    <ZrButton inline>Inline 1</ZrButton>
    <ZrButton inline>Inline 2</ZrButton>
    ```

    #### Button Link Types
    ```jsx
    <ZrButton style="margin-bottom: 10px">Button</ZrButton>
    <ZrButton href="www.google.com" style="margin-bottom: 10px">Standard Link</ZrButton>
    <ZrButton to="/product/path" style="margin-bottom: 10px">Router Link</ZrButton>
    <ZrButton to="/product/path" nuxt>Nuxt Link</ZrButton>
    ```
</docs>
