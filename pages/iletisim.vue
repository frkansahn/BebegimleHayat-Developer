<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row">
            <div class="col-12 col-lg-9">
                <div class="row" v-if="$store.state.config">
                    <div class="col-12 mt-3">
                        <img src="/Data/iletisim.jpg"
                            alt="Bebeğimle Hayat İletişim" title="Bebeğimle Hayat İletişim">
                    </div>
                </div>
                <div class="row my-5 position-relative">
                    <b-overlay :show="contactOverlay" no-wrap></b-overlay>
                    <div class="col-12">
                        <h3>
                            Bize Ulaşın
                        </h3>
                        <p>
                            Aşağıda bulunan form alanından ya da <a href="mailto:destek@bebegimlehayat.com">destek@bebegimlehayat.com</a> mail adresi üzerinden bizlere mail atabilirsiniz.
                        </p>
                    </div>
                    <div class="col-12">
                        <div class="row">
                            <form @submit.prevent="contactSubmit" class="col-12" id="contactForm">
                                <div class="row mt-4">
                                    <div class="col-12 mb-3">
                                        <input class="form-control form-control-md py-4 px-3 bg-light" v-model="contact.name"
                                            type="text" name="name" placeholder="İsiminizi giriniz.." required />
                                    </div>
        
                                    <div class="col-12 mb-3">
                                        <input class="form-control form-control-md py-4 px-3 bg-light" v-model="contact.email"
                                            type="email" name="email" placeholder="E-Mail adresinizi giriniz.." required />
                                    </div>
        
                                    <div class="col-12 mb-3">
                                        <input class="form-control form-control-md py-4 px-3 bg-light" v-model="contact.subject"
                                            type="text" name="subject" placeholder="Konu giriniz.." />
                                    </div>
        
                                    <div class="col-12 mb-3">
                                        <textarea class="form-control form-control-md py-4 px-3 bg-light" rows="5"
                                            v-model="contact.message" placeholder="Mesajınızı giriniz.." name="message"
                                            required></textarea>
                                    </div>
        
                                    <div class="col-12 col-sm-6 col-md-4">
                                        <b-button type="submit" variant="outline-dark" size="lg"
                                            class="w-100 d-flex align-items-center justify-content-center">
                                            Gönder <b-icon-cursor-fill variant="dark" font-scale="0.9"
                                                class="ml-2"></b-icon-cursor-fill>
                                        </b-button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-3">

            </div>
        </div>
    </div>
</template>

<script>
export default
    {
        name: 'Contact',
        transition: {
            name: 'page-transition',
            mode: 'out-in'
        },
        head() {
            return {
                title: "İletişim - BebeğimleHayat",
                meta: [
                { hid: 'keywords', name: 'keywords', content: 'bebegimlehayat,iletişim' },
                { hid: 'description', name: 'description', content: 'BebeğimleHayat bebeğinizle ilgili ihtiyaç duyduğunuz her şeye tek tıkla ulaşabileceğiniz bir platformdur. Bebeğimlehayat iletişim bilgileri için tıklayın!' },
                { hid: 'og:title', property: 'og:title', content: 'İletişim - BebeğimleHayat' },
                { hid: 'og:description', property: 'og:description', content: 'BebeğimleHayat bebeğinizle ilgili ihtiyaç duyduğunuz her şeye tek tıkla ulaşabileceğiniz bir platformdur. Bebeğimlehayat iletişim bilgileri için tıklayın!' }
                ],
            }
        },
        data() {
            return {
                navigation: undefined,
                contact: {
                    name: undefined,
                    email: undefined,
                    subject: undefined,
                    message: undefined
                },
                contactOverlay: false
            }
        },
        props: {

        },
        methods: {
            contactSubmit() {
                var _this = this;
                _this.contactOverlay = true;
                _this.$repositories.contact.create(_this.contact)
                .then(res => {
                    if (res.data.success) {
                        setTimeout(() => {
                            _this.contact.name = undefined;
                            _this.contact.email = undefined;
                            _this.contact.subject = undefined;
                            _this.contact.message = undefined;
                            this.$bvToast.toast('Başvurunuz başarıyla iletildi.', {
                                title: `Başarılı..`,
                                variant: 'success',
                                autoHideDelay: 2000,
                                solid: true
                            })
                        }, 1000)

                    }
                    _this.contactOverlay = false;

                })
                .catch(err => {
                    _this.contactOverlay = false;
                })
            }
        },
        created() {
            var _this = this;
            _this.navigation = [
                {
                    "name": "İletişim",
                    "url": "/contact"
                }
            ]
        }
    }
</script>

<style> #contactPage {
     background: #f3f3f3;
 }

 #contactPage li {
     display: flex;
     list-style-type: none;
 }

 #contactPage li span {
     color: #000000;
     font-size: 16px;
 }

 #contactPage li span a {
     font-size: 18px;
     color: #000000
 }

 #contactForm [type="submit"]:hover svg {
     fill: #ffffff;
 }</style>
