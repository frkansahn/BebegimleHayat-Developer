<template>
    <div class="col-12 px-4" id="addressList">
        <b-overlay :show="pageOverlay" no-wrap></b-overlay>
        <div class="row rounded">
            <div 
                v-for="(A,index) in addresses" 
                :key="`address_${index}`" 
                class="mb-2 pb-2 border-bottom border-top border-right address-border-l rounded" 
                :class="[selectAddress && (selectAddress.invoice == A.id || selectAddress.delivery == A.id) ? 'active':'',className]" 
                id="address" 
            >
                <div class="row py-3">
                    <div class="col-12 mb-2">
                        <h4>
                            {{A.title}}
                        </h4>
                    </div>
                    <div class="col-12" v-if="A.type == 1">
                        <span class="mr-1" v-if="A.company_name">
                            {{A.company_name}} -
                        </span>
                        <span class="mr-1" v-if="A.tax_office">
                            {{A.tax_office}} -
                        </span>
                        <span class="mr-1" v-if="A.tax_number">
                            {{A.tax_number}}
                        </span>
                    </div>
                    <div class="col-12">
                        <span class="mr-1" v-if="A.country_name">
                            {{A.country_name}} -
                        </span>
                        <span class="mr-1" v-if="A.state_name">
                            {{A.state_name}} -
                        </span>
                        <span class="mr-1" v-if="A.city_name">
                            {{A.city_name}}
                        </span>
                    </div>
                    <div class="col-12">
                        <span >
                            {{A.address}}
                        </span>
                    </div>
                    <div class="col-12" v-if="A.zipCode">
                        <span>
                            {{$t('zipCode')}} : {{A.zipCode}}
                        </span>
                    </div>
                    <div class="col-12">
                        <button type="button" class="d-flex align-items-center justify-content-center p-0 btn btn-sm btn-outline-secondary border rounded float-right" style="width:30px;height: 30px;" @click="editAddressPopup(A)">
                            <b-icon-pencil font-scale=".8"></b-icon-pencil>
                        </button>
                        <button type="button" class="d-flex align-items-center justify-content-center p-0 btn btn-sm btn-outline-danger border rounded float-right mr-2" style="width:30px;height: 30px;" @click="deleteAddress(A)">
                            <b-icon-x font-scale="1"></b-icon-x>
                        </button>
                    </div>
                    <div class="col-12 position-absolute" v-if="selectAddress">
                        <b-form-radio
                            :id="`addressDeliveryAddress${A.id}`"
                            class="float-right mr-3"
                            :name="`delivery-address-${A.id}`"
                            v-model="selectAddress.delivery"
                            :value="A.id"
                        > {{$t('deliveryAddress')}} </b-form-radio >

                        <b-form-radio
                            :id="`addressInvoiceAddress${A.id}`"
                            class="float-right mr-3"
                            :name="`invoice-address-${A.id}`"
                            v-model="selectAddress.invoice"
                            :value="A.id"
                        > {{$t('invoiceAddress')}} </b-form-radio>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="address-popup" :title="$t('addAddress')">
            <div>
                <b-overlay :show="addressOverlay" no-wrap></b-overlay>
                <b-form class="row">
                    <div class="col-12 d-flex align-items-center justify-content-center" id="addressType">
                        <b-form-radio
                            id="addressType0"
                            class="mx-2"
                            name="address-type-0"
                            v-model="address.type"
                            :value="0"
                        > {{$t('individual')}} </b-form-radio>

                        <b-form-radio
                            id="addressType1"
                            class="mx-2"
                            name="address-type-1"
                            v-model="address.type"
                            :value="1"
                        > {{$t('corporate')}} </b-form-radio>
                    </div>
                    
                    <b-form-group class="col-12" id="address_title_group" :label="$t('addressTitle')"
                        label-for="address_title_input" description="" required>
                        <b-form-input :class="[addressError.title ? 'border-danger':'border-dark']"
                            id="address_title_input" v-model="address.title" type="text" name="address_title"
                            :placeholder="$t('addressTitle')" @click="addressError.title=false" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-12" id="name_surname_group" :label="$t('nameSurname')"
                        label-for="name_surname_input" description="" required>
                        <b-form-input :class="[addressError.name_surname ? 'border-danger':'border-dark']"
                            id="name_surname_input" v-model="address.name_surname" type="text" name="address_name_surname"
                            :placeholder="$t('nameSurname')" @click="addressError.name_surname=false" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group v-if="address.type == 1" class="col-12" id="company_name_group" :label="$t('companyName')"
                        label-for="company_name_input" description="" required>
                        <b-form-input :class="[addressError.company_name ? 'border-danger':'border-dark']"
                            id="company_name_input" v-model="address.company_name" type="text" name="company_name"
                            :placeholder="$t('companyName')" @click="addressError.company_name=false" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group v-if="address.type == 1" class="col-12" id="tax_office_group" :label="$t('taxOffice')"
                        label-for="tax_office_input" description="" required>
                        <b-form-input :class="[addressError.tax_office ? 'border-danger':'border-dark']"
                            id="tax_office_input" v-model="address.tax_office" type="text" name="tax_office"
                            :placeholder="$t('taxOffice')" @click="addressError.tax_office=false" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group v-if="address.type == 1" class="col-12" id="tax_number_group" :label="$t('taxNumber')"
                        label-for="tax_number_input" description="" required>
                        <b-form-input :class="[addressError.tax_number ? 'border-danger':'border-dark']"
                            id="tax_number_input" v-model="address.tax_number" type="text" name="tax_number"
                            :placeholder="$t('taxNumber')" @click="addressError.tax_number=false" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-12 mb-3" id="address_country_group" :label="$t('country')"
                        label-for="address_country_input" description="">
                        <v-select v-model="address.country_id" :placeholder="$t('countrySelect')" :options="countries" label="name" :reduce="c => c.id" @input="getStates()"></v-select>
                    </b-form-group>

                    <b-form-group class="col-12 mb-3" id="address_state_group" :label="$t('state')"
                        label-for="address_state_input" description="">
                        <v-select v-model="address.state_id" :placeholder="$t('stateSelect')" :options="states" label="name" :reduce="s => s.id" @input="getCities()"></v-select>
                    </b-form-group>

                    <b-form-group class="col-12 mb-3" id="address_city_group" :label="$t('city')"
                        label-for="address_city_input" description="">
                        <v-select v-model="address.city_id" :placeholder="$t('citySelect')" :options="cities" label="name" :reduce="c => c.id"></v-select>
                    </b-form-group>

                    <b-form-group class="col-12" id="address_group" :label="$t('address')"
                        label-for="address_input" description="" required>
                        <b-form-textarea :class="[addressError.address ? 'border-danger':'border-dark']"
                            id="address_input" v-model="address.address" type="text"
                            name="address-input" :placeholder="$t('address')" rows="2" max-rows="6"
                            @click="addressError.address=false"
                        ></b-form-textarea>
                    </b-form-group>

                    <b-form-group v-if="address.type == 0" class="col-12" id="zip_code_group" :label="$t('zipCode')"
                        label-for="zip_code_input" description="">
                        <b-form-input class="border-dark"
                            id="zip_code_input" v-model="address.zip_code" type="text" name="zip_code"
                            :placeholder="$t('zipCode')">
                        </b-form-input>
                    </b-form-group>
                </b-form>
            </div>
            <template #modal-footer>
                <div class="w-100">
                    <b-button variant="success" size="sm" class="float-right mx-2"
                        @click="addAddress" v-if="addressPopupType == 'add'">
                        {{ $t('save') }}
                    </b-button>
                    <b-button variant="secondary" size="sm" class="float-right mx-2"
                        @click="editAddress" v-if="addressPopupType == 'edit'">
                        {{ $t('edit') }}
                    </b-button>
                    <b-button variant="outline-danger" size="sm" class="float-right mx-2"
                        @click="addressPopupClose">
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
        name: 'AddressList',
        props:["addresses","selectAddress","className"],
        data() {
            return {
                pageOverlay:false,
                addressOverlay:false,
                addressPopupType: null,
                address:{
                    id:null,
                    type:0,
                    title:null,
                    name_surname:null,
                    address:null,
                    country_id:null,
                    state_id:null,
                    city_id:null,
                    zip_code:null,
                    is_delivery_address: null,
				    is_invoice_address: null,
                    company_name:null,
                    tax_office:null,
                    tax_number:null
                },
                addressError:{
                    title:false,
                    address:false,
                    name_surname:false,
                    company_name:false,
                    tax_office:false,
                    tax_number:false
                },
                countries:[],
                states:[],
                cities:[]
            }
        },
        methods:{
            scrollToView(element){
                let offsetTop = document.querySelector(element).offsetTop;
                window.scrollTo(0, offsetTop + 80)
            },
            newAddressPopup(){
                this.resetAddress();
                this.states = [];
                this.cities = [];
                this.address.name_surname = this.$store.state.customer.user.name + " " + this.$store.state.customer.user.surname;
                this.addressPopupType = 'add';
                this.$bvModal.show('address-popup');
            },
            editAddressPopup(address){
                this.address = address;
                this.getStates(this.address.country_id);
                this.getCities(this.address.state_id);
                this.addressPopupType = 'edit';
                this.$bvModal.show('address-popup');
            },
            addAddress(){
                const _this= this;
                if (!_this.$checkIsNullOrEmpty(_this.address.title)) {
                    _this.addressError.title = true;
                    _this.scrollToView('#address_title_group');
                    return false;
                }
                else
                    _this.addressError.title = false;

                if (!_this.$checkIsNullOrEmpty(_this.address.address)) {
                    _this.addressError.address = true;
                    _this.scrollToView('#address_group');
                    return false;
                }
                else
                    _this.addressError.address = false;

                if (!_this.$checkIsNullOrEmpty(_this.address.name_surname)) {
                    _this.addressError.name_surname = true;
                    _this.scrollToView('#name_surname_group');
                    return false;
                }
                else
                    _this.addressError.name_surname = false;

                if (_this.address.type == 1) {
                    if (!_this.$checkIsNullOrEmpty(_this.address.company_name)) {
                        _this.addressError.company_name = true;
                        _this.scrollToView('#company_name_group');
                        return false;
                    }
                    else
                        _this.addressError.company_name = false;

                    if (!_this.$checkIsNullOrEmpty(_this.address.tax_office)) {
                        _this.addressError.tax_office = true;
                        _this.scrollToView('#tax_office_group');
                        return false;
                    }
                    else
                        _this.addressError.tax_office = false;

                    if (!_this.$checkIsNullOrEmpty(_this.address.tax_number)) {
                        _this.addressError.tax_number = true;
                        _this.scrollToView('#tax_number_group');
                        return false;
                    }
                    else
                        _this.addressError.tax_number = false;
                }

                _this.addressOverlay = true;

                _this.$repositories.customer.addAddress(_this.address)
                .then(res => {
                    if(res && res.data.success == 'success'){
                        _this.$bvToast.toast('Adres başarıyla kaydedildi.', {
                            title: `Başarılı..`,
                            variant: 'success',
                            autoHideDelay: 500,
                            solid: true
                        });

                        _this.$emit('getCustomerAddress');
                        _this.addressOverlay = false; 
                        _this.resetAddress();
                        _this.addressPopupType = null;
                        _this.$bvModal.hide('address-popup');
                    }
                    else {
                        _this.$bvToast.toast('Adres kaydedilemedi.', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });

                        _this.addressOverlay = false; 
                    }
                })
                .catch(err => {
                    _this.$bvToast.toast('Adres kaydedilemedi.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                    });
                    _this.addressOverlay = false;
                })
            },
            editAddress(){
                const _this= this;
                if (!_this.$checkIsNullOrEmpty(_this.address.title)) {
                    _this.addressError.title = true;
                    _this.scrollToView('#address_title_group');
                    return false;
                }
                else
                    _this.addressError.title = false;

                if (!_this.$checkIsNullOrEmpty(_this.address.address)) {
                    _this.addressError.address = true;
                    _this.scrollToView('#address_group');
                    return false;
                }
                else
                    _this.addressError.address = false;

                if (!_this.$checkIsNullOrEmpty(_this.address.name_surname)) {
                    _this.addressError.name_surname = true;
                    _this.scrollToView('#name_surname_group');
                    return false;
                }
                else
                    _this.addressError.name_surname = false;

                if (_this.address.type == 1) {
                    if (!_this.$checkIsNullOrEmpty(_this.address.company_name)) {
                        _this.addressError.company_name = true;
                        _this.scrollToView('#company_name_group');
                        return false;
                    }
                    else
                        _this.addressError.company_name = false;

                    if (!_this.$checkIsNullOrEmpty(_this.address.tax_office)) {
                        _this.addressError.tax_office = true;
                        _this.scrollToView('#tax_office_group');
                        return false;
                    }
                    else
                        _this.addressError.tax_office = false;

                    if (!_this.$checkIsNullOrEmpty(_this.address.tax_number)) {
                        _this.addressError.tax_number = true;
                        _this.scrollToView('#tax_number_group');
                        return false;
                    }
                    else
                        _this.addressError.tax_number = false;
                }

                _this.addressOverlay = true;

                _this.$repositories.customer.updateAddress(_this.address)
                .then(res => {
                    if(res && res.data.success == 'success'){
                        _this.$bvToast.toast('Adres başarıyla güncellendi.', {
                            title: `Başarılı..`,
                            variant: 'success',
                            autoHideDelay: 500,
                            solid: true
                        });

                        _this.$emit('getCustomerAddress');
                        _this.addressOverlay = false; 
                        _this.resetAddress();
                        _this.addressPopupType = null;
                        _this.$bvModal.hide('address-popup');
                    }
                    else {
                        _this.$bvToast.toast('Adres güncellemedi.', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });

                        _this.addressOverlay = false; 
                    }
                })
                .catch(err => {
                    _this.$bvToast.toast('Adres güncellemedi.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                    });
                    _this.addressOverlay = false;
                })
            },
            deleteAddress(address){
                const _this = this;
                _this.$bvModal.msgBoxConfirm("Adresi silmek istediğinize emin misiniz?", {
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
                        _this.pageOverlay = true;
                        _this.$repositories.customer.deleteAddress(address)
                        .then(res => {
                            if(res && res.data.success == 'success'){
                                _this.$bvToast.toast('Adres başarıyla silindi.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 500,
                                    solid: true
                                });

                                _this.$emit('getCustomerAddress');
                                _this.pageOverlay = false;
                            }
                            else {
                                _this.$bvToast.toast('Adres silinemedi.', {
                                    title: `Başarısız..`,
                                    variant: 'danger',
                                    autoHideDelay: 500,
                                    solid: true
                                });

                                _this.pageOverlay = false; 
                            }
                        })
                        .catch(err => {
                            _this.$bvToast.toast('Adres silinemedi.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.pageOverlay = false;
                        })
                    }
                })
            },
            addressPopupClose(){
                this.addressPopupType = null;
                this.$bvModal.hide('address-popup');
            },
            getCountries(){
                this.countries = [];
                this.states = [];
                this.cities = [];
                this.$repositories.customer.getCountries()
                .then(res => {
                    this.countries = res.data.response || [];
                })
                .catch(err => {
                    this.countries = [];
                })
            },
            getStates(){
                this.states = [];
                this.cities = [];
                this.$repositories.customer.getStates(this.address.country_id)
                .then(res => {
                    this.states = res.data.response || [];
                })
                .catch(err => {
                    this.states = [];
                })
            },
            getCities(){
                this.cities = [];
                this.$repositories.customer.getCities(this.address.state_id)
                .then(res => {
                    this.cities = res.data.response || [];
                })
                .catch(err => {
                    this.cities = [];
                })
            },
            resetAddress(){
                this.address = {
                    id:null,
                    type:0,
                    title:null,
                    name_surname:null,
                    address:null,
                    country_id:null,
                    state_id:null,
                    city_id:null,
                    zip_code:null,
                    is_delivery_address: null,
				    is_invoice_address: null,
                    company_name:null,
                    tax_office:null,
                    tax_number:null
                }
            }
        },
        async created(){
            this.getCountries();
        }
    }
</script>
 
<style>
    .address-border-l {
        border-left:6px solid #eeeeee;
    }

    .address-border-l.active {
        border-color:var(--main-background-color);
    }
</style>
 