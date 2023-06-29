<template>
    <div class="admin-header-menu" id="adminHeaderMenu">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <h3>
                        Üst Menü
                    </h3>

                    <div class="row mt-4">
                        <div class="col-3" v-if="headerMenus" id="headerMenuList">
                            <div class="row mb-2">
                                <div class="col-12 col-md-6">
                                    <button type="button" class="w-100 btn btn-primary btn-sm" @click="addMainHeaderMenu">
                                        <small>
                                            + Ana Menü Ekle
                                        </small>
                                    </button>
                                </div>
                            </div>
                            <ul v-if="headerMenus.length > 0" class="float-left w-100 border border-secondary p-2 rounded list-unstyled">
                                <li v-for="(menu,index) in headerMenus" :key="`category${index}`">
                                    <ul class="list-unstyled">
                                        <TreeMenu class="item"
                                            :item="menu"
                                            @selectHeaderMenu="selectHeaderMenu"
                                            @addSubHeaderMenu="addSubHeaderMenu"
                                            :isAddButton="true"
                                        />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="col-9" v-if="isAddHeaderMenu || isEditHeaderMenu">
                            <b-overlay :show="headerMenuOverlay" no-wrap></b-overlay>
                            <b-card no-body>
                                <b-tabs v-model="tabIndex" pills card>
                                    <b-tab title="Menü">
                                        <div class="row" v-if="!isAddSubHeaderMenu">
                                            <div class="col-12">
                                                <div class="row mb-4">
                                                    <b-form-group class="col-12" id="type_group" label="Menü tipi" label-for="type_input" description="">
                                                        <b-form-select class="border-dark" v-model="headerMenu.type" name="menuType">
                                                            <b-form-select-option value=null disabled>Tipi Seçiniz</b-form-select-option>
                                                            <b-form-select-option value=1>Kategori</b-form-select-option>
                                                            <b-form-select-option value=2>Marka</b-form-select-option>
                                                            <b-form-select-option value=3>İç Sayfa</b-form-select-option>
                                                            <b-form-select-option value=4>Manuel</b-form-select-option>
                                                        </b-form-select>
                                                    </b-form-group>                                           
                                                </div>
                                                <div class="row mb-3" v-if="headerMenu.type == 1">
                                                    <div class="col-12">
                                                        <ul class="float-left w-100 border border-secondary p-2 rounded list-unstyled">
                                                            <li v-for="(category,index) in categories" :key="`category${index}`">
                                                                <ul class="list-unstyled">
                                                                    <TreeCategory class="item"
                                                                        :item="category"
                                                                        @selectCategory="selectCategory"
                                                                        :isAddButton="false"
                                                                        :selectedId="headerMenu.type_id"
                                                                    />
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="row mb-3" v-if="headerMenu.type == 2">
                                                    <b-form-group class="col-12" id="brand_group" :label="$t('brand')"
                                                        label-for="brand_input" description="">
                                                        <v-select placeholder="Marka Seçiniz" :options="brands" label="name" @input="selectBrand"></v-select>
                                                    </b-form-group>        
                                                </div>
                                                <div class="row mb-3" v-if="headerMenu.type == 3">
                                                    <b-form-group class="col-12" id="pages_group" label="İç Sayfa"
                                                        label-for="pages_input" description="">
                                                        <v-select placeholder="Sayfa Seçiniz" :options="pages" label="name" @input="selectPage"></v-select>
                                                    </b-form-group>        
                                                </div>
                                            </div>
                                        </div>
                                        
                                        
                                        <b-form class="row" v-if="headerMenu.type != null || isAddSubHeaderMenu">
                                            <b-form-group class="col-12" id="name_group" label="Menü Adı"
                                                label-for="name_input" description="" required>
                                                <b-form-input :class="[headerMenuError.name ? 'border-danger':'border-dark']"
                                                    id="name_input" v-model="headerMenu.name" type="text" name="name"
                                                    placeholder="Menü adı" @click="headerMenuError.name=false" required>
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="url_group" label="Menü Link"
                                                label-for="url_input" description="">
                                                <b-form-input class="'border-dark'"
                                                    id="url_input" v-model="headerMenu.url" type="text" name="name"
                                                    placeholder="Menü Link">
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group class="col-12 col-md-6" id="is_active_group" label="Aktif/Pasif"
                                                label-for="is_active_input" description="Kategorinin sitede görünürlüğünü kontrol eder.">
                                                <b-form-checkbox v-model="headerMenu.is_active" value="1" unchecked-value="0"  switch size="md"></b-form-checkbox>
                                            </b-form-group>

                                            <b-form-group class="col-12 col-md-6" id="sort_group" label="Sıralama"
                                                label-for="sort_input" description="">
                                                <b-form-input class="'border-dark'"
                                                    id="sort_input" v-model="headerMenu.sort" type="number" name="sort"
                                                    placeholder="Sıra">
                                                </b-form-input>
                                            </b-form-group>
                                        </b-form>
                                    </b-tab>
                                    <b-tab title="Görsel">
                                        <b-form class="row">
                                            <div class="col-12">
                                                <div class="row mb-3">
                                                    <h4 class="col-12">
                                                        Görsel
                                                    </h4>
                                                </div>
                                                <div class="row">
                                                    <b-form-group class="col-12" id="image_group" label="Menü Görseli" label-for="image_input" description="">
                                                        <b-form-file @change="saveHeaderMenuImage" v-model="image" :state="Boolean(image)" placeholder="Bir dosya seçin veya buraya bırakın..." drop-placeholder="Dosyayı buraya bırakın..."></b-form-file>
                                                    </b-form-group> 
                                                    <div class="col-md-4">
                                                        <b-button @click="saveHeaderMenuImage" class="w-100" variant="success" size="md" v-if="!headerMenu.image">Resim Ekle</b-button>
                                                        <b-button @click="deleteHeaderMenuImage" class="w-100" variant="danger" size="md" v-else>Sil</b-button>                    
                                                    </div>
                                                    <div class="col-md-8">
                                                        <img :src="headerMenu.image" v-if="headerMenu.image">
                                                        <span class="float-left w-100" v-else>
                                                            <b-alert show variant="warning" class="px-3 py-2">
                                                                Eklenmiş resim bulunmamaktadır.
                                                            </b-alert>
                                                        </span>
                                                    </div> 
                                                </div>
                                            </div>
                                        </b-form>
                                    </b-tab>
                                    <b-tab title="Banner">
                                        <b-form class="row">
                                        </b-form>
                                    </b-tab>
                                    <b-tab title="Ek Alanlar">
                                        <b-form class="row">
                                            <b-form-group class="col-12" id="field1_group" label="Ek Alan 1"
                                                label-for="field1_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="field1_input" v-model="headerMenu.field1" type="text"
                                                    name="field1" placeholder="Ek Alan 1" rows="2" max-rows="6"></b-form-textarea>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="field2_group" label="Ek Alan 2"
                                                label-for="field2_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="field2_input" v-model="headerMenu.field2" type="text"
                                                    name="field2" placeholder="Ek Alan 2" rows="2" max-rows="6"></b-form-textarea>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="field13_group" label="Ek Alan 3"
                                                label-for="field3_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="field3_input" v-model="headerMenu.field3" type="text"
                                                    name="field3" placeholder="Ek Alan 3" rows="2" max-rows="6"></b-form-textarea>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="field4_group" label="Ek Alan 4"
                                                label-for="field4_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="field4_input" v-model="headerMenu.field4" type="text"
                                                    name="field4" placeholder="Ek Alan 4" rows="2" max-rows="6"></b-form-textarea>
                                            </b-form-group>
                                        </b-form>
                                    </b-tab>
                                    <b-tab title="Dil Ayarları" v-if="isEditHeaderMenu">
                                        <b-overlay :show="headerMenuLanguageOverlay" no-wrap></b-overlay>
                                        <b-form class="row">
                                            <b-form-group class="col-12 mb-3" id="language_group" label="Dil"
                                                label-for="language_input" description="" required>
                                                <v-select v-model="selectedLanguage" placeholder="Dil Seçiniz" :options="languages" label="name" :reduce="l => l.code" @input="changeLanguage"></v-select>
                                            </b-form-group>

                                            <div class="col-12" v-if="$checkIsNullOrEmpty(selectedLanguage)">
                                                <div class="row">
                                                    <b-form-group class="col-12" id="header_menu_language_name_group" label="Menü Adı"
                                                        label-for="header_menu_language_name_input" description="" required>
                                                        <b-form-input :class="[headerMenuLanguageError.name ? 'border-danger':'border-dark']"
                                                            id="header_menu_language_name_input" v-model="headerMenuLanguage.name" type="text" name="header_menu_language_name"
                                                            placeholder="Menü adı" @click="headerMenuLanguageError.name=false" required>
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
                                </b-tabs>
                            </b-card>
                            <div class="col-12 mt-4">
                                <div class="row">
                                    <div class="col-12 col-md-6 m-auto">
                                        <b-button class="col-12" type="button" @click="saveHeaderMenu" squared
                                            size="lg" variant="success" v-if="isAddHeaderMenu">Kaydet</b-button>
                                        <b-button class="col-12" type="button" @click="updateHeaderMenu" squared
                                            size="lg" variant="primary" v-if="isEditHeaderMenu">Güncelle</b-button>
                                        
                                        <b-button class="col-12 mt-4 text-danger" type="button" @click="deleteHeaderMenu" squared
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
    name: "AdminHeaderMenu",
    middleware: "adminAuthenticated",
    layout: "admin",
    components: {
        'editor': Editor
    },
    head() {
        return {
            title: "Admin Üst Menü Sayfası"
        };
    },
    data() {
        return {
            languages:[],
            categories:[],
            brands:[],
            pages:[
                {
                    name:"Anasayfa",
                    url:"/"
                },
                {
                    name:"Blog",
                    url:"/blog"
                },
                {
                    name:"İletişim",
                    url:"/contact"
                },
            ],
            headerMenus: [],
            tabIndex:0,
            selectedLanguage:null,
            isAddHeaderMenu: false,
            isEditHeaderMenu: false,
            isAddMainHeaderMenu: false,
            isAddSubHeaderMenu: false,
            isEditHeaderMenu: false,
            headerMenuOverlay: false,
            headerMenuLanguageOverlay:false,
            headerMenu: {
                id: null,
                parent_id: null,
                name: null,
                url: null,
                image: null,
                banners: null,
                is_active: null,
                type: null,
                type_id: null,
                sort: 0,
                field1: null,
                field2: null,
                field3: null,
                field4: null,
                user_id:null
            },
            headerMenuError: {
                name: false
            },
            headerMenuLanguage:{
                header_menu_id: null,
                name: null,
                url: null,
                image: null,
                banners: null,
                field1: null,
                field2: null,
                field3: null,
                field4: null,
                language:this.selectedLanguage,
                user_id:null
            },
            headerMenuLanguageError: {
                title: false
            },
            image:undefined
        };
    },
    props: {},
    methods: {
        selectHeaderMenu(data){
            this.tabIndex = 0;
            this.selectedLanguage = null;
            this.resetHeaderMenuLanguage();
            this.headerMenu = data;
            this.isAddHeaderMenu = false;
            this.isAddMainHeaderMenu = false;
            this.isEditHeaderMenu = true;
            if(data.parent_id)
                this.isAddSubHeaderMenu = true;
            else
                this.isAddSubHeaderMenu = false;
            
        },
        selectCategory(data){
            this.headerMenu.type_id = data.id;
            this.headerMenu.name = data.title;
            this.headerMenu.url = data.seo_link;
        },
        selectBrand(data){
            this.headerMenu.type_id = data.id;
            this.headerMenu.name = data.name;
            this.headerMenu.url = data.seo_link;
        },
        selectPage(data){
            this.headerMenu.type_id = null;
            this.headerMenu.name = data.name;
            this.headerMenu.url = data.url;
        },
        saveHeaderMenuImage() {
            var _this = this;
            let formData = new FormData();
            formData.append('file', _this.image);

            if(_this.image)
            {
                _this.$repositories.image.upload(formData)
                .then(res => {
                    _this.headerMenu.image = res.data.location;                 
                })
                .catch(err => {
                    console.log(err);
                });
            }
            
        },
        async deleteHeaderMenuImage(){
            var _this = this;
            _this.$repositories.image.delete({"filename":_this.category.image})
            .then(res => {
                if(res && res.data)
                {
                    _this.headerMenu.image = null;
                    _this.image = undefined;
                }
                else
                {
                    _this.headerMenu.image = null;
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
        addMainHeaderMenu() {
            this.resetHeaderMenu();
            this.isAddHeaderMenu = true;
            this.isEditHeaderMenu = false;
            this.isAddSubHeaderMenu = false;
            this.isAddMainHeaderMenu = true;
        },
        addSubHeaderMenu(id) {
            this.resetHeaderMenu();
            this.headerMenu.parent_id = id;
            this.isAddHeaderMenu = true;
            this.isEditHeaderMenu = false;
            this.isAddMainHeaderMenu = false;
            this.isAddSubHeaderMenu = true;
        },
        editCategory(data) {
            this.category = data;
            this.isEditHeaderMenu = true;
            this.isAddHeaderMenu = false;
            this.isAddMainHeaderMenu = false;
            this.isAddSubHeaderMenu = false;
        },
        async saveHeaderMenu() {
            var _this = this;
            if (_this.$checkIsNullOrEmpty(_this.headerMenu.name)) {
                _this.headerMenuOverlay = true;
                _this.headerMenu.user_id = _this.$store.state._userId;
                _this.$repositories.header_menu.create(_this.headerMenu)
                    .then(res => {
                    if (res.data.success == "success") {
                        this.$bvToast.toast("Kayıt başarıyla kaydedildi.", {
                            title: `Başarılı..`,
                            variant: "success",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.getHeaderMenus();
                        _this.isAddHeaderMenu = false;
                        _this.isAddSubHeaderMenu = false;
                        _this.isAddMainHeaderMenu = false;
                        _this.headerMenuOverlay = false;
                    }
                    else {
                        this.$bvToast.toast("Kayıt başarısız.Bilgilerinizi kontrol ediniz.", {
                            title: `Başarısız..`,
                            variant: "danger",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.headerMenuOverlay = false;
                    }
                });
            }
            else {
                if (!_this.$checkIsNullOrEmpty(_this.headerMenu.name))
                    _this.headerMenuError.name = true;
            }
        },
        async updateHeaderMenu() {
            var _this = this;
            if (_this.$checkIsNullOrEmpty(_this.headerMenu.name)) {
                _this.headerMenuOverlay = true;
                _this.headerMenu.user_id = _this.$store.state._userId;
                _this.$repositories.header_menu.update(_this.headerMenu)
                    .then(res => {
                    if (res.data.success == "success") {
                        this.$bvToast.toast("Kayıt başarıyla güncellendi.", {
                            title: `Başarılı..`,
                            variant: "success",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.getHeaderMenus();
                        _this.isAddHeaderMenu = false;
                        _this.isAddSubHeaderMenu = false;
                        _this.isAddMainHeaderMenu = false;
                        _this.headerMenuOverlay = false;
                    }
                    else {
                        this.$bvToast.toast("Kayıt başarısız.Bilgilerinizi kontrol ediniz.", {
                            title: `Başarısız..`,
                            variant: "danger",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.headerMenuOverlay = false;
                    }
                });
            }
            else {
                if (!_this.$checkIsNullOrEmpty(_this.headerMenu.name))
                    _this.headerMenuError.name = true;
            }
        },
        async deleteHeaderMenu() {
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
                            _this.isAddHeaderMenu = false;
                            _this.isAddSubHeaderMenu = false;
                            _this.isAddMainHeaderMenu = false;
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
        async getHeaderMenus() {
            var _this = this;
            _this.$repositories.header_menu.getHeaderMenuForAdmin().then(res => {
                var map = {}, node, roots = [], i, results = res.data.response;
                for (i = 0; i < results?.length; i += 1) {
                    map[results[i].id] = i;
                    results[i]["children"] = [];
                }
                for (i = 0; i < results?.length; i += 1) {
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
                _this.headerMenus = roots;
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
                    _this.resetHeaderMenuLanguage();
            });
        },
        resetHeaderMenu(){
            this.headerMenu = {
                id: null,
                parent_id: null,
                name: null,
                url: null,
                image: null,
                banners: null,
                is_active: null,
                type: null,
                type_id: null,
                sort: 0,
                field1: null,
                field2: null,
                field3: null,
                field4: null,
                user_id:null
            }
        },
        resetHeaderMenuLanguage(){
            this.headerMenuLanguage = {
                header_menu_id: null,
                name: null,
                url: null,
                image: null,
                banners: null,
                field1: null,
                field2: null,
                field3: null,
                field4: null,
                language:this.selectedLanguage,
                user_id:null
            }
        }
    },
    async created() {
        this.getHeaderMenus();
        this.getCategories();
        this.getBrands();
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
 