<template>
    <div class="admin-property" id="adminProperty">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <h3>
                        Alt Ürünler
                    </h3>

                    <div class="row mt-4">
                        <div class="col-3" id="propertyCategories">
                            <div class="row mb-2">
                                <div class="col-12">
                                    <button type="button" class="w-100 btn btn-primary btn-sm" @click="addPropertyCategory">
                                        <small>
                                            + Ana Kategori Ekle
                                        </small>
                                    </button>
                                </div>
                            </div>
                            <ul class="float-left w-100 border border-secondary p-2 rounded list-unstyled" v-if="property_categories && property_categories.length > 0">
                                <li v-for="(PC,index) in property_categories" :key="`category${index}`">
                                    <button class="btn w-100 text-left" :class="[selectedPropertyCategoryId == PC.id ? 'btn-success':'']" type="button" :name="`property_category_${index}`" @click="selectPropertyCategory(PC)">
                                        {{ PC.name }}
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div class="col-9" v-if="isEditPropertyCategory">
                            <b-overlay :show="propertyOverlay" no-wrap></b-overlay>
                            <b-card no-body>
                                <b-tabs v-model="tabIndex" pills card>
                                    <b-tab title="Alt Ürün Kategori">
                                        <b-overlay :show="propertyCategoryLanguageOverlay" no-wrap></b-overlay>
                                        <b-form class="row">
                                            <b-form-group class="col-12 col-md-9" id="property_category_name_group" label="Alt Ürün Kategori Adı"
                                                label-for="property_category_name_input" description="" required>
                                                <b-form-input :class="[propertyCategoryError.name ? 'border-danger':'border-dark']"
                                                    id="property_category_name_input" v-model="property_category.name" type="text" name="property_category_name"
                                                    placeholder="Alt Ürün Kategori adı" @click="propertyCategoryError.name=false" required>
                                                </b-form-input>
                                            </b-form-group>

                                            <b-form-group class="col-12 col-md-3" id="property_category_sort_group" label="Sıralama"
                                                label-for="property_category_sort_input" description="" required>
                                                <b-form-input id="property_category_sort_input" v-model="property_category.sort" type="number" name="property_category_sort"
                                                    placeholder="Sıra">
                                                </b-form-input>
                                            </b-form-group>

                                            <div class="col-12 mt-4">
                                                <div class="row">
                                                    <h5 class="col-12 mb-3">
                                                        Diller
                                                    </h5>
                                                    <b-form-group v-for="(L,index) in property_language_category" :key="L.language" class="col-12" :id="`property_category_language_name_group_${L.language}`" :label="`${L.language_name} (${L.language})`"
                                                        :label-for="`property_category_language_name_input_${L.language}`" description="" required>
                                                        <b-form-input class="border-dark"
                                                            :id="`property_category_language_name_input_${L.language}`" v-model="L.name" type="text" :name="`property_category_language_name_${L.language}`"
                                                            placeholder="Alt Ürün Kategori adı">
                                                        </b-form-input>
                                                    </b-form-group>

                                                    <div class="col-12">
                                                        <b-button class="float-right" type="button" @click="savePropertyCategory"
                                                            size="sm" variant="success">Kaydet</b-button>
                                                    </div>
                                                </div>
                                            </div>
                                        </b-form>
                                    </b-tab>
                                    <b-tab title="Alt Ürünler">
                                        <div class="col-12 mb-2">
                                            <button type="button" class="btn btn-sm btn-success" @click="createNewProperty">
                                                + Yeni Özellik Ekle
                                            </button>
                                        </div>
                                        <div class="col-12">
                                            <table class="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Adı</th>
                                                        <th>Görsel</th>
                                                        <th>Kod</th>
                                                        <th>Durum</th>
                                                        <th>Sıra</th>
                                                        <th>Dil Ayarları</th>
                                                        <th>Sil</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(P,index) in properties" :key="`property${index}`">
                                                        <td>
                                                            <b-form-input class="border-dark"
                                                                :id="`property_name_input_${index}`" v-model="P.name" type="text" :name="`property_name_${index}`"
                                                                placeholder="Alt Ürün adı">
                                                            </b-form-input>
                                                        </td>
                                                        <td>
                                                            <img :src="P.image" style="max-height: 40px;"/>
                                                        </td>
                                                        <td>
                                                            <b-form-input class="border-dark"
                                                                :id="`property_code_input_${index}`" v-model="P.code" type="text" :name="`property_code_${index}`"
                                                                placeholder="Alt Ürün Kodu">
                                                            </b-form-input>
                                                        </td>
                                                        <td>
                                                            <b-form-checkbox v-model="P.is_active" :name="`check-button-${index}`" value=1 unchecked-value=0 switch></b-form-checkbox>
                                                        </td>
                                                        <td>
                                                            <b-form-input class="border-dark"
                                                                :id="`property_sort_input_${index}`" v-model="P.sort" type="number" :name="`property_sort_${index}`"
                                                                placeholder="Sıra">
                                                            </b-form-input>
                                                        </td>
                                                        <td>
                                                            <b-button varinat="primary" size="sm" @click="propertyLanguageSettings(P)">
                                                                Dil Ayarları
                                                            </b-button>
                                                        </td>
                                                        <td>
                                                            <b-icon icon="trash" variant="danger" font-scale="1" role="button" id="propertyDelete"
                                                                    @click="deleteProperty(P.id)"></b-icon>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-12">
                                            <b-button class="float-right" type="button" @click="saveProperty"
                                                size="sm" variant="success">Kaydet</b-button>
                                        </div>
                                    </b-tab>
                                </b-tabs>
                            </b-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="popup" v-show="isPropertyLanguage">
                <div class="popup-content col-md-4 p-4">
                    <div class="popup-close" @click="isPropertyLanguage = false;">
                        &times;
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <b-overlay :show="propertyLanguageOverlay" no-wrap></b-overlay>
                            <b-form class="row">
                                <div class="col-12 mt-4">
                                    <div class="row">
                                        <h5 class="col-12 mb-3">
                                            Diller
                                        </h5>
                                        <b-form-group v-for="(L,index) in property_languages" :key="L.language" class="col-12" :id="`property_language_name_group_${L.language}`" :label="`${L.language_name} (${L.language})`"
                                            :label-for="`property_language_name_input_${L.language}`" description="" required>
                                            <b-form-input class="border-dark"
                                                :id="`property_language_name_input_${L.language}`" v-model="L.name" type="text" :name="`property_language_name_${L.language}`"
                                                placeholder="Alt ürün adı">
                                            </b-form-input>
                                        </b-form-group>

                                        <div class="col-12">
                                            <b-button class="float-right" type="button" @click="savePropertyLanguage"
                                                size="sm" variant="success">Kaydet</b-button>
                                        </div>
                                    </div>
                                </div>
                            </b-form>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
 
