import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2770e210 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _24f79753 = () => interopDefault(import('..\\pages\\bebek-asi-takvimi-hesaplama.vue' /* webpackChunkName: "pages/bebek-asi-takvimi-hesaplama" */))
const _192ce730 = () => interopDefault(import('..\\pages\\bebek-isim-bulucu.vue' /* webpackChunkName: "pages/bebek-isim-bulucu" */))
const _cc85be24 = () => interopDefault(import('..\\pages\\bebek-masraf-hesaplama.vue' /* webpackChunkName: "pages/bebek-masraf-hesaplama" */))
const _862ffdde = () => interopDefault(import('..\\pages\\cin-takvimiyle-cinsiyet-hesaplama.vue' /* webpackChunkName: "pages/cin-takvimiyle-cinsiyet-hesaplama" */))
const _11817257 = () => interopDefault(import('..\\pages\\cocuk-boyu-hesaplama.vue' /* webpackChunkName: "pages/cocuk-boyu-hesaplama" */))
const _017efee7 = () => interopDefault(import('..\\pages\\cocuk-gelisimi-tablosu.vue' /* webpackChunkName: "pages/cocuk-gelisimi-tablosu" */))
const _d709664c = () => interopDefault(import('..\\pages\\dogum-planlayici.vue' /* webpackChunkName: "pages/dogum-planlayici" */))
const _56f1192c = () => interopDefault(import('..\\pages\\dogum-tarihi-hesaplama.vue' /* webpackChunkName: "pages/dogum-tarihi-hesaplama" */))
const _20ad67ca = () => interopDefault(import('..\\pages\\goz-rengi-tahmini.vue' /* webpackChunkName: "pages/goz-rengi-tahmini" */))
const _6cec653c = () => interopDefault(import('..\\pages\\hamilelik-kilo-hesaplama.vue' /* webpackChunkName: "pages/hamilelik-kilo-hesaplama" */))
const _e40eb266 = () => interopDefault(import('..\\pages\\iletisim.vue' /* webpackChunkName: "pages/iletisim" */))
const _da9f2f66 = () => interopDefault(import('..\\pages\\sac-rengi-tahmini.vue' /* webpackChunkName: "pages/sac-rengi-tahmini" */))
const _b6f9875e = () => interopDefault(import('..\\pages\\uye-giris.vue' /* webpackChunkName: "pages/uye-giris" */))
const _28e547a5 = () => interopDefault(import('..\\pages\\uye-kayit.vue' /* webpackChunkName: "pages/uye-kayit" */))
const _3947ba86 = () => interopDefault(import('..\\pages\\uye-sifremi-unuttum.vue' /* webpackChunkName: "pages/uye-sifremi-unuttum" */))
const _63dc9d17 = () => interopDefault(import('..\\pages\\yumurtlama-gunu-hesaplama.vue' /* webpackChunkName: "pages/yumurtlama-gunu-hesaplama" */))
const _2178c780 = () => interopDefault(import('..\\pages\\admin\\add-blog.vue' /* webpackChunkName: "pages/admin/add-blog" */))
const _b8a23810 = () => interopDefault(import('..\\pages\\admin\\add-contents.vue' /* webpackChunkName: "pages/admin/add-contents" */))
const _bca10e26 = () => interopDefault(import('..\\pages\\admin\\add-image.vue' /* webpackChunkName: "pages/admin/add-image" */))
const _1f236687 = () => interopDefault(import('..\\pages\\admin\\blog-category.vue' /* webpackChunkName: "pages/admin/blog-category" */))
const _da517262 = () => interopDefault(import('..\\pages\\admin\\blogs.vue' /* webpackChunkName: "pages/admin/blogs" */))
const _28a5a245 = () => interopDefault(import('..\\pages\\admin\\brand.vue' /* webpackChunkName: "pages/admin/brand" */))
const _3160c752 = () => interopDefault(import('..\\pages\\admin\\category\\index.vue' /* webpackChunkName: "pages/admin/category/index" */))
const _29ab7168 = () => interopDefault(import('..\\pages\\admin\\contents.vue' /* webpackChunkName: "pages/admin/contents" */))
const _19b55b0f = () => interopDefault(import('..\\pages\\admin\\contents-category.vue' /* webpackChunkName: "pages/admin/contents-category" */))
const _47f70dda = () => interopDefault(import('..\\pages\\admin\\customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _325a4a8e = () => interopDefault(import('..\\pages\\admin\\file-manager.vue' /* webpackChunkName: "pages/admin/file-manager" */))
const _a4a891f6 = () => interopDefault(import('..\\pages\\admin\\header-menu\\index.vue' /* webpackChunkName: "pages/admin/header-menu/index" */))
const _1dcef5b2 = () => interopDefault(import('..\\pages\\admin\\login.vue' /* webpackChunkName: "pages/admin/login" */))
const _408a9e32 = () => interopDefault(import('..\\pages\\admin\\model.vue' /* webpackChunkName: "pages/admin/model" */))
const _6740fc76 = () => interopDefault(import('..\\pages\\admin\\order\\index.vue' /* webpackChunkName: "pages/admin/order/index" */))
const _b3cecc96 = () => interopDefault(import('..\\pages\\admin\\product\\index.vue' /* webpackChunkName: "pages/admin/product/index" */))
const _4f380856 = () => interopDefault(import('..\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _678c69c0 = () => interopDefault(import('..\\pages\\admin\\sub-product.vue' /* webpackChunkName: "pages/admin/sub-product" */))
const _30243cfe = () => interopDefault(import('..\\pages\\admin\\supplier.vue' /* webpackChunkName: "pages/admin/supplier" */))
const _589bdb87 = () => interopDefault(import('..\\pages\\admin\\theme.vue' /* webpackChunkName: "pages/admin/theme" */))
const _6cdabc46 = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _24b01055 = () => interopDefault(import('..\\pages\\admin\\xml.vue' /* webpackChunkName: "pages/admin/xml" */))
const _d8273a8e = () => interopDefault(import('..\\pages\\yazar\\admin.vue' /* webpackChunkName: "pages/yazar/admin" */))
const _617e2184 = () => interopDefault(import('..\\pages\\admin\\product\\add\\index.vue' /* webpackChunkName: "pages/admin/product/add/index" */))
const _51dbe1ab = () => interopDefault(import('..\\pages\\admin\\product\\edit\\index.vue' /* webpackChunkName: "pages/admin/product/edit/index" */))
const _060444ec = () => interopDefault(import('..\\pages\\admin\\sliders\\editorlerimizin-sectikleri.vue' /* webpackChunkName: "pages/admin/sliders/editorlerimizin-sectikleri" */))
const _8f7591c2 = () => interopDefault(import('..\\pages\\admin\\sliders\\herkes-onu-konusuyor.vue' /* webpackChunkName: "pages/admin/sliders/herkes-onu-konusuyor" */))
const _5b7267bb = () => interopDefault(import('..\\pages\\admin\\sliders\\slider-page.vue' /* webpackChunkName: "pages/admin/sliders/slider-page" */))
const _d1f157aa = () => interopDefault(import('..\\pages\\admin\\sliders\\surdurulebilir-yasam.vue' /* webpackChunkName: "pages/admin/sliders/surdurulebilir-yasam" */))
const _27bc2235 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _6a4ce0a6 = () => interopDefault(import('..\\pages\\admin\\order\\detail\\_id.vue' /* webpackChunkName: "pages/admin/order/detail/_id" */))
const _2e893710 = () => interopDefault(import('..\\pages\\admin\\blog-detail\\_id.vue' /* webpackChunkName: "pages/admin/blog-detail/_id" */))
const _4d809588 = () => interopDefault(import('..\\pages\\admin\\contents-detail\\_id.vue' /* webpackChunkName: "pages/admin/contents-detail/_id" */))
const _14b8b24c = () => interopDefault(import('..\\pages\\admin\\customer-detail\\_id.vue' /* webpackChunkName: "pages/admin/customer-detail/_id" */))
const _be42e0b6 = () => interopDefault(import('..\\pages\\_seoLink.vue' /* webpackChunkName: "pages/_seoLink" */))

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
    component: _2770e210,
    name: "admin"
  }, {
    path: "/bebek-asi-takvimi-hesaplama",
    component: _24f79753,
    name: "bebek-asi-takvimi-hesaplama"
  }, {
    path: "/bebek-isim-bulucu",
    component: _192ce730,
    name: "bebek-isim-bulucu"
  }, {
    path: "/bebek-masraf-hesaplama",
    component: _cc85be24,
    name: "bebek-masraf-hesaplama"
  }, {
    path: "/cin-takvimiyle-cinsiyet-hesaplama",
    component: _862ffdde,
    name: "cin-takvimiyle-cinsiyet-hesaplama"
  }, {
    path: "/cocuk-boyu-hesaplama",
    component: _11817257,
    name: "cocuk-boyu-hesaplama"
  }, {
    path: "/cocuk-gelisimi-tablosu",
    component: _017efee7,
    name: "cocuk-gelisimi-tablosu"
  }, {
    path: "/dogum-planlayici",
    component: _d709664c,
    name: "dogum-planlayici"
  }, {
    path: "/dogum-tarihi-hesaplama",
    component: _56f1192c,
    name: "dogum-tarihi-hesaplama"
  }, {
    path: "/goz-rengi-tahmini",
    component: _20ad67ca,
    name: "goz-rengi-tahmini"
  }, {
    path: "/hamilelik-kilo-hesaplama",
    component: _6cec653c,
    name: "hamilelik-kilo-hesaplama"
  }, {
    path: "/iletisim",
    component: _e40eb266,
    name: "iletisim"
  }, {
    path: "/sac-rengi-tahmini",
    component: _da9f2f66,
    name: "sac-rengi-tahmini"
  }, {
    path: "/uye-giris",
    component: _b6f9875e,
    name: "uye-giris"
  }, {
    path: "/uye-kayit",
    component: _28e547a5,
    name: "uye-kayit"
  }, {
    path: "/uye-sifremi-unuttum",
    component: _3947ba86,
    name: "uye-sifremi-unuttum"
  }, {
    path: "/yumurtlama-gunu-hesaplama",
    component: _63dc9d17,
    name: "yumurtlama-gunu-hesaplama"
  }, {
    path: "/admin/add-blog",
    component: _2178c780,
    name: "admin-add-blog"
  }, {
    path: "/admin/add-contents",
    component: _b8a23810,
    name: "admin-add-contents"
  }, {
    path: "/admin/add-image",
    component: _bca10e26,
    name: "admin-add-image"
  }, {
    path: "/admin/blog-category",
    component: _1f236687,
    name: "admin-blog-category"
  }, {
    path: "/admin/blogs",
    component: _da517262,
    name: "admin-blogs"
  }, {
    path: "/admin/brand",
    component: _28a5a245,
    name: "admin-brand"
  }, {
    path: "/admin/category",
    component: _3160c752,
    name: "admin-category"
  }, {
    path: "/admin/contents",
    component: _29ab7168,
    name: "admin-contents"
  }, {
    path: "/admin/contents-category",
    component: _19b55b0f,
    name: "admin-contents-category"
  }, {
    path: "/admin/customers",
    component: _47f70dda,
    name: "admin-customers"
  }, {
    path: "/admin/file-manager",
    component: _325a4a8e,
    name: "admin-file-manager"
  }, {
    path: "/admin/header-menu",
    component: _a4a891f6,
    name: "admin-header-menu"
  }, {
    path: "/admin/login",
    component: _1dcef5b2,
    name: "admin-login"
  }, {
    path: "/admin/model",
    component: _408a9e32,
    name: "admin-model"
  }, {
    path: "/admin/order",
    component: _6740fc76,
    name: "admin-order"
  }, {
    path: "/admin/product",
    component: _b3cecc96,
    name: "admin-product"
  }, {
    path: "/admin/settings",
    component: _4f380856,
    name: "admin-settings"
  }, {
    path: "/admin/sub-product",
    component: _678c69c0,
    name: "admin-sub-product"
  }, {
    path: "/admin/supplier",
    component: _30243cfe,
    name: "admin-supplier"
  }, {
    path: "/admin/theme",
    component: _589bdb87,
    name: "admin-theme"
  }, {
    path: "/admin/users",
    component: _6cdabc46,
    name: "admin-users"
  }, {
    path: "/admin/xml",
    component: _24b01055,
    name: "admin-xml"
  }, {
    path: "/yazar/admin",
    component: _d8273a8e,
    name: "yazar-admin"
  }, {
    path: "/admin/product/add",
    component: _617e2184,
    name: "admin-product-add"
  }, {
    path: "/admin/product/edit",
    component: _51dbe1ab,
    name: "admin-product-edit"
  }, {
    path: "/admin/sliders/editorlerimizin-sectikleri",
    component: _060444ec,
    name: "admin-sliders-editorlerimizin-sectikleri"
  }, {
    path: "/admin/sliders/herkes-onu-konusuyor",
    component: _8f7591c2,
    name: "admin-sliders-herkes-onu-konusuyor"
  }, {
    path: "/admin/sliders/slider-page",
    component: _5b7267bb,
    name: "admin-sliders-slider-page"
  }, {
    path: "/admin/sliders/surdurulebilir-yasam",
    component: _d1f157aa,
    name: "admin-sliders-surdurulebilir-yasam"
  }, {
    path: "/",
    component: _27bc2235,
    name: "index"
  }, {
    path: "/admin/order/detail/:id?",
    component: _6a4ce0a6,
    name: "admin-order-detail-id"
  }, {
    path: "/admin/blog-detail/:id?",
    component: _2e893710,
    name: "admin-blog-detail-id"
  }, {
    path: "/admin/contents-detail/:id?",
    component: _4d809588,
    name: "admin-contents-detail-id"
  }, {
    path: "/admin/customer-detail/:id?",
    component: _14b8b24c,
    name: "admin-customer-detail-id"
  }, {
    path: "/:seoLink",
    component: _be42e0b6,
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
