<template>
    <div class="add-product" id="addProduct">
        <AdminHeader />
        <b-overlay :show="productsOverlay" no-wrap></b-overlay>
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 col-sm-8 col-lg-7 col-xl-5 mx-auto">
                    <div class="row">
                        <h5 class="col-12 text-left mb-4">
                            <NuxtLink to="/admin/product" id="goProductList"
                                class="float-left text-secondary text-decoration-none h4">
                                <small>
                                    <b-icon-arrow-left variant="dark" font-scale="0.9" class="mr-2"></b-icon-arrow-left>
                                    {{ $t('productList') }}
                                </small>
                            </NuxtLink>
                        </h5>
                    </div>
                    <div class="row">
                        <h5 class="col-12 text-center mb-4">
                            <span>
                                {{ $t('newProduct') }}
                            </span>
                        </h5>
                    </div>
                    <div class="row">
                        <div class="col-12 px-0">
                            <b-button class="mb-2 float-right d-flex align-items-center justify-content-center" size="sm" v-b-toggle.seo-setting>
                                <b-icon-eye-fill variant="white" font-scale=".8" class="mr-2"></b-icon-eye-fill>
                                {{ $t('settingsSeo') }}
                            </b-button>
                        </div>
                    </div>
                    <b-form class="row">
                        <b-card class="col-12 px-0" no-body>
                            <b-tabs v-model="tabIndex" pills card>
                                <b-tab title="Kategori">
                                    <b-form class="row">
                                        <div class="col-12">
                                            <div class="row">
                                                <div class="col-12" v-if="categories && categories.length > 0" id="categoryList">
                                                    <ul class="float-left w-100 border border-secondary p-2 rounded list-unstyled">
                                                        <li v-for="(category,index) in categories" :key="`category${index}`">
                                                            <ul class="list-unstyled">
                                                                <TreeCategory class="item"
                                                                    :item="category"
                                                                    :isCheckbox="true"
                                                                />
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </b-form>
                                </b-tab>
                                <b-tab title="Ürün Bilgileri">
                                    <b-form class="row">
                                        <b-form-group class="col-12" id="pro_name_group" :label="$t('productTitle')+'*'"
                                            label-for="pro_name_input" description="" required>
                                            <b-form-input :class="[productsError.title ? 'border-danger' : 'border-dark']"
                                                id="pro_name_input" v-model="product.title" type="text" name="pro_name"
                                                :placeholder="$t('productTitle')+'*'" @click="productsError.title = false"
                                                size="sm" required>
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="brand_group" :label="$t('brand')+'*'"
                                            label-for="brand_input" description="">
                                            <b-form-select :class="[productsError.brand ? 'border-danger' : 'border-dark']"
                                                v-model="product.brand_id" size="sm" name="proBrand"
                                                @click="productsError.brand = false" required>
                                                <b-form-select-option value=null disabled selected>{{ $t('selectBrand') }}
                                                </b-form-select-option>
                                                <b-form-select-option v-for="(B, index) in brands" :key="`proBrand${index}`"
                                                    :value="B.id">{{
                                                    B.name }}
                                                </b-form-select-option>
                                            </b-form-select>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="model_group" :label="$t('model')"
                                            label-for="model_input" description="">
                                            <b-form-select class="border-dark" v-model="product.model_id" size="sm"
                                                name="proModel">
                                                <b-form-select-option value=null disabled selected>{{ $t('selectModel') }}
                                                </b-form-select-option>
                                                <b-form-select-option v-for="(M, index) in models" :key="`proModel${index}`"
                                                    :value="M.id">{{ M.name }}</b-form-select-option>
                                            </b-form-select>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="supplier_code_group" :label="$t('supplierProductCode')"
                                            label-for="supplier_code_input" description="" required>
                                            <b-form-input class="border-dark" id="supplier_code_input"
                                                v-model="product.supplier_product_code" type="text" name="supplier_code"
                                                :placeholder="$t('supplierProductCode')" size="sm">
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="barcode_group" :label="$t('barcode')"
                                            label-for="barcode_input" description="" required>
                                            <b-form-input class="border-dark" id="barcode_input" v-model="product.barcode"
                                                type="text" name="barcode" :placeholder="$t('barcode')" size="sm">
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="ws_code_group" :label="$t('wsCode')"
                                            label-for="ws_code_input" description="" required>
                                            <b-form-input class="border-dark" id="ws_code_input" v-model="product.ws_code"
                                                type="text" name="ws_code" :placeholder="$t('wsCode')" size="sm">
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-6" id="cbm_group" :label="$t('cbm')"
                                            label-for="cbm_input" description="" required>
                                            <b-form-input class="border-dark" id="cbm_input" v-model="product.desi"
                                                type="text" name="cbm" :placeholder="$t('cbm')" size="sm">
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="short_description_group" :label="$t('shortDescription')"
                                            label-for="short_description_input" description="" required>
                                            <b-form-textarea class="border-dark" rows="3" max-rows="6" id="short_description_input" v-model="product.short_description" 
                                                name="short_description" :placeholder="$t('shortDescription')">
                                            </b-form-textarea>
                                        </b-form-group>
                                    </b-form>
                                </b-tab>
                                <b-tab title="Seçenekler">
                                    <b-form class="row py-4">
                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_product_active_checkbox" v-model="product.is_active"
                                                name="is-product-active-checkbox" value="1" unchecked-value="0">
                                                {{$t('isActive')}}
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_product_new_checkbox" v-model="product.is_new_product"
                                                name="is-product-new-checkbox" value="1" unchecked-value="0">
                                                {{$t('isNewProduct')}}
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_show_discounted_checkbox" v-model="product.on_Sale"
                                                name="is-show-discounted-checkbox" value="1" unchecked-value="0">
                                                {{$t('showDiscounted')}}
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_display_product_checkbox" v-model="product.is_display_product"
                                                name="is-display-product-checkbox" value="1" unchecked-value="0">
                                                {{$t('isPromotionalProduct')}}
                                            </b-form-checkbox>
                                        </div>
                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_vendor_product_checkbox" v-model="product.is_vendor_product"
                                                name="is-vendor-product-checkbox" value="1" unchecked-value="0">
                                                {{$t('isVendorProduct')}}
                                            </b-form-checkbox>
                                        </div>

                                        <div class="col-12 mb-1">
                                            <b-form-checkbox id="is_free_cargo_in_cart_checkbox" v-model="product.is_free_cargo_in_cart"
                                                name="is-free-cargo-in-cart-checkbox" value="1" unchecked-value="0">
                                                {{$t('isFreeCargoInCart')}}
                                            </b-form-checkbox>
                                        </div>
                                    </b-form>
                                </b-tab>
                                <b-tab title="Fiyat ve Stok">
                                    <b-form class="row py-4">
                                        <b-form-group class="col-12" id="stock_unit_group" :label="$t('unitStock')+'*'"
                                            label-for="stock_unit_input" description="">
                                            <b-form-select :class="[productsError.stock_unit ? 'border-danger' : 'border-dark']" v-model="product.stock_unit" size="sm"
                                                name="stock_unit" @click="productsError.stock_unit = false">
                                                <b-form-select-option value=null disabled selected>{{ $t('selectUnitStock') }}
                                                </b-form-select-option>
                                                <b-form-select-option v-for="(S, index) in stockUnitList"
                                                    :key="`proStockUnitlist${index}`" :value="S.code">{{ S.name }}
                                                </b-form-select-option>
                                            </b-form-select>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="stock_group" :label="$t('amountStock')"
                                            label-for="stock_input" description="" required>
                                            <b-form-input :class="[productsError.stock ? 'border-danger' : 'border-dark']" id="stock_input" v-model="product.stock"
                                                type="number" name="stock" :placeholder="$t('amountStock')" size="sm" @click="productsError.stock = false" required>
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="vat_group" :label="$t('vat')"
                                            label-for="vat_input" description="">
                                            <b-form-select class="border-dark" v-model="product.vat" size="sm"
                                                name="vat">
                                                <b-form-select-option value=1>
                                                    %1
                                                </b-form-select-option>
                                                <b-form-select-option value=8>
                                                    %
                                                </b-form-select-option>
                                                <b-form-select-option value=18>
                                                    %18
                                                </b-form-select-option>
                                            </b-form-select>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="buying_price_group" :label="$t('buyingPrice')+'*'"
                                            label-for="buying_price_input" description="" required>
                                            <b-form-input :class="[productsError.buying_price ? 'border-danger' : 'border-dark']" id="buying_price_input"
                                                v-model="product.buying_price" type="number" name="buying_price"
                                                :placeholder="$t('buyingPrice')+'*'" size="sm" @click="productsError.buying_price = false" required>
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="selling_price_group" :label="$t('sellingPrice')+'*'"
                                            label-for="selling_price_input" description="" required>
                                            <b-form-input :class="[productsError.selling_price ? 'border-danger' : 'border-dark']" id="selling_price_input"
                                                v-model="product.selling_price" type="number" name="selling_price"
                                                :placeholder="$t('sellingPrice')+'*'" size="sm" @click="productsError.selling_price = false" required>
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="discounted_selling_price_group" :label="$t('discountedPrice')"
                                            label-for="discounted_selling_price_input" description="" required>
                                            <b-form-input class="border-dark" id="discounted_selling_price_input"
                                                v-model="product.discounted_selling_price" type="number" name="discounted_selling_price"
                                                :placeholder="$t('discountedPrice')" size="sm" required>
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group class="col-12" id="currency_group" :label="$t('currency')+'*'"
                                            label-for="currency_input" description="">
                                            <b-form-select :class="[productsError.currency_id ? 'border-danger' : 'border-dark']" v-model="product.currency_id" size="sm"
                                                name="currency" @click="productsError.currency_id = false">
                                                <b-form-select-option value=null disabled selected>{{ $t('selectCurrency') }}
                                                </b-form-select-option>
                                                <b-form-select-option v-for="(C, index) in currencyList"
                                                    :key="`proCurrencylist${index}`" :value="C.id">{{ C.name }}
                                                </b-form-select-option>
                                            </b-form-select>
                                        </b-form-group>
                                    </b-form>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </b-form>
                </div>
                <div class="col-12 mt-4 mb-3">
                    <div class="row pt-2 pb-4">
                        <div class="col-12 mt-3 mb-4">
                            <h3 class="text-center">
                                {{ $t('productDescription') }}
                            </h3>
                        </div>
                        <b-form-group class="col-md-12" id="details_group" label="" label-for="details_input"
                            description="">
                            <editor v-model="product.description"
                                api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605" :init="init"
                                required />
                        </b-form-group>
                    </div>
                </div>

                <div class="col-12 mt-4">
                    <div class="row">
                        <div class="col-12 col-md-6 m-auto">
                            <b-button class="col-12" type="button" @click="saveProduct" squared size="lg"
                                variant="primary">
                                {{ $t('save') }}</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-sidebar id="seo-setting" :title="$t('settingsSeo')" right backdrop shadow>

            <b-form-group class="col-12" id="seo_title_group" :label="$t('seoTitle')"
                label-for="seo_title_input" description="" required>
                <b-form-textarea class="border-dark" id="seo_title_input" v-model="product.seo_title"
                    rows="3" type="text" name="seo_title" :placeholder="$t('seoTitle')" size="sm">
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-12" id="seo_keywords_group" :label="$t('seoKeywords')"
                label-for="seo_keywords_input" description="" required>
                <b-form-textarea class="border-dark" id="seo_keywords_input"
                    v-model="product.seo_keywords" rows="3" type="text" name="seo_keywords"
                    :placeholder="$t('seoKeywords')" size="sm">
                </b-form-textarea>
            </b-form-group>

            <b-form-group class="col-12" id="seo_description_group" :label="$t('seoDescription')"
                label-for="seo_description_input" description="" required>
                <b-form-textarea class="border-dark" id="seo_description_input"
                    v-model="product.seo_description" rows="3" type="text" name="seo_description"
                    :placeholder="$t('seoDescription')" size="sm">
                </b-form-textarea>
            </b-form-group>
        </b-sidebar>
    </div>
