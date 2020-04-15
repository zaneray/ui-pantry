import Vue from 'vue'

// -----------------------------------------------------------
// -----------------------------------------------------------
//
// Lazy Load Directive
//
// -----------------------------------------------------------
// -----------------------------------------------------------
// Currently supported html elements are <picture> and <img>
//
// Usage: add v-lazy to the supported element tag.
//
// Supported properties: v-lazy="{ disableFade: true, root: null, rootMargin: '0px 0px 200px 0px', threshold: 0.01 }"
//
// disabledFade = disables the fading in of lazy loaded images
// root = set observer root object
// rootMargin = set margin for root object
// threshold = define the % of image / object that needs to be visible before a intersection is triggered
//
// -----------------------------------------------------------

Vue.directive('lazy', function (el, binding, vnode) {

    // store directive properties if available, otherwise create empty object
    let directiveProperties = binding.value ? binding.value : {};

    // set observer options from directive binding if available, otherwise set defaults
    const observerOptions = {
      disableFade: directiveProperties.disableFade ? directiveProperties.disableFade : false,
      root: directiveProperties.root ? directiveProperties.root : null,
      rootMargin: directiveProperties.rootMargin ? directiveProperties.rootMargin : '400px',
      threshold: directiveProperties.threshold ? directiveProperties.threshold : 0
    };

    // set transparent image base 64 before image is loaded
    // el.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');

    // attach initial class to lazy loaded <img> tag
    if (el.tagName === 'IMG') {
      // tag lazy loaded image
      el.classList.add('lazy-image');
    }

    // attach initial class to lazy loaded <picture> tag
    if (el.tagName === 'PICTURE') {
      el.children.item(el.children.length - 1).classList.add('lazy-image');
    }

    if (el.tagName === 'VIDEO') {
      el.classList.add('lazy-video');
    }

    // do we support intersection observer?
    if ("IntersectionObserver" in window) {
      // supported
      initObserver(observerOptions);
    } else {
      // not supported (ie 11, etc.)
      loadElement(el);
    }

    function emitEvent(name) {
      vnode.context.$emit(name);
    }

    function loadSrc(element, observerOptions) {

      const videoTag = element.tagName === 'VIDEO';
      const loadingClass = videoTag ? 'video-loading' : 'img-loading';
      const loadedClass = videoTag  ? 'video-loaded' : 'img-loaded';

      if (observerOptions.disableFade) {
        element.classList.add('no-fade');
      }

      // add 'loading' class to <img>
      element.classList.add(loadingClass);

      // retrieve data-src and apply value to element src (loan / show src)
      if (videoTag) {
        for (let elementChild of element.children) {
          if (elementChild.tagName === 'SOURCE') {
            elementChild.setAttribute('src', elementChild.dataset.src);
            element.load();
          }
        }
      } else {
        element.setAttribute('src', element.dataset.src);
      }

      // create image loaded event
      element.addEventListener('load', function () {
        loadedState();
      }, false);

      // create video loaded event
      element.addEventListener('loadeddata', function() {
        loadedState();
      }, false);

      function loadedState() {
        // remove 'loading' class to <img>
        element.classList.remove(loadingClass);

        // add 'loaded' class to <img>
        setTimeout(() => {
          element.classList.add(loadedClass);
          emitEvent('loaded');
        }, 50);
      }
    }

    function loadElement(element, observerOptions) {

      // -----------------------------------------------------------
      // case IMAGE || VIDEO tag
      // -----------------------------------------------------------
      if (element.tagName === 'IMG' || element.tagName === 'VIDEO') {
        loadSrc(element, observerOptions);
      }

      // -----------------------------------------------------------
      // case PICTURE tag
      // -----------------------------------------------------------
      if (element.tagName === 'PICTURE') {

        // loop on picture elements children
        for (let elementChild of element.children) {

          // case SOURCE
          if (elementChild.tagName === 'SOURCE') {
            // retrieve data-src and apply value to element srcset (loan / show image)
            elementChild.setAttribute('srcset', elementChild.dataset.src);
            emitEvent('loaded');
          }

          // case IMG
          if (elementChild.tagName === 'IMG') {
            loadSrc(elementChild, observerOptions);
          }

        }
      }
    }

    function initObserver(observerOptions) {

      // create observer instance
      const observer = new IntersectionObserver(((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const intersectingElement = entry.target;
            loadElement(intersectingElement, observerOptions);
            observer.unobserve(intersectingElement);
            observer.disconnect();
          }
        })
      }), observerOptions);

      // add element to intersection observer
      observer.observe(el);

    }

  }
);
