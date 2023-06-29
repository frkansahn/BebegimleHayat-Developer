<template>
    <div class="admin-supplier" id="adminSupplier">
        <AdminHeader />
        <div class="admin-content-wrapper">
            <div class="row">
                <div class="col-12 mb-4">
                    <div class="row">
                        <div class="col-12">
                            <h3>
                                Tedarikçiler
                                <button @click="addSupplierPopup" id="addSupplier"
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
                            <table class="table table-bordered table-sm" id="adminSupplierTable">
                                <thead class="table-secondary">
                                    <tr>
                                        <th>İsim</th>
                                        <th>E-Mail</th>
                                        <th>Telefon</th>
                                        <th>Yetkili</th>
                                        <th>Adres</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="table-light">
                                    <tr v-for="(S, index) in suppliers" :key="`bodySupplier${index}`">
                                        <td>{{ S.name }}</td>
                                        <td>{{ S.email }}</td>
                                        <td>{{ S.phone }}</td>
                                        <td>{{ S.contact }}</td>
                                        <td>{{ S.address }}</td>
                                        <td>
                                            <button @click="editSupplierPopup(S)" id="editSupplier"
                                                class="btn btn-sm btn-outline-primary px-4">
                                                Düzenle
                                            </button>
                                        </td>
                                        <td>
                                            <button @click="deleteSupplier(S.id)" id="deleteSupplier"
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
            <div class="popup" v-show="isAddSupplier || isEditSupplier">
                <div class="popup-content col-md-4 p-4">
                    <div class="popup-close" @click="isAddSupplier = false; isEditSupplier = false;">
                        &times;
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <b-overlay :show="supplierOverlay" no-wrap></b-overlay>
                            <b-form class="row">
                                <b-form-group class="col-md-12" id="name_group" label="Tedarikçi Adı"
                                    label-for="name_input" description="" required>
                                    <b-form-input :class="[supplierError.name ? 'border-danger' : 'border-dark']"
                                        id="name_input" v-model="supplier.name" type="text"
                                        name="name" placeholder="Tedarikçi adı"
                                        @click="supplierError.name = false" required></b-form-input>
                                </b-form-group>

                                <b-form-group class="col-md-12" id="email_group" label="E-Mail"
                                    label-for="email_input" description="" required>
                                    <b-form-input class="border-dark"
                                        id="email_input" v-model="supplier.email" type="email"
                                        name="email" placeholder="E-Mail"></b-form-input>
                                </b-form-group>

                                <b-form-group class="col-md-12" id="phone_group" label="Telefon"
                                    label-for="phone_input" description="" required>
                                    <b-form-input class="border-dark"
                                        id="phone_input" v-model="supplier.phone" type="tel"
                                        name="phone" placeholder="Telefon"></b-form-input>
                                </b-form-group>

                                <b-form-group class="col-md-12" id="contact_group" label="Yetkili"
                                    label-for="contact_input" description="" required>
                                    <b-form-input class="border-dark"
                                        id="contact_input" v-model="supplier.contact" type="text"
                                        name="contact" placeholder="Yetkili"></b-form-input>
                                </b-form-group>

                                <b-form-group class="col-12" id="address_group" label="Adres"
                                    label-for="address_input" description="" required>
                                    <b-form-textarea class="border-dark"
                                        id="address_input" v-model="supplier.address" type="text"
                                        name="address" placeholder="Adres" rows="2" max-rows="6"></b-form-textarea>
                                </b-form-group>

                                <div class="col-12 mt-4">
                                    <div class="row">
                                        <div class="col-12 col-md-6 m-auto">
                                            <b-button class="col-12" type="button" @click="saveSupplier" squared
                                                size="lg" variant="primary" v-if="isAddSupplier">Kaydet</b-button>
                                            <b-button class="col-12" type="button" @click="updateSupplier" squared
                                                size="lg" variant="primary" v-if="isEditSupplier">Güncelle</b-button>
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
        name: 'AdminSupplier',
        middleware: 'adminAuthenticated',
        layout: 'admin',
        head() {
            return {
                title: "Admin Tedarikçi Sayfası"
            }
        },
        data() {
            return {
                suppliers: [],
                isAddSupplier: false,
                isEditSupplier: false,
                supplierOverlay: false,
                supplier: {
                    id: null,
                    name: null,
                    email: null,
                    phone: null,
                    contact: null,
                    address: null,
                },
                supplierError: {
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
                this.getSuppliers();
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
						_this.getSuppliers();
						_this.keyHistory = _this.search;
					}					
				} , 1000);
	        },
            addSupplierPopup() {
                this.resetSupplier();
                this.isAddSupplier = true;
            },
            editSupplierPopup(data) {
                this.supplier = data;
                this.isEditSupplier = true;
            },
            async saveSupplier() {
                var _this = this;
                if (_this.$checkIsNullOrEmpty(_this.supplier.name)) {
                    _this.supplier.user_id = _this.$store.state._userId;
                    let reqData = [];
                    reqData.push(_this.supplier);
                    _this.supplierOverlay = true;
                    _this.$repositories.supplier.create(reqData)
                    .then(res => {
                        if (res.data.success == "success") {
                            _this.$bvToast.toast('Kayıt başarıyla eklendi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getSuppliers();
                            _this.isAddSupplier = false;
                            _this.supplierOverlay = false;
                        }
                        else {
                            _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.supplierOverlay = false;
                        }
                    })
                    .catch(err => {
                        _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.supplierOverlay = false;
                    });
                }
                else
                    _this.supplierError.name = true;
            },
            async updateSupplier() {
                var _this = this;
                if (_this.$checkIsNullOrEmpty(_this.supplier.name)) {
                    _this.supplier.user_id = _this.$store.state._userId;
                    let reqData = [];
                    reqData.push(_this.supplier);
                    _this.supplierOverlay = true;
                    _this.$repositories.supplier.update(reqData)
                    .then(res => {
                        if (res.data.success == "success") {
                            _this.$bvToast.toast('Kayıt başarıyla güncellendi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.getSuppliers();
                            _this.isEditSupplier = false;
                            _this.supplierOverlay = false;
                        }
                        else {
                            _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.supplierOverlay = false;
                        }
                    })
                    .catch(err => {
                        _this.$bvToast.toast('Kayıt başarısız.Bilgilerinizi kontrol ediniz.', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                        _this.supplierOverlay = false;
                    });
                }
                else
                    _this.supplierError.name = true;
            },
            async deleteSupplier(id) {
                var _this = this;
                _this.$bvModal.msgBoxConfirm('Tedarikçiyı silmek istediğinize emin misiniz?', {
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
                        _this.$repositories.supplier.delete(reqData)
                            .then(res => {
                                if (res.data.success == "success") {
                                    _this.$bvToast.toast('Tedarikçi başarıyla silindi.', {
                                        title: `Başarılı..`,
                                        variant: 'success',
                                        autoHideDelay: 500,
                                        solid: true
                                    });
                                    _this.getSuppliers();
                                }
                                else {
                                    _this.$bvToast.toast('Tedarikçi silinemedi.Sayfayı yenileyip tekrar deneyiniz.',
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
                    _this.$bvToast.toast('Tedarikçi silinemedi.Sayfayı yenileyip tekrar deneyiniz.',
                    {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 1500,
                        solid: true
                    });
                });
            },
            async getSuppliers() {
                var _this = this;
                let reqData = {
                    search: _this.search,
                    paging:{
                        start: (_this.paging.currentPage - 1) * 30,
                        end: _this.paging.end
                    }
                }
                _this.$repositories.supplier.getSupplierByFilter(reqData)
                    .then(res => {
                        if (res) {
                            _this.suppliers = res.data.response.suppliers;
                            _this.paging.total = res.data.response.total;
                        }
                    });
            },
            resetSupplier(){
                this.supplier = {
                    id: null,
                    name: null,
                    email: null,
                    phone: null,
                    contact: null,
                    address: null
                }
            }
        },
        async created() {
            this.getSuppliers();
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
 