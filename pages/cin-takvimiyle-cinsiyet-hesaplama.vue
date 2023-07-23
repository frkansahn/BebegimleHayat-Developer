<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-5">
            <div class="col-12 col-lg-8">
                <div class="row">
                    <div class="col-12 mb-5">
                        <h1 class="font-weight-normal">
                            Çin Takvimiyle Cinsiyet Hesaplama
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="col-12" :class="result != null ? 'result' : 'no-result'" id="cinsiyetTahminiForm">
                            <b-form class="row" v-if="result == null">
                                <b-form-group class="col-12 mb-4 h5" id="select_age_group"
                                    label="Hamile kaldığınızda kaç yaşınızdaydınız?" label-for="select_age_input"
                                    description="">
                                    <v-select class="mt-2 border" :class="ageError ? 'border-danger' : 'border-white'"
                                        :clearable="false" @click="ageError = false" v-model="selectedAge"
                                        placeholder="yaş seçiniz.." :options="ages"></v-select>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="select_month_group"
                                    label="Hangi ay hamile kaldınız?" label-for="select_month_input" description="">
                                    <v-select class="mt-2 border" :class="monthError ? 'border-danger' : 'border-white'"
                                        :clearable="false" @click="monthError = false" v-model="selectedMonth"
                                        placeholder="ay seçiniz.." :options="months" label="name"
                                        :reduce="m => m.value"></v-select>
                                </b-form-group>

                                <div class="col-12 mt-3">
                                    <button type="button" class="btn btn-info py-3 px-5 rounded" @click="predict">
                                        <h6 class="font-weight-bold">
                                            <b-spinner small label="Loading..." v-if="isLoading" class="mr-2"></b-spinner>
                                            TAHMİN ET
                                        </h6>
                                    </button>
                                </div>
                            </b-form>
                            <div class="row p-5" v-else>
                                <div class="col-12 p-4 bg-white text-center" id="result">
                                    <div class="row">
                                        <div class="col-12 mb-3">
                                            <img loading="lazy"
                                                :src="result == 1 ? 'https://assets.babycenter.com/ims/2022/03/ic_tool_chineseGender_girl.svg' : 'https://assets.babycenter.com/ims/2022/03/ic_tool_chineseGender_boy.svg'"
                                                alt="Leylek" width="80" height="70" />
                                        </div>

                                        <div class="col-12 mb-3">
                                            <h6 class="font-weight-normal">
                                                Çin Takvimine göre bebeğinizin cinsiyeti
                                            </h6>
                                        </div>

                                        <div class="col-12 mb-1">
                                            <h1 class="font-weight-bold" :class="result == 0 ? 'man' : 'women'">
                                                {{ result == 0 ? 'Erkek' : 'Kız' }}
                                            </h1>
                                        </div>
                                        <div class="col-12 mb-3">
                                            <h5 role="button" class="start-over"
                                                @click="result = null; selectedAge = null; selectedMonth = null;">
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
                            <div class="col-12" id="cinsiyetTahminiContent">
                                <h2>Çin Takvimi Cinsiyet Hesaplayıcısı Nedir? </h2>
                                <br>
                                <p>Bebeğinizin cinsiyetini merak mı ediyorsunuz? Çin Takvimi Cinsiyet Hesaplayıcımızı
                                    kullanarak Kadim Çin Ay Takvimine göre bebeğinizin cinsiyetini tahmin edebilirsiniz.
                                </p>
                                <br>
                                <p>Çin Takvimi Cinsiyet Hesaplayıcı bilimsel bir araç değildir. Eskiden gerçek bir yöntem
                                    olarak kullanılmış olsa da günümüzde sadece eğlenceli amaçlıdır. Elbette tahmin olarak
                                    kız ve erkek seçenekleri olduğu için doğru tahmin etme şansı %50! </p>
                                <br>
                                <p>Çin Takvimi Cinsiyet Hesaplayıcıyı kullanmak için tek yapman gereken yukarıdaki bilgileri
                                    doldurmak ve Tahmin Et tuşuna tıklamak. </p>
                                <br><br>
                                <h2>Çin Takvimine Göre Cinsiyet Tahmin Etme Nedir? </h2>
                                <br>
                                <p>Çin takvimine göre cinsiyet tahmin etme yaklaşık 700 senelik bir yöntemdir. Efsanelere
                                    göre kraliyet ailesinin mezarında keşfedilmiştir. Çinli Astrologlar Çin takvimine göre
                                    cinsiyet hesaplamayı önermektedir. Ancak bu yöntemin nereden çıktığına dair kesin kanıt
                                    bulunmamaktadır. </p>
                                <br>
                                <p>Çin takvimine göre cinsiyet hesaplamada annenin yaşı ve hamile kaldığı aya göre Çin Ay
                                    Takviminin karşılaştırılması bebeğin cinsiyetini vermektedir. </p>
                                <br><br>
                                <h2>Çin Takvimine Göre Cinsiyet Tahmini Ne Kadar Tutarlıdır? </h2>
                                <br>
                                <p>Michigan Üniversitesi araştırmacıları Çin Ay Takviminin doğruluğu üzerine bir araştırma
                                    yürüttü. Araştırmada İsveç’e ait 2,8 milyon doğum verisi kullanıldı. Her annenin yaşı,
                                    ne zaman hamile kaldığı özel algoritma ile birleştirildi. </p>
                                <br>
                                <p>Araştırmalar sonuçlandığında Çin takviminin başarı oranı %50’ydi. Yani eğlence amaçlı
                                    kullanılan bu yöntem %50 ihtimalle tesadüfi doğru sonuçlar vermektedir. </p>
                                <br><br>
                                <h2>Bebeğimin Cinsiyetini Kesin Olarak Nasıl Öğrenebilirim? </h2>
                                <br>
                                <p>Bebeğinizin cinsiyetini bilimsel olarak öğrenmenin birkaç yolu bulunmaktadır. 10.
                                    haftadan itibaren uygulanılmaya başlayan NIPT ile bebeğinizin cinsiyetini
                                    öğrenebilirsiniz. NIPT normalde Down Sendromu ve diğer kromozomal hastalıkları test
                                    etmek için kullanılır. </p>
                                <br>
                                <p>Bir başka yöntem ise 18. haftadan itibaren ultrasonlardır. Doktorunuz bebeğinizin cinsel
                                    organını ultrason üzerinden saptayarak size en doğru bilgiyi verebilir. </p>
                                <br>
                                <p>Bir başka yöntem ise koryonik villus ve amniyosentez testleridir. Bu testler de
                                    bebeğinizin sahip olduğu diğer genetik hastalıkları saptamak için yapılan testlerdir.
                                    Tabi bu süreçte bebeğinizin cinsiyetini de ortaya çıkarırlar. </p>
                                <br>
                                <p>Eğer tüp bebek (IVF) sahibi olacaksanız bebeğinizin cinsiyetini çok daha önceden bile
                                    öğrenebilirsiniz. Hatta bazı inovasyonlar sayesinde bebeğinizin cinsiyetini bile
                                    seçebilirsiniz. </p>
                                <br><br>
                                <h2>Bebeğimin Cinsiyetini Tahmin Etmek İçin Çin Takvimini Kullanmalı mıyım? </h2>
                                <br>
                                <p>Bebeğinizin cinsiyetini öğrenmek sizin için heyecan verici bir dönüm noktası olabilir.
                                    Ancak Çin Takviminin eğlence amaçlı bir tahmin etme olduğunu unutmamalısınız. Eğlenmek
                                    ve keyif almak için Çin Takvimini kullanabilirsiniz. Ancak sonuca göre herhangi bir
                                    kesin hükümde bulunmamalısınız. </p>
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


