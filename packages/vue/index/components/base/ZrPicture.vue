<template>
  <div>
    <template v-if="lazy">
      <picture v-lazy-load="{rootMargin: rootMargin}">
        <source v-if="desktopImg" :data-src="desktopImg" :media="breakpointQueryDesktop" :srcset="lazyDesktopImg">
        <source v-if="tabletImg" :data-src="tabletImg" :media="breakpointQueryTablet" :srcset="lazyTabletImg">
        <source v-if="tabletImgPortrait" :data-src="tabletImgPortrait" :media="breakpointQueryTabletPortrait" :srcset="lazyTabletPortraitImg">
        <img :data-src="mobileImg" :alt="altText" :src="lazyMobileImg" :class="{'fade-image': fade}" :style="fadeStyle" />
      </picture>
      <noscript inline-template>
        <picture>
          <source v-if="desktopImg" :srcset="desktopImg" :media="breakpointQueryDesktop"/>
          <source v-if="tabletImg" :srcset="tabletImg" :media="breakpointQueryTablet"/>
          <source v-if="tabletImgPortrait" :srcset="lazyTabletPortraitImg" :media="breakpointQueryTabletPortrait">
          <img :src="mobileImg" :alt="altText" />
        </picture>
      </noscript>
    </template>
    <picture v-else>
      <source v-if="desktopImg" :srcset="desktopImg" :media="breakpointQueryDesktop" />
      <source v-if="tabletImg" :srcset="tabletImg" :media="breakpointQueryTablet" />
      <source v-if="tabletImgPortrait" :srcset="tabletImgPortrait" :media="breakpointQueryTabletPortrait">
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
       * Tablet portrait image url to render
       */
      tabletImgPortrait: {
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
      lazyDesktopImg() {
        return this.lazyLoaded ? this.desktopImg : this.defaultImage;
      },
      lazyTabletImg() {
        return this.lazyLoaded ? this.tabletImg : this.defaultImage;
      },
      lazyMobileImg() {
        return this.lazyLoaded ? this.mobileImg : this.defaultImage;
      },
      breakpointQueryDesktop() {
        return `(min-width: ${this.breakpointDesktop}px)`;
      },
      breakpointQueryTablet() {
        return `(min-width: ${this.breakpointTablet}px)`;
      },
      breakpointQueryTabletPortrait() {
        return `(min-width: ${this.breakpointTablet}px) and (orientation: portrait)`;
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

  #### Picture with dynamic source change
  Click the button to dynamically change the desktop image src
  ```jsx
  let desktopSrc = '/static/fpo/1920x960-light.jpg';
  const changeSrc = () => {
    console.log('change to: /static/fpo/1920x960-dark.jpg');
    desktopSrc = '/static/fpo/1920x960-dark.jpg';
  }

  <button @click="desktopSrc = '/static/fpo/1920x960-dark.jpg'">Change Image Src</button>
  <ZrPicture :lazy="false"
             :mobile-img="images.banner_image.mobile.url"
             :tablet-img="images.banner_image.half.url"
             :desktop-img="desktopSrc"
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
             root-margin="-500px"
  />
  ```
  #### Basic Picture with lazy loading emitted event, mobile image and tablet
  ```jsx

  const loadPicture = () => console.log('load image');
  const pictureLoaded = () => console.log('image loaded');

  <ZrPicture :mobile-img="images.banner_image.mobile.url"
             :tablet-img="images.banner_image.half.url"
             :alt-text="images.banner_image.alt"
             @load="loadPicture"
             @loaded="pictureLoaded"
  />
  ```

  #### Picture with tablet portrait option
  ```jsx
  <ZrPicture :mobile-img="images.banner_image.mobile.url"
             :tablet-img="images.banner_image.half.url"
             :tablet-img-portrait="images.banner_image.url"
             :desktop-img="images.banner_image.url"
             :alt-text="images.banner_image.alt"
  />
  ```

</docs>
