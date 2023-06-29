<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-5">
            <div class="col-12">
                <div class="row">
                    <div class="col-12 mb-5">
                        <h1 class="font-weight-normal">
                            Bebek İsim Bulucu
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="col-12 text-center no-result" id="bebekIsimBulucuForm">
                            <!-- <b-form class="row" v-if="!result">
                                <div class="col-12 mb-3">
                                    <div class="h5">
                                        İsim yapısı hakkında
                                    </div>
                                </div>

                                <div class="col-12">
                                    <p class="h6">
                                        <b-form-input size="md"
                                            class="w-auto mw-80px d-inline-block border-dark rounded-0 px-2 my-2"
                                            id="first_letter_input" v-model="firstLetter" placeholder="Harf"
                                            autocomplete="off" type="text"></b-form-input> ile başlayıp
                                        <b-form-input size="md"
                                            class="w-auto mw-80px d-inline-block border-dark rounded-0 px-2 my-2"
                                            id="last_letter_input" v-model="lastLetter" placeholder="Harf"
                                            autocomplete="off" type="text"></b-form-input> ile biten <v-select
                                            class="w-140px d-inline-block border border-dark" :clearable="false"
                                            v-model="gender" placeholder="seç.." :options="genders" label="name"
                                            :reduce="m => m.value"></v-select> ismi arıyorum
                                    </p>
                                </div>

                                <div class="col-12 mt-5 mb-3">
                                    <div class="h5">
                                        İsim anlamı hakkında
                                    </div>
                                </div>

                                <div class="col-12">
                                    <p class="h6">
                                        İsim anlamı <b-form-input size="md"
                                            class="w-auto mw-120px d-inline-block border-dark rounded-0 px-2 my-2"
                                            id="first_letter_input" v-model="mean" placeholder="Anlam" autocomplete="off"
                                            type="text"></b-form-input> olan <v-select
                                            class="w-140px d-inline-block border border-dark" :clearable="false"
                                            v-model="category" placeholder="seç.." :options="categories" label="name"
                                            :reduce="m => m.value"></v-select> kategorisinde isim arıyorum.
                                    </p>
                                </div>

                                <div class="col-12 mt-5">
                                    <button type="button" class="btn btn-info py-3 px-5 rounded" @click="generate">
                                        <h6 class="font-weight-bold">
                                            <b-spinner small label="Loading..." v-if="isLoading" class="mr-2"></b-spinner>
                                            Bul
                                        </h6>
                                    </button>
                                </div>
                            </b-form>
                            <div class="row p-5" v-else>
                                <div class="col-12 p-4 bg-white text-center" id="result">
                                    <div class="row">
                                        <div class="col-12 col-lg-9 mx-auto">
                                            <div class="row mb-4 h6">
                                                <div class="col-12 px-0 py-2" v-for="(D,index) in getResult" :class="index+1 != getResult.length ? 'border-bottom':''">
                                                    <div class="row">
                                                        <div class="col-12 d-flex align-items-center justify-content-between">
                                                            <strong class="d-flex align-items-center">
                                                                {{ D.name }}
                                                                <svg v-if="D.gender == 1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="venus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="text-white svg-inline--fa fa-venus ml-2"><path fill="#ffc0cb" d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1V384H128c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V349.1z" class=""></path></svg>
                                                                <svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="mars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="text-white svg-inline--fa fa-mars ml-2"><path fill="#60b4c5" d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8H424c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80l0 0h0v0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z" class=""></path></svg>
                                                            </strong>
        
                                                            <button v-b-toggle="`accordion-name-${index}`" class="btn float-left p-2">
                                                                <b-icon-chevron-down variant="secondary"></b-icon-chevron-down>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div class="row">
                                                        <div class="col-12">
                                                            <b-collapse :id="`accordion-name-${index}`" :accordion="`accordion-name-${index}`" role="tabpanel">
                                                                <b-card-body class="py-3 text-left border-left">
                                                                    <div class="mb-3">
                                                                        <strong>Kategori :</strong> {{ D.category }} 
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <strong>Anlamı :</strong> {{ D.mean }} 
                                                                    </div>
                                                                </b-card-body>
                                                            </b-collapse>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-4" v-if="currentPage*length < result.length">
                                                <div class="col-12">
                                                    <button class="btn btn-dark btn-sm" @click="showMore">
                                                        + Daha Fazla
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row border-top pt-5 mt-4">
                                        <div class="col-12 mb-3">
                                            <h5 role="button" class="start-over" @click="doAgain">
                                                <small>
                                                    Tekrar Yap
                                                </small>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

                            <form class="row">
                                <div class="col-12">
                                    <h6 class="font-weight-bold">
                                        Bebeğinizin Cinsiyetini Seçiniz
                                    </h6>

                                    <div class="row">
                                        <div class="col-12 mt-3 mb-5 d-flex align-items-center justify-content-center">
                                            <span class="girl-baby" :class="gender == 1 ? 'active' : ''"
                                                @click="gender = 1; result = null; letter = 'A'; searchName();">
                                                <img src="/Data/icons/baby-girl-s.png" alt="Kız bebek" width="38"
                                                    hegiht="34" />
                                            </span>
                                            <span class="boy-baby" :class="gender == 0 ? 'active' : ''"
                                                @click="gender = 0; result = null; letter = 'A';searchName();">
                                                <img src="/Data/icons/baby-men-s.png" alt="Erkek bebek" width="38"
                                                    hegiht="34" />
                                            </span>
                                        </div>

                                        <div class="col-12 mt-4" v-if="result">
                                            <div class="row">
                                                <div class="col-12 d-flex justify-content-center mb-4">
                                                    <span v-if="gender == 1" class="girl-baby-circle">
                                                        <img src="/Data/icons/baby-girl-s.png" alt="Kız bebek" width="38"
                                                            hegiht="34" />
                                                    </span>
                                                    <span v-if="gender == 0" class="boy-baby-circle">
                                                        <img src="/Data/icons/baby-men-s.png" alt="Erkek bebek" width="38"
                                                            hegiht="34" />
                                                    </span>
                                                </div>
                                                <div class="col-12 overflow-hidden">
                                                    <div class="row">
                                                        <div class="col-12 text-center overflow-auto select-letter mb-3"
                                                            :class="gender == 1 ? 'girl' : gender == 0 ? 'boy' : ''">
                                                            <span v-for="letter in letters" @click="selectLetter(letter)">
                                                                {{ letter }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <div class="row">
                                                        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-2"
                                                            v-for="(R, index) in getResult">
                                                            <div class="btn w-100 border border-secondary bg-light rounded-pill d-flex align-items-center justify-content-between py-3 px-4"
                                                                @click="showMean(index)">
                                                                <h6>
                                                                    {{ R.name }}
                                                                </h6>
                                                                <b-icon-question variant="secondary"
                                                                    scale="1.5"></b-icon-question>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12 d-flex justify-content-center">
                                                            <button type="button" class="btn"
                                                                :class="gender == 1 ? 'girl' : gender == 0 ? 'boy' : ''"
                                                                id="showMore" @click="showMore">
                                                                Daha Fazla
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="row mt-4">
                            <div class="col-12" id="bebekIsimBulucuContent">
                                <h2>Bebek İsim Bulucu Nedir?</h2>
                                <br>
                                <p>
                                    Hamileliğin en önemli aşamalarından birindesiniz. Artık bebeğinize isim seçme vakti.
                                    Doğuma yakın veya uzak olmanız fark etmez, bebeğinize isim düşünmeniz son derece
                                    önemlidir.
                                </p>
                                <br>
                                <p>
                                    Bebek İsim Bulucuyu kullanmak için tek yapmanız gereken bebeğinizin cinsiyetini seçmek,
                                    arından da istediğiniz baş harfi seçmektir. Karşınıza çıkan isim listesinde isimlere
                                    tıklayarak anlamlarını öğrenebilirsiniz. Diğer isimleri görmek için Daha Fazla tuşuna
                                    tıklayabilirsiniz. Dilediğiniz zaman cinsiyeti veya harfi değiştirip başka isimlere de
                                    göz atabilirsiniz.
                                </p>
                                <br><br>
                                <h2>
                                    Doğru Bebek İsmi Nasıl Seçilir?
                                </h2>
                                <br>
                                <p>
                                    Bebeğinize doğru ismi seçmek her zaman zordur. Seçerken aklınıza gelecek birçok faktör
                                    bulunmaktadır. Sade ve güzel veya ihtişamlı ve yaratıcı bir isim seçerken engeller her
                                    zaman aynıdır.
                                </p>
                                <br>
                                <p>
                                    - Bebeğiniz büyüdüğünde bu isim nasıl duracak?
                                </p>
                                <p>
                                    - Bu isim kulağınıza her zaman güzel gelecek mi yoksa zaman geçtikçe eskiyecek mi?
                                </p>
                                <p>
                                    - Bebeğiniz isminin manası bebeğinizle uyuşacak mı?
                                </p>
                                <br>
                                <p>
                                    Bu ve benzer sorular bir isimde karar kılmaya çalışırken aklınızı işgal ediyor olabilir.
                                    Her ebeveyn aynı ikilemleri yaşamaktadır. Bu da son derece doğaldır çünkü ismimizi
                                    ömrümüz boyunca taşırız.
                                </p>
                                <br><br>
                                <h2>
                                    Bebek İsimlerinin Önemi Nedir?
                                </h2>
                                <br>
                                <p>
                                    Her ismin kendine ait hikayesi vardır. Derin anlamları bazıları için hoşken bazıları
                                    içinse normaldir. Bebeklerimizle bu isimler büyür ve o isme yeni anlamlar katarlar. Bu
                                    yüzden duyulduğunda herkesi etkileyen mükemmel bir isim seçmeyi istemeniz son derece
                                    normaldir.
                                </p>
                                <br>
                                <p>
                                    İsim seçerken şu soruları kendinize mutlaka sorun.
                                </p>
                                <br>
                                <p>
                                    Köklerinize uygun bir isim mi seçmek istiyorsunuz yoksa modern bir isim mi?
                                </p>
                                <br>
                                <p>
                                    Klasik isimlerden mi tercih etmelisiniz yoksa yeni nesil isimler mi?
                                </p>
                                <br>
                                <p>
                                    Çocuğunuzun diğer insanlarla ortak bir isme mi sahip olmasını istiyorsunuz yoksa eşsiz
                                    mi?
                                </p>
                                <br>
                                <p>
                                    Bu soruların yanı sıra çocuğunuz ikinci bir isim bulma durumu var. Hatta çocuğunuza 3
                                    isim bile verebilirsiniz. Eğer birden fazla isim verirseniz bu isimlerin birbirine
                                    uyumlu olması da önemlidir.
                                </p>
                                <br>
                                <p>
                                    İsim seçerken kendinizi yormanıza gerek yok. Güzel bulduğunuz isimlerin bir listesini
                                    çıkarın ardından yavaşça listeyi eleyin. Bebeğiniz doğana kadar hala vaktiniz var.
                                </p>
                                <br><br>
                                <h2>
                                    Bebeğimle Hayat ile en iyi ismi nasıl bulabilirsiniz?
                                </h2>
                                <br>
                                <p>
                                    Bebeğimle Hayat ekibi olarak her ebeveynin en güzel deneyimlere ortak olmasını
                                    istiyoruz. Bu yüzden bebeğinize eşsiz bir isim bulabilmeniz için devamlı çalışıyoruz.
                                    İsim kütüphanemizi her gün genişletiyor ve size en güzel Bebek İsim Bulucuyu
                                    getiriyoruz. Tek yapmanız gereken sayfamızda bulunan isimleri incelemek ve bebeğinize en
                                    iyi isimleri seçmek.
                                </p>


                                <script type="application/ld+json">
                                    {
                                        "mainEntity" : [
                                    {
                                    "name" : " Bebek İsim Bulucu Nedir?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Hamileliğin en önemli aşamalarından birindesiniz. Artık bebeğinize isim seçme vakti. Doğuma yakın veya uzak olmanız fark etmez, bebeğinize isim düşünmeniz son derece önemlidir.
                                    Bebek İsim Bulucuyu kullanmak için tek yapmanız gereken bebeğinizin cinsiyetini seçmek, arından da istediğiniz baş harfi seçmektir. Karşınıza çıkan isim listesinde isimlere tıklayarak anlamlarını öğrenebilirsiniz. Diğer isimleri görmek için Daha Fazla tuşuna tıklayabilirsiniz. Dilediğiniz zaman cinsiyeti veya harfi değiştirip başka isimlere de göz atabilirsiniz.",
                                    "@type" : "Answer"
                                    },
                                    "@type" : "Question"
                                    },{
                                    "name" : " Doğru Bebek İsmi Nasıl Seçilir?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Bebeğinize doğru ismi seçmek her zaman zordur. Seçerken aklınıza gelecek birçok faktör bulunmaktadır. Sade ve güzel veya ihtişamlı ve yaratıcı bir isim seçerken engeller her zaman aynıdır.
                                    - Bebeğiniz büyüdüğünde bu isim nasıl duracak? 
                                    - Bu isim kulağınıza her zaman güzel gelecek mi yoksa zaman geçtikçe eskiyecek mi?
                                    - Bebeğiniz isminin manası bebeğinizle uyuşacak mı?
                                    Bu ve benzer sorular bir isimde karar kılmaya çalışırken aklınızı işgal ediyor olabilir. Her ebeveyn aynı ikilemleri yaşamaktadır. Bu da son derece doğaldır çünkü ismimizi ömrümüz boyunca taşırız.",
                                    "@type" : "Answer"
                                    },
                                    "@type" : "Question"
                                    },{
                                    "name" : " Bebek İsimlerinin Önemi Nedir?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Her ismin kendine ait hikayesi vardır. Derin anlamları bazıları için hoşken bazıları içinse normaldir. Bebeklerimizle bu isimler büyür ve o isme yeni anlamlar katarlar. Bu yüzden duyulduğunda herkesi etkileyen mükemmel bir isim seçmeyi istemeniz son derece normaldir.
                                    İsim seçerken şu soruları kendinize mutlaka sorun.
                                    Köklerinize uygun bir isim mi seçmek istiyorsunuz yoksa modern bir isim mi?
                                    Klasik isimlerden mi tercih etmelisiniz yoksa yeni nesil isimler mi?
                                    Çocuğunuzun diğer insanlarla ortak bir isme mi sahip olmasını istiyorsunuz yoksa eşsiz mi?
                                    Bu soruların yanı sıra çocuğunuz ikinci bir isim bulma durumu var. Hatta çocuğunuza 3 isim bile verebilirsiniz. Eğer birden fazla isim verirseniz bu isimlerin birbirine uyumlu olması da önemlidir.
                                    İsim seçerken kendinizi yormanıza gerek yok. Güzel bulduğunuz isimlerin bir listesini çıkarın ardından yavaşça listeyi eleyin. Bebeğiniz doğana kadar hala vaktiniz var.",
                                    "@type" : "Answer"
                                    },
                                    "@type" : "Question"
                                    },{
                                    "name" : " Bebeğimle Hayat ile en iyi ismi nasıl bulabilirsiniz?",
                                    "acceptedAnswer" :
                                    {
                                    "text" : " Bebeğimle Hayat ekibi olarak her ebeveynin en güzel deneyimlere ortak olmasını istiyoruz. Bu yüzden bebeğinize eşsiz bir isim bulabilmeniz için devamlı çalışıyoruz. İsim kütüphanemizi her gün genişletiyor ve size en güzel Bebek İsim Bulucuyu getiriyoruz. Tek yapmanız gereken sayfamızda bulunan isimleri incelemek ve bebeğinize en iyi isimleri seçmek.",
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
        </div>
    </div>
</template>
<script>
export default {
    name: 'BebekIsimBulucu',
    head() {
        return {
            title: "Bebek İsim Bulucu - BebeğimleHayat ",
            meta: [
                { hid: 'keywords', name: 'keywords', content: 'bebegimlehayat,bebek,isim,bulucu' },
                { hid: 'description', name: 'description', content: "Bebek isimleri ebeveynlerin aklını kurcalayan konulardan biridir. Bebeğimlehayat'ta bebek isim bulucudan faydalanarak fikir edinebilirsiniz!" },
                { hid: 'og:title', property: 'og:title', content: "Bebek isimleri ebeveynlerin aklını kurcalayan konulardan biridir. Bebeğimlehayat'ta bebek isim bulucudan faydalanarak fikir edinebilirsiniz!" }
            ],
        }
    },
    data() {
        return {
            navigation: undefined,
            letter: "A",
            firstLetter: null,
            lastLetter: null,
            gender: null,

            mean: null,
            category: null,

            categories: [
                {
                    name: "Kur'an da geçmesi",
                    value: "kuran"
                },
                {
                    name: "Klasik",
                    value: "klasik"
                },
                {
                    name: "Renk ilhan",
                    value: "renk"
                },
                {
                    name: "Havalı ve Yaratıcı",
                    value: "havali"
                },
                {
                    name: "Zarif",
                    value: "zarif"
                }
            ],
            genders: [
                {
                    name: "Kız",
                    value: 1
                },
                {
                    name: "Erkek",
                    value: 2
                },
                {
                    name: "İkisi",
                    value: 3
                }
            ],
            letters: ["A", "B", "C", "Ç", "D", "E", "F", "G", "H", "I", "İ", "J", "K", "L", "M", "N", "O", "Ö", "P", "S", "Ş", "T", "U", "Ü", "V", "Y", "Z"],
            data: null,
            dataGender: null,
            length: 20,
            currentPage: 1,
            result: null,
            isLoading: false
        }
    },
    computed: {
        getResult() {
            if (this.result) {
                return this.result.slice(this.length * (this.currentPage - 1), this.length * this.currentPage);
            }
            else {
                return null;
            }
        }
    },
    methods: {
        showMore() {
            this.currentPage += 1;
        },
        doAgain() {
            this.result = null;
            this.firstLetter = null;
            this.lastLetter = null;
            this.gender = null;
            this.mean = null;
            this.category = null;

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
        async generate() {
            this.isLoading = true;
            if(process.client) {
                let url = new URL('/Data/json/names.json' , document.location.href);
                
                await fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        let gender = this.gender == null || this.gender == 3 ? '' : this.gender;
                        let firstLetter = this.firstLetter == null ? '' : this.firstLetter.toLowerCase();
                        let lastLetter = this.lastLetter == null ? '' : this.lastLetter.toLowerCase();
                        let mean = this.mean == null ? '' : this.mean.toLowerCase();
                        let category = this.category == null ? '' : this.category;
                        this.result = data.filter(x =>
                            (x.name.slice(0, 1).toLowerCase() == firstLetter || firstLetter == '') &&
                            (x.name.slice(-1).toLowerCase() == lastLetter || lastLetter == '') &&
                            (x.mean.indexOf(mean) > -1 || mean == '') &&
                            (x.category == category || category == '') &&
                            x.gender.indexOf(gender) > -1
                        );
                        this.isLoading = false;
                    })
    
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000)
            }
        },
        async searchName() {
            const _this = this;
            _this.isLoading = true;

            if (_this.data && _this.dataGender == _this.gender) {
                _this.result = _this.data[_this.letter]
            }
            else {
                let url;
                if (_this.gender == 0) {
                    if(process.client) {
                        url = new URL('/Data/json/boyNames.json' , document.location.href);
                    }
                    _this.dataGender = 0;
                }
                else {
                    if(process.client) {
                        url = new URL('/Data/json/girlNames.json' , document.location.href);
                    }
                    
                    _this.dataGender = 1;
                }

                await fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        _this.data = data;
                        _this.result = data[_this.letter]
                        _this.isLoading = false;
                    })
            }

            setTimeout(() => {
                _this.isLoading = false;
            }, 1000)
        },
        selectLetter(L) {
            this.currentPage = 1;
            this.letter = L;
            this.searchName();
        },
        showMore() {
            if (this.currentPage * this.length < this.result.length) {
                this.currentPage += 1;
            }
        },
        showMean(index) {
            let data = this.getResult[index];
            this.$bvModal.msgBoxOk(data.mean, {
                title: data.name,
                hideFooter: true,
                okTitle: "Tamam",
                centered: true
            })
                .then(value => {
                })
                .catch(err => { })
        }
    },
    async created() {
        this.navigation = [
            {
                "name": "Bebek isim bulucu",
                "url": "/bebek-isim-bulucu"
            }
        ]
    }
}
</script>

