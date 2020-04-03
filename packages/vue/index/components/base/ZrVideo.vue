<template>
  <video
    v-if="videoUrl && lazy"
    v-lazy="{rootMargin: rootMargin}"
    class="video"
    :class="{'fade-video': fade}"
    :autoplay="autoplay"
    :loop="loop"
    :muted="muted"
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
  >
    <source :src="videoUrl" :type="videoType" />
  </video>
</template>

<script>
  import '../../directives/lazyLoad';
  import {lazyLoadShared} from '../../mixins/lazyLoadShared';

  export default {
    name: 'ZrVideo',
    mixins: [lazyLoadShared],
    props: {
      videoUrl: {
        type: String,
        required: true
      },
      autoplay: {
        type: Boolean,
        default: true
      },
      loop: {
        type: Boolean,
        default: true
      },
      muted: {
        type: Boolean,
        default: true
      },
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
  <zr-video
    :video-url="video.url"
  >
  </zr-video>
  ```

  #### Video with custom lazy loading
  ```jsx
  <zr-video
    :video-url="video.url"
    :fade-duration="5"
    :fade-easing="linear"
  >
  </zr-video>
  ```

  #### Video with no lazy loading
  ```jsx
  <zr-video
    :video-url="video.url"
    :lazy="false"
  >
  </zr-video>
  ```
</docs>
