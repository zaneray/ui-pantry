<template>
  <transition name="loading-fade">
    <div v-if="active"
         :class="{'overlay': background, 'fade': fade}"
         :style="`transition: opacity ${duration}ms ${easing}`"
         class="loading-container">
      <slot>
        <span class="default-spinner"></span>
      </slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "ZrLoading",
    props: {
      /**
       * This Boolean will hide or display the loader.
       */
      active: {
        type: Boolean,
        default: false
      },
      /**
       * This Boolean will show a transparent overlay
       */
      background: {
        type: Boolean,
        default: false
      },
      /**
       * This Boolean fade in the overlay
       */
      fade: {
        type: Boolean,
        default: false
      },
      /**
       * Time, in milliseconds for transition animation
       */
      duration: {
        type: Number,
        default: 400
      },
      /**
       * Easing value of fade-in/fade-out
       */
      easing: {
        type: String,
        default: 'ease-out'
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../styles/imports';

  .loading-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .default-spinner {
    display: block;
    position: relative;
    left: calc(50% - 12px);
    top: calc(50% - 12px);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 4px solid $color-light;
    border-top: 4px solid $color-primary;
    animation: spin 1.4s linear infinite;
  }

  .fade.loading-fade-enter {
    opacity: 0;
  }

  .fade.loading-fade-leave {
    opacity: 1;
  }

  .overlay {
    background-color: rgba($color-black, 0.1);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>

<docs>
  ### Examples

  #### Default Spinner
  ```jsx
  <div style="position: relative; height: 250px; width: 650px;">
    <ZrLoading :active="true"></ZrLoading>
  </div>
  ```

  #### Overlay Spinner
  ```jsx
  <div style="position: relative; height: 250px; width: 650px;">
    <ZrLoading :active="true" :background="true"></ZrLoading>
  </div>
  ```

  #### Custom transition
  ```jsx
  <div style="position: relative; height: 250px; width: 650px;">
    <ZrLoading :active="true" :background="true" :fade="true" :duration="500" easing="cubic-bezier(0.250, 0.250, 0.785, 0.325)"></ZrLoading>
  </div>
  ```

  #### Custom Loader
  ```jsx
  <div style="position: relative; height: 250px; width: 650px;">
    <ZrLoading :active="true" :background="true">
      <span>Loading...</span>
    </ZrLoading>
  </div>
  ```
</docs>
