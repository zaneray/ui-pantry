<template>
  <div>
    <template v-if="lazy">
      <picture v-lazy-load="{rootMargin: rootMargin}">
        <source v-if="desktopImg" :data-src="desktopImg" :media="breakpointQueryDesktop" :srcset="defaultImage">
        <source v-if="tabletImg" :data-src="tabletImg" :media="breakpointQueryTablet" :srcset="defaultImage">
        <img :data-src="mobileImg" :alt="altText" :src="defaultImage" :class="{'fade-image': fade}" :style="fadeStyle" />
      </picture>
      <noscript inline-template>
        <picture>
          <source v-if="desktopImg" :srcset="desktopImg" :media="breakpointQueryDesktop"/>
          <source v-if="tabletImg" :srcset="tabletImg" :media="breakpointQueryTablet"/>
          <img :src="mobileImg" :alt="altText" />
        </picture>
      </noscript>
    </template>
    <picture v-else>
      <source v-if="desktopImg" :srcset="desktopImg" :media="breakpointQueryDesktop" />
      <source v-if="tabletImg" :srcset="tabletImg" :media="breakpointQueryTablet" />
      <img :src="mobileImg" :alt="altText" />
    </picture>
  </div>
</template>

<script>
  import lazyLoad from '../../directives/lazyLoad';
  import {imageShared} from '../../mixins/imageShared';
  import {lazyLoadShared} from '../../mixins/lazyLoadShared';

  /**
   * Picture component for displaying multiple versions of an image responsively.
   * `loaded` event is emitted once picture has lazy loaded
   */

  export default {
    name: "ZrPicture",
    directives: {
      lazyLoad
    },
    mixins: [imageShared, lazyLoadShared],
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
  <ZrPicture :mobile-img="images.banner_image.mobile.url"
             :tablet-img="images.banner_image.half.url"
             :desktop-img="images.banner_image.url"
             :alt-text="images.banner_image.alt"
  />
  ```

  #### Basic Picture without lazy loading
  ```jsx
  <ZrPicture :lazy="false"
             :mobile-img="images.banner_image.mobile.url"
             :tablet-img="images.banner_image.half.url"
             :desktop-img="images.banner_image.url"
             :alt-text="images.banner_image.alt"
  />
  ```

  #### Basic Picture with lazy loading, mobile image and tablet
  ```jsx
  <ZrPicture :mobile-img="images.banner_image.mobile.url"
             :tablet-img="images.banner_image.half.url"
             :alt-text="images.banner_image.alt"
  />
  ```

  #### Picture with custom fade easing and duration, and custom rootMargin
  ```jsx
  <ZrPicture :mobile-img="images.banner_image.mobile.url"
             :tablet-img="images.banner_image.half.url"
             :alt-text="images.banner_image.alt"
             fade-duration="0.8"
             fade-easing="linear"
             root-margin="-400px"
  />
  ```

</docs>
