<template>
    <div class="customer-detail" id="customerDetail">
        <AdminHeader />
        <div class="admin-content-wrapper" v-if="isLoading">
            <div class="col-12">
                <div class="row mb-5">
                    <div class="col-12 px-0">
                        <button type="button" class="btn btn-info px-4" @click="print">
                            Yazdır
                        </button>
                    </div>
                </div>
                <div class="row" id="printCustomer" style="height: 841pt;">
                    <div class="col-12 py-3 px-5 h-100">
                        <div class="row border border-dark h-100">
                            <div class="col-5 pl-4 h-100" style="background-color: #9b9b9b;">
                                <div class="row">
                                    <div class="col-12 text-center my-3">
                                        <img src="/Data/bebegimlehayat-logo.svg" alt="Logo" style="max-height: 80px;"/>
                                    </div>
                                    <div class="col-12 text-center" v-if="customer.fotograf">
                                        <img :src="customer.fotograf" style="max-height: 150px;">
                                    </div>
                                    <div class="col-12 text-center my-3">
                                        <h4>
                                            {{customer.name}}&nbsp;  {{customer.surname}} 
                                        </h4>
                                    </div>
                                    <div class="col-12 my-4 border-bottom border-dark" style="border-width:3px !important;">
                                        <h4 class="font-weight-bold">
                                            KİŞİSEL&nbsp;  BİLGİLER
                                        </h4>
                                    </div>
                                    <div class="col-12">
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> TC Kimlik No : </label>
                                            <strong>
                                                {{customer.tc_kimlik}}
                                            </strong>
                                        </div>
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> Doğum Tarihi : </label>
                                            <strong>
                                                {{customer.birthday}}
                                            </strong>
                                        </div>
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> Doğum Yeri : </label>
                                            <strong>
                                                {{customer.place_of_birth}}
                                            </strong>
                                        </div>
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> Cinsiyet : </label>
                                            <strong>
                                                {{customer.cinsiyet == 1 ? 'Kadın' : 'Erkek'}}
                                            </strong>
                                        </div>
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> Boy : </label>
                                            <strong>
                                                {{customer.boy}}
                                            </strong>
                                        </div>
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> Kilo : </label>
                                            <strong>
                                                {{customer.kilo}}
                                            </strong>
                                        </div>
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> Askerlik Durumu : </label>
                                            <strong>
                                                {{customer.askerlik}}
                                            </strong>
                                        </div>
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> Medeni Durumu : </label>
                                            <strong>
                                                {{customer.medeni_durum}}
                                            </strong>
                                        </div>
                                    </div>

                                    <div class="col-12 my-4 border-bottom border-dark" style="border-width:3px !important;">
                                        <h4 class="font-weight-bold">
                                            İLETİŞİM&nbsp;  BİLGİLERİ
                                        </h4>
                                    </div>
                                    <div class="col-12">
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> Nüf. Kay. Old. İl : </label>
                                            <strong>
                                                {{customer.il}}
                                            </strong>
                                        </div>
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> Nüf. Kay. Old. İlçe : </label>
                                            <strong>
                                                {{customer.ilce}}
                                            </strong>
                                        </div>
                                        <div class="h5" style="float: left;width: 100%">
                                            <label> İkametgah Adresi : </label>
                                            <strong>
                                                {{customer.address}}
                                            </strong>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-4">
                                        <div class="row">
                                            <div class="col-12 h5">
                                                <b-icon icon="telephone-fill" variant="dark" font-scale="1"></b-icon>
                                                CEP NO : <strong> {{customer.phone}} </strong>
                                            </div>
                                            <div class="col-12 h5">
                                                <b-icon icon="envelope-fill" variant="dark" font-scale="1"></b-icon>
                                                Mail : <strong> {{customer.email}} </strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12" v-if="customer_advert_info" style="position: absolute;bottom: 0;">
                                        <div class="row">
                                            <div class="col-12 h5">
                                                Başvuru Tarihi / Saat / IP : <strong> {{customer_advert_info.createdAt | dateFormat}} /  {{customer_advert_info.createdAt | timeFormat}} / {{customer_advert_info.ip}} </strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-7 h-100" v-if="cv">
                                <div class="row mb-4" v-if="advert">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 my-2 border-bottom border-dark" style="border-width:3px !important;">
                                                <h5 class="font-weight-bold">
                                                    BAŞVURU&nbsp;  YAPILAN&nbsp;  POZİSYON
                                                </h5>
                                            </div>
                                            <div class="col-12 mb-1">
                                                <h6 class="text-uppercase">
                                                    {{advert.name}}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row" id="education_info">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 mb-2 border-bottom border-dark" style="border-width:3px !important;">
                                                <h5 class="font-weight-bold">
                                                    EĞİTİM&nbsp;  BİLGİLERİ
                                                </h5>
                                            </div>
                                            <div class="col-12 py-lg-2">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-12 pb-1 mb-1 border-bottom" v-for="(egitim,index) in cv.egitim_bilgileri">
                                                                <div class="row">
                                                                    <div class="col-12">
                                                                        <div class="row">
                                                                            <div class="col-12 mb-2">
                                                                                <h6>
                                                                                    <strong class="text-primary">{{egitim.egitim_durumu}}</strong>
                                                                                </h6>
                                                                            </div>
                                                                            <div class="col-12" v-if="!['İlkokul','Ortaokul','Lise'].includes(egitim.egitim_durumu)">
                                                                                <div class="row">
                                                                                    <div class="col-sm-6 col-12 mb-1" v-if="egitim.universite != ''">
                                                                                        <small class="text-secondary">
                                                                                            Üniversite
                                                                                        </small>
                                                                                        <br/>
                                                                                        <span class="font-weight-bold">
                                                                                            {{egitim.universite}}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div class="col-sm-6 col-12 mb-1" v-if="egitim.bolum != ''">
                                                                                        <small class="text-secondary">
                                                                                            Bölüm
                                                                                        </small>
                                                                                        <br/>
                                                                                        <span class="font-weight-bold">
                                                                                            {{egitim.bolum}}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="col-12" v-else>
                                                                                <div class="row">
                                                                                    <div class="col-12 mb-1" v-if="egitim.okul != ''">
                                                                                        <small class="text-secondary">
                                                                                            Okul Adı
                                                                                        </small>
                                                                                        <br/>
                                                                                        <span class="font-weight-bold">
                                                                                            {{egitim.okul}}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row" id="work_experience">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 mb-2 border-bottom border-dark" style="border-width:3px !important;">
                                                <h5 class="font-weight-bold">
                                                    İŞ DENEYİMLERİ
                                                </h5>
                                            </div>
                                            <div class="col-12 py-lg-2">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <ul class="row">
                                                            <li class="col-12 pb-1 mb-1 border-bottom" v-for="(deneyim,index) in cv.is_deneyimi">
                                                                <div class="row">
                                                                    <strong class="h6 mb-1 font-weight-bold">
                                                                        {{deneyim.firmaAdi}}
                                                                    </strong>
                                                                </div>
                                                                <div class="row">
                                                                    <span class="h6 mb-1">
                                                                        {{deneyim.baslangicTarihi}} - {{deneyim.halaCalisiyorum == true ? "Hala çalışıyorum" : deneyim.bitisTarihi}} / {{deneyim.pozisyon}}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                
                                <div class="row" id="referanslar">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 mb-2 border-bottom border-dark" style="border-width:3px !important;">
                                                <h5 class="font-weight-bold">
                                                    REFERANSLAR
                                                </h5>
                                            </div>
                                            <div class="col-12 py-lg-3">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <ul class="row">
                                                            <li class="col-12 pb-1 mb-1 border-bottom" v-for="(referans,index) in cv.referanslar">
                                                                <div class="row">
                                                                    <strong class="h6 mb-1 font-weight-bold">
                                                                        {{referans.name}} {{referans.surname}} 
                                                                    </strong>
                                                                </div>
                                                                <div class="row">
                                                                    <span class="h6 mb-1">
                                                                        {{referans.position}} / {{referans.phone}}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row" id="summary">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 my-3 border-bottom border-dark" style="border-width:3px !important;">
                                                <h4 class="font-weight-bold">
                                                    ÖZET BİLGİ
                                                </h4>
                                            </div>
                                            <div class="col-12 py-lg-1">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="row">
                                                            <div class="col-12">
                                                                <div v-html="cv.ozet"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
    import html2pdf from 'html2pdf.js'
    export default
    {
        name: 'AdminCustomerDetail',
        layout: 'admin',
        components: {
            'editor': Editor
        },
        data() {
            return {
                isLoading: false,
                customer: undefined,
                customer_advert_info: undefined,
                token: undefined,
                cv: undefined,
                advert:undefined
            }
        },
        props: {

        },
        methods: {
            print() {
                html2pdf(document.getElementById("printCustomer"), {
                    margin: 0,
                    filename: this.customer.name + "_" + this.customer.surname + "_cv.pdf",
                });
            },
            getCustomerById() {
                var _this = this;
                _this.$store.dispatch('getService', { "urlParameter": "/api/v1/customer/all_info/" + _this.$route.params.id, "token": _this.token })
                    .then(response => {
                        if (response) {
                            _this.isLoading = true;
                            _this.customer = response[0];
                            _this.customer.birthday = new Date(_this.customer.birthday).toLocaleDateString()
                            _this.cv = response[0].cv
                        }
                    });
            },
            getAdvertDetail() {
                var _this = this;
                var advert_id = _this.$route.query.advert;
                _this.$store.dispatch('getService', { "urlParameter": "/api/v1/advert/ForAdmin/" + advert_id, "token": _this.token })
                .then(response => {
                    if (response) _this.advert = response[0];
                });
            },
            getCustomerAdvertInfo() {
                var _this = this;
                let reqData = {
                    advert_id : _this.$route.query.advert,
                    customer_id : _this.$route.params.id
                }
                _this.$store.dispatch('postService', {"data": reqData ,  "urlParameter": "/api/v1/customer_advert/getAdvertDateAndIp/", "token": _this.token })
                .then(response => {
                    if (response.success == 'success') _this.customer_advert_info = response.data[0];
                });
            },
        },
        async mounted() {
            var _this = this;
            var token = _this.$cookiz.get("admintoken");
            var userId = _this.$cookiz.get("_userId");
            if (token && userId) {
                _this.token = token;
                _this.getCustomerById();
                _this.getAdvertDetail();
                _this.getCustomerAdvertInfo();
            }
            else {
                _this.$bvToast.toast('Admin bulunamadı tekrar giriş yapınız.', {
                    title: `Başarısız..`,
                    variant: 'danger',
                    autoHideDelay: 500,
                    solid: true
                });
                setTimeout(() => {
                    _this.$router.push("/admin/login");
                }, 1500)
            }
        }
    }
</script>

<style>   
</style>
