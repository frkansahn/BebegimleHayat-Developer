<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation"/>
        <div class="row my-3 my-md-0 py-0 py-lg-5" v-if="name" id="name">
            <div class="col-12 col-lg-9 px-0 px-md-3">
                <div class="row mt-4 mt-md-0">
                    <div class="col-12 mb-4">
                        <h1 class="text-left" id="nameTitle">
                            {{name.name}} İsminin Anlamı Nedir? {{name.name}} İsminin Özellikleri ve Detaylı İsim Analizi
                        </h1>
                    </div>
                    <div class="col-12 mb-4">
                        <div class="d-none d-md-block position-relative">
                            <picture >
                                <source type="image/webp" srcset="/Data/name/name_image.webp" />
                                <img src="/Data/name/name_image.jpg" :alt="name.name" :width="308" :height="268"  @load="onImgLoad"/>
                            </picture>
                            <div class="image-text" v-if="imageLoaded">
                                <strong>
                                    {{name.name}} İsminin Anlamı Nedir?
                                </strong>
                                <span class="first">
                                    {{name.name}} İsminin Özellikleri ve
                                </span>
                                <span class="second">
                                    Detaylı İsim Analizi
                                </span>
                            </div>
                        </div>
                        <div class="d-block d-md-none position-relative">
                            <picture >
                                <source type="image/webp" srcset="/Data/name/name_image_mobile.webp" />
                                <img src="/Data/name/name_image_mobile.jpg" :alt="name.name" :width="308" :height="268"  @load="onImgLoad"/>
                            </picture>
                            <div class="image-text-mobile" v-if="imageLoaded">
                                <strong class="first">
                                    {{name.name}} İsminin
                                </strong>
                                <strong class="second">
                                    Anlamı Nedir?
                                </strong>
                                <span class="first">
                                    {{name.name}} İsminin Özellikleri
                                </span>
                                <span class="second">
                                    ve Detaylı İsim Analizi
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="row" id="content">
                            
                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.ismin_anlami_1)">
                                <div class="description" v-html="name.ismin_anlami_1"></div>
                            </div>
                            
                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.ismin_anlami_2)">
                                <h2>
                                    {{name.name}} İsminin Anlamı
                                </h2>
                                <div class="description" v-html="name.ismin_anlami_2"></div>
                            </div>
                            
                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.tdk_anlami)">
                                <h2>
                                    {{name.name}} İsminin TDK'ye Göre Anlamı
                                </h2>
                                <div class="description" v-html="name.tdk_anlami"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.ismin_cinsiyeti)">
                                <h2>
                                    {{name.name}} İsminin Cinsiyeti
                                </h2>
                                <div class="description" v-html="name.ismin_cinsiyeti"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.ismin_kokeni)">
                                <h2>
                                    {{name.name}} İsminin Kökeni
                                </h2>
                                <div class="description" v-html="name.ismin_kokeni"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.tellaffuz_zorluk_derecesi)">
                                <h2>
                                    {{name.name}} İsminin Yabancı Dillerde Telaffuz Zorluk Derecesi
                                </h2>
                                <div class="description" v-html="name.tellaffuz_zorluk_derecesi"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.kuranda_geciyormu)">
                                <h2>
                                    {{name.name}} İsmi Kuran-ı Kerim'de Geçiyor Mu?
                                </h2>
                                <div class="description" v-html="name.kuranda_geciyormu"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.caizmi)">
                                <h2>
                                    {{name.name}} İsmi Caiz Mi?
                                </h2>
                                <div class="description" v-html="name.caizmi"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.ismin_benzeyenleri)">
                                <h2>
                                    {{name.name}} İsmine Benzeyen Diğer İsimler
                                </h2>
                                <div class="description" v-html="name.ismin_benzeyenleri"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.uyumlu_isimler)">
                                <h2>
                                    {{name.name}} İsmiyle Uyumlu İsimler
                                </h2>
                                <div class="description" v-html="name.uyumlu_isimler"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.karakter_ozellikleri)">
                                <h2>
                                    {{name.name}} İsminin Karakter Özellikleri
                                </h2>
                                <div class="description" v-html="name.karakter_ozellikleri"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.harf_analizi)">
                                <h2>
                                    {{name.name}} İsminin Harf Analizi
                                </h2>
                                <div class="description" v-html="name.harf_analizi"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.numeroloji_analizi)">
                                <h2>
                                    {{name.name}} İsminin Numeroloji Analizi
                                </h2>
                                <div class="description" v-html="name.numeroloji_analizi"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.numeroloji_ozellikleri)">
                                <h2>
                                    {{name.name}} İsminin Numerolojiye Göre Özellikleri
                                </h2>
                                <div class="description" v-html="name.numeroloji_ozellikleri"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.kader_sayisi_analizi)">
                                <h2>
                                    {{name.name}} İsminin Kader Sayısı ve Analizi
                                </h2>
                                <div class="description" v-html="name.kader_sayisi_analizi"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.ismin_sembolleri)">
                                <h2>
                                    {{name.name}} İsminin Sembolleri
                                </h2>
                                <div class="description" v-html="name.ismin_sembolleri"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.ismin_rengi)">
                                <h2>
                                    {{name.name}} İsminin Rengi
                                </h2>
                                <div class="description" v-html="name.ismin_rengi"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.sansli_numaralar)">
                                <h2>
                                    {{name.name}} İsminin Şanslı Numaraları
                                </h2>
                                <div class="description" v-html="name.sansli_numaralar"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.sansli_gunu)">
                                <h2>
                                    {{name.name}} İsminin Şanslı Günü
                                </h2>
                                <div class="description" v-html="name.sansli_gunu"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.sansli_ayi)">
                                <h2>
                                    {{name.name}} İsminin Şanslı Ayı
                                </h2>
                                <div class="description" v-html="name.sansli_ayi"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.ismin_notasyonu)">
                                <h2>
                                    {{name.name}} İsminin Notasyonu
                                </h2>
                                <div class="description" v-html="name.ismin_notasyonu"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.tdk_notasyonu)">
                                <h2>
                                    {{name.name}} İsminin TDK'ye Göre Notasyonu
                                </h2>
                                <div class="description" v-html="name.tdk_notasyonu"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.hava_kuvvetleri_notasyonu)">
                                <h2>
                                    {{name.name}} İsminin Hava Kuvvetleri Notasyonu
                                </h2>
                                <div class="description" v-html="name.hava_kuvvetleri_notasyonu"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.kara_kuvvetleri_notasyonu)">
                                <h2>
                                    {{name.name}} İsminin Kara Kuvvetleri Notasyonu
                                </h2>
                                <div class="description" v-html="name.kara_kuvvetleri_notasyonu"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.deniz_kuvvetleri_notasyonu)">
                                <h2>
                                    {{name.name}} İsminin Deniz Kuvvetleri Notasyonu
                                </h2>
                                <div class="description" v-html="name.deniz_kuvvetleri_notasyonu"></div>
                            </div>

                            <div class="col-12 mb-5">
                                <h2>
                                    {{name.name}} İsminin Parmak Alfabesiyle Gösterimi
                                </h2>
                                <div class="description">
                                    <span v-for="(parmak,index) in getNameParmak" :key="`parmak_${index}`">
                                        <img :src="`/Data/parmak/${parmak}.gif`" alt="Parmak" width="30" height="30"/>
                                    </span>
                                </div>
                            </div>

                            <div class="col-12 mb-5 mors">
                                <h2>
                                    {{name.name}} İsminin Mors Koduyla Yazılışı
                                </h2>
                                <div class="description">
                                    <span v-for="(mors,index) in getNameMors" :key="`mors_${index}`">
                                        <span v-if="mors == 'a'">.-</span>
                                        <span v-if="mors == 'b'">-...</span>
                                        <span v-if="mors == 'c'">-.-.</span>
                                        <span v-if="mors == 'ç'">-.-..</span>
                                        <span v-if="mors == 'd'">-..</span>
                                        <span v-if="mors == 'e'">.</span>
                                        <span v-if="mors == 'f'">..-.</span>
                                        <span v-if="mors == 'g'">--.</span>
                                        <span v-if="mors == 'ğ'">--.-.</span>
                                        <span v-if="mors == 'h'">....</span>
                                        <span v-if="mors == 'ı'">..</span>
                                        <span v-if="mors == 'i'">.-..-</span>
                                        <span v-if="mors == 'j'">.---</span>
                                        <span v-if="mors == 'k'">-.-</span>
                                        <span v-if="mors == 'l'">.-..</span>
                                        <span v-if="mors == 'm'">--</span>
                                        <span v-if="mors == 'n'">-.</span>
                                        <span v-if="mors == 'o'">---</span>
                                        <span v-if="mors == 'ö'">---.</span>
                                        <span v-if="mors == 'p'">.--.</span>
                                        <span v-if="mors == 'q'">--.-</span>
                                        <span v-if="mors == 'r'">.-.</span>
                                        <span v-if="mors == 's'">...</span>
                                        <span v-if="mors == 'ş'">.--..</span>
                                        <span v-if="mors == 't'">-</span>
                                        <span v-if="mors == 'u'">..-</span>
                                        <span v-if="mors == 'ü'">..--</span>
                                        <span v-if="mors == 'v'">...-</span>
                                        <span v-if="mors == 'w'">.--</span>
                                        <span v-if="mors == 'x'">-..-</span>
                                        <span v-if="mors == 'y'">-.--</span>
                                        <span v-if="mors == 'z'">--..</span>
                                    </span>
                                    
                                </div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.arapca)">
                                <h2>
                                    {{name.name}} İsminin Arapça Yazılışı
                                </h2>
                                <div class="description alert alert-warning diger-dil" v-html="name.arapca"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.cince)">
                                <h2>
                                    {{name.name}} İsminin Çince Yazılışı
                                </h2>
                                <div class="description alert alert-warning diger-dil" v-html="name.cince"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.japonca)">
                                <h2>
                                    {{name.name}} İsminin Japonca Yazılışı
                                </h2>
                                <div class="description alert alert-warning diger-dil" v-html="name.japonca"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.korece)">
                                <h2>
                                    {{name.name}} İsminin Korece Yazılışı
                                </h2>
                                <div class="description alert alert-warning diger-dil" v-html="name.korece"></div>
                            </div>

                            <div class="col-12 mb-5">
                                <h2>
                                    {{name.name}} İsminin Hiyeroglif (Mısır) Yazılışı
                                </h2>
                                <div class="description">
                                    <span class="mr-4" v-for="(hiyeroglif,index) in getNameHiyeroglif" :key="`hiyeroglif_${index}`">
                                        <img :src="`/Data/hiyeroglif/${hiyeroglif}.gif`" alt="Hiyeroglif" width="30" height="30"/>
                                    </span>
                                </div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.isme_sahip_unluler)">
                                <h2>
                                    {{name.name}} İsmine Sahip Ünlüler
                                </h2>
                                <div class="description" v-html="name.isme_sahip_unluler"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.ismin_istatikleri)">
                                <h2>
                                    {{name.name}} İsminin İstatistikleri 
                                </h2>
                                <div class="description" v-html="name.ismin_istatikleri"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.turkiyede_kac_kisi_var)">
                                <h2>
                                    {{name.name}} İsmi Türkiye’de Kaç Kişide Var?
                                </h2>
                                <div class="description" v-html="name.turkiyede_kac_kisi_var"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.turkiyede_siralama)">
                                <h2>
                                    {{name.name}} İsminin Türkiye Sıralaması 
                                </h2>
                                <div class="description" v-html="name.turkiyede_siralama"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.kullanim_sikligi)">
                                <h2>
                                    {{name.name}} İsminin Kullanım Sıklığı
                                </h2>
                                <div class="description" v-html="name.kullanim_sikligi"></div>
                            </div>

                            <div class="col-12 mb-5" v-if="$checkIsNullOrEmpty(name.il_il)">
                                <h2>
                                    Türkiye’de İl İl {{name.name}} İsminde Kaç Kişi Var?
                                </h2>
                                <div class="description">
                                    <h6 class="mb-2">
                                        <strong>
                                            İstanbul'da kaç tane {{ name.name }} isminden var?
                                        </strong>
                                        <span>
                                            : {{ name.il_il[34] }}
                                        </span>
                                    </h6>
                                    <h6 class="mb-2">
                                        <strong>
                                            Ankara'da kaç tane {{ name.name }} isminden var?
                                        </strong>
                                        <span>
                                            : {{ name.il_il[6] }}
                                        </span>
                                    </h6>
                                    <h6 class="mb-2">
                                        <strong>
                                            İzmir'da kaç tane {{ name.name }} isminden var?
                                        </strong>
                                        <span>
                                            : {{ name.il_il[35] }}
                                        </span>
                                    </h6>
                                    <div v-if="!isShowIl">
                                        <button class="btn btn-outline-dark" @click="isShowIl = true;">
                                            + Devamını Göster
                                        </button>
                                    </div>
                                    <table class="table mt-3" v-if="isShowIl">
                                        <thead>
                                            <tr>
                                                <th>Şehir</th>
                                                <th>İsim Sayısı</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-show="isShowIl">
                                                <td>Adana</td>
                                                <td>{{ name.il_il[1] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Adıyaman</td>
                                                <td>{{ name.il_il[2] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Afyonkarahisar</td>
                                                <td>{{ name.il_il[3] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Ağrı</td>
                                                <td>{{ name.il_il[4] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Aksaray</td>
                                                <td>{{ name.il_il[68] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Amasya</td>
                                                <td>{{ name.il_il[5] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Antalya</td>
                                                <td>{{ name.il_il[7] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Ardahan</td>
                                                <td>{{ name.il_il[75] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Artvin</td>
                                                <td>{{ name.il_il[8] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Aydın</td>
                                                <td>{{ name.il_il[9] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Balıkesir</td>
                                                <td>{{ name.il_il[10] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Bartın</td>
                                                <td>{{ name.il_il[74] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Batman</td>
                                                <td>{{ name.il_il[72] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Bayburt</td>
                                                <td>{{ name.il_il[69] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Bilecik</td>
                                                <td>{{ name.il_il[11] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Bingöl</td>
                                                <td>{{ name.il_il[12] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Bitlis</td>
                                                <td>{{ name.il_il[13] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Bolu</td>
                                                <td>{{ name.il_il[14] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Burdur</td>
                                                <td>{{ name.il_il[15] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Bursa</td>
                                                <td>{{ name.il_il[16] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Çanakkale</td>
                                                <td>{{ name.il_il[17] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Çankırı</td>
                                                <td>{{ name.il_il[18] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Çorum</td>
                                                <td>{{ name.il_il[19] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Denizli</td>
                                                <td>{{ name.il_il[20] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Diyarbakır</td>
                                                <td>{{ name.il_il[21] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Düzce</td>
                                                <td>{{ name.il_il[81] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Edirne</td>
                                                <td>{{ name.il_il[22] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Elazığ</td>
                                                <td>{{ name.il_il[23] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Erzincan</td>
                                                <td>{{ name.il_il[24] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Erzurum</td>
                                                <td>{{ name.il_il[25] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Eskişehir</td>
                                                <td>{{ name.il_il[26] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Gaziantep</td>
                                                <td>{{ name.il_il[27] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Giresun</td>
                                                <td>{{ name.il_il[28] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Gümüşhane</td>
                                                <td>{{ name.il_il[29] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Hakkari</td>
                                                <td>{{ name.il_il[30] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Hatay</td>
                                                <td>{{ name.il_il[31] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Iğdır</td>
                                                <td>{{ name.il_il[76] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Isparta</td>
                                                <td>{{ name.il_il[32] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Mersin</td>
                                                <td>{{ name.il_il[33] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Karabük</td>
                                                <td>{{ name.il_il[78] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Karaman</td>
                                                <td>{{ name.il_il[70] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Kars</td>
                                                <td>{{ name.il_il[36] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Kastamonu</td>
                                                <td>{{ name.il_il[37] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Kayseri</td>
                                                <td>{{ name.il_il[38] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Kırıkkale</td>
                                                <td>{{ name.il_il[71] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Kırklareli</td>
                                                <td>{{ name.il_il[39] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Kırşehir</td>
                                                <td>{{ name.il_il[40] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Kilis</td>
                                                <td>{{ name.il_il[79] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Kocaeli</td>
                                                <td>{{ name.il_il[41] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Konya</td>
                                                <td>{{ name.il_il[42] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Kütahya</td>
                                                <td>{{ name.il_il[43] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Malatya</td>
                                                <td>{{ name.il_il[44] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Manisa</td>
                                                <td>{{ name.il_il[45] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Kahramanmaraş</td>
                                                <td>{{ name.il_il[46] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Mardin</td>
                                                <td>{{ name.il_il[47] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Muğla</td>
                                                <td>{{ name.il_il[48] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Muş</td>
                                                <td>{{ name.il_il[49] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Nevşehir</td>
                                                <td>{{ name.il_il[50] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Niğde</td>
                                                <td>{{ name.il_il[51] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Osmaniye</td>
                                                <td>{{ name.il_il[80] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Ordu</td>
                                                <td>{{ name.il_il[52] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Rize</td>
                                                <td>{{ name.il_il[53] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Sakarya</td>
                                                <td>{{ name.il_il[54] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Samsun</td>
                                                <td>{{ name.il_il[55] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Siirt</td>
                                                <td>{{ name.il_il[56] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Sinop</td>
                                                <td>{{ name.il_il[57] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Sivas</td>
                                                <td>{{ name.il_il[58] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Şırnak</td>
                                                <td>{{ name.il_il[73] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Tekirdağ</td>
                                                <td>{{ name.il_il[59] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Tokat</td>
                                                <td>{{ name.il_il[60] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Trabzon</td>
                                                <td>{{ name.il_il[61] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Tunceli</td>
                                                <td>{{ name.il_il[62] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Şanlıurfa</td>
                                                <td>{{ name.il_il[63] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Uşak</td>
                                                <td>{{ name.il_il[64] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Van</td>
                                                <td>{{ name.il_il[65] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Yalova</td>
                                                <td>{{ name.il_il[77] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Yozgat</td>
                                                <td>{{ name.il_il[66] }}</td>
                                            </tr>
                                            <tr v-show="isShowIl">
                                                <td>Zonguldak</td>
                                                <td>{{ name.il_il[67] }}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div v-if="isShowIl">
                                        <button class="btn btn-outline-dark" @click="isShowIl = false;">
                                            - Devamını Gizle
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 mb-5 sss" v-if="$checkIsNullOrEmpty(name.html)">
                                <h2>
                                    {{name.name}} İsmi Hakkında Sık Sorulan Sorular
                                </h2>
                                <div class="description" v-html="name.html"></div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>                  
        </div>
    </div>
</template>

<script>
    export default 
    {
        name:'NameDetails',
        props: {
            seoLink: {
                type: String
            }
        },
        async fetch() {
            await this.getNameDetail();
        },
        head() {
           return {
                title: this.seo_title,
                meta: [
                    { hid: 'description', name: 'description', content: this.seo_description },
                    { hid: 'og:title' ,  property: 'og:title', content: this.seo_title },
                    { hid: 'og:description' , property: 'og:description', content: this.seo_description },
                    { hid:'robots' , name: 'robots', content: this.indexing }
                ],
            }
        },
        data() {
            return {
                seo_title:'Bebegimle Hayat - İsimler',
                seo_description: 'Bebegimle Hayat',
                indexing:'index,follow',
                isLoading:false,
                navigation:undefined,
                name: undefined,
                isShowIl:false,
                imageLoaded:false
            }
        },
        computed: {
            getNameParmak() {
                if(this.name && this.name.name) {
                    return this.name.name.toLowerCase().split('').map(item => {
                        if(item == 'ç')
                            return 'ct'

                        if(item == 'ğ')
                            return 'gt'

                        if(item == 'ı')
                            return 'it'

                        if(item == 'ö')
                            return 'ot'

                        if(item == 'ü')
                            return 'ut'

                        return item;
                    });
                }
                else {
                    return null
                }
            },
            getNameHiyeroglif() {
                if(this.name && this.name.name) {
                    return this.name.name.toLowerCase().split('').map(item => {
                        if(item == 'ç')
                            return 'h_c'

                        if(item == 'ğ')
                            return 'h_g'

                        if(item == 'ı')
                            return 'h_i'

                        if(item == 'ö')
                            return 'h_o'

                        if(item == 'ü')
                            return 'h_u'

                        return 'h_' + item;
                    });
                }
                else {
                    return null
                }
            },
            getNameMors() {
                if(this.name && this.name.name) {
                    return this.name.name.toLowerCase().split('').map(item => {
                        return item;
                    });
                }
                else {
                    return null
                }
            }
        },  
        methods: {
            onImgLoad() {
                this.imageLoaded = true
            },
            getNameDetail() {
                return new Promise((resolve,reject) => {
                    var _this = this;
                    var seo_link = _this.seoLink;
                    _this.$repositories.name.getNameBySeoLink(seo_link)
                    .then(res => {
                        if(res.data.success == 'success')
                        {
                            _this.name = res.data.response;
                            _this.seo_title = _this.name.seo_title;
                            _this.seo_description = _this.name.seo_description;
                            _this.navigation = [
                                {
                                    "name": _this.name.name + 'İsminin Anlamı Nedir? ' + _this.name.name + ' İsminin Özellikleri ve Detaylı İsim Analizi',
                                    "url": _this.name.seo_link
                                }
                            ]
                            resolve(true);
                            
                        }
                        else
                        {
                            _this.$router.push('/');
                            resolve(false);
                        }
                    });
                })
            }
        }
    }
</script>

<style>
    .image-text {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: baseline;
        flex-direction: column;
        justify-content: center;
        padding: 3em;
        text-transform: uppercase;
    }

    .image-text strong {
        font-size: 30px;
        line-height: 35px;
        transform: rotate(-7deg);
    }

    .image-text span {
        font-size: 30px;
        line-height: 34px;
        transform: rotate(-7deg);
    }

    .image-text span.first {
        padding-left: 0px;
    }

    .image-text span.second {
        padding-left: 3px;
        line-height: 46px;
    }
    #content h2 {
        border-left: 6px solid #db559e;
        padding-left: 12px;
        margin-bottom: 20px;
        font-size: 24px;
        line-height: 45px;
    }

    #content .description {
        font-size: 17px;
    }

    #content .description.diger-dil {
        font-size: 27px;
        color: rgb(191 67 67);
    }

    .sss .bi-chevron-down, .sss .collapsed .bi-chevron-up {
        display: none;
    }

    .sss .bi-chevron-up, .sss .collapsed .bi-chevron-down {
        display: block;
    }

    #content .mors span span {
        font-size: 33px;
        background: #fff3cd;
        width: 60px;
        height: 50px;
        float: left;
        margin-right: 10px;
        text-align: center;
        letter-spacing: 4px;
        border-radius: 8px;
    }

    @media screen and (max-width: 768px)
    {
        #content h2 {
            font-size: 20px;
            line-height: 40px;
        }

        #content .description {
            font-size: 16px;
        }
    }

    @media screen and (max-width: 540px)
    {
        h1#nameTitle
        {
            font-size: 24px;
        }
    }
</style>
