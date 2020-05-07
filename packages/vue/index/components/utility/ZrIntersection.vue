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

  export const zrIntersectionProps = {
    props: {
      /**
       * Option that defines the margin at which intersection takes place.  See MDN documentation (link above) for more details.
       */
        rootMargin: {
        type: String,
        default: '0px'
      },
      /**
       * Option that defines the threshold of the component that needs to come into view before intersection event fires.
       * Can be a single number between 0 and 1, or multiple numbers that are comma separated
       * See MDN documentation (link above) for more details
       */
        threshold: {
        type: String,
        default: '0, 1'
      },
      /**
       * Defines if the intersection event will only fire once
       */
        once: {
        type: Boolean,
        default: true
      },
    },
  };

  export default {
    name: "ZrIntersection",
    mixins: [zrIntersectionProps],
    data() {
      return {
        observer: null,
        previousY: 0,
        previousRatio: 0,
        intersected: false
      }
    },
    computed: {
      cleanThresholdValue() {
        return this.threshold.includes(',') ? this.threshold.split(',') : this.threshold;
      }
    },
    mounted() {
      const intersectionOptions = {
        rootMargin: this.rootMargin,
        threshold: this.cleanThresholdValue
      };

      this.observer = new IntersectionObserver(entries => {
       entries.forEach(entry => {
          const currentY = entry.boundingClientRect.y;
          const currentRatio = entry.intersectionRatio;
          let intersectionObject = {
            scrollDirection: null,
            entering: currentRatio > this.previousRatio,
            top: null
          }

          if (currentY < this.previousY) {
            intersectionObject.scrollDirection = 'down';
            intersectionObject.top = intersectionObject.entering
              ? currentRatio !== 1
              : currentRatio !== 0
          } else if (currentY > this.previousY) {
            intersectionObject.scrollDirection = 'up';
            intersectionObject.top = intersectionObject.entering
              ? currentRatio === 1
              : currentRatio === 0
          }

          if (entry.isIntersecting) {
            this.intersected = true;
            //console.log(intersectionObject);
            this.$emit('intersected', intersectionObject);
            if (this.once) {
              this.observer.disconnect();
            }
          }

          const downBoundaryCase = intersectionObject.scrollDirection === 'down' && !intersectionObject.entering && !intersectionObject.top;
          const upBoundaryCase = intersectionObject.scrollDirection === 'up' && !intersectionObject.entering && intersectionObject.top;

          if (this.intersected) {
            if (downBoundaryCase || upBoundaryCase) {
              //console.log(intersectionObject);
              this.$emit('intersected', intersectionObject);
            }
          }

          this.previousY = currentY;
          this.previousRatio = currentRatio;
       });
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

    <ZrIntersection style="margin-top: 50vh" @intersected="intersectedLabel = 'true'">
        <h2>Intersection: {{intersectedLabel}}</h2>
    </ZrIntersection>
    ```

    ### Intersection with rootMargin offset
    #### Scroll down to see Intersection with rootMargin offset
    ```jsx
    let rootMarginLabel = 'not yet';

    <ZrIntersection style="margin-top: 20vh" @intersected="rootMarginLabel = 'true'" rootMargin="-200px">
        <h2>Intersection: {{rootMarginLabel}}</h2>
    </ZrIntersection>
    ```

  ### Intersection with rootMargin offset and once turned off
  #### Scroll down to see Intersection with rootMargin offset
  ```jsx
  let rootMarginLabel = 'not yet';

  <ZrIntersection style="margin-top: 200vh; margin-bottom: 100vh" @intersected="rootMarginLabel = 'true'" :once="false">
    <div style="width: 100%; height: 500px; border: 1px solid #000000">
      <h2>Intersection: {{rootMarginLabel}}</h2>
    </div>
  </ZrIntersection>
  ```
</docs>