</template>
 
<script>
import Editor from '@tinymce/tinymce-vue'
export default
    {
        name: 'AddProduct',
        middleware: 'adminAuthenticated',
        layout: "admin",
        components: {
            'editor': Editor
        },
        data() {
            return {
                isMobile: false,
                supplier: undefined,
                tabIndex:0,
                product: {
                    "category_ids":[],
                    "ws_code": null,
                    "title": null,
                    "supplier_product_code": null,
                    "barcode": null,
                    "sku": null,
                    "stock": 0,
                    "stock_unit": null,
                    "stock_code": null,
                    "is_active": 1,
                    "vat": 18,
                    "currency_id": null,
                    "buying_price": null,
                    "selling_price": null,
                    "discounted_selling_price": null,
                    "search_keywords": null,
                    "is_new_product": null,
                    "on_sale": null,
                    "showcase_image": null,
                    "is_free_cargo_in_cart": null,
                    "is_display_product": null,
                    "is_vendor_product": null,
                    "brand_id": null,
                    "model_id": null,
                    "supplier_id": null,
                    "member_min_order": null,
                    "member_max_order": null,
                    "short_description": null,
                    "description": null,
                    "desi": null,
                    "symbols": null,
                    "sort": null,
                    "delivery_time": null,
                    "images": null,
                    "seo_title": null,
                    "seo_keywords": null,
                    "seo_description": null,
                    "user_id":null
                },
                productsError: {
                    title: false,
                    brand: false,
                    stock_unit: false,
                    stock: false,
                    currency_id: false,
                    buying_price: false,
                    selling_price: false
                },
                productsOverlay: false,
                categories: [],
                brands: [],
                models: [],
                stockUnitList: [
                    {
                        code:"adet",
                        name:"Adet"
                    },
                    {
                        code:"gr",
                        name:"Gram"
                    },
                    {
                        code:"kg",
                        name:"Kilogram"
                    },
                    {
                        code:"cm",
                        name:"Santimetre"
                    },
                    {
                        code:"meter",
                        name:"Metre"
                    }
                ],
                currencyList: [],
                formData: undefined,
                newImage: undefined,
                galleryImage: undefined,
                init: {
                    language: 'tr',
                    min_height: 500,
                    preview_styles: 'font-size color',
                    resize: 'both',
                    plugins: 'link media autolink lists advlist media table fullscreen lists directionality emoticons wordcount preview tabfocus template anchor autoresize code',
                    menubar: 'file edit insert view format table tools help',
                    toolbar: 'undo redo | styleselect | fullscreen | forecolor  | bold italic underline italic | alignleft aligncenter alignright alignjustify | outdent indent | link media| code table | numlist bullist | ltr rtl | emoticons | wordcount | anchor | template | preview | grid_insert',
                    external_filemanager_path: '/filemanager/',
                    filemanager_title: 'Responsive Filemanager',
                    external_plugins: {
                        'responsivefilemanager': '/filemanager/plugin.min.js',
                        'filemanager': '/filemanager/plugin.min.js'
                    },
                    filemanager_access_key: "fkod_12345.",
                    grid_preset: 'Bootstrap3',
                    toolbar_mode: 'wrap',
                    image_title: true,
                    automatic_uploads: true,
                    images_upload_url: this.$nuxt.context.env.baseUrl + '/api/v1/image/uploadEditor',
                    file_picker_types: 'image',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Furkan ŞAHİN',
                    relative_urls: false,
                    remove_script_host: false,
                    convert_urls: true,
                    templates: [
                        {
                            title: '2 li Görünüm',
                            description: 'Bu şablonun görünümü masaüstünde yanyana , mobilde ise alt alta olacak şekilde kullanılıyor.',
                            content: '<div class="row"><div class="col-12"><div class="row"><div class="col-12 col-md-6">Birince alan buraya gelecek.</div><div class="col-12 col-md-6">İkinci alan buraya gelecek.</div></div></div></div>'
                        },
                        {
                            title: '3 li Görünüm',
                            description: 'Bu şablonun görünümü masaüstünde yan yana , mobilde ise alt alta olacak şekilde kullanılıyor.',
                            content: '<div class="row"><div class="col-12"><div class="row"><div class="col-12 col-md-4">Birince alan buraya gelecek.</div><div class="col-12 col-md-4">İkinci alan buraya gelecek.</div><div class="col-12 col-md-4">Üçüncü alan buraya gelecek.</div></div></div></div>'
                        },
                        {
                            title: 'container',
                            description: 'Bu şablon içeriği genişliği sayfanın tamamını değilde , 1200px genişlik içerisine almak için kullanılıyor.',
                            content: '<div class="container"><div class="row"><div class="col-12">İçeriği bu alana giriniz.</div></div></div>'
                        }
                    ],
                }
            }
        },
        props: {

        },
        methods: {
            eventWindowResize() {
                this.isMobile = window.screen.width > 768 ? false : true;
            },
            scrollToView(element){
                let offsetTop = document.querySelector(element).offsetTop;
                window.scrollTo(0, offsetTop + 80)
            },
            saveProduct() {
                var _this = this;
                
                function getSelectCategory(array,key) {
                    if(typeof array == 'object') {
                        for (let i = 0; i < array.length; i++) {
                            if(array[i]["isSelect"] == "1") {
                                _this.product.category_ids.push(array[i].id);
                            }
                            if(array[i].children && array[i].children.length > 0)
                            {
                                for (let j = 0; j < array[i].children.length; j++) {
                                    if(array[i].children[j]["isSelect"] == "1") {
                                        _this.product.category_ids.push(array[i].children[j].id);
                                    }
                                    getSelectCategory(array[i].children[j]);
                                }
                            }
                        }
                    }
                }

                getSelectCategory(_this.categories);

                if (_this.product.category_ids.length == 0) {
                    _this.$bvToast.toast('Kategori seçmelisiniz.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                    });
                    _this.scrollToView('#categoryList');
                    _this.tabIndex = 0;
                    return false;
                }

                if (!_this.$checkIsNullOrEmpty(_this.product.title)) {
                    _this.productsError.title = true;
                    _this.scrollToView('#pro_name_group');
                    _this.tabIndex = 1;
                    return false;
                }
                else
                    _this.productsError.title = false;

                if (!_this.$checkIsNullOrEmpty(_this.product.brand_id)) {
                    _this.productsError.brand = true;
                    _this.scrollToView('#brand_group');
                    _this.tabIndex = 1;
                    return false;
                }
                else
                    _this.productsError.brand = false;                

                if (!_this.$checkIsNullOrEmpty(_this.product.stock_unit)) {
                    _this.productsError.stock_unit = true;
                    _this.scrollToView('#stock_unit_group');
                    _this.tabIndex = 3;
                    return false;
                }
                else
                    _this.productsError.stock_unit = false;

                if (!_this.$checkIsNullOrEmpty(_this.product.stock)) {
                    _this.productsError.stock = true;
                    _this.scrollToView('#stock_group');
                    _this.tabIndex = 3;
                    return false;
                }
                else
                    _this.productsError.stock_unit = false;

                if (!_this.$checkIsNullOrEmpty(_this.product.buying_price)) {
                    _this.productsError.buying_price = true;
                    _this.scrollToView('#buying_price_group');
                    _this.tabIndex = 3;
                    return false;
                }
                else
                    _this.productsError.buying_price = false;

                if (!_this.$checkIsNullOrEmpty(_this.product.selling_price)) {
                    _this.productsError.selling_price = true;
                    _this.scrollToView('#selling_price_group');
                    _this.tabIndex = 3;
                    return false;
                }
                else
                    _this.productsError.selling_price = false;
                    
                if (!_this.$checkIsNullOrEmpty(_this.product.currency_id)) {
                    _this.productsError.currency_id = true;
                    _this.scrollToView('#currency_group');
                    _this.tabIndex = 3;
                    return false;
                }
                else
                    _this.productsError.currency_id = false;
                
                _this.productsOverlay = true;

                _this.product.user_id = _this.$store.state._userId;
                _this.$repositories.product.create(_this.product)
                .then(res => {
                    if (res.data.success == 'success') {
                        _this.$bvToast.toast('Kayıt başarıyla keydedildi.', {
                            title: `Başarılı..`,
                            variant: 'success',
                            autoHideDelay: 500,
                            solid: true
                        });

                        setTimeout(() => {
                            _this.productsOverlay = false;
                            _this.$router.push("/admin/product/edit/" + res.data.data.id);
                        }, 2000)
                    }
                    else {
                        _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.productsOverlay = false;
                    }
                });
            },
            async getCategories() {
                var _this = this;
                _this.$repositories.category.get().then(res => {
                    var map = {}, node, roots = [], i, results = res.data.response;
                    for (i = 0; i < results.length; i += 1) {
                        map[results[i].id] = i;
                        results[i]["children"] = [];
                    }
                    for (i = 0; i < results.length; i += 1) {
                        node = results[i];
                        if (node.parent_id !== null) {
                            results[map[node.parent_id]].children.push(node);
                            results["isFolder"] = true;
                        }
                        else {
                            roots.push(node);
                            results["isFolder"] = false;
                        }
                    }
                    _this.categories = roots;
                });
            },
            getBrands() {
                var _this = this;
                _this.$repositories.brand.getAll().then(res => {
                    _this.brands = res.data.response;
                });
            },
            getModels() {
                var _this = this;
                _this.$repositories.model.getAll().then(res => {
                    _this.models = res.data.response;
                });
            },
            async getCurrencyList() {
                var _this = this;
                _this.$repositories.product.getCurrencyList().then(res => {
                    _this.currencyList = res.data.response;
                });
            },
        },
        mounted() {
            var _this = this;
            _this.isMobile = window.screen.width > 768 ? false : true;
            window.addEventListener("resize", _this.eventWindowResize);
        },
        async created() {
            this.getCategories();
            this.getBrands();
            this.getModels();
            this.getCurrencyList();
        }
    }
</script>
 
<style scoped>

</style>
 