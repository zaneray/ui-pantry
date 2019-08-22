<template>
    <picture>
        <source :srcset="desktopImg" :media="breakpointQuery">
        <img :src="mobileImg" :alt="altText" />
    </picture>
</template>

<script>
  /**
   * Picture component for displaying multiple versions of an image responsively
   */

  export default {
    name: "ZrPicture",
    props: {
      /**
       * Mobile image url to render
       */
      mobileImg: {
        type: String,
        required: true
      },
      /**
       * Desktop image url to render
       */
      desktopImg: {
        type: String,
        required: true
      },
      /**
       * Breakpoint (pixels) at which to switch between mobile and desktop image
       */
      breakpoint: {
        type: Number,
        default: 768
      },
      /**
       * Alternative text to display for the image
       */
      altText: {
        type: String,
        required: true
      }
    },
    computed: {
      breakpointQuery() {
        return `(min-width: ${this.breakpoint}px)`;
      }
    }
  }
</script>

<style scoped lang="scss">
    picture {
        width: 100%;
        display: block;
    }

    img {
        display: block;
        width: 100%;
    }
</style>

<docs>
    ### Examples

    #### Basic Picture
    ```jsx
    <ZrPicture :mobile-img="images.banner_image.mobile.url"
               :desktop-img="images.banner_image.url"
               :alt-text="images.banner_image.alt" />
    ```
</docs>
