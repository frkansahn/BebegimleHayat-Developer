import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _119e3b33 = () => interopDefault(import('..\\pages\\bebek-asi-takvimi-hesaplama.vue' /* webpackChunkName: "pages/bebek-asi-takvimi-hesaplama" */))
const _0d1cef70 = () => interopDefault(import('..\\pages\\bebek-isim-bulucu.vue' /* webpackChunkName: "pages/bebek-isim-bulucu" */))
const _0eb7910e = () => interopDefault(import('..\\pages\\bebek-masraf-hesaplama.vue' /* webpackChunkName: "pages/bebek-masraf-hesaplama" */))
const _1387861e = () => interopDefault(import('..\\pages\\cin-takvimiyle-cinsiyet-hesaplama.vue' /* webpackChunkName: "pages/cin-takvimiyle-cinsiyet-hesaplama" */))
const _26cd2b12 = () => interopDefault(import('..\\pages\\cocuk-boyu-hesaplama.vue' /* webpackChunkName: "pages/cocuk-boyu-hesaplama" */))
const _76796f07 = () => interopDefault(import('..\\pages\\cocuk-gelisimi-tablosu.vue' /* webpackChunkName: "pages/cocuk-gelisimi-tablosu" */))
const _319454fa = () => interopDefault(import('..\\pages\\dogum-planlayici.vue' /* webpackChunkName: "pages/dogum-planlayici" */))
const _6828ed68 = () => interopDefault(import('..\\pages\\dogum-tarihi-hesaplama.vue' /* webpackChunkName: "pages/dogum-tarihi-hesaplama" */))
const _26b563aa = () => interopDefault(import('..\\pages\\goz-rengi-tahmini.vue' /* webpackChunkName: "pages/goz-rengi-tahmini" */))
const _e5e96548 = () => interopDefault(import('..\\pages\\hamilelik-kilo-hesaplama.vue' /* webpackChunkName: "pages/hamilelik-kilo-hesaplama" */))
const _57a86226 = () => interopDefault(import('..\\pages\\iletisim.vue' /* webpackChunkName: "pages/iletisim" */))
const _ce8f37a6 = () => interopDefault(import('..\\pages\\sac-rengi-tahmini.vue' /* webpackChunkName: "pages/sac-rengi-tahmini" */))
const _24b51831 = () => interopDefault(import('..\\pages\\uye-giris.vue' /* webpackChunkName: "pages/uye-giris" */))
const _add1b8f6 = () => interopDefault(import('..\\pages\\uye-kayit.vue' /* webpackChunkName: "pages/uye-kayit" */))
const _f156b2c6 = () => interopDefault(import('..\\pages\\uye-sifremi-unuttum.vue' /* webpackChunkName: "pages/uye-sifremi-unuttum" */))
const _479ab8f7 = () => interopDefault(import('..\\pages\\yumurtlama-gunu-hesaplama.vue' /* webpackChunkName: "pages/yumurtlama-gunu-hesaplama" */))
const _04568598 = () => interopDefault(import('..\\pages\\account\\change-password.vue' /* webpackChunkName: "pages/account/change-password" */))
const _5f45cb62 = () => interopDefault(import('..\\pages\\account\\personal-information.vue' /* webpackChunkName: "pages/account/personal-information" */))
const _83e30a4e = () => interopDefault(import('..\\pages\\yazar\\admin.vue' /* webpackChunkName: "pages/yazar/admin" */))
const _1bf6ee15 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _31dc9076 = () => interopDefault(import('..\\pages\\_seoLink.vue' /* webpackChunkName: "pages/_seoLink" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/bebek-asi-takvimi-hesaplama",
    component: _119e3b33,
    name: "bebek-asi-takvimi-hesaplama"
  }, {
    path: "/bebek-isim-bulucu",
    component: _0d1cef70,
    name: "bebek-isim-bulucu"
  }, {
    path: "/bebek-masraf-hesaplama",
    component: _0eb7910e,
    name: "bebek-masraf-hesaplama"
  }, {
    path: "/cin-takvimiyle-cinsiyet-hesaplama",
    component: _1387861e,
    name: "cin-takvimiyle-cinsiyet-hesaplama"
  }, {
    path: "/cocuk-boyu-hesaplama",
    component: _26cd2b12,
    name: "cocuk-boyu-hesaplama"
  }, {
    path: "/cocuk-gelisimi-tablosu",
    component: _76796f07,
    name: "cocuk-gelisimi-tablosu"
  }, {
    path: "/dogum-planlayici",
    component: _319454fa,
    name: "dogum-planlayici"
  }, {
    path: "/dogum-tarihi-hesaplama",
    component: _6828ed68,
    name: "dogum-tarihi-hesaplama"
  }, {
    path: "/goz-rengi-tahmini",
    component: _26b563aa,
    name: "goz-rengi-tahmini"
  }, {
    path: "/hamilelik-kilo-hesaplama",
    component: _e5e96548,
    name: "hamilelik-kilo-hesaplama"
  }, {
    path: "/iletisim",
    component: _57a86226,
    name: "iletisim"
  }, {
    path: "/sac-rengi-tahmini",
    component: _ce8f37a6,
    name: "sac-rengi-tahmini"
  }, {
    path: "/uye-giris",
    component: _24b51831,
    name: "uye-giris"
  }, {
    path: "/uye-kayit",
    component: _add1b8f6,
    name: "uye-kayit"
  }, {
    path: "/uye-sifremi-unuttum",
    component: _f156b2c6,
    name: "uye-sifremi-unuttum"
  }, {
    path: "/yumurtlama-gunu-hesaplama",
    component: _479ab8f7,
    name: "yumurtlama-gunu-hesaplama"
  }, {
    path: "/account/change-password",
    component: _04568598,
    name: "account-change-password"
  }, {
    path: "/account/personal-information",
    component: _5f45cb62,
    name: "account-personal-information"
  }, {
    path: "/yazar/admin",
    component: _83e30a4e,
    name: "yazar-admin"
  }, {
    path: "/",
    component: _1bf6ee15,
    name: "index"
  }, {
    path: "/:seoLink",
    component: _31dc9076,
    name: "seoLink"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
