<template>

  <div class="range" :class="{'dual-range': isDualSlider}">
    <label :class="{'visually-hidden': hideLabel}" v-if="label" :for="id">{{label}}</label>
    <label :class="{'visually-hidden': hideLabel2}" v-if="label2" :for="id2">{{label2}}</label>
    <input
      :id="id"
      type="range"
      :min="rangeSlideMin"
      :max="rangeSlideMax"
      :step="stepSize"
      :aria-valuemin="rangeSlideMin"
      :aria-valuemax="rangeSlideMax"
      :aria-valuenow="range1Model"
      :aria-valuetext="range1ModelText"
      v-model.number="range1Model"
      @change="rangeChanged"
      @input="isDualSlider ? checkRangeValid('min') : ''"
    >

    <input
      :id="id2"
      v-if="isDualSlider"
      type="range"
      :min="rangeSlideMin"
      :max="rangeSlideMax"
      :step="stepSize"
      :aria-valuemin="rangeSlideMin"
      :aria-valuemax="rangeSlideMax"
      :aria-valuenow="range2Model"
      :aria-valuetext="range2ModelText"
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

    <div class="label-min">{{labelMin}}{{range1Display}}{{labelMinAfter}}</div>
    <div class="label-max" v-if="isDualSlider">{{labelMax}}{{range2Display}}{{labelMaxAfter}}</div>

  </div>

</template>

