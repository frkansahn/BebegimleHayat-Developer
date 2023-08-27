<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-5">
            <div class="col-12 col-lg-8">
                <div class="row">
                    <div class="col-12 mb-5">
                        <h1 class="font-weight-normal">
                            Hamilelik Kilo Hesaplama
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="col-12" :class="result ? 'result' : 'no-result'" id="hamilelikKiloForm">
                            <b-form class="row" v-if="!result">
                                <b-form-group class="col-12 mb-4 h5" id="weight_group" label="Hamilelik öncesi kilonuz"
                                    label-for="weight_input" description="">
                                    <b-input-group class="mb-2 mt-2 mr-sm-2 mb-sm-0">
                                        <b-form-input size="lg" class="border-right-0 border-dark rounded-0 px-2"
                                            id="weight_input" v-model="beforePregnancyWeight" placeholder="0" :min="22"
                                            :max="204" @keypress="isNumber($event)" type="number" required></b-form-input>
                                        <template #append>
                                            <b-input-group-text class="px-3">kg</b-input-group-text>
                                        </template>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="now_weight_group" label="Şu anki kilonuz"
                                    label-for="now_weight_input" description="">
                                    <b-input-group class="mb-2 mt-2 mr-sm-2 mb-sm-0">
                                        <b-form-input size="lg" class="border-right-0 border-dark rounded-0 px-2"
                                            id="now_weight_input" v-model="nowWeight" placeholder="0" :min="22" :max="204"
                                            @keypress="isNumber($event)" type="number" required></b-form-input>
                                        <template #append>
                                            <b-input-group-text class="px-3">kg</b-input-group-text>
                                        </template>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="height_group" label="Boyunuz"
                                    label-for="height_input" description="">
                                    <b-input-group append="cm" class="mb-2 mt-2 mr-sm-2 mb-sm-0">
                                        <b-form-input size="lg" class="border-right-0 border-dark rounded-0 px-2"
                                            id="height_input" v-model="height" placeholder="0" :min="60" :max="244"
                                            @keypress="isNumber($event)" type="number" required></b-form-input>
                                        <template #append>
                                            <b-input-group-text class="px-3">cm</b-input-group-text>
                                        </template>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="week_pregnancy_group"
                                    label="Hamileliğinizin kaçıncı haftasındasınız?" label-for="week_pregnancy_input"
                                    description="">
                                    <v-select class="mt-2 border border-white" :clearable="false" v-model="weekPregnancy"
                                        placeholder="hafta seçiniz.." :options="weeks" label="name"
                                        :reduce="m => m.value"></v-select>
                                </b-form-group>

                                <div class="col-12 mt-3">
                                    <button type="button" class="btn btn-info py-3 px-5 rounded" @click="calculate">
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
                                        <div class="col-12 mb-4">
                                            <img loading="lazy"
                                                src="https://assets.babycenter.com/ims/2022/03/ic_weightGainCal.svg"
                                                alt="Terazi" width="80" height="70" />
                                        </div>

                                        <div class="col-12 mb-2">
                                            <h5 class="font-weight-normal">
                                                Hamilelik öncesi vücut kitle indeksiniz:
                                            </h5>
                                        </div>

                                        <div class="col-12 mb-3">
                                            <h2 class="font-weight-bold" :class="result == 0 ? 'man' : 'women'">
                                                {{ bodyIndex.toFixed(2) }}
                                            </h2>
                                        </div>

                                        <div class="col-12 mb-2">
                                            <h5 class="font-weight-normal">
                                                Önerilen hamilelik kilo alımınız:
                                            </h5>
                                        </div>

                                        <div class="col-12 mb-2">
                                            <h2 class="font-weight-bold" :class="result == 0 ? 'man' : 'women'">
                                                {{ lessAverage }} - {{ veryAverage }} kg
                                            </h2>
                                        </div>
                                        <div class="col-12 mb-3 mt-4">
                                            <h5 role="button" class="start-over"
                                                @click="result = null; selectedAge = null; selectedMonth = null;">
                                                <small>
                                                    Tekrar Yap
                                                </small>
                                            </h5>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-12 hamilelik-chart">
                                            <LineChart :chart-options="barChartOptions" :chart-data="data" class="w-100"
                                                chart-id="lineChart" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-12" id="hamilelikKiloContent">
                                <h2>Hamilelik Kilo Hesaplayıcı Nasıl Çalışıyor? </h2>
                                <br>
                                <p>Hamilelikte kilo alımı bebeğinizin sağlıklı gelişimi için son derece önemlidir. Ancak
                                    almanız gerekenden fazla kilo almanız aynı şekilde sağlıksız bir hamilelik süreci
                                    yaratabilir. Hamilelik kilo hesaplayıcımızı kullanarak hamilelikte ne kadar kilo almanız
                                    gerektiğini öğrenebilirsiniz. Burada karşılaşacağınız sonuçlar bilgi verme amaçlı olup
                                    doktor tavsiyesi niteliğini taşımamaktadır. Farklı kilo problemleriniz varsa
                                    doktorunuzla iletişime geçmeniz tavsiye edilir. </p>
                                <br><br>
                                <h2>Hamilelikte ne kadar kilo almalıyım? </h2>
                                <br>
                                <p>Hamilelikte almanız gereken kilo miktarı, hamilelik öncesi kilonuza ve vücut kitle
                                    indeksinize göre değişmektedir. Hamilelik kilo hesaplayıcısı vücut kitle indeksinize
                                    göre ne kadar kilo almanız gerektiğini size söyleyecektir. </p>
                                <br>
                                <p>Hamilelik kilo hesaplayıcı bilgilendirme amaçlı bir uygulamadır ve sizin aldığınız kilo
                                    ile tam olarak eşleşmeyebilir. Eğer kiloluysanız veya obezseniz kilo alma ihtiyacınız
                                    değişebilir. En sağlıklı ve doğru sonuçlar için doktorunuza başvurmalısınız. </p>
                                <br><br>
                                <h2>Hamilelikte ne yemeliyim? </h2>
                                <br>
                                <p>Sağlıklı bir hamilelik için beslenme düzeniniz de sağlıklı olmalıdır. Bu yüzden bütün
                                    zararlı alışkanlıklardan kurtulmalısınız. Genel beslenme düzeniniz her türlü besinden
                                    oluşan dengeli bir beslenme biçimi olmalıdır. </p>
                                <br>
                                <p>Folik asit yemeniz gereken besinlerin en başında gelmektedir. Folik asit kendi başına
                                    doğum kusurlarını kapatmakta etkilidir ve bebeğinizin her türlü gelişim problemini
                                    engelleyecektir. Özellikle beyin gelişiminde son derece etkilidir. Erken doğum riskini
                                    azaltır. Ispanak ve lahana gibi yapraklı yeşil sebzelerde, turunçgillerde ve kuru
                                    bakliyatta bulunur. </p>
                                <br>
                                <p>Bebeğinizin ihtiyacı olan bir diğer mineral ise kalsiyumdur. Kalsiyum kemik ve diş
                                    gelişimini destekler ve vücudun kas gelişimine katkıda bulunur. Yoğurt, süt ve peynir
                                    gibi süt ürünlerinden kolaylıkla tüketebilirsiniz. </p>
                                <br>
                                <p>Hem size hem de bebeğinize iyi gelecek vitaminlerden birisi D vitaminidir. D vitamini de
                                    kemik ve diş gelişimine katkıda bulunur. Turunçgiller, balık ve yumurtadan D vitamini
                                    alabileceğiniz gibi bolca güneş ışığına da ihtiyacınız vardır. </p>
                                <br>
                                <p>Hamilelik sırasında en çok tüketmeniz gerekenler besinlerden biri de proteindir. Protein
                                    hem sizin sağlığınız hem de bebeğinizin sağlığı için çok önemlidir. Et, balık, süt ve
                                    yumurtadan bolca protein elde edebilirsiniz. </p>
                                <br>
                                <p>Hamilelikte artan kan miktarını desteklemek için bolca demir tüketmelisiniz. Kandaki
                                    oksijenin rahatlıkla taşınması demir sayesinde gerçekleşmektedir. Artık bebeğinizin de
                                    vücudu olacağı için normalden daha fazla demire ihtiyacınız olacaktır. Demiri et, balık,
                                    bakliyat ve sebzelerden rahatlıkla elde edebilirsiniz. </p>
                                <br><br>
                                <h2>Hamilelikte hangi yiyeceklerden uzak durmalısınız? </h2>
                                <br>
                                <p>Hamilelikte sağlıklı beslenmenin bir diğer kuralı da spesifik yiyeceklerden uzak
                                    durmaktır. Örneğin bazı balıklar içlerinde yüksek miktarda cıva bulundurur. Bu yüzden
                                    derin denizde yüzen balıklardan kaçınmanız sizin için yararlı olabilir. Somon, ton
                                    balığı ve alabalık gibi balık gürleri yemeniz için güvenlidir. </p>
                                <br>
                                <p>Çiğ süt gibi pastörize edilmemiş gıda maddeleri, yıkanmamış sebze ve meyveler ve çiğ
                                    yiyeceklerden de uzak durulmalıdır. Bu yiyecekler zararlı bakteriler ve mikroplarla dolu
                                    olabilmektedir. </p>
                                <br>
                                <p>Hamile kadınlar aynı zamanda aşırı kafein ve alkol tüketmemelidir. Aşırı kafeinin
                                    hamilelik üzerindeki riskleri tam olarak bilinmese de yararı da bulunmamaktadır. Alkol
                                    ise direkt olarak gelişim bozukluklarına veya düşük gebeliğe sebep olabilmektedir.</p>
                                <br>
                                <p>Vücuda en çok zararı olan sigara, hamilelikte ekstra riskli. Sadece hamile olunca değil,
                                    hamilelikten uzun bir süre önce bırakılması gerekmektedir. Var olan tüm sağlık
                                    problemlerinin riskini arttırır ve bebek doğsa bile sağlıksız bir hayat sürmesine sebep
                                    olur.</p>
                                <br><br>
                                <h2>Vücut Kitle İndeksi (VKİ - BMI) nedir? </h2>
                                <br>
                                <p>Vücut kitle indeksi, yani VKİ ya da İngilizce adıyla Body Mass Index (BMI) boyunuzun
                                    kilonuza olan oranıyla hesaplanır. Hesaplama sonucunda düşük kilolu, sağlıklı kiloda,
                                    aşırı kilolu, obez veya morbid obez olabilirsiniz. Her birinin farklı hamilelik üzerinde
                                    farklı etkileri vardır. Kilonuz ve hamileliğiniz arasındaki bağı daha iyi anlamak için
                                    doktorunuza başvurmalısınız.</p>
                                <br><br>
                                <h2>Hamilelikte aşırı kilo alırsam ne olur? </h2>
                                <br>
                                <p>Hamilelikte aşırı kilo alımı gestasyonel diyabet, yüksek tansiyon ve çocuğunuzun obez
                                    olmasıyla sonuçlanabilir. Kilonuzdan endişeliyseniz doktorunuza mutlaka danışmalısınız.
                                </p>
                                <br><br>
                                <h2>Hamilelikte yeterince kilo almazsam ne olur? </h2>
                                <br>
                                <p>Hamilelikte az kilo almak erken doğum ve emzirme problemlerine yol açabilir. Aynı şekilde
                                    bebeğinizde obezite ve diyabet riskini arttırır. Kilonuzdan endişeliyseniz doktorunuza
                                    mutlaka danışmalısınız.</p>
                                <br><br>
                                <h2>Hamile kalmadan önce kaç kilo olduğumu bilmiyorsam ne yapmalıyım? </h2>
                                <br>
                                <p>Hamilelik öncesi kilonuzun net olması şart değildir. Tahmini bir değer de girebilirsiniz.
                                    Hamileliğin ilk 14 haftasındaysanız, hamileliğe bağlı olarak muhtemelen 2 kg
                                    almışsınızdır. Diğer yediklerinize göre bir tahminde bulunabilirsiniz.</p>
                                <br><br>
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
import Vue from "vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LinearScale,
    PointElement,
    LineElement
} from 'chart.js'
import { Line as LineChart } from 'vue-chartjs'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LinearScale,
    PointElement,
    LineElement
)


