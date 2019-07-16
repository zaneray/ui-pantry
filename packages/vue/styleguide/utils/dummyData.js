import Vue from 'vue'

Vue.mixin({
    data() {
      return {
        text: {
          paragraph_short: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum finibus mi at molestie. Integer aliquet ultricies cursus. </p>`,
          paragraph: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum finibus mi at molestie. Integer aliquet ultricies cursus. Mauris suscipit velit quis metus gravida, semper porttitor metus posuere. Donec bibendum vel tortor id auctor. Pellentesque rutrum accumsan interdum. Morbi elementum, nibh id malesuada gravida, sapien mi fringilla nisl, sit amet rutrum dui velit quis est. Suspendisse mollis, dolor vitae auctor interdum, eros elit iaculis arcu,</p>`,
          paragraphs: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum finibus mi at molestie. Integer aliquet ultricies cursus. Mauris suscipit velit quis metus gravida, semper porttitor metus posuere. Donec bibendum vel tortor id auctor.</p><p> Pellentesque rutrum accumsan interdum. Morbi elementum, nibh id malesuada gravida, sapien mi fringilla nisl, sit amet rutrum dui velit quis est. Suspendisse mollis, dolor vitae auctor interdum, eros elit iaculis arcu,</p>`,
          sentence: `<p>Donec bibendum vel tortor id auctor.</p>`,
          headings: {
            h1: `<h1>Fusce ac massa ac nisi lobortis</h1>`,
            h2: `<h2>Duis sit amet libero at mi lacinia porttitor</h2>`,
            h3: `<h3>Aliquam id commodo velit, nec ultricies nisl</h3>`,
            h4: `<h4>Mauris vestibulum dui dui</h4>`,
            h5: `<h5>Quisque auctor lacus vel ipsum</h5>`,
            h6: `<h6>In hac habitasse platea dictumst</h6>`,
          },
          string: {
            short: 'The quick brown fox jumps over the lazy dog.',
            long: 'orem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dictum finibus mi at molestie. Integer aliquet ultricies cursus. Mauris suscipit velit quis metus gravida, semper porttitor metus posuere. Donec bibendum vel tortor id auctor.'
          }
        },
        selectOptions: [
          { label: 'Option 1', value: 1},
          { label: 'Option 2', value: 2},
          { label: 'Option 3', value: 3},
          { label: 'Option 4', value: 4}
        ]
      }
    }
  }
)
