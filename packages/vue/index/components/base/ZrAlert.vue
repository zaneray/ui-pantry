<template>
    <div :class="`alert alert--${type}`" role="alert">
        {{message}}
    </div>
</template>

<script>
    export default {
      name: "ZrAlert",
      props: {
        /**
         * alert type options `primary` is default, `secondary`, `success`, `danger`, `warning`
         */
        type: {
          type: String,
          default: 'primary'
        },
        /**
         * text string to be displayed
         */
        message: {
          type: String,
          required: true
        }
      }
    }
</script>

<style scoped lang="scss">
    @import '../../styles/imports';

    .alert {
        position: relative;
        padding: $margin-base;
        border: 1px solid transparent;
        border-radius: .25rem;

        &--primary {
            color: $color-alert-primary-text;
            background-color: $color-alert-primary-bg;
            border-color: $color-alert-primary-border;
        }

        &--secondary {
            color: $color-alert-secondary-text;
            background-color: $color-alert-secondary-bg;
            border-color: $color-alert-secondary-border;
        }

        &--success {
            color: $color-alert-success-text;
            background-color: $color-alert-success-bg;
            border-color: $color-alert-success-border;
        }

        &--danger {
            color: $color-alert-danger-text;
            background-color: $color-alert-danger-bg;
            border-color: $color-alert-danger-border;
        }

        &--warning {
            color: $color-alert-warning-text;
            background-color: $color-alert-warning-bg;
            border-color: $color-alert-warning-border;
        }
    }
</style>

<docs>
    ### Primary Alert
    ```jsx
    <ZrAlert message="This is a primary alert"></ZrAlert>
    ```

    ### Secondary Alert
    ```jsx
    <ZrAlert message="This is a secondary alert" type="secondary"></ZrAlert>
    ```

    ### Success Alert
    ```jsx
    <ZrAlert message="This is a success alert" type="success"></ZrAlert>
    ```

    ### Danger Alert
    ```jsx
    <ZrAlert message="This is a danger alert" type="danger"></ZrAlert>
    ```

    ### Warning Alert
    ```jsx
    <ZrAlert message="This is a warning alert" type="warning"></ZrAlert>
    ```
</docs>