<script>

  export default {
    name: "ZrRangeSlider",
    data: function () {
      return {
        range1Model: 0,
        range2Model: 0,
        range1Display: 0,
        range2Display: 0,
        rangePercentageRatio: 1,
        range1ModelText: null,
        range2ModelText: null,
      }
    },
    props: {
      /** Label to be displayed */
      label: {
        type: String,
        required: false
      },
      /** Label to be displayed */
      label2: {
        type: String,
        required: false
      },
      /** Required to associate a label to the first range input */
      id: {
        type: String,
        required: false
      }, /** Required to associate a label to the first range input */
      id2: {
        type: String,
        required: false
      },
      /**
       * In some cases it makes sense to not show a label. ADA still required it to be in the code.
       * This boolean turns it on an off visually.
       */
      hideLabel: {
        type: Boolean,
        required: false
      },
      /**
       * In some cases it makes sense to not show a label. ADA still required it to be in the code.
       * This boolean turns it on an off visually.
       */
      hideLabel2: {
        type: Boolean,
        required: false
      },
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
      /** Min Label After */
      labelMinAfter: {
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
      /** Max Label After */
      labelMaxAfter: {
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
      },
      /** Step Size
       *
       * Set to & to format range labels as $ currency
       * Set to 'foot-inch-short' to format to 1' 2"
       * Set to 'foot-inch-long' to format to 1ft 2in"
       *
       * */
      unitType: {
        type: String,
        required: false,
        default: ''
      },
      ariaValueText: {
        type: Array,
        required: false
      }
    },
    watch: {
      minValue() {
        this.range1Model = this.minValue
        this.range1ModelText = this.getFinalAriaValueText(this.minValue - 1)
      },
      maxValue() {
        this.range2Model = this.maxValue
        this.range2ModelText = this.getFinalAriaValueText(this.maxValue - 1)
      },
      range1Model(val) {
        this.formatRangeValues(this.range1Model, this.range2Model)
        this.range1ModelText = this.getFinalAriaValueText(this.range1Model - 1)
      },
      range2Model(val) {
        this.formatRangeValues(this.range1Model, this.range2Model)
        this.range2ModelText = this.getFinalAriaValueText(this.range2Model - 1)
      }
    },
    computed: {
      singleRangeWidth: function () {
        return `${(this.range1Model - this.rangeSlideMin) * this.rangePercentageRatio}%`
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
      this.range1ModelText = this.getFinalAriaValueText(this.minValue - 1)
      this.range2Model = this.maxValue;
      this.range2ModelText = this.getFinalAriaValueText(this.maxValue - 1)
      this.formatRangeValues()
      this.rangePercentageRatio = 100 / (this.rangeSlideMax - this.rangeSlideMin);
    },
    methods: {
      getFinalAriaValueText(index, elseReturn = null) {
        return this.ariaValueText && this.ariaValueText[index] ? this.ariaValueText[index] : elseReturn
      },
      calculateFtInches(inches, unitLabels){
        return `${Math.floor(inches / 12)}${unitLabels.foot} ${inches % 12}${unitLabels.inches}`
      },
      formatRangeValues(minValue, maxValue) {

        let minValueDisplay = '';
        let maxValueDisplay = '';

        // format range values depending on unit type
        switch (this.unitType) {

          case '$':
            // format range labels as $ currency
            minValue || minValue === 0 ? minValueDisplay = '$' + minValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''
            maxValue ? maxValueDisplay = '$' + maxValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''
            break
          case 'foot-inch-short':
            // format range labels as length in ' and "
            minValue || minValue === 0 ? minValueDisplay = this.calculateFtInches(minValue, {foot: '\'', inches: '\"'}) : ''
            maxValue ? maxValueDisplay = this.calculateFtInches(maxValue, {foot: '\'', inches: '\"'}) : ''
            break
          case 'foot-inch-long':
            // format range labels as length in ft and in
            minValue || minValue === 0 ? minValueDisplay = this.calculateFtInches(minValue, {foot: 'ft', inches: 'in'}) : ''
            maxValue ? maxValueDisplay = this.calculateFtInches(maxValue, {foot: 'ft', inches: 'in'}) : ''
            break
          default:
            // no formatting needed
            minValueDisplay = minValue
            maxValueDisplay = maxValue
        }

        this.range1Display = this.getFinalAriaValueText(minValueDisplay - 1, minValueDisplay)
        this.range2Display = this.getFinalAriaValueText(maxValueDisplay - 1, maxValueDisplay)

      },
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
          this.range1ModelText = this.getFinalAriaValueText(this.range1Model) //this.ariaValueText && this.ariaValueText[this.range1Model] ? this.ariaValueText[this.range1Model] : null
        }

        // case max range active
        if (activeRangeSlider === 'max' && maxValueCurrent <= minValueCurrent) {
          this.range2Model = minValueCurrent + this.stepSize;
          this.range2ModelText = this.getFinalAriaValueText(this.range2Model) //this.ariaValueText && this.ariaValueText[this.range2Model] ? this.ariaValueText[this.range2Model] : null
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

    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      border: 0;
    }

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
        background-color: $trackColor;
        border-radius: 50%;
        // or use background image, like below
        // background: url('/assets/images/slider-right.png') no-repeat;
      }

      &:first-of-type::-webkit-slider-thumb {
        // background: url('/assets/images/slider-left.png') no-repeat;
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
        background-color: $trackColor;
        border-radius: 50%;
      }

      &:first-of-type::-moz-range-thumb {
        // background: url('/packages/vue/index/assets/images/slider-left.png') no-repeat;
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
        cursor: pointer;
        background-color: $trackColor;
        border-radius: 50%;
      }

      &:first-of-type::-ms-thumb {
        // background: url('/packages/vue/index/assets/images/slider-left.png') no-repeat;
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

    label {
      display: inline-block;
      padding-bottom: 0.25em;
      cursor: pointer;
      user-select: none;

      @include font-label();
      line-height: 1em;
    }

  }


</style>

<docs>
  ### Examples

  #### Default Range Slider
  ```jsx
  <ZrRangeSlider/>
  ```

  #### Default Range Slider with Aria value text object
  ```jsx
  <ZrRangeSlider :range-slide-min="1" :range-slide-max="7" :min-value="2" :aria-value-text="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"/>
  ```

  #### Default Range Slider with Aria value text object dual
  ```jsx
  <ZrRangeSlider :range-slide-min="1" :range-slide-max="7" :min-value="2" :max-value="5" :aria-value-text="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"/>
  ```

  #### Slider Dual preset values
  ```jsx
  <ZrRangeSlider :min-value="10" :max-value="70"/>
  ```

  #### Label before and after
  ```jsx
  <ZrRangeSlider :min-value="0" :range-slide-min="0" :range-slide-max="18000" :label-min="'Up to '"
                 :label-min-after="' lbs'"/>
  ```

  #### Label before
  ```jsx
  <ZrRangeSlider :min-value="60" :range-slide-min="60" :range-slide-max="120" :step-size="20" :label-min="'Gallons '"/>
  ```

  #### Slider Dual preset values with currency formatting
  ```jsx
  <ZrRangeSlider :min-value="0" :max-value="7000" :range-slide-min="0" :range-slide-max="18000" :unit-type="'$'"/>
  ```

  #### Slider Dual preset values with ' " formatting
  ```jsx
  <ZrRangeSlider :min-value="1" :max-value="2500" :range-slide-min="0" :range-slide-max="2500"
                 :unit-type="'foot-inch-short'"/>
  ```

  #### Slider Dual preset values with ft in formatting
  ```jsx
  <ZrRangeSlider :min-value="1" :max-value="2500" :range-slide-min="0" :range-slide-max="2500"
                 :unit-type="'foot-inch-long'"/>
  ```

  #### Default Range Slider with label
  ```jsx
  <ZrRangeSlider label="Rangeslider label" />
  ```

  #### Slider Dual preset values with ft in formatting with visually hidden label
  ```jsx
  <ZrRangeSlider :label="'My Label'" :id="'ranger-1'" :hide-label="true" :label2="'My Label2'" :id2="'ranger-2'" :hide-label2="true" :min-value="1" :max-value="2500" :range-slide-min="0" :range-slide-max="2500"
                 :unit-type="'foot-inch-long'"/>
  ```

</docs>

