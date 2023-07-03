<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-5">
            <div class="col-12 col-lg-8">
                <div class="row">
                    <div class="col-12 mb-5">
                        <h1 class="font-weight-normal">
                            Doğum Tarihi Hesaplama
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="col-12" :class="result != null ? 'result' : 'no-result'" id="gebelikTarihTahminiForm">
                            <b-form class="row" v-if="result == null">
                                <b-form-group class="col-12 mb-4 h5" id="calc_method_group" label="Hesaplama Yöntemi"
                                    label-for="calc_method_input" description="">
                                    <b-form-radio-group id="calc-method-id" v-model="calcMethod" name="calc-method"
                                        class="mt-3">
                                        <b-form-radio :value="1">Son Adet Günü</b-form-radio>
                                        <b-form-radio :value="2">Gebe Kalma Tarihi</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="birth_day_group"
                                    :label="calcMethod == 1 ? 'Son adetinizin ilk günü' : calcMethod == 2 ? 'Gebe kalma tarihiniz' : 'Tarih'"
                                    label-for="birth_day_input" description="">
                                    <b-form-datepicker size="lg"
                                        label-help="Takvim tarihlerinde gezinmek için imleç tuşlarını kullanın"
                                        label-no-date-selected="Tarih seçilmedi" class="mt-2 border-dark"
                                        id="datepicker-buttons" v-model="date" locale="tr"
                                        :placeholder="calcMethod == 1 ? 'son adetinizin ilk gününü seçiniz..' : calcMethod == 2 ? 'gebe kalma tarihinizi seçiniz..' : 'tarih seçiniz..'"></b-form-datepicker>
                                </b-form-group>

                                <b-form-group v-if="calcMethod == 1" class="col-12 mb-4 h5" id="last_cycle_group"
                                    label="Adet Döngünüz?" label-for="last_cycle_input" description="">
                                    <v-select class="mt-2 border" :class="lastCycleError ? 'border-danger' : 'border-white'"
                                        :clearable="false" @click="lastCycleError = false" v-model="lastCycle"
                                        placeholder="süre seçiniz.." :options="days" label="name"
                                        :reduce="m => m.value"></v-select>
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
                                            <img class="mw-80px" loading="lazy"
                                                src="/Data/image/extra_small/dogum_tarihi_hesaplama-1684180646598.jpeg"
                                                alt="Hesaplama" width="50" height="70" />
                                        </div>

                                        <div class="col-12 mb-3">
                                            <h6 class="font-weight-normal">
                                                Bebeğinizin Doğum Tarihi
                                            </h6>
                                        </div>

                                        <div class="col-12 mb-1">
                                            <h1 class="font-weight-bold">
                                                {{ result | moment("Do MMM , YYYY") }}
                                            </h1>
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
                            <div class="col-12" id="gebelikTarihContent">
                                <h2>Doğum Tarihi Hesaplayıcısı Nedir? </h2>
                                <br>
                                <p>Doğum tarihi hesaplayıcısı ile bebeğinizin doğacağı günü hesaplayabilirsiniz. Son adet
                                    gününüz veya hamile kalma gününüze göre doğum tarihinizi hesaplayabilirsiniz. Tek
                                    yapmanız gereken yöntemi seçmek, tarihi seçmek ve hesapla tuşuna tıklamak. </p>
                                <br><br>
                                <h2>Doğum Tarihi Nasıl Hesaplanır? </h2>
                                <br>
                                <p>Doğum tarihinizi hesaplamanın birkaç yolu vardır. İlki hangi gün hamile kaldığınızı
                                    belirlemektir. Hamile kaldığınız gün üzerinden 38 hafta normal gebelik olarak
                                    hesaplanır. Ancak çoğu anne hangi gün hamile kaldığını bilmemektedir. Genellikle 1-2
                                    aylık hamile olduktan sonra belirtilerle öğrenilir. </p>
                                <br>
                                <p>Bu yüzden bir diğer yöntem ise yumurtlama döneminizden hareket etmektir. Son adet gününüz
                                    ve adet döngünüzün uzunluğuna göre yumurtlama günleriniz hesaplanır. Yumurtlama zamanı
                                    adet döngünüzün genellikle tam ortasında gerçekleşmektedir. Yani 28 gün adet döngünüz
                                    varsa 14. gün yumurtlama gününüzdür. Bu hesaplamaya göre ne zaman hamile kalabileceğiniz
                                    belirlenir. Ardından aynı şekilde 38 hafta normal gebelik hesaplanır. </p>
                                <br><br>
                                <h2>Doğum tarihi değişebilir mi? </h2>
                                <br>
                                <p>Normal gebelik 38 hafta olarak kabul edilir. Ancak hamileliklerin bir kısmında erken
                                    doğum veya geç doğum söz konusu olabilir. Bu da öngörülen doğum tarihinin 2 hafta erkene
                                    veya geçe çekilmesiyle sonuçlanır. </p>
                                <br>
                                <p>Doğum tarihinin öngörülenden farklı çıkmasının bir diğer sebebi ise hamile kaldığınız
                                    günün farklı olmasıdır. Spermlerin vücut içinde 5 güne kadar yaşayabilmesi ve düzensiz
                                    adetin yumurtlama zamanını değiştirmesi gibi koşullar hamileliğinizin sonlanacağı günü
                                    değiştirebilir. Bu durumda aynı şekilde 1 haftaya kadar değişiklik yaratabilir. </p>
                                <br><br>
                                <h2>Hesaplanan doğum tarihi ne kadar doğrudur? </h2>
                                <br>
                                <p>Öngörülen doğum tarihi elbette ki bir tahmindir. Ancak bu tahmin bilimsel verilere
                                    dayanmaktadır. Bu yüzden tutarlılığı son derece yüksektir. Doktorunuzun hesaplayacağı
                                    aynı bilimsel yöntemler ile çalışmaktadır. Doğum Tarihi Hesaplayıcının öngördüğü
                                    tarihten 2 hafta erken ya da geç olacak şekilde doğuma girmeniz olasıdır. </p>
                                <br>
                                <p>Her kadının hamileliği özel olduğu için sadece kadınların %5’i tam olarak doğum tarihinde
                                    doğuma başlarlar. Yani doğum tarihi hesaplayıcının verdiği tarih kesin olmasa da
                                    bilimsel olarak en doğru süreci vermektedir. </p>
                                <br><br>
                                <h2>Ne zaman hamilelik testi yaptırmalıyım? </h2>
                                <br>
                                <p>Hamilelik testini yaptırmak için en iyi zaman adetinizin geciktiği günden birkaç gün
                                    sonrasıdır. Adetiniz geciktiğinde henüz bedeniniz hCG hormonu salgılamamış olabilir. Ya
                                    da adetiniz sadece gecikmiş de olabilir. Bu yüzden birkaç gün bekleyip test yaptırmak en
                                    sağlıklısıdır. Aksi takdirde doğru sonuç alamayabilirsiniz. Daha hızlı ve doğru sonuçlar
                                    için doktorunuza başvurup kan testi yaptırabilirsiniz. </p>
                                <br><br>

                                <script type="application/ld+json">
                                    {
                                        "@context": "https://schema.org",
                                        "@type": "FAQPage",
                                        "mainEntity": [
                                            {
                                            "@type": "Question",
                                            "name": "Doğum Tarihi Hesaplayıcısı Nedir?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Doğum tarihi hesaplayıcısı ile bebeğinizin doğacağı günü hesaplayabilirsiniz. Son adet gününüz veya hamile kalma gününüze göre doğum tarihinizi hesaplayabilirsiniz. Tek yapmanız gereken yöntemi seçmek, tarihi seçmek ve hesapla tuşuna tıklamak."
                                            }
                                            },
                                            {
                                            "@type": "Question",
                                            "name": "Doğum Tarihi Nasıl Hesaplanır?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Doğum tarihinizi hesaplamanın birkaç yolu vardır. İlki hangi gün hamile kaldığınızı belirlemektir. Hamile kaldığınız gün üzerinden 38 hafta normal gebelik olarak hesaplanır. Ancak çoğu anne hangi gün hamile kaldığını bilmemektedir. Genellikle 1-2 aylık hamile olduktan sonra belirtilerle öğrenilir.
                                        Bu yüzden bir diğer yöntem ise yumurtlama döneminizden hareket etmektir. Son adet gününüz ve adet döngünüzün uzunluğuna göre yumurtlama günleriniz hesaplanır. Yumurtlama zamanı adet döngünüzün genellikle tam ortasında gerçekleşmektedir. Yani 28 gün adet döngünüz varsa 14. gün yumurtlama gününüzdür. Bu hesaplamaya göre ne zaman hamile kalabileceğiniz belirlenir. Ardından aynı şekilde 38 hafta normal gebelik hesaplanır."
                                            }
                                            },
                                            {
                                            "@type": "Question",
                                            "name": "Doğum tarihi değişebilir mi?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Normal gebelik 38 hafta olarak kabul edilir. Ancak hamileliklerin bir kısmında erken doğum veya geç doğum söz konusu olabilir. Bu da öngörülen doğum tarihinin 2 hafta erkene veya geçe çekilmesiyle sonuçlanır. 
                                        Doğum tarihinin öngörülenden farklı çıkmasının bir diğer sebebi ise hamile kaldığınız günün farklı olmasıdır. Spermlerin vücut içinde 5 güne kadar yaşayabilmesi ve düzensiz adetin yumurtlama zamanını değiştirmesi gibi koşullar hamileliğinizin sonlanacağı günü değiştirebilir. Bu durumda aynı şekilde 1 haftaya kadar değişiklik yaratabilir."
                                            }
                                            },
                                            {
                                            "@type": "Question",
                                            "name": "Hesaplanan doğum tarihi ne kadar doğrudur?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Öngörülen doğum tarihi elbette ki bir tahmindir. Ancak bu tahmin bilimsel verilere dayanmaktadır. Bu yüzden tutarlılığı son derece yüksektir. Doktorunuzun hesaplayacağı aynı bilimsel yöntemler ile çalışmaktadır. Doğum Tarihi Hesaplayıcının öngördüğü tarihten 2 hafta erken ya da geç olacak şekilde doğuma girmeniz olasıdır. 
                                        Her kadının hamileliği özel olduğu için sadece kadınların %5’i tam olarak doğum tarihinde doğuma başlarlar. Yani doğum tarihi hesaplayıcının verdiği tarih kesin olmasa da bilimsel olarak en doğru süreci vermektedir."
                                            }
                                            },
                                            {
                                            "@type": "Question",
                                            "name": "Ne zaman hamilelik testi yaptırmalıyım?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Hamilelik testini yaptırmak için en iyi zaman adetinizin geciktiği günden birkaç gün sonrasıdır. Adetiniz geciktiğinde henüz bedeniniz hCG hormonu salgılamamış olabilir. Ya da adetiniz sadece gecikmiş de olabilir. Bu yüzden birkaç gün bekleyip test yaptırmak en sağlıklısıdır. Aksi takdirde doğru sonuç alamayabilirsiniz. Daha hızlı ve doğru sonuçlar için doktorunuza başvurup kan testi yaptırabilirsiniz."
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
export default {
    name: 'DogumTarihiHesaplama',
    head() {
        return {
            title: "Doğum Tarihi Hesaplama - BebeğimleHayat ",
            meta: [
                { hid: 'keywords', name: 'keywords', content: 'bebegimlehayat,dogum,tarihi,hesaplama' },
                { hid: 'description', name: 'description', content: "Bebek doğum tarihini hesaplama ebeveynler tarafından merak edilen konulardan biridir. Bebeğimlehayat'ta bebeğinizin doğum tarihini hesaplayabilirsiniz!" },
                { hid: 'og:title', property: 'og:title', content: "Bebek doğum tarihini hesaplama ebeveynler tarafından merak edilen konulardan biridir. Bebeğimlehayat'ta bebeğinizin doğum tarihini hesaplayabilirsiniz!" }
            ],
        }
    },
    data() {
        return {
            navigation: undefined,
            calcMethod: null,
            date: new Date(),
            lastCycle: 28,

            calcMethodError: false,
            dateError: false,
            lastCycleError: false,

            result: null,

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
        doAgain() {
            this.result = null;
            this.calcMethod = null;
            this.date = new Date();
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
        predict() {
            if (!this.calcMethod) {
                this.calcMethodError = true;
                return false;
            }
            else {
                this.calcMethodError = false;
            }

            if (!this.date) {
                this.dateError = true;
                return false;
            }
            else {
                this.dateError = false;
            }

            this.isLoading = true;

            setTimeout(() => {
                if (this.calcMethod == 1) {
                    let date = new Date(this.date);
                    date.setDate(date.getDate() + 280 + (28 - this.lastCycle));
                    this.result = date;
                }

                if (this.calcMethod == 2) {
                    let date = new Date(this.date);
                    date.setDate(date.getDate() + 266);
                    this.result = date;
                }

                this.isLoading = false;
            }, 2000)
        }
    },
    async created() {
        this.navigation = [
            {
                "name": "Doğum Tarihi Hesaplama",
                "url": "/dogum-tarihi-hesaplama"
            }
        ]
    }
}
</script>

<style>
.mw-80px {
    max-width: 80px;
}

#gebelikTarihTahminiForm {
    background-color: rgb(235, 247, 250);
    padding: 3em;
    border-top: 11px solid rgb(216, 240, 245);
}

#gebelikTarihContent h2 {
    font-size: 20px;
}

#gebelikTarihContent p {
    font-size: 15px;
}

#gebelikTarihTahminiForm.no-result:after {
    content: '';
    position: absolute;
    top: -30px;
    left: calc(50% - 25px);
    height: 50px;
    width: 50px;
    background: url(/Data/image/extra_small/dogum_tarihi_hesaplama-1684180646598.jpeg) no-repeat left bottom;
    background-size: 100%;
}

#gebelikTarihTahminiForm.result:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 164px;
    width: 290px;
    background: url(/Data/bg_toolResult_lLeaf.svg) no-repeat left bottom;
    background-size: 100%;
}

#gebelikTarihTahminiForm.result:before {
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

#gebelikTarihTahminiForm #result .man {
    color: #58adbe;
}

#gebelikTarihTahminiForm #result .women {
    color: #ffc0cb;
}

#gebelikTarihTahminiForm .start-over:hover {
    text-decoration: underline;
}

.vs__dropdown-toggle {
    padding: .6em;
}

.vs__search {
    font-size: 18px;
}</style>
