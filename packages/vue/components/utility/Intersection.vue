<template>
    <div class="intersector">
        <slot></slot>
    </div>
</template>

<script>
  /**
   * A component that detects when it is intersected with the viewport, using the IntersectionObserver API.
   * See the IntersectionObserver API documentation for more details on options: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   */
  export default {
    name: "Intersection",
    props: {
      /**
       * Option that defines the margin at which intersection takes place.  See MDN documentation (link above) for more details.
       */
      rootMargin: {
        type: String,
        default: '0px'
      },
      /**
       * Option that defines the threshold of the component that needs to come into view before intersection event fires.  See MDN documentation (link above) for more details
       */
      threshold: {
        type: String,
        default: '0'
      },
      /**
       * Defines if the intersection event will only fire once
       */
      once: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        observer: null,
        intersected: null
      }
    },
    mounted() {
      const intersectionOptions = {
        rootMargin: this.rootMargin,
        threshold: this.threshold
      };

      this.observer = new IntersectionObserver(entries => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          this.intersected = true;
          /**
           * Event that fires when intersection occurs
           *
           * @type {intersectionObserver event}
           */
          this.$emit('intersected', entry);

          if (this.once) {
            this.observer.disconnect();
          }
        }
      }, intersectionOptions);

      this.observer.observe(this.$el);
    },
    destroyed() {
      this.observer.disconnect();
    }
  }
</script>

<style scoped lang="scss">

</style>

<docs>
    ### Example

    #### Default Intersection
    ##### Scroll down to see default Intersection take place.  Upon intersection, the displayed intersection label will be changed
    ```jsx
    let intersectedLabel = 'not yet';

    <Intersection style="margin-top: 50vh" @intersected="intersectedLabel = 'true'">
        <h2>Intersection: {{intersectedLabel}}</h2>
    </Intersection>
    ```

    ### Intersection with rootMargin offset
    #### Scroll down to see Intersection with rootMargin offset
    ```jsx
    let rootMarginLabel = 'not yet';

    <Intersection style="margin-top: 20vh" @intersected="rootMarginLabel = 'true'" rootMargin="-200px">
        <h2>Intersection: {{rootMarginLabel}}</h2>
    </Intersection>
    ```
</docs>