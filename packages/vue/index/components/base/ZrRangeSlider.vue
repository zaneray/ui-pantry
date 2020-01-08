<template>

  <div class="range" :class="{'dual-range': isDualSlider}">

    <input
      type="range"
      :min="rangeSlideMin"
      :max="rangeSlideMax"
      :step="stepSize"
      :aria-valuemin="rangeSlideMin"
      :aria-valuemax="rangeSlideMax"
      :aria-valuenow="range1Model"
      v-model.number="range1Model"
      @change="rangeChanged"
      @input="isDualSlider ? checkRangeValid('min') : ''"
    >

    <input
      v-if="isDualSlider"
      type="range"
      :min="rangeSlideMin"
      :max="rangeSlideMax"
      :step="stepSize"
      :aria-valuemin="rangeSlideMin"
      :aria-valuemax="rangeSlideMax"
      :aria-valuenow="range2Model"
      v-model.number="range2Model"
      @change="rangeChanged"
      @input="checkRangeValid('max')"
      class="dualInput"
    >

    <div class="range-track"></div>

    <div
      v-if="!isDualSlider"
      class="range-display"
      :style="{ left: 0, width: singleRangeWidth }">
    </div>

    <div
      v-if="isDualSlider"
      class="range-display"
      :style="{ left: dualRangeLeft, width: dualRangeWidth }">
    </div>

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
      /** Value for Range 1 */
      minValue: {
        type: Number,
        required: false,
        default: 0
      },
      /** Value for Range 2 */
      maxValue: {
        type: Number,
        required: false
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
      rangeSlideMin: {
        type: Number,
        required: false,
        default: 0
      },
      /** Max Value */
      rangeSlideMax: {
        type: Number,
        required: false,
        default: 100
      },
      /** Step Size */
      stepSize: {
        type: Number,
        required: false,
        default: 1
      }
    },
    computed: {
      singleRangeWidth: function () {
        return `${this.range1Model * this.rangePercentageRatio}%`
      },
      dualRangeLeft: function () {
        return `${(this.range1Model - this.rangeSlideMin) * this.rangePercentageRatio}%`
      },
      dualRangeWidth: function () {
        return `${(this.range2Model - this.range1Model) * this.rangePercentageRatio}%`
      },
      isDualSlider: function () {
        // min Value
        const minValBoolean = typeof this.minValue === 'number';
        return minValBoolean && this.maxValue;
      }
    },
    beforeMount() {
      this.range1Model = this.minValue;
      this.range2Model = this.maxValue;
      this.rangePercentageRatio = 100 / (this.rangeSlideMax - this.rangeSlideMin);
    },
    methods: {
      rangeChanged() {
        // if dual slides also set value now for 2nd input range
        if (this.isDualSlider) {
          this.$emit('change', [this.range1Model, this.range2Model]);
          return;
        }
        this.$emit('change', this.range1Model);
      },
      checkRangeValid(activeRangeSlider) {

        const minValueCurrent = parseInt(this.range1Model);
        const maxValueCurrent = parseInt(this.range2Model);

        // case min range active
        if (activeRangeSlider === 'min' && minValueCurrent >= maxValueCurrent) {
          this.range1Model = maxValueCurrent - this.stepSize
        }

        // case max range active
        if (activeRangeSlider === 'max' && maxValueCurrent <= minValueCurrent) {
          this.range2Model = minValueCurrent + this.stepSize;
        }

      }
    }
  }
</script>

<style scoped lang="scss">

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
      z-index: 10;
      padding: 0;
      margin: 0;

      /* prevent outline on focus */
      &:focus {
        outline: none;
      }

      /* prevent outline on focus moz */
      &::-moz-focus-outer {
        border: 0;
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
        background: url('/static/fpo/slider-right.png') no-repeat;
      }

      &:first-of-type::-webkit-slider-thumb {
        background: url('/static/fpo/slider-left.png') no-repeat;
      }

      /* styling for moz thumb */
      &::-moz-range-thumb {
        pointer-events: all;
        position: absolute;
        z-index: 2;
        outline: 0;
        -webkit-appearance: none;
        width: $thumbWidth;
        height: $thumbHeight;
        border: 1px solid transparent;
        appearance: none;
        cursor: pointer;
        background: url('/static/fpo/slider-right.png') no-repeat;
      }

      &:first-of-type::-moz-range-thumb {
        background: url('/static/fpo/slider-left.png') no-repeat;
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
        background: url('/static/fpo/slider-right.png') no-repeat;
        cursor: pointer;
      }

      &:first-of-type::-ms-thumb {
        background: url('/static/fpo/slider-left.png') no-repeat;
      }

    }

    .label-min, .label-max {
      position: absolute;
      top: $thumbHeight;
    }

    .label-max {
      right: 0;
    }

    .range-display, .range-track {
      position: absolute;
      height: $trackHeight;
      background: $trackColor;
      top: 0px;
      z-index: 2;
    }

    .range-track {
      width: 100%;
      background-color: $trackBackGround;
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

  #### Slider Dual preset values
  ```jsx
  <ZrRangeSlider :min-value="10" :max-value="70"/>
  ```

  #### Slider Dual preset values
  ```jsx
  <ZrRangeSlider :min-value="600" :max-value="12000" :range-slide-min="500" :range-slide-max="18000"/>
  ```

  #### Slider preset values
  ```jsx
  <ZrRangeSlider :min-value="60" :max-value="300" :range-slide-min="0" :range-slide-max="350"/>
  ```

</docs>

