<template>
    <section class="hero-banner">
        <base-picture :desktop-img="desktopImg"
                      :mobile-img="mobileImg"
                      :alt-text="altText">
        </base-picture>
        <div class="hero-content-wrapper"
             :class="[
                verticalPosition, horizontalPosition
             ]">
            <div class="hero-content">
                <slot></slot>
            </div>
        </div>
    </section>
</template>

<script>
  import BasePicture from '../base/ZrPicture.vue';

  /**
   * A responsive hero banner component that displays a background hero with a slot for content over the banner
   */

  export default {
    name: "ZrHeroBanner",
    components: {BasePicture},
    props: {
      desktopImg: {
        type: String,
        required: true
      },
      mobileImg: {
        type: String,
        required: true
      },
      altText: {
        type: String,
        required: true
      },
      verticalPosition: {
        type: String,
        default: 'top',
        validator: function (value) {
          return ['top', 'middle', 'bottom'].includes(value)
        }
      },
      horizontalPosition: {
        type: String,
        default: 'left',
        validator: function (value) {
          return ['left', 'center', 'right'].includes(value)
        }
      }
    },
  }
</script>

<style scoped lang="scss">
    @import '../styles/imports';

    .hero-banner {
        position: relative;
    }

    .hero-content-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;

        &.center {
            justify-content: center;
        }

        &.right {
            justify-content: flex-end;
        }

        &.middle {
            align-items: center;
        }

        &.bottom {
            align-items: flex-end;
        }
    }

    .hero-content {
        padding: $margin-smedium;

        @media (min-width: $screen-md) {
            padding: $margin-medium;
        }

        @media (min-width: $screen-lg) {
            padding: $margin-large;
        }
    }
</style>

<docs>
    ### Examples

    #### HeroBanner with defaults
    ```jsx
    <ZrHeroBanner :desktop-img="images.banner_image.url"
                 :mobile-img="images.banner_image.mobile.url"
                 alt-text="Text about the image"
                 class="light-text">
        <h1>Hi I am a Title</h1>
        <h3>I am a subtitle</h3>
    </ZrHeroBanner>
    ```

    #### HeroBanner right and bottom aligned
    ```jsx
    <ZrHeroBanner :desktop-img="images.banner_image.url"
                 :mobile-img="images.banner_image.mobile.url"
                 alt-text="Text about the image"
                 vertical-position="bottom"
                 horizontal-position="right"
                 class="light-text">
        <h1>Hi I am a Title</h1>
        <h3>I am a subtitle</h3>
        <ZrButton :label="'Learn More'" size="sm" theme="action" style="margin-top: 20px"></ZrButton>
    </ZrHeroBanner>
    ```
</docs>