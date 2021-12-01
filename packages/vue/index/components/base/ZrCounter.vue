<template>
  <div class="counter-wrapper-outer">
    <div class="counter-wrapper">
      <span
        id="decrementAriaLabel"
        class="visually-hidden"
        aria-hidden="true"
        >{{ decrementBtnAriaLabel }}</span
      >
      <button
        class="stepper stepper-negative"
        @click="increment(-1)"
        :disabled="minDisabled"
        aria-labelledby="decrementAriaLabel"
      >
        <slot name="decrementSymbol">-</slot>
      </button>
      <div class="total">{{count}}{{displayLabel}}</div>
      <span
        id="incrementAriaLabel"
        class="visually-hidden"
        aria-hidden="true"
        >{{ incrementBtnAriaLabel }}</span
      >
      <button
        class="stepper stepper-positive"
        @click="increment(1)"
        :disabled="maxDisabled"
        aria-labelledby="incrementAriaLabel"
      >
        <slot name="incrementSymbol">+</slot>
      </button>
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
    name: "ZrCounter",
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
       * Whether counter buttons should be disabled when min or max condition is met
       */
      disableAtBoundaries: {
        type: Boolean,
        default: true
      },
      /**
       * Error message to display
       */
      errorMessage: {
        type: String,
        default: 'That is too many.'
      },
      /**
       * Aria label for negative stepper button (decrement)
       */
      decrementBtnAriaLabel: {
        type: String,
        default: "Decrease count",
      },
      /**
       * Aria label for positive stepper button (increment)
       */
      incrementBtnAriaLabel: {
        type: String,
        default: "Increase count",
      }
    },
    data() {
      return {
        count: 0,
        showError: false
      }
    },
    computed: {
      displayLabel() {
        if (!this.countLabel) {
          return ''
        } else {
          return this.count === 1 ? ` ${this.countLabel}` : ` ${this.countLabel}s`
        }
      },
      minDisabled() {
        return this.stepperDisabled('min')
      },
      maxDisabled() {
        return this.stepperDisabled('max')
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
      },
      stepperDisabled(type) {
        const countComparison = type === 'min' ? this.min : this.max
        return this.disableAtBoundaries && this.count === countComparison ? true : false
      }
    },
    watch: {
      value: {
        immediate: true,
        handler: function() {
          this.count = this.checkAgainstMaxAndMin(this.value, this.min, this.max);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/imports';
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

  .visually-hidden {
    display: none;
  }
</style>

<docs>
  ### Basic Counter
  ```jsx
  <ZrCounter></ZrCounter>
  ```

  ### Counter with Label
  ```jsx
  <ZrCounter :count-label="'Bag'"></ZrCounter>
  ```

  ### Counter with Label and initial value
  ```jsx
  <ZrCounter :value="3" :count-label="'Hat'"></ZrCounter>
  ```

  ### Counter with min and max
  ```jsx
  <ZrCounter :min="4" :max="11"></ZrCounter>
  ```

  ### Counter with min and max, not disabled at boundaries
  ```jsx
  <ZrCounter :min="4" :max="11" :disable-at-boundaries="false"></ZrCounter>
  ```

  ### Dynamic Value
  ```jsx
  const value = 3;
  <button @click="value++">Increment Value</button>
  <ZrCounter :value="value"></ZrCounter>
  ```

  ### Counter with custom button symbols
  ```jsx
  <ZrCounter>
    <template v-slot:decrementSymbol><</template>
    <template v-slot:incrementSymbol>></template>
  </ZrCounter>
  ```
</docs>
