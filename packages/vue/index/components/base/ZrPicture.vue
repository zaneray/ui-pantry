<template>
  <div>
    <picture v-if="lazy" v-lazy>
      <source v-if="desktopImg" :data-src="desktopImg" :media="breakpointQueryDesktop" :srcset="defaultImage">
      <source v-if="tabletImg" :data-src="tabletImg" :media="breakpointQueryTablet" :srcset="defaultImage">
      <img :data-src="mobileImg" :alt="altText" :src="defaultImage" :class="{'fade-image': fade}" />
    </picture>
    <picture v-else>
      <source v-if="desktopImg" :srcset="desktopImg" :media="breakpointQueryDesktop"/>
      <source v-if="tabletImg" :srcset="tabletImg" :media="breakpointQueryTablet"/>
      <img :src="mobileImg" :alt="altText"/>
    </picture>
    <noscript inline-template>
      <picture>
        <source v-if="desktopImg" :srcset="desktopImg" :media="breakpointQueryDesktop"/>
        <source v-if="tabletImg" :srcset="tabletImg" :media="breakpointQueryTablet"/>
        <img :src="mobileImg" :alt="altText"/>
      </picture>
    </noscript>
  </div>
</template>

<script>
  import '../../directives/lazyLoad'

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
       * Tablet image url to render
       */
      tabletImg: {
        type: String,
        required: false,
        default: null
      },
      /**
       * Desktop image url to render
       */
      desktopImg: {
        type: String,
        required: false,
        default: null
      },
      /**
       * Breakpoints (pixels) at which to switch between mobile, tablet and desktop image
       */
      breakpointTablet: {
        type: Number,
        default: 768
      },
      breakpointDesktop: {
        type: Number,
        default: 1024
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
        default: true
      },
      /**
       * Whether or not to fade the image in if/when lazy loaded
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
    computed: {
      breakpointQueryDesktop() {
        return `(min-width: ${this.breakpointDesktop}px)`;
      },
      breakpointQueryTablet() {
        return `(min-width: ${this.breakpointTablet}px)`;
      }
    }
  }
</script>

<style scoped lang="scss">
  img {
    display: block;
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

  #### Basic Picture
  ```jsx
  <ZrPicture :lazy="false"
             :mobile-img="images.banner_image.mobile.url"
             :tablet-img="images.banner_image.half.url"
             :desktop-img="images.banner_image.url"
             :alt-text="images.banner_image.alt"/>
  ```

  #### Basic Picture with lazy loading
  ```jsx
  <ZrPicture :lazy="true"
             :mobile-img="images.banner_image.mobile.url"
             :tablet-img="images.banner_image.half.url"
             :desktop-img="images.banner_image.url"
             :alt-text="images.banner_image.alt"/>
  ```

  #### Basic Picture with lazy loading, mobile image and tablet
  ```jsx
  <ZrPicture :lazy="true"
             :mobile-img="images.banner_image.mobile.url"
             :tablet-img="images.banner_image.half.url"
             :alt-text="images.banner_image.alt"/>
  ```


</docs>
