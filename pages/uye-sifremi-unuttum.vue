<template>
   <div class="container-fluid">
      <div class="row my-5">
         <div class="col-11 col-sm-6 col-md-4 col-lg-3 m-auto pb-5 pt-5 px-4 shadow-lg">
            <b-overlay :show="loginOverlay" no-wrap></b-overlay>
            <h2 class="text-center mb-4">
               Giriş Yap
            </h2>
            <b-form>
               <b-form-group id="email_group" label="E-mail" label-for="email_input" description="">
                  <b-form-input :disabled="isRefreshToken" :class="[emailError ? 'border-danger' : 'border-dark']"
                     id="email_input" v-model="email" type="email" placeholder="E-mailiniz" @click="emailError = false"
                     required></b-form-input>
               </b-form-group>

               <b-form-group class="position-relative" id="password_group" label="Şifre" label-for="password_input"
                  description="" v-if="isRefreshToken">
                  <b-form-input :class="[passwordError ? 'border-danger' : 'border-dark']" id="password_input"
                     v-model="password" :type="passwordType" placeholder="Şifre" @click="passwordError = false" required>

                  </b-form-input>
                  <b-icon-eye-fill variant="secondary" font-scale="1" @click="passwordType = 'text'"
                     v-if="passwordType == 'password'">

                  </b-icon-eye-fill>
                  <b-icon-eye-slash-fill variant="secondary" font-scale="1" @click="passwordType = 'password'"
                     v-if="passwordType == 'text'">

                  </b-icon-eye-slash-fill>
               </b-form-group>

               <div class="row mt-4">
                  <div class="col-12 col-md-6 m-auto">
                     <b-button class="col-12" type="button" @click="forgotPasswordChangePassword" squared size="lg"
                        variant="primary" v-if="isRefreshToken">
                        Değiştir
                     </b-button>
                     <b-button class="col-12" type="button" @click="forgotPassword" squared size="lg" variant="primary"
                        v-else>Gönder</b-button>
                  </div>
               </div>
            </b-form>
         </div>
      </div>
   </div>
</template>

<script>
export default
   {
      name: 'CustomerForgotPassword',
      transition: {
         name: 'page-transition',
         mode: 'out-in'
      },
      data() {
         return {
            email: null,
            emailError: false,
            password: null,
            passwordError: false,
            passwordType: 'password',
            loginOverlay: false,
            isRefreshToken: false,
            refreshToken: undefined
         }
      },
      props: {

      },
      methods: {
         forgotPassword() {
            const _this = this;
            if (!_this.$checkIsNullOrEmpty(_this.email)) {
               _this.emailError = true;
               _this.scrollToView('#email_group');
               return false;
            }

            _this.loginOverlay = true;
            _this.$repositories.customer.forgotPassword({ email: _this.email })
               .then(res => {

                  if (res.data.code == 'no_email') {
                     _this.$bvToast.toast('Email bulunamadı.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                  }
                  else if (res.data.code == 'no_customer') {
                     _this.$bvToast.toast('Kulanıcı bulunamadı.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                  }
                  else if (res.data.code == 'no_mail_sended') {
                     _this.$bvToast.toast('Mail gönderilemedi.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                  }
                  else if (res.data.code == 'mail_sended') {
                     _this.$bvToast.toast('Bağlantı linki mail adresinize gönderildi. Lütfen kontrol ediniz.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                     });

                     _this.email = null;
                     _this.emailError = false;
                  }

                  _this.loginOverlay = false;
               })
               .catch(err => {
                  _this.loginOverlay = false;
               });
         },
         controlRefreshToken() {
            const _this = this;
            _this.$repositories.customer.forgotPasswordcontrolRefreshToken({ refreshToken: _this.refreshToken })
               .then(res => {
                  if (res.data.code == 'token_expired') {
                     _this.$bvToast.toast('Şifre değiştirme süresi dolmuştur.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                  }
                  else if (res.data.code == 'correct_token') {
                     _this.isRefreshToken = true;
                     _this.email = res.data.email;
                  }
                  else {
                     _this.$bvToast.toast('Bilgilerinizi kontrol ediniz. Zorunlu alanları doldurunuz.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                  }
               })
         },
         forgotPasswordChangePassword() {
            const _this = this;
            _this.$repositories.customer.forgotPasswordChangePassword({ refreshToken: _this.refreshToken, password: _this.password })
               .then(res => {
                  if (res.data.code == 'token_expired') {
                     _this.$bvToast.toast('Şifre değiştirme süresi dolmuştur.', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });

                     _this.email = null;
                     _this.isRefreshToken = false;
                  }
                  else if (res.data.code == 'no_password') {
                     _this.$bvToast.toast('Parola girmelisiniz', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                  }
                  else if (res.data.code == 'password_must_more_8') {
                     _this.$bvToast.toast('Parola 8 karakterden fazla olmalı', {
                        title: `Başarısız..`,
                        variant: 'danger',
                        autoHideDelay: 500,
                        solid: true
                     });
                  }
                  else if (res.data.code == 'password_updated') {
                     _this.$bvToast.toast('Parola başarıyla güncellendi.', {
                        title: `Başarılı..`,
                        variant: 'success',
                        autoHideDelay: 500,
                        solid: true
                     });

                     setTimeout(() => {
                        _this.$router.push('uye-giris');
                     }, 1000);
                  }
               })
         }
      },
      async created() {
         this.refreshToken = this.$route.query.refreshToken
         if (this.refreshToken)
            this.controlRefreshToken()
      }
   }
</script>

<style>
#password_input+svg {
   position: absolute;
   right: 25px;
   bottom: 10px;
   cursor: pointer;
}</style>
