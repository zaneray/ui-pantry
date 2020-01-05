<template>

  <div class="range" :class="{'dual-range': isDualSlider}">

    <input
      type="range"
      :min="minValue"
      :max="maxValue"
      :step="stepSize"
      :aria-valuemin="minValue"
      :aria-valuemax="maxValue"
      :aria-valuenow="range1Model"
      ref="rangeSliderMin"
      v-model="range1Model"
      @change="rangeChanged"
      @input="isDualSlider ? checkRangeValid('min') : ''"
    >

    <input
      v-if="isDualSlider"
      type="range"
      :min="minValue"
      :max="maxValue"
      :step="stepSize"
      :aria-valuemin="minValue"
      :aria-valuemax="maxValue"
      :aria-valuenow="range2Model"
      ref="rangeSliderMax"
      v-model="range2Model"
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
      /** Step Size */
      stepSize: {
        type: Number,
        required: false,
        default: 1
      }
    },
    computed: {
      singleRangeWidth: function () {
        return this.range1Model * this.rangePercentageRatio + '%'
      },
      dualRangeLeft: function () {
        return (this.range1Model - this.minValue) * this.rangePercentageRatio + '%'
      },
      dualRangeWidth: function () {
        return (this.range2Model - this.range1Model) * this.rangePercentageRatio + '%'
      }
    },
    beforeMount() {
      this.range1Model = this.$props.rangeSliderMin;
      this.range2Model = this.$props.rangeSliderMax;
      this.rangePercentageRatio = 100 / (this.$props.maxValue - this.$props.minValue);
    },
    methods: {
      rangeChanged() {
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

  #### Default Slider Dual
  ```jsx
  <ZrRangeSlider is-dual-slider/>
  ```

  #### Slider Dual preset values
  ```jsx
  <ZrRangeSlider is-dual-slider :range-slider-min="10" :range-slider-max="70"/>
  ```

  #### Slider Dual preset values
  ```jsx
  <ZrRangeSlider is-dual-slider :range-slider-min="600" :range-slider-max="12000" :min-value="500" :max-value="18000"/>
  ```

  #### Slider preset values
  ```jsx
  <ZrRangeSlider :range-slider-min="60" :min-value="0" :max-value="350"/>
  ```

</docs>

