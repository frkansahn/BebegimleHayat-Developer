import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_79029f98 from 'nuxt_plugin_plugin_79029f98' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_bootstrapvue_92c32cf4 from 'nuxt_plugin_bootstrapvue_92c32cf4' // Source: .\\bootstrap-vue.js (mode: 'all')
import nuxt_plugin_vuesocialsharingplugin_2c197bd0 from 'nuxt_plugin_vuesocialsharingplugin_2c197bd0' // Source: .\\vue-social-sharing-plugin.js (mode: 'all')
import nuxt_plugin_cookieuniversalnuxt_8af43802 from 'nuxt_plugin_cookieuniversalnuxt_8af43802' // Source: .\\cookie-universal-nuxt.js (mode: 'all')
import nuxt_plugin_axios_e4945b52 from 'nuxt_plugin_axios_e4945b52' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_repositories_a519ad4e from 'nuxt_plugin_repositories_a519ad4e' // Source: ..\\plugins\\repositories.js (mode: 'all')
import nuxt_plugin_vueawesomeswiper_0f4ed586 from 'nuxt_plugin_vueawesomeswiper_0f4ed586' // Source: ..\\plugins\\vue-awesome-swiper (mode: 'all')
import nuxt_plugin_checkIsNullOrEmpty_19b18ee5 from 'nuxt_plugin_checkIsNullOrEmpty_19b18ee5' // Source: ..\\plugins\\checkIsNullOrEmpty (mode: 'all')
import nuxt_plugin_dateFormat_7a6aae39 from 'nuxt_plugin_dateFormat_7a6aae39' // Source: ..\\plugins\\dateFormat (mode: 'all')
import nuxt_plugin_checkEmail_50d33068 from 'nuxt_plugin_checkEmail_50d33068' // Source: ..\\plugins\\checkEmail (mode: 'all')
import nuxt_plugin_currency_7a0e7205 from 'nuxt_plugin_currency_7a0e7205' // Source: ..\\plugins\\currency (mode: 'all')
import nuxt_plugin_vueselect_3ecdefd2 from 'nuxt_plugin_vueselect_3ecdefd2' // Source: ..\\plugins\\vue-select (mode: 'all')
import nuxt_plugin_vuedraggable_04979092 from 'nuxt_plugin_vuedraggable_04979092' // Source: ..\\plugins\\vue-draggable (mode: 'all')
import nuxt_plugin_directives_7e8ad6f8 from 'nuxt_plugin_directives_7e8ad6f8' // Source: ..\\plugins\\directives (mode: 'all')
import nuxt_plugin_vuematerialtabs_40c398e9 from 'nuxt_plugin_vuematerialtabs_40c398e9' // Source: ..\\plugins\\vue-material-tabs (mode: 'all')
import nuxt_plugin_vuenumericdirective_420389e3 from 'nuxt_plugin_vuenumericdirective_420389e3' // Source: ..\\plugins\\vue-numeric-directive.js (mode: 'all')
import nuxt_plugin_vuedatetimepicker_2205fd1c from 'nuxt_plugin_vuedatetimepicker_2205fd1c' // Source: ..\\plugins\\vue-datetime-picker.js (mode: 'client')
import nuxt_plugin_vuechart_2d0fe5b4 from 'nuxt_plugin_vuechart_2d0fe5b4' // Source: ..\\plugins\\vue-chart.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root ? this.$root.$options.$nuxt : null
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const store = createStore(ssrContext)
  const router = await createRouter(ssrContext, config, { store })

  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"Bebeklere Dair Her Şey Burada! | BebeğimleHayat","htmlAttrs":{"lang":"tr"},"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"},{"name":"author","content":"Bebeklere Dair Her Şey Burada! | BebeğimleHayat"},{"hid":"keywords","name":"keywords","content":"bebegimlehayat"},{"hid":"description","name":"description","content":"Bebeklere Dair Her Şey Burada! | BebeğimleHayat"},{"hid":"copyright","name":"copyright","content":"Bebeklere Dair Her Şey Burada! | BebeğimleHayat"},{"hid":"robots","name":"robots","content":"index,follow"},{"property":"og:image","content":"\u002FData\u002Fbebegimlehayat-logo.svg"},{"name":"twitter:image","content":"\u002FData\u002Fbebegimlehayat-logo-svg"},{"property":"og:type","content":"website"},{"hid":"og:title","property":"og:title","content":"Bebeklere Dair Her Şey Burada! | BebeğimleHayat"},{"hid":"og:description","property":"og:description","content":"Bebeklere Dair Her Şey Burada! | BebeğimleHayat"},{"property":"og:url","content":"https:\u002F\u002Fbebegimlehayat.com\u002F"},{"property":"og:site_name","content":"https:\u002F\u002Fbebegimlehayat.com\u002F"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"Bebeklere Dair Her Şey Burada! | BebeğimleHayat"},{"name":"twitter:description","content":"Bebeklere Dair Her Şey Burada! | BebeğimleHayat"}],"script":[{"innerHTML":"(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n                    'https:\u002F\u002Fwww.googletagmanager.com\u002Fgtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n                    })(window,document,'script','dataLayer','GTM-KM2FC8D');\n                "}],"link":[],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    beforeSerializeFns: ssrContext ? ssrContext.beforeSerializeFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_79029f98 === 'function') {
    await nuxt_plugin_plugin_79029f98(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_92c32cf4 === 'function') {
    await nuxt_plugin_bootstrapvue_92c32cf4(app.context, inject)
  }

  if (typeof nuxt_plugin_vuesocialsharingplugin_2c197bd0 === 'function') {
    await nuxt_plugin_vuesocialsharingplugin_2c197bd0(app.context, inject)
  }

  if (typeof nuxt_plugin_cookieuniversalnuxt_8af43802 === 'function') {
    await nuxt_plugin_cookieuniversalnuxt_8af43802(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_e4945b52 === 'function') {
    await nuxt_plugin_axios_e4945b52(app.context, inject)
  }

  if (typeof nuxt_plugin_repositories_a519ad4e === 'function') {
    await nuxt_plugin_repositories_a519ad4e(app.context, inject)
  }

  if (typeof nuxt_plugin_vueawesomeswiper_0f4ed586 === 'function') {
    await nuxt_plugin_vueawesomeswiper_0f4ed586(app.context, inject)
  }

  if (typeof nuxt_plugin_checkIsNullOrEmpty_19b18ee5 === 'function') {
    await nuxt_plugin_checkIsNullOrEmpty_19b18ee5(app.context, inject)
  }

  if (typeof nuxt_plugin_dateFormat_7a6aae39 === 'function') {
    await nuxt_plugin_dateFormat_7a6aae39(app.context, inject)
  }

  if (typeof nuxt_plugin_checkEmail_50d33068 === 'function') {
    await nuxt_plugin_checkEmail_50d33068(app.context, inject)
  }

  if (typeof nuxt_plugin_currency_7a0e7205 === 'function') {
    await nuxt_plugin_currency_7a0e7205(app.context, inject)
  }

  if (typeof nuxt_plugin_vueselect_3ecdefd2 === 'function') {
    await nuxt_plugin_vueselect_3ecdefd2(app.context, inject)
  }

  if (typeof nuxt_plugin_vuedraggable_04979092 === 'function') {
    await nuxt_plugin_vuedraggable_04979092(app.context, inject)
  }

  if (typeof nuxt_plugin_directives_7e8ad6f8 === 'function') {
    await nuxt_plugin_directives_7e8ad6f8(app.context, inject)
  }

  if (typeof nuxt_plugin_vuematerialtabs_40c398e9 === 'function') {
    await nuxt_plugin_vuematerialtabs_40c398e9(app.context, inject)
  }

  if (typeof nuxt_plugin_vuenumericdirective_420389e3 === 'function') {
    await nuxt_plugin_vuenumericdirective_420389e3(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuedatetimepicker_2205fd1c === 'function') {
    await nuxt_plugin_vuedatetimepicker_2205fd1c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuechart_2d0fe5b4 === 'function') {
    await nuxt_plugin_vuechart_2d0fe5b4(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
