import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ffc36c40 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _9918d4fa = () => interopDefault(import('..\\pages\\bebek-asi-takvimi-hesaplama.vue' /* webpackChunkName: "pages/bebek-asi-takvimi-hesaplama" */))
const _24f48698 = () => interopDefault(import('..\\pages\\bebek-isim-bulucu.vue' /* webpackChunkName: "pages/bebek-isim-bulucu" */))
const _c5cec97e = () => interopDefault(import('..\\pages\\cin-takvimiyle-cinsiyet-hesaplama.vue' /* webpackChunkName: "pages/cin-takvimiyle-cinsiyet-hesaplama" */))
const _6d720a27 = () => interopDefault(import('..\\pages\\cocuk-boyu-hesaplama.vue' /* webpackChunkName: "pages/cocuk-boyu-hesaplama" */))
const _23a8e2b7 = () => interopDefault(import('..\\pages\\cocuk-gelisimi-tablosu.vue' /* webpackChunkName: "pages/cocuk-gelisimi-tablosu" */))
const _f4df66ac = () => interopDefault(import('..\\pages\\dogum-planlayici.vue' /* webpackChunkName: "pages/dogum-planlayici" */))
const _791afcfc = () => interopDefault(import('..\\pages\\dogum-tarihi-hesaplama.vue' /* webpackChunkName: "pages/dogum-tarihi-hesaplama" */))
const _523861fa = () => interopDefault(import('..\\pages\\goz-rengi-tahmini.vue' /* webpackChunkName: "pages/goz-rengi-tahmini" */))
const _a7a6d5e8 = () => interopDefault(import('..\\pages\\hamilelik-kilo-hesaplama.vue' /* webpackChunkName: "pages/hamilelik-kilo-hesaplama" */))
const _7ab2769d = () => interopDefault(import('..\\pages\\iletisim.vue' /* webpackChunkName: "pages/iletisim" */))
const _77893b06 = () => interopDefault(import('..\\pages\\sac-rengi-tahmini.vue' /* webpackChunkName: "pages/sac-rengi-tahmini" */))
const _4f036681 = () => interopDefault(import('..\\pages\\uye-giris.vue' /* webpackChunkName: "pages/uye-giris" */))
const _59351c56 = () => interopDefault(import('..\\pages\\uye-kayit.vue' /* webpackChunkName: "pages/uye-kayit" */))
const _43dd5e26 = () => interopDefault(import('..\\pages\\uye-sifremi-unuttum.vue' /* webpackChunkName: "pages/uye-sifremi-unuttum" */))
const _0ca26747 = () => interopDefault(import('..\\pages\\yumurtlama-gunu-hesaplama.vue' /* webpackChunkName: "pages/yumurtlama-gunu-hesaplama" */))
const _c646e4a0 = () => interopDefault(import('..\\pages\\admin\\add-blog.vue' /* webpackChunkName: "pages/admin/add-blog" */))
const _c337dbb0 = () => interopDefault(import('..\\pages\\admin\\add-contents.vue' /* webpackChunkName: "pages/admin/add-contents" */))
const _da770e86 = () => interopDefault(import('..\\pages\\admin\\add-image.vue' /* webpackChunkName: "pages/admin/add-image" */))
const _7b13fe57 = () => interopDefault(import('..\\pages\\admin\\blog-category.vue' /* webpackChunkName: "pages/admin/blog-category" */))
const _28f6a2c2 = () => interopDefault(import('..\\pages\\admin\\blogs.vue' /* webpackChunkName: "pages/admin/blogs" */))
const _fd59ebd6 = () => interopDefault(import('..\\pages\\admin\\brand.vue' /* webpackChunkName: "pages/admin/brand" */))
const _538aab22 = () => interopDefault(import('..\\pages\\admin\\category\\index.vue' /* webpackChunkName: "pages/admin/category/index" */))
const _668e0d7c = () => interopDefault(import('..\\pages\\admin\\contents.vue' /* webpackChunkName: "pages/admin/contents" */))
const _58f58adf = () => interopDefault(import('..\\pages\\admin\\contents-category.vue' /* webpackChunkName: "pages/admin/contents-category" */))
const _65cd0e3a = () => interopDefault(import('..\\pages\\admin\\customers.vue' /* webpackChunkName: "pages/admin/customers" */))
const _2d0f78be = () => interopDefault(import('..\\pages\\admin\\file-manager.vue' /* webpackChunkName: "pages/admin/file-manager" */))
const _56718135 = () => interopDefault(import('..\\pages\\admin\\header-menu\\index.vue' /* webpackChunkName: "pages/admin/header-menu/index" */))
const _49c5ecf7 = () => interopDefault(import('..\\pages\\admin\\login.vue' /* webpackChunkName: "pages/admin/login" */))
const _386818b7 = () => interopDefault(import('..\\pages\\admin\\model.vue' /* webpackChunkName: "pages/admin/model" */))
const _61f62aa6 = () => interopDefault(import('..\\pages\\admin\\order\\index.vue' /* webpackChunkName: "pages/admin/order/index" */))
const _6f8a0836 = () => interopDefault(import('..\\pages\\admin\\product\\index.vue' /* webpackChunkName: "pages/admin/product/index" */))
const _53c7c205 = () => interopDefault(import('..\\pages\\admin\\settings.vue' /* webpackChunkName: "pages/admin/settings" */))
const _67e3d220 = () => interopDefault(import('..\\pages\\admin\\sub-product.vue' /* webpackChunkName: "pages/admin/sub-product" */))
const _a8eff9a4 = () => interopDefault(import('..\\pages\\admin\\supplier.vue' /* webpackChunkName: "pages/admin/supplier" */))
const _9d6d7952 = () => interopDefault(import('..\\pages\\admin\\theme.vue' /* webpackChunkName: "pages/admin/theme" */))
const _74efb7d4 = () => interopDefault(import('..\\pages\\admin\\users.vue' /* webpackChunkName: "pages/admin/users" */))
const _6b95a7b6 = () => interopDefault(import('..\\pages\\admin\\xml.vue' /* webpackChunkName: "pages/admin/xml" */))
const _3f346b0e = () => interopDefault(import('..\\pages\\admin\\product\\add\\index.vue' /* webpackChunkName: "pages/admin/product/add/index" */))
const _3f50404a = () => interopDefault(import('..\\pages\\admin\\product\\edit\\index.vue' /* webpackChunkName: "pages/admin/product/edit/index" */))
const _57a620bc = () => interopDefault(import('..\\pages\\admin\\sliders\\editorlerimizin-sectikleri.vue' /* webpackChunkName: "pages/admin/sliders/editorlerimizin-sectikleri" */))
const _1fa7a222 = () => interopDefault(import('..\\pages\\admin\\sliders\\herkes-onu-konusuyor.vue' /* webpackChunkName: "pages/admin/sliders/herkes-onu-konusuyor" */))
const _2c23342a = () => interopDefault(import('..\\pages\\admin\\sliders\\slider-page.vue' /* webpackChunkName: "pages/admin/sliders/slider-page" */))
const _6223680a = () => interopDefault(import('..\\pages\\admin\\sliders\\surdurulebilir-yasam.vue' /* webpackChunkName: "pages/admin/sliders/surdurulebilir-yasam" */))
const _07c8e465 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _739f59dd = () => interopDefault(import('..\\pages\\admin\\order\\detail\\_id.vue' /* webpackChunkName: "pages/admin/order/detail/_id" */))
const _519bcd40 = () => interopDefault(import('..\\pages\\admin\\blog-detail\\_id.vue' /* webpackChunkName: "pages/admin/blog-detail/_id" */))
const _4806d890 = () => interopDefault(import('..\\pages\\admin\\contents-detail\\_id.vue' /* webpackChunkName: "pages/admin/contents-detail/_id" */))
const _b9969f08 = () => interopDefault(import('..\\pages\\admin\\customer-detail\\_id.vue' /* webpackChunkName: "pages/admin/customer-detail/_id" */))
const _e4cf4116 = () => interopDefault(import('..\\pages\\_seoLink.vue' /* webpackChunkName: "pages/_seoLink" */))

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
    component: _ffc36c40,
    name: "admin"
  }, {
    path: "/bebek-asi-takvimi-hesaplama",
    component: _9918d4fa,
    name: "bebek-asi-takvimi-hesaplama"
  }, {
    path: "/bebek-isim-bulucu",
    component: _24f48698,
    name: "bebek-isim-bulucu"
  }, {
    path: "/cin-takvimiyle-cinsiyet-hesaplama",
    component: _c5cec97e,
    name: "cin-takvimiyle-cinsiyet-hesaplama"
  }, {
    path: "/cocuk-boyu-hesaplama",
    component: _6d720a27,
    name: "cocuk-boyu-hesaplama"
  }, {
    path: "/cocuk-gelisimi-tablosu",
    component: _23a8e2b7,
    name: "cocuk-gelisimi-tablosu"
  }, {
    path: "/dogum-planlayici",
    component: _f4df66ac,
    name: "dogum-planlayici"
  }, {
    path: "/dogum-tarihi-hesaplama",
    component: _791afcfc,
    name: "dogum-tarihi-hesaplama"
  }, {
    path: "/goz-rengi-tahmini",
    component: _523861fa,
    name: "goz-rengi-tahmini"
  }, {
    path: "/hamilelik-kilo-hesaplama",
    component: _a7a6d5e8,
    name: "hamilelik-kilo-hesaplama"
  }, {
    path: "/iletisim",
    component: _7ab2769d,
    name: "iletisim"
  }, {
    path: "/sac-rengi-tahmini",
    component: _77893b06,
    name: "sac-rengi-tahmini"
  }, {
    path: "/uye-giris",
    component: _4f036681,
    name: "uye-giris"
  }, {
    path: "/uye-kayit",
    component: _59351c56,
    name: "uye-kayit"
  }, {
    path: "/uye-sifremi-unuttum",
    component: _43dd5e26,
    name: "uye-sifremi-unuttum"
  }, {
    path: "/yumurtlama-gunu-hesaplama",
    component: _0ca26747,
    name: "yumurtlama-gunu-hesaplama"
  }, {
    path: "/admin/add-blog",
    component: _c646e4a0,
    name: "admin-add-blog"
  }, {
    path: "/admin/add-contents",
    component: _c337dbb0,
    name: "admin-add-contents"
  }, {
    path: "/admin/add-image",
    component: _da770e86,
    name: "admin-add-image"
  }, {
    path: "/admin/blog-category",
    component: _7b13fe57,
    name: "admin-blog-category"
  }, {
    path: "/admin/blogs",
    component: _28f6a2c2,
    name: "admin-blogs"
  }, {
    path: "/admin/brand",
    component: _fd59ebd6,
    name: "admin-brand"
  }, {
    path: "/admin/category",
    component: _538aab22,
    name: "admin-category"
  }, {
    path: "/admin/contents",
    component: _668e0d7c,
    name: "admin-contents"
  }, {
    path: "/admin/contents-category",
    component: _58f58adf,
    name: "admin-contents-category"
  }, {
    path: "/admin/customers",
    component: _65cd0e3a,
    name: "admin-customers"
  }, {
    path: "/admin/file-manager",
    component: _2d0f78be,
    name: "admin-file-manager"
  }, {
    path: "/admin/header-menu",
    component: _56718135,
    name: "admin-header-menu"
  }, {
    path: "/admin/login",
    component: _49c5ecf7,
    name: "admin-login"
  }, {
    path: "/admin/model",
    component: _386818b7,
    name: "admin-model"
  }, {
    path: "/admin/order",
    component: _61f62aa6,
    name: "admin-order"
  }, {
    path: "/admin/product",
    component: _6f8a0836,
    name: "admin-product"
  }, {
    path: "/admin/settings",
    component: _53c7c205,
    name: "admin-settings"
  }, {
    path: "/admin/sub-product",
    component: _67e3d220,
    name: "admin-sub-product"
  }, {
    path: "/admin/supplier",
    component: _a8eff9a4,
    name: "admin-supplier"
  }, {
    path: "/admin/theme",
    component: _9d6d7952,
    name: "admin-theme"
  }, {
    path: "/admin/users",
    component: _74efb7d4,
    name: "admin-users"
  }, {
    path: "/admin/xml",
    component: _6b95a7b6,
    name: "admin-xml"
  }, {
    path: "/admin/product/add",
    component: _3f346b0e,
    name: "admin-product-add"
  }, {
    path: "/admin/product/edit",
    component: _3f50404a,
    name: "admin-product-edit"
  }, {
    path: "/admin/sliders/editorlerimizin-sectikleri",
    component: _57a620bc,
    name: "admin-sliders-editorlerimizin-sectikleri"
  }, {
    path: "/admin/sliders/herkes-onu-konusuyor",
    component: _1fa7a222,
    name: "admin-sliders-herkes-onu-konusuyor"
  }, {
    path: "/admin/sliders/slider-page",
    component: _2c23342a,
    name: "admin-sliders-slider-page"
  }, {
    path: "/admin/sliders/surdurulebilir-yasam",
    component: _6223680a,
    name: "admin-sliders-surdurulebilir-yasam"
  }, {
    path: "/",
    component: _07c8e465,
    name: "index"
  }, {
    path: "/admin/order/detail/:id?",
    component: _739f59dd,
    name: "admin-order-detail-id"
  }, {
    path: "/admin/blog-detail/:id?",
    component: _519bcd40,
    name: "admin-blog-detail-id"
  }, {
    path: "/admin/contents-detail/:id?",
    component: _4806d890,
    name: "admin-contents-detail-id"
  }, {
    path: "/admin/customer-detail/:id?",
    component: _b9969f08,
    name: "admin-customer-detail-id"
  }, {
    path: "/:seoLink",
    component: _e4cf4116,
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
