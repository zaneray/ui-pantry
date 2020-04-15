<template>
  <video
    v-if="videoUrl && lazy"
    v-lazy="{rootMargin: rootMargin}"
    class="video"
    :class="{'fade-video': fade}"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    :playsinline="playsinline"
    :style="fadeStyle"
  >
    <source :data-src="videoUrl" :type="videoType" />
  </video>
  <video
    v-else-if="videoUrl"
    class="video"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
    :playsinline="playsinline"
  >
    <source :src="videoUrl" :type="videoType" />
  </video>
</template>

<script>
  import '../../directives/lazyLoad';
  import {lazyLoadShared} from '../../mixins/lazyLoadShared';

  /**
   * Core video component that is meant to display inline and autoplay on mobile, with no controls.
   * Has support for lazy loading by default.  `loaded` event is emitted once video has lazy loaded
   */

  export default {
    name: 'ZrVideo',
    mixins: [lazyLoadShared],
    props: {
      /**
       * URL of the video to display
       */
      videoUrl: {
        type: String,
        required: true
      },
      /**
       * Whether or not to autoplay the video
       */
      autoplay: {
        type: Boolean,
        default: true
      },
      /**
       * Whether or not to loop the video
       */
      loop: {
        type: Boolean,
        default: true
      },
      /**
       * Whether or not to mute the video
       */
      muted: {
        type: Boolean,
        default: true
      },
      /**
       * Whether or not the video should play inline (must be true to autoplay at mobile)
       */
      playsinline: {
        type: Boolean,
        default: true
      },
      /**
       * Type of video src
       */
      videoType: {
        type: String,
        default: 'video/mp4'
      }
    }
  };
</script>

<style scoped lang="scss">
  .video {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &.lazy-video.fade-video {
      opacity: 0;

      &.video-loaded {
        opacity: 1;
      }
    }
  }
</style>

<docs>
  ### Examples

  #### Default video with lazy loading
  ```jsx
  <zr-video :video-url="video.url" />
  ```

  #### Video with custom lazy loading
  ```jsx
  <zr-video :video-url="video.url" fade-duration="5" fade-easing="linear" />
  ```

  #### Video with no lazy loading
  ```jsx
  <zr-video :video-url="video.url" :lazy="false" />
  ```
</docs>
