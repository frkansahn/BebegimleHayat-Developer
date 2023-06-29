<template>
    <div class="admin-blog_category" id="adminBlogCategory">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <h3>
                        Makale Kategorileri
                    </h3>

                    <div class="row mt-4">
                        <div class="col-3" v-if="categories" id="categoriesList">
                            <div class="row mb-2">
                                <div class="col-12 col-md-6">
                                    <button type="button" class="w-100 btn btn-primary btn-sm" @click="addMainCategories">
                                        <small>
                                            + Ana Kategori Ekle
                                        </small>
                                    </button>
                                </div>
                            </div>
                            <ul v-if="categories.length > 0" class="float-left w-100 border border-secondary p-2 rounded list-unstyled">
                                <li v-for="(category,index) in categories" :key="`category${index}`">
                                    <ul class="list-unstyled">
                                        <treeBlogCategory class="item"
                                            :item="category"
                                            @selectCategory="selectCategory"
                                            @addSubCategory="addSubCategory"
                                            @selectCategoryMenu="selectCategory"
                                            :isAddButton="true"
                                        />
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="col-9" v-if="isAddCategory || isEditCategory">
                            <b-overlay :show="overlay" no-wrap></b-overlay>
                            <b-card no-body>
                                <b-tabs v-model="tabIndex" pills card>
                                    <b-tab title="Kategori">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="row mb-4">
                                                    <div class="col-12 mb-4" v-if="isAddSubCategory">
                                                        <h6>
                                                            {{ findCategoryName }}
                                                        </h6>
                                                    </div>
                                                    <b-form-group class="col-12" id="name_group" label="Kategori Adı"
                                                        label-for="name_input" description="" required>
                                                        <b-form-input :class="[categoryError.category_name ? 'border-danger':'border-dark']"
                                                            id="name_input" v-model="category.category_name" type="text" name="name"
                                                            placeholder="Kategori adı" @click="categoryError.name=false" required>
                                                        </b-form-input>
                                                    </b-form-group> 
                                                    
                                                    <b-form-group class="col-12" id="description_group" label="Kategori Açıklaması"
                                                        label-for="description_input" description="" required>
                                                        <editor
                                                            v-model="category.description"
                                                            api-key="2tc56hde9q30zeb835bczxj559w0h7vtwb9znqpa08y8e605"
                                                            :init="init"
                                                            :name="`editor_${category.id}`" required /> 
                                                    </b-form-group>
                                                    
                                                    <b-form-group class="col-12 col-md-3" id="is_active_group" label="Pasif/Aktif"
                                                        label-for="is_active_input" description="Kategorinin sitede görünürlüğünü kontrol eder.">
                                                        <b-form-checkbox v-model="category.is_active" :value="1" :unchecked-value="0"  switch size="md"></b-form-checkbox>
                                                    </b-form-group>

                                                    <b-form-group class="col-12 col-md-3" id="is_menu_group" label="Hayır/Evet"
                                                        label-for="is_menu_input" description="Kategorinin üst menüde görünürlüğünü kontrol eder.">
                                                        <b-form-checkbox v-model="category.is_menu" :value="1" :unchecked-value="0"  switch size="md"></b-form-checkbox>
                                                    </b-form-group>

                                                    <b-form-group class="col-12 col-md-3" id="is_baby_dictionary_group" label="Hayır/Evet"
                                                        label-for="is_baby_dictionary_input" description="Bebek sözlüğü için anaysayfada görünecek kategoriyi kontrol eder.">
                                                        <b-form-checkbox v-model="category.is_baby_dictionary" @change="changeBabyDictionary(category)" :value="1" :unchecked-value="0"  switch size="md"></b-form-checkbox>
                                                    </b-form-group>

                                                    <b-form-group class="col-12 col-md-3" id="sort_group" label="Sıralama"
                                                        label-for="sort_input" description="">
                                                        <b-form-input class="'border-dark'"
                                                            id="sort_input" v-model="category.sort" type="number" name="sort"
                                                            placeholder="Sıra">
                                                        </b-form-input>
                                                    </b-form-group>

                                                    <b-form-group class="col-12 col-lg-6" id="baby_dictionary_title_group" label="Bebek Sözlüğü Başlık"
                                                        label-for="baby_dictionary_title_input" description="" v-if="isEditCategory && category.is_baby_dictionary == '1'">
                                                        <b-form-input class="'border-dark'"
                                                            id="baby_dictionary_title_input" v-model="category.baby_dictionary_title" type="text" name="baby_dictionary_title"
                                                            placeholder="Bebek Sözlüğü Başlık">
                                                        </b-form-input>
                                                    </b-form-group>

                                                    <b-form-group class="col-12 col-lg-6" id="baby_dictionary_description_group" label="Bebek Sözlüğü Açıklama"
                                                        label-for="baby_dictionary_description_input" description="" required v-if="isEditCategory && category.is_baby_dictionary == '1'">
                                                        <b-form-textarea class="'border-dark'"
                                                            id="baby_dictionary_description_input" v-model="category.baby_dictionary_description" name="baby_dictionary_description"
                                                            placeholder="Bebek Sözlüğü Açıklama">
                                                        </b-form-textarea>
                                                    </b-form-group>
                                                </div>
                                            </div>
                                        </div>
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
                                                    <b-form-group class="col-12" id="image_group" label="Kategori Görseli" label-for="image_input" description="">
                                                        <b-form-file @input="saveCategoryImage" v-model="image" :state="Boolean(image)" placeholder="Bir dosya seçin veya buraya bırakın..." drop-placeholder="Dosyayı buraya bırakın..."></b-form-file>
                                                    </b-form-group> 
                                                    <div class="col-md-4">
                                                        <b-button @click="saveCategoryImage" class="w-100" variant="success" size="md" v-if="!category.image">Resim Ekle</b-button>
                                                        <b-button @click="deleteCategoryImage" class="w-100" variant="danger" size="md" v-else>Sil</b-button>                    
                                                    </div>
                                                    <div class="col-md-8">
                                                        <ElementImage v-if="category.image" :src="`/Data/image/small/${category.image}`" :alt="category.category_name"/>
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
                                    <b-tab title="Seo Alanları">
                                        <b-form class="row">
                                            <b-form-group class="col-12" id="seo_link_group" label="Seo Link" label-for="seo_link_input" description="">                            
                                                <div class="d-flex align-items-center justify-content-center">
                                                    <b-form-input class="float-left w-75" :state="seoLinkSuccess" :class="[seoLinkSuccess == undefined ? 'border-dark':'']" id="seo_link_input" v-model="category.seo_link" type="text" name="seo_link" placeholder="Seo linkini giriniz" @click="categoryError.seo_link=false" @blur="controlSeoLink" @keypress="keypressSeoLink($event)" required></b-form-input>
                                                    <b-button class="float-left w-25 ml-2 seo-link-control" type="button" @click="controlSeoLink" squared size="sm" variant="info">
                                                        <small>Kontrol Et</small>
                                                    </b-button>                            
                                                </div>
                                                <span class="link-no-use text-danger" v-if="seoLinkSuccess == false">
                                                    <small>Link kullanılamaz</small>
                                                </span>
                                            </b-form-group>
                                            <b-form-group class="col-12" id="seo_title_group" label="Seo Başlık"
                                                label-for="seo_title_input" description="" required>
                                                <b-form-input class="border-dark"
                                                    id="seo_title_input" v-model="category.seo_title" type="text" name="seo_title"
                                                    placeholder="Seo Başlık">
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="seo_keywords_group" label="Seo Anahtarları"
                                                label-for="seo_keywords_input" description="" required>
                                                <b-form-input class="border-dark"
                                                    id="seo_keywords_input" v-model="category.seo_keywords" type="text" name="seo_keywords"
                                                    placeholder="Seo Anahtarları">
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group class="col-12" id="seo_description_group" label="Seo Açıklaması"
                                                label-for="seo_description_input" description="" required>
                                                <b-form-textarea class="border-dark"
                                                    id="seo_description_input" v-model="category.seo_description" name="seo_description"
                                                    placeholder="Seo Açıklaması">
                                                </b-form-textarea>
                                            </b-form-group>
                                        </b-form>
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
                                        
                                        <b-button class="col-12 mt-4 text-danger" type="button" @click="deleteCategory(category.id)" squared
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
    name: "AdminBlogCategory",
    middleware: "adminAuthenticated",
    layout: "admin",
    components: {
        'editor': Editor
    },
    head() {
        return {
            title: "Admin Makale Kategorileri Sayfası"
        };
    },
    data() {
        return {
            categories:[],
            tabIndex:0,
            isAddCategory: false,
            isEditCategory: false,
            isAddSubCategory:false,
            isAddMainCategory:false,
            overlay: false,
            category: {
                id: null,
                parent_id: null,
                category_name: null,
                description: null,
                image: null,
                is_active: 1,
                type: null,
                sort: 0,
                seo_description: null,
                seo_title: null,
                seo_keywords:null,
                seo_link:null,
                is_menu:null,
                baby_dictionary_title:null,
                baby_dictionary_description:null
            },
            categoryError: {
                category_name: false,
                seo_link:false
            },
            image:undefined,
            seoLinkSuccess:undefined,
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
    computed : {
        findCategoryName() {
            var returnData;;            
            for(var i=0; i < this.categories.length; i++){
                var result = this.searchTree(this.categories[i], this.category.parent_id);
                if(result)
                    returnData = result;
            }
            
            return returnData?.category_name || null;
        }
    },
    methods: {
        searchTree(element, id){

            if(element.id == id){
                return element;
            }
            else if (element.children != null){
                var result = null;
                for(var j=0; result == null && j < element.children.length; j++){
                    result = this.searchTree(element.children[j], id);
                }
                return result;
            }
        },
        convertTurkishCharacter() {
            const _this = this;
            let text =_this.category.category_name;
            if(text) {
                var trMap = {
                    'çÇ': 'c',
                    'ğĞ': 'g',
                    'şŞ': 's',
                    'üÜ': 'u',
                    'ıİ': 'i',
                    'öÖ': 'o'
                };
                for (var key in trMap) {
                    text = text?.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
                }
                _this.category.seo_link = text?.replace(/[^-a-zA-Z0-9\s]+/ig, '')
                    .replace(/\s/gi, "-")
                    .replace(/[-]+/gi, "-")
                    .toLowerCase();
            }
        },
        async controlSeoLink(){
            return new Promise((resolve,reject) => {
                var _this = this;
                if(_this.$checkIsNullOrEmpty(_this.category.seo_link))
                {
                    _this.$repositories.blog_category.controlLink(_this.category.seo_link,_this.category.id)
                    .then(res => {
                        if(res.data.use)
                            _this.seoLinkSuccess = true;
                        else
                            _this.seoLinkSuccess = false;

                        resolve(true);
                    })
                    .catch(err => {
                        resolve(true);
                        _this.seoLinkSuccess = false;
                    })
                }
                else {
                    resolve(true);
                    _this.seoLinkSuccess = false;
                    _this.$bvToast.toast('Seo link boş olamaz.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 1500,
                        solid: true
                    });
                }
            })
        },
        keypressSeoLink(e){
            var a = new RegExp('^[A-Za-z0-9_-]+$');
            if(!a.test(e.key))
            {
            e.preventDefault();
            }
        },
        changeBabyDictionary(category) {
            this.$repositories.blog_category.updateBabyDictionary(category.id,category.is_baby_dictionary)
            .then(res => {
                if(res && res.data.success == 'success') {
                    this.$bvToast.toast("Kayıt başarıyla güncellendi.", {
                        title: `Başarılı..`,
                        variant: "success",
                        autoHideDelay: 500,
                        solid: true
                    });
                }
            })
        },
        selectCategory(data){
            this.tabIndex = 0;
            this.category = data;
            this.isAddCategory = false;
            this.isAddMainCategory = false;
            this.isEditCategory = true;
            if(data.parent_id)
                this.isAddSubCategory = true;
            else
                this.isAddSubCategory = false;
            
        },
        saveCategoryImage() {
            var _this = this;
            let formData = new FormData();
            formData.append('file', _this.image);

            if(_this.image)
            {
                _this.$repositories.image.upload(formData)
                .then(res => {
                    _this.category.image = res.data.location;  
                    
                    if(_this.isEditCategory)
                        _this.updateCategory();           
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
                    if(_this.isEditCategory)
                        _this.updateCategory();  
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
        addMainCategories() {
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
            _this.controlSeoLink();
            if (_this.seoLinkSuccess && _this.$checkIsNullOrEmpty(_this.category.category_name)) {
                _this.overlay = true;
                _this.$repositories.blog_category.create(_this.category)
                    .then(res => {
                    if (res.data.success == "success") {
                        this.$bvToast.toast("Kayıt başarıyla kaydedildi.", {
                            title: `Başarılı..`,
                            variant: "success",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.getBlogCategories();
                        _this.isAddCategory = false;
                        _this.isAddSubCategory = false;
                        _this.isAddMainCategory = false;
                        _this.overlay = false;
                    }
                    else {
                        this.$bvToast.toast("Kayıt başarısız.Bilgilerinizi kontrol ediniz.", {
                            title: `Başarısız..`,
                            variant: "danger",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.overlay = false;
                    }
                });
            }
            else {
                if (!_this.$checkIsNullOrEmpty(_this.category.category_name))
                    _this.categoryError.category_name = true;

                if(!_this.seoLinkSuccess)
                    _this.$bvToast.toast('Seo link hatalı.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 1500,
                        solid: true
                    });
            }
        },
        async updateCategory() {
            var _this = this;
            _this.controlSeoLink();
            if (_this.seoLinkSuccess && _this.$checkIsNullOrEmpty(_this.category.category_name)) {
                _this.overlay = true;
                _this.$repositories.blog_category.update(_this.category)
                    .then(res => {
                    if (res.data.success == "success") {
                        this.$bvToast.toast("Kayıt başarıyla güncellendi.", {
                            title: `Başarılı..`,
                            variant: "success",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.getBlogCategories();
                        _this.isAddCategory = false;
                        _this.isAddSubCategory = false;
                        _this.isAddMainCategory = false;
                        _this.overlay = false;
                    }
                    else {
                        this.$bvToast.toast("Kayıt başarısız.Bilgilerinizi kontrol ediniz.", {
                            title: `Başarısız..`,
                            variant: "danger",
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.overlay = false;
                    }
                });
            }
            else {
                if (!_this.$checkIsNullOrEmpty(_this.category.category_name))
                    _this.categoryError.category_name = true;

                if(!_this.seoLinkSuccess)
                    _this.$bvToast.toast('Seo link hatalı.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 1500,
                        solid: true
                    });
            }
        },
        async deleteCategory(id) {
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
                    _this.overlay = true;
                    _this.$repositories.blog_category.delete({id:id})
                    .then(res => {
                        if (res.data.success == "success") {
                            _this.$bvToast.toast("Kategori başarıyla silindi.", {
                                title: `Başarılı..`,
                                variant: "success",
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getBlogCategories();
                            _this.isAddCategory = false;
                            _this.isAddSubCategory = false;
                            _this.isAddMainCategory = false;
                        }
                        else {
                            _this.$bvToast.toast("Kategori silinemedi.Sayfayı yenileyip tekrar deneyiniz.", {
                                title: `Başarısız..`,
                                variant: "danger",
                                autoHideDelay: 1500,
                                solid: true
                            });
                        }

                        _this.overlay = false;
                    })
                    .catch(err => {
                        _this.overlay = false;
                    });
                }
            })
        },
        async getBlogCategories() {
            var _this = this;
            _this.$repositories.blog_category.get().then(res => {
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
        resetCategory(){
            this.category = {
                id: null,
                parent_id: null,
                category_name: null,
                description: null,
                image: null,
                is_active: 1,
                type: null,
                sort: 0,
                seo_link:null,
                seo_description: null,
                seo_title: null,
                seo_keywords:null,
                is_menu:null,
                baby_dictionary_title:null,
                baby_dictionary_description:null
            }
        }
    },
    async created() {
        this.getBlogCategories()
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
 