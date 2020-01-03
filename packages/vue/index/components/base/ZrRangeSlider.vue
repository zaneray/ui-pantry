<template>
  <div class="range" :class="{'dual-range': isDualSlider}">

    <div
      v-if="!isDualSlider"
      class="range-display"
      :style="{ left: 0, width: range1Model * rangePercentageRatio + '%' }">
    </div>

    <div
      v-if="isDualSlider"
      class="range-display"
      :style="{ left: (range1Model - minValue) * rangePercentageRatio + '%', width: (range2Model - range1Model) * rangePercentageRatio + '%' }">
    </div>

    <input
      type="range"
      :min="minValue"
      :max="isDualSlider ? maxValue - stepSize : maxValue"
      :step="stepSize"
      :aria-valuemin="minValue"
      :aria-valuemax="maxValue - stepSize"
      :aria-valuenow="range1Model"
      ref="rangeSliderMin"
      v-model="range1Model"
      @change="rangeChanged"
      @input="isDualSlider ? checkRangeValid('min') : ''"
    >

    <input
      v-if="isDualSlider"
      type="range"
      :min="minValue + stepSize"
      :max="maxValue"
      :step="stepSize"
      :aria-valuemin="minValue + stepSize"
      :aria-valuemax="maxValue"
      :aria-valuenow="range2Model"
      ref="rangeSliderMax"
      v-model="range2Model"
      @change="rangeChanged"
      @input="checkRangeValid('max')"
      class="dualInput"
    >
    <div class="label-min">{{labelMin}}{{range1Model}}</div>
    <div class="label-max" v-if="isDualSlider">{{labelMax}}{{range2Model}}</div>
  </div>

</template>