import { FormPlugin, FormInputPlugin, InputGroupPlugin, FormGroupPlugin, SpinnerPlugin } from 'bootstrap-vue'
Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(InputGroupPlugin);
Vue.use(FormGroupPlugin);
Vue.use(SpinnerPlugin);

export default {
    name: 'HamilelikKiloHesaplama',
    components: { LineChart },
    head() {
        return {
            title: "Hamilelik Kilo Hesaplama - BebeğimleHayat",
            meta: [
                { hid: 'description', name: 'description', content: "Hamilelikte kaç kilo alacağınızı merak ediyorsanız Bebeğimlehayat hamilelik kilo hesaplama aracımızdan faydalanabilir, pratik bir hesap yapabilirsiniz!" },
                { hid: 'og:title', property: 'og:title', content: "Hamilelikte kaç kilo alacağınızı merak ediyorsanız Bebeğimlehayat hamilelik kilo hesaplama aracımızdan faydalanabilir, pratik bir hesap yapabilirsiniz!" }
            ],
            script: [
                {
                    body: true,
                    type: 'application/ld+json',
                    json: {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Hamilelik Kilo Hesaplayıcı Nasıl Çalışıyor?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Hamilelikte kilo alımı bebeğinizin sağlıklı gelişimi için son derece önemlidir. Ancak almanız gerekenden fazla kilo almanız aynı şekilde sağlıksız bir hamilelik süreci yaratabilir. Hamilelik kilo hesaplayıcımızı kullanarak hamilelikte ne kadar kilo almanız gerektiğini öğrenebilirsiniz. Burada karşılaşacağınız sonuçlar bilgi verme amaçlı olup doktor tavsiyesi niteliğini taşımamaktadır. Farklı kilo problemleriniz varsa doktorunuzla iletişime geçmeniz tavsiye edilir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Hamilelikte ne kadar kilo almalıyım?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Hamilelikte almanız gereken kilo miktarı, hamilelik öncesi kilonuza ve vücut kitle indeksinize göre değişmektedir. Hamilelik kilo hesaplayıcısı vücut kitle indeksinize göre ne kadar kilo almanız gerektiğini size söyleyecektir.Hamilelik kilo hesaplayıcı bilgilendirme amaçlı bir uygulamadır ve sizin aldığınız kilo ile tam olarak eşleşmeyebilir. Eğer kiloluysanız veya obezseniz kilo alma ihtiyacınız değişebilir. En sağlıklı ve doğru sonuçlar için doktorunuza başvurmalısınız."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Hamilelikte ne yemeliyim?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Sağlıklı bir hamilelik için beslenme düzeniniz de sağlıklı olmalıdır. Bu yüzden bütün zararlı alışkanlıklardan kurtulmalısınız. Genel beslenme düzeniniz her türlü besinden oluşan dengeli bir beslenme biçimi olmalıdır.Folik asit yemeniz gereken besinlerin en başında gelmektedir. Folik asit kendi başına doğum kusurlarını kapatmakta etkilidir ve bebeğinizin her türlü gelişim problemini engelleyecektir. Özellikle beyin gelişiminde son derece etkilidir. Erken doğum riskini azaltır. Ispanak ve lahana gibi yapraklı yeşil sebzelerde, turunçgillerde ve kuru bakliyatta bulunur.Bebeğinizin ihtiyacı olan bir diğer mineral ise kalsiyumdur. Kalsiyum kemik ve diş gelişimini destekler ve vücudun kas gelişimine katkıda bulunur. Yoğurt, süt ve peynir gibi süt ürünlerinden kolaylıkla tüketebilirsiniz.Hem size hem de bebeğinize iyi gelecek vitaminlerden birisi D vitaminidir. D vitamini de kemik ve diş gelişimine katkıda bulunur. Turunçgiller, balık ve yumurtadan D vitamini alabileceğiniz gibi bolca güneş ışığına da ihtiyacınız vardır.Hamilelik sırasında en çok tüketmeniz gerekenler besinlerden biri de proteindir. Protein hem sizin sağlığınız hem de bebeğinizin sağlığı için çok önemlidir. Et, balık, süt ve yumurtadan bolca protein elde edebilirsiniz.Hamilelikte artan kan miktarını desteklemek için bolca demir tüketmelisiniz. Kandaki oksijenin rahatlıkla taşınması demir sayesinde gerçekleşmektedir. Artık bebeğinizin de vücudu olacağı için normalden daha fazla demire ihtiyacınız olacaktır. Demiri et, balık, bakliyat ve sebzelerden rahatlıkla elde edebilirsiniz."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Hamilelikte hangi yiyeceklerden uzak durmalısınız?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Hamilelikte sağlıklı beslenmenin bir diğer kuralı da spesifik yiyeceklerden uzak durmaktır. Örneğin bazı balıklar içlerinde yüksek miktarda cıva bulundurur. Bu yüzden derin denizde yüzen balıklardan kaçınmanız sizin için yararlı olabilir. Somon, ton balığı ve alabalık gibi balık gürleri yemeniz için güvenlidir.Çiğ süt gibi pastörize edilmemiş gıda maddeleri, yıkanmamış sebze ve meyveler ve çiğ yiyeceklerden de uzak durulmalıdır. Bu yiyecekler zararlı bakteriler ve mikroplarla dolu olabilmektedir.Hamile kadınlar aynı zamanda aşırı kafein ve alkol tüketmemelidir. Aşırı kafeinin hamilelik üzerindeki riskleri tam olarak bilinmese de yararı da bulunmamaktadır. Alkol ise direkt olarak gelişim bozukluklarına veya düşük gebeliğe sebep olabilmektedir.Vücuda en çok zararı olan sigara, hamilelikte ekstra riskli. Sadece hamile olunca değil, hamilelikten uzun bir süre önce bırakılması gerekmektedir. Var olan tüm sağlık problemlerinin riskini arttırır ve bebek doğsa bile sağlıksız bir hayat sürmesine sebep olur."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Vücut Kitle İndeksi (VKİ - BMI) nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Vücut kitle indeksi, yani VKİ ya da İngilizce adıyla Body Mass Index (BMI) boyunuzun kilonuza olan oranıyla hesaplanır. Hesaplama sonucunda düşük kilolu, sağlıklı kiloda, aşırı kilolu, obez veya morbid obez olabilirsiniz. Her birinin farklı hamilelik üzerinde farklı etkileri vardır. Kilonuz ve hamileliğiniz arasındaki bağı daha iyi anlamak için doktorunuza başvurmalısınız."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Hamilelikte aşırı kilo alırsam ne olur?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Hamilelikte aşırı kilo alımı gestasyonel diyabet, yüksek tansiyon ve çocuğunuzun obez olmasıyla sonuçlanabilir. Kilonuzdan endişeliyseniz doktorunuza mutlaka danışmalısınız."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Hamilelikte yeterince kilo almazsam ne olur?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Hamilelikte az kilo almak erken doğum ve emzirme problemlerine yol açabilir. Aynı şekilde bebeğinizde obezite ve diyabet riskini arttırır. Kilonuzdan endişeliyseniz doktorunuza mutlaka danışmalısınız."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Hamile kalmadan önce kaç kilo olduğumu bilmiyorsam ne yapmalıyım?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Hamilelik öncesi kilonuzun net olması şart değildir. Tahmini bir değer de girebilirsiniz. Hamileliğin ilk 14 haftasındaysanız, hamileliğe bağlı olarak muhtemelen 2 kg almışsınızdır. Diğer yediklerinize göre bir tahminde bulunabilirsiniz."
                                }
                            }
                        ]
                    }
                }
            ]
        }
    },
    data() {
        return {
            navigation: undefined,
            beforePregnancyWeight: null,
            nowWeight: null,
            height: null,
            weekPregnancy: null,

            beforePregnancyWeightError: false,
            nowWeightError: false,
            heightError: false,

            lessAverage: null,
            veryAverage: null,
            bodyIndex: null,
            result: false,
            isLoading: false,
            barChartOptions: {},
            data: {
                labels: [],
                datasets: []
            }
        }
    },
    computed: {
        weeks() {
            let weeks = [];
            for (let index = 4; index < 40; index++) {
                weeks.push({ name: index + ' Hafta', value: index });
            }
            return weeks;
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
        calculate() {
            if (!this.beforePregnancyWeight) {
                this.$bvToast.toast("Hamilelik öncesi kilonuzu girmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                this.beforePregnancyWeightError = true;
                return false;
            }
            else {
                if (this.beforePregnancyWeight < 22 || this.beforePregnancyWeight > 204) {
                    this.$bvToast.toast("Hamilelik öncesi kilonuz hatalıdır.", {
                        title: `Uyarı..`,
                        variant: 'warning',
                        autoHideDelay: 500,
                        solid: true
                    });

                    return false;
                }
                this.beforePregnancyWeightError = false;
            }

            if (!this.nowWeight) {
                this.$bvToast.toast("Şu anki kilonuzu girmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                this.nowWeightError = true;
                return false;
            }
            else {
                if (this.nowWeight < 22 || this.nowWeight > 204) {
                    this.$bvToast.toast("Şu anki kilonuz hatalıdır.", {
                        title: `Uyarı..`,
                        variant: 'warning',
                        autoHideDelay: 500,
                        solid: true
                    });

                    return false;
                }

                this.nowWeightError = false;
            }

            if (!this.height) {
                this.$bvToast.toast("Boyunuzu girmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                this.heightError = true;
                return false;
            }
            else {
                if (this.height < 60 || this.height > 244) {
                    this.$bvToast.toast("Boyunuz hatalıdır.", {
                        title: `Uyarı..`,
                        variant: 'warning',
                        autoHideDelay: 500,
                        solid: true
                    });

                    return false;
                }

                this.heightError = false;
            }

            if (!this.weekPregnancy) {
                this.$bvToast.toast("Hamileliğinizin kaçıncı haftasında olduğunuzu seçmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                return false;
            }

            this.isLoading = true;

            setTimeout(() => {
                this.bodyIndex = this.beforePregnancyWeight / (this.height * this.height / 10000);
                if (this.bodyIndex <= 18.5) {
                    this.lessAverage = 12;
                    this.veryAverage = 18;
                }

                if (this.bodyIndex > 18.5 && this.bodyIndex <= 26) {
                    this.lessAverage = 11;
                    this.veryAverage = 16;
                }

                if (this.bodyIndex > 26 && this.bodyIndex <= 29) {
                    this.lessAverage = 7;
                    this.veryAverage = 11;
                }

                if (this.bodyIndex > 29) {
                    this.lessAverage = 5;
                    this.veryAverage = 9;
                }

                (parseFloat(this.beforePregnancyWeight)) - 10, (parseFloat(this.beforePregnancyWeight) + parseFloat(this.veryAverage) + 10), ((parseFloat(this.nowWeight) + parseFloat(this.beforePregnancyWeight)) / 2), (parseFloat(this.nowWeight) + 10)

                let smallestWeight, biggestWeight;
                if (this.beforePregnancyWeight > this.nowWeight)
                    smallestWeight = parseFloat(this.nowWeight)
                else
                    smallestWeight = parseFloat(this.beforePregnancyWeight)

                if ((parseFloat(this.beforePregnancyWeight) + parseFloat(this.veryAverage)) > this.nowWeight)
                    biggestWeight = parseFloat(this.beforePregnancyWeight) + parseFloat(this.veryAverage);
                else
                    biggestWeight = this.nowWeight

                this.barChartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    pointStyle: 'star',
                    legend: { display: false },
                    title: false,
                    tooltips: {
                        backgroundColor: '#17BF62'
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            title: {
                                display: true,
                                text: 'Value'
                            },
                            autoSkip: false,
                            ticks: {
                                min: 0,
                                max: 40,
                                stepSize: 4
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Value'
                            },
                            min: parseFloat(smallestWeight) - 5,
                            max: parseFloat(biggestWeight) + 10
                        }
                    }
                }

                this.data = {
                    labels: Array.from(Array(41).keys()),
                    datasets: [
                        {
                            label: 'Minimum',
                            borderColor: '#a52a2a',
                            borderWidth: 3,
                            pointBorderWidth: 8,
                            backgroundColor: '#a52a2a',
                            data: [
                                {
                                    x: 2,
                                    y: this.beforePregnancyWeight
                                },
                                {
                                    x: 14,
                                    y: this.beforePregnancyWeight
                                },
                                {
                                    x: 40,
                                    y: (parseFloat(this.beforePregnancyWeight) + parseFloat(this.lessAverage))
                                }
                            ]
                        },
                        {
                            label: 'Maksimum',
                            borderColor: '#008000',
                            borderWidth: 3,
                            pointBorderWidth: 8,
                            backgroundColor: '#008000',
                            data: [
                                {
                                    x: 2,
                                    y: (parseFloat(this.beforePregnancyWeight) + 2)
                                },
                                {
                                    x: 14,
                                    y: (parseFloat(this.beforePregnancyWeight) + 2)
                                },
                                {
                                    x: 40,
                                    y: (parseFloat(this.beforePregnancyWeight) + parseFloat(this.veryAverage))
                                }
                            ]
                        },
                        {
                            label: 'Şuan ki kilonuz',
                            borderColor: '#000',
                            borderWidth: 8,
                            backgroundColor: '#000',
                            data: [{
                                x: this.weekPregnancy,
                                y: this.nowWeight
                            }]
                        }
                    ]
                }

                this.result = true;
                this.isLoading = false;
            }, 2000)
        }
    },
    async created() {
        this.navigation = [
            {
                "name": "Hamilelik Kilo Hesaplama",
                "url": "/hamilelik-kilo-hesaplama"
            }
        ]
    }
}
</script>

<style>
.hamilelik-chart canvas {
    height: 300px !important;
}

#hamilelikKiloForm {
    background-color: rgb(235, 247, 250);
    padding: 3em;
    border-top: 11px solid rgb(216, 240, 245);
}

#hamilelikKiloContent h2 {
    font-size: 20px;
}

