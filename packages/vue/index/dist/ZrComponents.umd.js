(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.common = factory());
}(this, (function () { 'use strict';

  //
  //
  //
  //
  //
  //
  var script = {
    name: "ZrAlert",
    props: {
      /**
       * alert type options `primary` is default, `secondary`, `success`, `danger`, `warning`
       */
      type: {
        type: String,
        "default": 'primary'
      },

      /**
       * text string to be displayed
       */
      message: {
        type: String,
        required: true
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: "alert alert--" + _vm.type, attrs: { role: "alert" } },
      [_vm._v("\n    " + _vm._s(_vm.message) + "\n")]
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-460e55ff_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-460e55ff {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.alert[data-v-460e55ff] {\n  position: relative;\n  padding: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n.alert--primary[data-v-460e55ff] {\n  color: #004085;\n  background-color: #cce5ff;\n  border-color: #b8daff;\n}\n.alert--secondary[data-v-460e55ff] {\n  color: #383d41;\n  background-color: #e2e3e5;\n  border-color: #d6d8db;\n}\n.alert--success[data-v-460e55ff] {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb;\n}\n.alert--danger[data-v-460e55ff] {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n}\n.alert--warning[data-v-460e55ff] {\n  color: #856404;\n  background-color: #fff3cd;\n  border-color: #ffeeba;\n}\n\n/*# sourceMappingURL=ZrAlert.vue.map */", map: {"version":3,"sources":["ZrAlert.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrAlert.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;ACwBA;;EAAA;AAgBA;;EAAA;ADjCA;;EAEE;AACF;;EAEE;ACSF;EACA,kBAAA;EACA,aAAA;EACA,6BAAA;EACA,sBAAA;ADPA;ACSA;EACA,cATA;EAUA,yBAAA;EACA,qBATA;ADEA;ACUA;EACA,cAZA;EAaA,yBAZA;EAaA,qBAZA;ADIA;ACWA;EACA,cAfA;EAgBA,yBAAA;EACA,qBAfA;ADMA;ACYA;EACA,cAlBA;EAmBA,yBAlBA;EAmBA,qBAlBA;ADQA;ACaA;EACA,cArBA;EAsBA,yBAAA;EACA,qBArBA;ADUA;;AAEA,sCAAsC","file":"ZrAlert.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.alert {\n  position: relative;\n  padding: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n.alert--primary {\n  color: #004085;\n  background-color: #cce5ff;\n  border-color: #b8daff;\n}\n.alert--secondary {\n  color: #383d41;\n  background-color: #e2e3e5;\n  border-color: #d6d8db;\n}\n.alert--success {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb;\n}\n.alert--danger {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb;\n}\n.alert--warning {\n  color: #856404;\n  background-color: #fff3cd;\n  border-color: #ffeeba;\n}\n\n/*# sourceMappingURL=ZrAlert.vue.map */","<template>\n    <div :class=\"`alert alert--${type}`\" role=\"alert\">\n        {{message}}\n    </div>\n</template>\n\n<script>\n    export default {\n      name: \"ZrAlert\",\n      props: {\n        /**\n         * alert type options `primary` is default, `secondary`, `success`, `danger`, `warning`\n         */\n        type: {\n          type: String,\n          default: 'primary'\n        },\n        /**\n         * text string to be displayed\n         */\n        message: {\n          type: String,\n          required: true\n        }\n      }\n    }\n</script>\n\n<style scoped lang=\"scss\">\n    @import '../../styles/imports';\n\n    .alert {\n        position: relative;\n        padding: $margin-base;\n        border: 1px solid transparent;\n        border-radius: .25rem;\n\n        &--primary {\n            color: $color-alert-primary-text;\n            background-color: $color-alert-primary-bg;\n            border-color: $color-alert-primary-border;\n        }\n\n        &--secondary {\n            color: $color-alert-secondary-text;\n            background-color: $color-alert-secondary-bg;\n            border-color: $color-alert-secondary-border;\n        }\n\n        &--success {\n            color: $color-alert-success-text;\n            background-color: $color-alert-success-bg;\n            border-color: $color-alert-success-border;\n        }\n\n        &--danger {\n            color: $color-alert-danger-text;\n            background-color: $color-alert-danger-bg;\n            border-color: $color-alert-danger-border;\n        }\n\n        &--warning {\n            color: $color-alert-warning-text;\n            background-color: $color-alert-warning-bg;\n            border-color: $color-alert-warning-border;\n        }\n    }\n</style>\n\n<docs>\n    ### Primary Alert\n    ```jsx\n    <ZrAlert message=\"This is a primary alert\"></ZrAlert>\n    ```\n\n    ### Secondary Alert\n    ```jsx\n    <ZrAlert message=\"This is a secondary alert\" type=\"secondary\"></ZrAlert>\n    ```\n\n    ### Success Alert\n    ```jsx\n    <ZrAlert message=\"This is a success alert\" type=\"success\"></ZrAlert>\n    ```\n\n    ### Danger Alert\n    ```jsx\n    <ZrAlert message=\"This is a danger alert\" type=\"danger\"></ZrAlert>\n    ```\n\n    ### Warning Alert\n    ```jsx\n    <ZrAlert message=\"This is a warning alert\" type=\"warning\"></ZrAlert>\n    ```\n</docs>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-460e55ff";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  /**
   * BaseButton is a robust button component built to handle all use cases of a basic button
   */
  var script$1 = {
    name: "ZrButton",
    props: {
      /**
       * Theme of button to display.  This adds a class of ".btn-{{theme}}", which can be used to scope styles
       */
      theme: {
        type: String,
        "default": 'default'
      },

      /**
       * Size of button to be displayed
       */
      size: {
        type: String,
        "default": 'md'
      },

      /**
       * Type of button to render (button, reset, submit)
       */
      type: {
        type: String,
        "default": null,
        validator: function validator(value) {
          return ['button', 'reset', 'submit'].indexOf(value) !== -1;
        }
      },

      /**
       * Whether or not the button is disabled
       */
      disabled: {
        type: Boolean,
        "default": false
      },

      /**
       * Text to use in the HTML title attribute on the button
       */
      title: {
        type: String,
        "default": null
      },

      /**
       * Gives button a width of 100% of its parent container
       */
      full: {
        type: Boolean,
        "default": false
      },

      /**
       * Displays button inline
       */
      inline: {
        type: Boolean,
        "default": false
      },

      /**
       * Toggles the button loading state
       */
      loading: {
        type: Boolean,
        "default": false
      },

      /**
       * Path to follow on click.  Renders a link element instead of button
       */
      linkPath: {
        type: String,
        "default": null
      },

      /**
       * Defines whether this is an external link.  If true, renders an 'a' tag.  If false, renders router-link or nuxt-link (if supporting "to" prop exists)
       */
      externalLink: {
        type: Boolean,
        "default": false
      },

      /**
       * Whether to render <nuxt-link> instead of <router-link> when using the 'to' prop
       */
      nuxt: {
        type: Boolean,
        "default": false
      },

      /**
       * Target for traditional link
       */
      target: {
        type: String,
        "default": '_self',
        validator: function validator(value) {
          return ['_self', '_blank', '_parent', '_top'].includes(value);
        }
      }
    },
    computed: {
      btnClass: function btnClass() {
        return ['btn', "btn-".concat(this.size), "btn-".concat(this.theme), {
          'disabled': this.disabled,
          'active': this.active,
          'full-width': this.full,
          'inline': this.inline,
          'loading': this.loading
        }];
      },
      componentType: function componentType() {
        if (this.linkPath) {
          if (this.externalLink) {
            return 'a';
          }

          return this.nuxt ? 'nuxt-link' : 'router-link';
        } else {
          return 'button';
        }
      },
      btnLinkProps: function btnLinkProps() {
        var linkProps = {};

        if (this.linkPath) {
          if (this.externalLink) {
            linkProps.href = this.linkPath;
            linkProps.target = this.target;
          } else {
            linkProps.to = this.linkPath;
          }
        }

        return linkProps;
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      _vm.componentType,
      _vm._b(
        {
          tag: "component",
          class: _vm.btnClass,
          attrs: { type: _vm.type, title: _vm.title, disabled: _vm.disabled }
        },
        "component",
        _vm.btnLinkProps,
        false
      ),
      [
        _c("span", { staticClass: "label" }, [_vm._t("default")], 2),
        _vm._v(" "),
        _c("span", { staticClass: "loading-container" }, [
          _c("span", { staticClass: "loading-indicator" })
        ])
      ]
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-b48b2cee_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-b48b2cee {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.btn[data-v-b48b2cee] {\n  appearance: none;\n  -webkit-appearance: none;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  text-align: center;\n  text-decoration: none;\n  padding: calc(0.75em + 1px) 2.5em;\n  font-size: 1rem;\n  color: #FFFDFA;\n  cursor: pointer;\n  user-select: none;\n  background-color: #2A2928;\n  border: 2px solid transparent;\n  transition: all 0.25s ease-out;\n}\n.btn[data-v-b48b2cee]:hover, .btn.active[data-v-b48b2cee] {\n  background-color: #181817;\n}\n.btn-default[data-v-b48b2cee] {\n  background-color: #1a4939;\n}\n.btn-default[data-v-b48b2cee]:hover, .btn-default.active[data-v-b48b2cee] {\n  background-color: #13362a;\n}\n.btn-action[data-v-b48b2cee] {\n  background-color: #d23838;\n}\n.btn-action[data-v-b48b2cee]:hover, .btn-action.active[data-v-b48b2cee] {\n  background-color: #c42c2c;\n}\n.btn-info[data-v-b48b2cee] {\n  background-color: #577D91;\n}\n.btn-info[data-v-b48b2cee]:hover, .btn-info.active[data-v-b48b2cee] {\n  background-color: #446271;\n}\n.btn-negative[data-v-b48b2cee] {\n  background-color: #fff;\n  color: #181817;\n}\n.btn-negative[data-v-b48b2cee]:hover, .btn-negative.active[data-v-b48b2cee] {\n  background-color: #e6e6e6;\n}\n.btn-transparent[data-v-b48b2cee] {\n  background-color: transparent;\n  border-color: #2A2928;\n  color: #2A2928;\n}\n.btn-transparent[data-v-b48b2cee]:hover, .btn-transparent.active[data-v-b48b2cee] {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.btn-sm[data-v-b48b2cee] {\n  padding: calc(0.5em + 1px) 1.25em;\n}\n.btn-lg[data-v-b48b2cee] {\n  padding: calc(1em + 1px) 3.75em;\n  font-size: 1.125rem;\n}\n.btn-responsive[data-v-b48b2cee] {\n  min-width: 0;\n  padding: calc(0.5em + 1px) 1.25em;\n}\n@media (min-width: 800px) {\n.btn-responsive[data-v-b48b2cee] {\n    min-width: 15rem;\n    padding: calc(0.75em + 1px) 2.5em;\n}\n}\n.disabled[data-v-b48b2cee] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.full-width[data-v-b48b2cee] {\n  width: 100%;\n}\n.inline[data-v-b48b2cee] {\n  display: inline-flex;\n  width: auto;\n}\n.loading[data-v-b48b2cee] {\n  pointer-events: none;\n}\n.loading .label[data-v-b48b2cee] {\n  opacity: 0;\n}\n.loading .loading-container[data-v-b48b2cee] {\n  opacity: 1;\n}\n.label[data-v-b48b2cee] {\n  opacity: 1;\n  transition: opacity all 0.25s ease-out;\n}\n.loading-container[data-v-b48b2cee] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  opacity: 0;\n  transition: opacity all 0.25s ease-out;\n}\n.loading-indicator[data-v-b48b2cee] {\n  height: 1em;\n  width: 1em;\n  border-radius: 50%;\n  border: 3px solid #fff;\n  border-left-color: transparent;\n  border-top-color: transparent;\n  display: inline-block;\n  animation: SPIN-data-v-b48b2cee 1s infinite cubic-bezier(0.48, 0.17, 0.49, 0.78);\n}\n\n/*# sourceMappingURL=ZrButton.vue.map */", map: {"version":3,"sources":["ZrButton.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrButton.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;AACA;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AC0IF;EACA,gBAAA;EACA,wBAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,kBAAA;EACA,kBAAA;EACA,qBAAA;EACA,iCAAA;EACA,eAAA;EACA,cAAA;EACA,eAAA;EACA,iBAAA;EACA,yBAAA;EACA,6BAAA;EACA,8BAAA;ADxIA;AC0IA;EACA,yBAAA;ADxIA;AC6IA;EACA,yBAAA;AD1IA;AC4IA;EACA,yBAAA;AD1IA;AC8IA;EACA,yBAAA;AD3IA;AC6IA;EACA,yBAAA;AD3IA;AC+IA;EACA,yBAAA;AD5IA;AC8IA;EACA,yBAAA;AD5IA;ACgJA;EACA,sBAAA;EACA,cAAA;AD7IA;AC+IA;EACA,yBAAA;AD7IA;ACiJA;EACA,6BAAA;EACA,qBAAA;EACA,cAAA;AD9IA;ACgJA;EACA,qCAAA;AD9IA;ACkJA;EACA,iCAAA;AD/IA;ACkJA;EACA,+BAAA;EACA,mBAAA;AD/IA;ACkJA;EACA,YAAA;EACA,iCAAA;AD/IA;ACgJA;AAHA;IAIA,gBAAA;IACA,iCAAA;AD7IE;AACF;ACgJA;EACA,YAAA;EACA,mBAAA;AD7IA;ACgJA;EACA,WAAA;AD7IA;ACgJA;EACA,oBAAA;EACA,WAAA;AD7IA;ACgJA;EACA,oBAAA;AD7IA;AC+IA;EACA,UAAA;AD7IA;ACgJA;EACA,UAAA;AD9IA;ACkJA;EACA,UAAA;EACA,sCAAA;AD/IA;ACkJA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,qCAAA;EACA,UAAA;EACA,sCAAA;AD/IA;ACkJA;EACA,WAAA;EACA,UAAA;EACA,kBAAA;EACA,sBAAA;EACA,8BAAA;EACA,6BAAA;EACA,qBAAA;EACA,gFAAA;AD/IA;;AAEA,uCAAuC","file":"ZrButton.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.btn {\n  appearance: none;\n  -webkit-appearance: none;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: fit-content;\n  text-align: center;\n  text-decoration: none;\n  padding: calc(0.75em + 1px) 2.5em;\n  font-size: 1rem;\n  color: #FFFDFA;\n  cursor: pointer;\n  user-select: none;\n  background-color: #2A2928;\n  border: 2px solid transparent;\n  transition: all 0.25s ease-out;\n}\n.btn:hover, .btn.active {\n  background-color: #181817;\n}\n\n.btn-default {\n  background-color: #1a4939;\n}\n.btn-default:hover, .btn-default.active {\n  background-color: #13362a;\n}\n\n.btn-action {\n  background-color: #d23838;\n}\n.btn-action:hover, .btn-action.active {\n  background-color: #c42c2c;\n}\n\n.btn-info {\n  background-color: #577D91;\n}\n.btn-info:hover, .btn-info.active {\n  background-color: #446271;\n}\n\n.btn-negative {\n  background-color: #fff;\n  color: #181817;\n}\n.btn-negative:hover, .btn-negative.active {\n  background-color: #e6e6e6;\n}\n\n.btn-transparent {\n  background-color: transparent;\n  border-color: #2A2928;\n  color: #2A2928;\n}\n.btn-transparent:hover, .btn-transparent.active {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.btn-sm {\n  padding: calc(0.5em + 1px) 1.25em;\n}\n\n.btn-lg {\n  padding: calc(1em + 1px) 3.75em;\n  font-size: 1.125rem;\n}\n\n.btn-responsive {\n  min-width: 0;\n  padding: calc(0.5em + 1px) 1.25em;\n}\n@media (min-width: 800px) {\n  .btn-responsive {\n    min-width: 15rem;\n    padding: calc(0.75em + 1px) 2.5em;\n  }\n}\n\n.disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.full-width {\n  width: 100%;\n}\n\n.inline {\n  display: inline-flex;\n  width: auto;\n}\n\n.loading {\n  pointer-events: none;\n}\n.loading .label {\n  opacity: 0;\n}\n.loading .loading-container {\n  opacity: 1;\n}\n\n.label {\n  opacity: 1;\n  transition: opacity all 0.25s ease-out;\n}\n\n.loading-container {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  opacity: 0;\n  transition: opacity all 0.25s ease-out;\n}\n\n.loading-indicator {\n  height: 1em;\n  width: 1em;\n  border-radius: 50%;\n  border: 3px solid #fff;\n  border-left-color: transparent;\n  border-top-color: transparent;\n  display: inline-block;\n  animation: SPIN 1s infinite cubic-bezier(0.48, 0.17, 0.49, 0.78);\n}\n\n/*# sourceMappingURL=ZrButton.vue.map */","<template>\n    <component\n            :is=\"componentType\"\n            :class=\"btnClass\"\n            :type=\"type\"\n            v-bind=\"btnLinkProps\"\n            :title=\"title\"\n            :disabled=\"disabled\">\n        <span class=\"label\">\n            <slot></slot>\n        </span>\n        <span class=\"loading-container\">\n            <span class=\"loading-indicator\"></span>\n        </span>\n    </component>\n</template>\n\n<script>\n  /**\n   * BaseButton is a robust button component built to handle all use cases of a basic button\n   */\n\n  export default {\n    name: \"ZrButton\",\n    props: {\n      /**\n       * Theme of button to display.  This adds a class of \".btn-{{theme}}\", which can be used to scope styles\n       */\n      theme: {\n        type: String,\n        default: 'default'\n      },\n      /**\n       * Size of button to be displayed\n       */\n      size: {\n        type: String,\n        default: 'md'\n      },\n      /**\n       * Type of button to render (button, reset, submit)\n       */\n      type: {\n        type: String,\n        default: null,\n        validator: function (value) {\n          return ['button', 'reset', 'submit'].indexOf(value) !== -1\n        }\n      },\n      /**\n       * Whether or not the button is disabled\n       */\n      disabled: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * Text to use in the HTML title attribute on the button\n       */\n      title: {\n        type: String,\n        default: null\n      },\n      /**\n       * Gives button a width of 100% of its parent container\n       */\n      full: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * Displays button inline\n       */\n      inline: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * Toggles the button loading state\n       */\n      loading: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * Path to follow on click.  Renders a link element instead of button\n       */\n      linkPath: {\n        type: String,\n        default: null\n      },\n      /**\n       * Defines whether this is an external link.  If true, renders an 'a' tag.  If false, renders router-link or nuxt-link (if supporting \"to\" prop exists)\n       */\n      externalLink: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * Whether to render <nuxt-link> instead of <router-link> when using the 'to' prop\n       */\n      nuxt: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * Target for traditional link\n       */\n      target: {\n        type: String,\n        default: '_self',\n        validator: function (value) {\n          return ['_self', '_blank', '_parent', '_top'].includes(value)\n        }\n      }\n    },\n    computed: {\n      btnClass() {\n        return [\n          'btn', `btn-${this.size}`, `btn-${this.theme}`,\n          {\n            'disabled': this.disabled,\n            'active': this.active,\n            'full-width': this.full,\n            'inline': this.inline,\n            'loading': this.loading\n          }\n        ];\n      },\n      componentType() {\n        if (this.linkPath) {\n          if (this.externalLink) {\n            return 'a'\n          }\n          return this.nuxt ? 'nuxt-link' : 'router-link'\n        } else {\n          return 'button'\n        }\n      },\n      btnLinkProps() {\n        const linkProps = {};\n\n        if (this.linkPath) {\n          if (this.externalLink) {\n            linkProps.href = this.linkPath;\n            linkProps.target = this.target\n          } else {\n            linkProps.to = this.linkPath;\n          }\n        }\n\n        return linkProps\n      },\n    },\n  }\n</script>\n\n<style scoped lang=\"scss\">\n    @import '../../styles/imports';\n\n    .btn {\n        appearance: none;\n        -webkit-appearance: none;\n        position: relative;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: fit-content;\n        text-align: center;\n        text-decoration: none;\n        padding: $button-padding;\n        font-size: 1rem;\n        color: $color-lightest;\n        cursor: pointer;\n        user-select: none;\n        background-color: $color-darker;\n        border: 2px solid transparent;\n        transition: all 0.25s ease-out;\n\n        &:hover, &.active {\n            background-color: $color-darkest;\n        }\n\n    }\n\n    .btn-default {\n        background-color: $color-primary;\n\n        &:hover, &.active {\n            background-color: $color-primary-dark;\n        }\n    }\n\n    .btn-action {\n        background-color: $color-action;\n\n        &:hover, &.active {\n            background-color: $color-action-dark;\n        }\n    }\n\n    .btn-info {\n        background-color: $color-info;\n\n        &:hover, &.active {\n            background-color: darken($color-info, 10%);\n        }\n    }\n\n    .btn-negative {\n        background-color: $color-white;\n        color: $color-darkest;\n\n        &:hover, &.active {\n            background-color: darken($color-white, 10%);\n        }\n    }\n\n    .btn-transparent {\n        background-color: transparent;\n        border-color: $color-darker;\n        color: $color-darker;\n\n        &:hover, &.active {\n            background-color: rgba(0, 0, 0, .05);\n        }\n    }\n\n    .btn-sm {\n        padding: $button-padding-sm;\n    }\n\n    .btn-lg {\n        padding: $button-padding-lg;\n        font-size: $font-size-medium;\n    }\n\n    .btn-responsive {\n        min-width: 0;\n        padding: $button-padding-sm;\n        @media(min-width: $screen-sm) {\n            min-width: $input-default-width;\n            padding: $button-padding;\n        }\n    }\n\n    .disabled {\n        opacity: 0.5;\n        cursor: not-allowed;\n    }\n\n    .full-width {\n        width: 100%;\n    }\n\n    .inline {\n        display: inline-flex;\n        width: auto;\n    }\n\n    .loading {\n        pointer-events: none;\n\n        .label {\n            opacity: 0;\n        }\n\n        .loading-container {\n            opacity: 1;\n        }\n    }\n\n    .label {\n        opacity: 1;\n        transition: opacity $transition-base;\n    }\n\n    .loading-container {\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        transform: translate3d(-50%, -50%, 0);\n        opacity: 0;\n        transition: opacity $transition-base;\n    }\n\n    .loading-indicator {\n        height: 1em;\n        width: 1em;\n        border-radius: 50%;\n        border: 3px solid $color-white;\n        border-left-color: transparent;\n        border-top-color: transparent;\n        display: inline-block;\n        animation: SPIN 1s infinite cubic-bezier(.48,.17,.49,.78);\n    }\n</style>\n\n<docs>\n    ### Examples\n\n    #### Button Themes\n    ```jsx\n    <ZrButton style=\"margin-bottom: 10px\">Default</ZrButton>\n    <ZrButton theme=\"action\" style=\"margin-bottom: 10px\">Action</ZrButton>\n    <ZrButton theme=\"info\" style=\"margin-bottom: 10px\">Info</ZrButton>\n    <ZrButton theme=\"transparent\" style=\"margin-bottom: 10px\">Transparent</ZrButton>\n    <ZrButton theme=\"negative\" style=\"margin-bottom: 10px\">Negative</ZrButton>\n    ```\n\n    #### Button Sizes\n    ```jsx\n    <ZrButton size=\"sm\" style=\"margin-bottom: 10px\">Small</ZrButton>\n    <ZrButton style=\"margin-bottom: 10px\">Default</ZrButton>\n    <ZrButton size=\"lg\" style=\"margin-bottom: 10px\">Large</ZrButton>\n    ```\n\n    #### Button States\n    ```jsx\n    <ZrButton disabled style=\"margin-bottom: 10px\">Disabled</ZrButton>\n    <ZrButton loading style=\"margin-bottom: 10px\">Loading</ZrButton>\n    ```\n    #### Button Display Options\n    ```jsx\n    <ZrButton full style=\"margin-bottom: 10px\">Full Width</ZrButton>\n    <ZrButton inline>Inline 1</ZrButton>\n    <ZrButton inline>Inline 2</ZrButton>\n    ```\n\n    #### Button Link Types\n    ```jsx\n    <ZrButton style=\"margin-bottom: 10px\">Button</ZrButton>\n    <ZrButton link-path=\"www.google.com\" external-link style=\"margin-bottom: 10px\">Standard Link</ZrButton>\n    <ZrButton link-path=\"/product/path\" style=\"margin-bottom: 10px\">Router Link</ZrButton>\n    <ZrButton link-path=\"/product/path\" nuxt>Nuxt Link</ZrButton>\n    ```\n</docs>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = "data-v-b48b2cee";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  /**
   * @mixin
   * This mixin sets up all shared properties between the input wrapper and all base input index
   */
  var inputShared = {
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
        type: String
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
        "default": false
      },

      /**
       * Whether or not the input is required.  If true, will display required text and required form validation
       */
      required: {
        type: Boolean,
        "default": false
      },

      /**
       * Must be true for the required label to display, only if `required` is also set to true
       */
      requiredLabel: {
        type: Boolean,
        "default": true
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
        "default": false
      }
    },
    mounted: function mounted() {
      if (this.validationMessage) {
        var input = document.getElementById(this.id);

        input.oninvalid = function (e) {
          var el = e.target;
          el.setCustomValidity('');

          if (!el.validity.valid) {
            el.setCustomValidity(this.validationMessage);
          }
        };

        input.oninput = function (e) {
          e.target.setCustomValidity('');
        };
      }
    }
  };

  /**
   * A custom checkbox component.  @change event fires on checkbox change
   */

  var script$2 = {
    name: "ZrCheckbox",
    inheritAttrs: false,
    mixins: [inputShared],
    props: _objectSpread2(_objectSpread2({}, inputShared.props), {}, {
      /**
       * Value to associate with the checkbox
       */
      value: {
        type: [String, Number],
        required: true
      },

      /**
       * Whether or not the checkbox is selected by default
       */
      selected: {
        type: Boolean,
        "default": false
      }
    }),
    methods: {
      inputChanged: function inputChanged($event) {
        this.$emit('change', this.value);
        this.$emit('changeEvent', $event);
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "checkbox" }, [
      _c(
        "input",
        _vm._b(
          {
            attrs: {
              type: "checkbox",
              name: _vm.name,
              id: _vm.id,
              disabled: _vm.disabled
            },
            domProps: { value: _vm.value, checked: _vm.selected },
            on: {
              change: function($event) {
                return _vm.inputChanged($event)
              }
            }
          },
          "input",
          _vm.$attrs,
          false
        )
      ),
      _vm._v(" "),
      _c("label", { attrs: { for: _vm.id } }, [_vm._v(_vm._s(_vm.label))])
    ])
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    const __vue_inject_styles__$2 = function (inject) {
      if (!inject) return
      inject("data-v-e23da7b4_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-e23da7b4 {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\ninput[data-v-e23da7b4] {\n  position: absolute;\n  width: 0;\n  height: 0;\n  opacity: 0;\n  margin: 0;\n  padding: 0;\n}\ninput:checked + label[data-v-e23da7b4]:after {\n  opacity: 1;\n  transform: rotate(-50deg) scale(1);\n}\nlabel[data-v-e23da7b4] {\n  position: relative;\n  display: block;\n  font-family: sans-serif;\n  font-size: 16px;\n  line-height: 1.5em;\n  padding-left: 2.25em;\n  vertical-align: middle;\n  cursor: pointer;\n}\nlabel[data-v-e23da7b4]:before, label[data-v-e23da7b4]:after {\n  content: \"\";\n  position: absolute;\n  display: block;\n}\nlabel[data-v-e23da7b4]:before {\n  top: 50%;\n  left: 0;\n  width: 1.5em;\n  height: 1.5em;\n  border: 1px solid #2A2928;\n  transform: translateY(-50%);\n}\nlabel[data-v-e23da7b4]:after {\n  opacity: 0;\n  left: 0.3em;\n  top: 25%;\n  width: 0.9em;\n  height: 0.45em;\n  border-left: 2px solid #595755;\n  border-bottom: 2px solid #595755;\n  transform: rotate(-30deg) scale(0);\n  transition: all 0.25s ease-out;\n}\n\n/*# sourceMappingURL=ZrCheckbox.vue.map */", map: {"version":3,"sources":["ZrCheckbox.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrCheckbox.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;AACA;;EAEE;AACF;;EAEE;ACmDF;;EAAA;AAgBA;;EAAA;AA1BA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,SAAA;EACA,UAAA;ADjCA;ACoCA;EACA,UAAA;EACA,kCAAA;ADlCA;ACuCA;EACA,kBAAA;EACA,cAAA;EACA,uBAAA;EACA,eAAA;EACA,kBAAA;EACA,oBAAA;EACA,sBAAA;EACA,eAAA;ADpCA;ACsCA;EAEA,WAAA;EACA,kBAAA;EACA,cAAA;ADrCA;ACwCA;EACA,QAAA;EACA,OAAA;EACA,YAtCA;EAuCA,aAvCA;EAwCA,yBAAA;EACA,2BAAA;ADtCA;ACyCA;EACA,UAAA;EACA,WAAA;EACA,QAAA;EACA,YAAA;EACA,cAAA;EACA,8BAAA;EACA,gCAAA;EACA,kCAAA;EACA,8BAAA;ADvCA;;AAEA,yCAAyC","file":"ZrCheckbox.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\ninput {\n  position: absolute;\n  width: 0;\n  height: 0;\n  opacity: 0;\n  margin: 0;\n  padding: 0;\n}\ninput:checked + label:after {\n  opacity: 1;\n  transform: rotate(-50deg) scale(1);\n}\n\nlabel {\n  position: relative;\n  display: block;\n  font-family: sans-serif;\n  font-size: 16px;\n  line-height: 1.5em;\n  padding-left: 2.25em;\n  vertical-align: middle;\n  cursor: pointer;\n}\nlabel:before, label:after {\n  content: \"\";\n  position: absolute;\n  display: block;\n}\nlabel:before {\n  top: 50%;\n  left: 0;\n  width: 1.5em;\n  height: 1.5em;\n  border: 1px solid #2A2928;\n  transform: translateY(-50%);\n}\nlabel:after {\n  opacity: 0;\n  left: 0.3em;\n  top: 25%;\n  width: 0.9em;\n  height: 0.45em;\n  border-left: 2px solid #595755;\n  border-bottom: 2px solid #595755;\n  transform: rotate(-30deg) scale(0);\n  transition: all 0.25s ease-out;\n}\n\n/*# sourceMappingURL=ZrCheckbox.vue.map */","<template>\n    <div class=\"checkbox\">\n        <input type=\"checkbox\"\n               :name=\"name\"\n               :id=\"id\"\n               :value=\"value\"\n               :checked=\"selected\"\n               @change=\"inputChanged($event)\"\n               v-bind=\"$attrs\"\n               :disabled=\"disabled\"\n        />\n        <label :for=\"id\">{{label}}</label>\n    </div>\n</template>\n\n<script>\n  import {inputShared} from \"../../mixins/inputShared\";\n\n  /**\n   * A custom checkbox component.  @change event fires on checkbox change\n   */\n\n  export default {\n    name: \"ZrCheckbox\",\n    inheritAttrs: false,\n    mixins: [inputShared],\n    props: {\n      ...inputShared.props,\n      /**\n       * Value to associate with the checkbox\n       */\n      value: {\n        type: [String, Number],\n        required: true\n      },\n      /**\n       * Whether or not the checkbox is selected by default\n       */\n      selected: {\n        type: Boolean,\n        default: false\n      }\n    },\n    methods: {\n      inputChanged($event) {\n        this.$emit('change', this.value);\n        this.$emit('changeEvent', $event);\n      }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n    @import '../../styles/imports';\n\n    $checkbox-width: 1.5em;\n\n    input {\n        position: absolute;\n        width: 0;\n        height: 0;\n        opacity: 0;\n        margin: 0;\n        padding: 0;\n\n        &:checked + label {\n            &:after {\n                opacity: 1;\n                transform: rotate(-50deg) scale(1);\n            }\n        }\n    }\n\n    label {\n        position: relative;\n        display: block;\n        font-family: sans-serif;\n        font-size: 16px;\n        line-height: 1.5em;\n        padding-left: $checkbox-width * 1.5;\n        vertical-align: middle;\n        cursor: pointer;\n\n        &:before,\n        &:after {\n            content: '';\n            position: absolute;\n            display: block;\n        }\n\n        &:before {\n            top: 50%;\n            left: 0;\n            width: $checkbox-width;\n            height: $checkbox-width;\n            border: 1px solid $color-darker;\n            transform: translateY(-50%);\n        }\n\n        &:after {\n            opacity: 0;\n            left: 0.3em;\n            top: 25%;\n            width: $checkbox-width * 0.6;\n            height: $checkbox-width * 0.3;\n            border-left: 2px solid $color-dark;\n            border-bottom: 2px solid $color-dark;\n            transform: rotate(-30deg) scale(0);\n            transition: all 0.25s ease-out;\n        }\n    }\n</style>\n\n<docs>\n    ### Examples\n\n    #### Default Checkbox\n    ```jsx\n    <ZrCheckbox label=\"Checkbox Label\" value=\"1\" id=\"check1\"></ZrCheckbox>\n    ```\n\n    #### Default Checkbox Disabled\n    ```jsx\n    <ZrCheckbox label=\"Checkbox Label\" value=\"1\" id=\"check1-disabled\" :disabled=\"true\"></ZrCheckbox>\n    ```\n\n    #### Selected Checkbox\n    ```jsx\n    <ZrCheckbox label=\"Label Here\" value=\"2\" id=\"check2\" selected></ZrCheckbox>\n    ```\n</docs>\n\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$2 = "data-v-e23da7b4";
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  /**
   * A custom counter component used to allow a user to increment a number
   */
  var script$3 = {
    name: "ZrCounter",
    props: {
      /**
       * Initial number for the counter to start at
       */
      value: {
        type: Number,
        "default": 0
      },

      /**
       * Label to display next to the count (should be singular, i.e. Hat not Hats)
       */
      countLabel: {
        type: String
      },

      /**
       * Minimum value that the counter can have
       */
      min: {
        type: Number
      },

      /**
       * Maximum value that the counter can have
       */
      max: {
        type: Number
      },

      /**
       * Error message to display
       */
      errorMessage: {
        type: String,
        "default": 'That is too many.'
      }
    },
    data: function data() {
      return {
        count: 0,
        showError: false
      };
    },
    computed: {
      displayLabel: function displayLabel() {
        if (!this.countLabel) {
          return '';
        } else {
          return this.count === 1 ? " ".concat(this.countLabel) : " ".concat(this.countLabel, "s");
        }
      }
    },
    methods: {
      increment: function increment(amount) {
        var newCount = this.count + amount;
        this.count = this.checkAgainstMaxAndMin(newCount, this.min, this.max);
        this.$emit('input', this.count);
      },
      checkAgainstMaxAndMin: function checkAgainstMaxAndMin(count, min, max) {
        var newCount;

        if (min && count < min) {
          newCount = min;
        } else if (max && count > max) {
          this.showError = true;
          newCount = max;
        } else {
          newCount = count;
          this.showError = false;
        }

        return newCount;
      }
    },
    beforeMount: function beforeMount() {
      this.count = this.checkAgainstMaxAndMin(this.value, this.min, this.max);
    }
  };

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$3 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "counter-wrapper-outer" }, [
      _c("div", { staticClass: "counter-wrapper" }, [
        _c(
          "button",
          {
            staticClass: "stepper stepper-negative",
            on: {
              click: function($event) {
                return _vm.increment(-1)
              }
            }
          },
          [_vm._v("-")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "total" }, [
          _vm._v(_vm._s(_vm.count) + _vm._s(_vm.displayLabel))
        ]),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "stepper stepper-positive",
            on: {
              click: function($event) {
                return _vm.increment(1)
              }
            }
          },
          [_vm._v("+")]
        )
      ]),
      _vm._v(" "),
      _vm.showError
        ? _c("div", { staticClass: "counter-error" }, [
            _vm._v("\n    " + _vm._s(_vm.errorMessage) + "\n  ")
          ])
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    const __vue_inject_styles__$3 = function (inject) {
      if (!inject) return
      inject("data-v-109a9471_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-109a9471 {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.counter-wrapper-outer[data-v-109a9471] {\n  position: relative;\n}\n.counter-wrapper[data-v-109a9471] {\n  display: flex;\n  justify-content: center;\n}\n.stepper[data-v-109a9471] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 3rem;\n  background-color: #2A2928;\n  color: #fff;\n  font-weight: bold;\n  font-size: 1.75rem;\n  appearance: none;\n}\n.total[data-v-109a9471] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 5rem;\n  height: 3rem;\n  border-top: 2px solid #2A2928;\n  border-bottom: 2px solid #2A2928;\n  font-family: sans-serif;\n  font-weight: 700;\n}\n.counter-error[data-v-109a9471] {\n  background: #d23838;\n  color: #fff;\n  display: inline-block;\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  font-size: 1.125rem;\n  font-weight: 700;\n  padding: 1rem;\n  z-index: 1000;\n  top: calc(100% + 1.5rem);\n  min-width: 270px;\n  max-width: 380px;\n}\n.counter-error[data-v-109a9471]:after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  bottom: 100%;\n  transform: translateX(-4rem);\n  border-bottom: 1.5rem solid #d23838;\n  border-right: 1.5rem solid transparent;\n}\n\n/*# sourceMappingURL=ZrCounter.vue.map */", map: {"version":3,"sources":["ZrCounter.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrCounter.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;AACA;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;AC6EF;EACA,kBAAA;AD3EA;AC8EA;EACA,aAAA;EACA,uBAAA;AD3EA;AC8EA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;EACA,yBAAA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;EACA,gBAAA;AD3EA;AC8EA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;EACA,YAAA;EACA,6BAAA;EACA,gCAAA;EACA,uBAAA;EACA,gBAAA;AD3EA;AC8EA;EACA,mBAAA;EACA,WAAA;EACA,qBAAA;EACA,kBAAA;EACA,SAAA;EACA,2BAAA;EACA,mBAAA;EACA,gBAAA;EACA,aAAA;EACA,aAAA;EACA,wBAAA;EACA,gBAAA;EACA,gBAAA;AD3EA;AC6EA;EACA,WAAA;EACA,kBAAA;EACA,SAAA;EACA,YAAA;EACA,4BAAA;EACA,mCAAA;EACA,sCAAA;AD3EA;;AAEA,wCAAwC","file":"ZrCounter.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.counter-wrapper-outer {\n  position: relative;\n}\n\n.counter-wrapper {\n  display: flex;\n  justify-content: center;\n}\n\n.stepper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 3rem;\n  background-color: #2A2928;\n  color: #fff;\n  font-weight: bold;\n  font-size: 1.75rem;\n  appearance: none;\n}\n\n.total {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 5rem;\n  height: 3rem;\n  border-top: 2px solid #2A2928;\n  border-bottom: 2px solid #2A2928;\n  font-family: sans-serif;\n  font-weight: 700;\n}\n\n.counter-error {\n  background: #d23838;\n  color: #fff;\n  display: inline-block;\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n  font-size: 1.125rem;\n  font-weight: 700;\n  padding: 1rem;\n  z-index: 1000;\n  top: calc(100% + 1.5rem);\n  min-width: 270px;\n  max-width: 380px;\n}\n.counter-error:after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  bottom: 100%;\n  transform: translateX(-4rem);\n  border-bottom: 1.5rem solid #d23838;\n  border-right: 1.5rem solid transparent;\n}\n\n/*# sourceMappingURL=ZrCounter.vue.map */","<template>\n  <div class=\"counter-wrapper-outer\">\n    <div class=\"counter-wrapper\">\n      <button class=\"stepper stepper-negative\" @click=\"increment(-1)\">-</button>\n      <div class=\"total\">{{count}}{{displayLabel}}</div>\n      <button class=\"stepper stepper-positive\" @click=\"increment(1)\">+</button>\n    </div>\n    <div v-if=\"showError\" class=\"counter-error\">\n      {{errorMessage}}\n    </div>\n  </div>\n</template>\n\n<script>\n\n  /**\n   * A custom counter component used to allow a user to increment a number\n   */\n  export default {\n    name: \"ZrCounter\",\n    props: {\n      /**\n       * Initial number for the counter to start at\n       */\n      value: {\n        type: Number,\n        default: 0\n      },\n      /**\n       * Label to display next to the count (should be singular, i.e. Hat not Hats)\n       */\n      countLabel: {\n        type: String\n      },\n      /**\n       * Minimum value that the counter can have\n       */\n      min: {\n        type: Number\n      },\n      /**\n       * Maximum value that the counter can have\n       */\n      max: {\n        type: Number\n      },\n      /**\n       * Error message to display\n       */\n      errorMessage: {\n        type: String,\n        default: 'That is too many.'\n      }\n    },\n    data() {\n      return {\n        count: 0,\n        showError: false\n      }\n    },\n    computed: {\n      displayLabel() {\n        if (!this.countLabel) {\n          return ''\n        } else {\n          return this.count === 1 ? ` ${this.countLabel}` : ` ${this.countLabel}s`\n        }\n      }\n    },\n    methods: {\n      increment(amount) {\n        const newCount = this.count + amount;\n        this.count = this.checkAgainstMaxAndMin(newCount, this.min, this.max);\n        this.$emit('input', this.count);\n      },\n      checkAgainstMaxAndMin(count, min, max) {\n        let newCount;\n        if (min && count < min) {\n          newCount = min;\n        } else if (max && count > max) {\n          this.showError = true;\n          newCount = max;\n        } else {\n          newCount = count;\n          this.showError = false;\n        }\n        return newCount;\n      }\n    },\n    beforeMount() {\n      this.count = this.checkAgainstMaxAndMin(this.value, this.min, this.max);\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n  @import '../../styles/imports';\n  $counter-background-color: $color-darker;\n\n  .counter-wrapper-outer {\n    position: relative;\n  }\n\n  .counter-wrapper {\n    display: flex;\n    justify-content: center;\n  }\n\n  .stepper {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 3rem;\n    background-color: $counter-background-color;\n    color: $color-white;\n    font-weight: bold;\n    font-size: $font-size-large;\n    appearance: none;\n  }\n\n  .total {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 5rem;\n    height: 3rem;\n    border-top: 2px solid $counter-background-color;\n    border-bottom: 2px solid $counter-background-color;\n    font-family: sans-serif;\n    font-weight: $font-weight-bold;\n  }\n\n  .counter-error {\n    background: $color-action;\n    color: $color-white;\n    display: inline-block;\n    position: absolute;\n    left: 50%;\n    transform: translateX(-50%);\n    font-size: $font-size-medium;\n    font-weight: 700;\n    padding: 1rem;\n    z-index: 1000;\n    top: calc(100% + 1.5rem);\n    min-width: 270px;\n    max-width: 380px;\n\n    &:after {\n      content: '';\n      position: absolute;\n      left: 50%;\n      bottom: 100%;\n      transform: translateX(-4rem);\n      border-bottom: 1.5rem solid $color-action;\n      border-right: 1.5rem solid transparent;\n    }\n  }\n</style>\n\n<docs>\n  ### Basic Counter\n  ```jsx\n  <ZrCounter></ZrCounter>\n  ```\n\n  ### Counter with Label\n  ```jsx\n  <ZrCounter :count-label=\"'Bag'\"></ZrCounter>\n  ```\n\n  ### Counter with Label and initial value\n  ```jsx\n  <ZrCounter :value=\"3\" :count-label=\"'Hat'\"></ZrCounter>\n  ```\n\n  ### Counter with min and max\n  ```jsx\n  <ZrCounter :min=\"4\" :max=\"11\"></ZrCounter>\n  ```\n</docs>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$3 = "data-v-109a9471";
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      createInjector,
      undefined,
      undefined
    );

  /*!
   * Vue.js v2.6.11
   * (c) 2014-2019 Evan You
   * Released under the MIT License.
   */
  /*  */

  var emptyObject = Object.freeze({});

  // These helpers produce better VM code in JS engines due to their
  // explicitness and function inlining.
  function isUndef (v) {
    return v === undefined || v === null
  }

  function isDef (v) {
    return v !== undefined && v !== null
  }

  function isTrue (v) {
    return v === true
  }

  function isFalse (v) {
    return v === false
  }

  /**
   * Check if value is primitive.
   */
  function isPrimitive (value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      // $flow-disable-line
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
  }

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }

  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString = Object.prototype.toString;

  function toRawType (value) {
    return _toString.call(value).slice(8, -1)
  }

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }

  function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
  }

  /**
   * Check if val is a valid array index.
   */
  function isValidArrayIndex (val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val)
  }

  function isPromise (val) {
    return (
      isDef(val) &&
      typeof val.then === 'function' &&
      typeof val.catch === 'function'
    )
  }

  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString (val) {
    return val == null
      ? ''
      : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val)
  }

  /**
   * Convert an input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber (val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
  }

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap (
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }

  /**
   * Check if a tag is a built-in tag.
   */
  var isBuiltInTag = makeMap('slot,component', true);

  /**
   * Check if an attribute is a reserved attribute.
   */
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

  /**
   * Remove an item from an array.
   */
  function remove (arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }

  /**
   * Check whether an object has the property.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }

  /**
   * Create a cached version of a pure function.
   */
  function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
    })
  }

  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
  });

  /**
   * Capitalize a string.
   */
  var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  });

  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
  });

  /**
   * Simple bind polyfill for environments that do not support it,
   * e.g., PhantomJS 1.x. Technically, we don't need this anymore
   * since native bind is now performant enough in most browsers.
   * But removing it would mean breaking code that was able to run in
   * PhantomJS 1.x, so this must be kept for backward compatibility.
   */

  /* istanbul ignore next */
  function polyfillBind (fn, ctx) {
    function boundFn (a) {
      var l = arguments.length;
      return l
        ? l > 1
          ? fn.apply(ctx, arguments)
          : fn.call(ctx, a)
        : fn.call(ctx)
    }

    boundFn._length = fn.length;
    return boundFn
  }

  function nativeBind (fn, ctx) {
    return fn.bind(ctx)
  }

  var bind = Function.prototype.bind
    ? nativeBind
    : polyfillBind;

  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray (list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret
  }

  /**
   * Mix properties into target object.
   */
  function extend (to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to
  }

  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject (arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res
  }

  /* eslint-disable no-unused-vars */

  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
  function noop (a, b, c) {}

  /**
   * Always return false.
   */
  var no = function (a, b, c) { return false; };

  /* eslint-enable no-unused-vars */

  /**
   * Return the same value.
   */
  var identity = function (_) { return _; };

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual (a, b) {
    if (a === b) { return true }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function (e, i) {
            return looseEqual(e, b[i])
          })
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime()
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function (key) {
            return looseEqual(a[key], b[key])
          })
        } else {
          /* istanbul ignore next */
          return false
        }
      } catch (e) {
        /* istanbul ignore next */
        return false
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
  }

  /**
   * Return the first index at which a loosely equal value can be
   * found in the array (if value is a plain object, the array must
   * contain an object of the same shape), or -1 if it is not present.
   */
  function looseIndexOf (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) { return i }
    }
    return -1
  }

  /**
   * Ensure a function is called only once.
   */
  function once (fn) {
    var called = false;
    return function () {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    }
  }

  var SSR_ATTR = 'data-server-rendered';

  var ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ];

  var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
  ];

  /*  */



  var config = ({
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: process.env.NODE_ENV !== 'production',

    /**
     * Whether to enable devtools
     */
    devtools: process.env.NODE_ENV !== 'production',

    /**
     * Whether to record perf
     */
    performance: false,

    /**
     * Error handler for watcher errors
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,

    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,

    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,

    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,

    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,

    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: true,

    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS
  });

  /*  */

  /**
   * unicode letters used for parsing html tags, component names and property paths.
   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
   */
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

  /**
   * Check if a string starts with $ or _
   */
  function isReserved (str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
  }

  /**
   * Define a property.
   */
  function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }

  /**
   * Parse simple path.
   */
  var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
  function parsePath (path) {
    if (bailRE.test(path)) {
      return
    }
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }

  /*  */

  // can we use __proto__?
  var hasProto = '__proto__' in {};

  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
  var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
  var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
  var isPhantomJS = UA && /phantomjs/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);

  // Firefox has a "watch" function on Object.prototype...
  var nativeWatch = ({}).watch;

  var supportsPassive = false;
  if (inBrowser) {
    try {
      var opts = {};
      Object.defineProperty(opts, 'passive', ({
        get: function get () {
          /* istanbul ignore next */
          supportsPassive = true;
        }
      })); // https://github.com/facebook/flow/issues/285
      window.addEventListener('test-passive', null, opts);
    } catch (e) {}
  }

  // this needs to be lazy-evaled because vue may be required before
  // vue-server-renderer can set VUE_ENV
  var _isServer;
  var isServerRendering = function () {
    if (_isServer === undefined) {
      /* istanbul ignore if */
      if (!inBrowser && !inWeex && typeof global !== 'undefined') {
        // detect presence of vue-server-renderer and avoid
        // Webpack shimming the process
        _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
      } else {
        _isServer = false;
      }
    }
    return _isServer
  };

  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  /* istanbul ignore next */
  function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }

  var hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

  var _Set;
  /* istanbul ignore if */ // $flow-disable-line
  if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
  } else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = /*@__PURE__*/(function () {
      function Set () {
        this.set = Object.create(null);
      }
      Set.prototype.has = function has (key) {
        return this.set[key] === true
      };
      Set.prototype.add = function add (key) {
        this.set[key] = true;
      };
      Set.prototype.clear = function clear () {
        this.set = Object.create(null);
      };

      return Set;
    }());
  }

  /*  */

  var warn = noop;
  var tip = noop;
  var generateComponentTrace = (noop); // work around flow check
  var formatComponentName = (noop);

  if (process.env.NODE_ENV !== 'production') {
    var hasConsole = typeof console !== 'undefined';
    var classifyRE = /(?:^|[-_])(\w)/g;
    var classify = function (str) { return str
      .replace(classifyRE, function (c) { return c.toUpperCase(); })
      .replace(/[-_]/g, ''); };

    warn = function (msg, vm) {
      var trace = vm ? generateComponentTrace(vm) : '';

      if (config.warnHandler) {
        config.warnHandler.call(null, msg, vm, trace);
      } else if (hasConsole && (!config.silent)) {
        console.error(("[Vue warn]: " + msg + trace));
      }
    };

    tip = function (msg, vm) {
      if (hasConsole && (!config.silent)) {
        console.warn("[Vue tip]: " + msg + (
          vm ? generateComponentTrace(vm) : ''
        ));
      }
    };

    formatComponentName = function (vm, includeFile) {
      if (vm.$root === vm) {
        return '<Root>'
      }
      var options = typeof vm === 'function' && vm.cid != null
        ? vm.options
        : vm._isVue
          ? vm.$options || vm.constructor.options
          : vm;
      var name = options.name || options._componentTag;
      var file = options.__file;
      if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
      }

      return (
        (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
        (file && includeFile !== false ? (" at " + file) : '')
      )
    };

    var repeat = function (str, n) {
      var res = '';
      while (n) {
        if (n % 2 === 1) { res += str; }
        if (n > 1) { str += str; }
        n >>= 1;
      }
      return res
    };

    generateComponentTrace = function (vm) {
      if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
          if (tree.length > 0) {
            var last = tree[tree.length - 1];
            if (last.constructor === vm.constructor) {
              currentRecursiveSequence++;
              vm = vm.$parent;
              continue
            } else if (currentRecursiveSequence > 0) {
              tree[tree.length - 1] = [last, currentRecursiveSequence];
              currentRecursiveSequence = 0;
            }
          }
          tree.push(vm);
          vm = vm.$parent;
        }
        return '\n\nfound in\n\n' + tree
          .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
              ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
              : formatComponentName(vm))); })
          .join('\n')
      } else {
        return ("\n\n(found in " + (formatComponentName(vm)) + ")")
      }
    };
  }

  /*  */

  var uid = 0;

  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   */
  var Dep = function Dep () {
    this.id = uid++;
    this.subs = [];
  };

  Dep.prototype.addSub = function addSub (sub) {
    this.subs.push(sub);
  };

  Dep.prototype.removeSub = function removeSub (sub) {
    remove(this.subs, sub);
  };

  Dep.prototype.depend = function depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  };

  Dep.prototype.notify = function notify () {
    // stabilize the subscriber list first
    var subs = this.subs.slice();
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort(function (a, b) { return a.id - b.id; });
    }
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };

  // The current target watcher being evaluated.
  // This is globally unique because only one watcher
  // can be evaluated at a time.
  Dep.target = null;
  var targetStack = [];

  function pushTarget (target) {
    targetStack.push(target);
    Dep.target = target;
  }

  function popTarget () {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
  }

  /*  */

  var VNode = function VNode (
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  };

  var prototypeAccessors = { child: { configurable: true } };

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  prototypeAccessors.child.get = function () {
    return this.componentInstance
  };

  Object.defineProperties( VNode.prototype, prototypeAccessors );

  var createEmptyVNode = function (text) {
    if ( text === void 0 ) text = '';

    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node
  };

  function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val))
  }

  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  function cloneVNode (vnode) {
    var cloned = new VNode(
      vnode.tag,
      vnode.data,
      // #7975
      // clone children array to avoid mutating original in case of cloning
      // a child.
      vnode.children && vnode.children.slice(),
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions,
      vnode.asyncFactory
    );
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned
  }

  /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */

  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);

  var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ];

  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break
        case 'splice':
          inserted = args.slice(2);
          break
      }
      if (inserted) { ob.observeArray(inserted); }
      // notify change
      ob.dep.notify();
      return result
    });
  });

  /*  */

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

  /**
   * In some cases we may want to disable observation inside a component's
   * update computation.
   */
  var shouldObserve = true;

  function toggleObserving (value) {
    shouldObserve = value;
  }

  /**
   * Observer class that is attached to each observed
   * object. Once attached, the observer converts the target
   * object's property keys into getter/setters that
   * collect dependencies and dispatch updates.
   */
  var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i]);
    }
  };

  /**
   * Observe a list of Array items.
   */
  Observer.prototype.observeArray = function observeArray (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };

  // helpers

  /**
   * Augment a target Object or Array by intercepting
   * the prototype chain using __proto__
   */
  function protoAugment (target, src) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
  }

  /**
   * Augment a target Object or Array by defining
   * hidden properties.
   */
  /* istanbul ignore next */
  function copyAugment (target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      def(target, key, src[key]);
    }
  }

  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe (value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob
  }

  /**
   * Define a reactive property on an Object.
   */
  function defineReactive$$1 (
    obj,
    key,
    val,
    customSetter,
    shallow
  ) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }

    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if (process.env.NODE_ENV !== 'production' && customSetter) {
          customSetter();
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) { return }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
  }

  /**
   * Set a property on an object. Adds the new property and
   * triggers change notification if the property doesn't
   * already exist.
   */
  function set (target, key, val) {
    if (process.env.NODE_ENV !== 'production' &&
      (isUndef(target) || isPrimitive(target))
    ) {
      warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val
    }
    if (key in target && !(key in Object.prototype)) {
      target[key] = val;
      return val
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      process.env.NODE_ENV !== 'production' && warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
        'at runtime - declare it upfront in the data option.'
      );
      return val
    }
    if (!ob) {
      target[key] = val;
      return val
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val
  }

  /**
   * Delete a property and trigger change if necessary.
   */
  function del (target, key) {
    if (process.env.NODE_ENV !== 'production' &&
      (isUndef(target) || isPrimitive(target))
    ) {
      warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key, 1);
      return
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      process.env.NODE_ENV !== 'production' && warn(
        'Avoid deleting properties on a Vue instance or its root $data ' +
        '- just set it to null.'
      );
      return
    }
    if (!hasOwn(target, key)) {
      return
    }
    delete target[key];
    if (!ob) {
      return
    }
    ob.dep.notify();
  }

  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray (value) {
    for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
      e = value[i];
      e && e.__ob__ && e.__ob__.dep.depend();
      if (Array.isArray(e)) {
        dependArray(e);
      }
    }
  }

  /*  */

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;

  /**
   * Options with restrictions
   */
  if (process.env.NODE_ENV !== 'production') {
    strats.el = strats.propsData = function (parent, child, vm, key) {
      if (!vm) {
        warn(
          "option \"" + key + "\" can only be used during instance " +
          'creation with the `new` keyword.'
        );
      }
      return defaultStrat(parent, child)
    };
  }

  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData (to, from) {
    if (!from) { return to }
    var key, toVal, fromVal;

    var keys = hasSymbol
      ? Reflect.ownKeys(from)
      : Object.keys(from);

    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      // in case the object is already observed...
      if (key === '__ob__') { continue }
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (
        toVal !== fromVal &&
        isPlainObject(toVal) &&
        isPlainObject(fromVal)
      ) {
        mergeData(toVal, fromVal);
      }
    }
    return to
  }

  /**
   * Data
   */
  function mergeDataOrFn (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      // in a Vue.extend merge, both should be functions
      if (!childVal) {
        return parentVal
      }
      if (!parentVal) {
        return childVal
      }
      // when parentVal & childVal are both present,
      // we need to return a function that returns the
      // merged result of both functions... no need to
      // check if parentVal is a function here because
      // it has to be a function to pass previous merges.
      return function mergedDataFn () {
        return mergeData(
          typeof childVal === 'function' ? childVal.call(this, this) : childVal,
          typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
        )
      }
    } else {
      return function mergedInstanceDataFn () {
        // instance merge
        var instanceData = typeof childVal === 'function'
          ? childVal.call(vm, vm)
          : childVal;
        var defaultData = typeof parentVal === 'function'
          ? parentVal.call(vm, vm)
          : parentVal;
        if (instanceData) {
          return mergeData(instanceData, defaultData)
        } else {
          return defaultData
        }
      }
    }
  }

  strats.data = function (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      if (childVal && typeof childVal !== 'function') {
        process.env.NODE_ENV !== 'production' && warn(
          'The "data" option should be a function ' +
          'that returns a per-instance value in component ' +
          'definitions.',
          vm
        );

        return parentVal
      }
      return mergeDataOrFn(parentVal, childVal)
    }

    return mergeDataOrFn(parentVal, childVal, vm)
  };

  /**
   * Hooks and props are merged as arrays.
   */
  function mergeHook (
    parentVal,
    childVal
  ) {
    var res = childVal
      ? parentVal
        ? parentVal.concat(childVal)
        : Array.isArray(childVal)
          ? childVal
          : [childVal]
      : parentVal;
    return res
      ? dedupeHooks(res)
      : res
  }

  function dedupeHooks (hooks) {
    var res = [];
    for (var i = 0; i < hooks.length; i++) {
      if (res.indexOf(hooks[i]) === -1) {
        res.push(hooks[i]);
      }
    }
    return res
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */
  function mergeAssets (
    parentVal,
    childVal,
    vm,
    key
  ) {
    var res = Object.create(parentVal || null);
    if (childVal) {
      process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
      return extend(res, childVal)
    } else {
      return res
    }
  }

  ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
  });

  /**
   * Watchers.
   *
   * Watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */
  strats.watch = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) { parentVal = undefined; }
    if (childVal === nativeWatch) { childVal = undefined; }
    /* istanbul ignore if */
    if (!childVal) { return Object.create(parentVal || null) }
    if (process.env.NODE_ENV !== 'production') {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal) { return childVal }
    var ret = {};
    extend(ret, parentVal);
    for (var key$1 in childVal) {
      var parent = ret[key$1];
      var child = childVal[key$1];
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      ret[key$1] = parent
        ? parent.concat(child)
        : Array.isArray(child) ? child : [child];
    }
    return ret
  };

  /**
   * Other object hashes.
   */
  strats.props =
  strats.methods =
  strats.inject =
  strats.computed = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    if (childVal && process.env.NODE_ENV !== 'production') {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal) { return childVal }
    var ret = Object.create(null);
    extend(ret, parentVal);
    if (childVal) { extend(ret, childVal); }
    return ret
  };
  strats.provide = mergeDataOrFn;

  /**
   * Default strategy.
   */
  var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };

  /**
   * Validate component names
   */
  function checkComponents (options) {
    for (var key in options.components) {
      validateComponentName(key);
    }
  }

  function validateComponentName (name) {
    if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
      warn(
        'Invalid component name: "' + name + '". Component names ' +
        'should conform to valid custom element name in html5 specification.'
      );
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + name
      );
    }
  }

  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps (options, vm) {
    var props = options.props;
    if (!props) { return }
    var res = {};
    var i, val, name;
    if (Array.isArray(props)) {
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          name = camelize(val);
          res[name] = { type: null };
        } else if (process.env.NODE_ENV !== 'production') {
          warn('props must be strings when using array syntax.');
        }
      }
    } else if (isPlainObject(props)) {
      for (var key in props) {
        val = props[key];
        name = camelize(key);
        res[name] = isPlainObject(val)
          ? val
          : { type: val };
      }
    } else if (process.env.NODE_ENV !== 'production') {
      warn(
        "Invalid value for option \"props\": expected an Array or an Object, " +
        "but got " + (toRawType(props)) + ".",
        vm
      );
    }
    options.props = res;
  }

  /**
   * Normalize all injections into Object-based format
   */
  function normalizeInject (options, vm) {
    var inject = options.inject;
    if (!inject) { return }
    var normalized = options.inject = {};
    if (Array.isArray(inject)) {
      for (var i = 0; i < inject.length; i++) {
        normalized[inject[i]] = { from: inject[i] };
      }
    } else if (isPlainObject(inject)) {
      for (var key in inject) {
        var val = inject[key];
        normalized[key] = isPlainObject(val)
          ? extend({ from: key }, val)
          : { from: val };
      }
    } else if (process.env.NODE_ENV !== 'production') {
      warn(
        "Invalid value for option \"inject\": expected an Array or an Object, " +
        "but got " + (toRawType(inject)) + ".",
        vm
      );
    }
  }

  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives (options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def$$1 = dirs[key];
        if (typeof def$$1 === 'function') {
          dirs[key] = { bind: def$$1, update: def$$1 };
        }
      }
    }
  }

  function assertObjectType (name, value, vm) {
    if (!isPlainObject(value)) {
      warn(
        "Invalid value for option \"" + name + "\": expected an Object, " +
        "but got " + (toRawType(value)) + ".",
        vm
      );
    }
  }

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  function mergeOptions (
    parent,
    child,
    vm
  ) {
    if (process.env.NODE_ENV !== 'production') {
      checkComponents(child);
    }

    if (typeof child === 'function') {
      child = child.options;
    }

    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives(child);

    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm);
        }
      }
    }

    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField (key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options
  }

  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset (
    options,
    type,
    id,
    warnMissing
  ) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return
    }
    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) { return assets[id] }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
      warn(
        'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
        options
      );
    }
    return res
  }

  /*  */



  function validateProp (
    key,
    propOptions,
    propsData,
    vm
  ) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    // boolean casting
    var booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
      if (absent && !hasOwn(prop, 'default')) {
        value = false;
      } else if (value === '' || value === hyphenate(key)) {
        // only cast empty string / same name to boolean if
        // boolean has higher priority
        var stringIndex = getTypeIndex(String, prop.type);
        if (stringIndex < 0 || booleanIndex < stringIndex) {
          value = true;
        }
      }
    }
    // check default value
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop, key);
      // since the default value is a fresh copy,
      // make sure to observe it.
      var prevShouldObserve = shouldObserve;
      toggleObserving(true);
      observe(value);
      toggleObserving(prevShouldObserve);
    }
    if (
      process.env.NODE_ENV !== 'production' &&
      // skip validation for weex recycle-list child component props
      !(false)
    ) {
      assertProp(prop, key, value, vm, absent);
    }
    return value
  }

  /**
   * Get the default value of a prop.
   */
  function getPropDefaultValue (vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
      return undefined
    }
    var def = prop.default;
    // warn against non-factory defaults for Object & Array
    if (process.env.NODE_ENV !== 'production' && isObject(def)) {
      warn(
        'Invalid default value for prop "' + key + '": ' +
        'Props with type Object/Array must use a factory function ' +
        'to return the default value.',
        vm
      );
    }
    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm && vm.$options.propsData &&
      vm.$options.propsData[key] === undefined &&
      vm._props[key] !== undefined
    ) {
      return vm._props[key]
    }
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return typeof def === 'function' && getType(prop.type) !== 'Function'
      ? def.call(vm)
      : def
  }

  /**
   * Assert whether a prop is valid.
   */
  function assertProp (
    prop,
    name,
    value,
    vm,
    absent
  ) {
    if (prop.required && absent) {
      warn(
        'Missing required prop: "' + name + '"',
        vm
      );
      return
    }
    if (value == null && !prop.required) {
      return
    }
    var type = prop.type;
    var valid = !type || type === true;
    var expectedTypes = [];
    if (type) {
      if (!Array.isArray(type)) {
        type = [type];
      }
      for (var i = 0; i < type.length && !valid; i++) {
        var assertedType = assertType(value, type[i]);
        expectedTypes.push(assertedType.expectedType || '');
        valid = assertedType.valid;
      }
    }

    if (!valid) {
      warn(
        getInvalidTypeMessage(name, value, expectedTypes),
        vm
      );
      return
    }
    var validator = prop.validator;
    if (validator) {
      if (!validator(value)) {
        warn(
          'Invalid prop: custom validator check failed for prop "' + name + '".',
          vm
        );
      }
    }
  }

  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

  function assertType (value, type) {
    var valid;
    var expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
      var t = typeof value;
      valid = t === expectedType.toLowerCase();
      // for primitive wrapper objects
      if (!valid && t === 'object') {
        valid = value instanceof type;
      }
    } else if (expectedType === 'Object') {
      valid = isPlainObject(value);
    } else if (expectedType === 'Array') {
      valid = Array.isArray(value);
    } else {
      valid = value instanceof type;
    }
    return {
      valid: valid,
      expectedType: expectedType
    }
  }

  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
   */
  function getType (fn) {
    var match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ''
  }

  function isSameType (a, b) {
    return getType(a) === getType(b)
  }

  function getTypeIndex (type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1
    }
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i
      }
    }
    return -1
  }

  function getInvalidTypeMessage (name, value, expectedTypes) {
    var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', '));
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
    var expectedValue = styleValue(value, expectedType);
    var receivedValue = styleValue(value, receivedType);
    // check if we need to specify expected value
    if (expectedTypes.length === 1 &&
        isExplicable(expectedType) &&
        !isBoolean(expectedType, receivedType)) {
      message += " with value " + expectedValue;
    }
    message += ", got " + receivedType + " ";
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
      message += "with value " + receivedValue + ".";
    }
    return message
  }

  function styleValue (value, type) {
    if (type === 'String') {
      return ("\"" + value + "\"")
    } else if (type === 'Number') {
      return ("" + (Number(value)))
    } else {
      return ("" + value)
    }
  }

  function isExplicable (value) {
    var explicitTypes = ['string', 'number', 'boolean'];
    return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
  }

  function isBoolean () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
  }

  /*  */

  function handleError (err, vm, info) {
    // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
    // See: https://github.com/vuejs/vuex/issues/1505
    pushTarget();
    try {
      if (vm) {
        var cur = vm;
        while ((cur = cur.$parent)) {
          var hooks = cur.$options.errorCaptured;
          if (hooks) {
            for (var i = 0; i < hooks.length; i++) {
              try {
                var capture = hooks[i].call(cur, err, vm, info) === false;
                if (capture) { return }
              } catch (e) {
                globalHandleError(e, cur, 'errorCaptured hook');
              }
            }
          }
        }
      }
      globalHandleError(err, vm, info);
    } finally {
      popTarget();
    }
  }

  function invokeWithErrorHandling (
    handler,
    context,
    args,
    vm,
    info
  ) {
    var res;
    try {
      res = args ? handler.apply(context, args) : handler.call(context);
      if (res && !res._isVue && isPromise(res) && !res._handled) {
        res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
        // issue #9511
        // avoid catch triggering multiple times when nested calls
        res._handled = true;
      }
    } catch (e) {
      handleError(e, vm, info);
    }
    return res
  }

  function globalHandleError (err, vm, info) {
    if (config.errorHandler) {
      try {
        return config.errorHandler.call(null, err, vm, info)
      } catch (e) {
        // if the user intentionally throws the original error in the handler,
        // do not log it twice
        if (e !== err) {
          logError(e, null, 'config.errorHandler');
        }
      }
    }
    logError(err, vm, info);
  }

  function logError (err, vm, info) {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if ((inBrowser || inWeex) && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }

  /*  */

  var isUsingMicroTask = false;

  var callbacks = [];
  var pending = false;

  function flushCallbacks () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // Here we have async deferring wrappers using microtasks.
  // In 2.5 we used (macro) tasks (in combination with microtasks).
  // However, it has subtle problems when state is changed right before repaint
  // (e.g. #6813, out-in transitions).
  // Also, using (macro) tasks in event handler would cause some weird behaviors
  // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
  // So we now use microtasks everywhere, again.
  // A major drawback of this tradeoff is that there are some scenarios
  // where microtasks have too high a priority and fire in between supposedly
  // sequential events (e.g. #4521, #6690, which have workarounds)
  // or even between bubbling of the same event (#6566).
  var timerFunc;

  // The nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore next, $flow-disable-line */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    timerFunc = function () {
      p.then(flushCallbacks);
      // In problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
    isUsingMicroTask = true;
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // Use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    // (#6466 MutationObserver is unreliable in IE11)
    var counter = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
    isUsingMicroTask = true;
  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    // Fallback to setImmediate.
    // Technically it leverages the (macro) task queue,
    // but it is still a better choice than setTimeout.
    timerFunc = function () {
      setImmediate(flushCallbacks);
    };
  } else {
    // Fallback to setTimeout.
    timerFunc = function () {
      setTimeout(flushCallbacks, 0);
    };
  }

  function nextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }

  /*  */

  /* not type checking this file because flow doesn't play well with Proxy */

  var initProxy;

  if (process.env.NODE_ENV !== 'production') {
    var allowedGlobals = makeMap(
      'Infinity,undefined,NaN,isFinite,isNaN,' +
      'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
      'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
      'require' // for Webpack/Browserify
    );

    var warnNonPresent = function (target, key) {
      warn(
        "Property or method \"" + key + "\" is not defined on the instance but " +
        'referenced during render. Make sure that this property is reactive, ' +
        'either in the data option, or for class-based components, by ' +
        'initializing the property. ' +
        'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
        target
      );
    };

    var warnReservedPrefix = function (target, key) {
      warn(
        "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
        'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
        'prevent conflicts with Vue internals. ' +
        'See: https://vuejs.org/v2/api/#data',
        target
      );
    };

    var hasProxy =
      typeof Proxy !== 'undefined' && isNative(Proxy);

    if (hasProxy) {
      var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
      config.keyCodes = new Proxy(config.keyCodes, {
        set: function set (target, key, value) {
          if (isBuiltInModifier(key)) {
            warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
            return false
          } else {
            target[key] = value;
            return true
          }
        }
      });
    }

    var hasHandler = {
      has: function has (target, key) {
        var has = key in target;
        var isAllowed = allowedGlobals(key) ||
          (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
        if (!has && !isAllowed) {
          if (key in target.$data) { warnReservedPrefix(target, key); }
          else { warnNonPresent(target, key); }
        }
        return has || !isAllowed
      }
    };

    var getHandler = {
      get: function get (target, key) {
        if (typeof key === 'string' && !(key in target)) {
          if (key in target.$data) { warnReservedPrefix(target, key); }
          else { warnNonPresent(target, key); }
        }
        return target[key]
      }
    };

    initProxy = function initProxy (vm) {
      if (hasProxy) {
        // determine which proxy handler to use
        var options = vm.$options;
        var handlers = options.render && options.render._withStripped
          ? getHandler
          : hasHandler;
        vm._renderProxy = new Proxy(vm, handlers);
      } else {
        vm._renderProxy = vm;
      }
    };
  }

  /*  */

  var seenObjects = new _Set();

  /**
   * Recursively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   */
  function traverse (val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
  }

  function _traverse (val, seen) {
    var i, keys;
    var isA = Array.isArray(val);
    if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
      return
    }
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return
      }
      seen.add(depId);
    }
    if (isA) {
      i = val.length;
      while (i--) { _traverse(val[i], seen); }
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) { _traverse(val[keys[i]], seen); }
    }
  }

  var mark;
  var measure;

  if (process.env.NODE_ENV !== 'production') {
    var perf = inBrowser && window.performance;
    /* istanbul ignore if */
    if (
      perf &&
      perf.mark &&
      perf.measure &&
      perf.clearMarks &&
      perf.clearMeasures
    ) {
      mark = function (tag) { return perf.mark(tag); };
      measure = function (name, startTag, endTag) {
        perf.measure(name, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
        // perf.clearMeasures(name)
      };
    }
  }

  /*  */

  var normalizeEvent = cached(function (name) {
    var passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once$$1 ? name.slice(1) : name;
    var capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
      name: name,
      once: once$$1,
      capture: capture,
      passive: passive
    }
  });

  function createFnInvoker (fns, vm) {
    function invoker () {
      var arguments$1 = arguments;

      var fns = invoker.fns;
      if (Array.isArray(fns)) {
        var cloned = fns.slice();
        for (var i = 0; i < cloned.length; i++) {
          invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
        }
      } else {
        // return handler return value for single handlers
        return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
      }
    }
    invoker.fns = fns;
    return invoker
  }

  function updateListeners (
    on,
    oldOn,
    add,
    remove$$1,
    createOnceHandler,
    vm
  ) {
    var name, def$$1, cur, old, event;
    for (name in on) {
      def$$1 = cur = on[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (isUndef(cur)) {
        process.env.NODE_ENV !== 'production' && warn(
          "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
          vm
        );
      } else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on[name] = createFnInvoker(cur, vm);
        }
        if (isTrue(event.once)) {
          cur = on[name] = createOnceHandler(event.name, cur, event.capture);
        }
        add(event.name, cur, event.capture, event.passive, event.params);
      } else if (cur !== old) {
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name);
        remove$$1(event.name, oldOn[name], event.capture);
      }
    }
  }

  /*  */

  function mergeVNodeHook (def, hookKey, hook) {
    if (def instanceof VNode) {
      def = def.data.hook || (def.data.hook = {});
    }
    var invoker;
    var oldHook = def[hookKey];

    function wrappedHook () {
      hook.apply(this, arguments);
      // important: remove merged hook to ensure it's called only once
      // and prevent memory leak
      remove(invoker.fns, wrappedHook);
    }

    if (isUndef(oldHook)) {
      // no existing hook
      invoker = createFnInvoker([wrappedHook]);
    } else {
      /* istanbul ignore if */
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        // already a merged invoker
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        // existing plain hook
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }

    invoker.merged = true;
    def[hookKey] = invoker;
  }

  /*  */

  function extractPropsFromVNodeData (
    data,
    Ctor,
    tag
  ) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
      return
    }
    var res = {};
    var attrs = data.attrs;
    var props = data.props;
    if (isDef(attrs) || isDef(props)) {
      for (var key in propOptions) {
        var altKey = hyphenate(key);
        if (process.env.NODE_ENV !== 'production') {
          var keyInLowerCase = key.toLowerCase();
          if (
            key !== keyInLowerCase &&
            attrs && hasOwn(attrs, keyInLowerCase)
          ) {
            tip(
              "Prop \"" + keyInLowerCase + "\" is passed to component " +
              (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
              " \"" + key + "\". " +
              "Note that HTML attributes are case-insensitive and camelCased " +
              "props need to use their kebab-case equivalents when using in-DOM " +
              "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
            );
          }
        }
        checkProp(res, props, key, altKey, true) ||
        checkProp(res, attrs, key, altKey, false);
      }
    }
    return res
  }

  function checkProp (
    res,
    hash,
    key,
    altKey,
    preserve
  ) {
    if (isDef(hash)) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key];
        if (!preserve) {
          delete hash[key];
        }
        return true
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey];
        if (!preserve) {
          delete hash[altKey];
        }
        return true
      }
    }
    return false
  }

  /*  */

  // The template compiler attempts to minimize the need for normalization by
  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:

  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.
  function simpleNormalizeChildren (children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children)
      }
    }
    return children
  }

  // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.
  function normalizeChildren (children) {
    return isPrimitive(children)
      ? [createTextVNode(children)]
      : Array.isArray(children)
        ? normalizeArrayChildren(children)
        : undefined
  }

  function isTextNode (node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment)
  }

  function normalizeArrayChildren (children, nestedIndex) {
    var res = [];
    var i, c, lastIndex, last;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === 'boolean') { continue }
      lastIndex = res.length - 1;
      last = res[lastIndex];
      //  nested
      if (Array.isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
          // merge adjacent text nodes
          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + (c[0]).text);
            c.shift();
          }
          res.push.apply(res, c);
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          // merge adjacent text nodes
          // this is necessary for SSR hydration because text nodes are
          // essentially merged when rendered to HTML strings
          res[lastIndex] = createTextVNode(last.text + c);
        } else if (c !== '') {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          // merge adjacent text nodes
          res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
          // default key for nested array children (likely generated by v-for)
          if (isTrue(children._isVList) &&
            isDef(c.tag) &&
            isUndef(c.key) &&
            isDef(nestedIndex)) {
            c.key = "__vlist" + nestedIndex + "_" + i + "__";
          }
          res.push(c);
        }
      }
    }
    return res
  }

  /*  */

  function initProvide (vm) {
    var provide = vm.$options.provide;
    if (provide) {
      vm._provided = typeof provide === 'function'
        ? provide.call(vm)
        : provide;
    }
  }

  function initInjections (vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      toggleObserving(false);
      Object.keys(result).forEach(function (key) {
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production') {
          defineReactive$$1(vm, key, result[key], function () {
            warn(
              "Avoid mutating an injected value directly since the changes will be " +
              "overwritten whenever the provided component re-renders. " +
              "injection being mutated: \"" + key + "\"",
              vm
            );
          });
        } else {
          defineReactive$$1(vm, key, result[key]);
        }
      });
      toggleObserving(true);
    }
  }

  function resolveInject (inject, vm) {
    if (inject) {
      // inject is :any because flow is not smart enough to figure out cached
      var result = Object.create(null);
      var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        // #6574 in case the inject object is observed...
        if (key === '__ob__') { continue }
        var provideKey = inject[key].from;
        var source = vm;
        while (source) {
          if (source._provided && hasOwn(source._provided, provideKey)) {
            result[key] = source._provided[provideKey];
            break
          }
          source = source.$parent;
        }
        if (!source) {
          if ('default' in inject[key]) {
            var provideDefault = inject[key].default;
            result[key] = typeof provideDefault === 'function'
              ? provideDefault.call(vm)
              : provideDefault;
          } else if (process.env.NODE_ENV !== 'production') {
            warn(("Injection \"" + key + "\" not found"), vm);
          }
        }
      }
      return result
    }
  }

  /*  */



  /**
   * Runtime helper for resolving raw children VNodes into a slot object.
   */
  function resolveSlots (
    children,
    context
  ) {
    if (!children || !children.length) {
      return {}
    }
    var slots = {};
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var data = child.data;
      // remove slot attribute if the node is resolved as a Vue slot node
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot;
      }
      // named slots should only be respected if the vnode was rendered in the
      // same context.
      if ((child.context === context || child.fnContext === context) &&
        data && data.slot != null
      ) {
        var name = data.slot;
        var slot = (slots[name] || (slots[name] = []));
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children || []);
        } else {
          slot.push(child);
        }
      } else {
        (slots.default || (slots.default = [])).push(child);
      }
    }
    // ignore slots that contains only whitespace
    for (var name$1 in slots) {
      if (slots[name$1].every(isWhitespace)) {
        delete slots[name$1];
      }
    }
    return slots
  }

  function isWhitespace (node) {
    return (node.isComment && !node.asyncFactory) || node.text === ' '
  }

  /*  */

  function normalizeScopedSlots (
    slots,
    normalSlots,
    prevSlots
  ) {
    var res;
    var hasNormalSlots = Object.keys(normalSlots).length > 0;
    var isStable = slots ? !!slots.$stable : !hasNormalSlots;
    var key = slots && slots.$key;
    if (!slots) {
      res = {};
    } else if (slots._normalized) {
      // fast path 1: child component re-render only, parent did not change
      return slots._normalized
    } else if (
      isStable &&
      prevSlots &&
      prevSlots !== emptyObject &&
      key === prevSlots.$key &&
      !hasNormalSlots &&
      !prevSlots.$hasNormal
    ) {
      // fast path 2: stable scoped slots w/ no normal slots to proxy,
      // only need to normalize once
      return prevSlots
    } else {
      res = {};
      for (var key$1 in slots) {
        if (slots[key$1] && key$1[0] !== '$') {
          res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
        }
      }
    }
    // expose normal slots on scopedSlots
    for (var key$2 in normalSlots) {
      if (!(key$2 in res)) {
        res[key$2] = proxyNormalSlot(normalSlots, key$2);
      }
    }
    // avoriaz seems to mock a non-extensible $scopedSlots object
    // and when that is passed down this would cause an error
    if (slots && Object.isExtensible(slots)) {
      (slots)._normalized = res;
    }
    def(res, '$stable', isStable);
    def(res, '$key', key);
    def(res, '$hasNormal', hasNormalSlots);
    return res
  }

  function normalizeScopedSlot(normalSlots, key, fn) {
    var normalized = function () {
      var res = arguments.length ? fn.apply(null, arguments) : fn({});
      res = res && typeof res === 'object' && !Array.isArray(res)
        ? [res] // single vnode
        : normalizeChildren(res);
      return res && (
        res.length === 0 ||
        (res.length === 1 && res[0].isComment) // #9658
      ) ? undefined
        : res
    };
    // this is a slot using the new v-slot syntax without scope. although it is
    // compiled as a scoped slot, render fn users would expect it to be present
    // on this.$slots because the usage is semantically a normal slot.
    if (fn.proxy) {
      Object.defineProperty(normalSlots, key, {
        get: normalized,
        enumerable: true,
        configurable: true
      });
    }
    return normalized
  }

  function proxyNormalSlot(slots, key) {
    return function () { return slots[key]; }
  }

  /*  */

  /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      if (hasSymbol && val[Symbol.iterator]) {
        ret = [];
        var iterator = val[Symbol.iterator]();
        var result = iterator.next();
        while (!result.done) {
          ret.push(render(result.value, ret.length));
          result = iterator.next();
        }
      } else {
        keys = Object.keys(val);
        ret = new Array(keys.length);
        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          ret[i] = render(val[key], key, i);
        }
      }
    }
    if (!isDef(ret)) {
      ret = [];
    }
    (ret)._isVList = true;
    return ret
  }

  /*  */

  /**
   * Runtime helper for rendering <slot>
   */
  function renderSlot (
    name,
    fallback,
    props,
    bindObject
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    var nodes;
    if (scopedSlotFn) { // scoped slot
      props = props || {};
      if (bindObject) {
        if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
          warn(
            'slot v-bind without argument expects an Object',
            this
          );
        }
        props = extend(extend({}, bindObject), props);
      }
      nodes = scopedSlotFn(props) || fallback;
    } else {
      nodes = this.$slots[name] || fallback;
    }

    var target = props && props.slot;
    if (target) {
      return this.$createElement('template', { slot: target }, nodes)
    } else {
      return nodes
    }
  }

  /*  */

  /**
   * Runtime helper for resolving filters
   */
  function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
  }

  /*  */

  function isKeyNotMatch (expect, actual) {
    if (Array.isArray(expect)) {
      return expect.indexOf(actual) === -1
    } else {
      return expect !== actual
    }
  }

  /**
   * Runtime helper for checking keyCodes from config.
   * exposed as Vue.prototype._k
   * passing in eventKeyName as last argument separately for backwards compat
   */
  function checkKeyCodes (
    eventKeyCode,
    key,
    builtInKeyCode,
    eventKeyName,
    builtInKeyName
  ) {
    var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
      return isKeyNotMatch(builtInKeyName, eventKeyName)
    } else if (mappedKeyCode) {
      return isKeyNotMatch(mappedKeyCode, eventKeyCode)
    } else if (eventKeyName) {
      return hyphenate(eventKeyName) !== key
    }
  }

  /*  */

  /**
   * Runtime helper for merging v-bind="object" into a VNode's data.
   */
  function bindObjectProps (
    data,
    tag,
    value,
    asProp,
    isSync
  ) {
    if (value) {
      if (!isObject(value)) {
        process.env.NODE_ENV !== 'production' && warn(
          'v-bind without argument expects an Object or Array value',
          this
        );
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        var hash;
        var loop = function ( key ) {
          if (
            key === 'class' ||
            key === 'style' ||
            isReservedAttribute(key)
          ) {
            hash = data;
          } else {
            var type = data.attrs && data.attrs.type;
            hash = asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
          }
          var camelizedKey = camelize(key);
          var hyphenatedKey = hyphenate(key);
          if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
            hash[key] = value[key];

            if (isSync) {
              var on = data.on || (data.on = {});
              on[("update:" + key)] = function ($event) {
                value[key] = $event;
              };
            }
          }
        };

        for (var key in value) loop( key );
      }
    }
    return data
  }

  /*  */

  /**
   * Runtime helper for rendering static trees.
   */
  function renderStatic (
    index,
    isInFor
  ) {
    var cached = this._staticTrees || (this._staticTrees = []);
    var tree = cached[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree.
    if (tree && !isInFor) {
      return tree
    }
    // otherwise, render a fresh tree.
    tree = cached[index] = this.$options.staticRenderFns[index].call(
      this._renderProxy,
      null,
      this // for render fns generated for functional component templates
    );
    markStatic(tree, ("__static__" + index), false);
    return tree
  }

  /**
   * Runtime helper for v-once.
   * Effectively it means marking the node as static with a unique key.
   */
  function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  }

  function markStatic (
    tree,
    key,
    isOnce
  ) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  /*  */

  function bindObjectListeners (data, value) {
    if (value) {
      if (!isPlainObject(value)) {
        process.env.NODE_ENV !== 'production' && warn(
          'v-on without argument expects an Object value',
          this
        );
      } else {
        var on = data.on = data.on ? extend({}, data.on) : {};
        for (var key in value) {
          var existing = on[key];
          var ours = value[key];
          on[key] = existing ? [].concat(existing, ours) : ours;
        }
      }
    }
    return data
  }

  /*  */

  function resolveScopedSlots (
    fns, // see flow/vnode
    res,
    // the following are added in 2.6
    hasDynamicKeys,
    contentHashKey
  ) {
    res = res || { $stable: !hasDynamicKeys };
    for (var i = 0; i < fns.length; i++) {
      var slot = fns[i];
      if (Array.isArray(slot)) {
        resolveScopedSlots(slot, res, hasDynamicKeys);
      } else if (slot) {
        // marker for reverse proxying v-slot without scope on this.$slots
        if (slot.proxy) {
          slot.fn.proxy = true;
        }
        res[slot.key] = slot.fn;
      }
    }
    if (contentHashKey) {
      (res).$key = contentHashKey;
    }
    return res
  }

  /*  */

  function bindDynamicKeys (baseObj, values) {
    for (var i = 0; i < values.length; i += 2) {
      var key = values[i];
      if (typeof key === 'string' && key) {
        baseObj[values[i]] = values[i + 1];
      } else if (process.env.NODE_ENV !== 'production' && key !== '' && key !== null) {
        // null is a special value for explicitly removing a binding
        warn(
          ("Invalid value for dynamic directive argument (expected string or null): " + key),
          this
        );
      }
    }
    return baseObj
  }

  // helper to dynamically append modifier runtime markers to event names.
  // ensure only append when value is already string, otherwise it will be cast
  // to string and cause the type check to miss.
  function prependModifier (value, symbol) {
    return typeof value === 'string' ? symbol + value : value
  }

  /*  */

  function installRenderHelpers (target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
    target._d = bindDynamicKeys;
    target._p = prependModifier;
  }

  /*  */

  function FunctionalRenderContext (
    data,
    props,
    children,
    parent,
    Ctor
  ) {
    var this$1 = this;

    var options = Ctor.options;
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    var contextVm;
    if (hasOwn(parent, '_uid')) {
      contextVm = Object.create(parent);
      // $flow-disable-line
      contextVm._original = parent;
    } else {
      // the context vm passed in is a functional context as well.
      // in this case we want to make sure we are able to get a hold to the
      // real context instance.
      contextVm = parent;
      // $flow-disable-line
      parent = parent._original;
    }
    var isCompiled = isTrue(options._compiled);
    var needNormalization = !isCompiled;

    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function () {
      if (!this$1.$slots) {
        normalizeScopedSlots(
          data.scopedSlots,
          this$1.$slots = resolveSlots(children, parent)
        );
      }
      return this$1.$slots
    };

    Object.defineProperty(this, 'scopedSlots', ({
      enumerable: true,
      get: function get () {
        return normalizeScopedSlots(data.scopedSlots, this.slots())
      }
    }));

    // support for compiled functional template
    if (isCompiled) {
      // exposing $options for renderStatic()
      this.$options = options;
      // pre-resolve slots for renderSlot()
      this.$slots = this.slots();
      this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
    }

    if (options._scopeId) {
      this._c = function (a, b, c, d) {
        var vnode = createElement(contextVm, a, b, c, d, needNormalization);
        if (vnode && !Array.isArray(vnode)) {
          vnode.fnScopeId = options._scopeId;
          vnode.fnContext = parent;
        }
        return vnode
      };
    } else {
      this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
    }
  }

  installRenderHelpers(FunctionalRenderContext.prototype);

  function createFunctionalComponent (
    Ctor,
    propsData,
    data,
    contextVm,
    children
  ) {
    var options = Ctor.options;
    var props = {};
    var propOptions = options.props;
    if (isDef(propOptions)) {
      for (var key in propOptions) {
        props[key] = validateProp(key, propOptions, propsData || emptyObject);
      }
    } else {
      if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
      if (isDef(data.props)) { mergeProps(props, data.props); }
    }

    var renderContext = new FunctionalRenderContext(
      data,
      props,
      children,
      contextVm,
      Ctor
    );

    var vnode = options.render.call(null, renderContext._c, renderContext);

    if (vnode instanceof VNode) {
      return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
    } else if (Array.isArray(vnode)) {
      var vnodes = normalizeChildren(vnode) || [];
      var res = new Array(vnodes.length);
      for (var i = 0; i < vnodes.length; i++) {
        res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
      }
      return res
    }
  }

  function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
    // #7817 clone node before setting fnContext, otherwise if the node is reused
    // (e.g. it was from a cached normal slot) the fnContext causes named slots
    // that should not be matched to match.
    var clone = cloneVNode(vnode);
    clone.fnContext = contextVm;
    clone.fnOptions = options;
    if (process.env.NODE_ENV !== 'production') {
      (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
    }
    if (data.slot) {
      (clone.data || (clone.data = {})).slot = data.slot;
    }
    return clone
  }

  function mergeProps (to, from) {
    for (var key in from) {
      to[camelize(key)] = from[key];
    }
  }

  /*  */

  /*  */

  /*  */

  /*  */

  // inline hooks to be invoked on component VNodes during patch
  var componentVNodeHooks = {
    init: function init (vnode, hydrating) {
      if (
        vnode.componentInstance &&
        !vnode.componentInstance._isDestroyed &&
        vnode.data.keepAlive
      ) {
        // kept-alive components, treat as a patch
        var mountedNode = vnode; // work around flow
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      } else {
        var child = vnode.componentInstance = createComponentInstanceForVnode(
          vnode,
          activeInstance
        );
        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
      }
    },

    prepatch: function prepatch (oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(
        child,
        options.propsData, // updated props
        options.listeners, // updated listeners
        vnode, // new parent vnode
        options.children // new children
      );
    },

    insert: function insert (vnode) {
      var context = vnode.context;
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true;
        callHook(componentInstance, 'mounted');
      }
      if (vnode.data.keepAlive) {
        if (context._isMounted) {
          // vue-router#1212
          // During updates, a kept-alive component's child components may
          // change, so directly walking the tree here may call activated hooks
          // on incorrect children. Instead we push them into a queue which will
          // be processed after the whole patch process ended.
          queueActivatedComponent(componentInstance);
        } else {
          activateChildComponent(componentInstance, true /* direct */);
        }
      }
    },

    destroy: function destroy (vnode) {
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          componentInstance.$destroy();
        } else {
          deactivateChildComponent(componentInstance, true /* direct */);
        }
      }
    }
  };

  var hooksToMerge = Object.keys(componentVNodeHooks);

  function createComponent (
    Ctor,
    data,
    context,
    children,
    tag
  ) {
    if (isUndef(Ctor)) {
      return
    }

    var baseCtor = context.$options._base;

    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }

    // if at this stage it's not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== 'function') {
      if (process.env.NODE_ENV !== 'production') {
        warn(("Invalid Component definition: " + (String(Ctor))), context);
      }
      return
    }

    // async component
    var asyncFactory;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
      if (Ctor === undefined) {
        // return a placeholder node for async component, which is rendered
        // as a comment node but preserves all the raw information for the node.
        // the information will be used for async server-rendering and hydration.
        return createAsyncPlaceholder(
          asyncFactory,
          data,
          context,
          children,
          tag
        )
      }
    }

    data = data || {};

    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);

    // transform component v-model data into props & events
    if (isDef(data.model)) {
      transformModel(Ctor.options, data);
    }

    // extract props
    var propsData = extractPropsFromVNodeData(data, Ctor, tag);

    // functional component
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(Ctor, propsData, data, context, children)
    }

    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    var listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn;

    if (isTrue(Ctor.options.abstract)) {
      // abstract components do not keep anything
      // other than props & listeners & slot

      // work around flow
      var slot = data.slot;
      data = {};
      if (slot) {
        data.slot = slot;
      }
    }

    // install component management hooks onto the placeholder node
    installComponentHooks(data);

    // return a placeholder vnode
    var name = Ctor.options.name || tag;
    var vnode = new VNode(
      ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
      data, undefined, undefined, undefined, context,
      { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
      asyncFactory
    );

    return vnode
  }

  function createComponentInstanceForVnode (
    vnode, // we know it's MountedComponentVNode but flow doesn't
    parent // activeInstance in lifecycle state
  ) {
    var options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent: parent
    };
    // check inline-template render functions
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options)
  }

  function installComponentHooks (data) {
    var hooks = data.hook || (data.hook = {});
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var existing = hooks[key];
      var toMerge = componentVNodeHooks[key];
      if (existing !== toMerge && !(existing && existing._merged)) {
        hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
      }
    }
  }

  function mergeHook$1 (f1, f2) {
    var merged = function (a, b) {
      // flow complains about extra args which is why we use any
      f1(a, b);
      f2(a, b);
    };
    merged._merged = true;
    return merged
  }

  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel (options, data) {
    var prop = (options.model && options.model.prop) || 'value';
    var event = (options.model && options.model.event) || 'input'
    ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    var existing = on[event];
    var callback = data.model.callback;
    if (isDef(existing)) {
      if (
        Array.isArray(existing)
          ? existing.indexOf(callback) === -1
          : existing !== callback
      ) {
        on[event] = [callback].concat(existing);
      }
    } else {
      on[event] = callback;
    }
  }

  /*  */

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;

  // wrapper function for providing a more flexible interface
  // without getting yelled at by flow
  function createElement (
    context,
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
  ) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType)
  }

  function _createElement (
    context,
    tag,
    data,
    children,
    normalizationType
  ) {
    if (isDef(data) && isDef((data).__ob__)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
        'Always create fresh vnode data objects in each render!',
        context
      );
      return createEmptyVNode()
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
      tag = data.is;
    }
    if (!tag) {
      // in case of component :is set to falsy value
      return createEmptyVNode()
    }
    // warn against non-primitive key
    if (process.env.NODE_ENV !== 'production' &&
      isDef(data) && isDef(data.key) && !isPrimitive(data.key)
    ) {
      {
        warn(
          'Avoid using non-primitive value as key, ' +
          'use string/number value instead.',
          context
        );
      }
    }
    // support single function children as default scoped slot
    if (Array.isArray(children) &&
      typeof children[0] === 'function'
    ) {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === 'string') {
      var Ctor;
      ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        // platform built-in elements
        if (process.env.NODE_ENV !== 'production' && isDef(data) && isDef(data.nativeOn)) {
          warn(
            ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
            context
          );
        }
        vnode = new VNode(
          config.parsePlatformTagName(tag), data, children,
          undefined, undefined, context
        );
      } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
        // component
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        // unknown or unlisted namespaced elements
        // check at runtime because it may get assigned a namespace when its
        // parent normalizes children
        vnode = new VNode(
          tag, data, children,
          undefined, undefined, context
        );
      }
    } else {
      // direct component options / constructor
      vnode = createComponent(tag, data, context, children);
    }
    if (Array.isArray(vnode)) {
      return vnode
    } else if (isDef(vnode)) {
      if (isDef(ns)) { applyNS(vnode, ns); }
      if (isDef(data)) { registerDeepBindings(data); }
      return vnode
    } else {
      return createEmptyVNode()
    }
  }

  function applyNS (vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
      // use default namespace inside foreignObject
      ns = undefined;
      force = true;
    }
    if (isDef(vnode.children)) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (isDef(child.tag) && (
          isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
          applyNS(child, ns, force);
        }
      }
    }
  }

  // ref #5318
  // necessary to ensure parent re-render when deep bindings like :style and
  // :class are used on slot nodes
  function registerDeepBindings (data) {
    if (isObject(data.style)) {
      traverse(data.style);
    }
    if (isObject(data.class)) {
      traverse(data.class);
    }
  }

  /*  */

  function initRender (vm) {
    vm._vnode = null; // the root of the child tree
    vm._staticTrees = null; // v-once cached trees
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    var parentData = parentVnode && parentVnode.data;

    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
        !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
      }, true);
      defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
        !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
      }, true);
    } else {
      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
      defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
    }
  }

  var currentRenderingInstance = null;

  function renderMixin (Vue) {
    // install runtime convenience helpers
    installRenderHelpers(Vue.prototype);

    Vue.prototype.$nextTick = function (fn) {
      return nextTick(fn, this)
    };

    Vue.prototype._render = function () {
      var vm = this;
      var ref = vm.$options;
      var render = ref.render;
      var _parentVnode = ref._parentVnode;

      if (_parentVnode) {
        vm.$scopedSlots = normalizeScopedSlots(
          _parentVnode.data.scopedSlots,
          vm.$slots,
          vm.$scopedSlots
        );
      }

      // set parent vnode. this allows render functions to have access
      // to the data on the placeholder node.
      vm.$vnode = _parentVnode;
      // render self
      var vnode;
      try {
        // There's no need to maintain a stack because all render fns are called
        // separately from one another. Nested component's render fns are called
        // when parent component is patched.
        currentRenderingInstance = vm;
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, "render");
        // return error render result,
        // or previous vnode to prevent render error causing blank component
        /* istanbul ignore else */
        if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } finally {
        currentRenderingInstance = null;
      }
      // if the returned array contains only a single node, allow it
      if (Array.isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
      }
      // return empty vnode in case the render function errored out
      if (!(vnode instanceof VNode)) {
        if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
          warn(
            'Multiple root nodes returned from render function. Render function ' +
            'should return a single root node.',
            vm
          );
        }
        vnode = createEmptyVNode();
      }
      // set parent
      vnode.parent = _parentVnode;
      return vnode
    };
  }

  /*  */

  function ensureCtor (comp, base) {
    if (
      comp.__esModule ||
      (hasSymbol && comp[Symbol.toStringTag] === 'Module')
    ) {
      comp = comp.default;
    }
    return isObject(comp)
      ? base.extend(comp)
      : comp
  }

  function createAsyncPlaceholder (
    factory,
    data,
    context,
    children,
    tag
  ) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data: data, context: context, children: children, tag: tag };
    return node
  }

  function resolveAsyncComponent (
    factory,
    baseCtor
  ) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
      return factory.errorComp
    }

    if (isDef(factory.resolved)) {
      return factory.resolved
    }

    var owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
      // already pending
      factory.owners.push(owner);
    }

    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
      return factory.loadingComp
    }

    if (owner && !isDef(factory.owners)) {
      var owners = factory.owners = [owner];
      var sync = true;
      var timerLoading = null;
      var timerTimeout = null

      ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

      var forceRender = function (renderCompleted) {
        for (var i = 0, l = owners.length; i < l; i++) {
          (owners[i]).$forceUpdate();
        }

        if (renderCompleted) {
          owners.length = 0;
          if (timerLoading !== null) {
            clearTimeout(timerLoading);
            timerLoading = null;
          }
          if (timerTimeout !== null) {
            clearTimeout(timerTimeout);
            timerTimeout = null;
          }
        }
      };

      var resolve = once(function (res) {
        // cache resolved
        factory.resolved = ensureCtor(res, baseCtor);
        // invoke callbacks only if this is not a synchronous resolve
        // (async resolves are shimmed as synchronous during SSR)
        if (!sync) {
          forceRender(true);
        } else {
          owners.length = 0;
        }
      });

      var reject = once(function (reason) {
        process.env.NODE_ENV !== 'production' && warn(
          "Failed to resolve async component: " + (String(factory)) +
          (reason ? ("\nReason: " + reason) : '')
        );
        if (isDef(factory.errorComp)) {
          factory.error = true;
          forceRender(true);
        }
      });

      var res = factory(resolve, reject);

      if (isObject(res)) {
        if (isPromise(res)) {
          // () => Promise
          if (isUndef(factory.resolved)) {
            res.then(resolve, reject);
          }
        } else if (isPromise(res.component)) {
          res.component.then(resolve, reject);

          if (isDef(res.error)) {
            factory.errorComp = ensureCtor(res.error, baseCtor);
          }

          if (isDef(res.loading)) {
            factory.loadingComp = ensureCtor(res.loading, baseCtor);
            if (res.delay === 0) {
              factory.loading = true;
            } else {
              timerLoading = setTimeout(function () {
                timerLoading = null;
                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                  factory.loading = true;
                  forceRender(false);
                }
              }, res.delay || 200);
            }
          }

          if (isDef(res.timeout)) {
            timerTimeout = setTimeout(function () {
              timerTimeout = null;
              if (isUndef(factory.resolved)) {
                reject(
                  process.env.NODE_ENV !== 'production'
                    ? ("timeout (" + (res.timeout) + "ms)")
                    : null
                );
              }
            }, res.timeout);
          }
        }
      }

      sync = false;
      // return in case resolved synchronously
      return factory.loading
        ? factory.loadingComp
        : factory.resolved
    }
  }

  /*  */

  function isAsyncPlaceholder (node) {
    return node.isComment && node.asyncFactory
  }

  /*  */

  function getFirstComponentChild (children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c
        }
      }
    }
  }

  /*  */

  /*  */

  function initEvents (vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }

  var target;

  function add (event, fn) {
    target.$on(event, fn);
  }

  function remove$1 (event, fn) {
    target.$off(event, fn);
  }

  function createOnceHandler (event, fn) {
    var _target = target;
    return function onceHandler () {
      var res = fn.apply(null, arguments);
      if (res !== null) {
        _target.$off(event, onceHandler);
      }
    }
  }

  function updateComponentListeners (
    vm,
    listeners,
    oldListeners
  ) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
    target = undefined;
  }

  function eventsMixin (Vue) {
    var hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
      var vm = this;
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          vm.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm
    };

    Vue.prototype.$once = function (event, fn) {
      var vm = this;
      function on () {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm
    };

    Vue.prototype.$off = function (event, fn) {
      var vm = this;
      // all
      if (!arguments.length) {
        vm._events = Object.create(null);
        return vm
      }
      // array of events
      if (Array.isArray(event)) {
        for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
          vm.$off(event[i$1], fn);
        }
        return vm
      }
      // specific event
      var cbs = vm._events[event];
      if (!cbs) {
        return vm
      }
      if (!fn) {
        vm._events[event] = null;
        return vm
      }
      // specific handler
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break
        }
      }
      return vm
    };

    Vue.prototype.$emit = function (event) {
      var vm = this;
      if (process.env.NODE_ENV !== 'production') {
        var lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
          tip(
            "Event \"" + lowerCaseEvent + "\" is emitted in component " +
            (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
            "Note that HTML attributes are case-insensitive and you cannot use " +
            "v-on to listen to camelCase events when using in-DOM templates. " +
            "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
          );
        }
      }
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        var info = "event handler for \"" + event + "\"";
        for (var i = 0, l = cbs.length; i < l; i++) {
          invokeWithErrorHandling(cbs[i], vm, args, vm, info);
        }
      }
      return vm
    };
  }

  /*  */

  var activeInstance = null;
  var isUpdatingChildComponent = false;

  function setActiveInstance(vm) {
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    return function () {
      activeInstance = prevActiveInstance;
    }
  }

  function initLifecycle (vm) {
    var options = vm.$options;

    // locate first non-abstract parent
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      var vm = this;
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var restoreActiveInstance = setActiveInstance(vm);
      vm._vnode = vnode;
      // Vue.prototype.__patch__ is injected in entry points
      // based on the rendering backend used.
      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
      } else {
        // updates
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      restoreActiveInstance();
      // update __vue__ reference
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      // if parent is an HOC, update its $el as well
      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el;
      }
      // updated hook is called by the scheduler to ensure that children are
      // updated in a parent's updated hook.
    };

    Vue.prototype.$forceUpdate = function () {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };

    Vue.prototype.$destroy = function () {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return
      }
      callHook(vm, 'beforeDestroy');
      vm._isBeingDestroyed = true;
      // remove self from parent
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm);
      }
      // teardown watchers
      if (vm._watcher) {
        vm._watcher.teardown();
      }
      var i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].teardown();
      }
      // remove reference from data ob
      // frozen object may not have observer.
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }
      // call the last hook...
      vm._isDestroyed = true;
      // invoke destroy hooks on current rendered tree
      vm.__patch__(vm._vnode, null);
      // fire destroyed hook
      callHook(vm, 'destroyed');
      // turn off all instance listeners.
      vm.$off();
      // remove __vue__ reference
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }
      // release circular reference (#6759)
      if (vm.$vnode) {
        vm.$vnode.parent = null;
      }
    };
  }

  function mountComponent (
    vm,
    el,
    hydrating
  ) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      if (process.env.NODE_ENV !== 'production') {
        /* istanbul ignore if */
        if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
          vm.$options.el || el) {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'compiler is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
    callHook(vm, 'beforeMount');

    var updateComponent;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      updateComponent = function () {
        var name = vm._name;
        var id = vm._uid;
        var startTag = "vue-perf-start:" + id;
        var endTag = "vue-perf-end:" + id;

        mark(startTag);
        var vnode = vm._render();
        mark(endTag);
        measure(("vue " + name + " render"), startTag, endTag);

        mark(startTag);
        vm._update(vnode, hydrating);
        mark(endTag);
        measure(("vue " + name + " patch"), startTag, endTag);
      };
    } else {
      updateComponent = function () {
        vm._update(vm._render(), hydrating);
      };
    }

    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, {
      before: function before () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate');
        }
      }
    }, true /* isRenderWatcher */);
    hydrating = false;

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  }

  function updateChildComponent (
    vm,
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {
    if (process.env.NODE_ENV !== 'production') {
      isUpdatingChildComponent = true;
    }

    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren.

    // check if there are dynamic scopedSlots (hand-written or compiled but with
    // dynamic slot names). Static scoped slots compiled from template has the
    // "$stable" marker.
    var newScopedSlots = parentVnode.data.scopedSlots;
    var oldScopedSlots = vm.$scopedSlots;
    var hasDynamicScopedSlot = !!(
      (newScopedSlots && !newScopedSlots.$stable) ||
      (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
      (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
    );

    // Any static slot children from the parent may have changed during parent's
    // update. Dynamic scoped slots may also have changed. In such cases, a forced
    // update is necessary to ensure correctness.
    var needsForceUpdate = !!(
      renderChildren ||               // has new static slots
      vm.$options._renderChildren ||  // has old static slots
      hasDynamicScopedSlot
    );

    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render

    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;

    // update $attrs and $listeners hash
    // these are also reactive so they may trigger child update if the child
    // used them during render
    vm.$attrs = parentVnode.data.attrs || emptyObject;
    vm.$listeners = listeners || emptyObject;

    // update props
    if (propsData && vm.$options.props) {
      toggleObserving(false);
      var props = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        var propOptions = vm.$options.props; // wtf flow?
        props[key] = validateProp(key, propOptions, propsData, vm);
      }
      toggleObserving(true);
      // keep a copy of raw propsData
      vm.$options.propsData = propsData;
    }

    // update listeners
    listeners = listeners || emptyObject;
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);

    // resolve slots + force update if has children
    if (needsForceUpdate) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }

    if (process.env.NODE_ENV !== 'production') {
      isUpdatingChildComponent = false;
    }
  }

  function isInInactiveTree (vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive) { return true }
    }
    return false
  }

  function activateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return
      }
    } else if (vm._directInactive) {
      return
    }
    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'activated');
    }
  }

  function deactivateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'deactivated');
    }
  }

  function callHook (vm, hook) {
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
  }

  /*  */

  var MAX_UPDATE_COUNT = 100;

  var queue = [];
  var activatedChildren = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var flushing = false;
  var index = 0;

  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState () {
    index = queue.length = activatedChildren.length = 0;
    has = {};
    if (process.env.NODE_ENV !== 'production') {
      circular = {};
    }
    waiting = flushing = false;
  }

  // Async edge case #6566 requires saving the timestamp when event listeners are
  // attached. However, calling performance.now() has a perf overhead especially
  // if the page has thousands of event listeners. Instead, we take a timestamp
  // every time the scheduler flushes and use that for all event listeners
  // attached during that flush.
  var currentFlushTimestamp = 0;

  // Async edge case fix requires storing an event listener's attach timestamp.
  var getNow = Date.now;

  // Determine what event timestamp the browser is using. Annoyingly, the
  // timestamp can either be hi-res (relative to page load) or low-res
  // (relative to UNIX epoch), so in order to compare time we have to use the
  // same timestamp type when saving the flush timestamp.
  // All IE versions use low-res event timestamps, and have problematic clock
  // implementations (#9632)
  if (inBrowser && !isIE) {
    var performance = window.performance;
    if (
      performance &&
      typeof performance.now === 'function' &&
      getNow() > document.createEvent('Event').timeStamp
    ) {
      // if the event timestamp, although evaluated AFTER the Date.now(), is
      // smaller than it, it means the event is using a hi-res timestamp,
      // and we need to use the hi-res version for event listener timestamps as
      // well.
      getNow = function () { return performance.now(); };
    }
  }

  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue () {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;

    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(function (a, b) { return a.id - b.id; });

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      if (watcher.before) {
        watcher.before();
      }
      id = watcher.id;
      has[id] = null;
      watcher.run();
      // in dev build, check and stop circular updates.
      if (process.env.NODE_ENV !== 'production' && has[id] != null) {
        circular[id] = (circular[id] || 0) + 1;
        if (circular[id] > MAX_UPDATE_COUNT) {
          warn(
            'You may have an infinite update loop ' + (
              watcher.user
                ? ("in watcher with expression \"" + (watcher.expression) + "\"")
                : "in a component render function."
            ),
            watcher.vm
          );
          break
        }
      }
    }

    // keep copies of post queues before resetting state
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();

    resetSchedulerState();

    // call component updated and activated hooks
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);

    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
  }

  function callUpdatedHooks (queue) {
    var i = queue.length;
    while (i--) {
      var watcher = queue[i];
      var vm = watcher.vm;
      if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'updated');
      }
    }
  }

  /**
   * Queue a kept-alive component that was activated during patch.
   * The queue will be processed after the entire tree has been patched.
   */
  function queueActivatedComponent (vm) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false;
    activatedChildren.push(vm);
  }

  function callActivatedHooks (queue) {
    for (var i = 0; i < queue.length; i++) {
      queue[i]._inactive = true;
      activateChildComponent(queue[i], true /* true */);
    }
  }

  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher (watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) {
        queue.push(watcher);
      } else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        var i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id) {
          i--;
        }
        queue.splice(i + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
        waiting = true;

        if (process.env.NODE_ENV !== 'production' && !config.async) {
          flushSchedulerQueue();
          return
        }
        nextTick(flushSchedulerQueue);
      }
    }
  }

  /*  */



  var uid$2 = 0;

  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   */
  var Watcher = function Watcher (
    vm,
    expOrFn,
    cb,
    options,
    isRenderWatcher
  ) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watchers.push(this);
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$2; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : '';
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
        process.env.NODE_ENV !== 'production' && warn(
          "Failed watching path: \"" + expOrFn + "\" " +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        );
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get();
  };

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  Watcher.prototype.get = function get () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value
  };

  /**
   * Add a dependency to this directive.
   */
  Watcher.prototype.addDep = function addDep (dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };

  /**
   * Clean up for dependency collection.
   */
  Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  Watcher.prototype.update = function update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  Watcher.prototype.run = function run () {
    if (this.active) {
      var value = this.get();
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue);
          } catch (e) {
            handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
          }
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  Watcher.prototype.evaluate = function evaluate () {
    this.value = this.get();
    this.dirty = false;
  };

  /**
   * Depend on all deps collected by this watcher.
   */
  Watcher.prototype.depend = function depend () {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };

  /**
   * Remove self from all dependencies' subscriber list.
   */
  Watcher.prototype.teardown = function teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this);
      }
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
    }
  };

  /*  */

  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };

  function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
    if (opts.methods) { initMethods(vm, opts.methods); }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    if (opts.computed) { initComputed(vm, opts.computed); }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }

  function initProps (vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = vm._props = {};
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    // root instance props should be converted
    if (!isRoot) {
      toggleObserving(false);
    }
    var loop = function ( key ) {
      keys.push(key);
      var value = validateProp(key, propsOptions, propsData, vm);
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        var hyphenatedKey = hyphenate(key);
        if (isReservedAttribute(hyphenatedKey) ||
            config.isReservedAttr(hyphenatedKey)) {
          warn(
            ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
            vm
          );
        }
        defineReactive$$1(props, key, value, function () {
          if (!isRoot && !isUpdatingChildComponent) {
            warn(
              "Avoid mutating a prop directly since the value will be " +
              "overwritten whenever the parent component re-renders. " +
              "Instead, use a data or computed property based on the prop's " +
              "value. Prop being mutated: \"" + key + "\"",
              vm
            );
          }
        });
      } else {
        defineReactive$$1(props, key, value);
      }
      // static props are already proxied on the component's prototype
      // during Vue.extend(). We only need to proxy props defined at
      // instantiation here.
      if (!(key in vm)) {
        proxy(vm, "_props", key);
      }
    };

    for (var key in propsOptions) loop( key );
    toggleObserving(true);
  }

  function initData (vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};
    if (!isPlainObject(data)) {
      data = {};
      process.env.NODE_ENV !== 'production' && warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      );
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      if (process.env.NODE_ENV !== 'production') {
        if (methods && hasOwn(methods, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a data property."),
            vm
          );
        }
      }
      if (props && hasOwn(props, key)) {
        process.env.NODE_ENV !== 'production' && warn(
          "The data property \"" + key + "\" is already declared as a prop. " +
          "Use prop default value instead.",
          vm
        );
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    // observe data
    observe(data, true /* asRootData */);
  }

  function getData (data, vm) {
    // #7573 disable dep collection when invoking data getters
    pushTarget();
    try {
      return data.call(vm, vm)
    } catch (e) {
      handleError(e, vm, "data()");
      return {}
    } finally {
      popTarget();
    }
  }

  var computedWatcherOptions = { lazy: true };

  function initComputed (vm, computed) {
    // $flow-disable-line
    var watchers = vm._computedWatchers = Object.create(null);
    // computed properties are just getters during SSR
    var isSSR = isServerRendering();

    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;
      if (process.env.NODE_ENV !== 'production' && getter == null) {
        warn(
          ("Getter is missing for computed property \"" + key + "\"."),
          vm
        );
      }

      if (!isSSR) {
        // create internal watcher for the computed property.
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          computedWatcherOptions
        );
      }

      // component-defined computed properties are already defined on the
      // component prototype. We only need to define computed properties defined
      // at instantiation here.
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      } else if (process.env.NODE_ENV !== 'production') {
        if (key in vm.$data) {
          warn(("The computed property \"" + key + "\" is already defined in data."), vm);
        } else if (vm.$options.props && key in vm.$options.props) {
          warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
        }
      }
    }
  }

  function defineComputed (
    target,
    key,
    userDef
  ) {
    var shouldCache = !isServerRendering();
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
        : createGetterInvoker(userDef);
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get
        ? shouldCache && userDef.cache !== false
          ? createComputedGetter(key)
          : createGetterInvoker(userDef.get)
        : noop;
      sharedPropertyDefinition.set = userDef.set || noop;
    }
    if (process.env.NODE_ENV !== 'production' &&
        sharedPropertyDefinition.set === noop) {
      sharedPropertyDefinition.set = function () {
        warn(
          ("Computed property \"" + key + "\" was assigned to but it has no setter."),
          this
        );
      };
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function createComputedGetter (key) {
    return function computedGetter () {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value
      }
    }
  }

  function createGetterInvoker(fn) {
    return function computedGetter () {
      return fn.call(this, this)
    }
  }

  function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      if (process.env.NODE_ENV !== 'production') {
        if (typeof methods[key] !== 'function') {
          warn(
            "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
            "Did you reference the function correctly?",
            vm
          );
        }
        if (props && hasOwn(props, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a prop."),
            vm
          );
        }
        if ((key in vm) && isReserved(key)) {
          warn(
            "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
            "Avoid defining component methods that start with _ or $."
          );
        }
      }
      vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
  }

  function initWatch (vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }

  function createWatcher (
    vm,
    expOrFn,
    handler,
    options
  ) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options)
  }

  function stateMixin (Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    if (process.env.NODE_ENV !== 'production') {
      dataDef.set = function () {
        warn(
          'Avoid replacing instance root $data. ' +
          'Use nested data properties instead.',
          this
        );
      };
      propsDef.set = function () {
        warn("$props is readonly.", this);
      };
    }
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function (
      expOrFn,
      cb,
      options
    ) {
      var vm = this;
      if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options)
      }
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        try {
          cb.call(vm, watcher.value);
        } catch (error) {
          handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
        }
      }
      return function unwatchFn () {
        watcher.teardown();
      }
    };
  }

  /*  */

  var uid$3 = 0;

  function initMixin (Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      // a uid
      vm._uid = uid$3++;

      var startTag, endTag;
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        startTag = "vue-perf-start:" + (vm._uid);
        endTag = "vue-perf-end:" + (vm._uid);
        mark(startTag);
      }

      // a flag to avoid this being observed
      vm._isVue = true;
      // merge options
      if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        );
      }
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        initProxy(vm);
      } else {
        vm._renderProxy = vm;
      }
      // expose real self
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook(vm, 'beforeCreate');
      initInjections(vm); // resolve injections before data/props
      initState(vm);
      initProvide(vm); // resolve provide after data/props
      callHook(vm, 'created');

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        vm._name = formatComponentName(vm, false);
        mark(endTag);
        measure(("vue " + (vm._name) + " init"), startTag, endTag);
      }

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  function initInternalComponent (vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    // doing this because it's faster than dynamic enumeration.
    var parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;

    var vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;

    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }

  function resolveConstructorOptions (Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        // super option changed,
        // need to resolve new options.
        Ctor.superOptions = superOptions;
        // check if there are any late-modified/attached options (#4976)
        var modifiedOptions = resolveModifiedOptions(Ctor);
        // update base extend options
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options
  }

  function resolveModifiedOptions (Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified) { modified = {}; }
        modified[key] = latest[key];
      }
    }
    return modified
  }

  function Vue (options) {
    if (process.env.NODE_ENV !== 'production' &&
      !(this instanceof Vue)
    ) {
      warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }

  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  /*  */

  function initUse (Vue) {
    Vue.use = function (plugin) {
      var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
      if (installedPlugins.indexOf(plugin) > -1) {
        return this
      }

      // additional parameters
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
      }
      installedPlugins.push(plugin);
      return this
    };
  }

  /*  */

  function initMixin$1 (Vue) {
    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this
    };
  }

  /*  */

  function initExtend (Vue) {
    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */
    Vue.cid = 0;
    var cid = 1;

    /**
     * Class inheritance
     */
    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId]
      }

      var name = extendOptions.name || Super.options.name;
      if (process.env.NODE_ENV !== 'production' && name) {
        validateComponentName(name);
      }

      var Sub = function VueComponent (options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(
        Super.options,
        extendOptions
      );
      Sub['super'] = Super;

      // For props and computed properties, we define the proxy getters on
      // the Vue instances at extension time, on the extended prototype. This
      // avoids Object.defineProperty calls for each instance created.
      if (Sub.options.props) {
        initProps$1(Sub);
      }
      if (Sub.options.computed) {
        initComputed$1(Sub);
      }

      // allow further extension/mixin/plugin usage
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;

      // create asset registers, so extended classes
      // can have their private assets too.
      ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type];
      });
      // enable recursive self-lookup
      if (name) {
        Sub.options.components[name] = Sub;
      }

      // keep a reference to the super options at extension time.
      // later at instantiation we can check if Super's options have
      // been updated.
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend({}, Sub.options);

      // cache constructor
      cachedCtors[SuperId] = Sub;
      return Sub
    };
  }

  function initProps$1 (Comp) {
    var props = Comp.options.props;
    for (var key in props) {
      proxy(Comp.prototype, "_props", key);
    }
  }

  function initComputed$1 (Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }

  /*  */

  function initAssetRegisters (Vue) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(function (type) {
      Vue[type] = function (
        id,
        definition
      ) {
        if (!definition) {
          return this.options[type + 's'][id]
        } else {
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && type === 'component') {
            validateComponentName(id);
          }
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition);
          }
          if (type === 'directive' && typeof definition === 'function') {
            definition = { bind: definition, update: definition };
          }
          this.options[type + 's'][id] = definition;
          return definition
        }
      };
    });
  }

  /*  */



  function getComponentName (opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
  }

  function matches (pattern, name) {
    if (Array.isArray(pattern)) {
      return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
      return pattern.split(',').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
      return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
  }

  function pruneCache (keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache;
    var keys = keepAliveInstance.keys;
    var _vnode = keepAliveInstance._vnode;
    for (var key in cache) {
      var cachedNode = cache[key];
      if (cachedNode) {
        var name = getComponentName(cachedNode.componentOptions);
        if (name && !filter(name)) {
          pruneCacheEntry(cache, key, keys, _vnode);
        }
      }
    }
  }

  function pruneCacheEntry (
    cache,
    key,
    keys,
    current
  ) {
    var cached$$1 = cache[key];
    if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
      cached$$1.componentInstance.$destroy();
    }
    cache[key] = null;
    remove(keys, key);
  }

  var patternTypes = [String, RegExp, Array];

  var KeepAlive = {
    name: 'keep-alive',
    abstract: true,

    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },

    created: function created () {
      this.cache = Object.create(null);
      this.keys = [];
    },

    destroyed: function destroyed () {
      for (var key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },

    mounted: function mounted () {
      var this$1 = this;

      this.$watch('include', function (val) {
        pruneCache(this$1, function (name) { return matches(val, name); });
      });
      this.$watch('exclude', function (val) {
        pruneCache(this$1, function (name) { return !matches(val, name); });
      });
    },

    render: function render () {
      var slot = this.$slots.default;
      var vnode = getFirstComponentChild(slot);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        // check pattern
        var name = getComponentName(componentOptions);
        var ref = this;
        var include = ref.include;
        var exclude = ref.exclude;
        if (
          // not included
          (include && (!name || !matches(include, name))) ||
          // excluded
          (exclude && name && matches(exclude, name))
        ) {
          return vnode
        }

        var ref$1 = this;
        var cache = ref$1.cache;
        var keys = ref$1.keys;
        var key = vnode.key == null
          // same constructor may get registered as different local components
          // so cid alone is not enough (#3269)
          ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
          : vnode.key;
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance;
          // make current key freshest
          remove(keys, key);
          keys.push(key);
        } else {
          cache[key] = vnode;
          keys.push(key);
          // prune oldest entry
          if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode);
          }
        }

        vnode.data.keepAlive = true;
      }
      return vnode || (slot && slot[0])
    }
  };

  var builtInComponents = {
    KeepAlive: KeepAlive
  };

  /*  */

  function initGlobalAPI (Vue) {
    // config
    var configDef = {};
    configDef.get = function () { return config; };
    if (process.env.NODE_ENV !== 'production') {
      configDef.set = function () {
        warn(
          'Do not replace the Vue.config object, set individual fields instead.'
        );
      };
    }
    Object.defineProperty(Vue, 'config', configDef);

    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
      warn: warn,
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive$$1
    };

    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;

    // 2.6 explicit observable API
    Vue.observable = function (obj) {
      observe(obj);
      return obj
    };

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });

    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;

    extend(Vue.options.components, builtInComponents);

    initUse(Vue);
    initMixin$1(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
  }

  initGlobalAPI(Vue);

  Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
  });

  Object.defineProperty(Vue.prototype, '$ssrContext', {
    get: function get () {
      /* istanbul ignore next */
      return this.$vnode && this.$vnode.ssrContext
    }
  });

  // expose FunctionalRenderContext for ssr runtime helper installation
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
    value: FunctionalRenderContext
  });

  Vue.version = '2.6.11';

  /*  */

  // these are reserved for web because they are directly compiled away
  // during template compilation
  var isReservedAttr = makeMap('style,class');

  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select,progress');
  var mustUseProp = function (tag, type, attr) {
    return (
      (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
      (attr === 'selected' && tag === 'option') ||
      (attr === 'checked' && tag === 'input') ||
      (attr === 'muted' && tag === 'video')
    )
  };

  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

  var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

  var convertEnumeratedValue = function (key, value) {
    return isFalsyAttrValue(value) || value === 'false'
      ? 'false'
      // allow arbitrary string value for contenteditable
      : key === 'contenteditable' && isValidContentEditableValue(value)
        ? value
        : 'true'
  };

  var isBooleanAttr = makeMap(
    'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
    'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
    'required,reversed,scoped,seamless,selected,sortable,translate,' +
    'truespeed,typemustmatch,visible'
  );

  var xlinkNS = 'http://www.w3.org/1999/xlink';

  var isXlink = function (name) {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
  };

  var getXlinkProp = function (name) {
    return isXlink(name) ? name.slice(6, name.length) : ''
  };

  var isFalsyAttrValue = function (val) {
    return val == null || val === false
  };

  /*  */

  function genClassForVnode (vnode) {
    var data = vnode.data;
    var parentNode = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while (isDef(parentNode = parentNode.parent)) {
      if (parentNode && parentNode.data) {
        data = mergeClassData(data, parentNode.data);
      }
    }
    return renderClass(data.staticClass, data.class)
  }

  function mergeClassData (child, parent) {
    return {
      staticClass: concat(child.staticClass, parent.staticClass),
      class: isDef(child.class)
        ? [child.class, parent.class]
        : parent.class
    }
  }

  function renderClass (
    staticClass,
    dynamicClass
  ) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
      return concat(staticClass, stringifyClass(dynamicClass))
    }
    /* istanbul ignore next */
    return ''
  }

  function concat (a, b) {
    return a ? b ? (a + ' ' + b) : a : (b || '')
  }

  function stringifyClass (value) {
    if (Array.isArray(value)) {
      return stringifyArray(value)
    }
    if (isObject(value)) {
      return stringifyObject(value)
    }
    if (typeof value === 'string') {
      return value
    }
    /* istanbul ignore next */
    return ''
  }

  function stringifyArray (value) {
    var res = '';
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
        if (res) { res += ' '; }
        res += stringified;
      }
    }
    return res
  }

  function stringifyObject (value) {
    var res = '';
    for (var key in value) {
      if (value[key]) {
        if (res) { res += ' '; }
        res += key;
      }
    }
    return res
  }

  /*  */

  var namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
  };

  var isHTMLTag = makeMap(
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'
  );

  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap(
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
    true
  );

  var isReservedTag = function (tag) {
    return isHTMLTag(tag) || isSVG(tag)
  };

  function getTagNamespace (tag) {
    if (isSVG(tag)) {
      return 'svg'
    }
    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
      return 'math'
    }
  }

  var unknownElementCache = Object.create(null);
  function isUnknownElement (tag) {
    /* istanbul ignore if */
    if (!inBrowser) {
      return true
    }
    if (isReservedTag(tag)) {
      return false
    }
    tag = tag.toLowerCase();
    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag]
    }
    var el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return (unknownElementCache[tag] = (
        el.constructor === window.HTMLUnknownElement ||
        el.constructor === window.HTMLElement
      ))
    } else {
      return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
    }
  }

  var isTextInputType = makeMap('text,number,password,search,email,tel,url');

  /*  */

  /**
   * Query an element selector if it's not an element already.
   */
  function query (el) {
    if (typeof el === 'string') {
      var selected = document.querySelector(el);
      if (!selected) {
        process.env.NODE_ENV !== 'production' && warn(
          'Cannot find element: ' + el
        );
        return document.createElement('div')
      }
      return selected
    } else {
      return el
    }
  }

  /*  */

  function createElement$1 (tagName, vnode) {
    var elm = document.createElement(tagName);
    if (tagName !== 'select') {
      return elm
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
      elm.setAttribute('multiple', 'multiple');
    }
    return elm
  }

  function createElementNS (namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName)
  }

  function createTextNode (text) {
    return document.createTextNode(text)
  }

  function createComment (text) {
    return document.createComment(text)
  }

  function insertBefore (parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
  }

  function removeChild (node, child) {
    node.removeChild(child);
  }

  function appendChild (node, child) {
    node.appendChild(child);
  }

  function parentNode (node) {
    return node.parentNode
  }

  function nextSibling (node) {
    return node.nextSibling
  }

  function tagName (node) {
    return node.tagName
  }

  function setTextContent (node, text) {
    node.textContent = text;
  }

  function setStyleScope (node, scopeId) {
    node.setAttribute(scopeId, '');
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    createElement: createElement$1,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setStyleScope: setStyleScope
  });

  /*  */

  var ref = {
    create: function create (_, vnode) {
      registerRef(vnode);
    },
    update: function update (oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function destroy (vnode) {
      registerRef(vnode, true);
    }
  };

  function registerRef (vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!isDef(key)) { return }

    var vm = vnode.context;
    var ref = vnode.componentInstance || vnode.elm;
    var refs = vm.$refs;
    if (isRemoval) {
      if (Array.isArray(refs[key])) {
        remove(refs[key], ref);
      } else if (refs[key] === ref) {
        refs[key] = undefined;
      }
    } else {
      if (vnode.data.refInFor) {
        if (!Array.isArray(refs[key])) {
          refs[key] = [ref];
        } else if (refs[key].indexOf(ref) < 0) {
          // $flow-disable-line
          refs[key].push(ref);
        }
      } else {
        refs[key] = ref;
      }
    }
  }

  /**
   * Virtual DOM patching algorithm based on Snabbdom by
   * Simon Friis Vindum (@paldepind)
   * Licensed under the MIT License
   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
   *
   * modified by Evan You (@yyx990803)
   *
   * Not type-checking this because this file is perf-critical and the cost
   * of making flow understand it is not worth it.
   */

  var emptyNode = new VNode('', {}, []);

  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

  function sameVnode (a, b) {
    return (
      a.key === b.key && (
        (
          a.tag === b.tag &&
          a.isComment === b.isComment &&
          isDef(a.data) === isDef(b.data) &&
          sameInputType(a, b)
        ) || (
          isTrue(a.isAsyncPlaceholder) &&
          a.asyncFactory === b.asyncFactory &&
          isUndef(b.asyncFactory.error)
        )
      )
    )
  }

  function sameInputType (a, b) {
    if (a.tag !== 'input') { return true }
    var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
  }

  function createKeyToOldIdx (children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key)) { map[key] = i; }
    }
    return map
  }

  function createPatchFunction (backend) {
    var i, j;
    var cbs = {};

    var modules = backend.modules;
    var nodeOps = backend.nodeOps;

    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }
    }

    function emptyNodeAt (elm) {
      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createRmCb (childElm, listeners) {
      function remove$$1 () {
        if (--remove$$1.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove$$1.listeners = listeners;
      return remove$$1
    }

    function removeNode (el) {
      var parent = nodeOps.parentNode(el);
      // element may have already been removed due to v-html / v-text
      if (isDef(parent)) {
        nodeOps.removeChild(parent, el);
      }
    }

    function isUnknownElement$$1 (vnode, inVPre) {
      return (
        !inVPre &&
        !vnode.ns &&
        !(
          config.ignoredElements.length &&
          config.ignoredElements.some(function (ignore) {
            return isRegExp(ignore)
              ? ignore.test(vnode.tag)
              : ignore === vnode.tag
          })
        ) &&
        config.isUnknownElement(vnode.tag)
      )
    }

    var creatingElmInVPre = 0;

    function createElm (
      vnode,
      insertedVnodeQueue,
      parentElm,
      refElm,
      nested,
      ownerArray,
      index
    ) {
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        // This vnode was used in a previous render!
        // now it's used as a new node, overwriting its elm would cause
        // potential patch errors down the road when it's used as an insertion
        // reference node. Instead, we clone the node on-demand before creating
        // associated DOM element for it.
        vnode = ownerArray[index] = cloneVNode(vnode);
      }

      vnode.isRootInsert = !nested; // for transition enter check
      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return
      }

      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {
        if (process.env.NODE_ENV !== 'production') {
          if (data && data.pre) {
            creatingElmInVPre++;
          }
          if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
            warn(
              'Unknown custom element: <' + tag + '> - did you ' +
              'register the component correctly? For recursive components, ' +
              'make sure to provide the "name" option.',
              vnode.context
            );
          }
        }

        vnode.elm = vnode.ns
          ? nodeOps.createElementNS(vnode.ns, tag)
          : nodeOps.createElement(tag, vnode);
        setScope(vnode);

        /* istanbul ignore if */
        {
          createChildren(vnode, children, insertedVnodeQueue);
          if (isDef(data)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
          }
          insert(parentElm, vnode.elm, refElm);
        }

        if (process.env.NODE_ENV !== 'production' && data && data.pre) {
          creatingElmInVPre--;
        }
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }

    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i = vnode.data;
      if (isDef(i)) {
        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
        if (isDef(i = i.hook) && isDef(i = i.init)) {
          i(vnode, false /* hydrating */);
        }
        // after calling the init hook, if the vnode is a child component
        // it should've created a child instance and mounted it. the child
        // component also has set the placeholder vnode's elm.
        // in that case we can just return the element and be done.
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          insert(parentElm, vnode.elm, refElm);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }
          return true
        }
      }
    }

    function initComponent (vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
        vnode.data.pendingInsert = null;
      }
      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        // empty component root.
        // skip all element-related modules except for ref (#3455)
        registerRef(vnode);
        // make sure to invoke the insert hook
        insertedVnodeQueue.push(vnode);
      }
    }

    function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i;
      // hack for #4339: a reactivated component with inner transition
      // does not trigger because the inner node's created hooks are not called
      // again. It's not ideal to involve module-specific logic in here but
      // there doesn't seem to be a better way to do it.
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
          for (i = 0; i < cbs.activate.length; ++i) {
            cbs.activate[i](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break
        }
      }
      // unlike a newly created component,
      // a reactivated keep-alive component doesn't insert itself
      insert(parentElm, vnode.elm, refElm);
    }

    function insert (parent, elm, ref$$1) {
      if (isDef(parent)) {
        if (isDef(ref$$1)) {
          if (nodeOps.parentNode(ref$$1) === parent) {
            nodeOps.insertBefore(parent, elm, ref$$1);
          }
        } else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }

    function createChildren (vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(children);
        }
        for (var i = 0; i < children.length; ++i) {
          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
      }
    }

    function isPatchable (vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag)
    }

    function invokeCreateHooks (vnode, insertedVnodeQueue) {
      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
        cbs.create[i$1](emptyNode, vnode);
      }
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (isDef(i.create)) { i.create(emptyNode, vnode); }
        if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
      }
    }

    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope (vnode) {
      var i;
      if (isDef(i = vnode.fnScopeId)) {
        nodeOps.setStyleScope(vnode.elm, i);
      } else {
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
            nodeOps.setStyleScope(vnode.elm, i);
          }
          ancestor = ancestor.parent;
        }
      }
      // for slot content they should also get the scopeId from the host instance.
      if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        i !== vnode.fnContext &&
        isDef(i = i.$options._scopeId)
      ) {
        nodeOps.setStyleScope(vnode.elm, i);
      }
    }

    function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
      }
    }

    function invokeDestroyHook (vnode) {
      var i, j;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
        for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
      }
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }

    function removeVnodes (vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else { // Text node
            removeNode(ch.elm);
          }
        }
      }
    }

    function removeAndInvokeRemoveHook (vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var i;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          // we have a recursively passed down rm callback
          // increase the listeners count
          rm.listeners += listeners;
        } else {
          // directly removing
          rm = createRmCb(vnode.elm, listeners);
        }
        // recursively invoke hooks on child component root node
        if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
          removeAndInvokeRemoveHook(i, rm);
        }
        for (i = 0; i < cbs.remove.length; ++i) {
          cbs.remove[i](vnode, rm);
        }
        if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
          i(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }

    function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

      // removeOnly is a special flag used only by <transition-group>
      // to ensure removed elements stay in correct relative positions
      // during leaving transitions
      var canMove = !removeOnly;

      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(newCh);
      }

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
          idxInOld = isDef(newStartVnode.key)
            ? oldKeyToIdx[newStartVnode.key]
            : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
          if (isUndef(idxInOld)) { // New element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          } else {
            vnodeToMove = oldCh[idxInOld];
            if (sameVnode(vnodeToMove, newStartVnode)) {
              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
              oldCh[idxInOld] = undefined;
              canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
            } else {
              // same key but different element. treat as new element
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
      }
    }

    function checkDuplicateKeys (children) {
      var seenKeys = {};
      for (var i = 0; i < children.length; i++) {
        var vnode = children[i];
        var key = vnode.key;
        if (isDef(key)) {
          if (seenKeys[key]) {
            warn(
              ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
              vnode.context
            );
          } else {
            seenKeys[key] = true;
          }
        }
      }
    }

    function findIdxInOld (node, oldCh, start, end) {
      for (var i = start; i < end; i++) {
        var c = oldCh[i];
        if (isDef(c) && sameVnode(node, c)) { return i }
      }
    }

    function patchVnode (
      oldVnode,
      vnode,
      insertedVnodeQueue,
      ownerArray,
      index,
      removeOnly
    ) {
      if (oldVnode === vnode) {
        return
      }

      if (isDef(vnode.elm) && isDef(ownerArray)) {
        // clone reused vnode
        vnode = ownerArray[index] = cloneVNode(vnode);
      }

      var elm = vnode.elm = oldVnode.elm;

      if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
          vnode.isAsyncPlaceholder = true;
        }
        return
      }

      // reuse element for static trees.
      // note we only do this if the vnode is cloned -
      // if the new node is not cloned it means the render functions have been
      // reset by the hot-reload-api and we need to do a proper re-render.
      if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
      ) {
        vnode.componentInstance = oldVnode.componentInstance;
        return
      }

      var i;
      var data = vnode.data;
      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
        i(oldVnode, vnode);
      }

      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
        if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
      }
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
        } else if (isDef(ch)) {
          if (process.env.NODE_ENV !== 'production') {
            checkDuplicateKeys(ch);
          }
          if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps.setTextContent(elm, vnode.text);
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
      }
    }

    function invokeInsertHook (vnode, queue, initial) {
      // delay insert hooks for component root nodes, invoke them after the
      // element is really inserted
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue;
      } else {
        for (var i = 0; i < queue.length; ++i) {
          queue[i].data.hook.insert(queue[i]);
        }
      }
    }

    var hydrationBailed = false;
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    // Note: style is excluded because it relies on initial clone for future
    // deep updates (#7063).
    var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
      var i;
      var tag = vnode.tag;
      var data = vnode.data;
      var children = vnode.children;
      inVPre = inVPre || (data && data.pre);
      vnode.elm = elm;

      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
        vnode.isAsyncPlaceholder = true;
        return true
      }
      // assert node match
      if (process.env.NODE_ENV !== 'production') {
        if (!assertNodeMatch(elm, vnode, inVPre)) {
          return false
        }
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
        if (isDef(i = vnode.componentInstance)) {
          // child component. it should have hydrated its own tree.
          initComponent(vnode, insertedVnodeQueue);
          return true
        }
      }
      if (isDef(tag)) {
        if (isDef(children)) {
          // empty element, allow client to pick up and populate children
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            // v-html and domProps: innerHTML
            if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
              if (i !== elm.innerHTML) {
                /* istanbul ignore if */
                if (process.env.NODE_ENV !== 'production' &&
                  typeof console !== 'undefined' &&
                  !hydrationBailed
                ) {
                  hydrationBailed = true;
                  console.warn('Parent: ', elm);
                  console.warn('server innerHTML: ', i);
                  console.warn('client innerHTML: ', elm.innerHTML);
                }
                return false
              }
            } else {
              // iterate and compare children lists
              var childrenMatch = true;
              var childNode = elm.firstChild;
              for (var i$1 = 0; i$1 < children.length; i$1++) {
                if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                  childrenMatch = false;
                  break
                }
                childNode = childNode.nextSibling;
              }
              // if childNode is not null, it means the actual childNodes list is
              // longer than the virtual children list.
              if (!childrenMatch || childNode) {
                /* istanbul ignore if */
                if (process.env.NODE_ENV !== 'production' &&
                  typeof console !== 'undefined' &&
                  !hydrationBailed
                ) {
                  hydrationBailed = true;
                  console.warn('Parent: ', elm);
                  console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
                }
                return false
              }
            }
          }
        }
        if (isDef(data)) {
          var fullInvoke = false;
          for (var key in data) {
            if (!isRenderedModule(key)) {
              fullInvoke = true;
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break
            }
          }
          if (!fullInvoke && data['class']) {
            // ensure collecting deps for deep class bindings for future updates
            traverse(data['class']);
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }
      return true
    }

    function assertNodeMatch (node, vnode, inVPre) {
      if (isDef(vnode.tag)) {
        return vnode.tag.indexOf('vue-component') === 0 || (
          !isUnknownElement$$1(vnode, inVPre) &&
          vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
        )
      } else {
        return node.nodeType === (vnode.isComment ? 8 : 3)
      }
    }

    return function patch (oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
        return
      }

      var isInitialPatch = false;
      var insertedVnodeQueue = [];

      if (isUndef(oldVnode)) {
        // empty mount (likely as component), create new root element
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          // patch existing root node
          patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
        } else {
          if (isRealElement) {
            // mounting to a real element
            // check if this is server-rendered content and if we can perform
            // a successful hydration.
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              oldVnode.removeAttribute(SSR_ATTR);
              hydrating = true;
            }
            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode
              } else if (process.env.NODE_ENV !== 'production') {
                warn(
                  'The client-side rendered virtual DOM tree is not matching ' +
                  'server-rendered content. This is likely caused by incorrect ' +
                  'HTML markup, for example nesting block-level elements inside ' +
                  '<p>, or missing <tbody>. Bailing hydration and performing ' +
                  'full client-side render.'
                );
              }
            }
            // either not server-rendered, or hydration failed.
            // create an empty node and replace it
            oldVnode = emptyNodeAt(oldVnode);
          }

          // replacing existing element
          var oldElm = oldVnode.elm;
          var parentElm = nodeOps.parentNode(oldElm);

          // create new node
          createElm(
            vnode,
            insertedVnodeQueue,
            // extremely rare edge case: do not insert if old element is in a
            // leaving transition. Only happens when combining transition +
            // keep-alive + HOCs. (#4590)
            oldElm._leaveCb ? null : parentElm,
            nodeOps.nextSibling(oldElm)
          );

          // update parent placeholder node element, recursively
          if (isDef(vnode.parent)) {
            var ancestor = vnode.parent;
            var patchable = isPatchable(vnode);
            while (ancestor) {
              for (var i = 0; i < cbs.destroy.length; ++i) {
                cbs.destroy[i](ancestor);
              }
              ancestor.elm = vnode.elm;
              if (patchable) {
                for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                  cbs.create[i$1](emptyNode, ancestor);
                }
                // #6513
                // invoke insert hooks that may have been merged by create hooks.
                // e.g. for directives that uses the "inserted" hook.
                var insert = ancestor.data.hook.insert;
                if (insert.merged) {
                  // start at index 1 to avoid re-invoking component mounted hook
                  for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                    insert.fns[i$2]();
                  }
                }
              } else {
                registerRef(ancestor);
              }
              ancestor = ancestor.parent;
            }
          }

          // destroy old node
          if (isDef(parentElm)) {
            removeVnodes([oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }

      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm
    }
  }

  /*  */

  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives (vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };

  function updateDirectives (oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update(oldVnode, vnode);
    }
  }

  function _update (oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

    var dirsWithInsert = [];
    var dirsWithPostpatch = [];

    var key, oldDir, dir;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        // new directive, bind
        callHook$1(dir, 'bind', vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        // existing directive, update
        dir.oldValue = oldDir.value;
        dir.oldArg = oldDir.arg;
        callHook$1(dir, 'update', vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }

    if (dirsWithInsert.length) {
      var callInsert = function () {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode, 'insert', callInsert);
      } else {
        callInsert();
      }
    }

    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode, 'postpatch', function () {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
        }
      });
    }

    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          // no longer present, unbind
          callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }

  var emptyModifiers = Object.create(null);

  function normalizeDirectives$1 (
    dirs,
    vm
  ) {
    var res = Object.create(null);
    if (!dirs) {
      // $flow-disable-line
      return res
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        // $flow-disable-line
        dir.modifiers = emptyModifiers;
      }
      res[getRawDirName(dir)] = dir;
      dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
    }
    // $flow-disable-line
    return res
  }

  function getRawDirName (dir) {
    return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
  }

  function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      try {
        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
      } catch (e) {
        handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
      }
    }
  }

  var baseModules = [
    ref,
    directives
  ];

  /*  */

  function updateAttrs (oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
      return
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
      return
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(attrs.__ob__)) {
      attrs = vnode.data.attrs = extend({}, attrs);
    }

    for (key in attrs) {
      cur = attrs[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur);
      }
    }
    // #4391: in IE9, setting type can reset value for input[type=radio]
    // #6666: IE/Edge forces progress value down to 1 before setting a max
    /* istanbul ignore if */
    if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
      setAttr(elm, 'value', attrs.value);
    }
    for (key in oldAttrs) {
      if (isUndef(attrs[key])) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }

  function setAttr (el, key, value) {
    if (el.tagName.indexOf('-') > -1) {
      baseSetAttr(el, key, value);
    } else if (isBooleanAttr(key)) {
      // set attribute for blank value
      // e.g. <option disabled>Select one</option>
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        // technically allowfullscreen is a boolean attribute for <iframe>,
        // but Flash expects a value of "true" when used on <embed> tag
        value = key === 'allowfullscreen' && el.tagName === 'EMBED'
          ? 'true'
          : key;
        el.setAttribute(key, value);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, convertEnumeratedValue(key, value));
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      baseSetAttr(el, key, value);
    }
  }

  function baseSetAttr (el, key, value) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && value !== '' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }

  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };

  /*  */

  function updateClass (oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (
      isUndef(data.staticClass) &&
      isUndef(data.class) && (
        isUndef(oldData) || (
          isUndef(oldData.staticClass) &&
          isUndef(oldData.class)
        )
      )
    ) {
      return
    }

    var cls = genClassForVnode(vnode);

    // handle transition classes
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
      cls = concat(cls, stringifyClass(transitionClass));
    }

    // set the class
    if (cls !== el._prevClass) {
      el.setAttribute('class', cls);
      el._prevClass = cls;
    }
  }

  var klass = {
    create: updateClass,
    update: updateClass
  };

  /*  */

  /*  */

  /*  */

  /*  */

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';
  var CHECKBOX_RADIO_TOKEN = '__c';

  /*  */

  // normalize v-model event tokens that can only be determined at runtime.
  // it's important to place the event as the first in the array because
  // the whole point is ensuring the v-model callback gets called before
  // user-attached handlers.
  function normalizeEvents (on) {
    /* istanbul ignore if */
    if (isDef(on[RANGE_TOKEN])) {
      // IE input[type=range] only supports `change` event
      var event = isIE ? 'change' : 'input';
      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
      delete on[RANGE_TOKEN];
    }
    // This was originally intended to fix #4521 but no longer necessary
    // after 2.5. Keeping it for backwards compat with generated code from < 2.4
    /* istanbul ignore if */
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
      on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
      delete on[CHECKBOX_RADIO_TOKEN];
    }
  }

  var target$1;

  function createOnceHandler$1 (event, handler, capture) {
    var _target = target$1; // save current target element in closure
    return function onceHandler () {
      var res = handler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, onceHandler, capture, _target);
      }
    }
  }

  // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
  // implementation and does not fire microtasks in between event propagation, so
  // safe to exclude.
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

  function add$1 (
    name,
    handler,
    capture,
    passive
  ) {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    if (useMicrotaskFix) {
      var attachedTimestamp = currentFlushTimestamp;
      var original = handler;
      handler = original._wrapper = function (e) {
        if (
          // no bubbling, should always fire.
          // this is just a safety net in case event.timeStamp is unreliable in
          // certain weird environments...
          e.target === e.currentTarget ||
          // event is fired after handler attachment
          e.timeStamp >= attachedTimestamp ||
          // bail for environments that have buggy event.timeStamp implementations
          // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
          // #9681 QtWebEngine event.timeStamp is negative value
          e.timeStamp <= 0 ||
          // #9448 bail if event is fired in another document in a multi-page
          // electron/nw.js app, since event.timeStamp will be using a different
          // starting reference
          e.target.ownerDocument !== document
        ) {
          return original.apply(this, arguments)
        }
      };
    }
    target$1.addEventListener(
      name,
      handler,
      supportsPassive
        ? { capture: capture, passive: passive }
        : capture
    );
  }

  function remove$2 (
    name,
    handler,
    capture,
    _target
  ) {
    (_target || target$1).removeEventListener(
      name,
      handler._wrapper || handler,
      capture
    );
  }

  function updateDOMListeners (oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
      return
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target$1 = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
    target$1 = undefined;
  }

  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners
  };

  /*  */

  var svgContainer;

  function updateDOMProps (oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
      return
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(props.__ob__)) {
      props = vnode.data.domProps = extend({}, props);
    }

    for (key in oldProps) {
      if (!(key in props)) {
        elm[key] = '';
      }
    }

    for (key in props) {
      cur = props[key];
      // ignore children if the node has textContent or innerHTML,
      // as these will throw away existing DOM nodes and cause removal errors
      // on subsequent patches (#3360)
      if (key === 'textContent' || key === 'innerHTML') {
        if (vnode.children) { vnode.children.length = 0; }
        if (cur === oldProps[key]) { continue }
        // #6601 work around Chrome version <= 55 bug where single textNode
        // replaced by innerHTML/textContent retains its parentNode property
        if (elm.childNodes.length === 1) {
          elm.removeChild(elm.childNodes[0]);
        }
      }

      if (key === 'value' && elm.tagName !== 'PROGRESS') {
        // store value as _value as well since
        // non-string values will be stringified
        elm._value = cur;
        // avoid resetting cursor position when value is the same
        var strCur = isUndef(cur) ? '' : String(cur);
        if (shouldUpdateValue(elm, strCur)) {
          elm.value = strCur;
        }
      } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
        // IE doesn't support innerHTML for SVG elements
        svgContainer = svgContainer || document.createElement('div');
        svgContainer.innerHTML = "<svg>" + cur + "</svg>";
        var svg = svgContainer.firstChild;
        while (elm.firstChild) {
          elm.removeChild(elm.firstChild);
        }
        while (svg.firstChild) {
          elm.appendChild(svg.firstChild);
        }
      } else if (
        // skip the update if old and new VDOM state is the same.
        // `value` is handled separately because the DOM value may be temporarily
        // out of sync with VDOM state due to focus, composition and modifiers.
        // This  #4521 by skipping the unnecesarry `checked` update.
        cur !== oldProps[key]
      ) {
        // some property updates can throw
        // e.g. `value` on <progress> w/ non-finite value
        try {
          elm[key] = cur;
        } catch (e) {}
      }
    }
  }

  // check platforms/web/util/attrs.js acceptValue


  function shouldUpdateValue (elm, checkVal) {
    return (!elm.composing && (
      elm.tagName === 'OPTION' ||
      isNotInFocusAndDirty(elm, checkVal) ||
      isDirtyWithModifiers(elm, checkVal)
    ))
  }

  function isNotInFocusAndDirty (elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is
    // not equal to the updated value
    var notInFocus = true;
    // #6157
    // work around IE bug when accessing document.activeElement in an iframe
    try { notInFocus = document.activeElement !== elm; } catch (e) {}
    return notInFocus && elm.value !== checkVal
  }

  function isDirtyWithModifiers (elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if (isDef(modifiers)) {
      if (modifiers.number) {
        return toNumber(value) !== toNumber(newVal)
      }
      if (modifiers.trim) {
        return value.trim() !== newVal.trim()
      }
    }
    return value !== newVal
  }

  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };

  /*  */

  var parseStyleText = cached(function (cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res
  });

  // merge static and dynamic style data on the same vnode
  function normalizeStyleData (data) {
    var style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle
      ? extend(data.staticStyle, style)
      : style
  }

  // normalize possible array / string values into Object
  function normalizeStyleBinding (bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle)
    }
    if (typeof bindingStyle === 'string') {
      return parseStyleText(bindingStyle)
    }
    return bindingStyle
  }

  /**
   * parent component style should be after child's
   * so that parent component's style could override it
   */
  function getStyle (vnode, checkChild) {
    var res = {};
    var styleData;

    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (
          childNode && childNode.data &&
          (styleData = normalizeStyleData(childNode.data))
        ) {
          extend(res, styleData);
        }
      }
    }

    if ((styleData = normalizeStyleData(vnode.data))) {
      extend(res, styleData);
    }

    var parentNode = vnode;
    while ((parentNode = parentNode.parent)) {
      if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
        extend(res, styleData);
      }
    }
    return res
  }

  /*  */

  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function (el, name, val) {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
    } else {
      var normalizedName = normalize(name);
      if (Array.isArray(val)) {
        // Support values array created by autoprefixer, e.g.
        // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
        // Set them one by one, and the browser will only set those it can recognize
        for (var i = 0, len = val.length; i < len; i++) {
          el.style[normalizedName] = val[i];
        }
      } else {
        el.style[normalizedName] = val;
      }
    }
  };

  var vendorNames = ['Webkit', 'Moz', 'ms'];

  var emptyStyle;
  var normalize = cached(function (prop) {
    emptyStyle = emptyStyle || document.createElement('div').style;
    prop = camelize(prop);
    if (prop !== 'filter' && (prop in emptyStyle)) {
      return prop
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
      var name = vendorNames[i] + capName;
      if (name in emptyStyle) {
        return name
      }
    }
  });

  function updateStyle (oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;

    if (isUndef(data.staticStyle) && isUndef(data.style) &&
      isUndef(oldData.staticStyle) && isUndef(oldData.style)
    ) {
      return
    }

    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
    var oldStyle = oldStaticStyle || oldStyleBinding;

    var style = normalizeStyleBinding(vnode.data.style) || {};

    // store normalized style under a different key for next diff
    // make sure to clone it if it's reactive, since the user likely wants
    // to mutate it.
    vnode.data.normalizedStyle = isDef(style.__ob__)
      ? extend({}, style)
      : style;

    var newStyle = getStyle(vnode, true);

    for (name in oldStyle) {
      if (isUndef(newStyle[name])) {
        setProp(el, name, '');
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        // ie9 setting to null has no effect, must use empty string
        setProp(el, name, cur == null ? '' : cur);
      }
    }
  }

  var style = {
    create: updateStyle,
    update: updateStyle
  };

  /*  */

  var whitespaceRE = /\s+/;

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function addClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      if (cur.indexOf(' ' + cls + ' ') < 0) {
        el.setAttribute('class', (cur + cls).trim());
      }
    }
  }

  /**
   * Remove class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function removeClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
      } else {
        el.classList.remove(cls);
      }
      if (!el.classList.length) {
        el.removeAttribute('class');
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      var tar = ' ' + cls + ' ';
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, ' ');
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute('class', cur);
      } else {
        el.removeAttribute('class');
      }
    }
  }

  /*  */

  function resolveTransition (def$$1) {
    if (!def$$1) {
      return
    }
    /* istanbul ignore else */
    if (typeof def$$1 === 'object') {
      var res = {};
      if (def$$1.css !== false) {
        extend(res, autoCssTransition(def$$1.name || 'v'));
      }
      extend(res, def$$1);
      return res
    } else if (typeof def$$1 === 'string') {
      return autoCssTransition(def$$1)
    }
  }

  var autoCssTransition = cached(function (name) {
    return {
      enterClass: (name + "-enter"),
      enterToClass: (name + "-enter-to"),
      enterActiveClass: (name + "-enter-active"),
      leaveClass: (name + "-leave"),
      leaveToClass: (name + "-leave-to"),
      leaveActiveClass: (name + "-leave-active")
    }
  });

  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';

  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';
  if (hasTransition) {
    /* istanbul ignore if */
    if (window.ontransitionend === undefined &&
      window.onwebkittransitionend !== undefined
    ) {
      transitionProp = 'WebkitTransition';
      transitionEndEvent = 'webkitTransitionEnd';
    }
    if (window.onanimationend === undefined &&
      window.onwebkitanimationend !== undefined
    ) {
      animationProp = 'WebkitAnimation';
      animationEndEvent = 'webkitAnimationEnd';
    }
  }

  // binding to window is necessary to make hot reload work in IE in strict mode
  var raf = inBrowser
    ? window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : setTimeout
    : /* istanbul ignore next */ function (fn) { return fn(); };

  function nextFrame (fn) {
    raf(function () {
      raf(fn);
    });
  }

  function addTransitionClass (el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
      transitionClasses.push(cls);
      addClass(el, cls);
    }
  }

  function removeTransitionClass (el, cls) {
    if (el._transitionClasses) {
      remove(el._transitionClasses, cls);
    }
    removeClass(el, cls);
  }

  function whenTransitionEnds (
    el,
    expectedType,
    cb
  ) {
    var ref = getTransitionInfo(el, expectedType);
    var type = ref.type;
    var timeout = ref.timeout;
    var propCount = ref.propCount;
    if (!type) { return cb() }
    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function () {
      el.removeEventListener(event, onEnd);
      cb();
    };
    var onEnd = function (e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    setTimeout(function () {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }

  var transformRE = /\b(transform|all)(,|$)/;

  function getTransitionInfo (el, expectedType) {
    var styles = window.getComputedStyle(el);
    // JSDOM may return undefined for transition properties
    var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
    var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
    var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);

    var type;
    var timeout = 0;
    var propCount = 0;
    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0
        ? transitionTimeout > animationTimeout
          ? TRANSITION
          : ANIMATION
        : null;
      propCount = type
        ? type === TRANSITION
          ? transitionDurations.length
          : animationDurations.length
        : 0;
    }
    var hasTransform =
      type === TRANSITION &&
      transformRE.test(styles[transitionProp + 'Property']);
    return {
      type: type,
      timeout: timeout,
      propCount: propCount,
      hasTransform: hasTransform
    }
  }

  function getTimeout (delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }

    return Math.max.apply(null, durations.map(function (d, i) {
      return toMs(d) + toMs(delays[i])
    }))
  }

  // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
  // in a locale-dependent way, using a comma instead of a dot.
  // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
  // as a floor function) causing unexpected behaviors
  function toMs (s) {
    return Number(s.slice(0, -1).replace(',', '.')) * 1000
  }

  /*  */

  function enter (vnode, toggleDisplay) {
    var el = vnode.elm;

    // call leave callback now
    if (isDef(el._leaveCb)) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return
    }

    /* istanbul ignore if */
    if (isDef(el._enterCb) || el.nodeType !== 1) {
      return
    }

    var css = data.css;
    var type = data.type;
    var enterClass = data.enterClass;
    var enterToClass = data.enterToClass;
    var enterActiveClass = data.enterActiveClass;
    var appearClass = data.appearClass;
    var appearToClass = data.appearToClass;
    var appearActiveClass = data.appearActiveClass;
    var beforeEnter = data.beforeEnter;
    var enter = data.enter;
    var afterEnter = data.afterEnter;
    var enterCancelled = data.enterCancelled;
    var beforeAppear = data.beforeAppear;
    var appear = data.appear;
    var afterAppear = data.afterAppear;
    var appearCancelled = data.appearCancelled;
    var duration = data.duration;

    // activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      context = transitionNode.context;
      transitionNode = transitionNode.parent;
    }

    var isAppear = !context._isMounted || !vnode.isRootInsert;

    if (isAppear && !appear && appear !== '') {
      return
    }

    var startClass = isAppear && appearClass
      ? appearClass
      : enterClass;
    var activeClass = isAppear && appearActiveClass
      ? appearActiveClass
      : enterActiveClass;
    var toClass = isAppear && appearToClass
      ? appearToClass
      : enterToClass;

    var beforeEnterHook = isAppear
      ? (beforeAppear || beforeEnter)
      : beforeEnter;
    var enterHook = isAppear
      ? (typeof appear === 'function' ? appear : enter)
      : enter;
    var afterEnterHook = isAppear
      ? (afterAppear || afterEnter)
      : afterEnter;
    var enterCancelledHook = isAppear
      ? (appearCancelled || enterCancelled)
      : enterCancelled;

    var explicitEnterDuration = toNumber(
      isObject(duration)
        ? duration.enter
        : duration
    );

    if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
      checkDuration(explicitEnterDuration, 'enter', vnode);
    }

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);

    var cb = el._enterCb = once(function () {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }
        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });

    if (!vnode.data.show) {
      // remove pending leave element on enter by injecting an insert hook
      mergeVNodeHook(vnode, 'insert', function () {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb
        ) {
          pendingNode.elm._leaveCb();
        }
        enterHook && enterHook(el, cb);
      });
    }

    // start enter transition
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame(function () {
        removeTransitionClass(el, startClass);
        if (!cb.cancelled) {
          addTransitionClass(el, toClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitEnterDuration)) {
              setTimeout(cb, explicitEnterDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }

  function leave (vnode, rm) {
    var el = vnode.elm;

    // call enter callback now
    if (isDef(el._enterCb)) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data) || el.nodeType !== 1) {
      return rm()
    }

    /* istanbul ignore if */
    if (isDef(el._leaveCb)) {
      return
    }

    var css = data.css;
    var type = data.type;
    var leaveClass = data.leaveClass;
    var leaveToClass = data.leaveToClass;
    var leaveActiveClass = data.leaveActiveClass;
    var beforeLeave = data.beforeLeave;
    var leave = data.leave;
    var afterLeave = data.afterLeave;
    var leaveCancelled = data.leaveCancelled;
    var delayLeave = data.delayLeave;
    var duration = data.duration;

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave);

    var explicitLeaveDuration = toNumber(
      isObject(duration)
        ? duration.leave
        : duration
    );

    if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
      checkDuration(explicitLeaveDuration, 'leave', vnode);
    }

    var cb = el._leaveCb = once(function () {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }
      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }
        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });

    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }

    function performLeave () {
      // the delayed leave may have already been cancelled
      if (cb.cancelled) {
        return
      }
      // record leaving element
      if (!vnode.data.show && el.parentNode) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
      }
      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame(function () {
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled) {
            addTransitionClass(el, leaveToClass);
            if (!userWantsControl) {
              if (isValidDuration(explicitLeaveDuration)) {
                setTimeout(cb, explicitLeaveDuration);
              } else {
                whenTransitionEnds(el, type, cb);
              }
            }
          }
        });
      }
      leave && leave(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }

  // only used in dev mode
  function checkDuration (val, name, vnode) {
    if (typeof val !== 'number') {
      warn(
        "<transition> explicit " + name + " duration is not a valid number - " +
        "got " + (JSON.stringify(val)) + ".",
        vnode.context
      );
    } else if (isNaN(val)) {
      warn(
        "<transition> explicit " + name + " duration is NaN - " +
        'the duration expression might be incorrect.',
        vnode.context
      );
    }
  }

  function isValidDuration (val) {
    return typeof val === 'number' && !isNaN(val)
  }

  /**
   * Normalize a transition hook's argument length. The hook may be:
   * - a merged hook (invoker) with the original in .fns
   * - a wrapped component method (check ._length)
   * - a plain function (.length)
   */
  function getHookArgumentsLength (fn) {
    if (isUndef(fn)) {
      return false
    }
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
      // invoker
      return getHookArgumentsLength(
        Array.isArray(invokerFns)
          ? invokerFns[0]
          : invokerFns
      )
    } else {
      return (fn._length || fn.length) > 1
    }
  }

  function _enter (_, vnode) {
    if (vnode.data.show !== true) {
      enter(vnode);
    }
  }

  var transition = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function remove$$1 (vnode, rm) {
      /* istanbul ignore else */
      if (vnode.data.show !== true) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};

  var platformModules = [
    attrs,
    klass,
    events,
    domProps,
    style,
    transition
  ];

  /*  */

  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules = platformModules.concat(baseModules);

  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

  /**
   * Not type checking this file because flow doesn't like attaching
   * properties to Elements.
   */

  /* istanbul ignore if */
  if (isIE9) {
    // http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange', function () {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, 'input');
      }
    });
  }

  var directive = {
    inserted: function inserted (el, binding, vnode, oldVnode) {
      if (vnode.tag === 'select') {
        // #6903
        if (oldVnode.elm && !oldVnode.elm._vOptions) {
          mergeVNodeHook(vnode, 'postpatch', function () {
            directive.componentUpdated(el, binding, vnode);
          });
        } else {
          setSelected(el, binding, vnode.context);
        }
        el._vOptions = [].map.call(el.options, getValue);
      } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
          // Safari < 10.2 & UIWebView doesn't fire compositionend when
          // switching focus before confirming composition choice
          // this also fixes the issue where some browsers e.g. iOS Chrome
          // fires "change" instead of "input" on autocomplete.
          el.addEventListener('change', onCompositionEnd);
          /* istanbul ignore if */
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },

    componentUpdated: function componentUpdated (el, binding, vnode) {
      if (vnode.tag === 'select') {
        setSelected(el, binding, vnode.context);
        // in case the options rendered by v-for have changed,
        // it's possible that the value is out-of-sync with the rendered options.
        // detect such cases and filter out values that no longer has a matching
        // option in the DOM.
        var prevOptions = el._vOptions;
        var curOptions = el._vOptions = [].map.call(el.options, getValue);
        if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
          // trigger change event if
          // no matching option found for at least one value
          var needReset = el.multiple
            ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
            : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
          if (needReset) {
            trigger(el, 'change');
          }
        }
      }
    }
  };

  function setSelected (el, binding, vm) {
    actuallySetSelected(el, binding, vm);
    /* istanbul ignore if */
    if (isIE || isEdge) {
      setTimeout(function () {
        actuallySetSelected(el, binding, vm);
      }, 0);
    }
  }

  function actuallySetSelected (el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        "<select multiple v-model=\"" + (binding.expression) + "\"> " +
        "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
        vm
      );
      return
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }
          return
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }

  function hasNoMatchingOption (value, options) {
    return options.every(function (o) { return !looseEqual(o, value); })
  }

  function getValue (option) {
    return '_value' in option
      ? option._value
      : option.value
  }

  function onCompositionStart (e) {
    e.target.composing = true;
  }

  function onCompositionEnd (e) {
    // prevent triggering an input event for no reason
    if (!e.target.composing) { return }
    e.target.composing = false;
    trigger(e.target, 'input');
  }

  function trigger (el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }

  /*  */

  // recursively search for possible transition defined inside the component root
  function locateNode (vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
      ? locateNode(vnode.componentInstance._vnode)
      : vnode
  }

  var show = {
    bind: function bind (el, ref, vnode) {
      var value = ref.value;

      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay =
        el.style.display === 'none' ? '' : el.style.display;
      if (value && transition$$1) {
        vnode.data.show = true;
        enter(vnode, function () {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : 'none';
      }
    },

    update: function update (el, ref, vnode) {
      var value = ref.value;
      var oldValue = ref.oldValue;

      /* istanbul ignore if */
      if (!value === !oldValue) { return }
      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      if (transition$$1) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function () {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function () {
            el.style.display = 'none';
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : 'none';
      }
    },

    unbind: function unbind (
      el,
      binding,
      vnode,
      oldVnode,
      isDestroy
    ) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };

  var platformDirectives = {
    model: directive,
    show: show
  };

  /*  */

  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };

  // in case the child is also an abstract component, e.g. <keep-alive>
  // we want to recursively retrieve the real component to be rendered
  function getRealChild (vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children))
    } else {
      return vnode
    }
  }

  function extractTransitionData (comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    var listeners = options._parentListeners;
    for (var key$1 in listeners) {
      data[camelize(key$1)] = listeners[key$1];
    }
    return data
  }

  function placeholder (h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
      return h('keep-alive', {
        props: rawChild.componentOptions.propsData
      })
    }
  }

  function hasParentTransition (vnode) {
    while ((vnode = vnode.parent)) {
      if (vnode.data.transition) {
        return true
      }
    }
  }

  function isSameChild (child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag
  }

  var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

  var isVShowDirective = function (d) { return d.name === 'show'; };

  var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,

    render: function render (h) {
      var this$1 = this;

      var children = this.$slots.default;
      if (!children) {
        return
      }

      // filter out text nodes (possible whitespaces)
      children = children.filter(isNotTextNode);
      /* istanbul ignore if */
      if (!children.length) {
        return
      }

      // warn multiple elements
      if (process.env.NODE_ENV !== 'production' && children.length > 1) {
        warn(
          '<transition> can only be used on a single element. Use ' +
          '<transition-group> for lists.',
          this.$parent
        );
      }

      var mode = this.mode;

      // warn invalid mode
      if (process.env.NODE_ENV !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in'
      ) {
        warn(
          'invalid <transition> mode: ' + mode,
          this.$parent
        );
      }

      var rawChild = children[0];

      // if this is a component root node and the component's
      // parent container node also has transition, skip.
      if (hasParentTransition(this.$vnode)) {
        return rawChild
      }

      // apply transition data to child
      // use getRealChild() to ignore abstract components e.g. keep-alive
      var child = getRealChild(rawChild);
      /* istanbul ignore if */
      if (!child) {
        return rawChild
      }

      if (this._leaving) {
        return placeholder(h, rawChild)
      }

      // ensure a key that is unique to the vnode type and to this transition
      // component instance. This key will be used to remove pending leaving nodes
      // during entering.
      var id = "__transition-" + (this._uid) + "-";
      child.key = child.key == null
        ? child.isComment
          ? id + 'comment'
          : id + child.tag
        : isPrimitive(child.key)
          ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
          : child.key;

      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);

      // mark v-show
      // so that the transition module can hand over the control to the directive
      if (child.data.directives && child.data.directives.some(isVShowDirective)) {
        child.data.show = true;
      }

      if (
        oldChild &&
        oldChild.data &&
        !isSameChild(child, oldChild) &&
        !isAsyncPlaceholder(oldChild) &&
        // #6687 component root is a comment node
        !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
      ) {
        // replace old child transition data with fresh one
        // important for dynamic transitions!
        var oldData = oldChild.data.transition = extend({}, data);
        // handle transition mode
        if (mode === 'out-in') {
          // return placeholder node and queue update when leave finishes
          this._leaving = true;
          mergeVNodeHook(oldData, 'afterLeave', function () {
            this$1._leaving = false;
            this$1.$forceUpdate();
          });
          return placeholder(h, rawChild)
        } else if (mode === 'in-out') {
          if (isAsyncPlaceholder(child)) {
            return oldRawChild
          }
          var delayedLeave;
          var performLeave = function () { delayedLeave(); };
          mergeVNodeHook(data, 'afterEnter', performLeave);
          mergeVNodeHook(data, 'enterCancelled', performLeave);
          mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
        }
      }

      return rawChild
    }
  };

  /*  */

  var props = extend({
    tag: String,
    moveClass: String
  }, transitionProps);

  delete props.mode;

  var TransitionGroup = {
    props: props,

    beforeMount: function beforeMount () {
      var this$1 = this;

      var update = this._update;
      this._update = function (vnode, hydrating) {
        var restoreActiveInstance = setActiveInstance(this$1);
        // force removing pass
        this$1.__patch__(
          this$1._vnode,
          this$1.kept,
          false, // hydrating
          true // removeOnly (!important, avoids unnecessary moves)
        );
        this$1._vnode = this$1.kept;
        restoreActiveInstance();
        update.call(this$1, vnode, hydrating);
      };
    },

    render: function render (h) {
      var tag = this.tag || this.$vnode.data.tag || 'span';
      var map = Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);

      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
            children.push(c);
            map[c.key] = c
            ;(c.data || (c.data = {})).transition = transitionData;
          } else if (process.env.NODE_ENV !== 'production') {
            var opts = c.componentOptions;
            var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
            warn(("<transition-group> children must be keyed: <" + name + ">"));
          }
        }
      }

      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
          var c$1 = prevChildren[i$1];
          c$1.data.transition = transitionData;
          c$1.data.pos = c$1.elm.getBoundingClientRect();
          if (map[c$1.key]) {
            kept.push(c$1);
          } else {
            removed.push(c$1);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }

      return h(tag, null, children)
    },

    updated: function updated () {
      var children = this.prevChildren;
      var moveClass = this.moveClass || ((this.name || 'v') + '-move');
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return
      }

      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);

      // force reflow to put everything in position
      // assign to this to avoid being removed in tree-shaking
      // $flow-disable-line
      this._reflow = document.body.offsetHeight;

      children.forEach(function (c) {
        if (c.data.moved) {
          var el = c.elm;
          var s = el.style;
          addTransitionClass(el, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = '';
          el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
            if (e && e.target !== el) {
              return
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          });
        }
      });
    },

    methods: {
      hasMove: function hasMove (el, moveClass) {
        /* istanbul ignore if */
        if (!hasTransition) {
          return false
        }
        /* istanbul ignore if */
        if (this._hasMove) {
          return this._hasMove
        }
        // Detect whether an element with the move class applied has
        // CSS transitions. Since the element may be inside an entering
        // transition at this very moment, we make a clone of it and remove
        // all other transition classes applied to ensure only the move class
        // is applied.
        var clone = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
        }
        addClass(clone, moveClass);
        clone.style.display = 'none';
        this.$el.appendChild(clone);
        var info = getTransitionInfo(clone);
        this.$el.removeChild(clone);
        return (this._hasMove = info.hasTransform)
      }
    }
  };

  function callPendingCbs (c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }
    /* istanbul ignore if */
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }

  function recordPosition (c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }

  function applyTranslation (c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
      s.transitionDuration = '0s';
    }
  }

  var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
  };

  /*  */

  // install platform specific utils
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;

  // install platform runtime directives & components
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);

  // install platform patch function
  Vue.prototype.__patch__ = inBrowser ? patch : noop;

  // public mount method
  Vue.prototype.$mount = function (
    el,
    hydrating
  ) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating)
  };

  // devtools global hook
  /* istanbul ignore next */
  if (inBrowser) {
    setTimeout(function () {
      if (config.devtools) {
        if (devtools) {
          devtools.emit('init', Vue);
        } else if (
          process.env.NODE_ENV !== 'production' &&
          process.env.NODE_ENV !== 'test'
        ) {
          console[console.info ? 'info' : 'log'](
            'Download the Vue Devtools extension for a better development experience:\n' +
            'https://github.com/vuejs/vue-devtools'
          );
        }
      }
      if (process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        config.productionTip !== false &&
        typeof console !== 'undefined'
      ) {
        console[console.info ? 'info' : 'log'](
          "You are running Vue in development mode.\n" +
          "Make sure to turn on production mode when deploying for production.\n" +
          "See more tips at https://vuejs.org/guide/deployment.html"
        );
      }
    }, 0);
  }

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
    var directiveProperties = binding.value ? binding.value : {}; // set observer options from directive binding if available, otherwise set defaults

    var observerOptions = {
      disableFade: directiveProperties.disableFade ? directiveProperties.disableFade : false,
      root: directiveProperties.root ? directiveProperties.root : null,
      rootMargin: directiveProperties.rootMargin ? directiveProperties.rootMargin : '400px',
      threshold: directiveProperties.threshold ? directiveProperties.threshold : 0
    }; // set transparent image base 64 before image is loaded
    // el.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
    // attach initial class to lazy loaded <img> tag

    if (el.tagName === 'IMG') {
      // tag lazy loaded image
      el.classList.add('lazy-image');
    } // attach initial class to lazy loaded <picture> tag


    if (el.tagName === 'PICTURE') {
      el.children.item(el.children.length - 1).classList.add('lazy-image');
    }

    if (el.tagName === 'VIDEO') {
      el.classList.add('lazy-video');
    } // do we support intersection observer?


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
      var videoTag = element.tagName === 'VIDEO';
      var loadingClass = videoTag ? 'video-loading' : 'img-loading';
      var loadedClass = videoTag ? 'video-loaded' : 'img-loaded';

      if (observerOptions.disableFade) {
        element.classList.add('no-fade');
      } // add 'loading' class to <img>


      element.classList.add(loadingClass); // retrieve data-src and apply value to element src (loan / show src)

      if (videoTag) {
        var _iterator = _createForOfIteratorHelper(element.children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var elementChild = _step.value;

            if (elementChild.tagName === 'SOURCE') {
              elementChild.setAttribute('src', elementChild.dataset.src);
              element.load();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        element.setAttribute('src', element.dataset.src);
      } // create image loaded event


      element.addEventListener('load', function () {
        loadedState();
      }, false); // create video loaded event

      element.addEventListener('loadeddata', function () {
        loadedState();
      }, false);

      function loadedState() {
        // remove 'loading' class to <img>
        element.classList.remove(loadingClass); // add 'loaded' class to <img>

        setTimeout(function () {
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
      } // -----------------------------------------------------------
      // case PICTURE tag
      // -----------------------------------------------------------


      if (element.tagName === 'PICTURE') {
        // loop on picture elements children
        var _iterator2 = _createForOfIteratorHelper(element.children),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var elementChild = _step2.value;

            // case SOURCE
            if (elementChild.tagName === 'SOURCE') {
              // retrieve data-src and apply value to element srcset (loan / show image)
              elementChild.setAttribute('srcset', elementChild.dataset.src);
              emitEvent('loaded');
            } // case IMG


            if (elementChild.tagName === 'IMG') {
              loadSrc(elementChild, observerOptions);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }

    function initObserver(observerOptions) {
      // create observer instance
      var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var intersectingElement = entry.target;
            loadElement(intersectingElement, observerOptions);
            observer.unobserve(intersectingElement);
            observer.disconnect();
          }
        });
      }, observerOptions); // add element to intersection observer

      observer.observe(el);
    }
  });

  /**
   * @mixin
   * This mixin sets up all shared properties between the image and picture components
   */
  var imageShared = {
    props: {
      /**
       * Alternative text to display for the image
       */
      altText: {
        type: String,
        required: true
      },

      /**
       * Default image to show
       */
      defaultImage: {
        type: String,
        "default": 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
      }
    }
  };

  /**
   * @mixin
   * This mixin sets up all shared properties between the image, video and picture lazyLoaded components
   */
  var lazyLoadShared = {
    props: {
      /**
       * Whether or not the image should lazy load
       */
      lazy: {
        type: Boolean,
        "default": true
      },

      /**
       * Whether or not to fade the element in if/when lazy loaded
       */
      fade: {
        type: Boolean,
        "default": true
      },

      /**
       * Easing function of fade transition
       */
      fadeEasing: {
        type: String,
        "default": 'ease-out'
      },

      /**
       * Length in seconds of fade transition
       */
      fadeDuration: {
        type: String,
        "default": '0.4'
      },

      /**
       * Root Margin value to use for the intersection observer that handles lazy loading
       */
      rootMargin: {
        type: String,
        "default": '400px'
      }
    },
    computed: {
      fadeStyle: function fadeStyle() {
        return "transition: opacity ".concat(this.fadeDuration, "s ").concat(this.fadeEasing);
      }
    }
  };

  //
  /**
   * BaseImage is a rock solid image component that requires alt text, and handles lazy loading by default.
   * `loaded` event is emitted once image has lazy loaded
   */

  var script$4 = {
    name: "ZrImage",
    mixins: [imageShared, lazyLoadShared],
    props: {
      /**
       * Path of image to display
       */
      imageSrc: {
        type: String,
        "default": ''
      },

      /**
       * Class to be attached to image
       */
      imageClass: {
        type: String,
        required: false
      }
    }
  };

  /* script */
  const __vue_script__$4 = script$4;

  /* template */
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [
      _vm.lazy
        ? _c("img", {
            directives: [
              {
                name: "lazy",
                rawName: "v-lazy",
                value: { rootMargin: _vm.rootMargin },
                expression: "{rootMargin: rootMargin}"
              }
            ],
            class: [_vm.imageClass, { "fade-image": _vm.fade }],
            style: _vm.fadeStyle,
            attrs: {
              "data-src": _vm.imageSrc,
              src: _vm.defaultImage,
              alt: _vm.altText
            }
          })
        : _c("img", {
            class: _vm.imageClass,
            attrs: { src: _vm.imageSrc, alt: _vm.altText }
          }),
      _vm._v(" "),
      _c("noscript", {
        inlineTemplate: {
          render: function() {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("img", {
              class: _vm.imageClass,
              attrs: { src: _vm.imageSrc, alt: _vm.altText }
            })
          },
          staticRenderFns: []
        }
      })
    ])
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    const __vue_inject_styles__$4 = function (inject) {
      if (!inject) return
      inject("data-v-5471d41f_0", { source: "img[data-v-5471d41f] {\n  width: 100%;\n}\nimg.lazy-image.fade-image[data-v-5471d41f] {\n  opacity: 0;\n}\nimg.lazy-image.fade-image.img-loaded[data-v-5471d41f] {\n  opacity: 1;\n}\n\n/*# sourceMappingURL=ZrImage.vue.map */", map: {"version":3,"sources":["/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrImage.vue","ZrImage.vue"],"names":[],"mappings":"AA6CA;EACA,WAAA;AC5CA;AD8CA;EACA,UAAA;AC5CA;AD8CA;EACA,UAAA;AC5CA;;AAEA,sCAAsC","file":"ZrImage.vue","sourcesContent":["<template>\n  <div>\n    <img v-if=\"lazy\" v-lazy=\"{rootMargin: rootMargin}\" :data-src=\"imageSrc\"\n         :src=\"defaultImage\" :alt=\"altText\" :class=\"[imageClass, {'fade-image': fade}]\" :style=\"fadeStyle\" />\n    <img v-else :src=\"imageSrc\" :alt=\"altText\" :class=\"imageClass\"/>\n    <noscript inline-template>\n      <img :src=\"imageSrc\" :alt=\"altText\" :class=\"imageClass\"/>\n    </noscript>\n  </div>\n</template>\n\n<script>\n\n  import '../../directives/lazyLoad'\n  import {imageShared} from '../../mixins/imageShared'\n  import {lazyLoadShared} from '../../mixins/lazyLoadShared';\n\n  /**\n   * BaseImage is a rock solid image component that requires alt text, and handles lazy loading by default.\n   * `loaded` event is emitted once image has lazy loaded\n   */\n\n  export default {\n    name: \"ZrImage\",\n    mixins: [imageShared, lazyLoadShared],\n    props: {\n      /**\n       * Path of image to display\n       */\n      imageSrc: {\n        type: String,\n        default: ''\n      },\n      /**\n       * Class to be attached to image\n       */\n      imageClass: {\n        type: String,\n        required: false\n      }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n  img {\n    width: 100%;\n\n    &.lazy-image.fade-image {\n      opacity: 0;\n\n      &.img-loaded {\n        opacity: 1;\n      }\n    }\n  }\n</style>\n\n<docs>\n  ### Examples\n\n  #### Default image with lazy loading\n  ```jsx\n  <ZrImage :image-src=\"images.thumbnail.url\" :alt-text=\"text.sentence\"/>\n  ```\n\n  #### Image with no lazy loading\n  ```jsx\n  <ZrImage :image-src=\"images.thumbnail.url\" :alt-text=\"text.sentence\"/>\n  ```\n\n  #### Image with custom lazy load fade duration and easing\n  ```jsx\n  <ZrImage\n    :image-src=\"images.thumbnail.url\"\n    :alt-text=\"text.sentence\"\n    fade-duration=\"0.8\"\n    fade-easing=\"linear\"\n  />\n  ```\n\n</docs>\n","img {\n  width: 100%;\n}\nimg.lazy-image.fade-image {\n  opacity: 0;\n}\nimg.lazy-image.fade-image.img-loaded {\n  opacity: 1;\n}\n\n/*# sourceMappingURL=ZrImage.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$4 = "data-v-5471d41f";
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  var script$5 = {
    name: "ZrInputWrapper",
    mixins: [inputShared]
  };

  /* script */
  const __vue_script__$5 = script$5;

  /* template */
  var __vue_render__$5 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        class: [
          "input-wrapper",
          {
            "full-width": _vm.full,
            valid: _vm.valid,
            invalid: _vm.invalid,
            required: _vm.required
          }
        ]
      },
      [
        _vm.required && _vm.requiredLabel
          ? _c("p", { staticClass: "required-label" }, [_vm._v("Required")])
          : _vm._e(),
        _vm._v(" "),
        _vm._t("default"),
        _vm._v(" "),
        _vm.invalid
          ? _c("p", { staticClass: "invalid-message" }, [
              _vm._v(_vm._s(_vm.validationMessage))
            ])
          : _vm._e()
      ],
      2
    )
  };
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;

    /* style */
    const __vue_inject_styles__$5 = function (inject) {
      if (!inject) return
      inject("data-v-2cc38277_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-2cc38277 {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.input-wrapper[data-v-2cc38277] {\n  display: block;\n  position: relative;\n  margin-bottom: 0.5rem;\n  padding-bottom: 1.5rem;\n  width: 15rem;\n}\n.input-wrapper.full-width[data-v-2cc38277] {\n  width: 100%;\n}\n.input-wrapper.required[data-v-2cc38277] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n.input-wrapper.required .required-label[data-v-2cc38277] {\n  order: 2;\n}\n.input-wrapper.required label[data-v-2cc38277] {\n  order: 1;\n}\n.input-wrapper.required input[data-v-2cc38277],\n.input-wrapper.required .select-wrapper[data-v-2cc38277] {\n  order: 3;\n  width: 100%;\n}\n.input-wrapper.required .invalid-message[data-v-2cc38277] {\n  order: 4;\n}\n.input-wrapper .invalid-message[data-v-2cc38277] {\n  position: absolute;\n  bottom: 0;\n  margin: 0;\n  font-size: 0.75rem;\n  color: #d23838;\n}\n.required-label[data-v-2cc38277] {\n  display: block;\n  font-size: 0.625rem;\n  text-transform: uppercase;\n  margin: 0;\n  color: #d23838;\n  font-weight: 700;\n}\n\n/*# sourceMappingURL=ZrInputWrapper.vue.map */", map: {"version":3,"sources":["ZrInputWrapper.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrInputWrapper.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;ACwBA;;EAAA;AAgBA;;EAAA;AAiBA;;EAAA;AD/CA;;EAEE;ACFF;EACA,cAAA;EACA,kBAAA;EACA,qBAAA;EACA,sBAAA;EACA,YAFA;ADMA;ACFA;EACA,WAAA;ADIA;ACDA;EACA,aAAA;EACA,eAAA;EACA,8BAAA;ADGA;ACDA;EACA,QAAA;ADGA;ACAA;EACA,QAAA;ADEA;ACCA;;EAEA,QAAA;EACA,WAAA;ADCA;ACEA;EACA,QAAA;ADAA;ACIA;EACA,kBAAA;EACA,SAAA;EACA,SAAA;EACA,kBAAA;EACA,cAAA;ADFA;ACMA;EACA,cAAA;EACA,mBAAA;EACA,yBAAA;EACA,SAAA;EACA,cAAA;EACA,gBAAA;ADHA;;AAEA,6CAA6C","file":"ZrInputWrapper.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.input-wrapper {\n  display: block;\n  position: relative;\n  margin-bottom: 0.5rem;\n  padding-bottom: 1.5rem;\n  width: 15rem;\n}\n.input-wrapper.full-width {\n  width: 100%;\n}\n.input-wrapper.required {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n}\n.input-wrapper.required .required-label {\n  order: 2;\n}\n.input-wrapper.required label {\n  order: 1;\n}\n.input-wrapper.required input,\n.input-wrapper.required .select-wrapper {\n  order: 3;\n  width: 100%;\n}\n.input-wrapper.required .invalid-message {\n  order: 4;\n}\n.input-wrapper .invalid-message {\n  position: absolute;\n  bottom: 0;\n  margin: 0;\n  font-size: 0.75rem;\n  color: #d23838;\n}\n\n.required-label {\n  display: block;\n  font-size: 0.625rem;\n  text-transform: uppercase;\n  margin: 0;\n  color: #d23838;\n  font-weight: 700;\n}\n\n/*# sourceMappingURL=ZrInputWrapper.vue.map */","<template>\n    <div :class=\"['input-wrapper', {'full-width': full, 'valid': valid, 'invalid': invalid, 'required': required}]\">\n        <p v-if=\"required && requiredLabel\" class=\"required-label\">Required</p>\n        <slot></slot>\n        <p v-if=\"invalid\" class=\"invalid-message\">{{validationMessage}}</p>\n    </div>\n</template>\n\n<script>\n  import {inputShared} from \"../../mixins/inputShared\";\n\n  export default {\n    name: \"ZrInputWrapper\",\n    mixins: [inputShared]\n  }\n</script>\n\n<style scoped lang=\"scss\">\n    @import '../../styles/imports';\n\n    .input-wrapper {\n        display: block;\n        position: relative;\n        margin-bottom: $margin-small;\n        padding-bottom: $margin-smedium;\n        width: $input-default-width;\n\n        &.full-width {\n            width: 100%;\n        }\n\n        &.required {\n            display: flex;\n            flex-wrap: wrap;\n            justify-content: space-between;\n\n            .required-label {\n                order: 2;\n            }\n\n            label {\n                order: 1;\n            }\n\n            input,\n            .select-wrapper {\n                order: 3;\n                width: 100%;\n            }\n\n            .invalid-message {\n                order: 4;\n            }\n        }\n\n        .invalid-message {\n            position: absolute;\n            bottom: 0;\n            margin: 0;\n            font-size: $font-size-xsmall;\n            color: $color-warning;\n        }\n    }\n\n    .required-label {\n        display: block;\n        font-size: $font-size-xxsmall;\n        text-transform: uppercase;\n        margin: 0;\n        color: $color-warning;\n        font-weight: $font-weight-bold;\n    }\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$5 = "data-v-2cc38277";
    /* module identifier */
    const __vue_module_identifier__$5 = undefined;
    /* functional template */
    const __vue_is_functional_template__$5 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      createInjector,
      undefined,
      undefined
    );

  var script$6 = {
    name: "ZrInput",
    components: {
      BaseInputWrapper: __vue_component__$5
    },
    mixins: [inputShared],
    props: _objectSpread2(_objectSpread2({}, inputShared.props), {}, {
      /**
       * input type options. `text` (default), `email`, `password`, `search`, `number`
       */
      type: {
        type: String,
        "default": 'text',
        validator: function validator(value) {
          return ['text', 'email', 'password', 'search', 'number'].indexOf(value) !== -1;
        }
      },

      /**
       * predefined value of the input
       */
      value: {
        type: [String, Number],
        "default": ''
      },

      /**
       * Visually hide the input label
       */
      labelHidden: {
        type: Boolean,
        "default": false
      },

      /**
       * `sm`, `md`, or `lg`. Default is `md`. corresponds to button styles
       */
      size: {
        type: String,
        "default": 'md',
        validator: function validator(value) {
          return ['sm', 'md', 'lg'].indexOf(value) !== -1;
        }
      },

      /**
       * Text to display as a placeholder in the input
       */
      placeholder: {
        type: String,
        "default": ''
      }
    }),
    methods: {
      updateValue: function updateValue(event) {
        this.$emit('input', event.target.value);
      }
    }
  };

  /* script */
  const __vue_script__$6 = script$6;

  /* template */
  var __vue_render__$6 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "base-input-wrapper",
      _vm._b({}, "base-input-wrapper", _vm.$props, false),
      [
        _vm.label
          ? _c(
              "label",
              {
                class: { "visually-hidden": _vm.labelHidden },
                attrs: { for: _vm.id }
              },
              [_vm._v(_vm._s(_vm.label))]
            )
          : _vm._e(),
        _vm._v(" "),
        _c("input", {
          class: { "input-sm": _vm.size === "sm", "input-lg": _vm.size === "lg" },
          attrs: {
            type: _vm.type,
            id: _vm.id,
            name: _vm.name ? _vm.name : _vm.id,
            "aria-label": !_vm.label ? _vm.placeholder : !_vm.label,
            placeholder: _vm.placeholder,
            title: _vm.title,
            required: _vm.required,
            disabled: _vm.disabled
          },
          domProps: { value: _vm.value },
          on: {
            input: _vm.updateValue,
            blur: function($event) {
              return _vm.$emit("blur")
            },
            focus: function($event) {
              return _vm.$emit("focus")
            }
          }
        })
      ]
    )
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;

    /* style */
    const __vue_inject_styles__$6 = function (inject) {
      if (!inject) return
      inject("data-v-4557a49a_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-4557a49a {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\ninput[data-v-4557a49a] {\n  display: block;\n  font-size: 1rem;\n  padding: 0.75em 1em;\n  border: 1px solid #8C8A7E;\n  width: 100%;\n  color: #181817;\n  font-family: sans-serif;\n  transition: all 0.25s ease-out;\n  background-color: rgba(255, 255, 255, 0.36);\n}\ninput[data-v-4557a49a]::placeholder {\n  color: rgba(24, 24, 23, 0.5);\n}\ninput[data-v-4557a49a]:focus {\n  border-color: #2A2928;\n  outline: none;\n  background-color: rgba(255, 255, 255, 0.6);\n}\ninput.input-sm[data-v-4557a49a] {\n  padding: 0.5em 0.5em;\n}\ninput.input-lg[data-v-4557a49a] {\n  padding: 1em 1.5em;\n  font-size: 1.125rem;\n}\n.invalid input[data-v-4557a49a] {\n  border-color: #d23838;\n}\nlabel[data-v-4557a49a] {\n  display: inline-block;\n  padding-bottom: 0.25em;\n  cursor: pointer;\n  user-select: none;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  font-family: sans-serif;\n  font-weight: 700;\n  line-height: 1.2em;\n  letter-spacing: 0.0833em;\n  line-height: 1rem;\n}\nlabel.visually-hidden[data-v-4557a49a] {\n  display: none;\n}\n\n/*# sourceMappingURL=ZrInput.vue.map */", map: {"version":3,"sources":["ZrInput.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrInput.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;AACA;;EAEE;AACF;;EAEE;AACF;;EAEE;ACgEF;;EAAA;AAEA;EACA,cAAA;EACA,eAAA;EACA,mBAAA;EACA,yBAAA;EACA,WAAA;EACA,cAAA;EACA,uBAAA;EACA,8BAAA;EACA,2CAAA;AD7DA;AC+DA;EACA,4BAAA;AD7DA;ACgEA;EACA,qBAAA;EACA,aAAA;EACA,0CAAA;AD9DA;ACiEA;EACA,oBAAA;AD/DA;ACkEA;EACA,kBAAA;EACA,mBAAA;ADhEA;ACmEA;EACA,qBAAA;ADjEA;ACqEA;EACA,qBAAA;EACA,sBAAA;EACA,eAAA;EACA,iBAAA;EDlEE,kBAAkB;EAClB,yBAAyB;EACzB,uBAAuB;EACvB,gBAAgB;EAChB,kBAAkB;EAClB,wBAAwB;ECgE1B,iBAAA;AD9DA;ACgEA;EACA,aAAA;AD9DA;;AAEA,sCAAsC","file":"ZrInput.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\ninput {\n  display: block;\n  font-size: 1rem;\n  padding: 0.75em 1em;\n  border: 1px solid #8C8A7E;\n  width: 100%;\n  color: #181817;\n  font-family: sans-serif;\n  transition: all 0.25s ease-out;\n  background-color: rgba(255, 255, 255, 0.36);\n}\ninput::placeholder {\n  color: rgba(24, 24, 23, 0.5);\n}\ninput:focus {\n  border-color: #2A2928;\n  outline: none;\n  background-color: rgba(255, 255, 255, 0.6);\n}\ninput.input-sm {\n  padding: 0.5em 0.5em;\n}\ninput.input-lg {\n  padding: 1em 1.5em;\n  font-size: 1.125rem;\n}\n.invalid input {\n  border-color: #d23838;\n}\n\nlabel {\n  display: inline-block;\n  padding-bottom: 0.25em;\n  cursor: pointer;\n  user-select: none;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  font-family: sans-serif;\n  font-weight: 700;\n  line-height: 1.2em;\n  letter-spacing: 0.0833em;\n  line-height: 1rem;\n}\nlabel.visually-hidden {\n  display: none;\n}\n\n/*# sourceMappingURL=ZrInput.vue.map */","<template>\n  <base-input-wrapper v-bind=\"$props\">\n    <label v-if=\"label\" :class=\"{'visually-hidden': labelHidden}\" :for=\"id\">{{label}}</label>\n    <input :type=\"type\"\n           :id=\"id\"\n           :name=\"name ? name : id\"\n           :value=\"value\"\n           :aria-label=\"!label ? placeholder : !label\"\n           :placeholder=\"placeholder\"\n           :title=\"title\"\n           :required=\"required\"\n           :class=\"{'input-sm': size === 'sm', 'input-lg': size === 'lg'}\"\n           :disabled=\"disabled\"\n           @input=\"updateValue\"\n           @blur=\"$emit('blur')\"\n           @focus=\"$emit('focus')\"\n    />\n  </base-input-wrapper>\n</template>\n\n<script>\n  import {inputShared} from \"../../mixins/inputShared\";\n  import BaseInputWrapper from './ZrInputWrapper.vue';\n\n  export default {\n    name: \"ZrInput\",\n    components: {\n      BaseInputWrapper\n    },\n    mixins: [inputShared],\n    props: {\n      ...inputShared.props,\n      /**\n       * input type options. `text` (default), `email`, `password`, `search`, `number`\n       */\n      type: {\n        type: String,\n        default: 'text',\n        validator: function (value) {\n          return ['text', 'email', 'password', 'search', 'number'].indexOf(value) !== -1\n        }\n      },\n      /**\n       * predefined value of the input\n       */\n      value: {\n        type: [String, Number],\n        default: ''\n      },\n      /**\n       * Visually hide the input label\n       */\n      labelHidden: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * `sm`, `md`, or `lg`. Default is `md`. corresponds to button styles\n       */\n      size: {\n        type: String,\n        default: 'md',\n        validator: function (value) {\n          return ['sm', 'md', 'lg'].indexOf(value) !== -1\n        }\n      },\n      /**\n       * Text to display as a placeholder in the input\n       */\n      placeholder: {\n        type: String,\n        default: ''\n      }\n    },\n    methods: {\n      updateValue(event) {\n        this.$emit('input', event.target.value);\n      }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n  @import '../../styles/imports';\n\n  input {\n    display: block;\n    font-size: $font-size-base;\n    padding: $input-padding;\n    border: 1px solid $input-border-color;\n    width: 100%;\n    color: $color-darkest;\n    font-family: sans-serif;\n    transition: $transition-base;\n    background-color: rgba($color-white, .36);\n\n    &::placeholder {\n      color: rgba($color-darkest, .5);\n    }\n\n    &:focus {\n      border-color: $input-border-color-focus;\n      outline: none;\n      background-color: rgba($color-white, .6);\n    }\n\n    &.input-sm {\n      padding: $input-padding-sm;\n    }\n\n    &.input-lg {\n      padding: $input-padding-lg;\n      font-size: $font-size-medium;\n    }\n\n    .invalid & {\n      border-color: $color-warning;\n    }\n  }\n\n  label {\n    display: inline-block;\n    padding-bottom: 0.25em;\n    cursor: pointer;\n    user-select: none;\n\n    @include font-label();\n    line-height: 1rem;\n\n    &.visually-hidden {\n      display: none;\n    }\n  }\n</style>\n\n\n<docs>\n  ### Default input with Label\n  ```jsx\n  <ZrInput\n    label=\"Full Name\"\n    placeholder=\"Example: John S. Smith\"\n    id=\"full-name\"\n  >\n  </ZrInput>\n  ```\n\n  ### Invalid Input\n  #### <sub><sup>(See 'invalid' class on parent)</sup></sub>\n  ```jsx\n  <ZrInput\n    label=\"Full Name\"\n    placeholder=\"Example: John S. Smith\"\n    id=\"full-name\"\n    :invalid=\"true\"\n    validation-message=\"invalid input\"\n  >\n  </ZrInput>\n  ```\n\n  ### Multiple input's with invalid messages\n  ```jsx\n  <ZrInput\n    label=\"Email\"\n    placeholder=\"Email\"\n    value=\"creative@zaneray.com\"\n    id=\"email\"\n    :required=\"true\"\n    :invalid=\"false\"\n    validation-message=\"invalid input\"\n  >\n  </ZrInput>\n  <ZrInput\n    label=\"First Name\"\n    placeholder=\"Example: John\"\n    id=\"first-name\"\n    :required=\"true\"\n    :invalid=\"true\"\n    validation-message=\"invalid input\"\n  >\n  </ZrInput>\n  <ZrInput\n    label=\"Last Name\"\n    placeholder=\"Smith\"\n    id=\"last-name\"\n    :required=\"true\"\n    :invalid=\"true\"\n    validation-message=\"invalid input\"\n  >\n  </ZrInput>\n  ```\n\n  ### Valid Input\n  #### <sub><sup>(See 'valid' class on parent)</sup></sub>\n  ```jsx\n  <ZrInput\n    label=\"Full Name\"\n    placeholder=\"Example: John S. Smith\"\n    id=\"full-name\"\n    :valid=\"true\"\n  >\n  </ZrInput>\n  ```\n\n  ### Default input Number\n  ```jsx\n  <ZrInput\n    label=\"Enter a Number\"\n    type=\"number\"\n    id=\"full-name\"\n  >\n  </ZrInput>\n  ```\n\n  ### Default input Number Disabled\n  ```jsx\n  <ZrInput\n    label=\"Enter a Number\"\n    type=\"number\"\n    id=\"full-name\"\n    :disabled=\"true\"\n  >\n  </ZrInput>\n  ```\n\n  ### full width Input without a label\n  ```jsx\n  <ZrInput\n    placeholder=\"First Name\"\n    id=\"first-name\"\n    label=\"No Label\"\n    :label-hidden=\"true\"\n    full\n  >\n  </ZrInput>\n  ```\n\n  ### Stacked inputs with a submit\n  ```jsx\n  <form>\n    <ZrInput\n      label=\"First Name\"\n      id=\"first-name\"\n    >\n    </ZrInput>\n    <ZrInput\n      label=\"Last Name\"\n      id=\"first-name\"\n    >\n    </ZrInput>\n  </form>\n  ```\n\n</docs>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$6 = "data-v-4557a49a";
    /* module identifier */
    const __vue_module_identifier__$6 = undefined;
    /* functional template */
    const __vue_is_functional_template__$6 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$7 = {
    name: "ZrLoading",
    props: {
      /**
       * This Boolean will hide or display the loader.
       */
      active: {
        type: Boolean,
        "default": false
      },

      /**
       * This Boolean will show a transparent overlay
       */
      background: {
        type: Boolean,
        "default": false
      },

      /**
       * This Boolean fade in the overlay
       */
      fade: {
        type: Boolean,
        "default": false
      },

      /**
       * Time, in milliseconds for transition animation
       */
      duration: {
        type: Number,
        "default": 400
      },

      /**
       * Easing value of fade-in/fade-out
       */
      easing: {
        type: String,
        "default": 'ease-out'
      }
    }
  };

  /* script */
  const __vue_script__$7 = script$7;

  /* template */
  var __vue_render__$7 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: "loading-fade" } }, [
      _vm.active
        ? _c(
            "div",
            {
              staticClass: "loading-container",
              class: { overlay: _vm.background, fade: _vm.fade },
              style: "transition: opacity " + _vm.duration + "ms " + _vm.easing
            },
            [_vm._t("default", [_c("span", { staticClass: "default-spinner" })])],
            2
          )
        : _vm._e()
    ])
  };
  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;

    /* style */
    const __vue_inject_styles__$7 = function (inject) {
      if (!inject) return
      inject("data-v-0f0fc766_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-0f0fc766 {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.loading-container[data-v-0f0fc766] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n.default-spinner[data-v-0f0fc766] {\n  display: block;\n  position: relative;\n  left: calc(50% - 12px);\n  top: calc(50% - 12px);\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  border: 4px solid #D9D6CF;\n  border-top: 4px solid #1a4939;\n  animation: spin-data-v-0f0fc766 1.4s linear infinite;\n}\n.fade.loading-fade-enter[data-v-0f0fc766] {\n  opacity: 0;\n}\n.fade.loading-fade-leave[data-v-0f0fc766] {\n  opacity: 1;\n}\n.overlay[data-v-0f0fc766] {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n@keyframes spin-data-v-0f0fc766 {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n\n/*# sourceMappingURL=ZrLoading.vue.map */", map: {"version":3,"sources":["ZrLoading.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrLoading.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;AACA;;EAEE;AACF;;EAEE;ACmDF;;EAAA;AAgBA;;EAAA;AAxBA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;ADnCA;ACsCA;EACA,cAAA;EACA,kBAAA;EACA,sBAAA;EACA,qBAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,yBAAA;EACA,6BAAA;EACA,oDAAA;ADnCA;ACsCA;EACA,UAAA;ADnCA;ACsCA;EACA,UAAA;ADnCA;ACsCA;EACA,oCAAA;ADnCA;ACsCA;AACA;IACA,uBAAA;ADnCE;ACsCF;IACA,yBAAA;ADpCE;AACF;;AAEA,wCAAwC","file":"ZrLoading.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.loading-container {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n}\n\n.default-spinner {\n  display: block;\n  position: relative;\n  left: calc(50% - 12px);\n  top: calc(50% - 12px);\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  border: 4px solid #D9D6CF;\n  border-top: 4px solid #1a4939;\n  animation: spin 1.4s linear infinite;\n}\n\n.fade.loading-fade-enter {\n  opacity: 0;\n}\n\n.fade.loading-fade-leave {\n  opacity: 1;\n}\n\n.overlay {\n  background-color: rgba(0, 0, 0, 0.1);\n}\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n/*# sourceMappingURL=ZrLoading.vue.map */","<template>\n  <transition name=\"loading-fade\">\n    <div v-if=\"active\"\n         :class=\"{'overlay': background, 'fade': fade}\"\n         :style=\"`transition: opacity ${duration}ms ${easing}`\"\n         class=\"loading-container\">\n      <slot>\n        <span class=\"default-spinner\"></span>\n      </slot>\n    </div>\n  </transition>\n</template>\n\n<script>\n  export default {\n    name: \"ZrLoading\",\n    props: {\n      /**\n       * This Boolean will hide or display the loader.\n       */\n      active: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * This Boolean will show a transparent overlay\n       */\n      background: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * This Boolean fade in the overlay\n       */\n      fade: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * Time, in milliseconds for transition animation\n       */\n      duration: {\n        type: Number,\n        default: 400\n      },\n      /**\n       * Easing value of fade-in/fade-out\n       */\n      easing: {\n        type: String,\n        default: 'ease-out'\n      }\n    }\n  };\n</script>\n\n<style scoped lang=\"scss\">\n  @import '../../styles/imports';\n\n  .loading-container {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n  }\n\n  .default-spinner {\n    display: block;\n    position: relative;\n    left: calc(50% - 12px);\n    top: calc(50% - 12px);\n    width: 16px;\n    height: 16px;\n    border-radius: 50%;\n    border: 4px solid $color-light;\n    border-top: 4px solid $color-primary;\n    animation: spin 1.4s linear infinite;\n  }\n\n  .fade.loading-fade-enter {\n    opacity: 0;\n  }\n\n  .fade.loading-fade-leave {\n    opacity: 1;\n  }\n\n  .overlay {\n    background-color: rgba($color-black, 0.1);\n  }\n\n  @keyframes spin {\n    0% {\n      transform: rotate(0deg);\n    }\n\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n</style>\n\n<docs>\n  ### Examples\n\n  #### Default Spinner\n  ```jsx\n  <div style=\"position: relative; height: 250px; width: 650px;\">\n    <ZrLoading :active=\"true\"></ZrLoading>\n  </div>\n  ```\n\n  #### Overlay Spinner\n  ```jsx\n  <div style=\"position: relative; height: 250px; width: 650px;\">\n    <ZrLoading :active=\"true\" :background=\"true\"></ZrLoading>\n  </div>\n  ```\n\n  #### Custom transition\n  ```jsx\n  <div style=\"position: relative; height: 250px; width: 650px;\">\n    <ZrLoading :active=\"true\" :background=\"true\" :fade=\"true\" :duration=\"500\" easing=\"cubic-bezier(0.250, 0.250, 0.785, 0.325)\"></ZrLoading>\n  </div>\n  ```\n\n  #### Custom Loader\n  ```jsx\n  <div style=\"position: relative; height: 250px; width: 650px;\">\n    <ZrLoading :active=\"true\" :background=\"true\">\n      <span>Loading...</span>\n    </ZrLoading>\n  </div>\n  ```\n</docs>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$7 = "data-v-0f0fc766";
    /* module identifier */
    const __vue_module_identifier__$7 = undefined;
    /* functional template */
    const __vue_is_functional_template__$7 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  /**
   * Picture component for displaying multiple versions of an image responsively.
   * `loaded` event is emitted once picture has lazy loaded
   */

  var script$8 = {
    name: "ZrPicture",
    mixins: [imageShared, lazyLoadShared],
    props: {
      /**
       * Mobile image url to render
       */
      mobileImg: {
        type: String,
        required: true
      },

      /**
       * Tablet image url to render
       */
      tabletImg: {
        type: String,
        required: false,
        "default": null
      },

      /**
       * Desktop image url to render
       */
      desktopImg: {
        type: String,
        required: false,
        "default": null
      },

      /**
       * Breakpoints (pixels) at which to switch between mobile, tablet and desktop image
       */
      breakpointTablet: {
        type: Number,
        "default": 768
      },
      breakpointDesktop: {
        type: Number,
        "default": 1024
      }
    },
    computed: {
      breakpointQueryDesktop: function breakpointQueryDesktop() {
        return "(min-width: ".concat(this.breakpointDesktop, "px)");
      },
      breakpointQueryTablet: function breakpointQueryTablet() {
        return "(min-width: ".concat(this.breakpointTablet, "px)");
      }
    }
  };

  /* script */
  const __vue_script__$8 = script$8;

  /* template */
  var __vue_render__$8 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      [
        _vm.lazy
          ? [
              _c(
                "picture",
                {
                  directives: [
                    {
                      name: "lazy",
                      rawName: "v-lazy",
                      value: { rootMargin: _vm.rootMargin },
                      expression: "{rootMargin: rootMargin}"
                    }
                  ]
                },
                [
                  _vm.desktopImg
                    ? _c("source", {
                        attrs: {
                          "data-src": _vm.desktopImg,
                          media: _vm.breakpointQueryDesktop,
                          srcset: _vm.defaultImage
                        }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.tabletImg
                    ? _c("source", {
                        attrs: {
                          "data-src": _vm.tabletImg,
                          media: _vm.breakpointQueryTablet,
                          srcset: _vm.defaultImage
                        }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _c("img", {
                    class: { "fade-image": _vm.fade },
                    style: _vm.fadeStyle,
                    attrs: {
                      "data-src": _vm.mobileImg,
                      alt: _vm.altText,
                      src: _vm.defaultImage
                    }
                  })
                ]
              ),
              _vm._v(" "),
              _c("noscript", {
                inlineTemplate: {
                  render: function() {
                    var _vm = this;
                    var _h = _vm.$createElement;
                    var _c = _vm._self._c || _h;
                    return _c("picture", [
                      _vm.desktopImg
                        ? _c("source", {
                            attrs: {
                              srcset: _vm.desktopImg,
                              media: _vm.breakpointQueryDesktop
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.tabletImg
                        ? _c("source", {
                            attrs: {
                              srcset: _vm.tabletImg,
                              media: _vm.breakpointQueryTablet
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("img", {
                        attrs: { src: _vm.mobileImg, alt: _vm.altText }
                      })
                    ])
                  },
                  staticRenderFns: []
                }
              })
            ]
          : _c("picture", [
              _vm.desktopImg
                ? _c("source", {
                    attrs: {
                      srcset: _vm.desktopImg,
                      media: _vm.breakpointQueryDesktop
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.tabletImg
                ? _c("source", {
                    attrs: {
                      srcset: _vm.tabletImg,
                      media: _vm.breakpointQueryTablet
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("img", { attrs: { src: _vm.mobileImg, alt: _vm.altText } })
            ])
      ],
      2
    )
  };
  var __vue_staticRenderFns__$8 = [];
  __vue_render__$8._withStripped = true;

    /* style */
    const __vue_inject_styles__$8 = function (inject) {
      if (!inject) return
      inject("data-v-76834152_0", { source: "img[data-v-76834152] {\n  display: block;\n  width: 100%;\n}\nimg.lazy-image.fade-image[data-v-76834152] {\n  opacity: 0;\n}\nimg.lazy-image.fade-image.img-loaded[data-v-76834152] {\n  opacity: 1;\n}\n\n/*# sourceMappingURL=ZrPicture.vue.map */", map: {"version":3,"sources":["/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrPicture.vue","ZrPicture.vue"],"names":[],"mappings":"AAqFA;EACA,cAAA;EACA,WAAA;ACpFA;ADsFA;EACA,UAAA;ACpFA;ADsFA;EACA,UAAA;ACpFA;;AAEA,wCAAwC","file":"ZrPicture.vue","sourcesContent":["<template>\n  <div>\n    <template v-if=\"lazy\">\n      <picture v-lazy=\"{rootMargin: rootMargin}\">\n        <source v-if=\"desktopImg\" :data-src=\"desktopImg\" :media=\"breakpointQueryDesktop\" :srcset=\"defaultImage\">\n        <source v-if=\"tabletImg\" :data-src=\"tabletImg\" :media=\"breakpointQueryTablet\" :srcset=\"defaultImage\">\n        <img :data-src=\"mobileImg\" :alt=\"altText\" :src=\"defaultImage\" :class=\"{'fade-image': fade}\" :style=\"fadeStyle\" />\n      </picture>\n      <noscript inline-template>\n        <picture>\n          <source v-if=\"desktopImg\" :srcset=\"desktopImg\" :media=\"breakpointQueryDesktop\"/>\n          <source v-if=\"tabletImg\" :srcset=\"tabletImg\" :media=\"breakpointQueryTablet\"/>\n          <img :src=\"mobileImg\" :alt=\"altText\" />\n        </picture>\n      </noscript>\n    </template>\n    <picture v-else>\n      <source v-if=\"desktopImg\" :srcset=\"desktopImg\" :media=\"breakpointQueryDesktop\" />\n      <source v-if=\"tabletImg\" :srcset=\"tabletImg\" :media=\"breakpointQueryTablet\" />\n      <img :src=\"mobileImg\" :alt=\"altText\" />\n    </picture>\n  </div>\n</template>\n\n<script>\n  import '../../directives/lazyLoad'\n  import {imageShared} from '../../mixins/imageShared'\n  import {lazyLoadShared} from '../../mixins/lazyLoadShared';\n\n  /**\n   * Picture component for displaying multiple versions of an image responsively.\n   * `loaded` event is emitted once picture has lazy loaded\n   */\n\n  export default {\n    name: \"ZrPicture\",\n    mixins: [imageShared, lazyLoadShared],\n    props: {\n      /**\n       * Mobile image url to render\n       */\n      mobileImg: {\n        type: String,\n        required: true\n      },\n      /**\n       * Tablet image url to render\n       */\n      tabletImg: {\n        type: String,\n        required: false,\n        default: null\n      },\n      /**\n       * Desktop image url to render\n       */\n      desktopImg: {\n        type: String,\n        required: false,\n        default: null\n      },\n      /**\n       * Breakpoints (pixels) at which to switch between mobile, tablet and desktop image\n       */\n      breakpointTablet: {\n        type: Number,\n        default: 768\n      },\n      breakpointDesktop: {\n        type: Number,\n        default: 1024\n      }\n    },\n    computed: {\n      breakpointQueryDesktop() {\n        return `(min-width: ${this.breakpointDesktop}px)`;\n      },\n      breakpointQueryTablet() {\n        return `(min-width: ${this.breakpointTablet}px)`;\n      }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n  img {\n    display: block;\n    width: 100%;\n\n    &.lazy-image.fade-image {\n      opacity: 0;\n\n      &.img-loaded {\n        opacity: 1;\n      }\n    }\n  }\n</style>\n\n<docs>\n  ### Examples\n\n  #### Basic Picture\n  ```jsx\n  <ZrPicture :mobile-img=\"images.banner_image.mobile.url\"\n             :tablet-img=\"images.banner_image.half.url\"\n             :desktop-img=\"images.banner_image.url\"\n             :alt-text=\"images.banner_image.alt\"\n  />\n  ```\n\n  #### Basic Picture without lazy loading\n  ```jsx\n  <ZrPicture :lazy=\"false\"\n             :mobile-img=\"images.banner_image.mobile.url\"\n             :tablet-img=\"images.banner_image.half.url\"\n             :desktop-img=\"images.banner_image.url\"\n             :alt-text=\"images.banner_image.alt\"\n  />\n  ```\n\n  #### Basic Picture with lazy loading, mobile image and tablet\n  ```jsx\n  <ZrPicture :mobile-img=\"images.banner_image.mobile.url\"\n             :tablet-img=\"images.banner_image.half.url\"\n             :alt-text=\"images.banner_image.alt\"\n  />\n  ```\n\n  #### Picture with custom fade easing and duration, and custom rootMargin\n  ```jsx\n  <ZrPicture :mobile-img=\"images.banner_image.mobile.url\"\n             :tablet-img=\"images.banner_image.half.url\"\n             :alt-text=\"images.banner_image.alt\"\n             fade-duration=\"0.8\"\n             fade-easing=\"linear\"\n             root-margin=\"-400px\"\n  />\n  ```\n\n</docs>\n","img {\n  display: block;\n  width: 100%;\n}\nimg.lazy-image.fade-image {\n  opacity: 0;\n}\nimg.lazy-image.fade-image.img-loaded {\n  opacity: 1;\n}\n\n/*# sourceMappingURL=ZrPicture.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$8 = "data-v-76834152";
    /* module identifier */
    const __vue_module_identifier__$8 = undefined;
    /* functional template */
    const __vue_is_functional_template__$8 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //

  /**
   * A base component to display progress to user's
   */
  var script$9 = {
    name: "ZrProgress",
    props: {
      /**
       * Maximum value of the task that is being measured
       */
      maxValue: {
        type: Number,
        required: true,
        "default": 100
      },

      /**
       * Current value to display in the progress bar
       */
      currentValue: {
        type: Number,
        required: true,
        "default": 0
      }
    }
  };

  /* script */
  const __vue_script__$9 = script$9;

  /* template */
  var __vue_render__$9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("progress", {
      attrs: { max: _vm.maxValue },
      domProps: { value: _vm.currentValue }
    })
  };
  var __vue_staticRenderFns__$9 = [];
  __vue_render__$9._withStripped = true;

    /* style */
    const __vue_inject_styles__$9 = function (inject) {
      if (!inject) return
      inject("data-v-a3e2aa6a_0", { source: "\n\n/*# sourceMappingURL=ZrProgress.vue.map */", map: {"version":3,"sources":["ZrProgress.vue"],"names":[],"mappings":";;AAEA,yCAAyC","file":"ZrProgress.vue"}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$9 = "data-v-a3e2aa6a";
    /* module identifier */
    const __vue_module_identifier__$9 = undefined;
    /* functional template */
    const __vue_is_functional_template__$9 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$9 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      createInjector,
      undefined,
      undefined
    );

  var script$a = {
    name: "ZrRadio",
    inheritAttrs: false,
    mixins: [inputShared],
    props: _objectSpread2(_objectSpread2({}, inputShared.props), {}, {
      /**
       * Value to associate with the radio input
       */
      value: {
        type: [String, Number],
        required: true
      },

      /**
       * Whether or not the radio is selected by default
       */
      selected: {
        type: Boolean,
        "default": false
      }
    }),
    methods: {
      inputChanged: function inputChanged() {
        this.$emit('change', this.value);
      }
    }
  };

  /* script */
  const __vue_script__$a = script$a;

  /* template */
  var __vue_render__$a = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "radio" }, [
      _c(
        "input",
        _vm._b(
          {
            attrs: {
              type: "radio",
              name: _vm.name,
              id: _vm.id,
              disabled: _vm.disabled
            },
            domProps: { value: _vm.value, checked: _vm.selected },
            on: { change: _vm.inputChanged }
          },
          "input",
          _vm.$attrs,
          false
        )
      ),
      _vm._v(" "),
      _c("label", { attrs: { for: _vm.id } }, [_vm._v(_vm._s(_vm.label))])
    ])
  };
  var __vue_staticRenderFns__$a = [];
  __vue_render__$a._withStripped = true;

    /* style */
    const __vue_inject_styles__$a = function (inject) {
      if (!inject) return
      inject("data-v-14c14787_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-14c14787 {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\ninput[data-v-14c14787] {\n  position: absolute;\n  width: 0;\n  height: 0;\n  opacity: 0;\n  margin: 0;\n  padding: 0;\n}\ninput:checked + label[data-v-14c14787]:after {\n  opacity: 1;\n  transform: scale(1);\n}\nlabel[data-v-14c14787] {\n  position: relative;\n  display: block;\n  font-family: sans-serif;\n  font-size: 16px;\n  line-height: 1.5em;\n  padding-left: 2.25em;\n  vertical-align: middle;\n  cursor: pointer;\n}\nlabel[data-v-14c14787]:before, label[data-v-14c14787]:after {\n  content: \"\";\n  position: absolute;\n  display: block;\n  border-radius: 50%;\n}\nlabel[data-v-14c14787]:before {\n  top: 50%;\n  left: 0;\n  width: 1.5em;\n  height: 1.5em;\n  border: 1px solid #2A2928;\n  transform: translateY(-50%);\n}\nlabel[data-v-14c14787]:after {\n  opacity: 0;\n  left: calc((1.5em - 1em + 2px) / 2);\n  top: calc((1.5em - 1em) / 2);\n  width: 1em;\n  height: 1em;\n  background-color: #595755;\n  transform: scale(0);\n  transition: all 0.25s ease-out;\n}\n\n/*# sourceMappingURL=ZrRadio.vue.map */", map: {"version":3,"sources":["ZrRadio.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrRadio.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;AACA;;EAEE;ACqCF;;EAAA;AAiBA;;EAAA;AAgBA;;EAAA;AA5BA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,UAAA;EACA,SAAA;EACA,UAAA;AD/BA;ACkCA;EACA,UAAA;EACA,mBAAA;ADhCA;ACqCA;EACA,kBAAA;EACA,cAAA;EACA,uBAAA;EACA,eAAA;EACA,kBAAA;EACA,oBAAA;EACA,sBAAA;EACA,eAAA;ADlCA;ACoCA;EAEA,WAAA;EACA,kBAAA;EACA,cAAA;EACA,kBAAA;ADnCA;ACsCA;EACA,QAAA;EACA,OAAA;EACA,YAxCA;EAyCA,aAzCA;EA0CA,yBAAA;EACA,2BAAA;ADpCA;ACuCA;EACA,UAAA;EACA,mCAAA;EACA,4BAAA;EACA,UAjDA;EAkDA,WAlDA;EAmDA,yBAAA;EACA,mBAAA;EACA,8BAAA;ADrCA;;AAEA,sCAAsC","file":"ZrRadio.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\ninput {\n  position: absolute;\n  width: 0;\n  height: 0;\n  opacity: 0;\n  margin: 0;\n  padding: 0;\n}\ninput:checked + label:after {\n  opacity: 1;\n  transform: scale(1);\n}\n\nlabel {\n  position: relative;\n  display: block;\n  font-family: sans-serif;\n  font-size: 16px;\n  line-height: 1.5em;\n  padding-left: 2.25em;\n  vertical-align: middle;\n  cursor: pointer;\n}\nlabel:before, label:after {\n  content: \"\";\n  position: absolute;\n  display: block;\n  border-radius: 50%;\n}\nlabel:before {\n  top: 50%;\n  left: 0;\n  width: 1.5em;\n  height: 1.5em;\n  border: 1px solid #2A2928;\n  transform: translateY(-50%);\n}\nlabel:after {\n  opacity: 0;\n  left: calc((1.5em - 1em + 2px) / 2);\n  top: calc((1.5em - 1em) / 2);\n  width: 1em;\n  height: 1em;\n  background-color: #595755;\n  transform: scale(0);\n  transition: all 0.25s ease-out;\n}\n\n/*# sourceMappingURL=ZrRadio.vue.map */","<template>\n    <div class=\"radio\">\n        <input type=\"radio\"\n               :name=\"name\"\n               :id=\"id\"\n               :value=\"value\"\n               :checked=\"selected\"\n               @change=\"inputChanged\"\n               v-bind=\"$attrs\"\n               :disabled=\"disabled\"\n        />\n        <label :for=\"id\">{{label}}</label>\n    </div>\n</template>\n\n<script>\n  import {inputShared} from \"../../mixins/inputShared\";\n\n  export default {\n    name: \"ZrRadio\",\n    inheritAttrs: false,\n    mixins: [\n      inputShared\n    ],\n    props: {\n      ...inputShared.props,\n      /**\n       * Value to associate with the radio input\n       */\n      value: {\n        type: [String, Number],\n        required: true\n      },\n      /**\n       * Whether or not the radio is selected by default\n       */\n      selected: {\n        type: Boolean,\n        default: false\n      }\n    },\n    methods: {\n      inputChanged() {\n        this.$emit('change', this.value);\n      }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n    @import '../../styles/imports';\n\n    $radio-outer-width: 1.5em;\n    $radio-inner-width: 1em;\n\n    input {\n        position: absolute;\n        width: 0;\n        height: 0;\n        opacity: 0;\n        margin: 0;\n        padding: 0;\n\n        &:checked + label {\n            &:after {\n                opacity: 1;\n                transform: scale(1);\n            }\n        }\n    }\n\n    label {\n        position: relative;\n        display: block;\n        font-family: sans-serif;\n        font-size: 16px;\n        line-height: 1.5em;\n        padding-left: $radio-outer-width * 1.5;\n        vertical-align: middle;\n        cursor: pointer;\n\n        &:before,\n        &:after {\n            content: '';\n            position: absolute;\n            display: block;\n            border-radius: 50%;\n        }\n\n        &:before {\n            top: 50%;\n            left: 0;\n            width: $radio-outer-width;\n            height: $radio-outer-width;\n            border: 1px solid $color-darker;\n            transform: translateY(-50%);\n        }\n\n        &:after {\n            opacity: 0;\n            left: calc((#{$radio-outer-width} - #{$radio-inner-width} + 2px) / 2);\n            top: calc((#{$radio-outer-width} - #{$radio-inner-width}) / 2);\n            width: $radio-inner-width;\n            height: $radio-inner-width;\n            background-color: $color-dark;\n            transform: scale(0);\n            transition: all 0.25s ease-out;\n        }\n    }\n</style>\n\n<docs>\n    ### Examples\n\n    #### Default Radio\n    ```jsx\n    <ZrRadio label=\"Radio Label\" value=\"1\" id=\"radio1\"></ZrRadio>\n    ```\n\n    #### Default Radio Disabled\n    ```jsx\n    <ZrRadio label=\"Radio Label\" value=\"1\" id=\"radio1-disabled\" :disabled=\"true\"></ZrRadio>\n    ```\n\n    #### Selected Radio\n    ```jsx\n    <ZrRadio label=\"Label Here\" value=\"2\" id=\"radio2\" selected></ZrRadio>\n    ```\n</docs>\n\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$a = "data-v-14c14787";
    /* module identifier */
    const __vue_module_identifier__$a = undefined;
    /* functional template */
    const __vue_is_functional_template__$a = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$a = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script$b = {
    name: "ZrRangeSlider",
    data: function data() {
      return {
        range1Model: 0,
        range2Model: 0,
        range1Display: 0,
        range2Display: 0,
        rangePercentageRatio: 1
      };
    },
    props: {
      /** Value for Range 1 */
      minValue: {
        type: Number,
        required: false,
        "default": 0
      },

      /** Value for Range 2 */
      maxValue: {
        type: Number,
        required: false
      },

      /** Min Label */
      labelMin: {
        type: String,
        required: false,
        "default": ''
      },

      /** Min Label After */
      labelMinAfter: {
        type: String,
        required: false,
        "default": ''
      },

      /** Max Label */
      labelMax: {
        type: String,
        required: false,
        "default": ''
      },

      /** Max Label After */
      labelMaxAfter: {
        type: String,
        required: false,
        "default": ''
      },

      /** Min Value */
      rangeSlideMin: {
        type: Number,
        required: false,
        "default": 0
      },

      /** Max Value */
      rangeSlideMax: {
        type: Number,
        required: false,
        "default": 100
      },

      /** Step Size */
      stepSize: {
        type: Number,
        required: false,
        "default": 1
      },

      /** Step Size
       *
       * Set to & to format range labels as $ currency
       * Set to 'foot-inch-short' to format to 1' 2"
       * Set to 'foot-inch-long' to format to 1ft 2in"
       *
       * */
      unitType: {
        type: String,
        required: false,
        "default": ''
      }
    },
    watch: {
      minValue: function minValue() {
        this.range1Model = this.minValue;
      },
      maxValue: function maxValue() {
        this.range2Model = this.maxValue;
      },
      range1Model: function range1Model(val) {
        this.formatRangeValues(this.range1Model, this.range2Model);
      },
      range2Model: function range2Model(val) {
        this.formatRangeValues(this.range1Model, this.range2Model);
      }
    },
    computed: {
      singleRangeWidth: function singleRangeWidth() {
        return "".concat((this.range1Model - this.rangeSlideMin) * this.rangePercentageRatio, "%");
      },
      dualRangeLeft: function dualRangeLeft() {
        return "".concat((this.range1Model - this.rangeSlideMin) * this.rangePercentageRatio, "%");
      },
      dualRangeWidth: function dualRangeWidth() {
        return "".concat((this.range2Model - this.range1Model) * this.rangePercentageRatio, "%");
      },
      isDualSlider: function isDualSlider() {
        // min Value
        var minValBoolean = typeof this.minValue === 'number';
        return minValBoolean && this.maxValue;
      }
    },
    beforeMount: function beforeMount() {
      this.range1Model = this.minValue;
      this.range2Model = this.maxValue;
      this.formatRangeValues();
      this.rangePercentageRatio = 100 / (this.rangeSlideMax - this.rangeSlideMin);
    },
    methods: {
      calcualteFtInches: function calcualteFtInches(inches, unitLabels) {
        return "".concat(Math.floor(inches / 12)).concat(unitLabels.foot, " ").concat(inches % 12).concat(unitLabels.inches);
      },
      formatRangeValues: function formatRangeValues(minValue, maxValue) {
        var minValueDisplay = '';
        var maxValueDisplay = ''; // format range values depending on unit type

        switch (this.unitType) {
          case '$':
            // format range labels as $ currency
            minValue || minValue === 0 ? minValueDisplay = '$' + minValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '';
            maxValue ? maxValueDisplay = '$' + maxValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '';
            break;

          case 'foot-inch-short':
            // format range labels as length in ' and "
            minValue || minValue === 0 ? minValueDisplay = this.calcualteFtInches(minValue, {
              foot: '\'',
              inches: '\"'
            }) : '';
            maxValue ? maxValueDisplay = this.calcualteFtInches(maxValue, {
              foot: '\'',
              inches: '\"'
            }) : '';
            break;

          case 'foot-inch-long':
            // format range labels as length in ft and in
            minValue || minValue === 0 ? minValueDisplay = this.calcualteFtInches(minValue, {
              foot: 'ft',
              inches: 'in'
            }) : '';
            maxValue ? maxValueDisplay = this.calcualteFtInches(maxValue, {
              foot: 'ft',
              inches: 'in'
            }) : '';
            break;

          default:
            // no formatting needed
            minValueDisplay = minValue;
            maxValueDisplay = maxValue;
        }

        this.range1Display = minValueDisplay;
        this.range2Display = maxValueDisplay;
      },
      rangeChanged: function rangeChanged() {
        // if dual slides also set value now for 2nd input range
        if (this.isDualSlider) {
          this.$emit('change', [this.range1Model, this.range2Model]);
          return;
        }

        this.$emit('change', this.range1Model);
      },
      checkRangeValid: function checkRangeValid(activeRangeSlider) {
        var minValueCurrent = parseInt(this.range1Model);
        var maxValueCurrent = parseInt(this.range2Model); // case min range active

        if (activeRangeSlider === 'min' && minValueCurrent >= maxValueCurrent) {
          this.range1Model = maxValueCurrent - this.stepSize;
        } // case max range active


        if (activeRangeSlider === 'max' && maxValueCurrent <= minValueCurrent) {
          this.range2Model = minValueCurrent + this.stepSize;
        }
      }
    }
  };

  /* script */
  const __vue_script__$b = script$b;

  /* template */
  var __vue_render__$b = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "range", class: { "dual-range": _vm.isDualSlider } },
      [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model.number",
              value: _vm.range1Model,
              expression: "range1Model",
              modifiers: { number: true }
            }
          ],
          attrs: {
            type: "range",
            min: _vm.rangeSlideMin,
            max: _vm.rangeSlideMax,
            step: _vm.stepSize,
            "aria-valuemin": _vm.rangeSlideMin,
            "aria-valuemax": _vm.rangeSlideMax,
            "aria-valuenow": _vm.range1Model
          },
          domProps: { value: _vm.range1Model },
          on: {
            change: _vm.rangeChanged,
            input: function($event) {
              _vm.isDualSlider ? _vm.checkRangeValid("min") : "";
            },
            __r: function($event) {
              _vm.range1Model = _vm._n($event.target.value);
            },
            blur: function($event) {
              return _vm.$forceUpdate()
            }
          }
        }),
        _vm._v(" "),
        _vm.isDualSlider
          ? _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model.number",
                  value: _vm.range2Model,
                  expression: "range2Model",
                  modifiers: { number: true }
                }
              ],
              staticClass: "dualInput",
              attrs: {
                type: "range",
                min: _vm.rangeSlideMin,
                max: _vm.rangeSlideMax,
                step: _vm.stepSize,
                "aria-valuemin": _vm.rangeSlideMin,
                "aria-valuemax": _vm.rangeSlideMax,
                "aria-valuenow": _vm.range2Model
              },
              domProps: { value: _vm.range2Model },
              on: {
                change: _vm.rangeChanged,
                input: function($event) {
                  return _vm.checkRangeValid("max")
                },
                __r: function($event) {
                  _vm.range2Model = _vm._n($event.target.value);
                },
                blur: function($event) {
                  return _vm.$forceUpdate()
                }
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "range-track" }),
        _vm._v(" "),
        !_vm.isDualSlider
          ? _c("div", {
              staticClass: "range-display",
              style: { left: 0, width: _vm.singleRangeWidth }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.isDualSlider
          ? _c("div", {
              staticClass: "range-display",
              style: { left: _vm.dualRangeLeft, width: _vm.dualRangeWidth }
            })
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "label-min" }, [
          _vm._v(
            _vm._s(_vm.labelMin) +
              _vm._s(_vm.range1Display) +
              _vm._s(_vm.labelMinAfter)
          )
        ]),
        _vm._v(" "),
        _vm.isDualSlider
          ? _c("div", { staticClass: "label-max" }, [
              _vm._v(
                _vm._s(_vm.labelMax) +
                  _vm._s(_vm.range2Display) +
                  _vm._s(_vm.labelMaxAfter)
              )
            ])
          : _vm._e()
      ]
    )
  };
  var __vue_staticRenderFns__$b = [];
  __vue_render__$b._withStripped = true;

    /* style */
    const __vue_inject_styles__$b = function (inject) {
      if (!inject) return
      inject("data-v-e6c9798e_0", { source: ".range[data-v-e6c9798e] {\n  width: 100%;\n  height: 34px;\n  /* thumb height + label font size */\n  position: relative;\n  /* track styling */\n}\n.range input[type=range][data-v-e6c9798e] {\n  width: 100%;\n  pointer-events: none;\n  position: absolute;\n  -webkit-appearance: none;\n  border: none;\n  background: transparent;\n  height: 4px;\n  outline: none;\n  z-index: 10;\n  padding: 0;\n  margin: 0;\n  /* prevent outline on focus */\n  /* prevent outline on focus moz */\n  /* ms specific styling */\n  /* styling for web kit thumb */\n  /* styling for moz thumb */\n  /* styling for ms thumb */\n}\n.range input[type=range][data-v-e6c9798e]:focus {\n  outline: none;\n}\n.range input[type=range][data-v-e6c9798e]::-moz-focus-outer {\n  border: 0;\n}\n.range input[type=range][data-v-e6c9798e]::-ms-track {\n  width: 100%;\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\n.range input[type=range][data-v-e6c9798e]::-webkit-slider-thumb {\n  pointer-events: all;\n  position: relative;\n  z-index: 2;\n  outline: 0;\n  -webkit-appearance: none;\n  width: 20px;\n  height: 20px;\n  border: none;\n  appearance: none;\n  cursor: pointer;\n  background-color: #0071ba;\n  border-radius: 50%;\n}\n.range input[type=range][data-v-e6c9798e]::-moz-range-thumb {\n  pointer-events: all;\n  position: absolute;\n  z-index: 2;\n  outline: 0;\n  -webkit-appearance: none;\n  width: 20px;\n  height: 20px;\n  border: 1px solid transparent;\n  appearance: none;\n  cursor: pointer;\n  background-color: #0071ba;\n  border-radius: 50%;\n}\n.range input[type=range][data-v-e6c9798e]::-ms-thumb {\n  pointer-events: all;\n  position: relative;\n  z-index: 2;\n  outline: 0;\n  -webkit-appearance: none;\n  width: 20px;\n  height: 20px;\n  border: none;\n  appearance: none;\n  cursor: pointer;\n  background-color: #0071ba;\n  border-radius: 50%;\n}\n.range .label-min[data-v-e6c9798e], .range .label-max[data-v-e6c9798e] {\n  position: absolute;\n  top: 20px;\n}\n.range .label-max[data-v-e6c9798e] {\n  right: 0;\n}\n.range .range-display[data-v-e6c9798e], .range .range-track[data-v-e6c9798e] {\n  position: absolute;\n  height: 4px;\n  background: #0071ba;\n  top: 0px;\n  z-index: 2;\n}\n.range .range-track[data-v-e6c9798e] {\n  width: 100%;\n  background-color: #999999;\n  z-index: 1;\n}\n\n/*# sourceMappingURL=ZrRangeSlider.vue.map */", map: {"version":3,"sources":["/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrRangeSlider.vue","ZrRangeSlider.vue"],"names":[],"mappings":"AAkPA;EAEA,WAAA;EACA,YAAA;EAAA,mCAAA;EACA,kBAAA;EAEA,kBAAA;AClPA;ADmPA;EACA,WAAA;EACA,oBAAA;EACA,kBAAA;EACA,wBAAA;EACA,YAAA;EACA,uBAAA;EACA,WAlBA;EAmBA,aAAA;EACA,WAAA;EACA,UAAA;EACA,SAAA;EAEA,6BAAA;EAKA,iCAAA;EAKA,wBAAA;EASA,8BAAA;EAsBA,0BAAA;EAoBA,yBAAA;AC1SA;AD8OA;EACA,aAAA;AC5OA;ADgPA;EACA,SAAA;AC9OA;ADkPA;EACA,WAAA;EACA,eAAA;EACA,uBAAA;EACA,yBAAA;EACA,kBAAA;AChPA;ADoPA;EACA,mBAAA;EACA,kBAAA;EACA,UAAA;EACA,UAAA;EACA,wBAAA;EACA,WAjDA;EAkDA,YAjDA;EAkDA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,yBAxDA;EAyDA,kBAAA;AClPA;AD4PA;EACA,mBAAA;EACA,kBAAA;EACA,UAAA;EACA,UAAA;EACA,wBAAA;EACA,WAvEA;EAwEA,YAvEA;EAwEA,6BAAA;EACA,gBAAA;EACA,eAAA;EACA,yBA9EA;EA+EA,kBAAA;AC1PA;ADkQA;EACA,mBAAA;EACA,kBAAA;EACA,UAAA;EACA,UAAA;EACA,wBAAA;EACA,WA3FA;EA4FA,YA3FA;EA4FA,YAAA;EACA,gBAAA;EACA,eAAA;EACA,yBAlGA;EAmGA,kBAAA;AChQA;ADyQA;EACA,kBAAA;EACA,SA3GA;AC5JA;AD0QA;EACA,QAAA;ACxQA;AD2QA;EACA,kBAAA;EACA,WAtHA;EAuHA,mBAxHA;EAyHA,QAAA;EACA,UAAA;ACzQA;AD4QA;EACA,WAAA;EACA,yBAhIA;EAiIA,UAAA;AC1QA;;AAEA,4CAA4C","file":"ZrRangeSlider.vue","sourcesContent":["<template>\n\n  <div class=\"range\" :class=\"{'dual-range': isDualSlider}\">\n\n    <input\n      type=\"range\"\n      :min=\"rangeSlideMin\"\n      :max=\"rangeSlideMax\"\n      :step=\"stepSize\"\n      :aria-valuemin=\"rangeSlideMin\"\n      :aria-valuemax=\"rangeSlideMax\"\n      :aria-valuenow=\"range1Model\"\n      v-model.number=\"range1Model\"\n      @change=\"rangeChanged\"\n      @input=\"isDualSlider ? checkRangeValid('min') : ''\"\n    >\n\n    <input\n      v-if=\"isDualSlider\"\n      type=\"range\"\n      :min=\"rangeSlideMin\"\n      :max=\"rangeSlideMax\"\n      :step=\"stepSize\"\n      :aria-valuemin=\"rangeSlideMin\"\n      :aria-valuemax=\"rangeSlideMax\"\n      :aria-valuenow=\"range2Model\"\n      v-model.number=\"range2Model\"\n      @change=\"rangeChanged\"\n      @input=\"checkRangeValid('max')\"\n      class=\"dualInput\"\n    >\n\n    <div class=\"range-track\"></div>\n\n    <div\n      v-if=\"!isDualSlider\"\n      class=\"range-display\"\n      :style=\"{ left: 0, width: singleRangeWidth }\">\n    </div>\n\n    <div\n      v-if=\"isDualSlider\"\n      class=\"range-display\"\n      :style=\"{ left: dualRangeLeft, width: dualRangeWidth }\">\n    </div>\n\n    <div class=\"label-min\">{{labelMin}}{{range1Display}}{{labelMinAfter}}</div>\n    <div class=\"label-max\" v-if=\"isDualSlider\">{{labelMax}}{{range2Display}}{{labelMaxAfter}}</div>\n\n  </div>\n\n</template>\n\n<script>\n\n  export default {\n    name: \"ZrRangeSlider\",\n    data: function () {\n      return {\n        range1Model: 0,\n        range2Model: 0,\n        range1Display: 0,\n        range2Display: 0,\n        rangePercentageRatio: 1\n      }\n    },\n    props: {\n      /** Value for Range 1 */\n      minValue: {\n        type: Number,\n        required: false,\n        default: 0\n      },\n      /** Value for Range 2 */\n      maxValue: {\n        type: Number,\n        required: false\n      },\n      /** Min Label */\n      labelMin: {\n        type: String,\n        required: false,\n        default: ''\n      },\n      /** Min Label After */\n      labelMinAfter: {\n        type: String,\n        required: false,\n        default: ''\n      },\n      /** Max Label */\n      labelMax: {\n        type: String,\n        required: false,\n        default: ''\n      },\n      /** Max Label After */\n      labelMaxAfter: {\n        type: String,\n        required: false,\n        default: ''\n      },\n      /** Min Value */\n      rangeSlideMin: {\n        type: Number,\n        required: false,\n        default: 0\n      },\n      /** Max Value */\n      rangeSlideMax: {\n        type: Number,\n        required: false,\n        default: 100\n      },\n      /** Step Size */\n      stepSize: {\n        type: Number,\n        required: false,\n        default: 1\n      },\n      /** Step Size\n       *\n       * Set to & to format range labels as $ currency\n       * Set to 'foot-inch-short' to format to 1' 2\"\n       * Set to 'foot-inch-long' to format to 1ft 2in\"\n       *\n       * */\n      unitType: {\n        type: String,\n        required: false,\n        default: ''\n      }\n    },\n    watch: {\n      minValue() {\n        this.range1Model = this.minValue\n      },\n      maxValue() {\n        this.range2Model = this.maxValue\n      },\n      range1Model(val) {\n        this.formatRangeValues(this.range1Model, this.range2Model)\n      },\n      range2Model(val) {\n        this.formatRangeValues(this.range1Model, this.range2Model)\n      }\n    },\n    computed: {\n      singleRangeWidth: function () {\n        return `${(this.range1Model - this.rangeSlideMin) * this.rangePercentageRatio}%`\n      },\n      dualRangeLeft: function () {\n        return `${(this.range1Model - this.rangeSlideMin) * this.rangePercentageRatio}%`\n      },\n      dualRangeWidth: function () {\n        return `${(this.range2Model - this.range1Model) * this.rangePercentageRatio}%`\n      },\n      isDualSlider: function () {\n        // min Value\n        const minValBoolean = typeof this.minValue === 'number';\n        return minValBoolean && this.maxValue;\n      }\n    },\n    beforeMount() {\n      this.range1Model = this.minValue;\n      this.range2Model = this.maxValue;\n      this.formatRangeValues()\n      this.rangePercentageRatio = 100 / (this.rangeSlideMax - this.rangeSlideMin);\n    },\n    methods: {\n      calcualteFtInches(inches, unitLabels){\n        return `${Math.floor(inches / 12)}${unitLabels.foot} ${inches % 12}${unitLabels.inches}`\n      },\n      formatRangeValues(minValue, maxValue) {\n\n        let minValueDisplay = '';\n        let maxValueDisplay = '';\n\n        // format range values depending on unit type\n        switch (this.unitType) {\n\n          case '$':\n            // format range labels as $ currency\n            minValue || minValue === 0 ? minValueDisplay = '$' + minValue.toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, '$1,') : ''\n            maxValue ? maxValueDisplay = '$' + maxValue.toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, '$1,') : ''\n            break\n          case 'foot-inch-short':\n            // format range labels as length in ' and \"\n            minValue || minValue === 0 ? minValueDisplay = this.calcualteFtInches(minValue, {foot: '\\'', inches: '\\\"'}) : ''\n            maxValue ? maxValueDisplay = this.calcualteFtInches(maxValue, {foot: '\\'', inches: '\\\"'}) : ''\n            break\n          case 'foot-inch-long':\n            // format range labels as length in ft and in\n            minValue || minValue === 0 ? minValueDisplay = this.calcualteFtInches(minValue, {foot: 'ft', inches: 'in'}) : ''\n            maxValue ? maxValueDisplay = this.calcualteFtInches(maxValue, {foot: 'ft', inches: 'in'}) : ''\n            break\n          default:\n            // no formatting needed\n            minValueDisplay = minValue\n            maxValueDisplay = maxValue\n        }\n\n        this.range1Display = minValueDisplay;\n        this.range2Display = maxValueDisplay;\n\n      },\n      rangeChanged() {\n        // if dual slides also set value now for 2nd input range\n        if (this.isDualSlider) {\n          this.$emit('change', [this.range1Model, this.range2Model]);\n          return;\n        }\n        this.$emit('change', this.range1Model);\n      },\n      checkRangeValid(activeRangeSlider) {\n\n        const minValueCurrent = parseInt(this.range1Model);\n        const maxValueCurrent = parseInt(this.range2Model);\n\n        // case min range active\n        if (activeRangeSlider === 'min' && minValueCurrent >= maxValueCurrent) {\n          this.range1Model = maxValueCurrent - this.stepSize\n        }\n\n        // case max range active\n        if (activeRangeSlider === 'max' && maxValueCurrent <= minValueCurrent) {\n          this.range2Model = minValueCurrent + this.stepSize;\n        }\n\n      }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n\n  $trackBackGround: rgb(153, 153, 153);\n  $trackColor: rgb(0, 113, 186);\n  $trackHeight: 4px;\n  $thumbWidth: 20px;\n  $thumbHeight: 20px;\n\n  .range {\n\n    width: 100%;\n    height: 34px; /* thumb height + label font size */\n    position: relative;\n\n    /* track styling */\n    input[type=\"range\"] {\n      width: 100%;\n      pointer-events: none;\n      position: absolute;\n      -webkit-appearance: none;\n      border: none;\n      background: transparent;\n      height: $trackHeight;\n      outline: none;\n      z-index: 10;\n      padding: 0;\n      margin: 0;\n\n      /* prevent outline on focus */\n      &:focus {\n        outline: none;\n      }\n\n      /* prevent outline on focus moz */\n      &::-moz-focus-outer {\n        border: 0;\n      }\n\n      /* ms specific styling */\n      &::-ms-track {\n        width: 100%;\n        cursor: pointer;\n        background: transparent;\n        border-color: transparent;\n        color: transparent;\n      }\n\n      /* styling for web kit thumb */\n      &::-webkit-slider-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 2;\n        outline: 0;\n        -webkit-appearance: none;\n        width: $thumbWidth;\n        height: $thumbHeight;\n        border: none;\n        appearance: none;\n        cursor: pointer;\n        background-color: $trackColor;\n        border-radius: 50%;\n        // or use background image, like below\n        // background: url('/assets/images/slider-right.png') no-repeat;\n      }\n\n      &:first-of-type::-webkit-slider-thumb {\n        // background: url('/assets/images/slider-left.png') no-repeat;\n      }\n\n      /* styling for moz thumb */\n      &::-moz-range-thumb {\n        pointer-events: all;\n        position: absolute;\n        z-index: 2;\n        outline: 0;\n        -webkit-appearance: none;\n        width: $thumbWidth;\n        height: $thumbHeight;\n        border: 1px solid transparent;\n        appearance: none;\n        cursor: pointer;\n        background-color: $trackColor;\n        border-radius: 50%;\n      }\n\n      &:first-of-type::-moz-range-thumb {\n        // background: url('/packages/vue/index/assets/images/slider-left.png') no-repeat;\n      }\n\n      /* styling for ms thumb */\n      &::-ms-thumb {\n        pointer-events: all;\n        position: relative;\n        z-index: 2;\n        outline: 0;\n        -webkit-appearance: none;\n        width: $thumbWidth;\n        height: $thumbHeight;\n        border: none;\n        appearance: none;\n        cursor: pointer;\n        background-color: $trackColor;\n        border-radius: 50%;\n      }\n\n      &:first-of-type::-ms-thumb {\n        // background: url('/packages/vue/index/assets/images/slider-left.png') no-repeat;\n      }\n\n    }\n\n    .label-min, .label-max {\n      position: absolute;\n      top: $thumbHeight;\n    }\n\n    .label-max {\n      right: 0;\n    }\n\n    .range-display, .range-track {\n      position: absolute;\n      height: $trackHeight;\n      background: $trackColor;\n      top: 0px;\n      z-index: 2;\n    }\n\n    .range-track {\n      width: 100%;\n      background-color: $trackBackGround;\n      z-index: 1;\n    }\n\n  }\n\n\n</style>\n\n<docs>\n  ### Examples\n\n  #### Default Range Slider\n  ```jsx\n  <ZrRangeSlider/>\n  ```\n\n  #### Slider Dual preset values\n  ```jsx\n  <ZrRangeSlider :min-value=\"10\" :max-value=\"70\"/>\n  ```\n\n  #### Label before and after\n  ```jsx\n  <ZrRangeSlider :min-value=\"0\" :range-slide-min=\"0\" :range-slide-max=\"18000\" :label-min=\"'Up to '\"\n                 :label-min-after=\"' lbs'\"/>\n  ```\n\n  #### Label before\n  ```jsx\n  <ZrRangeSlider :min-value=\"60\" :range-slide-min=\"60\" :range-slide-max=\"120\" :step-size=\"20\" :label-min=\"'Gallons '\"/>\n  ```\n\n  #### Slider Dual preset values with currency formatting\n  ```jsx\n  <ZrRangeSlider :min-value=\"0\" :max-value=\"7000\" :range-slide-min=\"0\" :range-slide-max=\"18000\" :unit-type=\"'$'\"/>\n  ```\n\n  #### Slider Dual preset values with ' \" formatting\n  ```jsx\n  <ZrRangeSlider :min-value=\"1\" :max-value=\"2500\" :range-slide-min=\"0\" :range-slide-max=\"2500\"\n                 :unit-type=\"'foot-inch-short'\"/>\n  ```\n\n  #### Slider Dual preset values with ft in formatting\n  ```jsx\n  <ZrRangeSlider :min-value=\"1\" :max-value=\"2500\" :range-slide-min=\"0\" :range-slide-max=\"2500\"\n                 :unit-type=\"'foot-inch-long'\"/>\n  ```\n\n</docs>\n\n",".range {\n  width: 100%;\n  height: 34px;\n  /* thumb height + label font size */\n  position: relative;\n  /* track styling */\n}\n.range input[type=range] {\n  width: 100%;\n  pointer-events: none;\n  position: absolute;\n  -webkit-appearance: none;\n  border: none;\n  background: transparent;\n  height: 4px;\n  outline: none;\n  z-index: 10;\n  padding: 0;\n  margin: 0;\n  /* prevent outline on focus */\n  /* prevent outline on focus moz */\n  /* ms specific styling */\n  /* styling for web kit thumb */\n  /* styling for moz thumb */\n  /* styling for ms thumb */\n}\n.range input[type=range]:focus {\n  outline: none;\n}\n.range input[type=range]::-moz-focus-outer {\n  border: 0;\n}\n.range input[type=range]::-ms-track {\n  width: 100%;\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\n.range input[type=range]::-webkit-slider-thumb {\n  pointer-events: all;\n  position: relative;\n  z-index: 2;\n  outline: 0;\n  -webkit-appearance: none;\n  width: 20px;\n  height: 20px;\n  border: none;\n  appearance: none;\n  cursor: pointer;\n  background-color: #0071ba;\n  border-radius: 50%;\n}\n.range input[type=range]::-moz-range-thumb {\n  pointer-events: all;\n  position: absolute;\n  z-index: 2;\n  outline: 0;\n  -webkit-appearance: none;\n  width: 20px;\n  height: 20px;\n  border: 1px solid transparent;\n  appearance: none;\n  cursor: pointer;\n  background-color: #0071ba;\n  border-radius: 50%;\n}\n.range input[type=range]::-ms-thumb {\n  pointer-events: all;\n  position: relative;\n  z-index: 2;\n  outline: 0;\n  -webkit-appearance: none;\n  width: 20px;\n  height: 20px;\n  border: none;\n  appearance: none;\n  cursor: pointer;\n  background-color: #0071ba;\n  border-radius: 50%;\n}\n.range .label-min, .range .label-max {\n  position: absolute;\n  top: 20px;\n}\n.range .label-max {\n  right: 0;\n}\n.range .range-display, .range .range-track {\n  position: absolute;\n  height: 4px;\n  background: #0071ba;\n  top: 0px;\n  z-index: 2;\n}\n.range .range-track {\n  width: 100%;\n  background-color: #999999;\n  z-index: 1;\n}\n\n/*# sourceMappingURL=ZrRangeSlider.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$b = "data-v-e6c9798e";
    /* module identifier */
    const __vue_module_identifier__$b = undefined;
    /* functional template */
    const __vue_is_functional_template__$b = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$b = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
      __vue_inject_styles__$b,
      __vue_script__$b,
      __vue_scope_id__$b,
      __vue_is_functional_template__$b,
      __vue_module_identifier__$b,
      false,
      createInjector,
      undefined,
      undefined
    );

  var script$c = {
    name: "ZrSelect",
    components: {
      BaseInputWrapper: __vue_component__$5
    },
    mixins: [inputShared],
    props: _objectSpread2(_objectSpread2({}, inputShared.props), {}, {
      /**
       * Preselected value
       */
      value: {
        type: [String, Number]
      },

      /**
       * Size of select to render
       */
      size: {
        type: String,
        "default": 'md',
        validator: function validator(value) {
          return ['sm', 'md', 'lg'].indexOf(value) !== -1;
        }
      },

      /**
       * Array of options to display in the select.  Each option should be an object of this shape:
       * { label: 'optionLabel', value: 'optionValue' }.
       */
      options: {
        type: Array,
        required: true
      },

      /**
       * Placeholder text to display before first selection is made
       */
      placeholder: {
        type: String,
        "default": ''
      }
    }),
    methods: {
      updateValue: function updateValue(event) {
        this.$emit('input', event.target.value);
      }
    }
  };

  /* script */
  const __vue_script__$c = script$c;

  /* template */
  var __vue_render__$c = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "base-input-wrapper",
      _vm._b({}, "base-input-wrapper", _vm.$props, false),
      [
        _vm.label
          ? _c("label", { attrs: { for: _vm.id } }, [_vm._v(_vm._s(_vm.label))])
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "select-wrapper" }, [
          _c(
            "select",
            {
              class: {
                "input-sm": _vm.size === "sm",
                "input-lg": _vm.size === "lg"
              },
              attrs: {
                id: _vm.id,
                name: _vm.name ? _vm.name : _vm.id,
                required: _vm.required,
                disabled: _vm.disabled
              },
              domProps: { value: _vm.value },
              on: { change: _vm.updateValue }
            },
            [
              _vm.placeholder
                ? _c(
                    "option",
                    { attrs: { value: "", disabled: "", selected: "" } },
                    [_vm._v(_vm._s(_vm.placeholder))]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.options, function(option) {
                return _c(
                  "option",
                  { key: option.value, domProps: { value: option.value } },
                  [_vm._v("\n        " + _vm._s(option.label) + "\n      ")]
                )
              })
            ],
            2
          )
        ])
      ]
    )
  };
  var __vue_staticRenderFns__$c = [];
  __vue_render__$c._withStripped = true;

    /* style */
    const __vue_inject_styles__$c = function (inject) {
      if (!inject) return
      inject("data-v-5e1bcd13_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-5e1bcd13 {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.select-wrapper[data-v-5e1bcd13] {\n  display: block;\n  position: relative;\n  width: 100%;\n}\n.select-wrapper[data-v-5e1bcd13]:after {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 2.5em;\n  display: block;\n  content: \"\";\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGFBMVEUAAAAZJCYWISIYIyQYIiUWIiIYIyQYIiXh0rToAAAACHRSTlMA/hTRqiinvwFkb0sAAABCSURBVHjajchBDsAgDAPBOJDw/x+XVN0icQGfPGs3i+2GEqeiLCXWLENzvdzrDfP2ls/NjfKbgimYglfBq2Dm+LwHguMA235EdKYAAAAASUVORK5CYII=\") center no-repeat;\n  pointer-events: none;\n}\n.invalid .select-wrapper select[data-v-5e1bcd13] {\n  color: #d23838;\n  border-color: #d23838;\n}\nselect[data-v-5e1bcd13] {\n  display: block;\n  appearance: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  font-size: 0.875rem;\n  padding: 0.75em 1em;\n  padding-right: 3.5em;\n  border: 1px solid #8C8A7E;\n  background-color: #fff;\n  color: #2A2928;\n  border-radius: 0;\n  width: 100%;\n  cursor: pointer;\n}\nselect.input-sm[data-v-5e1bcd13] {\n  padding: 0.5em 0.5em;\n}\nselect.input-lg[data-v-5e1bcd13] {\n  padding: 1em 1.5em;\n}\nlabel[data-v-5e1bcd13] {\n  display: inline-block;\n  padding-bottom: 0.25em;\n  cursor: pointer;\n  user-select: none;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  font-family: sans-serif;\n  font-weight: 700;\n  line-height: 1.2em;\n  letter-spacing: 0.0833em;\n  line-height: 1em;\n}\n\n/*# sourceMappingURL=ZrSelect.vue.map */", map: {"version":3,"sources":["ZrSelect.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrSelect.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;AACA;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;ACyDF;EACA,cAAA;EACA,kBAAA;EACA,WAAA;ADvDA;ACyDA;EACA,kBAAA;EACA,MAAA;EACA,SAAA;EACA,QAAA;EACA,YAZA;EAaA,cAAA;EACA,WAAA;EACA,0SAAA;EACA,oBAAA;ADvDA;AC2DA;EACA,cAAA;EACA,qBAAA;ADzDA;AC8DA;EACA,cAAA;EACA,gBAAA;EACA,wBAAA;EACA,qBAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EACA,yBAAA;EACA,sBAAA;EACA,cAAA;EACA,gBAAA;EACA,WAAA;EACA,eAAA;AD3DA;AC6DA;EACA,oBAAA;AD3DA;AC8DA;EACA,kBAAA;AD5DA;ACgEA;EACA,qBAAA;EACA,sBAAA;EACA,eAAA;EACA,iBAAA;EAvDA,kBAAA;EDLE,yBAAyB;ECO3B,uBAAA;EACA,gBAAA;EACA,kBAAA;EACA,wBAAA;EAqDA,gBAAA;ADzDA;;AAEA,uCAAuC","file":"ZrSelect.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.select-wrapper {\n  display: block;\n  position: relative;\n  width: 100%;\n}\n.select-wrapper:after {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 2.5em;\n  display: block;\n  content: \"\";\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGFBMVEUAAAAZJCYWISIYIyQYIiUWIiIYIyQYIiXh0rToAAAACHRSTlMA/hTRqiinvwFkb0sAAABCSURBVHjajchBDsAgDAPBOJDw/x+XVN0icQGfPGs3i+2GEqeiLCXWLENzvdzrDfP2ls/NjfKbgimYglfBq2Dm+LwHguMA235EdKYAAAAASUVORK5CYII=\") center no-repeat;\n  pointer-events: none;\n}\n.invalid .select-wrapper select {\n  color: #d23838;\n  border-color: #d23838;\n}\n\nselect {\n  display: block;\n  appearance: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  font-size: 0.875rem;\n  padding: 0.75em 1em;\n  padding-right: 3.5em;\n  border: 1px solid #8C8A7E;\n  background-color: #fff;\n  color: #2A2928;\n  border-radius: 0;\n  width: 100%;\n  cursor: pointer;\n}\nselect.input-sm {\n  padding: 0.5em 0.5em;\n}\nselect.input-lg {\n  padding: 1em 1.5em;\n}\n\nlabel {\n  display: inline-block;\n  padding-bottom: 0.25em;\n  cursor: pointer;\n  user-select: none;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  font-family: sans-serif;\n  font-weight: 700;\n  line-height: 1.2em;\n  letter-spacing: 0.0833em;\n  line-height: 1em;\n}\n\n/*# sourceMappingURL=ZrSelect.vue.map */","<template>\n  <base-input-wrapper v-bind=\"$props\">\n    <label v-if=\"label\" :for=\"id\">{{label}}</label>\n    <div class=\"select-wrapper\">\n      <select :id=\"id\"\n              :name=\"name ? name : id\"\n              :value=\"value\"\n              :class=\"{'input-sm': size === 'sm', 'input-lg': size === 'lg'}\"\n              :required=\"required\"\n              @change=\"updateValue\"\n              :disabled=\"disabled\">\n        <option v-if=\"placeholder\" value=\"\" disabled selected>{{placeholder}}</option>\n        <option v-for=\"option of options\"\n                :value=\"option.value\"\n                :key=\"option.value\">\n          {{option.label}}\n        </option>\n      </select>\n    </div>\n  </base-input-wrapper>\n</template>\n\n<script>\n    import BaseInputWrapper from \"./ZrInputWrapper.vue\";\n    import {inputShared} from \"../../mixins/inputShared\";\n\n    export default {\n    name: \"ZrSelect\",\n    components: {BaseInputWrapper},\n    mixins: [\n      inputShared\n    ],\n    props: {\n      ...inputShared.props,\n      /**\n       * Preselected value\n       */\n      value: {\n        type: [String, Number]\n      },\n      /**\n       * Size of select to render\n       */\n      size: {\n        type: String,\n        default: 'md',\n        validator: function (value) {\n          return ['sm', 'md', 'lg'].indexOf(value) !== -1\n        }\n      },\n      /**\n       * Array of options to display in the select.  Each option should be an object of this shape:\n       * { label: 'optionLabel', value: 'optionValue' }.\n       */\n      options: {\n        type: Array,\n        required: true\n      },\n      /**\n       * Placeholder text to display before first selection is made\n       */\n      placeholder: {\n        type: String,\n        default: ''\n      }\n    },\n    methods: {\n      updateValue(event) {\n        this.$emit('input', event.target.value)\n      }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n  @import '../../styles/imports';\n\n  $select-icon-width: 2.5em;\n\n  .select-wrapper {\n    display: block;\n    position: relative;\n    width: 100%;\n\n    &:after {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      right: 0;\n      width: $select-icon-width;\n      display: block;\n      content: \"\";\n      background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGFBMVEUAAAAZJCYWISIYIyQYIiUWIiIYIyQYIiXh0rToAAAACHRSTlMA/hTRqiinvwFkb0sAAABCSURBVHjajchBDsAgDAPBOJDw/x+XVN0icQGfPGs3i+2GEqeiLCXWLENzvdzrDfP2ls/NjfKbgimYglfBq2Dm+LwHguMA235EdKYAAAAASUVORK5CYII=\") center no-repeat;\n      pointer-events: none;\n    }\n\n    .invalid & {\n      select {\n        color: $color-warning;\n        border-color: $color-warning;\n      }\n    }\n  }\n\n  select {\n    display: block;\n    appearance: none;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    font-size: $input-font-size;\n    padding: $input-padding;\n    padding-right: $select-icon-width + 1em;\n    border: 1px solid $input-border-color;\n    background-color: $color-white;\n    color: $color-darker;\n    border-radius: 0;\n    width: 100%;\n    cursor: pointer;\n\n    &.input-sm {\n      padding: $input-padding-sm;\n    }\n\n    &.input-lg {\n      padding: $input-padding-lg;\n    }\n  }\n\n  label {\n    display: inline-block;\n    padding-bottom: 0.25em;\n    cursor: pointer;\n    user-select: none;\n\n    @include font-label();\n    line-height: 1em;\n  }\n</style>\n\n<docs>\n  ### Basic Select\n  ```jsx\n  <ZrSelect label=\"Basic Select\" :options=\"selectOptions\" id=\"basic-select\"></ZrSelect>\n  ```\n\n  ### Basic Select Disabled\n  ```jsx\n  <ZrSelect label=\"Basic Select\" :options=\"selectOptions\" id=\"basic-select\" :disabled=\"true\"></ZrSelect>\n  ```\n\n  ### Select with placeholder\n  ```jsx\n  <ZrSelect label=\"Placeholder Select\" :options=\"selectOptions\" placeholder=\"Placeholder text\"\n            id=\"Placeholder-select\"></ZrSelect>\n  ```\n\n  ### Select with preselected value\n  ```jsx\n  <ZrSelect label=\"Preselected Select\" :options=\"selectOptions\" :value=\"3\" id=\"Preselected-select\"></ZrSelect>\n  ```\n\n  ### Select with required attribute\n  ```jsx\n  <ZrSelect label=\"Required Select\" :options=\"selectOptions\" :value=\"1\" id=\"Preselected-select\"\n            :required=\"true\"></ZrSelect>\n  ```\n\n  ### Invalid Select\n  ```jsx\n  <ZrSelect label=\"Required Select\" :options=\"selectOptions\" placeholder=\"Placeholder text\" id=\"Preselected-select\"\n            :required=\"true\" :invalid=\"true\"></ZrSelect>\n  ```\n</docs>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$c = "data-v-5e1bcd13";
    /* module identifier */
    const __vue_module_identifier__$c = undefined;
    /* functional template */
    const __vue_is_functional_template__$c = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$c = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
      __vue_inject_styles__$c,
      __vue_script__$c,
      __vue_scope_id__$c,
      __vue_is_functional_template__$c,
      __vue_module_identifier__$c,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  /**
   * Core video component that is meant to display inline and autoplay on mobile, with no controls.
   * Has support for lazy loading by default.  `loaded` event is emitted once video has lazy loaded
   */

  var script$d = {
    name: 'ZrVideo',
    mixins: [lazyLoadShared],
    props: {
      /**
       * URL of the video to display
       */
      videoUrl: {
        type: String,
        required: true
      },

      /**
       * Whether or not to autoplay the video
       */
      autoplay: {
        type: Boolean,
        "default": true
      },

      /**
       * Whether or not to loop the video
       */
      loop: {
        type: Boolean,
        "default": true
      },

      /**
       * Whether or not to mute the video
       */
      muted: {
        type: Boolean,
        "default": true
      },

      /**
       * Whether or not the video should play inline (must be true to autoplay at mobile)
       */
      playsinline: {
        type: Boolean,
        "default": true
      },

      /**
       * Type of video src
       */
      videoType: {
        type: String,
        "default": 'video/mp4'
      }
    }
  };

  /* script */
  const __vue_script__$d = script$d;

  /* template */
  var __vue_render__$d = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.videoUrl && _vm.lazy
      ? _c(
          "video",
          {
            directives: [
              {
                name: "lazy",
                rawName: "v-lazy",
                value: { rootMargin: _vm.rootMargin },
                expression: "{rootMargin: rootMargin}"
              }
            ],
            staticClass: "video",
            class: { "fade-video": _vm.fade },
            style: _vm.fadeStyle,
            attrs: {
              autoplay: _vm.autoplay,
              loop: _vm.loop,
              playsinline: _vm.playsinline
            },
            domProps: { muted: _vm.muted }
          },
          [
            _c("source", {
              attrs: { "data-src": _vm.videoUrl, type: _vm.videoType }
            })
          ]
        )
      : _vm.videoUrl
      ? _c(
          "video",
          {
            staticClass: "video",
            attrs: {
              autoplay: _vm.autoplay,
              loop: _vm.loop,
              playsinline: _vm.playsinline
            },
            domProps: { muted: _vm.muted }
          },
          [_c("source", { attrs: { src: _vm.videoUrl, type: _vm.videoType } })]
        )
      : _vm._e()
  };
  var __vue_staticRenderFns__$d = [];
  __vue_render__$d._withStripped = true;

    /* style */
    const __vue_inject_styles__$d = function (inject) {
      if (!inject) return
      inject("data-v-84e873da_0", { source: ".video[data-v-84e873da] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.video.lazy-video.fade-video[data-v-84e873da] {\n  opacity: 0;\n}\n.video.lazy-video.fade-video.video-loaded[data-v-84e873da] {\n  opacity: 1;\n}\n\n/*# sourceMappingURL=ZrVideo.vue.map */", map: {"version":3,"sources":["/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/base/ZrVideo.vue","ZrVideo.vue"],"names":[],"mappings":"AAsFA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;ACrFA;ADuFA;EACA,UAAA;ACrFA;ADuFA;EACA,UAAA;ACrFA;;AAEA,sCAAsC","file":"ZrVideo.vue","sourcesContent":["<template>\n  <video\n    v-if=\"videoUrl && lazy\"\n    v-lazy=\"{rootMargin: rootMargin}\"\n    class=\"video\"\n    :class=\"{'fade-video': fade}\"\n    :autoplay=\"autoplay\"\n    :loop=\"loop\"\n    :muted=\"muted\"\n    :playsinline=\"playsinline\"\n    :style=\"fadeStyle\"\n  >\n    <source :data-src=\"videoUrl\" :type=\"videoType\" />\n  </video>\n  <video\n    v-else-if=\"videoUrl\"\n    class=\"video\"\n    :autoplay=\"autoplay\"\n    :loop=\"loop\"\n    :muted=\"muted\"\n    :playsinline=\"playsinline\"\n  >\n    <source :src=\"videoUrl\" :type=\"videoType\" />\n  </video>\n</template>\n\n<script>\n  import '../../directives/lazyLoad';\n  import {lazyLoadShared} from '../../mixins/lazyLoadShared';\n\n  /**\n   * Core video component that is meant to display inline and autoplay on mobile, with no controls.\n   * Has support for lazy loading by default.  `loaded` event is emitted once video has lazy loaded\n   */\n\n  export default {\n    name: 'ZrVideo',\n    mixins: [lazyLoadShared],\n    props: {\n      /**\n       * URL of the video to display\n       */\n      videoUrl: {\n        type: String,\n        required: true\n      },\n      /**\n       * Whether or not to autoplay the video\n       */\n      autoplay: {\n        type: Boolean,\n        default: true\n      },\n      /**\n       * Whether or not to loop the video\n       */\n      loop: {\n        type: Boolean,\n        default: true\n      },\n      /**\n       * Whether or not to mute the video\n       */\n      muted: {\n        type: Boolean,\n        default: true\n      },\n      /**\n       * Whether or not the video should play inline (must be true to autoplay at mobile)\n       */\n      playsinline: {\n        type: Boolean,\n        default: true\n      },\n      /**\n       * Type of video src\n       */\n      videoType: {\n        type: String,\n        default: 'video/mp4'\n      }\n    }\n  };\n</script>\n\n<style scoped lang=\"scss\">\n  .video {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n\n    &.lazy-video.fade-video {\n      opacity: 0;\n\n      &.video-loaded {\n        opacity: 1;\n      }\n    }\n  }\n</style>\n\n<docs>\n  ### Examples\n\n  #### Default video with lazy loading\n  ```jsx\n  <zr-video :video-url=\"video.url\" />\n  ```\n\n  #### Video with custom lazy loading\n  ```jsx\n  <zr-video :video-url=\"video.url\" fade-duration=\"5\" fade-easing=\"linear\" />\n  ```\n\n  #### Video with no lazy loading\n  ```jsx\n  <zr-video :video-url=\"video.url\" :lazy=\"false\" />\n  ```\n</docs>\n",".video {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.video.lazy-video.fade-video {\n  opacity: 0;\n}\n.video.lazy-video.fade-video.video-loaded {\n  opacity: 1;\n}\n\n/*# sourceMappingURL=ZrVideo.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$d = "data-v-84e873da";
    /* module identifier */
    const __vue_module_identifier__$d = undefined;
    /* functional template */
    const __vue_is_functional_template__$d = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$d = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
      __vue_inject_styles__$d,
      __vue_script__$d,
      __vue_scope_id__$d,
      __vue_is_functional_template__$d,
      __vue_module_identifier__$d,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  /**
   * A simple accordion component to display a header and content that is hidden by default,
   * and then is expanded to show the content after toggling the header button.  This component
   * is fully accessible according to W3C Standards
   */
  var script$e = {
    name: "ZrAccordion",
    data: function data() {
      return {
        accordionExpanded: this.expanded
      };
    },
    props: {
      /**
       * Text to display as accordion header
       */
      header: {
        type: String,
        "default": 'Accordion Header',
        required: true
      },

      /**
       * Name to identify this accordion by
       */
      name: {
        type: String,
        "default": '',
        required: true
      },

      /**
       * Whether or not the accordion is expanded
       */
      expanded: {
        type: Boolean,
        "default": false
      },

      /**
       * Time, in milliseconds, that the accordion animation will take
       */
      duration: {
        type: Number,
        "default": 200
      },

      /**
       * Easing function for the accordion animation to follow
       */
      easing: {
        type: String,
        "default": 'ease-out'
      }
    },
    computed: {
      contentId: function contentId() {
        return this.name.replace(/\s+/g, '-').toLowerCase();
      },
      accordionTransition: function accordionTransition() {
        return "transition: height ".concat(this.duration, "ms ").concat(this.easing);
      }
    },
    watch: {
      expanded: function expanded(newValue) {
        this.accordionExpanded = newValue;
      }
    },
    methods: {
      toggleAccordion: function toggleAccordion() {
        this.accordionExpanded = !this.accordionExpanded;
        this.$emit('toggle', this.accordionExpanded);
      },
      beforeEnter: function beforeEnter(el) {
        el.style.height = '0';
      },
      enter: function enter(el) {
        el.style.height = el.scrollHeight + 'px';
      },
      beforeLeave: function beforeLeave(el) {
        el.style.height = el.scrollHeight + 'px';
      },
      leave: function leave(el) {
        el.style.height = '0';
      }
    },
    mounted: function mounted() {
      var contentEl = this.$refs.content;
      contentEl.style.height = contentEl.scrollHeight + 'px';
    }
  };

  /* script */
  const __vue_script__$e = script$e;

  /* template */
  var __vue_render__$e = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "accordion-container" },
      [
        _c(
          "button",
          {
            class: ["accordion-header", { expanded: _vm.accordionExpanded }],
            attrs: {
              "aria-controls": _vm.contentId,
              "aria-expanded": _vm.accordionExpanded ? "true" : "false"
            },
            on: { click: _vm.toggleAccordion }
          },
          [
            _vm._v("\n        " + _vm._s(_vm.header) + "\n        "),
            _c("span", { staticClass: "accordion-indicator" })
          ]
        ),
        _vm._v(" "),
        _c(
          "transition",
          {
            attrs: { name: "accordion" },
            on: {
              "before-enter": _vm.beforeEnter,
              enter: _vm.enter,
              "before-leave": _vm.beforeLeave,
              leave: _vm.leave
            }
          },
          [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.accordionExpanded,
                    expression: "accordionExpanded"
                  }
                ],
                ref: "content",
                staticClass: "accordion-content",
                style: _vm.accordionTransition,
                attrs: {
                  "aria-hidden": !_vm.accordionExpanded ? "true" : "false",
                  id: _vm.contentId
                }
              },
              [
                _c(
                  "div",
                  { staticClass: "accordion-content-inner" },
                  [_vm._t("default")],
                  2
                )
              ]
            )
          ]
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$e = [];
  __vue_render__$e._withStripped = true;

    /* style */
    const __vue_inject_styles__$e = function (inject) {
      if (!inject) return
      inject("data-v-6e1845be_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-6e1845be {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.accordion-header[data-v-6e1845be] {\n  position: relative;\n  appearance: none;\n  -webkit-appearance: none;\n  width: 100%;\n  margin: 0;\n  padding: 1rem 1.5rem 1rem 0;\n  line-height: 1;\n  text-align: left;\n  border: none;\n  border-top: 1px solid #000;\n  border-bottom: 1px solid #000;\n  cursor: pointer;\n}\n.accordion-indicator[data-v-6e1845be]:before, .accordion-indicator[data-v-6e1845be]:after {\n  content: \"\";\n  position: absolute;\n  right: 0;\n  top: calc(50% - 1px);\n  display: block;\n  width: 1em;\n  height: 2px;\n  background-color: #000;\n  transition: all 0.25s ease-out;\n}\n.accordion-indicator[data-v-6e1845be]:after {\n  transform: rotate(90deg);\n}\n[aria-expanded=true] .accordion-indicator[data-v-6e1845be]:before, [aria-expanded=true] .accordion-indicator[data-v-6e1845be]:after {\n  transform: rotate(180deg);\n}\n.accordion-content[data-v-6e1845be] {\n  overflow: hidden;\n  transition: all 0.25s ease-out;\n}\n.accordion-content-inner[data-v-6e1845be] {\n  padding: 1rem 0;\n}\n\n/*# sourceMappingURL=ZrAccordion.vue.map */", map: {"version":3,"sources":["ZrAccordion.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/patterns/ZrAccordion.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;AACA;;EAEE;AACF;;EAEE;AACF;;EAEE;AACF;;EAEE;ACkGF;EACA,kBAAA;EACA,gBAAA;EACA,wBAAA;EACA,WAAA;EACA,SAAA;EACA,2BAAA;EACA,cAAA;EACA,gBAAA;EACA,YAAA;EACA,0BAAA;EACA,6BAAA;EACA,eAAA;ADhGA;ACqGA;EAEA,WAAA;EACA,kBAAA;EACA,QAAA;EACA,oBAAA;EACA,cAAA;EACA,UAAA;EACA,WAAA;EACA,sBAAA;EACA,8BAAA;ADnGA;ACsGA;EACA,wBAAA;ADpGA;ACwGA;EAEA,yBAAA;ADvGA;AC4GA;EACA,gBAAA;EACA,8BAAA;ADzGA;AC4GA;EACA,eAAA;ADzGA;;AAEA,0CAA0C","file":"ZrAccordion.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.accordion-header {\n  position: relative;\n  appearance: none;\n  -webkit-appearance: none;\n  width: 100%;\n  margin: 0;\n  padding: 1rem 1.5rem 1rem 0;\n  line-height: 1;\n  text-align: left;\n  border: none;\n  border-top: 1px solid #000;\n  border-bottom: 1px solid #000;\n  cursor: pointer;\n}\n\n.accordion-indicator:before, .accordion-indicator:after {\n  content: \"\";\n  position: absolute;\n  right: 0;\n  top: calc(50% - 1px);\n  display: block;\n  width: 1em;\n  height: 2px;\n  background-color: #000;\n  transition: all 0.25s ease-out;\n}\n.accordion-indicator:after {\n  transform: rotate(90deg);\n}\n[aria-expanded=true] .accordion-indicator:before, [aria-expanded=true] .accordion-indicator:after {\n  transform: rotate(180deg);\n}\n\n.accordion-content {\n  overflow: hidden;\n  transition: all 0.25s ease-out;\n}\n\n.accordion-content-inner {\n  padding: 1rem 0;\n}\n\n/*# sourceMappingURL=ZrAccordion.vue.map */","<template>\n    <div class=\"accordion-container\">\n        <button :class=\"['accordion-header', {'expanded': accordionExpanded}]\"\n                @click=\"toggleAccordion\"\n                :aria-controls=\"contentId\"\n                :aria-expanded=\"accordionExpanded  ? 'true' : 'false'\">\n            {{header}}\n            <span class=\"accordion-indicator\"></span>\n        </button>\n        <transition name=\"accordion\"\n                    v-on:before-enter=\"beforeEnter\" v-on:enter=\"enter\"\n                    v-on:before-leave=\"beforeLeave\" v-on:leave=\"leave\">\n            <div class=\"accordion-content\"\n                 v-show=\"accordionExpanded\"\n                 ref=\"content\"\n                 :aria-hidden=\"!accordionExpanded ? 'true' : 'false'\"\n                 :style=\"accordionTransition\"\n                 :id=\"contentId\">\n                <div class=\"accordion-content-inner\">\n                    <slot></slot>\n                </div>\n            </div>\n        </transition>\n    </div>\n</template>\n\n<script>\n  /**\n   * A simple accordion component to display a header and content that is hidden by default,\n   * and then is expanded to show the content after toggling the header button.  This component\n   * is fully accessible according to W3C Standards\n   */\n\n  export default {\n    name: \"ZrAccordion\",\n    data() {\n      return {\n        accordionExpanded: this.expanded\n      }\n    },\n    props: {\n      /**\n       * Text to display as accordion header\n       */\n      header: {\n        type: String,\n        default: 'Accordion Header',\n        required: true\n      },\n      /**\n       * Name to identify this accordion by\n       */\n      name: {\n        type: String,\n        default: '',\n        required: true\n      },\n      /**\n       * Whether or not the accordion is expanded\n       */\n      expanded: {\n        type: Boolean,\n        default: false\n      },\n      /**\n       * Time, in milliseconds, that the accordion animation will take\n       */\n      duration: {\n        type: Number,\n        default: 200\n      },\n      /**\n       * Easing function for the accordion animation to follow\n       */\n      easing: {\n        type: String,\n        default: 'ease-out'\n      }\n    },\n    computed: {\n      contentId() {\n        return this.name.replace(/\\s+/g, '-').toLowerCase();\n      },\n      accordionTransition() {\n        return `transition: height ${this.duration}ms ${this.easing}`;\n      }\n    },\n    watch: {\n      expanded(newValue) {\n        this.accordionExpanded = newValue;\n      }\n    },\n    methods: {\n      toggleAccordion() {\n        this.accordionExpanded = !this.accordionExpanded;\n        this.$emit('toggle', this.accordionExpanded);\n      },\n      beforeEnter: function(el) {\n        el.style.height = '0';\n      },\n      enter: function(el) {\n        el.style.height = el.scrollHeight + 'px';\n      },\n      beforeLeave: function(el) {\n        el.style.height = el.scrollHeight + 'px';\n      },\n      leave: function(el) {\n        el.style.height = '0';\n      }\n    },\n    mounted() {\n      const contentEl = this.$refs.content;\n      contentEl.style.height = contentEl.scrollHeight + 'px';\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n    @import '../../styles/imports';\n\n    .accordion-header {\n        position: relative;\n        appearance: none;\n        -webkit-appearance: none;\n        width: 100%;\n        margin: 0;\n        padding: $margin-base 1.5rem $margin-base 0;\n        line-height: 1;\n        text-align: left;\n        border: none;\n        border-top: 1px solid $color-black;\n        border-bottom: 1px solid $color-black;\n        cursor: pointer;\n    }\n\n    .accordion-indicator {\n\n        &:before,\n        &:after {\n            content: '';\n            position: absolute;\n            right: 0;\n            top: calc(50% - 1px);\n            display: block;\n            width: 1em;\n            height: 2px;\n            background-color: $color-black;\n            transition: $transition-base;\n        }\n\n        &:after {\n            transform: rotate(90deg);\n        }\n\n        [aria-expanded=\"true\"] & {\n            &:before,\n            &:after {\n                transform: rotate(180deg);\n            }\n        }\n    }\n\n    .accordion-content {\n        overflow: hidden;\n        transition: $transition-base;\n    }\n\n    .accordion-content-inner {\n        padding: $margin-base 0;\n    }\n</style>\n\n<docs>\n    ### Examples\n\n    #### Default Accordion\n    ```jsx\n    <zr-accordion name=\"test1\" header=\"Test Accordion\">\n        <div v-html=\"text.paragraphs\"></div>\n    </zr-accordion>\n    ```\n\n    #### Expanded to start, with remote toggle\n    ```jsx\n    const toggle= true;\n    <div>\n        <button @click=\"toggle = !toggle\" :style=\"{marginBottom: '10px'}\">Toggle Accordion</button>\n        <zr-accordion name=\"test2\" header=\"A Diffent Accordion\" :expanded=\"toggle\">\n            <h5>A heading</h5>\n            <ul>\n                <li>Any</li>\n                <li>Markup</li>\n                <li>You</li>\n                <li>Want</li>\n            </ul>\n        </zr-accordion>\n    </div>\n    ```\n\n    #### Custom transition options\n    ```jsx\n    <zr-accordion name=\"test3\" header=\"Custom transition\" :duration=\"500\" easing=\"cubic-bezier(0.250, 0.250, 0.785, 0.325)\">\n        <div v-html=\"text.paragraphs\"></div>\n    </zr-accordion>\n    ```\n</docs>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$e = "data-v-6e1845be";
    /* module identifier */
    const __vue_module_identifier__$e = undefined;
    /* functional template */
    const __vue_is_functional_template__$e = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$e = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
      __vue_inject_styles__$e,
      __vue_script__$e,
      __vue_scope_id__$e,
      __vue_is_functional_template__$e,
      __vue_module_identifier__$e,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
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

  var script$f = {
    name: "ZrAccordionGroup",
    components: {
      ZrAccordion: __vue_component__$e
    },
    data: function data() {
      return {
        toggleArray: [false, false]
      };
    },
    props: {
      /**
       * Array of accordions to display
       */
      accordionContent: {
        type: Array,
        required: true,
        "default": function _default() {
          return [];
        }
      },

      /**
       * Defines whether multiple accordions can be open at once.
       */
      multipleOpen: {
        type: Boolean,
        "default": false
      }
    },
    methods: {
      groupToggle: function groupToggle(itemIndex) {
        var _this = this;

        this.toggleArray[itemIndex] = !this.toggleArray[itemIndex];
        this.toggleArray.forEach(function (value, index) {
          if (index !== itemIndex && !_this.multipleOpen) {
            _this.toggleArray.splice(index, 1, false);
          }
        });
      }
    }
  };

  /* script */
  const __vue_script__$f = script$f;

  /* template */
  var __vue_render__$f = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ul",
      { staticClass: "accordion-group" },
      _vm._l(_vm.accordionContent, function(accordion, index) {
        return _c(
          "li",
          { staticClass: "accordion-item" },
          [
            _c(
              "zr-accordion",
              {
                attrs: {
                  header: accordion.header,
                  name: accordion.name || index,
                  expanded: _vm.toggleArray[index]
                },
                on: {
                  toggle: function($event) {
                    return _vm.groupToggle(index)
                  }
                }
              },
              [_c("div", { domProps: { innerHTML: _vm._s(accordion.content) } })]
            )
          ],
          1
        )
      }),
      0
    )
  };
  var __vue_staticRenderFns__$f = [];
  __vue_render__$f._withStripped = true;

    /* style */
    const __vue_inject_styles__$f = function (inject) {
      if (!inject) return
      inject("data-v-6f3d9959_0", { source: ".accordion-group[data-v-6f3d9959] {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.accordion-item[data-v-6f3d9959] {\n  position: relative;\n}\n.accordion-item[data-v-6f3d9959]:not(:first-child) {\n  top: -1px;\n}\n\n/*# sourceMappingURL=ZrAccordionGroup.vue.map */", map: {"version":3,"sources":["/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/patterns/ZrAccordionGroup.vue","ZrAccordionGroup.vue"],"names":[],"mappings":"AAwEA;EACA,SAAA;EACA,UAAA;EACA,gBAAA;ACvEA;AD0EA;EACA,kBAAA;ACvEA;ADyEA;EACA,SAAA;ACvEA;;AAEA,+CAA+C","file":"ZrAccordionGroup.vue","sourcesContent":["<template>\n    <ul class=\"accordion-group\">\n        <li v-for=\"(accordion, index) in accordionContent\" class=\"accordion-item\">\n            <zr-accordion :header=\"accordion.header\"\n                          :name=\"accordion.name || index\"\n                          :expanded=\"toggleArray[index]\"\n                          @toggle=\"groupToggle(index)\">\n                <div v-html=\"accordion.content\"></div>\n            </zr-accordion>\n        </li>\n    </ul>\n</template>\n\n<script>\n  import ZrAccordion from \"./ZrAccordion.vue\";\n\n  /**\n   * Displays a group of accordions, based up the accordionContent prop that needs to be in the following form:\n   *\n   * [\n   *    {\n   *        name: (type String) name of the accordion item\n   *        header: (type String) header label to display\n   *        content: (type String) HTML to display as content inside the accordion\n   *    }\n   * ]\n   */\n\n  export default {\n    name: \"ZrAccordionGroup\",\n    components: {ZrAccordion},\n    data() {\n      return {\n        toggleArray: [\n          false,\n          false\n        ]\n      }\n    },\n    props: {\n      /**\n       * Array of accordions to display\n       */\n      accordionContent: {\n        type: Array,\n        required: true,\n        default: function () {\n          return []\n        }\n      },\n      /**\n       * Defines whether multiple accordions can be open at once.\n       */\n      multipleOpen: {\n        type: Boolean,\n        default: false\n      },\n    },\n    methods: {\n      groupToggle(itemIndex) {\n        this.toggleArray[itemIndex] = !this.toggleArray[itemIndex];\n        this.toggleArray.forEach((value, index) => {\n          if (index !== itemIndex && !this.multipleOpen) {\n            this.toggleArray.splice(index, 1, false)\n          }\n        })\n      }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n    .accordion-group {\n        margin: 0;\n        padding: 0;\n        list-style: none;\n    }\n\n    .accordion-item {\n        position: relative;\n\n        &:not(:first-child) {\n            top: -1px;\n        }\n    }\n</style>\n\n<docs>\n    ### Examples\n\n    #### Default Accordion Group\n    ```jsx\n    const content = [\n        {\n            name: 'test1',\n            header: 'First Accordion',\n            content: `<h2>Header 2</h2><p>And a paragraph</p>`\n        },\n        {\n            name: 'test2',\n            header: 'Second Accordion',\n            content: 'Just a string'\n        },\n    ]\n\n    <zr-accordion-group :accordion-content=\"content\"></zr-accordion-group>\n    ```\n\n    #### Accordion that allows multiple opened panes\n    ```jsx\n    const content = [\n        {\n            name: 'test1',\n            header: 'First Accordion',\n            content: `<h2>Header 2</h2><p>And a paragraph</p>`\n        },\n        {\n            name: 'test2',\n            header: 'Second Accordion',\n            content: 'Just a string'\n        },\n    ]\n\n    <zr-accordion-group :accordion-content=\"content\" multiple-open></zr-accordion-group>\n    ```\n</docs>",".accordion-group {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.accordion-item {\n  position: relative;\n}\n.accordion-item:not(:first-child) {\n  top: -1px;\n}\n\n/*# sourceMappingURL=ZrAccordionGroup.vue.map */"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$f = "data-v-6f3d9959";
    /* module identifier */
    const __vue_module_identifier__$f = undefined;
    /* functional template */
    const __vue_is_functional_template__$f = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$f = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
      __vue_inject_styles__$f,
      __vue_script__$f,
      __vue_scope_id__$f,
      __vue_is_functional_template__$f,
      __vue_module_identifier__$f,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  /**
   * A responsive hero banner component that displays a background hero with a slot for content over the banner
   */

  var script$g = {
    name: "ZrHeroBanner",
    components: {
      BasePicture: __vue_component__$8
    },
    props: {
      desktopImg: {
        type: String,
        required: true
      },
      mobileImg: {
        type: String,
        required: true
      },
      altText: {
        type: String,
        required: true
      },
      verticalPosition: {
        type: String,
        "default": 'top',
        validator: function validator(value) {
          return ['top', 'middle', 'bottom'].includes(value);
        }
      },
      horizontalPosition: {
        type: String,
        "default": 'left',
        validator: function validator(value) {
          return ['left', 'center', 'right'].includes(value);
        }
      }
    }
  };

  /* script */
  const __vue_script__$g = script$g;

  /* template */
  var __vue_render__$g = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "section",
      { staticClass: "hero-banner" },
      [
        _c("base-picture", {
          attrs: {
            "desktop-img": _vm.desktopImg,
            "mobile-img": _vm.mobileImg,
            "alt-text": _vm.altText
          }
        }),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "hero-content-wrapper",
            class: [_vm.verticalPosition, _vm.horizontalPosition]
          },
          [_c("div", { staticClass: "hero-content" }, [_vm._t("default")], 2)]
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$g = [];
  __vue_render__$g._withStripped = true;

    /* style */
    const __vue_inject_styles__$g = function (inject) {
      if (!inject) return
      inject("data-v-bf12a44e_0", { source: "/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN-data-v-bf12a44e {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.hero-banner[data-v-bf12a44e] {\n  position: relative;\n  width: 100%;\n}\n.hero-banner img[data-v-bf12a44e] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.hero-content-wrapper[data-v-bf12a44e] {\n  position: relative;\n  display: flex;\n  min-height: 30vw;\n  padding: 1.5rem;\n}\n@media (min-width: 1050px) {\n.hero-content-wrapper[data-v-bf12a44e] {\n    padding: 2rem;\n}\n}\n@media (min-width: 1280px) {\n.hero-content-wrapper[data-v-bf12a44e] {\n    padding: 4rem;\n}\n}\n.hero-content-wrapper.center[data-v-bf12a44e] {\n  justify-content: center;\n}\n.hero-content-wrapper.right[data-v-bf12a44e] {\n  justify-content: flex-end;\n}\n.hero-content-wrapper.middle[data-v-bf12a44e] {\n  align-items: center;\n}\n.hero-content-wrapper.bottom[data-v-bf12a44e] {\n  align-items: flex-end;\n}\n\n/*# sourceMappingURL=ZrHeroBanner.vue.map */", map: {"version":3,"sources":["ZrHeroBanner.vue","/Users/Shared/proj_zr/ui-pantry/packages/vue/index/components/patterns/ZrHeroBanner.vue"],"names":[],"mappings":"AAAA;;sFAEsF;AACtF;AACE;IACE,uBAAuB;AACzB;AACA;IACE,yBAAyB;AAC3B;AACF;AACA;;EAEE;AACF;;EAEE;ACmDF;;EAAA;AAgBA;;EAAA;AApBA;EACA,kBAAA;EACA,WAAA;ADvCA;ACyCA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;ADvCA;AC2CA;EACA,kBAAA;EACA,aAAA;EACA,gBAAA;EACA,eAAA;ADxCA;AC0CA;AANA;IAOA,aAAA;ADvCE;AACF;ACyCA;AAVA;IAWA,aAAA;ADtCE;AACF;ACwCA;EACA,uBAAA;ADtCA;ACyCA;EACA,yBAAA;ADvCA;AC0CA;EACA,mBAAA;ADxCA;AC2CA;EACA,qBAAA;ADzCA;;AAEA,2CAA2C","file":"ZrHeroBanner.vue","sourcesContent":["/*$button-padding-sm:  $input-padding-vertical-sm ($input-padding-horizontal-sm * 2.5);\n$button-padding:  $input-padding-vertical ($input-padding-horizontal * 2.5);\n$button-padding-lg:  $input-padding-vertical-lg ($input-padding-horizontal-lg * 2.5);*/\n@keyframes SPIN {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*\nThis is just use to reduce code in the component padding mixin\n */\n/*\nUsed for default component padding with options to just set it for the top or bottom of an element\n */\n/*\nThis is just use to reduce code in the component margin mixin\n */\n/*\nUsed for default component margin with options to just set it for the top or bottom of an element\n */\n.hero-banner {\n  position: relative;\n  width: 100%;\n}\n.hero-banner img {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.hero-content-wrapper {\n  position: relative;\n  display: flex;\n  min-height: 30vw;\n  padding: 1.5rem;\n}\n@media (min-width: 1050px) {\n  .hero-content-wrapper {\n    padding: 2rem;\n  }\n}\n@media (min-width: 1280px) {\n  .hero-content-wrapper {\n    padding: 4rem;\n  }\n}\n.hero-content-wrapper.center {\n  justify-content: center;\n}\n.hero-content-wrapper.right {\n  justify-content: flex-end;\n}\n.hero-content-wrapper.middle {\n  align-items: center;\n}\n.hero-content-wrapper.bottom {\n  align-items: flex-end;\n}\n\n/*# sourceMappingURL=ZrHeroBanner.vue.map */","<template>\n    <section class=\"hero-banner\">\n        <base-picture :desktop-img=\"desktopImg\"\n                      :mobile-img=\"mobileImg\"\n                      :alt-text=\"altText\">\n        </base-picture>\n        <div class=\"hero-content-wrapper\"\n             :class=\"[\n                verticalPosition, horizontalPosition\n             ]\">\n            <div class=\"hero-content\">\n                <slot></slot>\n            </div>\n        </div>\n    </section>\n</template>\n\n<script>\n  import BasePicture from '../base/ZrPicture.vue';\n\n  /**\n   * A responsive hero banner component that displays a background hero with a slot for content over the banner\n   */\n\n  export default {\n    name: \"ZrHeroBanner\",\n    components: {\n      BasePicture\n    },\n    props: {\n      desktopImg: {\n        type: String,\n        required: true\n      },\n      mobileImg: {\n        type: String,\n        required: true\n      },\n      altText: {\n        type: String,\n        required: true\n      },\n      verticalPosition: {\n        type: String,\n        default: 'top',\n        validator: function (value) {\n          return ['top', 'middle', 'bottom'].includes(value)\n        }\n      },\n      horizontalPosition: {\n        type: String,\n        default: 'left',\n        validator: function (value) {\n          return ['left', 'center', 'right'].includes(value)\n        }\n      }\n    }\n  }\n</script>\n\n<style scoped lang=\"scss\">\n  @import '../../styles/imports';\n\n  .hero-banner {\n    position: relative;\n    width: 100%;\n\n    img {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }\n  }\n\n  .hero-content-wrapper {\n    position: relative;\n    display: flex;\n    min-height: 30vw;\n    padding: $margin-smedium;\n\n    @media (min-width: $screen-md) {\n      padding: $margin-medium;\n    }\n\n    @media (min-width: $screen-lg) {\n      padding: $margin-large;\n    }\n\n    &.center {\n        justify-content: center;\n    }\n\n    &.right {\n        justify-content: flex-end;\n    }\n\n    &.middle {\n        align-items: center;\n    }\n\n    &.bottom {\n        align-items: flex-end;\n    }\n  }\n</style>\n\n<docs>\n    ### Examples\n\n    #### HeroBanner with defaults\n    ```jsx\n    <ZrHeroBanner :desktop-img=\"images.banner_image.url\"\n                 :mobile-img=\"images.banner_image.mobile.url\"\n                 alt-text=\"Text about the image\"\n                 class=\"light-text\">\n        <h2>Hi I am a Title</h2>\n        <h3>I am a subtitle</h3>\n    </ZrHeroBanner>\n    ```\n\n    #### HeroBanner right and bottom aligned\n    ```jsx\n    <ZrHeroBanner :desktop-img=\"images.banner_image.url\"\n                 :mobile-img=\"images.banner_image.mobile.url\"\n                 alt-text=\"Text about the image\"\n                 vertical-position=\"bottom\"\n                 horizontal-position=\"right\"\n                 class=\"light-text\">\n        <h2>Hi I am a Title</h2>\n        <h3>I am a subtitle</h3>\n        <ZrButton size=\"sm\" theme=\"action\" style=\"margin-top: 20px\">Learn More</ZrButton>\n    </ZrHeroBanner>\n    ```\n</docs>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$g = "data-v-bf12a44e";
    /* module identifier */
    const __vue_module_identifier__$g = undefined;
    /* functional template */
    const __vue_is_functional_template__$g = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$g = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
      __vue_inject_styles__$g,
      __vue_script__$g,
      __vue_scope_id__$g,
      __vue_is_functional_template__$g,
      __vue_module_identifier__$g,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //

  /**
   * A component that detects when it is intersected with the viewport, using the IntersectionObserver API.
   * See the IntersectionObserver API documentation for more details on options: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   */
  var zrIntersectionProps = {
    props: {
      /**
       * Option that defines the margin at which intersection takes place.  See MDN documentation (link above) for more details.
       */
      rootMargin: {
        type: String,
        "default": '0px'
      },

      /**
       * Option that defines the threshold of the component that needs to come into view before intersection event fires.
       * Can be a single number between 0 and 1, or multiple numbers that are comma separated
       * See MDN documentation (link above) for more details
       */
      threshold: {
        type: String,
        "default": '0, 1'
      },

      /**
       * Defines if the intersection event will only fire once
       */
      once: {
        type: Boolean,
        "default": true
      }
    }
  };
  var script$h = {
    name: "ZrIntersection",
    mixins: [zrIntersectionProps],
    data: function data() {
      return {
        observer: null,
        previousY: 0,
        previousRatio: 0,
        intersected: false
      };
    },
    computed: {
      cleanThresholdValue: function cleanThresholdValue() {
        var thresholdArray = this.threshold.includes(',') && this.threshold.split(',').map(function (item) {
          return Number(item);
        });
        return thresholdArray || Number(this.threshold);
      }
    },
    mounted: function mounted() {
      var _this = this;

      var intersectionOptions = {
        rootMargin: this.rootMargin,
        threshold: this.cleanThresholdValue
      };
      this.observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var currentY = entry.boundingClientRect.y;
          var currentRatio = entry.intersectionRatio;
          var intersectionObject = {
            scrollDirection: null,
            entering: currentRatio > _this.previousRatio,
            top: null
          };

          if (currentY < _this.previousY) {
            intersectionObject.scrollDirection = 'down';
            intersectionObject.top = intersectionObject.entering ? currentRatio !== 1 : currentRatio !== 0;
          } else if (currentY > _this.previousY) {
            intersectionObject.scrollDirection = 'up';
            intersectionObject.top = intersectionObject.entering ? currentRatio === 1 : currentRatio === 0;
          }

          if (entry.isIntersecting) {
            _this.intersected = true; //console.log(intersectionObject);

            _this.$emit('intersected', intersectionObject);

            if (_this.once) {
              _this.observer.disconnect();
            }
          }

          var downBoundaryCase = intersectionObject.scrollDirection === 'down' && !intersectionObject.entering && !intersectionObject.top;
          var upBoundaryCase = intersectionObject.scrollDirection === 'up' && !intersectionObject.entering && intersectionObject.top;

          if (_this.intersected) {
            if (downBoundaryCase || upBoundaryCase) {
              //console.log(intersectionObject);
              _this.$emit('intersected', intersectionObject);
            }
          }

          _this.previousY = currentY;
          _this.previousRatio = currentRatio;
        });
      }, intersectionOptions);
      this.observer.observe(this.$el);
    },
    destroyed: function destroyed() {
      this.observer.disconnect();
    }
  };

  /* script */
  const __vue_script__$h = script$h;

  /* template */
  var __vue_render__$h = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "intersector" }, [_vm._t("default")], 2)
  };
  var __vue_staticRenderFns__$h = [];
  __vue_render__$h._withStripped = true;

    /* style */
    const __vue_inject_styles__$h = function (inject) {
      if (!inject) return
      inject("data-v-e3ff4eaa_0", { source: "\n\n/*# sourceMappingURL=ZrIntersection.vue.map */", map: {"version":3,"sources":["ZrIntersection.vue"],"names":[],"mappings":";;AAEA,6CAA6C","file":"ZrIntersection.vue"}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$h = "data-v-e3ff4eaa";
    /* module identifier */
    const __vue_module_identifier__$h = undefined;
    /* functional template */
    const __vue_is_functional_template__$h = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$h = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
      __vue_inject_styles__$h,
      __vue_script__$h,
      __vue_scope_id__$h,
      __vue_is_functional_template__$h,
      __vue_module_identifier__$h,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Base components
  var index$1 = {
    ZrAlert: __vue_component__,
    ZrButton: __vue_component__$1,
    ZrCheckbox: __vue_component__$2,
    ZrCounter: __vue_component__$3,
    ZrImage: __vue_component__$4,
    ZrInput: __vue_component__$6,
    ZrInputWrapper: __vue_component__$5,
    ZrLoading: __vue_component__$7,
    ZrPicture: __vue_component__$8,
    ZrProgress: __vue_component__$9,
    ZrRadio: __vue_component__$a,
    ZrRangeSlider: __vue_component__$b,
    ZrSelect: __vue_component__$c,
    ZrVideo: __vue_component__$d,
    ZrAccordion: __vue_component__$e,
    ZrAccordionGroup: __vue_component__$f,
    ZrHeroBanner: __vue_component__$g,
    ZrIntersection: __vue_component__$h
  };

  return index$1;

})));
