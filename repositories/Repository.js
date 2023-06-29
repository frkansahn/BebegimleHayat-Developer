import CartRepository from '~/repositories/CartRepository'
import CargoRepository from '~/repositories/CargoRepository'
import PaymentRepository from '~/repositories/PaymentRepository'
import BankRepository from '~/repositories/BankRepository'
import OrderRepository from '~/repositories/OrderRepository'
import ProductRepository from '~/repositories/ProductRepository'
import SubProductRepository from '~/repositories/SubProductRepository'
import PropertyRepository from '~/repositories/PropertyRepository'
import CategoryRepository from '~/repositories/CategoryRepository'
import HeaderMenuRepository from '~/repositories/HeaderMenuRepository'
import BrandRepository from '~/repositories/BrandRepository'
import ModelRepository from '~/repositories/ModelRepository'
import SupplierRepository from '~/repositories/SupplierRepository'
import ImageRepository from '~/repositories/ImageRepository'
import LanguageRepository from '~/repositories/LanguageRepository'
import BlogRepository from '~/repositories/BlogRepository'
import BlogCategoryRepository from '~/repositories/BlogCategoryRepository'
import ContentRepository from '~/repositories/ContentRepository'
import CustomerRepository from '~/repositories/CustomerRepository'
import SettingRepository from '~/repositories/SettingRepository'
import SearchRepository from '~/repositories/SearchRepository'
import XmlRepository from '~/repositories/XmlRepository'
import CityRepository from '~/repositories/CityRepository'
import PageRepository from '~/repositories/PageRepository'
import ContactRepository from '~/repositories/ContactRepository'

export default ($store, $axios , env) => ({
  cart: CartRepository($store, $axios),
  cargo: CargoRepository($store, $axios),
  payment: PaymentRepository($store, $axios),
  bank: BankRepository($store, $axios),
  order: OrderRepository($store, $axios),
  product: ProductRepository($store, $axios),
  sub_product: SubProductRepository($store, $axios),
  property: PropertyRepository($store, $axios),
  category: CategoryRepository($store, $axios),
  header_menu: HeaderMenuRepository($store, $axios),
  brand: BrandRepository($store, $axios),
  model: ModelRepository($store, $axios),
  supplier: SupplierRepository($store, $axios),
  image: ImageRepository($store, $axios),
  language: LanguageRepository($store, $axios),
  blog: BlogRepository($store, $axios),
  blog_category: BlogCategoryRepository($store, $axios),
  content: ContentRepository($store, $axios),
  customer: CustomerRepository($store, $axios , env),
  setting: SettingRepository($store, $axios),
  search: SearchRepository($store, $axios),
  xml: XmlRepository($store,$axios),
  city: CityRepository($store,$axios),
  page: PageRepository($store,$axios),
  contact: ContactRepository($store,$axios)
})