<style>
#bebekIsimBulucuForm {
    background-color: rgb(235, 247, 250);
    padding: 3em;
    border-top: 11px solid rgb(216, 240, 245);
}

#bebekIsimBulucuForm #result {
    border-top: 18px solid rgb(1, 97, 116);
    position: relative;
    z-index: 2;
}

#bebekIsimBulucuForm form {
    position: relative;
    z-index: 3;
}

#bebekIsimBulucuContent h2 {
    font-size: 20px;
}

#bebekIsimBulucuContent h3 {
    font-size: 18px;
}

#bebekIsimBulucuContent p {
    font-size: 15px;
}

#bebekIsimBulucuForm.no-result:after {
    content: '';
    position: absolute;
    top: -30px;
    left: calc(50% - 25px);
    height: 50px;
    width: 50px;
    background: url(/Data/image/extra_small/bebekisim_bulucu-1684180646597.jpeg) no-repeat left bottom;
    background-size: 90%;
    border-radius: 50%;
}

#bebekIsimBulucuForm.result:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 164px;
    width: 290px;
    background: url(/Data/bg_toolResult_lLeaf.svg) no-repeat left bottom;
    background-size: 100%;
}

#bebekIsimBulucuForm.result:before {
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

#bebekIsimBulucuForm #result .man {
    color: #58adbe;
}

