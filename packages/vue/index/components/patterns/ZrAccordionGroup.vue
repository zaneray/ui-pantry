<template>
    <ul class="accordion-group">
        <li v-for="(accordion, index) in accordionContent" class="accordion-item">
            <zr-accordion :header="accordion.header"
                          :name="accordion.name || index"
                          :expanded="toggleArray[index]"
                          @toggle="groupToggle(index)">
                <div v-html="accordion.content"></div>
            </zr-accordion>
        </li>
    </ul>
</template>

<script>
  import ZrAccordion from "./ZrAccordion.vue";

  /**
   * Displays a group of accordions, based up the accordionContent prop that needs to be in the following form:
   *
   * [
   *    {
   *        name: (type String) name of the accordion item
   *        header: (type String) header label to display
   *        content: (type String) HTML to display as content inside the accordion
   *    }
   * ]
   */

  export default {
    name: "ZrAccordionGroup",
    components: {ZrAccordion},
    data() {
      return {
        toggleArray: [
          false,
          false
        ]
      }
    },
    props: {
      /**
       * Array of accordions to display
       */
      accordionContent: {
        type: Array,
        required: true,
        default: function () {
          return []
        }
      },
      /**
       * Defines whether multiple accordions can be open at once.
       */
      multipleOpen: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      groupToggle(itemIndex) {
        this.toggleArray[itemIndex] = !this.toggleArray[itemIndex];
        this.toggleArray.forEach((value, index) => {
          if (index !== itemIndex && !this.multipleOpen) {
            this.toggleArray.splice(index, 1, false)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .accordion-group {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .accordion-item {
        position: relative;

        &:not(:first-child) {
            top: -1px;
        }
    }
</style>

<docs>
    ### Examples

    #### Default Accordion Group
    ```jsx
    const content = [
        {
            name: 'test1',
            header: 'First Accordion',
            content: `<h2>Header 2</h2><p>And a paragraph</p>`
        },
        {
            name: 'test2',
            header: 'Second Accordion',
            content: 'Just a string'
        },
    ]

    <zr-accordion-group :accordion-content="content"></zr-accordion-group>
    ```

    #### Accordion that allows multiple opened panes
    ```jsx
    const content = [
        {
            name: 'test1',
            header: 'First Accordion',
            content: `<h2>Header 2</h2><p>And a paragraph</p>`
        },
        {
            name: 'test2',
            header: 'Second Accordion',
            content: 'Just a string'
        },
    ]

    <zr-accordion-group :accordion-content="content" multiple-open></zr-accordion-group>
    ```
</docs>