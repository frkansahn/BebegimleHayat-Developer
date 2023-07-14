<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-5">
            <div class="col-12 col-lg-8">
                <div class="row">
                    <div class="col-12 mb-5">
                        <h1 class="font-weight-normal">
                            Çocuk Boyu Hesaplama
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="col-12" :class="result != null ? 'result' : 'no-result'" id="cocukBoyuHesaplaForm">
                            <b-form class="row" v-if="result == null">
                                <b-form-group class="col-12 mb-4 h5" id="gender_group" label="Cinsiyet"
                                    label-for="gender_input" description="">
                                    <b-form-radio-group id="gender-radio-id" v-model="gender" name="gender-radio"
                                        class="mt-2">
                                        <b-form-radio :value="1">Kız</b-form-radio>
                                        <b-form-radio :value="0">Erkek</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="motherHeight_group" label="Annenin Boyu"
                                    label-for="motherHeight_input" description="">
                                    <b-input-group class="mb-2 mt-2 mr-sm-2 mb-sm-0">
                                        <b-form-input size="lg" class="border-right-0 border-dark rounded-0 px-2"
                                            id="motherHeight_input" v-model="motherHeight" placeholder="0"
                                            @keypress="isNumber($event)" type="number" required></b-form-input>
                                        <template #append>
                                            <b-input-group-text class="px-3">cm</b-input-group-text>
                                        </template>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="fatherHeight_group" label="Babanın Boyu"
                                    label-for="fatherHeight_input" description="">
                                    <b-input-group class="mb-2 mt-2 mr-sm-2 mb-sm-0">
                                        <b-form-input size="lg" class="border-right-0 border-dark rounded-0 px-2"
                                            id="fatherHeight_input" v-model="fatherHeight" placeholder="0"
                                            @keypress="isNumber($event)" type="number" required></b-form-input>
                                        <template #append>
                                            <b-input-group-text class="px-3">cm</b-input-group-text>
                                        </template>
                                    </b-input-group>
                                </b-form-group>

                                <div class="col-12 mt-3">
                                    <button type="button" class="btn btn-info py-3 px-5 rounded" @click="predict">
                                        <h6 class="font-weight-bold">
                                            <b-spinner small label="Loading..." v-if="isLoading" class="mr-2"></b-spinner>
                                            HESAPLA
                                        </h6>
                                    </button>
                                </div>
                            </b-form>
                            <div class="row p-5" v-else>
                                <div class="col-12 p-4 bg-white text-center" id="result">
                                    <div class="row">
                                        <div class="col-12 mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" width="60"
                                                height="60" viewBox="0 0 512 512" enable-background="new 0 0 512 512"
                                                id="Rulers" version="1.1" xml:space="preserve">
                                                <g id="Rulers_1_">
                                                    <g>
                                                        <g>
                                                            <path
                                                                d="M288.878,365.541H142.237V66.1h-6h-29.435H61.877V445.9h9.041h71.319h146.641V365.541z M276.878,377.541v10.894H142.237     v-10.894H276.878z M142.237,400.435h134.641v10.571H142.237V400.435z M106.803,78.1h23.435v56.962h-11.791v12h11.791v10.987     h-23.435v12h0.358v0.358h23.076v12.278h-11.791v12h11.791v12.277h-23.435v12h23.435v9.519h-11.791v12h11.791V250h-23.435v12     h23.435v10.987h-11.791v12h11.791v10.987h-23.435v12h23.435v10.988h-11.791v12h11.791v10.987h-23.435v12h23.435v15.12     l-56.36,56.831V78.1H106.803z M82.844,433.9l47.394-47.789V433.9H82.844z M142.237,433.9v-10.895h134.641V433.9H142.237z" />
                                                            <path
                                                                d="M102.058,121.853c9.405,0,17.058-7.652,17.058-17.058c0-9.406-7.652-17.058-17.058-17.058S85,95.389,85,104.795     C85,114.2,92.652,121.853,102.058,121.853z M102.058,99.737c2.789,0,5.058,2.269,5.058,5.058c0,2.788-2.269,5.058-5.058,5.058     S97,107.583,97,104.795C97,102.006,99.269,99.737,102.058,99.737z" />
                                                        </g>
                                                        <path
                                                            d="M401.81,113.619L212.525,302.903l48.313,48.313l189.284-189.284L401.81,113.619z M229.496,302.903l12.583-12.583    l8.525,8.525l8.484-8.486l-8.524-8.524l7.195-7.195l16.912,16.912l8.484-8.485l-16.912-16.912l7.395-7.394l8.436,8.435    l8.484-8.484l-8.436-8.435l7.556-7.556l16.571,16.571l8.484-8.485l-16.57-16.57l6.73-6.73l8.337,8.337l8.486-8.485l-8.338-8.338    l6.73-6.73l16.571,16.571l8.484-8.485l-16.57-16.571l7.77-7.77l8.338,8.338l8.484-8.485l-8.338-8.337l7.77-7.77l16.571,16.571    l8.484-8.485l-16.57-16.57l7.771-7.771l8.338,8.338l8.484-8.485l-8.338-8.338l7.77-7.77l16.571,16.571l8.484-8.486l-16.57-16.57    l8.195-8.195l31.343,31.343L260.839,334.246L229.496,302.903z" />
                                                        <g>
                                                            <path
                                                                d="M213.951,114.681v88.693l88.692-88.693H213.951z M225.951,126.681h47.722l-47.722,47.722V126.681z" />
                                                            <path
                                                                d="M202.011,77.196h-18.203h-6v212.991L390.799,77.196H202.011z M189.808,239.957h8.888v-12h-8.888v-9.537h15.991v-12     h-15.991v-9.537h8.888v-12h-8.888v-9.538h15.991v-12h-15.991v-9.537h8.888v-12h-8.888v-9.537h15.991v-12h-15.991v-9.537h8.888     v-12h-8.888v-9.537h12.203h159.817L189.808,261.217V239.957z" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>

                                        <div class="col-12 mb-4">
                                            <h6 class="font-weight-normal">
                                                Tahmini 18 yaşında <strong>{{ gender == 0 ? 'ERKEK' : 'KIZ' }}</strong>
                                                çocuğunuzun boyu
                                            </h6>
                                        </div>

                                        <div class="col-12 mb-4">
                                            <h4 class="d-flex align-items-center justify-content-center mb-2">
                                                <strong class="mr-1">{{ result }}</strong>cm
                                            </h4>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <h5 role="button" class="start-over" @click="doAgain">
                                                <small>
                                                    Tekrar Yap
                                                </small>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-12" id="cocukBoyuHesaplamaContent">
                                <h2>Bebek Boy Hesaplaması Nasıl Yapılır?</h2>
                                <br>
                                <p>Ebeveynler için bebeklerinin gelişim özelliklerini takip edebilmek fazlasıyla önemlidir.
                                    Bununla birlikte ilerleyen dönemlerde ebeveynlerin çocuklarından “boyum ne kadar
                                    uzayacak?” sorusunu duymaları da muhtemeldir. Bu noktada boy hesaplama yöntemleri ve
                                    araçları devreye girer. Peki, boy hesaplaması neden önemlidir ve boy hesabı için hangi
                                    yöntemlerden faydalanılabilir? Konuyla ilgili merak ettikleriniz Bebeğimlehayat’ta! </p>
                                <br><br>
                                <h2>Bebek Boy Hesaplaması Neden Önemlidir?</h2>
                                <br>
                                <p>Bebek boy hesaplaması, gelişim takibi için oldukça önemli veriler sağlar. Aynı cinsiyet
                                    ve yaştaki çocukların ortalama ve ideal boy, kilo ve baş çevresi ölçümleriyle belirlenen
                                    persentil eğrilerinin altında ya da üstünde olmak, bebeğinizin gelişim problemleri
                                    yaşadığını gösterebilir. Bu sebeple bebeğinizin gelişim sürecini takip edebilmek için
                                    boy takibi ve hesabı yapmanız gerekir. </p>
                                    <br>
                                <p>Boy tahmini, eğlenceli bir etkinlik olarak da değerlendirilebilir. Çocuklar için
                                    gelecekte kazanacakları fiziksel görünüm önemlidir. Bu sebeple boy hesaplama aracı bir
                                    etkinlik aracına da dönüşebilir.</p>
                                <br><br>
                                <h2>Bebeklerin Boyu Hangi Etkenlere Bağlıdır?</h2>
                                <br>
                                <p>Bebeklerin boy uzunluğu çeşitli etkenlere bağlı olarak gelişir. Bu etkenlerin başında
                                    genetik özellikler yatar. Anne ve babanın boyu, bebeğin boyunu doğrudan etkileyen
                                    faktörler arasında yer alır.</p>
                                <br>
                                <p>Bebeklerin boy uzunluğunu etkileyen bir diğer faktör ise cinsiyettir. Kız bebeklerde ve
                                    erkek bebeklerde gelişim süreçleri birbirinden farklı ilerler ve dolayısıyla boy
                                    uzunluğu takibi de farklı kriterler dahilinde gerçekleştirilir.</p>
                                <br>
                                <p>Bebeklerin boy uzunluğunu etkileyen etkenlerden bir diğeri de beslenme ve egzersizdir.
                                    Dengeli ve düzenli beslenme, ihtiyaç duyulan tüm besin gruplarının sağlıklı şekilde
                                    alınması boy uzamasını destekler. Özellikle kalsiyum ve magnezyum mineralleri kemikleri
                                    güçlendirerek hızlı boy uzamasına yardımcı olur. Egzersiz de kemikleri güçlendirir ve
                                    destek sistemini geliştirir.</p>
                                <br>
                                <p>Kemik yaşı da boy uzunluğunu ve uzama miktarını etkileyen faktörler arasında yer alır.
                                    Kemik yaşı röntgen gibi çeşitli görüntüleme yöntemleriyle öğrenilebilir.</p>
                                <br><br>
                                <h2>Bebek Boy Hesaplaması İçin Hangi Veriler Kullanılır?</h2>
                                <br>
                                <p>Bebek boy hesaplamasında kullanılan en temel veri cinsiyettir. Kız ve erkek bebeklerin
                                    boy uzunlukları, uzama dönemleri ve uzama miktarları birbirinden farklıdır. Bebek boy
                                    hesaplamasında anne ve babanın boy uzunlukları da kullanılan veriler arasında yer alır.
                                </p>
                                <br><br>
                                <h2>Bebek Boy Hesaplamasında Hangi Yöntemler Kullanılır?</h2>
                                <br>
                                <p>Boy hesaplama ve tahmin etme yöntemleri arasında en yaygın kullanılan yöntem Khamis-
                                    Roche yöntemidir. Bu yöntem 1990’lı yıllarda geniş bir katılımcı kitlesi yardımıyla
                                    geliştirilmiştir. Khamis- Roche yöntemide çocuğun boyu ve kilosu ile ebeveynlerin boy
                                    bilgileri gereklidir. Daha kesin bir tahmin yapabilmek için röntgen filmi de
                                    kullanılabilir.</p>
                                <br>
                                <p>Bebeklerin boy uzunluğunu tahmin etmek için kullanılan bir diğer yöntem ise “ikiyle
                                    çarpma” yöntemidir. Bu yöntem, bebeklerin hızlı gelişim özelliklerinden yola çıkılarak
                                    geliştirilmiştir. Bu yönteme göre erkek bebeklerin 24 aylıkken ve kız bebeklerin 18
                                    aylıkken boyları ölçülür ve ikiyle çarpılır. Bu yöntemde elde edilen veriler kesinlik
                                    bakımından tartışılabilir.</p>
                                <br>
                                <p>Bebeklerin yetişkinlikte erişecekleri boyu tahmin etmek için yaygın şekilde kullanılan
                                    ancak bilimsel açıdan sağlam temellendirilmeyen bir diğer yöntem de “ortalama”
                                    yöntemidir. Buna göre anne ve babanın boyları toplanıp ikiye bölünerek bebeğin
                                    yetişkinliğe eriştiğinde ulaşacağı boy uzunluğu tahmin edilebilir.</p>
                                <br>
                                <p>Temellendirilmeyen ve kesinliği olmayan boy tahmin etme yöntemlerinden bir diğerinde ise
                                    erkek bebekler için ebeveynlerinin boy ortalamasına 7.6 santimetre eklemek ve kız
                                    bebekler için ise ebeveynlerinin boy ortalamasından 7.6 santimetre çıkarmaktır.</p>
                                <br><br>
                                <h2>Bebeğimlehayat Bebek Boy Hesaplama Aracını Nasıl Kullanabilirsiniz?</h2>
                                <br>
                                <p>Bebeklerin boyu, gelişim takibi açısından oldukça önemli bir veridir. Ebeveynlerin boyu
                                    ve bebeğin gelişim özellikleri göz önünde bulundurularak basit bir boy hesaplaması
                                    yapılabilir. Bebeğimlehayat bebek boy hesaplama aracı sayesinde bebeğinizin boyunu
                                    pratik şekilde hesaplamanız mümkündür! </p>
                                <br><br>

                                <script type="application/ld+json">
                                    {
                                            "@context": "https://schema.org",
                                            "@type": "FAQPage",
                                            "mainEntity": [
                                                {
                                                "@type": "Question",
                                                "name": "Bebek Boy Hesaplaması Nasıl Yapılır?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Ebeveynler için bebeklerinin gelişim özelliklerini takip edebilmek fazlasıyla önemlidir. Bununla birlikte ilerleyen dönemlerde ebeveynlerin çocuklarından \“boyum ne kadar uzayacak?\” sorusunu duymaları da muhtemeldir. Bu noktada boy hesaplama yöntemleri ve araçları devreye girer. Peki, boy hesaplaması neden önemlidir ve boy hesabı için hangi yöntemlerden faydalanılabilir? Konuyla ilgili merak ettikleriniz Bebeğimlehayat’ta!"
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Bebek Boy Hesaplaması Neden Önemlidir?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Bebek boy hesaplaması, gelişim takibi için oldukça önemli veriler sağlar. Aynı cinsiyet ve yaştaki çocukların ortalama ve ideal boy, kilo ve baş çevresi ölçümleriyle belirlenen persentil eğrilerinin altında ya da üstünde olmak, bebeğinizin gelişim problemleri yaşadığını gösterebilir. Bu sebeple bebeğinizin gelişim sürecini takip edebilmek için boy takibi ve hesabı yapmanız gerekir.
                                            Boy tahmini, eğlenceli bir etkinlik olarak da değerlendirilebilir. Çocuklar için gelecekte kazanacakları fiziksel görünüm önemlidir. Bu sebeple boy hesaplama aracı bir etkinlik aracına da dönüşebilir."
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Bebeklerin Boyu Hangi Etkenlere Bağlıdır?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Bebeklerin boy uzunluğu çeşitli etkenlere bağlı olarak gelişir. Bu etkenlerin başında genetik özellikler yatar. Anne ve babanın boyu, bebeğin boyunu doğrudan etkileyen faktörler arasında yer alır.
                                            Bebeklerin boy uzunluğunu etkileyen bir diğer faktör ise cinsiyettir. Kız bebeklerde ve erkek bebeklerde gelişim süreçleri birbirinden farklı ilerler ve dolayısıyla boy uzunluğu takibi de farklı kriterler dahilinde gerçekleştirilir.
                                            Bebeklerin boy uzunluğunu etkileyen etkenlerden bir diğeri de beslenme ve egzersizdir. Dengeli ve düzenli beslenme, ihtiyaç duyulan tüm besin gruplarının sağlıklı şekilde alınması boy uzamasını destekler. Özellikle kalsiyum ve magnezyum mineralleri kemikleri güçlendirerek hızlı boy uzamasına yardımcı olur. Egzersiz de kemikleri güçlendirir ve destek sistemini geliştirir.
                                            Kemik yaşı da boy uzunluğunu ve uzama miktarını etkileyen faktörler arasında yer alır. Kemik yaşı röntgen gibi çeşitli görüntüleme yöntemleriyle öğrenilebilir."
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Bebek Boy Hesaplaması İçin Hangi Veriler Kullanılır?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Bebek boy hesaplamasında kullanılan en temel veri cinsiyettir. Kız ve erkek bebeklerin boy uzunlukları, uzama dönemleri ve uzama miktarları birbirinden farklıdır. Bebek boy hesaplamasında anne ve babanın boy uzunlukları da kullanılan veriler arasında yer alır."
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Bebek Boy Hesaplamasında Hangi Yöntemler Kullanılır?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Boy hesaplama ve tahmin etme yöntemleri arasında en yaygın kullanılan yöntem Khamis- Roche yöntemidir. Bu yöntem 1990’lı yıllarda geniş bir katılımcı kitlesi yardımıyla geliştirilmiştir. Khamis- Roche yöntemide çocuğun boyu ve kilosu ile ebeveynlerin boy bilgileri gereklidir. Daha kesin bir tahmin yapabilmek için röntgen filmi de kullanılabilir.
                                            Bebeklerin boy uzunluğunu tahmin etmek için kullanılan bir diğer yöntem ise \“ikiyle çarpma\” yöntemidir. Bu yöntem, bebeklerin hızlı gelişim özelliklerinden yola çıkılarak geliştirilmiştir. Bu yönteme göre erkek bebeklerin 24 aylıkken ve kız bebeklerin 18 aylıkken boyları ölçülür ve ikiyle çarpılır. Bu yöntemde elde edilen veriler kesinlik bakımından tartışılabilir.
                                            Bebeklerin yetişkinlikte erişecekleri boyu tahmin etmek için yaygın şekilde kullanılan ancak bilimsel açıdan sağlam temellendirilmeyen bir diğer yöntem de \“ortalama\” yöntemidir. Buna göre anne ve babanın boyları toplanıp ikiye bölünerek bebeğin yetişkinliğe eriştiğinde ulaşacağı boy uzunluğu tahmin edilebilir.
                                            Temellendirilmeyen ve kesinliği olmayan boy tahmin etme yöntemlerinden bir diğerinde ise erkek bebekler için ebeveynlerinin boy ortalamasına 7.6 santimetre eklemek ve kız bebekler için ise ebeveynlerinin boy ortalamasından 7.6 santimetre çıkarmaktır."
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Bebeğimlehayat Bebek Boy Hesaplama Aracını Nasıl Kullanabilirsiniz?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Bebeklerin boyu, gelişim takibi açısından oldukça önemli bir veridir. Ebeveynlerin boyu ve bebeğin gelişim özellikleri göz önünde bulundurularak basit bir boy hesaplaması yapılabilir. Bebeğimlehayat bebek boy hesaplama aracı sayesinde bebeğinizin boyunu pratik şekilde hesaplamanız mümkündür!"
                                                }
                                                }
                                            ]
                                        }
                                </script>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BlogToolNewBlogs />
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { FormPlugin, FormInputPlugin, InputGroupPlugin, FormGroupPlugin, FormRadioPlugin, SpinnerPlugin } from 'bootstrap-vue'
Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(InputGroupPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormRadioPlugin);
Vue.use(SpinnerPlugin);

