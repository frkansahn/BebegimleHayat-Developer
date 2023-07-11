export const CookiePolitical = () => import('../..\\components\\CookiePolitical.vue' /* webpackChunkName: "components/cookie-political" */).then(c => wrapFunctional(c.default || c))
export const Footer = () => import('../..\\components\\footer.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c))
export const Header = () => import('../..\\components\\header.vue' /* webpackChunkName: "components/header" */).then(c => wrapFunctional(c.default || c))
export const Navigation = () => import('../..\\components\\navigation.vue' /* webpackChunkName: "components/navigation" */).then(c => wrapFunctional(c.default || c))
export const OtherContents = () => import('../..\\components\\otherContents.vue' /* webpackChunkName: "components/other-contents" */).then(c => wrapFunctional(c.default || c))
export const TableList = () => import('../..\\components\\tableList.vue' /* webpackChunkName: "components/table-list" */).then(c => wrapFunctional(c.default || c))
export const TreeBlogCategory = () => import('../..\\components\\treeBlogCategory.vue' /* webpackChunkName: "components/tree-blog-category" */).then(c => wrapFunctional(c.default || c))
export const TreeCategory = () => import('../..\\components\\treeCategory.vue' /* webpackChunkName: "components/tree-category" */).then(c => wrapFunctional(c.default || c))
export const ElementImage = () => import('../..\\components\\element\\image.vue' /* webpackChunkName: "components/element-image" */).then(c => wrapFunctional(c.default || c))
export const ContentDetail = () => import('../..\\components\\content\\detail.vue' /* webpackChunkName: "components/content-detail" */).then(c => wrapFunctional(c.default || c))
export const BlogBabyDictionary = () => import('../..\\components\\blog\\babyDictionary.vue' /* webpackChunkName: "components/blog-baby-dictionary" */).then(c => wrapFunctional(c.default || c))
export const BlogBabyDictionaryParentCategory = () => import('../..\\components\\blog\\babyDictionaryParentCategory.vue' /* webpackChunkName: "components/blog-baby-dictionary-parent-category" */).then(c => wrapFunctional(c.default || c))
export const BlogCart = () => import('../..\\components\\blog\\cart.vue' /* webpackChunkName: "components/blog-cart" */).then(c => wrapFunctional(c.default || c))
export const BlogCartBottom = () => import('../..\\components\\blog\\cartBottom.vue' /* webpackChunkName: "components/blog-cart-bottom" */).then(c => wrapFunctional(c.default || c))
export const BlogCartCategory = () => import('../..\\components\\blog\\cartCategory.vue' /* webpackChunkName: "components/blog-cart-category" */).then(c => wrapFunctional(c.default || c))
export const BlogCategory = () => import('../..\\components\\blog\\category.vue' /* webpackChunkName: "components/blog-category" */).then(c => wrapFunctional(c.default || c))
export const BlogDetail = () => import('../..\\components\\blog\\detail.vue' /* webpackChunkName: "components/blog-detail" */).then(c => wrapFunctional(c.default || c))
export const BlogDetailContent = () => import('../..\\components\\blog\\detailContent.vue' /* webpackChunkName: "components/blog-detail-content" */).then(c => wrapFunctional(c.default || c))
export const BlogListPagination = () => import('../..\\components\\blog\\listPagination.vue' /* webpackChunkName: "components/blog-list-pagination" */).then(c => wrapFunctional(c.default || c))
export const BlogNewBlogs = () => import('../..\\components\\blog\\newBlogs.vue' /* webpackChunkName: "components/blog-new-blogs" */).then(c => wrapFunctional(c.default || c))
export const BlogReadMoreBlogs = () => import('../..\\components\\blog\\readMoreBlogs.vue' /* webpackChunkName: "components/blog-read-more-blogs" */).then(c => wrapFunctional(c.default || c))
export const BlogShowcase = () => import('../..\\components\\blog\\showcase.vue' /* webpackChunkName: "components/blog-showcase" */).then(c => wrapFunctional(c.default || c))
export const BlogToolNewBlogs = () => import('../..\\components\\blog\\toolNewBlogs.vue' /* webpackChunkName: "components/blog-tool-new-blogs" */).then(c => wrapFunctional(c.default || c))
export const HomepageBabyNames = () => import('../..\\components\\homepage\\BabyNames.vue' /* webpackChunkName: "components/homepage-baby-names" */).then(c => wrapFunctional(c.default || c))
export const HomepageOneBlog = () => import('../..\\components\\homepage\\oneBlog.vue' /* webpackChunkName: "components/homepage-one-blog" */).then(c => wrapFunctional(c.default || c))
export const HomepagePopularTools = () => import('../..\\components\\homepage\\PopularTools.vue' /* webpackChunkName: "components/homepage-popular-tools" */).then(c => wrapFunctional(c.default || c))
export const HomepagePregnancyWeekByWeek = () => import('../..\\components\\homepage\\PregnancyWeekByWeek.vue' /* webpackChunkName: "components/homepage-pregnancy-week-by-week" */).then(c => wrapFunctional(c.default || c))
export const SliderFooterLinks = () => import('../..\\components\\slider\\footerLinks.vue' /* webpackChunkName: "components/slider-footer-links" */).then(c => wrapFunctional(c.default || c))
export const SliderHome = () => import('../..\\components\\slider\\home.vue' /* webpackChunkName: "components/slider-home" */).then(c => wrapFunctional(c.default || c))
export const Slider = () => import('../..\\components\\slider\\index.vue' /* webpackChunkName: "components/slider" */).then(c => wrapFunctional(c.default || c))
export const SliderOtherCategories = () => import('../..\\components\\slider\\otherCategories.vue' /* webpackChunkName: "components/slider-other-categories" */).then(c => wrapFunctional(c.default || c))
export const SliderPregnancyWeekByWeek = () => import('../..\\components\\slider\\PregnancyWeekByWeek.vue' /* webpackChunkName: "components/slider-pregnancy-week-by-week" */).then(c => wrapFunctional(c.default || c))
export const SliderType1 = () => import('../..\\components\\slider\\type1.vue' /* webpackChunkName: "components/slider-type1" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
