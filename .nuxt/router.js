import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5192fa30 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
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
const _370e3b60 = () => interopDefault(import('..\\pages\\admin\\add-blog.vue' /* webpackChunkName: "pages/admin/add-blog" */))
const _47a767d8 = () => interopDefault(import('..\\pages\\admin\\add-contents.vue' /* webpackChunkName: "pages/admin/add-contents" */))
const _3ec8810d = () => interopDefault(import('..\\pages\\admin\\add-image.vue' /* webpackChunkName: "pages/admin/add-image" */))
const _0b8942b2 = () => interopDefault(import('..\\pages\\admin\\blog-category.vue' /* webpackChunkName: "pages/admin/blog-category" */))
const _860d4222 = () => interopDefault(import('..\\pages\\admin\\blogs.vue' /* webpackChunkName: "pages/admin/blogs" */))
const _52c7ba65 = () => interopDefault(import('..\\pages\\admin\\brand.vue' /* webpackChunkName: "pages/admin/brand" */))
const _b349911c = () => interopDefault(import('..\\pages\\admin\\category\\index.vue' /* webpackChunkName: "pages/admin/category/index" */))
const _00bfbb2c = () => interopDefault(import('..\\pages\\admin\\contents.vue' /* webpackChunkName: "pages/admin/contents" */))
const _39d4432f = () => interopDefault(import('..\\pages\\admin\\contents-category.vue' /* webpackChunkName: "pages/admin/contents-category" */))
const _791d8133 = () => interopDefault(import('..\\pages\\admin\\customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _535a6324 = () => interopDefault(import('..\\pages\\admin\\file-manager.vue' /* webpackChunkName: "pages/admin/file-manager" */))
const _dd2c5a36 = () => interopDefault(import('..\\pages\\admin\\header-menu\\index.vue' /* webpackChunkName: "pages/admin/header-menu/index" */))
const _1b3a9d47 = () => interopDefault(import('..\\pages\\admin\\login.vue' /* webpackChunkName: "pages/admin/login" */))
const _09dcc907 = () => interopDefault(import('..\\pages\\admin\\model.vue' /* webpackChunkName: "pages/admin/model" */))
const _0b398056 = () => interopDefault(import('..\\pages\\admin\\order\\index.vue' /* webpackChunkName: "pages/admin/order/index" */))
const _2dffa595 = () => interopDefault(import('..\\pages\\admin\\product\\index.vue' /* webpackChunkName: "pages/admin/product/index" */))
const _240d2096 = () => interopDefault(import('..\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _f19d6980 = () => interopDefault(import('..\\pages\\admin\\sub-product.vue' /* webpackChunkName: "pages/admin/sub-product" */))
const _45b9b0de = () => interopDefault(import('..\\pages\\admin\\supplier.vue' /* webpackChunkName: "pages/admin/supplier" */))
const _fa8418b2 = () => interopDefault(import('..\\pages\\admin\\theme.vue' /* webpackChunkName: "pages/admin/theme" */))
const _d2065734 = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _aa8c9f16 = () => interopDefault(import('..\\pages\\admin\\xml.vue' /* webpackChunkName: "pages/admin/xml" */))
const _83e30a4e = () => interopDefault(import('..\\pages\\yazar\\admin.vue' /* webpackChunkName: "pages/yazar/admin" */))
const _63464f5e = () => interopDefault(import('..\\pages\\admin\\product\\add\\index.vue' /* webpackChunkName: "pages/admin/product/add/index" */))
const _3e82858b = () => interopDefault(import('..\\pages\\admin\\product\\edit\\index.vue' /* webpackChunkName: "pages/admin/product/edit/index" */))
const _8ef535e8 = () => interopDefault(import('..\\pages\\admin\\sliders\\editorlerimizin-sectikleri.vue' /* webpackChunkName: "pages/admin/sliders/editorlerimizin-sectikleri" */))
const _29a8ef3f = () => interopDefault(import('..\\pages\\admin\\sliders\\herkes-onu-konusuyor.vue' /* webpackChunkName: "pages/admin/sliders/herkes-onu-konusuyor" */))
const _48190b9b = () => interopDefault(import('..\\pages\\admin\\sliders\\slider-page.vue' /* webpackChunkName: "pages/admin/sliders/slider-page" */))
const _086b0c4b = () => interopDefault(import('..\\pages\\admin\\sliders\\surdurulebilir-yasam.vue' /* webpackChunkName: "pages/admin/sliders/surdurulebilir-yasam" */))
const _1bf6ee15 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _a2d0a8e6 = () => interopDefault(import('..\\pages\\admin\\order\\detail\\_id.vue' /* webpackChunkName: "pages/admin/order/detail/_id" */))
const _58dccaf0 = () => interopDefault(import('..\\pages\\admin\\blog-detail\\_id.vue' /* webpackChunkName: "pages/admin/blog-detail/_id" */))
const _3a273968 = () => interopDefault(import('..\\pages\\admin\\contents-detail\\_id.vue' /* webpackChunkName: "pages/admin/contents-detail/_id" */))
const _015f562c = () => interopDefault(import('..\\pages\\admin\\customer-detail\\_id.vue' /* webpackChunkName: "pages/admin/customer-detail/_id" */))
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
    path: "/admin",
    component: _5192fa30,
    name: "admin"
  }, {
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
    path: "/admin/add-blog",
    component: _370e3b60,
    name: "admin-add-blog"
  }, {
    path: "/admin/add-contents",
    component: _47a767d8,
    name: "admin-add-contents"
  }, {
    path: "/admin/add-image",
    component: _3ec8810d,
    name: "admin-add-image"
  }, {
    path: "/admin/blog-category",
    component: _0b8942b2,
    name: "admin-blog-category"
  }, {
    path: "/admin/blogs",
    component: _860d4222,
    name: "admin-blogs"
  }, {
    path: "/admin/brand",
    component: _52c7ba65,
    name: "admin-brand"
  }, {
    path: "/admin/category",
    component: _b349911c,
    name: "admin-category"
  }, {
    path: "/admin/contents",
    component: _00bfbb2c,
    name: "admin-contents"
  }, {
    path: "/admin/contents-category",
    component: _39d4432f,
    name: "admin-contents-category"
  }, {
    path: "/admin/customers",
    component: _791d8133,
    name: "admin-customers"
  }, {
    path: "/admin/file-manager",
    component: _535a6324,
    name: "admin-file-manager"
  }, {
    path: "/admin/header-menu",
    component: _dd2c5a36,
    name: "admin-header-menu"
  }, {
    path: "/admin/login",
    component: _1b3a9d47,
    name: "admin-login"
  }, {
    path: "/admin/model",
    component: _09dcc907,
    name: "admin-model"
  }, {
    path: "/admin/order",
    component: _0b398056,
    name: "admin-order"
  }, {
    path: "/admin/product",
    component: _2dffa595,
    name: "admin-product"
  }, {
    path: "/admin/settings",
    component: _240d2096,
    name: "admin-settings"
  }, {
    path: "/admin/sub-product",
    component: _f19d6980,
    name: "admin-sub-product"
  }, {
    path: "/admin/supplier",
    component: _45b9b0de,
    name: "admin-supplier"
  }, {
    path: "/admin/theme",
    component: _fa8418b2,
    name: "admin-theme"
  }, {
    path: "/admin/users",
    component: _d2065734,
    name: "admin-users"
  }, {
    path: "/admin/xml",
    component: _aa8c9f16,
    name: "admin-xml"
  }, {
    path: "/yazar/admin",
    component: _83e30a4e,
    name: "yazar-admin"
  }, {
    path: "/admin/product/add",
    component: _63464f5e,
    name: "admin-product-add"
  }, {
    path: "/admin/product/edit",
    component: _3e82858b,
    name: "admin-product-edit"
  }, {
    path: "/admin/sliders/editorlerimizin-sectikleri",
    component: _8ef535e8,
    name: "admin-sliders-editorlerimizin-sectikleri"
  }, {
    path: "/admin/sliders/herkes-onu-konusuyor",
    component: _29a8ef3f,
    name: "admin-sliders-herkes-onu-konusuyor"
  }, {
    path: "/admin/sliders/slider-page",
    component: _48190b9b,
    name: "admin-sliders-slider-page"
  }, {
    path: "/admin/sliders/surdurulebilir-yasam",
    component: _086b0c4b,
    name: "admin-sliders-surdurulebilir-yasam"
  }, {
    path: "/",
    component: _1bf6ee15,
    name: "index"
  }, {
    path: "/admin/order/detail/:id?",
    component: _a2d0a8e6,
    name: "admin-order-detail-id"
  }, {
    path: "/admin/blog-detail/:id?",
    component: _58dccaf0,
    name: "admin-blog-detail-id"
  }, {
    path: "/admin/contents-detail/:id?",
    component: _3a273968,
    name: "admin-contents-detail-id"
  }, {
    path: "/admin/customer-detail/:id?",
    component: _015f562c,
    name: "admin-customer-detail-id"
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