export default {
    name: 'CocukBoyuHesaplama',
    head() {
        return {
            title: "Çocuk Boyu Hesaplama - BebeğimleHayat",
            meta: [
                { hid: 'keywords', name: 'keywords', content: 'bebegimlehayat,çocuk,boyu,hesaplama' },
                { hid: 'description', name: 'description', content: "Bebeğimlehayat'ta çocuk boyu hesaplama aracı sayesinde ihtiyaç duyduğunuz bilgilere pratik şekilde ulaşabilirsiniz!" },
                { hid: 'og:title', property: 'og:title', content: "Bebeğimlehayat'ta çocuk boyu hesaplama aracı sayesinde ihtiyaç duyduğunuz bilgilere pratik şekilde ulaşabilirsiniz!" }
            ],
        }
    },
    data() {
        return {
            navigation: undefined,

            gender: 1,
            motherHeight: null,
            fatherHeight: null,

            motherHeightError: false,
            fatherHeightError: false,

            result: null,
            isLoading: false
        }
    },
    methods: {
        isNumber: function (evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },
        predict() {
            if (this.gender == null) {
                this.$bvToast.toast("Cinsiyet seçmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                return false;
            }

            if (!this.motherHeight) {
                this.$bvToast.toast("Çocuğun annesinin boyunu girmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                this.motherHeightError = true;
                return false;
            }
            else {
                this.motherHeightError = false;
            }

            if (!this.fatherHeight) {
                this.$bvToast.toast("Çocuğun babasının boyunu girmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                this.fatherHeightError = true;
                return false;
            }
            else {
                this.fatherHeightError = false;
            }

            this.isLoading = true;

            setTimeout(() => {
                if (this.gender == 0) {
                    this.result = ((parseFloat(this.motherHeight) + parseFloat(this.fatherHeight) + 13) / 2).toFixed(0);
                }
                else {
                    this.result = ((parseFloat(this.motherHeight) + parseFloat(this.fatherHeight) - 13) / 2).toFixed(0);
                }

                this.isLoading = false;
            }, 2000)
        },
        doAgain() {
            this.result = null;
            this.motherHeight = null;
            this.fatherHeight = null;
        }
    },
    async created() {
        this.navigation = [
            {
                "name": "Çocuk Boyu Hesaplama",
                "url": "/cocuk-boyu-hesaplama"
            }
        ]
    }
}
</script>

<style>
#cocukBoyuHesaplaForm {
    background-color: rgb(235, 247, 250);
    padding: 3em;
    border-top: 11px solid rgb(216, 240, 245);
}

#cocukBoyuHesaplamaContent h2 {
    font-size: 20px;
}

#cocukBoyuHesaplamaContent p {
    font-size: 15px;
}

