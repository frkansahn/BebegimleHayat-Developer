import CategoryRepository from '~/repositories/CategoryRepository'
import ImageRepository from '~/repositories/ImageRepository'
import BlogRepository from '~/repositories/BlogRepository'
import BlogCategoryRepository from '~/repositories/BlogCategoryRepository'
import ContentRepository from '~/repositories/ContentRepository'
import SettingRepository from '~/repositories/SettingRepository'
import SearchRepository from '~/repositories/SearchRepository'
import PageRepository from '~/repositories/PageRepository'
import ContactRepository from '~/repositories/ContactRepository'
import CustomerRepository from '~/repositories/CustomerRepository'
import NameRepository from '~/repositories/NameRepository'

export default ($store, $axios , env) => ({
  category: CategoryRepository($store, $axios),
  image: ImageRepository($store, $axios),
  blog: BlogRepository($store, $axios),
  blog_category: BlogCategoryRepository($store, $axios),
  content: ContentRepository($store, $axios),
  setting: SettingRepository($store, $axios),
  search: SearchRepository($store, $axios),
  page: PageRepository($store,$axios),
  contact: ContactRepository($store,$axios),
  customer: CustomerRepository($store,$axios),
  name: NameRepository($store,$axios)
})