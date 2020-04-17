<template>
  <span>{{formattedPrice}}</span>
</template>

<script>
  /**
   * Displays price formatted to a given currency and locale.  This uses the Javascript Intl.NumberFormat utility: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   */

  export default {
    name: "ZrCurrency",
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
      },
      /**
       * Whether or not to display decimals at the end of the currency value
       */
      decimals: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      formattedPrice() {
        const price = new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currencyCode }).format(this.value);
        return this.decimals ? price : price.replace(/(\.[0-9]*?)[0-9]+/g, "");
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
  <zr-currency :value="188"></zr-currency>
  ```

  #### No decimals price display
  ```jsx
  <zr-currency :value="188.50" :decimals="false"></zr-currency>
  ```

  #### Price with cents
  ```jsx
  <zr-currency :value="188.95"></zr-currency>
  ```

  #### Prices in different currencies
  ```jsx
  <zr-currency :value="1234567" currency-code="CAD" locale="ca-FR" :style="{display: 'block'}"></zr-currency>
  <zr-currency :value="1234567" currency-code="JPY" locale="ja-JP" :style="{display: 'block'}"></zr-currency>
  <zr-currency :value="1234567.99" currency-code="EUR" :style="{display: 'block'}" :decimals="false"></zr-currency>
  ```
</docs>

