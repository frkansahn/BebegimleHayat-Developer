<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row pb-5">
            <div class="col-12 col-sm-10 col-lg-8 mx-auto mt-5 py-5 px-4">
                <div class="row mb-2">
                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <button
                            class="btn btn-sm pb-0 px-0 mx-4 border-left-0 border-right-0 border-top-0 border-bottom border-bottom-width-3"
                            :class="[selectedLoginType == 'login' ? 'border-success text-success' : 'border-white']"
                            @click="selectedLoginType = 'login'">
                            <h4 class="font-weight-bold">
                                Giriş Yap
                            </h4>
                        </button>
                        <button
                            class="btn btn-sm pb-0 px-0 mx-4 border-left-0 border-right-0 border-top-0 border-bottom border-bottom-width-3"
                            :class="[selectedLoginType == 'register' ? ' border-success text-success' : 'border-white']"
                            @click="selectedLoginType = 'register'">
                            <h4 class="font-weight-bold">
                                Üye Ol
                            </h4>
                        </button>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-12" v-if="selectedLoginType == 'login'">
                        <h5 class="font-weight-bold">
                            Hemen giriş yap!
                        </h5>
                        <h5 class="font-weight-normal">
                            Sadece sana özel içerikler gör. En sevdiğin makaleleri kaydet!
                        </h5>
                    </div>
                    <div class="col-12" v-else>
                        <h5 class="font-weight-bold">
                            Hemen üye ol!
                        </h5>
                        <h5 class="font-weight-normal">
                            Sadece sana özel içerikler gör. En sevdiğin makaleleri kaydet. En yeni konulardan önce sen haberdar ol!
                        </h5>
                    </div>
                </div>
                <div class="row mt-5">
                    <div class="col-12">
                        <b-form class="row" v-if="selectedLoginType == 'login'">
                            <b-form-group class="col-lg-6 h6 font-weight-bold" id="email_group" label="E-mail"
                                label-for="email_input" description="">
                                <b-form-input class="border-left-0 border-right-0 border-top-0 border-bottom rounded-0 px-0"
                                    :class="[loginError.email ? 'border-danger' : 'border-dark']" id="email_input"
                                    v-model="login.email" type="email" @keyup.enter="loginCustomer"
                                    @click="loginError.email = false" required></b-form-input>
                            </b-form-group>

                            <b-form-group class="col-lg-6 h6 font-weight-bold position-relative" id="password_group"
                                label="Şifre" label-for="password_input" description="">
                                <b-form-input class="border-left-0 border-right-0 border-top-0 border-bottom rounded-0 px-0"
                                    :class="[loginError.password ? 'border-danger' : 'border-dark']" id="password_input"
                                    v-model="login.password" :type="passwordType" @keyup.enter="loginCustomer"
                                    @click="loginError.password = false" required>

                                </b-form-input>
                                <b-icon-eye-fill variant="secondary" font-scale="1" @click="passwordType = 'text'"
                                    v-if="passwordType == 'password'">

                                </b-icon-eye-fill>
                                <b-icon-eye-slash-fill variant="secondary" font-scale="1" @click="passwordType = 'password'"
                                    v-if="passwordType == 'text'">

                                </b-icon-eye-slash-fill>
                            </b-form-group>

                            <div class="col-12 d-flex align-items-center justify-content-between">
                                <b-form-checkbox id="checkboxRememberMe" v-model="rememberMe" name="checkboxRememberMe"
                                    value="1" unchecked-value="0">
                                    Beni Hatırla
                                </b-form-checkbox>
                                <NuxtLink to="/uye-sifremi-unuttum" class="text-secondary">
                                    <h6>Şifremi unuttum!</h6>
                                </NuxtLink>
                            </div>

                            <div class="col-12">
                                <div class="row mt-4">
                                    <div class="col-12 col-md-6 m-auto">
                                        <b-button class="col-12 py-3" type="button" @click="loginCustomer" size="lg"
                                            variant="dark" :disabled="loginOverlay">
                                            <b-spinner small label="Loading..." v-if="loginOverlay" class="mr-2"></b-spinner>
                                            Giriş Yap
                                        </b-button>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-12 text-center">
                                        veya
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-12 col-md-8 m-auto">
                                        <div class="row">
                                            <div class="col-12 col-md-6 mx-auto mb-3 mb-md-0">
                                                <b-button class="col-12 py-3 d-flex align-items-center justify-content-center" type="button" @click="logInWithFacebook" size="sm" id="loginFacebook">
                                                    <b-icon-facebook class="mr-2"></b-icon-facebook>
                                                    FACEBOOK İLE GİRİŞ YAP
                                                </b-button>
                                            </div>
                                            <div class="col-12 col-md-6 mx-auto">
                                                <b-button class="col-12 py-3 d-flex align-items-center justify-content-center" type="button" @click="logInWithGoogle" size="sm" id="loginGoogle">
                                                    <b-icon-google class="mr-2"></b-icon-google>
                                                    GOOGLE İLE GİRİŞ YAP
                                                </b-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </b-form>
                        <b-form class="row" autocomplete="off" v-else>
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

                            <b-form-group class="col-lg-6 mb-5 h6 font-weight-bold" id="password_group" label="Şifre"
                                label-for="password_input" description="">
                                <b-form-input class="border-left-0 border-right-0 border-top-0 border-bottom rounded-0 px-0" :class="[registerError.password ? 'border-danger' : 'border-dark']"
                                    id="password_input" v-model="register.password" :type="passwordType" name="password"
                                    placeholder="" @click="registerError.password = false" autocomplete="new-password"
                                    required>

                                </b-form-input>
                                <b-icon-eye-fill variant="secondary" font-scale="1" @click="passwordType = 'text'"
                                    v-if="passwordType == 'password'">

                                </b-icon-eye-fill>
                                <b-icon-eye-slash-fill variant="secondary" font-scale="1" @click="passwordType = 'password'"
                                    v-if="passwordType == 'text'">

                                </b-icon-eye-slash-fill>
                            </b-form-group>

                            <b-form-group class="col-lg-6 mb-5 h6 font-weight-bold" id="again_password_group"
                                label="Şifre (tekrar)" label-for="again_password_input" description="">
                                <b-form-input class="border-left-0 border-right-0 border-top-0 border-bottom rounded-0 px-0" :class="[registerError.again_password ? 'border-danger' : 'border-dark']"
                                    id="again_password_input" v-model="register.again_password" :type="again_passwordType"
                                    name="againPassword" placeholder=""
                                    @click="registerError.again_password = false" required>

                                </b-form-input>
                                <b-icon-eye-fill variant="secondary" font-scale="1" @click="again_passwordType = 'text'"
                                    v-if="again_passwordType == 'password'">

                                </b-icon-eye-fill>
                                <b-icon-eye-slash-fill variant="secondary" font-scale="1"
                                    @click="again_passwordType = 'password'" v-if="again_passwordType == 'text'">

                                </b-icon-eye-slash-fill>
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
                                <div class="row mt-4">
                                    <div class="col-12 col-md-6 m-auto">
                                        <b-button class="col-12 py-3" type="button" @click="saveCustomer" size="lg"
                                            variant="dark" :disabled="registerOverlay">
                                            <b-spinner small label="Loading..." v-if="registerOverlay" class="mr-2"></b-spinner>
                                            Üye Ol
                                        </b-button>
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-12 text-center">
                                        veya
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-12 col-md-8 m-auto">
                                        <div class="row">
                                            <div class="col-12 col-md-6 mx-auto mb-3 mb-md-0">
                                                <b-button class="col-12 py-3 d-flex align-items-center justify-content-center" type="button" @click="logInWithFacebook" size="sm" id="loginFacebook">
                                                    <b-icon-facebook class="mr-2"></b-icon-facebook>
                                                    FACEBOOK İLE ÜYE OL
                                                </b-button>
                                            </div>
                                            <div class="col-12 col-md-6 mx-auto">
                                                <b-button class="col-12 py-3 d-flex align-items-center justify-content-center" type="button" @click="logInWithGoogle" size="sm" id="loginGoogle">
                                                    <b-icon-google class="mr-2"></b-icon-google>
                                                    GOOGLE İLE ÜYE OL
                                                </b-button>
                                            </div>
                                        </div>
                                    </div>
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
export default
    {
        name: 'CustomerLogin',
        middleware: 'notUserAuthenticated',
        head() {
            return {
                title: "Giriş Yap | BebegimleHayat"
            };
        },
        data() {
            return {
                navigation: undefined,
                kvkk: undefined,
                membership_aggrement: undefined,
                registerOverlay: false,
                client:undefined,
                login: {
                    email: null,
                    phone: null,
                    password: null
                },
                loginError: {
                    email: false,
                    phone: false,
                    password: false
                },
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
                rememberMe: '0',
                selectedLoginType: 'login',
                passwordType: 'password',
                again_passwordType: 'password',
                loginOverlay: false
            }
        },
        props: {

        },
        methods: {
            query(data){
                return Object.keys(data).map(k=>`${k}=${data[k]}`).join('&').replace("next=","")
            },
            async logInWithFacebook() {
                this.$repositories.customer.loginFacebook();
                // FB.login(function(response) {
                //     console.log(response);
                //     if (response.status === 'connected') {
                //     } else {
                //     }
                // });               
            },
            async initFacebook() {
                // window.FB.getLoginStatus(function (response) {
                //     console.log(response);
                //     if (response.authResponse) {
                //         alert("You are logged in &amp; cookie set!");
                //     } else {
                //         alert("User cancelled login or did not fully authorize.");
                //     }
                // });
                

                window.fbAsyncInit = function() {
                    FB.init({
                        appId      : '273260455131014',
                        cookie     : true,
                        xfbml      : true,
                        version    : 'v4.0'
                    });
                    
                    FB.AppEvents.logPageView();                    
                };

                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "https://connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            },
            async logInWithGoogle() {
                this.$repositories.customer.loginGoogle();
                // let params = `scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=1000,height=1000,left=0,top=0`;
                // window.open('https://localhost:4001/api/v1/customerToken/login/google/', '_blank' , params ); 
            },
            
            async loginCustomer() {
                var _this = this;
                try {
                    if (!_this.$checkIsNullOrEmpty(_this.login.email) && _this.selectedLoginType == 'email') {
                        _this.loginError.email = true;
                        return false;
                    }

                    if (!_this.$checkIsNullOrEmpty(_this.login.phone) && _this.selectedLoginType == 'phone') {
                        _this.loginError.phone = true;
                        return false;
                    }

                    if (!_this.$checkIsNullOrEmpty(_this.login.password)) {
                        _this.loginError.password = true;
                        return false;
                    }


                    let reqData = {
                        password: _this.login.password
                    };
                    if (_this.login.email) {
                        reqData["email"] = _this.login.email;
                    }

                    if (!_this.login.email)
                        reqData["phone"] = _this.login.email;

                    _this.loginOverlay = true;
                    _this.$repositories.customer.token(reqData)
                        .then(res => {
                            if (res.data.code == "logged_in") {
                                let guest_code = _this.$store.state.customer.guest_code;
                                _this.$cookiz.set('g_u_i', res.data.result.user, {
                                    path: '/',
                                    maxAge: 60 * 60 * 24 * 1
                                });

                                _this.$cookiz.set('g_u_t', res.data.result.token, {
                                    path: '/',
                                    maxAge: 60 * 60 * 24 * 1
                                });

                                _this.$cookiz.remove('g_u_guest_code');
                                _this.$store.commit("customer/guest_code", null);
                                _this.$store.commit("customer/token", res.data.result.token);
                                _this.$store.commit("customer/user", res.data.result.user);
                                _this.$store.commit("customer/userLoggedIn", res.data.result.user);

                                _this.$bvToast.toast('Giriş yapıldı.', {
                                    title: `Başarılı..`,
                                    variant: 'success',
                                    autoHideDelay: 500,
                                    solid: true
                                });

                                if (guest_code) {
                                    _this.$repositories.customer.cartGuestToCustomer({
                                        token: res.data.result.token,
                                        guest_code: guest_code
                                    })
                                        .then(() => {
                                            _this.loginOverlay = false;
                                            _this.$store.dispatch('customer/getCart');

                                            if (_this.$route.query.r)
                                                _this.$router.push(_this.$route.query.r);
                                            else
                                                _this.$router.push("/");

                                        })
                                }
                                else {
                                    _this.loginOverlay = false;
                                    _this.$store.dispatch('customer/getCart');
                                    if (_this.$route.query.r)
                                        _this.$router.push(_this.$route.query.r);
                                    else
                                        _this.$router.push("/");
                                }
                            }
                            else if (res.data.code == "no_user") {
                                _this.$bvToast.toast('Kullanıcı bulunamadı', {
                                    title: `Başarısız..`,
                                    variant: 'danger',
                                    autoHideDelay: 500,
                                    solid: true
                                });

                            }
                            else if (res.data.code == "password_incorrect") {
                                _this.$bvToast.toast('Şifre hatalı', {
                                    title: `Başarısız..`,
                                    variant: 'danger',
                                    autoHideDelay: 500,
                                    solid: true
                                });

                            }
                            else if (res.data.code == "missing_information") {
                                _this.$bvToast.toast('Eksik bilgi', {
                                    title: `Başarısız..`,
                                    variant: 'danger',
                                    autoHideDelay: 500,
                                    solid: true
                                });

                            }

                            _this.loginError.email = false;
                            _this.loginError.phone = false;
                            _this.loginError.password = false;
                            _this.loginOverlay = false;
                        })
                        .catch(err => {
                            _this.$bvToast.toast('Bilgilerinizi kontrol ediniz. Zorunlu alanları doldurunuz.', {
                                title: `Başarısız..`,
                                variant: 'danger',
                                autoHideDelay: 500,
                                solid: true
                            });
                            _this.loginError.email = false;
                            _this.loginError.phone = false;
                            _this.loginError.password = false;
                            _this.loginOverlay = false;
                        });

                }
                catch (error) {
                    console.log(error);
                }

            },
            onlyNumber(e) {
                e.target.value = e.target.value.replace(/\D/g, '');
            },
            scrollToView(element) {
                let offsetTop = document.querySelector(element).offsetTop;
                window.scrollTo(0, offsetTop + 80)
            },
            updatePhoneNumber(data, key) {
                this.register[key] = data.countryCode
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
            async saveCustomer() {
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


                    if (_this.$checkIsNullOrEmpty(_this.register.name) && _this.$checkIsNullOrEmpty(_this.register.surname) && _this.$checkIsNullOrEmpty(_this.register.password) && (_this.register.password == _this.register.again_password) && _this.$checkEmail(_this.register.email)) {
                        _this.registerOverlay = true;
                        let reqData = Object.assign({}, _this.register);
                        reqData.phone = Number(reqData.phone?.replace(/\D/g, ''));
                        this.$repositories.customer.create(reqData)
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

                                    if (res.data.code == 'password_required') {
                                        _this.$bvToast.toast('Şifre zorunlu.', {
                                            title: `Başarısız..`,
                                            variant: 'danger',
                                            autoHideDelay: 500,
                                            solid: true
                                        });

                                        _this.registerError.email = true;
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

                        if (!_this.$checkIsNullOrEmpty(_this.register.password))
                            _this.registerError.password = true;

                        if (!_this.$checkIsNullOrEmpty(_this.register.again_password))
                            _this.registerError.again_password = true;

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
            }
        },
        async mounted() {
            //await this.initFacebook();
        },
        async created() {
            this.navigation = [
                {
                    "name": "Üye Giriş",
                    "url": "#"
                }
            ]
        }
    }
</script>

<style scoped>
    .border-bottom-width-3 {
        border-bottom-width: 3px !important;
    }

    #loginFacebook {
        background-color: #1B74E4;
        border-color: #1B74E4;
        border-radius: 5px;
    }

    #loginGoogle {
        border-radius: 5px;
        background-color: #4285f4;
        border-color: #4285f4;
    }

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
