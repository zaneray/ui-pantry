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
     * Default image to show
     */
    defaultImage: {
      type: String,
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
    },
  }
};
