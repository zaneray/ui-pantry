/**
 * @mixin
 * This mixin sets up all shared properties between the input wrapper and all base input index
 */

export const inputShared = {
  props: {
    /**
     * This value populates the id attribute AND the name attribute, if omitted
     */
    id: {
      type: [String, Number],
      required: true
    },
    /**
     * This value populates the name attribute of the input
     */
    name: {
      type: String,
    },
    /**
     * This value displays in a label element above the input
     */
    label: {
      type: String,
      required: true
    },
    /**
     * Populates the title attribute of the input, which drives HTML tooltip and validation language
     */
    title: {
      type: String
    },
    /**
     * Whether or not the input should be full width or not. Default width is 240px
     */
    full: {
      type: Boolean,
      default: false
    },
    /**
     * Whether or not the input is required.  If true, will display required text and required form validation
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * Must be true for the required label to display, only if `required` is also set to true
     */
    requiredLabel: {
      type: Boolean,
      default: true
    },
    /**
     * HTML5 validation message to show, if validation applies to this input (required, pattern, type, min, max, etc)
     */
    validationMessage: {
      type: String
    },
    /**
     * Whether the input is valid based on value inputted
     */
    valid: {
      type: Boolean
    },
    /**
     * Whether the input is invalid based on value inputted
     */
    invalid: {
      type: Boolean
    },
    /**
     * Input disabled or not
     */
    disabled: {
      type: Boolean,
      default: false
    }

  },
  mounted: function() {
    if (this.validationMessage) {
      var input = document.getElementById(this.id);
      input.oninvalid = function(e) {
        var el = e.target;
        el.setCustomValidity('');
        if (!el.validity.valid) {
          el.setCustomValidity(this.validationMessage);
        }
      };
      input.oninput = function(e) {
        e.target.setCustomValidity('');
      };
    }
  }
}
