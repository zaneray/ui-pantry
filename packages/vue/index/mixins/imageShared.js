/**
 * @mixin
 * This mixin sets up all shared properties between the image and picture components
 */

export const imageShared = {
  props: {
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
    },
    /**
     * Easing function of fade transition
     */
    fadeEasing: {
      type: String,
      default: 'ease-out'
    },
    /**
     * Length in seconds of fade transition
     */
    fadeDuration: {
      type: String,
      default: '0.4'
    },
    /**
     * Root Margin value to use for the intersection observer that handles lazy loading
     */
    rootMargin: {
      type: String,
      default: '400px'
    }
  },
  computed: {
    fadeStyle() {
      return `transition: opacity ${this.fadeDuration}s ${this.fadeEasing}`
    }
  }
}
