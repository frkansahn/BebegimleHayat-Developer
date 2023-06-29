<template>
    <div class="admin-category" id="adminCategory">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <h3>
                        Kategoriler
                    </h3>

                    <div class="row mt-4">
                        <div class="col-3" v-if="categories && categories.length > 0" id="categoryList">
                            <div class="row mb-2">
                                <div class="col-12 col-md-6">
                                    <button type="button" class="w-100 btn btn-primary btn-sm" @click="addMainCategory">
                                        <small>
                                            + Ana Kategori Ekle
                                        </small>
                                    </button>
                                </div>
                            </div>
                            <ul class="float-left w-100 border border-secondary p-2 rounded list-unstyled">
                                <li v-for="(category,index) in categories" :key="`category${index}`">
                                    <ul class="list-unstyled">
                                        <TreeCategory class="item"
                                            :item="category"
                                            @selectCategory="selectCategory"
                                            @addSubCategory="addSubCategory"
                                            :isAddButton="true"
                                        />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="col-9" v-if="isAddCategory || isEditCategory">
                            <b-overlay :show="categoryOverlay" no-wrap></b-overlay>
                            <b-card no-body>
                                <b-tabs v-model="tabIndex" pills card>
                                    <b-tab title="Kategori">
                                        <b-form class="row">
                                            <b-form-group class="col-12" id="title_group" label="Kategori Adı"
                                                label-for="title_input" description="" required>
                                                <b-form-input :class="[categoryError.title ? 'border-danger':'border-dark']"
                                                    id="title_input" v-model="category.title" type="text" name="title"
                                                    placeholder="Kategori adı" @click="categoryError.title=false" required>
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group class="col-12 col-md-6 col-xl-3" id="is_active_group" label="Aktif/Pasif"
                                                label-for="is_active_input" description="Kategorinin sitede görünürlüğünü kontrol eder.">
                                                <b-form-checkbox v-model="category.is_active" value="1" unchecked-value="0"  switch size="md"></b-form-checkbox>
                                            </b-form-group>

                                            <b-form-group class="col-12 col-md-6 col-xl-3" id="show_in_menu_group" label="Menüde Göster"
                                                label-for="show_in_menu_input" description="Kategorinin masaüstünde mega menüde görünürlüğünü kontrol eder.">
                                                <b-form-checkbox v-model="category.show_in_menu" value="1" unchecked-value="0" switch size="md"></b-form-checkbox>
                                            </b-form-group>

                                            <b-form-group class="col-12 col-md-6 col-xl-3" id="show_in_mobile_group" label="Mobilde Göster"
                                                label-for="show_in_mobile_input" description="Kategorinin mobilde hamburger menüde görünürlüğünü kontrol eder.">
                                                <b-form-checkbox v-model="category.show_in_mobile" value="1" unchecked-value="0" switch size="md"></b-form-checkbox>
                                            </b-form-group>

                                            <b-form-group class="col-12 col-md-6 col-xl-3" id="show_category_group" label="Kategoride Göster"
                                                label-for="show_category_input" description="Kategori sayfasında görünürlüğünü kontrol eder.">
                                                <b-form-checkbox v-model="category.show_category" value="1" unchecked-value="0" switch size="md"></b-form-checkbox>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="short_description_group" label="Kısa Açıklama"
                                                label-for="short_description_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="short_description_input" v-model="category.short_description" type="text"
                                                    name="short_description" placeholder="Kısa Açıklama" rows="2" max-rows="6"></b-form-textarea>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="description_group" label="Detaylı Açıklama" label-for="description_input" description="">
                                                <editor
                                                    v-model="category.description"
                                                    api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                                    :init="init" :name="`editor${category.id}`" />
                                            </b-form-group>
                                        </b-form>
                                    </b-tab>
                                    <b-tab title="Görsel">
                                        <b-form class="row">
                                            <div class="col-12 col-md-6">
                                                <div class="row mb-3">
                                                    <h4 class="col-12">
                                                        Görsel
                                                    </h4>
                                                </div>
                                                <div class="row">
                                                    <b-form-group class="col-12" id="image_group" label="Kategori Görseli" label-for="image_input" description="">
                                                        <b-form-file @change="saveCategoryImage" v-model="image" :state="Boolean(image)" placeholder="Bir dosya seçin veya buraya bırakın..." drop-placeholder="Dosyayı buraya bırakın..."></b-form-file>
                                                    </b-form-group> 
                                                    <div class="col-md-4">
                                                        <b-button @click="saveCategoryImage" class="w-100" variant="success" size="md" v-if="!category.image">Resim Ekle</b-button>
                                                        <b-button @click="deleteCategoryImage" class="w-100" variant="danger" size="md" v-else>Sil</b-button>                    
                                                    </div>
                                                    <div class="col-md-8">
                                                        <img :src="category.image" v-if="category.image">
                                                        <span class="float-left w-100" v-else>
                                                            <b-alert show variant="warning" class="px-3 py-2">
                                                                Eklenmiş resim bulunmamaktadır.
                                                            </b-alert>
                                                        </span>
                                                    </div> 
                                                </div>
                                            </div>

                                            <div class="col-12 col-md-6 border-left">
                                                <div class="row mb-3">
                                                    <h4 class="col-12">
                                                        İkon
                                                    </h4>
                                                </div>
                                                <div class="row">
                                                    <b-form-group class="col-12" id="icon_group" label="Kategori İkonu" label-for="icon_input" description="">
                                                        <b-form-file @change="saveCategoryIcon" v-model="icon" :state="Boolean(icon)" placeholder="Bir dosya seçin veya buraya bırakın..." drop-placeholder="Dosyayı buraya bırakın..."></b-form-file>
                                                    </b-form-group> 
                                                    <div class="col-md-4">
                                                        <b-button @click="saveCategoryIcon" class="w-100" variant="success" size="md" v-if="!category.icon">İkon Ekle</b-button>
                                                        <b-button @click="deleteCategoryIcon" class="w-100" variant="danger" size="md" v-else>Sil</b-button>                    
                                                    </div>
                                                    <div class="col-md-8">
                                                        <img :src="category.icon" v-if="category.icon">
                                                        <span class="float-left w-100" v-else>
                                                            <b-alert show variant="warning" class="px-3 py-2">
                                                                Eklenmiş ikon bulunmamaktadır.
                                                            </b-alert>
                                                        </span>
                                                    </div> 
                                                </div>
                                            </div>
                                        </b-form>
                                    </b-tab>
                                    <b-tab title="Seo Ayarları">
                                        <b-form class="row">
                                            <b-form-group class="col-12 col-md-6" id="seo_title_group" label="Seo Başlık"
                                                label-for="seo_title_input" description="" required>
                                                <b-form-input class="border-dark"
                                                    id="seo_title_input" v-model="category.seo_title" type="text" name="seo_title"
                                                    placeholder="Seo Başlık">
                                                </b-form-input>
                                            </b-form-group>
                                            <b-form-group class="col-12 col-md-6" id="seo_keywords_group" label="Seo Anahtarları"
                                                label-for="seo_keywords_input" description="" required>
                                                <b-form-input class="border-dark"
                                                    id="seo_keywords_input" v-model="category.seo_keywords" type="text" name="seo_keywords"
                                                    placeholder="Seo Anahtarları">
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="seo_description_group" label="Seo Açıklama"
                                                label-for="seo_description_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="seo_description_input" v-model="category.seo_description" type="text"
                                                    name="seo_description" placeholder="Seo Açıklama" rows="2" max-rows="6"></b-form-textarea>
                                            </b-form-group>
                                        </b-form>
                                    </b-tab>
                                    <b-tab title="Ek Alanlar">
                                        <b-form class="row">
                                            <b-form-group class="col-12" id="field1_group" label="Ek Alan 1"
                                                label-for="field1_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="field1_input" v-model="category.field1" type="text"
                                                    name="field1" placeholder="Ek Alan 1" rows="2" max-rows="6"></b-form-textarea>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="field2_group" label="Ek Alan 2"
                                                label-for="field2_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="field2_input" v-model="category.field2" type="text"
                                                    name="field2" placeholder="Ek Alan 2" rows="2" max-rows="6"></b-form-textarea>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="field13_group" label="Ek Alan 3"
                                                label-for="field3_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="field3_input" v-model="category.field3" type="text"
                                                    name="field3" placeholder="Ek Alan 3" rows="2" max-rows="6"></b-form-textarea>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="field4_group" label="Ek Alan 4"
                                                label-for="field4_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="field4_input" v-model="category.field4" type="text"
                                                    name="field4" placeholder="Ek Alan 4" rows="2" max-rows="6"></b-form-textarea>
                                            </b-form-group>
                                        </b-form>
                                    </b-tab>
                                    <b-tab title="Dil Ayarları" v-if="isEditCategory">
                                        <b-overlay :show="categoryLanguageOverlay" no-wrap></b-overlay>
                                        <b-form class="row">
                                            <b-form-group class="col-12 mb-3" id="language_group" label="Dil"
                                                label-for="language_input" description="" required>
                                                <v-select v-model="selectedLanguage" placeholder="Dil Seçiniz" :options="languages" label="name" :reduce="l => l.code" @input="changeLanguage"></v-select>
                                            </b-form-group>

                                            <div class="col-12" v-if="$checkIsNullOrEmpty(selectedLanguage)">
                                                <div class="row">
                                                    <b-form-group class="col-12" id="category_language_title_group" label="Kategori Adı"
                                                        label-for="category_language_title_input" description="" required>
                                                        <b-form-input :class="[categoryLanguageError.title ? 'border-danger':'border-dark']"
                                                            id="category_language_title_input" v-model="categoryLanguage.title" type="text" name="category_language_title"
                                                            placeholder="Kategori adı" @click="categoryLanguageError.title=false" required>
                                                        </b-form-input>
                                                    </b-form-group>

                                                    <b-form-group class="col-12" id="category_language_short_description_group" label="Kısa Açıklama"
                                                        label-for="category_language_short_description_input" description="" required>
                                                        <b-form-textarea class="border-dark"
                                                            id="category_language_short_description_input" v-model="categoryLanguage.short_description" type="text"
                                                            name="category_language_short_description" placeholder="Kısa Açıklama" rows="2" max-rows="6"></b-form-textarea>
                                                    </b-form-group>

                                                    <b-form-group class="col-12" id="category_language_description_group" label="Detaylı Açıklama" label-for="category_language_description_input" description="">
                                                        <editor
                                                            v-model="categoryLanguage.description"
                                                            api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                                            :init="init" :name="`editorcategory_language_${selectedLanguage}`" />
                                                    </b-form-group>

                                                    <b-form-group class="col-12 col-md-6" id="category_language_seo_title_group" label="Seo Başlık"
                                                        label-for="category_language_seo_title_input" description="" required>
                                                        <b-form-input class="border-dark"
                                                            id="category_language_seo_title_input" v-model="categoryLanguage.seo_title" type="text" name="category_language_seo_title"
                                                            placeholder="Seo Başlık">
                                                        </b-form-input>
                                                    </b-form-group>
                                                    <b-form-group class="col-12 col-md-6" id="category_language_seo_keywords_group" label="Seo Anahtarları"
                                                        label-for="category_language_seo_keywords_input" description="" required>
                                                        <b-form-input class="border-dark"
                                                            id="category_language_seo_keywords_input" v-model="categoryLanguage.seo_keywords" type="text" name="category_language_seo_keywords"
                                                            placeholder="Seo Anahtarları">
                                                        </b-form-input>
                                                    </b-form-group>

                                                    <b-form-group class="col-12" id="category_language_seo_description_group" label="Seo Açıklama"
                                                        label-for="category_language_seo_description_input" description="" required>
                                                        <b-form-textarea class="border-dark"
                                                            id="category_language_seo_description_input" v-model="categoryLanguage.seo_description" type="text"
                                                            name="category_language_seo_description" placeholder="Seo Açıklama" rows="2" max-rows="6"></b-form-textarea>
                                                    </b-form-group>

                                                    <div class="col-12">
                                                        <b-button class="float-right" type="button" @click="saveCategoryLanguage"
                                                            size="sm" variant="success">Kaydet</b-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </b-form>
                                    </b-tab>
                                    <b-tab title="Ürünler">
                                        <div class="row">
                                            <div class="col-12">
                                                <table class="table table-sm table-responsive-lg" id="categoryProductsTable">
                                                    <thead class="table-secondary text-nowrap">
                                                        <tr>
                                                            <th>{{ $t('edit') }}</th>
                                                            <th>{{ $t('productName') }}</th>
                                                            <th>{{ $t('brand') }}</th>
                                                            <th>{{ $t('model') }}</th>
                                                            <th>{{ $t('category') }}</th>
                                                            <th>{{ $t('vat') }}</th>
                                                            <th>{{ $t('buyingPrice') }}</th>
                                                            <th>{{ $t('sellingPrice') }}</th>
                                                            <th>{{ $t('discountedPrice') }}</th>
                                                            <th>{{ $t('currency') }}</th>
                                                            <th>{{ $t('stock') }}</th>
                                                            <th>{{ $t('gotoProduct') }}</th>
                                                            <th>{{ $t('delete') }}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(P, index) in products" :key="`products${index}`">
                                                            <td>
                                                                <NuxtLink :to="`/admin/product/edit/${P.id}`" id="productEdit">
                                                                    <b-icon icon="pencil" font-scale="1"></b-icon>
                                                                </NuxtLink>
                                                            </td>
                                                            <td>{{ P.title }}</td>
                                                            <td>{{ P.brand }}</td>
                                                            <td>{{ P.model }}</td>
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
                                                            <td>{{ P.currency }}</td>
                                                            <td>{{ P.stock }}</td>
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
                                            </div>
                                            <div class="col-12 d-flex align-items-center justify-content-center">
                                                <b-pagination v-model="paging.currentPage" :total-rows="paging.total" :per-page="10"
                                                :first-text="$t('first')" :prev-text="$t('prev')" :next-text="$t('next')" :last-text="$t('last')" pills>
                                                </b-pagination>
                                            </div>
                                        </div>
                                    </b-tab>
                                </b-tabs>
                            </b-card>
                            <div class="col-12 mt-4">
                                <div class="row">
                                    <div class="col-12 col-md-6 m-auto">
                                        <b-button class="col-12" type="button" @click="saveCategory" squared
                                            size="lg" variant="success" v-if="isAddCategory">Kaydet</b-button>
                                        <b-button class="col-12" type="button" @click="updateCategory" squared
                                            size="lg" variant="primary" v-if="isEditCategory">Güncelle</b-button>
                                        
                                        <b-button class="col-12 mt-4 text-danger" type="button" @click="deleteCategory" squared
                                            size="md" variant="link">Sil</b-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import Editor from '@tinymce/tinymce-vue'