<script>

  export default {
    name: "ZrRangeSlider",
    data: function () {
      return {
        range1Model: 0,
        range2Model: 0,
        rangePercentageRatio: 1
      }
    },
    props: {
      /** Show dual range selection (min / max) */
      isDualSlider: {
        type: Boolean,
        default: false
      },
      /** Value for Range 1 */
      rangeSliderMin: {
        type: Number,
        required: false,
        default: 0
      },
      /** Value for Range 2 */
      rangeSliderMax: {
        type: Number,
        required: false,
        default: 100
      },
      /** Min Label */
      labelMin: {
        type: String,
        required: false,
        default: ''
      },
      /** Max Label */
      labelMax: {
        type: String,
        required: false,
        default: ''
      },
      /** Min Value */
      minValue: {
        type: Number,
        required: false,
        default: 0
      },
      /** Max Value */
      maxValue: {
        type: Number,
        required: false,
        default: 100
      },
      stepSize: {
        type: Number,
        required: false,
        default: 1
      }
    },
    beforeMount() {
      this.range1Model = this.$props.rangeSliderMin;
      this.range2Model = this.$props.rangeSliderMax;
      this.rangePercentageRatio = 100 / (this.$props.maxValue - this.$props.minValue);
    },
    methods: {
      rangeChanged() {
        console.log('range change');
        this.$refs.rangeSliderMin.setAttribute('aria-valuenow', this.range1Model);
        // if dual slides also set value now for 2nd input range
        if (this.$props.isDualSlider) {
          this.$refs.rangeSliderMax.setAttribute('aria-valuenow', this.range2Model);
          this.$emit('change', [this.range1Model, this.range2Model]);
          return;
        }
        this.$emit('change', this.value);
      },
      checkRangeValid(activeRangeSlider) {

        const minValue = parseInt(this.range1Model);
        const maxValue = parseInt(this.range2Model);

        // case min range active
        if (activeRangeSlider === 'min') {
          if (minValue >= maxValue) {
            this.range1Model = maxValue - this.stepSize
          }
        }

        // case max range active
        if (activeRangeSlider === 'max') {
          if (maxValue <= minValue) {
            this.range2Model = minValue + this.stepSize;
          }
        }

      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/imports';

  $trackBackGround: rgb(153, 153, 153);
  $trackColor: rgb(0, 113, 186);
  $trackHeight: 4px;
  $thumbWidth: 20px;
  $thumbHeight: 20px;

  .range {

    width: 100%;
    height: 34px; /* thumb height + label font size */
    position: relative;

    /* track styling */
    input[type="range"] {
      width: 100%;
      pointer-events: none;
      position: absolute;
      -webkit-appearance: none;
      border: none;
      background: transparent;
      height: $trackHeight;
      outline: none;

      /* prevent outline on focus */
      &:focus {
        outline: none;
      }

      /* prevent outline on focus moz */
      &::-moz-focus-outer {
        border: 0;
      }

      &:first-of-type {
        background: $trackBackGround;
      }

      /* ms specific styling */
      &::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }

      /* styling for web kit thumb */
      &::-webkit-slider-thumb {
        pointer-events: all;
        position: relative;
        z-index: 2;
        outline: 0;
        -webkit-appearance: none;
        width: $thumbWidth;
        height: $thumbHeight;
        border: none;
        appearance: none;
        cursor: pointer;
        background: url('/static/fpo/slider-right.svg') no-repeat;
      }

      &:first-of-type::-webkit-slider-thumb {
        background: url('/static/fpo/slider-left.svg') no-repeat;
      }

      /* styling for moz thumb */
      &::-moz-range-thumb {
        pointer-events: all;
        position: relative;
        z-index: 2;
        outline: 0;
        -webkit-appearance: none;
        width: $thumbWidth;
        height: $thumbHeight;
        border: none;
        appearance: none;
        cursor: pointer;
        background: url('/static/fpo/slider-right.svg') no-repeat;
      }

      &:first-of-type::-moz-range-thumb {
        background: url('/static/fpo/slider-left.svg') no-repeat;
      }

      /* styling for ms thumb */
      &::-ms-thumb {
        pointer-events: all;
        position: relative;
        z-index: 2;
        outline: 0;
        -webkit-appearance: none;
        width: $thumbWidth;
        height: $thumbHeight;
        border: none;
        appearance: none;
        background: url('/static/fpo/slider-right.svg') no-repeat;
        cursor: pointer;
      }

      &:first-of-type::-ms-thumb {
        background: url('/static/fpo/slider-left.svg') no-repeat;
      }

    }

    .label-min, .label-max {
      position: absolute;
      top: $thumbHeight;
    }

    .label-max {
      right: 0;
    }

    // reposition thumb image for dual range display
    &.dual-range {

      input[type="range"] {
        &::-webkit-slider-thumb {
          left: $thumbWidth / 2
        }

        &:first-of-type::-webkit-slider-thumb {
          left: -$thumbWidth / 2
        }

        &::-moz-range-thumb {
          border: 1px solid transparent;
        }

        &:first-of-type::-moz-range-thumb {
          border: 1px solid transparent;
        }

        &::-ms-thumb {
          left: $thumbWidth / 2
        }

        &:first-of-type::-ms-thumb {
          left: -$thumbWidth / 2
        }
      }
    }

    .range-display {
      position: absolute;
      height: $trackHeight;
      background: $trackColor;
      top: 2px;
      z-index: 1;
    }

  }


</style>

<docs>
  ### Examples

  #### Default Range Slider
  ```jsx
  <ZrRangeSlider/>
  ```

  #### Default Slider Dual
  ```jsx
  <ZrRangeSlider is-dual-slider/>
  ```

  #### Slider Dual preset values
  ```jsx
  <ZrRangeSlider is-dual-slider :range-slider-min="25" :range-slider-max="76"/>
  ```

  #### Slider Dual preset values
  ```jsx
  <ZrRangeSlider is-dual-slider :range-slider-min="600" :range-slider-max="900" :min-value="500" :max-value="18000"/>
  ```

  #### Slider preset values
  ```jsx
  <ZrRangeSlider :range-slider-min="60" :min-value="0" :max-value="350"/>
  ```

</docs>

