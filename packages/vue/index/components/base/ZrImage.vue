<template>
  <div>
    <img v-if="lazy" v-lazy :data-src="imageSrc"
         :src="defaultImage" :alt="altText" :class="[imageClass, {'fade-image': fade}]" />
    <img v-else :src="imageSrc" :alt="altText" :class="imageClass"/>
    <noscript inline-template>
      <img :src="imageSrc" :alt="altText" :class="imageClass"/>
    </noscript>
  </div>
</template>

<script>

  import '../../directives/lazyLoad'

  /**
   * BaseImage is a rock solid image component that requires alt text, and handles lazy loading by default.
   */

  export default {
    name: "ZrImage",
    props: {
      /**
       * Path of image to display
       */
      imageSrc: {
        type: String,
        default: ''
      },
      /**
       * Class to be attached to image
       */
      imageClass: {
        type: String,
        required: false
      },
      /**
       * A string describing what is in the image.
       */
      altText: {
        type: String,
        required: true,
        default: ""
      },
      /**
       * Whether or not the image should lazy load
       */
      lazy: {
        type: Boolean,
        default: true
      },
      /**
       * If lazy loading, whether or not to fade the image in on load
       */
      fade: {
        type: Boolean,
        default: true
      },
      /**
       * Default image to show
       */
      defaultImage: {
        type: String,
        default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
      }
    },
  }
</script>

<style scoped lang="scss">
  img {
    width: 100%;

    &.lazy-image.fade-image {
      opacity: 0;
      transition: opacity 0.25s ease-out;

      &.img-loaded {
        opacity: 1;
      }
    }
  }
</style>

<docs>
  ### Examples

  #### Simple image with default props
  ```jsx
  <ZrImage :lazy="false" :image-src="images.thumbnail.url" :alt-text="text.string.short"/>
  ```

  #### Simple image with lazy loading
  ```jsx
  <ZrImage :lazy="true" :image-src="images.thumbnail.url" :alt-text="text.string.short"/>
  ```


</docs>
