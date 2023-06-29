<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-5">
            <div class="col-12 col-lg-8">
                <div class="row">
                    <div class="col-12 mb-5">
                        <h1 class="font-weight-normal">
                            Yumurtlama Günü Hesaplama
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="col-12" :class="markedDates.length > 0 ? 'result' : 'no-result'"
                            id="yumurtlamaGunuHesaplamaForm">
                            <b-form class="row" v-if="markedDates.length == 0">
                                <b-form-group class="col-12 mb-4 h5" id="select_first_day_group"
                                    label="Son adetinizin ilk günü" label-for="select_first_day_input" description="">
                                    <b-form-datepicker size="lg"
                                        label-help="Takvim tarihlerinde gezinmek için imleç tuşlarını kullanın"
                                        label-no-date-selected="Tarih seçilmedi" class="mt-2"
                                        :class="firstDayError ? 'border-danger' : 'border-white'" id="datepicker-buttons"
                                        v-model="firstDay" locale="tr" @click="firstDayError = false"
                                        placeholder="Gün seçiniz.."></b-form-datepicker>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="last_cycle_group"
                                    label="Son adet döngünüz ne kadar sürdü?" label-for="last_cycle_input" description="">
                                    <v-select class="mt-2 border" :class="lastCycleError ? 'border-danger' : 'border-white'"
                                        :clearable="false" @click="lastCycleError = false" v-model="lastCycle"
                                        placeholder="Süre seçiniz.." :options="days" label="name"
                                        :reduce="m => m.value"></v-select>
                                </b-form-group>

                                <div class="col-12 mt-3">
                                    <button type="button" class="btn btn-info py-3 px-5 rounded" @click="fertile">
                                        <h6 class="font-weight-bold">
                                            <b-spinner small label="Loading..." v-if="isLoading" class="mr-2"></b-spinner>
                                            Günlerime Bak
                                        </h6>
                                    </button>
                                </div>
                            </b-form>
                            <div class="row p-5" v-else>
                                <div class="col-12 p-4 bg-white text-center" id="result">
                                    <div class="row">
                                        <div class="col-12 col-lg-9 mx-auto">
                                            <div class="row mb-4">
                                                <div class="col-12 mb-3 d-flex align-items-center">
                                                    <b-icon-droplet-fill variant="danger" font-scale="3.5"
                                                        class="mr-3"></b-icon-droplet-fill>
                                                    <div class="text-left">
                                                        <h6 class="font-weight-normal mb-1">
                                                            Adet Tarihi
                                                        </h6>
                                                        <h5>
                                                            {{ firstDay | dateFormat }}
                                                        </h5>
                                                    </div>
                                                </div>

                                                <div class="col-12 mb-3 d-flex align-items-center">
                                                    <b-icon-flower1 variant="secondary" font-scale="3.5"
                                                        class="mr-3"></b-icon-flower1>
                                                    <div class="text-left">
                                                        <h6 class="font-weight-normal mb-1">
                                                            Doğurgan Günler
                                                        </h6>
                                                        <h5>
                                                            {{ dateFormatFertile(markedDates[5]) | moment("LL")
                                                            }} - {{ dateFormatFertile(markedDates[0]) | moment("LL") }}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row border-top pt-5 mt-4">
                                        <functional-calendar ref="Calendar" class="col-12 mb-4" :marked-dates="markedDates"
                                            :day-names="dayNames" :month-names="monthNames"></functional-calendar>

                                        <div class="col-12 mb-3">
                                            <h5 role="button" class="start-over"
                                                @click="doAgain">
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
                            <div class="col-12" id="yumurtlamaGunuHesaplamaContent">
                                <h2>Yumurtlama Günü Hesaplama Nedir?</h2>
                                <br>
                                <p>Yumurtlama günü hesaplayıcısı sonraki adet dönemini beklediğiniz günden 14 gün geriye
                                    sayarak ne zaman yumurtlayacağınızı tahmin eder. Burada döngü uzunluğunuz çok önemlidir.
                                    Döngü uzunluğunuza bağlı olarak yumurtlama günlerinizi değişecektir.</p>
                                <br>
                                <p>Doğurganlık günleriniz yumurtlayacağınız gün ve önceki beş günü kapsar. Bu 5 gün
                                    içerisinde hamile kalma olasılığınız gittikçe yükselir. Son 3 gün en yüksek olduğu
                                    dönemlerdir.</p>
                                <br>
                                <br>

                                <h2>Yumurtlama Belirtileri Nelerdir?</h2>
                                <br>
                                <p>Vücutta ısı artışı</p>
                                <br>
                                <p>Servikal mukus kıvamının yoğunlaşması</p>
                                <br>
                                <p>Göğüs hasssasiyeti</p>
                                <br>
                                <p>Karında hafif kramplar veya sancılar</p>
                                <br>
                                <p>Hafif lekelenme</p>
                                <br>
                                <p>Koku hassasiyeti</p>
                                <br>
                                <p>Artan cinsel istek</p>
                                <br>
                                <p>İştah artışı</p>
                                <br>
                                <p>Ruh hali değişiklikleri</p>
                                <br>
                                <p>Şişkinlik</p>
                                <br>
                                <br>

                                <h2>Hamile Kalmak İçin İpuçları Nelerdir?</h2>
                                <br>
                                <p>Yumurtlama günlerinizi takip edin.</p>
                                <br>
                                <p>Yumurtlama döneminde her gün sevişin.</p>
                                <br>
                                <p>Hamilelik öncesi vitaminler kullanın.</p>
                                <br>
                                <p>Farklı sağlık sorunlarınızın olmadığından emin olmak için doktor randevusu alın.</p>
                                <br>
                                <p>Hamilelikte sorun çıkarabilecek durumları şimdiden halledin.</p>
                                <br>
                                <p>Aşılarınızı eksiksiz olun.</p>
                                <br>
                                <p>Spor yapın ve sağlıklı beslenin.</p>
                                <br>
                                <br>


                                <h2>Yumurtlama nedir?</h2>
                                <br>
                                <p>Yumurtlama, yumurtalarınızdan yumurta hücresinin fallop tüplerine ilerlemesidir. Ardından
                                    yumurtalarınız orada spermler ile karşılaşıp döllenecektir.</p>
                                <br>
                                <br>

                                <h2>Yumurtlama ne zaman olur?</h2>
                                <br>
                                <p>Genellikle adet döngünüzün tam ortasında gerçekleşir. Eğer 28 günde bir adet oluyorsanız
                                    muhtemelen 14. günde yumurtlama dönemine gireceksinizdir. Ancak adet döngünüz sabit
                                    değilse tam yumurtlama gününü tutturmak zor olabilir. Bu yüzden yumurtlama belirtilerini
                                    de göz önünde bulundurmanız genellikle mantıklı bir seçim olacaktır.</p>
                                <br>
                                <br>

                                <h2>Yumurtlamak nasıl hissettirir?</h2>
                                <br>
                                <p>Yumurtlama alt karın bölgesinde hafif kramplar veya tek taraflı ağrı olarak kendini
                                    gösterebilir. Elbette her kadın kramp hissetmeyebilir. Bunun dışında fiziksel bir şey
                                    hissetmezsiniz.</p>
                                <br>
                                <br>

                                <h2>Yumurtlama ne kadar sürer?</h2>
                                <br>
                                <p>Yumurtlama genellikle 12 – 14 saat sürer. Eğer bu süreçte yumurta döllenmezse yok olur.
                                    Ancak spermler 5 günde kadar hayatta kalabildiğinden dolayı doğurganlık zamanınız 5
                                    gündür. Yumurtlamadan önceki 5 gün içerisinde sevişirseniz hamile kalabilirsiniz.</p>
                                <br><br>

                                <script type="application/ld+json">
                                    {
                                        "mainEntity" : [
                                    {
                                    "name" : " Yumurtlama Günü Hesaplama Nedir?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Yumurtlama günü hesaplayıcısı sonraki adet dönemini beklediğiniz günden 14 gün geriye sayarak ne zaman yumurtlayacağınızı tahmin eder. Burada döngü uzunluğunuz çok önemlidir. Döngü uzunluğunuza bağlı olarak yumurtlama günlerinizi değişecektir.
                                    Doğurganlık günleriniz yumurtlayacağınız gün ve önceki beş günü kapsar. Bu 5 gün içerisinde hamile kalma olasılığınız gittikçe yükselir. Son 3 gün en yüksek olduğu dönemlerdir.",
                                    "@type" : "Answer"
                                    },
                                    "@type" : "Question"
                                    },{
                                    "name" : " Yumurtlama Belirtileri Nelerdir?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Vücutta ısı artışı
                                    Servikal mukus kıvamının yoğunlaşması
                                    Göğüs hasssasiyeti
                                    Karında hafif kramplar veya sancılar
                                    Hafif lekelenme
                                    Koku hassasiyeti
                                    Artan cinsel istek
                                    İştah artışı
                                    Ruh hali değişiklikleri
                                    Şişkinlik",
                                    "@type" : "Answer"
                                    },
                                    "@type" : "Question"
                                    },{
                                    "name" : " Hamile Kalmak İçin İpuçları Nelerdir?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Yumurtlama günlerinizi takip edin.
                                    Yumurtlama döneminde her gün sevişin.
                                    Hamilelik öncesi vitaminler kullanın.
                                    Farklı sağlık sorunlarınızın olmadığından emin olmak için doktor randevusu alın.
                                    Hamilelikte sorun çıkarabilecek durumları şimdiden halledin.
                                    Aşılarınızı eksiksiz olun.
                                    Spor yapın ve sağlıklı beslenin.",
                                    "@type" : "Answer"
                                    },
                                    "@type" : "Question"
                                    },{
                                    "name" : " Yumurtlama nedir?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Yumurtlama, yumurtalarınızdan yumurta hücresinin fallop tüplerine ilerlemesidir. Ardından yumurtalarınız orada spermler ile karşılaşıp döllenecektir.",
                                    "@type" : "Answer"
                                    },
                                    "@type" : "Question"
                                    },{
                                    "name" : " Yumurtlama ne zaman olur?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Genellikle adet döngünüzün tam ortasında gerçekleşir. Eğer 28 günde bir adet oluyorsanız muhtemelen 14. günde yumurtlama dönemine gireceksinizdir. Ancak adet döngünüz sabit değilse tam yumurtlama gününü tutturmak zor olabilir. Bu yüzden yumurtlama belirtilerini de göz önünde bulundurmanız genellikle mantıklı bir seçim olacaktır.",
                                    "@type" : "Answer"
                                    },
                                    "@type" : "Question"
                                    },{
                                    "name" : " Yumurtlamak nasıl hissettirir?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Yumurtlama alt karın bölgesinde hafif kramplar veya tek taraflı ağrı olarak kendini gösterebilir. Elbette her kadın kramp hissetmeyebilir. Bunun dışında fiziksel bir şey hissetmezsiniz.",
                                    "@type" : "Answer"
                                    },
                                    "@type" : "Question"
                                    },{
                                    "name" : " Yumurtlama ne kadar sürer?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Yumurtlama genellikle 12 – 14 saat sürer. Eğer bu süreçte yumurta döllenmezse yok olur. Ancak spermler 5 günde kadar hayatta kalabildiğinden dolayı doğurganlık zamanınız 5 gündür. Yumurtlamadan önceki 5 gün içerisinde sevişirseniz hamile kalabilirsiniz.",
                                    "@type" : "Answer"
                                    },
                                    "@type" : "Question"
                                    }    ],
                                        "@type" : "FAQPage",
                                        "@context" : "http://schema.org"
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
export default {
    name: 'YumurtlamaGunuHesaplama',
    head() {
        return {
            title: "Yumurtalama Günü Hesaplama - BebeğimleHayat ",
            meta: [
                { hid: 'keywords', name: 'keywords', content: 'bebegimlehayat,yumurtlama,gunu,hesaplama' },
                { hid: 'description', name: 'description', content: "Yumurtlama günü hesaplama hamile kalmak açısından oldukça önemlidir. Bebeğimlehayat'ta pratik yumurtlama günü hesaplayıcısını kullanabilirsiniz!" },
                { hid: 'og:title', property: 'og:title', content: "Yumurtlama günü hesaplama hamile kalmak açısından oldukça önemlidir. Bebeğimlehayat'ta pratik yumurtlama günü hesaplayıcısını kullanabilirsiniz!" }
            ],
        }
    },
    data() {
        return {
            navigation: undefined,
            firstDay: new Date().toISOString(),
            lastCycle: 28,

            firstDayError: false,
            lastCycleError: false,

            result: null,
            markedDates: [],

            dayNames: [
                "Pzt",
                "Sal",
                "Çar",
                "Per",
                "Cum",
                "Cmt",
                "Paz"
            ],
            monthNames: [
                "Ocak",
                "Şubat",
                "Mart",
                "Nisas",
                "Mayıs",
                "Haziran",
                "Temmuz",
                "Agustos",
                "Eylül",
                "Ekim",
                "Kasım",
                "Aralık"
            ],

            isLoading: false
        }
    },
    computed: {
        days() {
            let days = [];
            for (let index = 20; index < 45; index++) {
                days.push({ name: index + ' Gün', value: index });
            }
            return days;
        }
    },
    methods: {
        doAgain(){
            this.markedDates = []; 
            this.firstDay = new Date(); 
            this.lastCycle = 28; 
            this.isLoading = false;
            
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
        dateFormatFertile(value) {
            if (!value) return ''

            value = value.split('/');
            return new Date(value[1] + "/" + value[0] + "/" + value[2]).toDateString();
        },
        fertile() {
            if (!this.firstDay) {
                this.firstDayError = true;
                return false;
            }
            else {
                this.firstDayError = false;
            }

            if (!this.lastCycle) {
                this.lastCycleError = true;
                return false;
            }
            else {
                this.lastCycleError = false;
            }

            this.isLoading = true;


            setTimeout(() => {
                let firstDay = new Date(this.firstDay);
                firstDay.setDate(firstDay.getDate() + this.lastCycle);

                firstDay.setDate(firstDay.getDate() - 14);

                for (let index = 0; index < 6; index++) {
                    this.markedDates.push(firstDay.getDate() + "/" + (firstDay.getMonth() + 1) + "/" + firstDay.getFullYear())
                    firstDay.setDate(firstDay.getDate() - 1);
                }

                setTimeout(() => {
                    this.$refs.Calendar.ChooseDate(this.markedDates[this.markedDates.length - 1]);
                }, 1000)
            }, 2000)
        }
    },
    async created() {
        this.navigation = [
            {
                "name": "Yumurtlama Günü Hesaplama",
                "url": "/yumurtlama-gunu-hesaplama"
            }
        ]
    }
}
</script>

<style>
#yumurtlamaGunuHesaplamaForm {
    background-color: rgb(235, 247, 250);
    padding: 3em;
    border-top: 11px solid rgb(216, 240, 245);
}