#bebekIsimBulucuForm #result .women {
    color: #ffc0cb;
}

#bebekIsimBulucuForm .start-over:hover {
    text-decoration: underline;
}

.mw-80px {
    max-width: 80px;
}

.mw-120px {
    max-width: 120px;
}

.w-140px {
    width: 140px;
}

.vs__dropdown-toggle {
    padding: 2px 0.2em;
    border: 0;
}

.vs__search {
    font-size: 18px;
}


[role="listbox"] {
    font-size: 12px;
    font-weight: 500;
}

.girl-baby {
    background-color: #ffdbf0;
    text-align: center;
    display: block;
    border: 1px solid #ccc;
    height: 50px;
    line-height: 43px;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 40px;
    margin: 0 5px;
}

.boy-baby {
    background-color: #aff2ff;
    text-align: center;
    display: block;
    border: 1px solid #ccc;
    height: 50px;
    line-height: 43px;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 40px;
    margin: 0 5px;
}

.boy-baby.active {
    background-color: #32b9d3;
}

.girl-baby.active {
    background-color: #ec188c;
}

.girl-baby-circle {
    background-color: #ec188c;
    text-align: center;
    display: block;
    height: 50px;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.boy-baby-circle {
    background-color: #32b9d3;
    text-align: center;
    display: block;
    height: 50px;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#searchName {
    text-align: center;
    -webkit-transition: background-color .5s ease;
    -moz-transition: background-color .5s ease;
    -o-transition: background-color .5s ease;
    transition: background-color .5s ease;
    color: #fff;
    padding: 12px 30px;
    text-transform: uppercase;
    font-size: 16px;
    border-radius: 40px;
}

#searchName.girl {
    background-color: #ec108d;
}

#searchName.boy {
    background-color: #32b9d3;
}

.select-letter span {
    color: #fff;
    display: inline-block;
    cursor: pointer;
    font-size: 18px;
    padding: 8px 0;
    border-radius: 30px;
    width: 43px;
    height: 43px;
    text-align: center;
    font-weight: 700;
    float: none;
    margin-right: 7px;
    margin-bottom: 8px;
}

.select-letter.girl span {
    background-color: #ec188c;
}

.select-letter.boy span {
    background-color: #32b9d3;
}

#showMore {
    text-align: center;
    -webkit-transition: background-color .5s ease;
    -moz-transition: background-color .5s ease;
    -o-transition: background-color .5s ease;
    transition: background-color .5s ease;
    color: #fff;
    padding: 15px 30px;
    text-transform: uppercase;
    font-size: 16px;
    border-radius: 40px;
    margin-top: 1em;
}

#showMore.girl {
    background-color: #ec108d;
}

#showMore.boy {
    background-color: #32b9d3;
}

@media (max-width: 768px) {
    #bebekIsimBulucuForm {
        padding: 1em;
    }
}</style>
