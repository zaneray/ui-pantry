<template>
  <div class="zr-image">
    <img v-if="lazy" v-lazy-load="{rootMargin: rootMargin}" :data-src="imageSrc"
         :src="lazyImage" :alt="altText" :class="[imageClass, {'fade-image': fade}]" :style="fadeStyle" />
    <img v-else :src="imageSrc" :width="width" :height="height" :alt="altText" :class="imageClass"/>
    <noscript inline-template>
      <img :src="imageSrc" :alt="altText" :class="imageClass"/>
    </noscript>
  </div>
</template>

<script>
  import lazyLoad from '../../directives/lazyLoad';
  import {imageShared} from '../../mixins/imageShared'
  import {lazyLoadShared} from '../../mixins/lazyLoadShared';

  /**
   * BaseImage is a rock solid image component that requires alt text, and handles lazy loading by default.
   * `loaded` event is emitted once image has lazy loaded
   */

  export default {
    name: "ZrImage",
    directives: {
      lazyLoad
    },
    mixins: [imageShared, lazyLoadShared],
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
       * width for responsive images
       */
      width: {
        type: Number,
        required: false
      },

      /**
       * Height for responsive images
       */
      height: {
        type: Number,
        required: false
      }

    },
    computed: {
      lazyImage() {
        return this.lazyLoaded ? this.imageSrc : this.defaultImage;
      }
    }
  }
</script>

<style scoped lang="scss">



  img {
    max-width: 100%;
    height: auto;

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

  #### Default image with lazy loading
  ```jsx
  <ZrImage :image-src="images.thumbnail.url" :alt-text="text.sentence"/>
  ```

  #### Image with no lazy loading
  ```jsx
  <ZrImage :image-src="images.thumbnail.url" :alt-text="text.sentence"/>
  ```

  #### Image with no dynamic source change
  Click button to dynamically change the image src
  ```jsx
  let imageSrc = '/static/fpo/thumbnail.jpg'
  <button @click="imageSrc = '/static/fpo/gallery-md.jpg'">Change Image Src</button>
  <ZrImage :image-src="imageSrc" :alt-text="text.sentence"/>
  ```

  #### Image with custom lazy load fade duration and easing
  ```jsx
  <ZrImage
    :image-src="images.thumbnail.url"
    :alt-text="text.sentence"
    fade-duration="0.8"
    fade-easing="linear"
  />
  ```

</docs>
