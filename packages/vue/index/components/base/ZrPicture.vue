<template>
  <div>
    <picture v-if="lazy" v-lazy>
      <source :data-src="desktopImg" :media="breakpointQuery" srcset=""/>
      <img :data-src="mobileImg" :alt="altText" src=""/>
    </picture>
    <picture v-else>
      <source :srcset="desktopImg" :media="breakpointQuery"/>
      <img :src="mobileImg" :alt="altText"/>
    </picture>
    <noscript inline-template>
      <picture>
        <source :srcset="desktopImg" :media="breakpointQuery"/>
        <img :src="mobileImg" :alt="altText"/>
      </picture>
    </noscript>
  </div>
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
      },
      /**
       * Whether or not the image should lazy load
       */
      lazy: {
        type: Boolean,
        default: false
      },
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
             :alt-text="images.banner_image.alt"/>
  ```

  #### Basic Picture with lazy loading
  ```jsx
  <ZrPicture :lazy="true"
             :mobile-img="images.banner_image.mobile.url"
             :desktop-img="images.banner_image.url"
             :alt-text="images.banner_image.alt"/>
  ```


</docs>
