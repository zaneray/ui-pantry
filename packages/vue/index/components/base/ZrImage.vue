<template>
    <img :src="imageSrc" :alt="altText" />
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
    <ZrImage :image-src="images.thumbnail.url" :alt-text="text.sentence" />
    ```
</docs>
