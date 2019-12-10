<template>
  <span>{{formattedPrice}}</span>
</template>

<script>
  /**
   * Displays price formatted to a given currency and locale
   */

  export default {
    name: "ZrPrice",
    props: {
      /**
       * Numeric dollar value to display in the price
       */
      value: {
        type: Number,
        default: 0,
        required: true
      },
      /**
       * International currency code to format the price to (for currency symbol and price format)
       */
      currencyCode: {
        type: String,
        default: 'USD'
      },
      /**
       * Locale code to format the price to (for decimal and comma placement in price value)
       */
      locale: {
        type: String,
        default: 'en'
      }
    },
    computed: {
      formattedPrice() {
        return new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currencyCode}).format(this.value)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>

<docs>
  ### Examples

  #### Default price display
  ```jsx
  <zr-price :value="188"></zr-price>
  ```

  #### Price with cents
  ```jsx
  <zr-price :value="188.95"></zr-price>
  ```

  #### Prices in different currencies
  ```jsx
  <zr-price :value="1234567" currency-code="CAD" locale="ca-FR" :style="{display: 'block'}"></zr-price>
  <zr-price :value="1234567" currency-code="JPY" locale="ja-JP" :style="{display: 'block'}"></zr-price>
  <zr-price :value="1234567" currency-code="EUR" :style="{display: 'block'}"></zr-price>
  ```
</docs>

