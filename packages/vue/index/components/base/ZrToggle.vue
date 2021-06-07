<template>
  <div class="zr-toggle" :class="{'disabled': disabled}">
    <button role="switch" :aria-checked="toggleActive" :id="id" class="toggle-button" @click="toggle">
      <span class="toggle-indicator"></span>
    </button>
    <label :for="id" class="toggle-label">{{label}}</label>
  </div>
</template>

<script>
export default {
  /**
   * Accessible toggle component to indicate an "on/off" state
   */

  name: 'ZrToggle',
  props: {
    /**
     * Unique ID for the toggle input
     */
    id: {
      type: String,
      required: true
    },
    /**
     * Label for the toggle input
     */
    label: {
      type: String,
      required: true
    },
    /**
     * Whether or not the toggle is active by default
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * Whether or not the toggle is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toggleActive: false
    }
  },
  methods: {
    toggle() {
      this.toggleActive = !this.toggleActive;
      this.$emit('toggle', this.toggleActive);
    }
  },
  watch: {
    active: {
      immediate: true,
      handler: function(newVal) {
        this.toggleActive = newVal;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.zr-toggle {
  display: flex;
  align-items: center;
}

.toggle-button {

}
</style>

<docs>
```jsx
<zr-toggle id="toggle1" label="Toggle Input" />
```
</docs>
