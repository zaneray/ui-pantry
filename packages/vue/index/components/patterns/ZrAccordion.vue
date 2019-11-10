<template>
    <div class="accordion-container">
        <button :class="['accordion-header', {'expanded': accordionExpanded}]"
                @click="toggleAccordion"
                :aria-controls="contentId"
                :aria-expanded="accordionExpanded  ? 'true' : 'false'">
            {{header}}
            <span class="accordion-indicator"></span>
        </button>
        <transition name="accordion"
                    v-on:before-enter="beforeEnter" v-on:enter="enter"
                    v-on:before-leave="beforeLeave" v-on:leave="leave">
            <div class="accordion-content"
                 v-show="accordionExpanded"
                 ref="content"
                 :aria-hidden="!accordionExpanded ? 'true' : 'false'"
                 :id="contentId">
                <div class="accordion-content-inner">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  /**
   * A simple accordion component to display a header and content that is hidden by default,
   * and then is expanded to show the content after toggling the header button.  This component
   * is fully accessible according to W3C Standards
   */

  export default {
    name: "ZrAccordion",
    data() {
      return {
        accordionExpanded: this.expanded
      }
    },
    props: {
      header: {
        type: String,
        default: 'Accordion Header',
        required: true
      },
      name: {
        type: String,
        default: '',
        required: true
      },
      expanded: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      contentId() {
        return this.name.replace(/\s+/g, '-').toLowerCase();
      }
    },
    watch: {
      expanded(newValue) {
        this.accordionExpanded = newValue;
      }
    },
    methods: {
      toggleAccordion() {
        this.accordionExpanded = !this.accordionExpanded;
        this.$emit('toggle', this.accordionExpanded);
      },
      beforeEnter: function(el) {
        el.style.height = '0';
      },
      enter: function(el) {
        el.style.height = el.scrollHeight + 'px';
      },
      beforeLeave: function(el) {
        el.style.height = el.scrollHeight + 'px';
      },
      leave: function(el) {
        el.style.height = '0';
      }
    },
    mounted() {
      const contentEl = this.$refs.content;
      contentEl.style.height = contentEl.scrollHeight + 'px';
    }
  }
</script>

<style scoped lang="scss">
    @import '../../styles/imports';

    .accordion-header {
        position: relative;
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        margin: 0;
        padding: $margin-base 1.5rem $margin-base 0;
        line-height: 1;
        text-align: left;
        border: none;
        border-top: 1px solid $color-black;
        border-bottom: 1px solid $color-black;
        cursor: pointer;
    }

    .accordion-indicator {

        &:before,
        &:after {
            content: '';
            position: absolute;
            right: 0;
            top: calc(50% - 1px);
            display: block;
            width: 1em;
            height: 2px;
            background-color: $color-black;
            transition: $transition-base;
        }

        &:after {
            transform: rotate(90deg);
        }

        [aria-expanded="true"] & {
            &:before,
            &:after {
                transform: rotate(180deg);
            }
        }
    }

    .accordion-content {
        overflow: hidden;
        transition: $transition-base;
    }

    .accordion-content-inner {
        padding: $margin-base 0;
    }
</style>

<docs>
    ### Examples

    #### Default Accordion
    ```jsx
    <zr-accordion name="test1" header="Test Accordion">
        <div v-html="text.paragraphs"></div>
    </zr-accordion>
    ```

    #### Expanded to start, with remote toggle
    ```jsx
    const toggle= true;
    <div>
        <button @click="toggle = !toggle" :style="{marginBottom: '10px'}">Toggle Accordion</button>
        <zr-accordion name="test2" header="A Diffent Accordion" :expanded="toggle">
            <h5>A heading</h5>
            <ul>
                <li>Any</li>
                <li>Markup</li>
                <li>You</li>
                <li>Want</li>
            </ul>
        </zr-accordion>
    </div>


    ```
</docs>