export { default as CookiePolitical } from '../..\\components\\CookiePolitical.vue'
export { default as Footer } from '../..\\components\\footer.vue'
export { default as Header } from '../..\\components\\header.vue'
export { default as Navigation } from '../..\\components\\navigation.vue'
export { default as OtherContents } from '../..\\components\\otherContents.vue'
export { default as TableList } from '../..\\components\\tableList.vue'
export { default as TreeBlogCategory } from '../..\\components\\treeBlogCategory.vue'
export { default as TreeCategory } from '../..\\components\\treeCategory.vue'
export { default as BlogBabyDictionary } from '../..\\components\\blog\\babyDictionary.vue'
export { default as BlogBabyDictionaryParentCategory } from '../..\\components\\blog\\babyDictionaryParentCategory.vue'
export { default as BlogCart } from '../..\\components\\blog\\cart.vue'
export { default as BlogCartBottom } from '../..\\components\\blog\\cartBottom.vue'
export { default as BlogCartCategory } from '../..\\components\\blog\\cartCategory.vue'
export { default as BlogCategory } from '../..\\components\\blog\\category.vue'
export { default as BlogDetail } from '../..\\components\\blog\\detail.vue'
export { default as BlogDetailBabyNames } from '../..\\components\\blog\\detailBabyNames.vue'
export { default as BlogDetailContent } from '../..\\components\\blog\\detailContent.vue'
export { default as BlogListPagination } from '../..\\components\\blog\\listPagination.vue'
export { default as BlogNewBlogs } from '../..\\components\\blog\\newBlogs.vue'
export { default as BlogReadMoreBlogs } from '../..\\components\\blog\\readMoreBlogs.vue'
export { default as BlogShowcase } from '../..\\components\\blog\\showcase.vue'
export { default as BlogToolNewBlogs } from '../..\\components\\blog\\toolNewBlogs.vue'
export { default as ContentDetail } from '../..\\components\\content\\detail.vue'
export { default as HomepageBabyNames } from '../..\\components\\homepage\\BabyNames.vue'
export { default as HomepageOneBlog } from '../..\\components\\homepage\\oneBlog.vue'
export { default as HomepagePopularTools } from '../..\\components\\homepage\\PopularTools.vue'
export { default as HomepagePregnancyWeekByWeek } from '../..\\components\\homepage\\PregnancyWeekByWeek.vue'
export { default as ElementImage } from '../..\\components\\element\\image.vue'
export { default as NameDetail } from '../..\\components\\name\\detail.vue'
export { default as SliderFooterLinks } from '../..\\components\\slider\\footerLinks.vue'
export { default as SliderHome } from '../..\\components\\slider\\home.vue'
export { default as Slider } from '../..\\components\\slider\\index.vue'
export { default as SliderOtherCategories } from '../..\\components\\slider\\otherCategories.vue'
export { default as SliderPregnancyWeekByWeek } from '../..\\components\\slider\\PregnancyWeekByWeek.vue'
export { default as SliderType1 } from '../..\\components\\slider\\type1.vue'

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
