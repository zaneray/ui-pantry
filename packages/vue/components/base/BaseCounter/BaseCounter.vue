<template>
  <div class="counter-wrapper-outer">
    <div class="counter-wrapper">
      <button class="stepper stepper-negative" @click="increment(-1)">-</button>
      <div class="total">{{count}}{{displayLabel}}</div>
      <button class="stepper stepper-positive" @click="increment(1)">+</button>
    </div>
    <div v-if="showError" class="counter-error">
      {{errorMessage}}
    </div>
  </div>
</template>

<script>
  /**
   * A custom counter component used to allow a user to increment a number
   */
  export default {
    name: "BaseCounter",
    data() {
      return {
        count: 0,
        showError: false
      }
    },
    props: {
      /**
       * Initial number for the counter to start at
       */
      value: {
        type: Number,
        default: 0
      },
      /**
       * Label to display next to the count (should be singular, i.e. Hat not Hats)
       */
      countLabel: {
        type: String
      },
      /**
       * Minimum value that the counter can have
       */
      min: {
        type: Number
      },
      /**
       * Maximum value that the counter can have
       */
      max: {
        type: Number
      },
      /**
       * Error message to display
       */
      errorMessage: {
        type: String,
        default: 'That is too many.'
      }
    },
    computed: {
      displayLabel() {
        if (!this.countLabel) {
          return ''
        } else {
          return this.count === 1 ? ` ${this.countLabel}` : ` ${this.countLabel}s`
        }
      }
    },
    methods: {
      increment(amount) {
        const newCount = this.count + amount;
        this.count = this.checkAgainstMaxAndMin(newCount, this.min, this.max);
        this.$emit('input', this.count);
      },
      checkAgainstMaxAndMin(count, min, max) {
        let newCount;
        if (min && count < min) {
          newCount = min;
        } else if (max && count > max) {
          this.showError = true;
          newCount = max;
        } else {
          newCount = count;
          this.showError = false;
        }
        return newCount;
      }
    },
    beforeMount() {
      this.count = this.checkAgainstMaxAndMin(this.value, this.min, this.max);
    }
  }
</script>

<style scoped lang="scss">
  @import '../../../../../styles/imports';
  $counter-background-color: $color-darker;

  .counter-wrapper-outer {
    position: relative;
  }

  .counter-wrapper {
    display: flex;
    justify-content: center;
  }

  .stepper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    background-color: $counter-background-color;
    color: $color-white;
    font-weight: bold;
    font-size: $font-size-large;
    appearance: none;
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 3rem;
    border-top: 2px solid $counter-background-color;
    border-bottom: 2px solid $counter-background-color;
    font-family: sans-serif;
    font-weight: $font-weight-bold;
  }

  .counter-error {
    background: $color-action;
    color: $color-white;
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: $font-size-medium;
    font-weight: 700;
    padding: 1rem;
    z-index: 1000;
    top: calc(100% + 1.5rem);
    min-width: 270px;
    max-width: 380px;

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 100%;
      transform: translateX(-4rem);
      border-bottom: 1.5rem solid $color-action;
      border-right: 1.5rem solid transparent;
    }
  }
</style>

<docs>
  ### Basic Counter
  ```jsx
  <BaseCounter></BaseCounter>
  ```

  ### Counter with Label
  ```jsx
  <BaseCounter :count-label="'Bag'"></BaseCounter>
  ```

  ### Counter with Label and initial value
  ```jsx
  <BaseCounter :value="3" :count-label="'Hat'"></BaseCounter>
  ```

  ### Counter with min and max
  ```jsx
  <BaseCounter :min="4" :max="11"></BaseCounter>
  ```
</docs>