#cocukBoyuHesaplaForm.no-result:after {
    content: '';
    position: absolute;
    top: -30px;
    left: calc(50% - 25px);
    height: 50px;
    width: 50px;
    background: url(https://api.bebegimlehayat.com/Data/image/extra_small/cocuk_boyu_hesaplama-1684180646598.jpeg) no-repeat left bottom;
    background-size: 100%;
}

#cocukBoyuHesaplaForm.result:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 164px;
    width: 290px;
    background: url(/Data/bg_toolResult_lLeaf.svg) no-repeat left bottom;
    background-size: 100%;
}

#cocukBoyuHesaplaForm.result:before {
    top: 0;
    right: 0;
    content: '';
    position: absolute;
    height: 164px;
    width: 253px;
    background: url('/Data/bg_toolResult_rLeaf.svg') no-repeat left bottom;
    background-size: 100%;
    z-index: 2;
}

#cocukBoyuHesaplaForm .blue-eye path:nth-child(2) {
    color: #26b8f9;
}

#cocukBoyuHesaplaForm .green-eye path:nth-child(2) {
    color: #37c737;
}

#cocukBoyuHesaplaForm .brown-eye path:nth-child(2) {
    color: #a52a2a;
}

.result-description h6 {
    line-height: normal;
}

.result-description h6 a {
    border-bottom: 2px solid rgb(60, 182, 206);
}

#cocukBoyuHesaplaForm #result .man {
    color: #58adbe;
}

#cocukBoyuHesaplaForm #result .women {
    color: #ffc0cb;
}

#cocukBoyuHesaplaForm .start-over:hover {
    text-decoration: underline;
}

.vs__dropdown-toggle {
    padding: .6em !important;
    border: 0 !important;
}

.vs__search {
    font-size: 18px;
}</style>
