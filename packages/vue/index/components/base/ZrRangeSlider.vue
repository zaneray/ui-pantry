<template>
  <div class="range">

    <input
      type="range"
      min="1"
      max="100"
      step="1"
      aria-valuemin="1"
      aria-valuemax="100"
      aria-valuenow="50"
      ref="rangeSliderMin"
      v-model="range1Model"
      @change="rangeChanged">

    <input
      v-if="isDualSlider"
      type="range"
      min="1"
      max="100"
      step="1"
      aria-valuemin="1"
      aria-valuemax="100"
      aria-valuenow="50"
      ref="rangeSliderMax"
      v-model="range2Model"
      @change="rangeChanged"
      class="dualInput"
    >

    {{range1Model}} / {{range2Model}}

    <div class="label-min">{{labelMin}}</div>
    <div class="label-max">{{labelMax}}</div>

  </div>

</template>

<script>

  export default {
    name: "ZrRangeSlider",
    data: function () {
      return {
        range1Model: 0,
        range2Model: 0
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
        default: 'min'
      },
      /** Max Label */
      labelMax: {
        type: String,
        required: false,
        default: 'max'
      },
      /** Min Value */
      minValue: {
        type: Number,
        required: true,
        default: 0
      },
      /** Max Value */
      maxValue: {
        type: Number,
        required: true,
        default: 0
      }
    },
    beforeMount() {
      this.range1Model = this.$props.rangeSliderMin;
      this.range2Model = this.$props.rangeSliderMax;
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
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../styles/imports';

  input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  .range {
    width: 100%;
    position: relative;

    input {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 4px;
      background: rgb(0, 113, 186);
      outline: none;

      &.dualInput{
        position: absolute;
      }

    }

    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 23px;
      height: 24px;
      border: 0;
      background: url('/static/fpo/range-slider-icon.png');
      cursor: pointer;
    }

    input::-moz-range-thumb {
      width: 23px;
      height: 25px;
      border: 0;
      background: url('/static/fpo/range-slider-icon.png');
      cursor: pointer;
    }

  }


</style>

<docs>
  ### Examples

  #### Default Range Slider
  ```jsx
  <ZrRangeSlider/>
  ```

  #### Range Slider Dual
  ```jsx
  <ZrRangeSlider is-dual-slider="true"/>
  ```

  #### Range Slider with Image
  ```jsx
  <ZrRangeSlider/>
  ```
</docs>