import { FormPlugin, FormGroupPlugin, SpinnerPlugin } from 'bootstrap-vue'
Vue.use(SpinnerPlugin);
Vue.use(FormPlugin);
Vue.use(FormGroupPlugin);

export default {
    name: 'CinsiyetTahmini',
    head() {
        return {
            title: "Çin Takvimiyle Cinsiyet Hesaplama - BebeğimleHayat",
            meta: [
                { hid: 'keywords', name: 'keywords', content: 'bebegimlehayat,cin,takvimiyle,cinsiyet,hesaplama' },
                { hid: 'description', name: 'description', content: "Bebek cinsiyeti öğrenme ebeveynler için bir merak kaynağıdır. Çin takvimine göre bebek cinsiyeti belirleme yaygın bir yöntemdir. Bebeğimlehayat'ta Çin takvimine göre bebek cinsiyeti hesaplama uygulamasını kullanabilirsiniz!" },
                { hid: 'og:title', property: 'og:title', content: "Bebek cinsiyeti öğrenme ebeveynler için bir merak kaynağıdır. Çin takvimine göre bebek cinsiyeti belirleme yaygın bir yöntemdir. Bebeğimlehayat'ta Çin takvimine göre bebek cinsiyeti hesaplama uygulamasını kullanabilirsiniz!" }
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
                                "name": "Çin Takvimi Cinsiyet Hesaplayıcısı Nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Bebeğinizin cinsiyetini merak mı ediyorsunuz? Çin Takvimi Cinsiyet Hesaplayıcımızı kullanarak Kadim Çin Ay Takvimine göre bebeğinizin cinsiyetini tahmin edebilirsiniz.Çin Takvimi Cinsiyet Hesaplayıcı bilimsel bir araç değildir. Eskiden gerçek bir yöntem olarak kullanılmış olsa da günümüzde sadece eğlenceli amaçlıdır. Elbette tahmin olarak kız ve erkek seçenekleri olduğu için doğru tahmin etme şansı %50!Çin Takvimi Cinsiyet Hesaplayıcıyı kullanmak için tek yapman gereken yukarıdaki bilgileri doldurmak ve Tahmin Et tuşuna tıklamak."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Çin Takvimine Göre Cinsiyet Tahmin Etme Nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Çin takvimine göre cinsiyet tahmin etme yaklaşık 700 senelik bir yöntemdir. Efsanelere göre kraliyet ailesinin mezarında keşfedilmiştir. Çinli Astrologlar Çin takvimine göre cinsiyet hesaplamayı önermektedir. Ancak bu yöntemin nereden çıktığına dair kesin kanıt bulunmamaktadır.Çin takvimine göre cinsiyet hesaplamada annenin yaşı ve hamile kaldığı aya göre Çin Ay Takviminin karşılaştırılması bebeğin cinsiyetini vermektedir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Çin Takvimine Göre Cinsiyet Tahmini Ne Kadar Tutarlıdır?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Michigan Üniversitesi araştırmacıları Çin Ay Takviminin doğruluğu üzerine bir araştırma yürüttü. Araştırmada İsveç’e ait 2,8 milyon doğum verisi kullanıldı. Her annenin yaşı, ne zaman hamile kaldığı özel algoritma ile birleştirildi.Araştırmalar sonuçlandığında Çin takviminin başarı oranı %50’ydi. Yani eğlence amaçlı kullanılan bu yöntem %50 ihtimalle tesadüfi doğru sonuçlar vermektedir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Bebeğimin Cinsiyetini Kesin Olarak Nasıl Öğrenebilirim?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Bebeğinizin cinsiyetini bilimsel olarak öğrenmenin birkaç yolu bulunmaktadır. 10. haftadan itibaren uygulanılmaya başlayan NIPT ile bebeğinizin cinsiyetini öğrenebilirsiniz. NIPT normalde Down Sendromu ve diğer kromozomal hastalıkları test etmek için kullanılır.Bir başka yöntem ise 18. haftadan itibaren ultrasonlardır. Doktorunuz bebeğinizin cinsel organını ultrason üzerinden saptayarak size en doğru bilgiyi verebilir.Bir başka yöntem ise koryonik villus ve amniyosentez testleridir. Bu testler de bebeğinizin sahip olduğu diğer genetik hastalıkları saptamak için yapılan testlerdir. Tabi bu süreçte bebeğinizin cinsiyetini de ortaya çıkarırlar.Eğer tüp bebek (IVF) sahibi olacaksanız bebeğinizin cinsiyetini çok daha önceden bile öğrenebilirsiniz. Hatta bazı inovasyonlar sayesinde bebeğinizin cinsiyetini bile seçebilirsiniz."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Bebeğimin Cinsiyetini Tahmin Etmek İçin Çin Takvimini Kullanmalı mıyım?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Bebeğinizin cinsiyetini öğrenmek sizin için heyecan verici bir dönüm noktası olabilir. Ancak Çin Takviminin eğlence amaçlı bir tahmin etme olduğunu unutmamalısınız. Eğlenmek ve keyif almak için Çin Takvimini kullanabilirsiniz. Ancak sonuca göre herhangi bir kesin hükümde bulunmamalısınız."
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
            chinese_gender_table: undefined,
            selectedAge: null,
            selectedMonth: null,

            ageError: false,
            monthError: false,

            result: null,

            isLoading: false,
            months: [
                {
                    name: "Ocak",
                    value: 1
                },
                {
                    name: "Şubat",
                    value: 2
                },
                {
                    name: "Mart",
                    value: 3
                },
                {
                    name: "Nisan",
                    value: 4
                },
                {
                    name: "Mayıs",
                    value: 5
                },
                {
                    name: "Haziran",
                    value: 6
                },
                {
                    name: "Temmuz",
                    value: 7
                },
                {
                    name: "Ağustos",
                    value: 8
                },
                {
                    name: "Eylül",
                    value: 9
                },
                {
                    name: "Ekim",
                    value: 10
                },
                {
                    name: "Kasım",
                    value: 11
                },
                {
                    name: "Aralık",
                    value: 12
                }
            ]
        }
    },
    computed: {
        ages() {
            return this.chinese_gender_table?.map(x => x.age).filter((value, index, array) => array.indexOf(value) === index);
        }
    },
    methods: {
        predict() {
            if (!this.selectedAge) {
                this.$bvToast.toast("Hamile kaldığınızdaki yaşınızı seçmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });

                this.ageError = true;
                return false;
            }
            else {
                this.ageError = false;
            }

            if (!this.selectedMonth) {
                this.$bvToast.toast("Hangi ay hamile kaldığınızı seçmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });

                this.monthError = true;
                return false;
            }
            else {
                this.monthError = false;
            }

            this.isLoading = true;

            setTimeout(() => {
                this.result = this.chinese_gender_table.find(x => x.age == this.selectedAge && x.month == this.selectedMonth).gender;
                this.isLoading = false;
            }, 2000)
        }
    },
    async created() {
        if (process.client) {
            let url = new URL('/Data/json/tools.json', document.location.href);
            await fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.chinese_gender_table = data.chinese_gender_table;
                })
        }

        this.navigation = [
            {
                "name": "Çin Takvimiyle Cinsiyet Hesaplama",
                "url": "/cin-takvimiyle-cinsiyet-hesaplama"
            }
        ]
    }
}
</script>

<style>
#cinsiyetTahminiForm {
    background-color: rgb(235, 247, 250);
    padding: 3em;
    border-top: 11px solid rgb(216, 240, 245);
}

#cinsiyetTahminiContent h2 {
    font-size: 20px;
}

#cinsiyetTahminiContent p {
    font-size: 15px;
}

#cinsiyetTahminiForm.no-result:after {
    content: '';
    position: absolute;
    top: -30px;
    left: calc(50% - 25px);
    height: 50px;
    width: 50px;
    background: url(https://api.bebegimlehayat.com/Data/image/extra_small/cin_takvimiyle_cinsiyet_hesaplama-1684180646596.jpeg) no-repeat left bottom;
    background-size: 100%;
}

#cinsiyetTahminiForm.result:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 164px;
    width: 290px;
    background: url(/Data/bg_toolResult_lLeaf.svg) no-repeat left bottom;
    background-size: 100%;
}

#cinsiyetTahminiForm.result:before {
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

#cinsiyetTahminiForm #result .man {
    color: #58adbe;
}

#cinsiyetTahminiForm #result .women {
    color: #ffc0cb;
}

#cinsiyetTahminiForm .start-over:hover {
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
