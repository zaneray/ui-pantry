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
        images: {
          banner_image: {
            alt: 'Image Alt Text',
            dimensions: {
              width: 1920,
              height: 960
            },
            url: '/static/fpo/1920x960-dark.jpg',
            half: {
              dimensions: {
                width: 800,
                height: 800
              },
              url: '/static/fpo/1920x560-dark.jpg'
            },
            mobile: {
              dimensions: {
                width: 800,
                height: 800
              },
              url: '/static/fpo/800x800-dark.jpg'
            },
            mobile_half: {
              dimensions: {
                width: 800,
                height: 400
              },
              url: '/static/fpo/800x400-dark.jpg'
            },
            vertical: {
              dimensions: {
                width: 1920,
                height: 960
              }
            }
          },
          banner_image_light: {
            alt: 'Image Alt Text',
            dimensions: {
              width: 1920,
              height: 960
            },
            url: '/static/fpo/1920x960-light.jpg',
            half: {
              dimensions: {
                width: 800,
                height: 800
              },
              url: '/static/fpo/1920x560-light.jpg'
            },
            mobile: {
              dimensions: {
                width: 800,
                height: 800
              },
              url: '/static/fpo/800x800-light.jpg'
            },
            mobile_half: {
              dimensions: {
                width: 800,
                height: 400
              },
              url: '/static/fpo/800x400-light.jpg'
            },
            vertical: {
              dimensions: {
                width: 1920,
                height: 960
              }
            }
          },
          galleryItems: {
            caption: 'This is a caption',
            image: {
              url: '/static/fpo/gallery-lg.jpg',
              alt: 'This is gallery image alt text',
              dimensions: {
                width: 1600,
                height: 1067
              },
              sm: {
                url: '/static/fpo/gallery-sm.jpg',
                alt: 'This is a Small Image',
                dimensions: {
                  width: 600,
                  height: 400
                }
              },
              md: {
                url: '/static/fpo/gallery-md.jpg',
                alt: 'This is a Medium Image',
                dimensions: {
                  width: 900,
                  height: 600
                }
              },
              lg: {
                url: '/static/fpo/gallery-lg.jpg',
                alt: 'This is a Large Image',
                dimensions: {
                  width: 1600,
                  height: 1067
                }
              }
            }
          },
          galleryItemsNoCaption: {
            image: {
              caption: null,
              url: '/static/fpo/gallery-lg.jpg',
              alt: 'This is gallery image alt text',
              dimensions: {
                width: 1600,
                height: 1067
              },
              sm: {
                url: '/static/fpo/gallery-sm.jpg',
                alt: 'This is a Small Image',
                dimensions: {
                  width: 600,
                  height: 400
                }
              },
              md: {
                url: '/static/fpo/gallery-md.jpg',
                alt: 'This is a Medium Image',
                dimensions: {
                  width: 900,
                  height: 600
                }
              },
              lg: {
                url: '/static/fpo/gallery-lg.jpg',
                alt: 'This is a Large Image',
                dimensions: {
                  width: 1600,
                  height: 1067
                }
              }
            }
          },
          thumbnail: {
            url: '/static/fpo/thumbnail.jpg',
            alt: 'Alt text about this thumbnail',
            dimensions: {
              width: 410,
              height: 266
            }
          }
        },
        video: {
          url: 'https://yeti-cycles-production.s3.amazonaws.com/wGH3miWgWeduxPqjQ4ML4Q8U?response-content-disposition=inline%3B%20filename%3D%22SB140_Clip_360_Alt.mp4%22%3B%20filename%2A%3DUTF-8%27%27SB140_Clip_360_Alt.mp4&response-content-type=video%2Fmp4&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAISJSE6HOY3BOJSMQ%2F20200403%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200403T042307Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=85e5b0c5bf7d910a2f430ab99b918d760208b183008587d06580247d88e99c1d'
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