#hamilelikKiloContent p {
    font-size: 15px;
}

#hamilelikKiloForm.no-result:after {
    content: '';
    position: absolute;
    top: -30px;
    left: calc(50% - 25px);
    height: 50px;
    width: 50px;
    background: url(https://api.bebegimlehayat.com/Data/image/extra_small/hamilelik_kilo_hesaplama-1684180646595.jpeg) no-repeat left bottom;
    background-size: 100%;
}

#hamilelikKiloForm.result:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 164px;
    width: 290px;
    background: url(/Data/bg_toolResult_lLeaf.svg) no-repeat left bottom;
    background-size: 100%;
}

#hamilelikKiloForm.result:before {
    top: 0;
    right: 0;
    content: '';
    position: absolute;
    height: 164px;
    width: 253px;
    background: url(/Data/bg_toolResult_rLeaf.svg) no-repeat left bottom;
    background-size: 100%;
    z-index: 2;
}

.result-description h6 {
    line-height: normal;
}

.result-description h6 a {
    border-bottom: 2px solid rgb(60, 182, 206);
}

#hamilelikKiloForm #result .man {
    color: #58adbe;
}

#hamilelikKiloForm #result .women {
    color: #ffc0cb;
}

#hamilelikKiloForm .start-over:hover {
    text-decoration: underline;
}

.vs__dropdown-toggle {
    padding: .6em !important;
    border: 0 !important;
}

.vs__search {
    font-size: 18px;
}
</style>
