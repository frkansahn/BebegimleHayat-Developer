<template>
    <div class="admin-category" id="adminCategory">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 my-4">
                    <h3>
                        Ürünler
                    </h3>

                    <div class="row mt-3">
                        <b-form-group class="col-6 col-md-4 col-lg-3 col-xl-2" id="filter_title_group" label="Ürün Adı" label-for="filter_title_input" description="">
                            <b-form-input @keyup.enter="getProducts" id="filter_title_input" v-model="reqData.filters.title" type="text" name="filter_title" placeholder="ürün adı.."></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-6 col-md-4 col-lg-3 col-xl-2" id="filter_barcode_group" label="Barcode" label-for="filter_barcode_input" description="">
                            <b-form-input @keyup.enter="getProducts" id="filter_barcode_input" v-model="reqData.filters.barcode" type="text" name="filter_barcode" placeholder="barcode.."></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-6 col-md-4 col-lg-3 col-xl-2" id="filter_ws_code_group" label="WS Code" label-for="filter_ws_code_input" description="">
                            <b-form-input @keyup.enter="getProducts" id="filter_ws_code_input" v-model="reqData.filters.ws_code" type="text" name="filter_ws_code" placeholder="ws code.."></b-form-input>
                        </b-form-group>

                        <b-form-group class="col-6 col-md-4 col-lg-3 col-xl-2" id="filter_sku_group" label="SKU" label-for="filter_sku_input" description="">
                            <b-form-input @keyup.enter="getProducts" id="filter_sku_input" v-model="reqData.filters.sku" type="text" name="filter_sku" placeholder="sku.."></b-form-input>
                        </b-form-group>
                        
                        <b-form-group v-if="brands" class="col-6 col-md-4 col-lg-3 col-xl-2" id="brand_group" label="Marka"
                            label-for="brand_select" description="Birden fazla marka seçebilirsiniz.">
                            <v-select v-model="selectedBrands" placeholder="Marka" multiple :options="brands" label="name" :reduce="b => b.id"></v-select>
                        </b-form-group>

                        <b-form-group class="col-6 col-md-3 col-lg-2 col-xl-1" id="category_group" label="Kategori"
                            label-for="category_button" :description="`${selectedCategories.length || 0} kategori seçildi.`">
                            <b-button class="" type="button" @click="$bvModal.show('category-tree');" size="md" variant="success">
                                Kategori
                            </b-button>
                        </b-form-group>

                        <b-form-group class="col-6 col-md-3 col-lg-2 col-xl-1" id="search_button_group" label="Ara"
                            label-for="search_button" description="">
                            <b-button class="float-left w-100 d-flex align-items-center justify-content-center" type="button" @click="getProducts" size="md" variant="primary">
                                <b-icon-search variant="white" font-scale="0.8" class="mr-2"></b-icon-search>
                                Ara
                            </b-button>
                        </b-form-group>
                    </div>

                    <div class="row mt-4">
                        <div class="col-12 mb-2">
                            <NuxtLink to="/admin/product/add" class="btn btn-secondary btn-sm">
                                + Yeni Ürün Ekle
                            </NuxtLink>
                            <span class="float-right">
                                <strong>{{paging.total}}</strong> ürün listeleniyor.
                            </span>
                        </div>
                        <div class="col-12">
                            <table v-if="products" class="table table-bordered table-sm table-responsive-lg" id="categoryProductsTable">
                                <thead class="table-secondary text-nowrap">
                                    <tr>
                                        <th>{{ $t('edit') }}</th>
                                        <th>{{ $t('image') }}</th>
                                        <th>{{ $t('productName') }}</th>
                                        <th>{{ $t('barcode') }}</th>
                                        <th>{{ $t('brand') }}</th>
                                        <th>{{ $t('model') }}</th>
                                        <th>{{ $t('category') }}</th>
                                        <th>{{ $t('vat') }}</th>
                                        <th>{{ $t('buyingPrice') }}</th>
                                        <th>{{ $t('sellingPrice') }}</th>
                                        <th>{{ $t('discountedPrice') }}</th>
                                        <th>{{ $t('currency') }}</th>
                                        <th>{{ $t('stock') }}</th>
                                        <th>{{ $t('sort') }}</th>
                                        <th>{{ $t('gotoProduct') }}</th>
                                        <th>{{ $t('delete') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(P, index) in products" :key="`products${index}`">
                                        <td>
                                            <NuxtLink :to="`/admin/product/edit?id=${P.id}`" id="productEdit">
                                                <b-icon icon="pencil" font-scale="1"></b-icon>
                                            </NuxtLink>
                                        </td>
                                        <td class="hover-image">
                                            <img :src="P.showcase_image.S" style="max-width:40px;" v-if="P.showcase_image"/>
                                            <span class="image" v-if="P.showcase_image">
                                                <img :src="P.showcase_image.S"/>
                                            </span>
                                        </td>
                                        <td>{{ P.title }}</td>
                                        <td>{{ P.barcode }}</td>
                                        <td>{{ P.brand_name }}</td>
                                        <td>{{ P.model_name }}</td>
                                        <td>{{ P.category_name }}</td>
                                        <td>{{ P.vat }}</td>
                                        <td>
                                            <span class="border-bottom border-dark py-1 px-2" contenteditable @blur="blurBuyingPrice($event, P.id)">
                                                {{ P.buying_price | currencyFormat }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="border-bottom border-dark py-1 px-2" contenteditable @blur="blurSellingPrice($event, P.id)">
                                                {{ P.selling_price | currencyFormat }}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="border-bottom border-dark py-1 px-2" contenteditable @blur="blurDiscountedPrice($event, P.id)">
                                                {{ P.selling_price == P.discounted_selling_price ? '0.00' : P.discounted_selling_price | currencyFormat }}
                                            </span>
                                        </td>
                                        <td class="text-uppercase">{{ P.currency_code }}</td>
                                        <td>{{ P.stock }}</td>
                                        <td>
                                            <span class="border-bottom border-dark py-1 px-2" contenteditable @blur="blurSort($event, P.id)">
                                                {{ P.sort }}
                                            </span>
                                        </td>
                                        <td>
                                            <a :href="`/${P.seo_link}`" target="_blank"
                                                id="productUrl" class="btn btn-success btn-sm py-0">
                                                {{ $t('go') }}
                                            </a>
                                        </td>
                                        <td>
                                            <b-icon icon="trash" variant="danger" font-scale="1" id="productDelete"
                                                @click="deleteProduct(P.id)"></b-icon>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <b-skeleton-table v-else :rows="30" :columns="16"
                                :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <b-pagination v-model="paging.currentPage" :total-rows="paging.total" :per-page="30"
                            :first-text="$t('first')" :prev-text="$t('prev')" :next-text="$t('next')" :last-text="$t('last')" pills>
                            </b-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="category-tree" title="Kategori Seç">
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
            <template #modal-footer>
                <div class="w-100">
                    <b-button variant="success" size="sm" class="float-right mx-2"
                        @click="categoryPopupSave">
                        {{ $t('save') }}
                    </b-button>
                    <b-button variant="outline-danger" size="sm" class="float-right mx-2"
                        @click="categoryPopupClose">
                        {{ $t('close') }}
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>
 
<script>
export default
    {
    name: "AdminProduct",
    middleware: "adminAuthenticated",
    layout: "admin",
    head() {
        return {
            title: "Admin Ürün Sayfası"
        };
    },
    data() {
        return {
            products: undefined,
            categories: [],
            brands: [],
            languages:[],
            selectedCategories:[],
            selectedBrands:[],
            tabIndex:0,
            selectedLanguage:null,
            productOverlay: false,
            image:undefined,
            paging: {
               currentPage: 1,
               total: undefined,
               start: 0,
               end: 30
            },
            reqData: {
                language:"tr",
                filters: {
                    title:null,
                    barcode:null,
                    ws_code:null,
                    sku:null,
                    price:null,
                    categories:null,
                    brands:null
                },
                paging: {
                    start: 0,
                    end:30
                }
            }
        };
    },
    watch: {
        'paging.currentPage'() {
            this.getProducts();
        }
    },
    methods: {
        categoryPopupClose(){
            const _this = this;
            _this.selectedCategories = [];
            function noSelectCategory(array,key) {
                if(typeof array == 'object') {
                    for (let i = 0; i < array.length; i++) {
                        array[i]["isSelect"] = "0";
                        if(array[i].children && array[i].children.length > 0)
                        {
                            for (let j = 0; j < array[i].children.length; j++) {
                                array[i].children[j]["isSelect"] = "0";
                                noSelectCategory(array[i].children[j]);
                            }
                        }
                    }
                }
            }

            noSelectCategory(_this.categories);

            _this.$bvModal.hide('category-tree');
        },
        categoryPopupSave(){
            const _this = this;
            _this.selectedCategories = [];

            function getSelectCategory(array,key) {
                if(typeof array == 'object') {
                    for (let i = 0; i < array.length; i++) {
                        if(array[i]["isSelect"] == "1") {
                            _this.selectedCategories.push(array[i].id);
                        }
                        if(array[i].children && array[i].children.length > 0)
                        {
                            for (let j = 0; j < array[i].children.length; j++) {
                                if(array[i].children[j]["isSelect"] == "1") {
                                    _this.selectedCategories.push(array[i].children[j].id);
                                }
                                getSelectCategory(array[i].children[j]);
                            }
                        }
                    }
                }
            }

            getSelectCategory(_this.categories);

            _this.$bvModal.hide('category-tree');
        },
        async deleteProduct() {
            var _this = this;
            _this.$bvModal.msgBoxConfirm("Kategoriyi silmek istediğinize emin misiniz?", {
                size: "sm",
                buttonSize: "sm",
                okVariant: "success",
                okTitle: "Evet",
                cancelVariant: "danger",
                cancelTitle: "Hayır",
                footerClass: "py-2 px-4",
                hideHeaderClose: false
            })
            .then(value => {
                if (value) {
                    _this.categoryOverlay = true;
                    _this.$repositories.category.delete(_this.category.id, {user_id:_this.$store.state._userId})
                    .then(res => {
                        if (res.data.success == "success") {
                            _this.$bvToast.toast("Kategori başarıyla silindi.", {
                                title: `Başarılı..`,
                                variant: "success",
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getCategories();
                            _this.isAddCategory = false;
                            _this.isAddSubCategory = false;
                            _this.isAddMainCategory = false;
                        }
                        else {
                            if (res.data.code == "there_is_product") {
                                _this.$bvToast.toast("Kategorinin bağlı olduğu ürünler bulunmaktadır. Önce bağlı olduğu ürünleri siliniz.", {
                                    title: `Başarısız..`,
                                    variant: "danger",
                                    autoHideDelay: 4000,
                                    solid: true
                                });
                            }
                            else {
                                _this.$bvToast.toast("Kategori silinemedi.Sayfayı yenileyip tekrar deneyiniz.", {
                                    title: `Başarısız..`,
                                    variant: "danger",
                                    autoHideDelay: 1500,
                                    solid: true
                                });
                            }
                        }

                        _this.categoryOverlay = false;
                    })
                    .catch(err => {
                        _this.categoryOverlay = false;
                    });
                }
            })
        },
        
        changeLanguage(){
            var _this = this;
            _this.$repositories.category.getCategoryByLanguage(_this.category.id, _this.selectedLanguage).then(res => {
                if(res && res.data && res.data.response && res.data.response.length > 0)
                    _this.categoryLanguage = res.data.response[0];
                else 
                    _this.resetCategoryLanguage();
            });
        },
        async blurDiscountedPrice(e, product_id) {
            var _this = this;
            let reqData = {
                "discounted_selling_price": Number(e.target.textContent).toString(),
                "user_id": _this.$store.state._userId
            }
            ;
            _this.$repositories.product.updatePrice(product_id,reqData)
            .then(res => {
                if (res?.data?.success == 'success')
                    _this.$bvToast.toast('İndirimli satış fiyatı başarıyla güncellendi.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                    });
            });
        },
        async blurSellingPrice(e, product_id) {
            var _this = this;
            let reqData = {
                "selling_price": Number(e.target.textContent).toString(),
                "user_id": _this.$store.state._userId
            }
            ;
            _this.$repositories.product.updatePrice(product_id,reqData)
            .then(res => {
                if (res?.data?.success == 'success')
                    _this.$bvToast.toast('Satış fiyatı başarıyla güncellendi.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                    });
            });
        },
        async blurBuyingPrice(e, product_id) {
            var _this = this;
            let reqData = {
                "buying_price": Number(e.target.textContent).toString(),
                "user_id": _this.$store.state._userId
            }
            ;
            _this.$repositories.product.updatePrice(product_id,reqData)
            .then(res => {
                if (res?.data?.success == 'success')
                    _this.$bvToast.toast('Alış fiyatı başarıyla güncellendi.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                    });
            });
        },
        async blurSort(e, product_id) {
            var _this = this;
            let reqData = {
                "sort": Number(e.target.textContent).toString(),
                "user_id": _this.$store.state._userId
            }
            ;
            _this.$repositories.product.updateSort(product_id,reqData)
            .then(res => {
                if (res?.data?.success == 'success')
                    _this.$bvToast.toast('Sıralama başarıyla güncellendi.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                    });
            });
        },
        getProducts(){
            const _this = this;
            _this.products = undefined;
            _this.reqData.paging.start = (_this.paging.currentPage - 1) * 30; 
            _this.reqData.paging.end = _this.paging.end;
            _this.reqData.filters.brands = _this.selectedBrands.join("-");
            _this.reqData.filters.categories = _this.selectedCategories.join("-");

            _this.$repositories.product.getProductsForAdmin(_this.reqData)
            .then(res => {
                if(res && res.data) {
                    _this.products = res.data.response.products;
                    _this.paging.total = res.data.response.total;
                }
            })
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
        async getLanguages() {
            var _this = this;
            _this.$repositories.language.getAll().then(res => {
                _this.languages = res.data.response;
            });
        },
        async getBrands() {
            var _this = this;
            _this.$repositories.brand.getAll().then(res => {
                _this.brands = res.data.response;
            });
        },
    },
    async created() {
        this.getProducts();
        this.getCategories();
        this.getBrands();
        this.getLanguages();
    }
}
</script>
 
<style scoped>
.hover-image {
    position: relative;
}
.hover-image .image {
    display: none;
    position: absolute;
    top: 0;
    left: 100%;
    width: max-content;
    border: 2px solid #898383;
    border-radius: 5px;
}

.hover-image:hover .image {
    display: block;
}
.popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #00000040;
    z-index: 9999999999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-content {
    background: #ffffff;
    position: relative;
}

.popup-close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    font-size: 30px;
    line-height: 15px;
    height: 20px;
    cursor: pointer;
    z-index: 1;
}
</style>
 