<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-3 my-md-0 py-5">
            <div class="col-12">
                <div class="row mt-4 mt-md-0">
                    <div class="col-10 col-sm-8 col-md-6 m-auto pb-5 pt-5 px-4 shadow-lg">
                        <b-overlay :show="registerOverlay" no-wrap></b-overlay>
                        <h2 class="text-center mb-4">
                            Şifre Değiştir
                        </h2>
                        <b-form autocomplete="off">
                            <b-form-group class="position-relative" id="old_password_group" :label="`Eski Şifre *`"
                                label-for="old_password_input" description="">
                                <b-form-input :class="[registerError.old_password ? 'border-danger' : 'border-dark']"
                                    id="old_password_input" v-model="register.old_password" :type="oldPasswordType" name="oldPassword"
                                    :placeholder="`Eski Şifre *`" @click="registerError.old_password = false" autocomplete="new-password"
                                    required>

                                </b-form-input>
                                <b-icon-eye-fill variant="secondary" font-scale="1" @click="oldPasswordType = 'text'"
                                    v-if="oldPasswordType == 'password'">

                                </b-icon-eye-fill>
                                <b-icon-eye-slash-fill variant="secondary" font-scale="1" @click="oldPasswordType = 'password'"
                                    v-if="oldPasswordType == 'text'">

                                </b-icon-eye-slash-fill>
                            </b-form-group>

                            <b-form-group class="position-relative" id="new_password_group" :label="`Yeni Şifre *`"
                                label-for="new_password_input" description="">
                                <b-form-input :class="[registerError.new_password ? 'border-danger' : 'border-dark']"
                                    id="password_input" v-model="register.new_password" :type="newPasswordType" name="newPassword"
                                    :placeholder="`Yeni Şifre *`" @click="registerError.new_password = false" autocomplete="new-password"
                                    required>

                                </b-form-input>
                                <b-icon-eye-fill variant="secondary" font-scale="1" @click="newPasswordType = 'text'"
                                    v-if="newPasswordType == 'password'">

                                </b-icon-eye-fill>
                                <b-icon-eye-slash-fill variant="secondary" font-scale="1" @click="newPasswordType = 'password'"
                                    v-if="newPasswordType == 'text'">

                                </b-icon-eye-slash-fill>
                            </b-form-group>

                            <b-form-group class="position-relative" id="again_new_password_group" :label="`Şifre tekrar *`"
                                label-for="again_new_password_input" description="">
                                <b-form-input :class="[registerError.again_new_password ? 'border-danger' : 'border-dark']"
                                    id="again_password_input" v-model="register.again_new_password" :type="againNewPasswordType"
                                    name="againNewPassword" :placeholder="`Şifre tekrar *`"
                                    @click="registerError.again_new_password = false" required>

                                </b-form-input>
                                <b-icon-eye-fill variant="secondary" font-scale="1" @click="againNewPasswordType = 'text'"
                                    v-if="againNewPasswordType == 'password'">

                                </b-icon-eye-fill>
                                <b-icon-eye-slash-fill variant="secondary" font-scale="1"
                                    @click="againNewPasswordType = 'password'" v-if="againNewPasswordType == 'text'">

                                </b-icon-eye-slash-fill>
                            </b-form-group>

                            <div class="row mt-4">
                                <div class="col-12 col-md-6 m-auto">
                                    <b-button class="col-12" type="button" @click="changePassword" squared size="lg"
                                        variant="primary">Değiştir</b-button>
                                </div>
                            </div>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { FormPlugin , FormInputPlugin, FormGroupPlugin, SpinnerPlugin,OverlayPlugin,ToastPlugin } from 'bootstrap-vue'
Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(SpinnerPlugin);
Vue.use(OverlayPlugin);
Vue.use(ToastPlugin);

export default
    {
        name: 'ChangePassword',
        middleware: 'userAuthenticated',    
        data() {
            return {
                navigation: undefined,
                registerOverlay:false,
                register: {
                    old_password:null,
                    new_password: null,
                    again_new_password: null
                },
                registerError: {
                    old_password: false,
                    new_password: false,
                    again_new_password: false
                },
                oldPasswordType: 'password',
                newPasswordType: 'password',
                againNewPasswordType: 'password'
            }
        },
        methods: {
            scrollToView(element) {
                let offsetTop = document.querySelector(element).offsetTop;
                window.scrollTo(0, offsetTop + 80)
            },
            changePassword() {
                const _this = this;
                if (!_this.$checkIsNullOrEmpty(_this.register.old_password)) {
                    _this.registerError.old_password = true;
                    _this.scrollToView('#old_password_group');
                    return false;
                }

                if (!_this.$checkIsNullOrEmpty(_this.register.new_password)) {
                    _this.registerError.new_password = true;
                    _this.scrollToView('#new_password_group');
                    return false;
                }

                if (!_this.$checkIsNullOrEmpty(_this.register.again_new_password)) {
                    _this.registerError.again_new_password = true;
                    _this.scrollToView('#again_new_password_group');
                    return false;
                }

                _this.registerOverlay = true;
                this.$repositories.customer.changePassword(_this.register)
                    .then(res => {                        
                        if (res.data.code == 'error_old_password') {
                            _this.$bvToast.toast('Mevcut şifreniz hatalı.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 2000,
                                solid: true
                            });
                        }
                        
                        if (res.data.code == 'no_old_password') {
                            _this.$bvToast.toast('Mevcut şifre zorunlu.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 2000,
                                solid: true
                            });
                        }

                        if (res.data.code == 'no_new_password') {
                            _this.$bvToast.toast('Yeni şifre girmelisiniz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 2000,
                                solid: true
                            });
                        }

                        if (res.data.code == 'no_password_updated') {
                            _this.$bvToast.toast('Şifre güncellenemedi.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 2000,
                                solid: true
                            });
                        }

                        if (res.data.code == 'password_updated') {
                            _this.$bvToast.toast('Yeni şifreniz başarıyla güncellendi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 2000,
                                solid: true
                            });

                            _this.$router.push('/account/personal-information')
                        }

                        _this.registerOverlay = false;
                    })
                    .catch(err => {
                        _this.registerOverlay = false;
                    });
            },
        },
        async created() {
            var _this = this;

            _this.navigation = [
                {
                    "name": "Şifre Değiştirme",
                    "url": "change-password"
                }
            ]
        }
    }
</script>

<style>

</style>