#yumurtlamaGunuHesaplamaForm #result {
    border-top: 18px solid rgb(1, 97, 116);
}

#yumurtlamaGunuHesaplamaContent h2 {
    font-size: 20px;
}

#yumurtlamaGunuHesaplamaContent h3 {
    font-size: 18px;
}

#yumurtlamaGunuHesaplamaContent p {
    font-size: 15px;
}

#yumurtlamaGunuHesaplamaForm.no-result:after {
    content: '';
    position: absolute;
    top: -30px;
    left: calc(50% - 25px);
    height: 50px;
    width: 50px;
    background: url(https://assets.babycenter.com/ims/2022/03/ic_tool_chineseGender.svg) no-repeat left bottom;
    background-size: 100%;
}

#yumurtlamaGunuHesaplamaForm.result:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 164px;
    width: 290px;
    background: url(/Data/bg_toolResult_lLeaf.svg) no-repeat left bottom;
    background-size: 100%;
}

#yumurtlamaGunuHesaplamaForm.result:before {
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

.result-description h6 {
    line-height: normal;
}

.result-description h6 a {
    border-bottom: 2px solid rgb(60, 182, 206);
}

#yumurtlamaGunuHesaplamaForm #result .man {
    color: #58adbe;
}

#yumurtlamaGunuHesaplamaForm #result .women {
    color: #ffc0cb;
}

#yumurtlamaGunuHesaplamaForm .start-over:hover {
    text-decoration: underline;
}

.vs__dropdown-toggle {
    padding: .6em;
}

.vs__search {
    font-size: 18px;
}


@media (max-width: 768px) {
    #yumurtlamaGunuHesaplamaForm {
        padding: 1em;
    }
}</style>