<script>
export default
    {
    name: "AdminCategory",
    middleware: "adminAuthenticated",
    layout: "admin",
    head() {
        return {
            title: "Admin Alt Ürünler Sayfası"
        };
    },
    data() {
        return {
            property_categories:[],
            properties:[],
            property: {

            },
            property:{
                name:null,
                property_category_id:null,
                image:null,
                code:null,
                is_active:null,
                user_id:null
            },
            propertyError:{
                name:false
            },
            property_category: {
                name:null
            },
            propertyCategoryError: {
                name:null
            },
            property_languages:[],
            property_language_category: [],
            selectedPropertyCategoryId:null,
            languages:[],
            selectedLanguage:null,
            isEditPropertyCategory:false,
            propertyOverlay:false,
            propertyLanguageOverlay:false,
            propertyCategoryLanguageOverlay:false,
            isPropertyLanguage:false,
            tabIndex:0
        };
    },
    props: {},
    methods: {
        propertyLanguageSettings(p) {
            const _this = this;
            _this.$repositories.property.getPropertyLanguages(p.id).then(res => {
                _this.isPropertyLanguage = true;
                _this.property_languages = _this.languages.map(item => {
                    return {
                        property_id : p.id,
                        name: res.data.response?.find(x => x.language == item.code)?.name || "",
                        language: item.code,
                        language_name: item.name,
                        user_id: _this.$store.state._userId 
                    }
                })
            }); 
        },
        selectPropertyCategory(pc) {
            var _this = this;
            _this.property_category = pc;
            _this.selectedPropertyCategoryId = pc.id;
            _this.$repositories.property.getAllPropertyByCategoryId(pc.id).then(res => {
                _this.isEditPropertyCategory = true;
                _this.properties = res.data.response;

                _this.property_language_category = _this.languages.map(item => {
                    return {
                        property_category_id : pc.id,
                        name: pc.languages?.find(x => x.language == item.code)?.name || "",
                        language: item.code,
                        language_name: item.name,
                        user_id: _this.$store.state._userId 
                    }
                })
            }); 
        },
        addPropertyCategory(){
            var _this = this;
            let reqData = [
                {
                    "name":"Property Category",
                    "sort":0,
                    "is_active":0,
                    "user_id": _this.$store.state._userId
                }
            ];
            _this.$repositories.property.createPropertyCategory(reqData).then(res => {
                _this.getPropertyCategory();
            }); 
        },
        createNewProperty(){
            var _this = this;
            let reqData = [
                {
                    "name":"Property",
                    "image":null,
                    "code":null,
                    "is_active":0,
                    "property_category_id":_this.property_category.id,
                    "sort":0,
                    "user_id": _this.$store.state._userId
                }
            ];
            _this.$repositories.property.createProperty(reqData).then(res => {
                _this.$repositories.property.getAllPropertyByCategoryId(_this.property_category.id).then(res => {
                    _this.properties = res.data.response;
                });
            });
        },
        savePropertyCategory(){
            var _this = this;
            _this.$repositories.property.updateLanguagePropertyCategory(_this.property_language_category).then(res => {
                _this.getPropertyCategory();
            });

            _this.property_category["user_id"] = _this.$store.state._userId;
            _this.property_category["property_category_id"] = _this.property_category.id;
            _this.$repositories.property.updatePropertyCategory([_this.property_category]).then(res => {
                _this.getPropertyCategory();
            });
        },
        savePropertyLanguage(){
            var _this = this;
            _this.isPropertyLanguage = true;
            _this.$repositories.property.updateLanguageProperty(_this.property_languages).then(res => {
                _this.isPropertyLanguage = false;
                _this.property_languages = [];
                _this.$bvToast.toast('İşlem başarılı.', {
                    title: `Başarılı..`,
                    variant: 'success',
                    autoHideDelay: 500,
                    solid: true
                });
            })
            .catch(err => {
                _this.isPropertyLanguage = false;
            });
        },
        saveProperty(){
            var _this = this;
            _this.properties = _this.properties.map(item => {
                item["user_id"] = _this.$store.state._userId;
                return item;
            });

            _this.$repositories.property.updateProperty(_this.properties).then(res => {
                console.log(res);
                _this.$repositories.property.getAllPropertyByCategoryId(_this.property_category.id).then(response => {
                    _this.properties = response.data.response;
                }); 
            });
        },
        deletePropertyCategory(){

        },
        deleteProperty(id){
            const _this = this;
            _this.$bvModal.msgBoxConfirm("Özelliği silmek istediğinize emin misiniz?",{
               size: 'sm',
               buttonSize: 'sm',
               okVariant: 'success',
               okTitle: 'Evet',
               cancelVariant:'danger',
               cancelTitle: 'Hayır',
               footerClass: 'py-2 px-4',
               hideHeaderClose: false
            })
            .then(value => {
                if(value)
                {
                    let reqData = [
                        {
                            property_id : id,
                            user_id : _this.$store.state._userId
                        }
                    ]
                    _this.$repositories.property.deleteProperty(reqData).then(res => {
                        if(res.data.response[0].status == true) {
                            _this.$bvToast.toast('Özellik başarıyla silindi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });

                            _this.$repositories.property.getAllPropertyByCategoryId(_this.property_category.id).then(res => {
                                _this.properties = res.data.response;
                            });
                        }
                        else {
                            _this.$bvToast.toast('İşlem başarısız.', {
                                title: `Başarısız..`,
                                variant: 'error',
                                autoHideDelay: 500,
                                solid: true
                            });
                        }
                    });
                } 
            })
        },
        async getPropertyCategory() {
            var _this = this;
            _this.$repositories.property.getAllPropertyCategory().then(res => {
                _this.property_categories = res.data.response;
            });
        },
        async getLanguages() {
            var _this = this;
            _this.$repositories.language.getAll().then(res => {
                _this.languages = res.data.response;
            });
        }
    },
    async created() {
        this.getPropertyCategory();
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
 