export default
    {
    name: "AdminCategory",
    middleware: "adminAuthenticated",
    layout: "admin",
    components: {
        'editor': Editor
    },
    head() {
        return {
            title: "Admin Kategori Sayfası"
        };
    },
    data() {
        return {
            languages:[],
            categories: [],
            products: [],
            tabIndex:0,
            selectedLanguage:null,
            isAddCategory: false,
            isEditCategory: false,
            isAddMainCategory: false,
            isAddSubCategory: false,
            isEditCategory: false,
            categoryOverlay: false,
            categoryLanguageOverlay:false,
            category: {
                id: null,
                title: null,
                short_description: null,
                description: null,
                parent_id: null,
                sort: null,
                is_active: null,
                seo_link: null,
                seo_title: null,
                seo_description: null,
                seo_keywords: null,
                show_in_menu: null,
                show_in_mobile: null,
                show_category: null,
                field1: null,
                field2: null,
                field3: null,
                field4: null,
                image:null,
                icon:null,
                user_id:null
            },
            categoryError: {
                title: false
            },
            categoryLanguage:{
                category_id: null,
                title: null,
                short_description: null,
                description: "",
                seo_title: null,
                seo_description: null,
                seo_keywords: null,
                language:this.selectedLanguage,
                user_id:null
            },
            categoryLanguageError: {
                title: false
            },
            image:undefined,
            icon:undefined,
            paging: {
               currentPage: 1,
               total: undefined,
               start: 0,
               end: 10
            },
            init:{
               language : 'tr',
               min_height: 500,
               preview_styles: 'font-size color',
               resize: 'both',
               plugins: 'link image media autolink lists advlist media table fullscreen lists directionality emoticons wordcount preview tabfocus template anchor autoresize code filemanager',
               menubar: 'file edit insert view format table tools help',
               toolbar: 'undo redo | styleselect | fullscreen | forecolor  | bold italic underline italic | alignleft aligncenter alignright alignjustify | outdent indent | link image media| code table | numlist bullist | ltr rtl | emoticons | wordcount | anchor | responsivefilemanager | template | preview | grid_insert',
               external_filemanager_path: '/filemanager/',
               filemanager_title: 'Responsive Filemanager',
               external_plugins: {
                    'responsivefilemanager': '/filemanager/plugin.min.js',
                    'filemanager': '/filemanager/plugin.min.js'
               },
               filemanager_access_key:"fkod_12345.",
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
               convert_urls: false,
               extended_valid_elements :"script[charset|defer|language|src|type]",
               templates : [
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
        };
    },
    props: {},
    methods: {
        saveCategoryImage() {
            var _this = this;
            let formData = new FormData();
            formData.append('file', _this.image);

            if(_this.image)
            {
                _this.$repositories.image.upload(formData)
                .then(res => {
                    _this.category.image = res.data.location;                 
                })
                .catch(err => {
                    console.log(err);
                });
            }
            
        },
        async deleteCategoryImage(){
            var _this = this;
            _this.$repositories.image.delete({"filename":_this.category.image})
            .then(res => {
                if(res && res.data)
                {
                    _this.category.image = null;
                    _this.image = undefined;
                }
                else
                {
                    _this.category.image = null;
                    _this.image = undefined;
                    this.$bvToast.toast('Dosya bulunamadı fakat sistemden silindi. Lütfen güncellemeyi tamamlayınız', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                    });
                }                  
            });
        },
        saveCategoryIcon() {
            var _this = this;
            let formData = new FormData();
            formData.append('file', _this.icon);

            if(_this.icon)
            {
                _this.$repositories.image.upload(formData)
                .then(res => {
                    _this.category.icon = res.data.location;                 
                })
                .catch(err => {
                    console.log(err);
                });
            }
            
        },
        async deleteCategoryIcon(){
            var _this = this;
            _this.$repositories.image.delete({"filename":_this.category.icon})
            .then(res => {
                if(res && res.data)
                {
                    _this.category.icon = null;
                    _this.icon = undefined;
                }
                else
                {
                    _this.category.icon = null;
                    _this.icon = undefined;
                    this.$bvToast.toast('Dosya bulunamadı fakat sistemden silindi. Lütfen güncellemeyi tamamlayınız', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                    });
                }                  
            });
        },
        selectCategory(data){
            this.tabIndex = 0;
            this.selectedLanguage = null;
            this.resetCategoryLanguage();
            this.editCategory(data);
            this.getProductsByCategory();
        },
        addMainCategory() {
            this.resetCategory();
            this.isAddCategory = true;
            this.isEditCategory = false;
            this.isAddSubCategory = false;
            this.isAddMainCategory = true;
        },
        addSubCategory(id) {
            this.resetCategory();
            this.category.parent_id = id;
            this.isAddCategory = true;
            this.isEditCategory = false;
            this.isAddMainCategory = false;
            this.isAddSubCategory = true;
        },
        editCategory(data) {
            this.category = data;
            this.isEditCategory = true;
            this.isAddCategory = false;
            this.isAddMainCategory = false;
            this.isAddSubCategory = false;
        },
        async saveCategory() {
            var _this = this;
            if (_this.category.title != "") {
                _this.categoryOverlay = true;
                _this.category.user_id = _this.$store.state._userId;
                _this.$repositories.category.create(_this.category)
                    .then(res => {
                    if (res.data.success == "success") {
                        this.$bvToast.toast("Kayıt başarıyla kaydedildi.", {
                            title: `Başarılı..`,
                            variant: "success",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.getCategories();
                        _this.isAddCategory = false;
                        _this.isAddSubCategory = false;
                        _this.isAddMainCategory = false;
                        _this.categoryOverlay = false;
                    }
                    else {
                        this.$bvToast.toast("Kayıt başarısız.Bilgilerinizi kontrol ediniz.", {
                            title: `Başarısız..`,
                            variant: "danger",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.categoryOverlay = false;
                    }
                });
            }
            else {
                if (_this.categoryError.title == "" || _this.categoryError.title == null || _this.categoryError.title == undefined)
                    _this.categoryError.title = true;
            }
        },
        async updateCategory() {
            var _this = this;
            if (_this.category.title != "") {
                _this.categoryOverlay = true;
                _this.category.user_id = _this.$store.state._userId;
                _this.$repositories.category.update(_this.category.id,_this.category)
                    .then(res => {
                    if (res.data.success == "success") {
                        this.$bvToast.toast("Kayıt başarıyla güncellendi.", {
                            title: `Başarılı..`,
                            variant: "success",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.getCategories();
                        _this.isAddCategory = false;
                        _this.isAddSubCategory = false;
                        _this.isAddMainCategory = false;
                        _this.categoryOverlay = false;
                    }
                    else {
                        this.$bvToast.toast("Kayıt başarısız.Bilgilerinizi kontrol ediniz.", {
                            title: `Başarısız..`,
                            variant: "danger",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.categoryOverlay = false;
                    }
                });
            }
            else {
                if (_this.categoryError.title == "" || _this.categoryError.title == null || _this.categoryError.title == undefined)
                    _this.categoryError.title = true;
            }
        },
        async deleteCategory() {
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
        getProductsByCategory(){
            const _this = this;
            let reqData = {
                "language":"tr",
                "category_id":_this.category.id,
                "filters": {
                    "property1":null,
                    "property2":null,
                    "brands":null,
                    "attributes":null,
                    "price":null,
                    "categories":null
                },
                "paging": {
                    "start": (_this.paging.currentPage - 1) * 10,
                    "end":_this.paging.end
                }
            }

            _this.$repositories.product.getProductByCategoryForAdmin(reqData)
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
        saveCategoryLanguage(){
            var _this = this;
            if (_this.categoryLanguage.title != "") {
                _this.categoryLanguage.category_id = _this.category.id;
                _this.categoryLanguage.user_id = _this.$store.state._userId;
                _this.categoryLanguageOverlay = true;

                let reqData = [];
                reqData.push(_this.categoryLanguage);
                _this.$repositories.category.updateLanguage(reqData)
                .then(res => {
                    if (res.data.success == "success") {
                        this.$bvToast.toast("Kayıt başarıyla güncellendi.", {
                            title: `Başarılı..`,
                            variant: "success",
                            autoHideDelay: 500,
                            solid: true
                        });
                    }
                    else {
                        this.$bvToast.toast("Kayıt başarısız.Bilgilerinizi kontrol ediniz.", {
                            title: `Başarısız..`,
                            variant: "danger",
                            autoHideDelay: 500,
                            solid: true
                        });
                    }

                    _this.categoryLanguageOverlay = false;
                })
                .catch(err => {
                    _this.categoryLanguageOverlay = false;
                })
            }
            else {
                if (!_this.$checkIsNullOrEmpty(_this.categoryLanguageError.title))
                    _this.categoryLanguageError.title = true;
            }
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
        resetCategory(){
            this.category = {
                id: null,
                title: null,
                short_description: null,
                description: null,
                parent_id: null,
                sort: null,
                is_active: null,
                seo_link: null,
                seo_title: null,
                seo_description: null,
                seo_keywords: null,
                show_in_menu: null,
                show_in_mobile: null,
                show_category: null,
                field1: null,
                field2: null,
                field3: null,
                field4: null,
                image:null,
                icon:null
            }
        },
        resetCategoryLanguage(){
            this.categoryLanguage = {
                category_id: null,
                title: null,
                short_description: null,
                description: "",
                seo_title: null,
                seo_description: null,
                seo_keywords: null,
                language:this.selectedLanguage,
                user_id:null
            }
        },
        async blurDiscountedPrice(e, product_code) {
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
        async blurSellingPrice(e, product_code) {
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
        }
    },
    async created() {
        this.getCategories();
        this.getLanguages();
    }
}
</script>
 
<style>
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
 