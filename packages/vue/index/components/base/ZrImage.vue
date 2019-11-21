<template>
  <div>
    <img v-if="lazy" v-lazy :data-src="imageSrc"
         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
         :alt="altText" :class="imageClass" class="lazy-image"/>
    <img v-else :src="imageSrc" :alt="altText" :class="imageClass"/>
    <noscript inline-template>
      <img :src="imageSrc" :alt="altText" :class="imageClass"/>
    </noscript>
  </div>
</template>

<script>
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
       * A string describing what is in the image.
       */
      altText: {
        type: String,
        required: true
      },
      /**
       * Whether or not the image should lazy load
       */
      lazy: {
        type: Boolean,
        default: false
      },
      /**
       * If lazy loading, whether or not to fade the image in on load
       */
      fade: {
        type: Boolean,
        default: true
      }
    },
  }
</script>

<style scoped lang="scss">
  img {
    width: 100%;
  }
</style>

<docs>
  ### Examples

  #### Simple image with default props
  ```jsx
  <ZrImage :image-src="images.thumbnail.url" :alt-text="text.sentence"/>
  ```

  #### Simple image with lazy loading
  ```jsx
  <ZrImage :lazy="true" :image-src="images.thumbnail.url" :alt-text="text.sentence"/>
  ```


</docs>
