<template>
    <div class="admin-model" id="adminModel">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <div class="row">
                        <div class="col-12">
                            <h3>
                                Modeller
                                <button @click="addModelPopup" id="addModel"
                                    class="btn float-right text-secondary">
                                    + Ekle
                                </button>
                            </h3>        
                        </div>
                    </div>
                    
                    <div class="row justify-content-end">
                        <b-form-group class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" id="search_group" label="Arama"
                            label-for="search_input" description="" required>
                            <b-form-input class="float-right border-dark"
                                id="search_input" v-model="search" type="text"
                                name="search" placeholder="Ara.." size="sm"  @keydown="searchKeyDown" @keyup="searchKeyUp"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <table class="table table-bordered table-sm" id="adminModelTable">
                                <thead class="table-secondary">
                                    <tr>
                                        <th>İsim</th>
                                        <th>Logo</th>
                                        <th>Seo Link</th>
                                        <th>Seo Başlık</th>
                                        <th>Seo Anahtarları</th>
                                        <th>Seo Açıklama</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="table-light">
                                    <tr v-for="(B, index) in models" :key="`bodyModel${index}`">
                                        <td>{{ B.name }}</td>
                                        <td>
                                            <img class="p-1 border border-secondary rounded" v-if="B.logo" :src="B.logo" :alt="B.name" style="max-width: 50px;"/>
                                        </td>
                                        <td>{{ B.seo_link }}</td>
                                        <td>{{ B.seo_title }}</td>
                                        <td>{{ B.seo_keywords }}</td>
                                        <td>{{ B.seo_description }}</td>
                                        <td>
                                            <button @click="editModelPopup(B)" id="editModel"
                                                class="btn btn-sm btn-outline-primary px-4">
                                                Düzenle
                                            </button>
                                        </td>
                                        <td>
                                            <button @click="deleteModel(B.id)" id="deleteModel"
                                                class="btn btn-sm btn-outline-danger px-4">
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <b-pagination v-model="paging.currentPage" :total-rows="paging.total" :per-page="20"
                            :first-text="$t('first')" :prev-text="$t('prev')" :next-text="$t('next')" :last-text="$t('last')" pills>
                            </b-pagination>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="popup" v-show="isAddModel || isEditModel">
                <div class="popup-content col-md-4 p-4">
                    <div class="popup-close" @click="isAddModel = false; isEditModel = false;">
                        &times;
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <b-overlay :show="modelOverlay" no-wrap></b-overlay>
                            <b-form class="row">
                                <b-form-group class="col-md-12" id="name_group" label="Model Adı"
                                    label-for="name_input" description="" required>
                                    <b-form-input :class="[modelError.name ? 'border-danger' : 'border-dark']"
                                        id="name_input" v-model="model.name" type="text"
                                        name="name" placeholder="Model adı"
                                        @click="modelError.name = false" required></b-form-input>
                                </b-form-group>

                                <div class="col-12">
                                    <div class="row mb-3">
                                        <h4 class="col-12">
                                            Logo
                                        </h4>
                                    </div>
                                    <div class="row">
                                        <b-form-group class="col-12" id="image_group" label="Model Logosu" label-for="image_input" description="">
                                            <b-form-file @change="saveImage" v-model="image" :state="Boolean(image)" placeholder="Bir dosya seçin veya buraya bırakın..." drop-placeholder="Dosyayı buraya bırakın..."></b-form-file>
                                        </b-form-group> 
                                        <div class="col-md-4">
                                            <b-button @click="saveImage" class="w-100" variant="success" size="md" v-if="!model.logo">Resim Ekle</b-button>
                                            <b-button @click="deleteImage" class="w-100" variant="danger" size="md" v-else>Sil</b-button>                    
                                        </div>
                                        <div class="col-md-8">
                                            <img :src="model.logo" v-if="model.logo" style="max-height: 50px;">
                                            <span class="float-left w-100" v-else>
                                                <b-alert show variant="warning" class="px-3 py-2">
                                                    Eklenmiş resim bulunmamaktadır.
                                                </b-alert>
                                            </span>
                                        </div> 
                                    </div>
                                </div>

                                <b-form-group class="col-md-12" id="seo_title_group" label="Seo Başlık"
                                    label-for="seo_title_input" description="" required>
                                    <b-form-input class="border-dark"
                                        id="seo_title_input" v-model="model.seo_title" type="text"
                                        name="seo_title" placeholder="Seo Başlık"></b-form-input>
                                </b-form-group>

                                <b-form-group class="col-md-12" id="seo_keywords_group" label="Seo Anahtarlar"
                                    label-for="seo_keywords_input" description="Birden fazla anahtar eklemek için virgül(,) ile ayırabilirsiniz." required>
                                    <b-form-input class="border-dark"
                                        id="seo_keywords_input" v-model="model.seo_keywords" type="text"
                                        name="seo_keywords" placeholder="Seo Anahtarlar"></b-form-input>
                                </b-form-group>

                                <b-form-group class="col-12" id="seo_description_group" label="Seo Açıklama"
                                    label-for="seo_description_input" description="" required>
                                    <b-form-textarea class="border-dark"
                                        id="seo_description_input" v-model="model.seo_description" type="text"
                                        name="seo_description" placeholder="Seo Açıklama" rows="2" max-rows="6"></b-form-textarea>
                                </b-form-group>

                                <b-form-group class="col-12" id="is_active_group" label="Aktif/Pasif" label-for="is_active_input" description="">
                                    <b-form-select class="border-dark" v-model="model.is_active" name="isActiveCategory">
                                        <b-form-select-option value=1 selected>Aktif</b-form-select-option>
                                        <b-form-select-option value=0 selected>Pasif</b-form-select-option>
                                    </b-form-select>
                                </b-form-group>

                                <div class="col-12 mt-4">
                                    <div class="row">
                                        <div class="col-12 col-md-6 m-auto">
                                            <b-button class="col-12" type="button" @click="saveModel" squared
                                                size="lg" variant="primary" v-if="isAddModel">Kaydet</b-button>
                                            <b-button class="col-12" type="button" @click="updateModel" squared
                                                size="lg" variant="primary" v-if="isEditModel">Güncelle</b-button>
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
        name: 'AdminModel',
        middleware: 'adminAuthenticated',
        layout: 'admin',
        head() {
            return {
                title: "Admin Model Sayfası"
            }
        },
        data() {
            return {
                models: [],
                isAddModel: false,
                isEditModel: false,
                modelOverlay: false,
                model: {
                    id: null,
                    name: null,
                    logo: null,
                    seo_keywords: null,
                    seo_title: null,
                    seo_keywords: null,
                    seo_description: null,
                    is_active:1
                },
                modelError: {
                    name: false
                },
                image:undefined,
                search:null,
                paging: {
                    currentPage: 1,
                    total: undefined,
                    start: 0,
                    end: 30
                },
                searchInterval:undefined,
	        	keyHistory:undefined
            }
        },
        watch: {
            'paging.currentPage'() {
                this.getModels();
            }
        },
        props: {

        },
        methods: {
            searchKeyDown(){
	        	var _this = this;
	        	clearInterval(_this.searchInterval);	        	
	        },
	        searchKeyUp(){	        	
				var _this = this;
				_this.searchInterval = setInterval(() => {
					if(_this.search != _this.keyHistory)
					{
						_this.getModels();
						_this.keyHistory = _this.search;
					}					
				} , 1000);
	        },
            saveImage() {
                var _this = this;
                let formData = new FormData();
                formData.append('file', _this.image);

                if(_this.image)
                {
                    _this.$repositories.image.upload(formData)
                    .then(res => {
                        _this.model.logo = res.data.location;                 
                    })
                    .catch(err => {
                        console.log(err);
                    });
                }
                
            },
            async deleteImage(){
                var _this = this;
                _this.$repositories.image.delete({"filename":_this.model.logo})
                .then(res => {
                    if(res && res.data)
                    {
                        _this.model.logo = null;
                        _this.image = undefined;
                    }
                    else
                    {
                        _this.model.logo = null;
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
            addModelPopup() {
                this.resetModel();
                this.isAddModel = true;
            },
            editModelPopup(data) {
                this.model = data;
                this.isEditModel = true;
            },
            async saveModel() {
                var _this = this;
                if (_this.$checkIsNullOrEmpty(_this.model.name)) {
                    _this.model.user_id = _this.$store.state._userId;
                    let reqData = [];
                    reqData.push(_this.model);
                    _this.modelOverlay = true;
                    _this.$repositories.model.create(reqData)
                    .then(res => {
                        if (res.data.success == "success") {
                            _this.$bvToast.toast('Kayıt başarıyla eklendi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getModels();
                            _this.isAddModel = false;
                            _this.modelOverlay = false;
                        }
                        else {
                            _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.modelOverlay = false;
                        }
                    })
                    .catch(err => {
                        _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.modelOverlay = false;
                    });
                }
                else
                    _this.modelError.name = true;
            },
            async updateModel() {
                var _this = this;
                if (_this.$checkIsNullOrEmpty(_this.model.name)) {
                    _this.model.user_id = _this.$store.state._userId;
                    let reqData = [];
                    reqData.push(_this.model);
                    _this.modelOverlay = true;
                    _this.$repositories.model.update(reqData)
                    .then(res => {
                        if (res.data.success == "success") {
                            _this.$bvToast.toast('Kayıt başarıyla güncellendi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getModels();
                            _this.isEditModel = false;
                            _this.modelOverlay = false;
                        }
                        else {
                            _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.modelOverlay = false;
                        }
                    })
                    .catch(err => {
                        _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.modelOverlay = false;
                    });
                }
                else
                    _this.modelError.name = true;
            },
            async deleteModel(id) {
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Modelyı silmek istediğinize emin misiniz?', {
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    okTitle: 'Evet',
                    cancelVariant: 'danger',
                    cancelTitle: 'Hayır',
                    footerClass: 'py-2 px-4',
                    hideHeaderClose: false
                })
                .then(value => {
                    if (value) {
                        let reqData = [
                            {
                                id: id,
                                user_id: _this.$store.state._userId
                            }
                        ];
                        _this.$repositories.model.delete(reqData)
                            .then(res => {
                                if (res.data.success == "success") {
                                    _this.$bvToast.toast('Model başarıyla silindi.', {
                                        title: `Başarılı..`,
                                        variant: 'success',
                                        autoHideDelay: 500,
                                        solid: true
                                    });
                                    _this.getModels();
                                }
                                else {
                                    _this.$bvToast.toast('Model silinemedi.Sayfayı yenileyip tekrar deneyiniz.',
                                    {
                                        title: `Başarısız..`,
                                        variant: 'danger',
                                        autoHideDelay: 1500,
                                        solid: true
                                    });
                                }
                            });
                    }
                })
                .catch(err => {
                    _this.$bvToast.toast('Model silinemedi.Sayfayı yenileyip tekrar deneyiniz.',
                    {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 1500,
                        solid: true
                    });
                });
            },
            async getModels() {
                var _this = this;
                let reqData = {
                    search: _this.search,
                    paging:{
                        start: (_this.paging.currentPage - 1) * 30,
                        end: _this.paging.end
                    }
                }
                _this.$repositories.model.getModelByFilter(reqData)
                    .then(res => {
                        if (res) {
                            _this.models = res.data.response.models;
                            _this.paging.total = res.data.response.total;
                        }
                    });
            },
            resetModel(){
                this.model = {
                    id: null,
                    name: null,
                    logo: null,
                    seo_title: null,
                    seo_keywords: null,
                    seo_description: null,
                    is_active: 1
                }
            }
        },
        async created() {
            this.getModels();
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
 