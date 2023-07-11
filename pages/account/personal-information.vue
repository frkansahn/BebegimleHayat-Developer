<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-3 my-md-0 py-5">
            <div class="col-12">
                <div class="row mt-4 mt-md-0">
                    <div class="col-10 col-sm-8 col-md-6 m-auto pb-5 pt-5 px-4 shadow-lg">
                        <b-overlay :show="registerOverlay" no-wrap></b-overlay>
                        <h2 class="text-center mb-4">
                            Kişisel Bilgilerim
                        </h2>
                        <b-form autocomplete="off" class="row">
                            <b-form-group class="col-lg-6 mb-5 h6 font-weight-bold" id="name_group" label="Ad"
                                label-for="name_input" description="">
                                <b-form-input class="border-left-0 border-right-0 border-top-0 border-bottom rounded-0 px-0"
                                    :class="[registerError.name ? 'border-danger' : 'border-dark']" id="name_input"
                                    v-model="register.name" type="text" @keyup.enter="saveCustomer"
                                    @click="registerError.name = false" required></b-form-input>
                            </b-form-group>

                            <b-form-group class="col-lg-6 mb-5 h6 font-weight-bold" id="surname_group" label="Soyad"
                                label-for="surname_input" description="">
                                <b-form-input class="border-left-0 border-right-0 border-top-0 border-bottom rounded-0 px-0"
                                    :class="[registerError.surname ? 'border-danger' : 'border-dark']" id="surname_input"
                                    v-model="register.surname" type="text" @keyup.enter="saveCustomer"
                                    @click="registerError.surname = false" required></b-form-input>
                            </b-form-group>

                            <b-form-group class="col-lg-6 mb-5 h6 font-weight-bold" id="phone_group"
                                label="Cep Telefonu"
                                label-for="phone_input" description="">
                                <b-form-input v-integer class="border-left-0 border-right-0 border-top-0 border-bottom rounded-0 px-0" :class="[registerError.phone ? 'border-danger' : 'border-dark']" name="phone"
                                    id="phone_input" v-model="register.phone" type="text" maxlength="11" placeholder="05xxxxxxxxx"
                                    @click="registerError.phone = false" autocomplete="false"></b-form-input>
                            </b-form-group>

                            <b-form-group class="col-lg-6 mb-5 h6 font-weight-bold" id="email_group"
                                label="E-posta addresi"
                                label-for="email_input" description="">
                                <b-form-input class="border-left-0 border-right-0 border-top-0 border-bottom rounded-0 px-0" :class="[registerError.email ? 'border-danger' : 'border-dark']" name="email"
                                    id="email_input" v-model="register.email" type="text" placeholder=""
                                    @click="registerError.email = false" autocomplete="false"></b-form-input>
                            </b-form-group>

                            <b-form-group id="membership_aggrement_group" class="col-12 mb-5" label="" label-for="membership_aggrement_input"
                                description="">
                                <div class="custom-control b-custom-control-xl custom-checkbox">
                                    <input id="membershipAggrementCheckbox" type="checkbox"
                                        name="membership-aggrement-checkbox"
                                        v-model="register.approval_membership_aggrement" class="custom-control-input"
                                        value="1" unchecked-value="0">
                                    <div></div>
                                    <label class="custom-control-label">
                                        <strong role="button" @click="membershipAggrementModal">Üyelik
                                            sözleşmesi</strong>'ni okudum, kabul ediyorum.
                                    </label>
                                </div>
                            </b-form-group>

                            <b-form-group id="kvkk_group" class="col-12 mb-5" label="" label-for="kvkk_input" description="">
                                <div class="custom-control b-custom-control-sm custom-checkbox">
                                    <input id="kvkkCheckbox" type="checkbox" name="kvkk-checkbox"
                                        v-model="register.approval_kvkk" class="custom-control-input" value="1" unchecked-value="0">
                                    <label class="custom-control-label">
                                        <strong role="button" @click="kvkkModal">Kvkk</strong>'yı okudum, kabul
                                        ediyorum.
                                    </label>
                                </div>
                            </b-form-group>

                            <div class="col-12">
                                <div class="row justify-content-center">
                                    <b-button class="col-12 col-sm-10 col-md-8 col-lg-6" type="button" @click="updateCustomer" squared size="lg"
                                        variant="primary">Kaydet</b-button>
                                </div>
                            </div>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>
        <b-modal id="kvkk-modal" title="Kvkk">
            <div class="row">
                <div class="col-12">
                    <div v-html="kvkk"></div>
                </div>
            </div>
            <template #modal-footer>
                <div class="w-100">
                    <b-button variant="outline-success" size="sm" class="float-right mx-2" @click="kvkkPopupOk">
                        Onay
                    </b-button>
                    <b-button variant="outline-danger" size="sm" class="float-right mx-2" @click="kvkkPopupGiveUp">
                        Vazgeç
                    </b-button>
                </div>
            </template>
        </b-modal>
        <b-modal id="membership-aggrement-modal" title="Üyelik Sözleşmesi">
            <div class="row">
                <div class="col-12">
                    <div v-html="membership_aggrement"></div>
                </div>
            </div>
            <template #modal-footer>
                <div class="w-100">
                    <b-button variant="outline-success" size="sm" class="float-right mx-2"
                        @click="membershipAggrementPopupOk">
                        Onay
                    </b-button>
                    <b-button variant="outline-danger" size="sm" class="float-right mx-2"
                        @click="membershipAggrementPopupGiveUp">
                        Vazgeç
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import Vue from 'vue'
import { FormPlugin, ModalPlugin , FormInputPlugin, FormGroupPlugin, FormCheckboxPlugin, SpinnerPlugin , ButtonPlugin,ToastPlugin, OverlayPlugin } from 'bootstrap-vue'
Vue.use(FormPlugin);
Vue.use(ModalPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormCheckboxPlugin);
Vue.use(SpinnerPlugin);
Vue.use(ButtonPlugin);
Vue.use(ToastPlugin);
Vue.use(OverlayPlugin);
export default
    {
        name: 'PersonalInformation',
        middleware: 'userAuthenticated',
        data() {
            return {
                navigation: undefined,
                kvkk: undefined,
                membership_aggrement: undefined,
                registerOverlay: false,
                client:undefined,
                register: {
                    name: null,
                    surname: null,
                    phone: null,
                    email: null,
                    password: null,
                    again_password: null,
                    approval_kvkk: 0,
                    approval_membership_aggrement: 0
                },
                registerError: {
                    name: false,
                    surname: false,
                    phone: false,
                    email: false,
                    password: false,
                    again_password: false,
                    membership_aggrement: false,
                    kvkk: false
                },
                passwordType: 'password',
                again_passwordType: 'password',
                loginOverlay: false
            }
        },
        methods: {
            onlyNumber(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            },
            scrollToView(element){
                let offsetTop = document.querySelector(element).offsetTop;
                window.scrollTo(0, offsetTop + 80)
            },
            
            membershipAggrementModal() {
                this.$repositories.content.getContentByCode('membership_aggrement')
                    .then(res => {
                        if (res.data.response) {
                            this.membership_aggrement = res.data.response.description;
                            this.$bvModal.show('membership-aggrement-modal');
                        }
                    });
            },
            membershipAggrementPopupOk() {
                this.register.approval_membership_aggrement = 1;
                this.$bvModal.hide('membership-aggrement-modal');
            },
            membershipAggrementPopupGiveUp() {
                this.register.approval_membership_aggrement = 0;
                this.$bvModal.hide('membership-aggrement-modal');
            },
            kvkkModal() {
                this.$repositories.content.getContentByCode('kvkk')
                    .then(res => {
                        if (res.data.response) {
                            this.kvkk = res.data.response.description;
                            this.$bvModal.show('kvkk-modal');
                        }
                    });
            },
            kvkkPopupOk() {
                this.register.approval_kvkk = 1;
                this.$bvModal.hide('kvkk-modal');
            },
            kvkkPopupGiveUp() {
                this.register.approval_kvkk = 0;
                this.$bvModal.hide('kvkk-modal');
            },
            async updateCustomer() {
                var _this = this;
                try {
                    if (_this.register.approval_kvkk != 1) {
                        _this.scrollToView('#kvkk_group');
                        _this.$bvToast.toast("Kvkk'yi onaylamalısınız.", {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                        return false;
                    }

                    if (_this.register.approval_membership_aggrement != 1) {
                        _this.scrollToView('#membership_aggrement_group');
                        _this.$bvToast.toast("Üyelik sözleşmesini'yi onaylamalısınız.", {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });
                        return false;
                    }


                    if (_this.$checkIsNullOrEmpty(_this.register.name) && _this.$checkIsNullOrEmpty(_this.register.surname) && _this.$checkEmail(_this.register.email)) {
                        _this.registerOverlay = true;
                        let reqData = Object.assign({}, _this.register);
                        reqData.phone = Number(reqData.phone?.replace(/\D/g, ''));
                        this.$repositories.customer.update(reqData)
                            .then(res => {
                                if (res.data.success == "success") {
                                    _this.$bvToast.toast('Kayıt işlemi başarılı.', {
                                        title: `Başarılı..`,
                                        variant: 'success',
                                        autoHideDelay: 500,
                                        solid: true
                                    });
                                    _this.selectedLoginType = 'login';
                                }
                                else {
                                    if (res.data.code == 'email_required') {
                                        _this.$bvToast.toast('E-mail zorunlu.', {
                                            title: `Başarısız..`,
                                            variant: 'danger',
                                            autoHideDelay: 500,
                                            solid: true
                                        });

                                        _this.registerError.email = true;
                                        _this.resetRegister();
                                    }

                                    if (res.data.code == 'email_duplicate') {
                                        _this.$bvToast.toast('Bu E-mail ile kullanıcı bulunmaktadır.', {
                                            title: `Başarısız..`,
                                            variant: 'danger',
                                            autoHideDelay: 500,
                                            solid: true
                                        });

                                        _this.registerError.email = true;
                                    }

                                    if (res.data.code == 'phone_required') {
                                        _this.$bvToast.toast('Telefon zorunlu.', {
                                            title: `Başarısız..`,
                                            variant: 'danger',
                                            autoHideDelay: 500,
                                            solid: true
                                        });

                                        _this.registerError.phone = true;
                                    }

                                    if (res.data.code == 'phone_duplicate') {
                                        _this.$bvToast.toast('Bu telefon numarası ile kullanıcı bulunmaktadır.', {
                                            title: `Başarısız..`,
                                            variant: 'danger',
                                            autoHideDelay: 500,
                                            solid: true
                                        });

                                        _this.registerError.phone = true;
                                    }

                                    if (res.data.code == 'name_required') {
                                        _this.$bvToast.toast('İsim zorunlu.', {
                                            title: `Başarısız..`,
                                            variant: 'danger',
                                            autoHideDelay: 500,
                                            solid: true
                                        });

                                        _this.registerError.name = true;
                                    }

                                    if (res.data.code == 'surname_required') {
                                        _this.$bvToast.toast('Soyisim zorunlu.', {
                                            title: `Başarısız..`,
                                            variant: 'danger',
                                            autoHideDelay: 500,
                                            solid: true
                                        });

                                        _this.registerError.surname = true;
                                    }

                                    if (res.data.code == 'kvkk_required') {
                                        _this.$bvToast.toast('Kvkk zorunlu', {
                                            title: `Başarısız..`,
                                            variant: 'danger',
                                            autoHideDelay: 500,
                                            solid: true
                                        });

                                        _this.registerError.kvkk = true;
                                    }

                                    if (res.data.code == 'membership_aggrement_required') {
                                        _this.$bvToast.toast('Üyelik sözleşmesi zorunlu.', {
                                            title: `Başarısız..`,
                                            variant: 'danger',
                                            autoHideDelay: 500,
                                            solid: true
                                        });

                                        _this.registerError.membership_aggrement = true;
                                    }
                                }

                                _this.registerOverlay = false;
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                    else {
                        this.$bvToast.toast('Bilgilerinizi kontrol ediniz. Zorunlu alanları doldurunuz.', {
                            title: `Başarısız..`,
                            variant: 'danger',
                            autoHideDelay: 500,
                            solid: true
                        });

                        if (!_this.$checkIsNullOrEmpty(_this.register.name))
                            _this.registerError.name = true;

                        if (!_this.$checkIsNullOrEmpty(_this.register.surname))
                            _this.registerError.surname = true;

                        if (!_this.$checkIsNullOrEmpty(_this.register.email))
                            _this.registerError.email = true;

                        if (!_this.$checkIsNullOrEmpty(_this.register.phone))
                            _this.registerError.phone = true;

                    }
                }
                catch (error) {
                    console.log(error);
                    _this.registerOverlay = false;
                }
            },
            resetRegister() {
                this.register = {
                    name: null,
                    surname: null,
                    phone: null,
                    email: null,
                    password: null,
                    again_password: null,
                    approval_kvkk: 0,
                    approval_membership_aggrement: 0
                };

                this.registerError = {
                    name: false,
                    surname: false,
                    phone: false,
                    email: false,
                    password: false,
                    again_password: false,
                    membership_aggrement: false,
                    kvkk: false
                };
            },
            getCustomer() {
                this.$repositories.customer.get()
                    .then(res => {
                        this.register = Object.assign({}, res.data.response);
                    })
            }
        },
        async created() {
            var _this = this;
            _this.getCustomer();

            _this.navigation = [
                {
                    "name": "Kişisel Bilgiler",
                    "url": "personal-information"
                }
            ]
        }
    }
</script>

<style>
    #membership_aggrement_group .custom-control-label::before , #membership_aggrement_group .custom-control-label::after , #kvkk_group .custom-control-label::before , #kvkk_group .custom-control-label::after {
        width: 40px;
        height: 40px;
        left: -50px;
        top: -10px;
    }

    #membership_aggrement_group .custom-checkbox .custom-control-input:checked ~ .custom-control-label::after , #kvkk_group .custom-checkbox .custom-control-input:checked ~ .custom-control-label::after {
        background-color: #000;
    }

    #membership_aggrement_group .custom-control-input , #kvkk_group .custom-control-input {
        width: 40px;
        height: 40px;
        top: -10px;
    }

    #membership_aggrement_group .custom-control , #kvkk_group .custom-control {
        padding-left: 50px;
    }

    #membership_aggrement_group .custom-control-label, #kvkk_group .custom-control-label {
        font-size: 17px;
    }
</style>
