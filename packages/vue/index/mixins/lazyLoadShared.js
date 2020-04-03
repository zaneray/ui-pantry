/**
 * @mixin
 * This mixin sets up all shared properties between the image, video and picture lazyLoaded components
 */

export const lazyLoadShared = {
  props: {
    /**
     * Whether or not the image should lazy load
     */
    lazy: {
      type: Boolean,
      default: true
    },
    /**
     * Whether or not to fade the element in if/when lazy loaded
     */
    fade: {
      type: Boolean,
      default: true
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
