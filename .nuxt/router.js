import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _99720490 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _1c81b6ab = () => interopDefault(import('..\\pages\\bebek-asi-takvimi-hesaplama.vue' /* webpackChunkName: "pages/bebek-asi-takvimi-hesaplama" */))
const _e24b0c80 = () => interopDefault(import('..\\pages\\bebek-isim-bulucu.vue' /* webpackChunkName: "pages/bebek-isim-bulucu" */))
const _75433e69 = () => interopDefault(import('..\\pages\\cin-takvimiyle-cinsiyet-hesaplama.vue' /* webpackChunkName: "pages/cin-takvimiyle-cinsiyet-hesaplama" */))
const _28153402 = () => interopDefault(import('..\\pages\\cocuk-boyu-hesaplama.vue' /* webpackChunkName: "pages/cocuk-boyu-hesaplama" */))
const _0ec4a88f = () => interopDefault(import('..\\pages\\cocuk-gelisimi-tablosu.vue' /* webpackChunkName: "pages/cocuk-gelisimi-tablosu" */))
const _69e956fc = () => interopDefault(import('..\\pages\\dogum-planlayici.vue' /* webpackChunkName: "pages/dogum-planlayici" */))
const _6436c2d4 = () => interopDefault(import('..\\pages\\dogum-tarihi-hesaplama.vue' /* webpackChunkName: "pages/dogum-tarihi-hesaplama" */))
const _87c355bc = () => interopDefault(import('..\\pages\\goz-rengi-tahmini.vue' /* webpackChunkName: "pages/goz-rengi-tahmini" */))
const _3f6e44e4 = () => interopDefault(import('..\\pages\\hamilelik-kilo-hesaplama.vue' /* webpackChunkName: "pages/hamilelik-kilo-hesaplama" */))
const _e5825316 = () => interopDefault(import('..\\pages\\iletisim.vue' /* webpackChunkName: "pages/iletisim" */))
const _2e2155a5 = () => interopDefault(import('..\\pages\\sac-rengi-tahmini.vue' /* webpackChunkName: "pages/sac-rengi-tahmini" */))
const _e3f9fcae = () => interopDefault(import('..\\pages\\uye-giris.vue' /* webpackChunkName: "pages/uye-giris" */))
const _12650cfd = () => interopDefault(import('..\\pages\\uye-kayit.vue' /* webpackChunkName: "pages/uye-kayit" */))
const _66471a15 = () => interopDefault(import('..\\pages\\uye-sifremi-unuttum.vue' /* webpackChunkName: "pages/uye-sifremi-unuttum" */))
const _3cd29b22 = () => interopDefault(import('..\\pages\\yumurtlama-gunu-hesaplama.vue' /* webpackChunkName: "pages/yumurtlama-gunu-hesaplama" */))
const _0a752ad8 = () => interopDefault(import('..\\pages\\admin\\add-blog.vue' /* webpackChunkName: "pages/admin/add-blog" */))
const _2699db50 = () => interopDefault(import('..\\pages\\admin\\add-contents.vue' /* webpackChunkName: "pages/admin/add-contents" */))
const _4f80fed6 = () => interopDefault(import('..\\pages\\admin\\add-image.vue' /* webpackChunkName: "pages/admin/add-image" */))
const _0cd14ba2 = () => interopDefault(import('..\\pages\\admin\\blog-category.vue' /* webpackChunkName: "pages/admin/blog-category" */))
const _1ead6277 = () => interopDefault(import('..\\pages\\admin\\blogs.vue' /* webpackChunkName: "pages/admin/blogs" */))
const _97088426 = () => interopDefault(import('..\\pages\\admin\\brand.vue' /* webpackChunkName: "pages/admin/brand" */))
const _3ea670fa = () => interopDefault(import('..\\pages\\admin\\category\\index.vue' /* webpackChunkName: "pages/admin/category/index" */))
const _57b2aab8 = () => interopDefault(import('..\\pages\\admin\\contents.vue' /* webpackChunkName: "pages/admin/contents" */))
const _27918a92 = () => interopDefault(import('..\\pages\\admin\\contents-category.vue' /* webpackChunkName: "pages/admin/contents-category" */))
const _129480bb = () => interopDefault(import('..\\pages\\admin\\customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _95757c34 = () => interopDefault(import('..\\pages\\admin\\file-manager.vue' /* webpackChunkName: "pages/admin/file-manager" */))
const _2b65cc5d = () => interopDefault(import('..\\pages\\admin\\header-menu\\index.vue' /* webpackChunkName: "pages/admin/header-menu/index" */))
const _7ceea0cf = () => interopDefault(import('..\\pages\\admin\\login.vue' /* webpackChunkName: "pages/admin/login" */))
const _6b90cc8f = () => interopDefault(import('..\\pages\\admin\\model.vue' /* webpackChunkName: "pages/admin/model" */))
const _2ba81864 = () => interopDefault(import('..\\pages\\admin\\order\\index.vue' /* webpackChunkName: "pages/admin/order/index" */))
const _1a231b0d = () => interopDefault(import('..\\pages\\admin\\product\\index.vue' /* webpackChunkName: "pages/admin/product/index" */))
const _7d3f41a6 = () => interopDefault(import('..\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _c232ee70 = () => interopDefault(import('..\\pages\\admin\\sub-product.vue' /* webpackChunkName: "pages/admin/sub-product" */))
const _1920a056 = () => interopDefault(import('..\\pages\\admin\\supplier.vue' /* webpackChunkName: "pages/admin/supplier" */))
const _371c11a2 = () => interopDefault(import('..\\pages\\admin\\theme.vue' /* webpackChunkName: "pages/admin/theme" */))
const _0e9e5024 = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _6b28f5fd = () => interopDefault(import('..\\pages\\admin\\xml.vue' /* webpackChunkName: "pages/admin/xml" */))
const _08c984e6 = () => interopDefault(import('..\\pages\\admin\\product\\add\\index.vue' /* webpackChunkName: "pages/admin/product/add/index" */))
const _49660103 = () => interopDefault(import('..\\pages\\admin\\product\\edit\\index.vue' /* webpackChunkName: "pages/admin/product/edit/index" */))
const _0586ead8 = () => interopDefault(import('..\\pages\\admin\\sliders\\editorlerimizin-sectikleri.vue' /* webpackChunkName: "pages/admin/sliders/editorlerimizin-sectikleri" */))
const _79ecdac7 = () => interopDefault(import('..\\pages\\admin\\sliders\\herkes-onu-konusuyor.vue' /* webpackChunkName: "pages/admin/sliders/herkes-onu-konusuyor" */))
const _52fc8713 = () => interopDefault(import('..\\pages\\admin\\sliders\\slider-page.vue' /* webpackChunkName: "pages/admin/sliders/slider-page" */))
const _58aef7d3 = () => interopDefault(import('..\\pages\\admin\\sliders\\surdurulebilir-yasam.vue' /* webpackChunkName: "pages/admin/sliders/surdurulebilir-yasam" */))
const _a43758e6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _4893a505 = () => interopDefault(import('..\\pages\\admin\\order\\detail\\_id.vue' /* webpackChunkName: "pages/admin/order/detail/_id" */))
const _6c0e7b30 = () => interopDefault(import('..\\pages\\admin\\blog-detail\\_id.vue' /* webpackChunkName: "pages/admin/blog-detail/_id" */))
const _450ab4e0 = () => interopDefault(import('..\\pages\\admin\\contents-detail\\_id.vue' /* webpackChunkName: "pages/admin/contents-detail/_id" */))
const _0c42d1a4 = () => interopDefault(import('..\\pages\\admin\\customer-detail\\_id.vue' /* webpackChunkName: "pages/admin/customer-detail/_id" */))
const _bfb68166 = () => interopDefault(import('..\\pages\\_seoLink.vue' /* webpackChunkName: "pages/_seoLink" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _99720490,
    name: "admin"
  }, {
    path: "/bebek-asi-takvimi-hesaplama",
    component: _1c81b6ab,
    name: "bebek-asi-takvimi-hesaplama"
  }, {
    path: "/bebek-isim-bulucu",
    component: _e24b0c80,
    name: "bebek-isim-bulucu"
  }, {
    path: "/cin-takvimiyle-cinsiyet-hesaplama",
    component: _75433e69,
    name: "cin-takvimiyle-cinsiyet-hesaplama"
  }, {
    path: "/cocuk-boyu-hesaplama",
    component: _28153402,
    name: "cocuk-boyu-hesaplama"
  }, {
    path: "/cocuk-gelisimi-tablosu",
    component: _0ec4a88f,
    name: "cocuk-gelisimi-tablosu"
  }, {
    path: "/dogum-planlayici",
    component: _69e956fc,
    name: "dogum-planlayici"
  }, {
    path: "/dogum-tarihi-hesaplama",
    component: _6436c2d4,
    name: "dogum-tarihi-hesaplama"
  }, {
    path: "/goz-rengi-tahmini",
    component: _87c355bc,
    name: "goz-rengi-tahmini"
  }, {
    path: "/hamilelik-kilo-hesaplama",
    component: _3f6e44e4,
    name: "hamilelik-kilo-hesaplama"
  }, {
    path: "/iletisim",
    component: _e5825316,
    name: "iletisim"
  }, {
    path: "/sac-rengi-tahmini",
    component: _2e2155a5,
    name: "sac-rengi-tahmini"
  }, {
    path: "/uye-giris",
    component: _e3f9fcae,
    name: "uye-giris"
  }, {
    path: "/uye-kayit",
    component: _12650cfd,
    name: "uye-kayit"
  }, {
    path: "/uye-sifremi-unuttum",
    component: _66471a15,
    name: "uye-sifremi-unuttum"
  }, {
    path: "/yumurtlama-gunu-hesaplama",
    component: _3cd29b22,
    name: "yumurtlama-gunu-hesaplama"
  }, {
    path: "/admin/add-blog",
    component: _0a752ad8,
    name: "admin-add-blog"
  }, {
    path: "/admin/add-contents",
    component: _2699db50,
    name: "admin-add-contents"
  }, {
    path: "/admin/add-image",
    component: _4f80fed6,
    name: "admin-add-image"
  }, {
    path: "/admin/blog-category",
    component: _0cd14ba2,
    name: "admin-blog-category"
  }, {
    path: "/admin/blogs",
    component: _1ead6277,
    name: "admin-blogs"
  }, {
    path: "/admin/brand",
    component: _97088426,
    name: "admin-brand"
  }, {
    path: "/admin/category",
    component: _3ea670fa,
    name: "admin-category"
  }, {
    path: "/admin/contents",
    component: _57b2aab8,
    name: "admin-contents"
  }, {
    path: "/admin/contents-category",
    component: _27918a92,
    name: "admin-contents-category"
  }, {
    path: "/admin/customers",
    component: _129480bb,
    name: "admin-customers"
  }, {
    path: "/admin/file-manager",
    component: _95757c34,
    name: "admin-file-manager"
  }, {
    path: "/admin/header-menu",
    component: _2b65cc5d,
    name: "admin-header-menu"
  }, {
    path: "/admin/login",
    component: _7ceea0cf,
    name: "admin-login"
  }, {
    path: "/admin/model",
    component: _6b90cc8f,
    name: "admin-model"
  }, {
    path: "/admin/order",
    component: _2ba81864,
    name: "admin-order"
  }, {
    path: "/admin/product",
    component: _1a231b0d,
    name: "admin-product"
  }, {
    path: "/admin/settings",
    component: _7d3f41a6,
    name: "admin-settings"
  }, {
    path: "/admin/sub-product",
    component: _c232ee70,
    name: "admin-sub-product"
  }, {
    path: "/admin/supplier",
    component: _1920a056,
    name: "admin-supplier"
  }, {
    path: "/admin/theme",
    component: _371c11a2,
    name: "admin-theme"
  }, {
    path: "/admin/users",
    component: _0e9e5024,
    name: "admin-users"
  }, {
    path: "/admin/xml",
    component: _6b28f5fd,
    name: "admin-xml"
  }, {
    path: "/admin/product/add",
    component: _08c984e6,
    name: "admin-product-add"
  }, {
    path: "/admin/product/edit",
    component: _49660103,
    name: "admin-product-edit"
  }, {
    path: "/admin/sliders/editorlerimizin-sectikleri",
    component: _0586ead8,
    name: "admin-sliders-editorlerimizin-sectikleri"
  }, {
    path: "/admin/sliders/herkes-onu-konusuyor",
    component: _79ecdac7,
    name: "admin-sliders-herkes-onu-konusuyor"
  }, {
    path: "/admin/sliders/slider-page",
    component: _52fc8713,
    name: "admin-sliders-slider-page"
  }, {
    path: "/admin/sliders/surdurulebilir-yasam",
    component: _58aef7d3,
    name: "admin-sliders-surdurulebilir-yasam"
  }, {
    path: "/",
    component: _a43758e6,
    name: "index"
  }, {
    path: "/admin/order/detail/:id?",
    component: _4893a505,
    name: "admin-order-detail-id"
  }, {
    path: "/admin/blog-detail/:id?",
    component: _6c0e7b30,
    name: "admin-blog-detail-id"
  }, {
    path: "/admin/contents-detail/:id?",
    component: _450ab4e0,
    name: "admin-contents-detail-id"
  }, {
    path: "/admin/customer-detail/:id?",
    component: _0c42d1a4,
    name: "admin-customer-detail-id"
  }, {
    path: "/:seoLink",
    component: _bfb68166,
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
