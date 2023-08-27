<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-5">
            <div class="col-12 col-lg-8">
                <div class="row">
                    <div class="col-12 mb-5">
                        <h1 class="font-weight-normal">
                            Bebek Aşı Takvimi Hesaplama
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="col-12" :class="result ? 'result' : 'no-result'" id="bebekAsiTakvimiForm">
                            <b-form class="row" v-if="!result">
                                <b-form-group class="col-12 mb-4 h5" id="gender_group" label="Cinsiyet"
                                    label-for="gender_input" description="">
                                    <b-form-radio-group id="gender-radio-id" v-model="gender" name="gender-radio"
                                        class="mt-2">
                                        <b-form-radio value="k">Kız</b-form-radio>
                                        <b-form-radio value="e">Erkek</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="name_group" label="Bebeğinizin ismi"
                                    label-for="name_input" description="">
                                    <b-form-input size="lg" class="border-dark mt-2" id="name_input" v-model="name"
                                        placeholder="bebeğinizin ismi.." type="text" required></b-form-input>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4" label-class="h5" id="birth_day_group"
                                    label="Bebeğinizin Doğum Tarihi" label-for="birth_day_input"
                                    description="Maksimum 24 aylık seçilebilir.">
                                    <b-form-datepicker size="lg"
                                        label-help="Takvim tarihlerinde gezinmek için imleç tuşlarını kullanın"
                                        label-no-date-selected="Tarih seçilmedi" class="mt-2 border-dark"
                                        id="datepicker-buttons" v-model="birthday" locale="tr"
                                        placeholder="Doğum tarihi seçiniz.." :min="minDate"
                                        :max="new Date().toISOString()"></b-form-datepicker>
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
                                <div class="col-12 p-4 bg-white" id="result">
                                    <div class="row">
                                        <div class="col-12 mb-5">
                                            <h4 class="font-weight-bold">
                                                Bebeğinizin aşı takvimi
                                            </h4>
                                        </div>
                                        <div class="col-12" v-if="babyMonth == 0">
                                            <div class="row">
                                                <div class="col-12 mb-4 h6 font-weight-normal">
                                                    <p>
                                                        <strong>{{ getDate(birthday) }}</strong>
                                                        <br>
                                                        <br>
                                                        İYİKİ DOĞDUN <strong class="text-uppercase">{{ name }}</strong>
                                                        BEBEK !
                                                        <br>
                                                        Bebeğinizin ilk aşısının vakti geldi. Bebeğinizin sağlığı için
                                                        gerekli olan
                                                        bu aşı onun sağlıklı bir hayat yaşamasını sağlayacak.
                                                    </p>
                                                </div>
                                                <div class="col-12 mb-4 h6 font-weight-normal">
                                                    <h6 class="mb-2">HEPATİT B</h6>
                                                    <p>
                                                        Hepatit B dünyada yaygın şekilde görülen bir karaciğer iltihabıdır.
                                                        Hepatit
                                                        B’nin en yaygın bulaşma şekli kan, cinsel ilişki, steril olmayan
                                                        iğneler,
                                                        tıbbi cihazlar ve gebelikte bebeğe geçmesidir. Doğumdan sonraki ilk
                                                        72
                                                        saatte ilk dozun yapılması sağlık için çok önemlidir. 2. doz 1 aylık
                                                        ve 3.
                                                        doz 6 aylıkken yapılacaktır.
                                                    </p>
                                                </div>
                                                <br>
                                            </div>
                                        </div>

                                        <div class="col-12" v-if="babyMonth < 1">
                                            <div class="row">
                                                <div class="col-12 mb-4 h6 font-weight-normal">
                                                    <div class="d-block mt-2">
                                                        <br>
                                                        <strong>
                                                            {{ getDate(birthday, 1) }}
                                                        </strong>
                                                        <br>
                                                        <br>
                                                        <p>
                                                            Bebeğiniz <strong>1</strong> aylık oldu.
                                                            <br>
                                                            Bebeğiniz 1 aylık oldu. Sanki daha dün doğmuş gibi kucağınızda.
                                                            Şimdi de
                                                            diğer aşıların vakti geldi.
                                                        </p>
                                                    </div>
                                                    <h6 class="mb-2">HEPATİT B</h6>
                                                    <p>
                                                        Hepatit B dünyada yaygın şekilde görülen bir karaciğer iltihabıdır.
                                                        Hepatit
                                                        B’nin en yaygın bulaşma şekli kan, cinsel ilişki, steril olmayan
                                                        iğneler,
                                                        tıbbi cihazlar ve gebelikte bebeğe geçmesidir. Doğumdan sonraki ilk
                                                        72
                                                        saatte ilk dozun yapılması sağlık için çok önemlidir. 2. doz 1 aylık
                                                        ve 3.
                                                        doz 6 aylıkken yapılacaktır.
                                                    </p>
                                                </div>
                                                <br>
                                            </div>
                                        </div>

                                        <div class="col-12" v-if="babyMonth < 2">
                                            <div class="row">
                                                <div class="col-12 mb-4 h6 font-weight-normal">
                                                    <div class="d-block mt-2">
                                                        <br>
                                                        <strong>
                                                            {{ getDate(birthday, 2) }}
                                                        </strong>
                                                        <br>
                                                        <br>
                                                        <p>
                                                            Bebeğiniz 2 aylık oldu. Sağlığını korumak için yeni aşıların
                                                            vakti
                                                            geldi.
                                                        </p>
                                                        <br>
                                                        <p>
                                                            İşte bebeğinizin 2. Ay Aşıları
                                                        </p>

                                                        <br>
                                                        <h6 class="mb-2">Beşli Karma Aşı (DaBT – İPA – Hib)</h6>
                                                        <p>
                                                            Beşli karma aşı birçok tehlikeli hastalığa karşı aynı anda
                                                            koruyan
                                                            etkili bir aşıdır. Aşının önlediği 5 hastalık ise Difteri,
                                                            Boğmaca,
                                                            Tetanoz, Çocuk Felci ve Hemofilüz Influenza B hastalıklarıdır.
                                                            Beşli
                                                            karma aşı 2. ay, 4. ay, 6. ay ve 18. ay olmak üzere 4 doz olarak
                                                            yapılır.
                                                        </p>
                                                        <br>
                                                        <h6 class="mb-2">Konjüge Pnömokok Aşısı (KPA) </h6>
                                                        <p>
                                                            Konjüge pnömokok aşısı zatürre, orta kulak iltihabı ve menenjite
                                                            karşı
                                                            koruma sağlar. KPA 2. ay, 4. ay ve 12. ay olmak üzere 3 doz
                                                            yapılmaktadır.
                                                        </p>
                                                    </div>
                                                </div>
                                                <br>
                                            </div>
                                        </div>

                                        <div class="col-12" v-if="babyMonth < 4">
                                            <div class="row">
                                                <div class="col-12 mb-4 h6 font-weight-normal">
                                                    <div class="d-block mt-2">
                                                        <br>
                                                        <strong>
                                                            {{ getDate(birthday, 4) }}
                                                        </strong>
                                                        <br>
                                                        <br>
                                                        <p>
                                                            Bebeğiniz 4 aylık oldu. Bu ay devam aşılarıyla bebeğinizi
                                                            korumaya devam
                                                            edeceksiniz.
                                                        </p>
                                                    </div>

                                                    <br>
                                                    <h6 class="mb-2">Beşli Karma Aşı (DaBT – İPA – Hib)</h6>
                                                    <p>
                                                        Beşli karma aşı birçok tehlikeli hastalığa karşı aynı anda koruyan
                                                        etkili
                                                        bir aşıdır. Aşının önlediği 5 hastalık ise Difteri, Boğmaca,
                                                        Tetanoz, Çocuk
                                                        Felci ve Hemofilüz Influenza B hastalıklarıdır. Beşli karma aşı 2.
                                                        ay, 4.
                                                        ay, 6. ay ve 18. ay olmak üzere 4 doz olarak yapılır.
                                                    </p>
                                                    <br>
                                                    <h6 class="mb-2">Konjüge Pnömokok Aşısı (KPA) </h6>
                                                    <p>
                                                        Konjüge pnömokok aşısı zatürre, orta kulak iltihabı ve menenjite
                                                        karşı
                                                        koruma sağlar. KPA 2. ay, 4. ay ve 12. ay olmak üzere 3 doz
                                                        yapılmaktadır.
                                                    </p>

                                                </div>
                                                <br>
                                            </div>
                                        </div>

                                        <div class="col-12" v-if="babyMonth < 6">
                                            <div class="row">
                                                <div class="col-12 mb-4 h6 font-weight-normal">
                                                    <div class="d-block mt-2">
                                                        <br>
                                                        <strong>
                                                            {{ getDate(birthday, 6) }}
                                                        </strong>
                                                        <br>
                                                        <br>
                                                        <p>
                                                            Bebeğiniz 6 aylıkken olacağı aşılar arasında hem devam aşıları
                                                            hem de
                                                            yeni aşılar bulunmaktadır.
                                                        </p>
                                                    </div>

                                                    <br>
                                                    <h6 class="mb-2">Beşli Karma Aşı (DaBT – İPA – Hib)</h6>
                                                    <p>
                                                        Beşli karma aşı birçok tehlikeli hastalığa karşı aynı anda koruyan
                                                        etkili
                                                        bir aşıdır. Aşının önlediği 5 hastalık ise Difteri, Boğmaca,
                                                        Tetanoz, Çocuk
                                                        Felci ve Hemofilüz Influenza B hastalıklarıdır. Beşli karma aşı 2.
                                                        ay, 4.
                                                        ay, 6. ay ve 18. ay olmak üzere 4 doz olarak yapılır.
                                                    </p>

                                                    <br>
                                                    <h6 class="mb-2">Hepatit B</h6>
                                                    <p>
                                                        Hepatit B dünyada yaygın şekilde görülen bir karaciğer iltihabıdır.
                                                        Hepatit
                                                        B’nin en yaygın bulaşma şekli kan, cinsel ilişki, steril olmayan
                                                        iğneler,
                                                        tıbbi cihazlar ve gebelikte bebeğe geçmesidir. Doğumdan sonraki ilk
                                                        72
                                                        saatte ilk dozun yapılması sağlık için çok önemlidir. 2. doz 1 aylık
                                                        ve 3.
                                                        doz 6 aylıkken yapılacaktır.
                                                    </p>

                                                    <br>
                                                    <h6 class="mb-2">Oral Polio – Çocuk Felci (OPA) Aşısı </h6>
                                                    <p>
                                                        Oral Polio, yani çocuk felci aşısı ağız yoluyla yapılan bir aşıdır.
                                                        Tüm
                                                        dünyada yaygın ve tehlikeli bir hastalıktır. 6. ay ve 18. ay olmak
                                                        üzere 2
                                                        doz yapılır.
                                                    </p>

                                                </div>
                                                <br>
                                            </div>
                                        </div>

                                        <div class="col-12" v-if="babyMonth < 12">
                                            <div class="row">
                                                <div class="col-12 mb-4 h6 font-weight-normal">
                                                    <div class="d-block mt-2">
                                                        <br>
                                                        <strong>
                                                            {{ getDate(birthday, 12) }}
                                                        </strong>
                                                        <br>
                                                        <br>
                                                        <p>
                                                            Bebeğiniz 1 yaşına geldi! Aynı şekilde yeni aşılarla tanışma
                                                            zamanı da
                                                            geldi.
                                                        </p>
                                                    </div>
                                                    <br>
                                                    <h6 class="mb-2">Kızamık, Kızamıkçık ve Kabakulak Aşısı (KKK Aşısı)
                                                    </h6>
                                                    <p>Kızamık, kızamıkçık ve kabakulak tüm dünyada yaygın hastalıklardır.
                                                        Okul
                                                        çağına ulaşmadan çocuklara yapılması önemlidir. KKK aşısı 1 yaş ve 4
                                                        yaş
                                                        olmak üzere iki doz uygulanır. </p>
                                                    <br>
                                                    <p>
                                                        Kızamık vücutta kırmızı noktalar ve ateşle ortaya çıkan bulaşıcı bir
                                                        hastalıktır. Kızamıkçık da oldukça benzer bir şekilde kırmızı
                                                        noktalar,
                                                        döküntü ateş ve lenf bezi şişmesiyle ortaya çıkmaktadır. Kabakulak
                                                        da lenf
                                                        bezlerinin şişmesi ve ateşle ortaya çıkmaktadır.
                                                    </p>

                                                    <br>
                                                    <h6 class="mb-2">Su Çiçeği (Varisella) Aşısı </h6>
                                                    <p>
                                                        Suçiçeği ülkemizde son derece yaygın olan bir hastalıktır. Bu yüzden
                                                        çocukların suçiçeği aşısı olması çok önemlidir. Suçiçeği 1 yaş ve 4
                                                        yaş
                                                        olmak üzere 2 doz uygulanır.
                                                    </p>
                                                    <br>
                                                    <p>
                                                        Vücutta kızarma, kaşıntı, döküntü ve ateşe sebep olur. Tedavi
                                                        edilmezse çok
                                                        daha ağır hastalıklara nüksedebilir.
                                                    </p>

                                                    <br>
                                                    <h6 class="mb-2">Konjüge Pnömokok Aşısı (KPA) </h6>
                                                    <p>
                                                        Konjüge pnömokok aşısı zatürre, orta kulak iltihabı ve menenjite
                                                        karşı
                                                        koruma sağlar. KPA 2. ay, 4. ay ve 12. ay olmak üzere 3 doz
                                                        yapılmaktadır.
                                                    </p>

                                                </div>
                                                <br>
                                            </div>
                                        </div>

                                        <div class="col-12" v-if="babyMonth < 18">
                                            <div class="row">
                                                <div class="col-12 mb-4 h6 font-weight-normal">
                                                    <div class="d-block mt-2">
                                                        <br>
                                                        <strong>
                                                            {{ getDate(birthday, 18) }}
                                                        </strong>
                                                        <br>
                                                        <br>
                                                        <p>
                                                            Bebeğiniz artık 18 aylık. Bu ay yeni aşılar ve devam aşılarıyla
                                                            bebeğinizin sağlığını koruyacaksınız.
                                                        </p>
                                                    </div>
                                                    <br>

                                                    <h6 class="mb-2">Beşli Karma Aşı (DaBT – İPA – Hib) </h6>
                                                    <p>
                                                        Beşli karma aşı birçok tehlikeli hastalığa karşı aynı anda koruyan
                                                        etkili
                                                        bir aşıdır. Aşının önlediği 5 hastalık ise Difteri, Boğmaca,
                                                        Tetanoz, Çocuk
                                                        Felci ve Hemofilüz Influenza B hastalıklarıdır. Beşli karma aşı 2.
                                                        ay, 4.
                                                        ay, 6. ay ve 18. ay olmak üzere 4 doz olarak yapılır.
                                                    </p>

                                                    <br>
                                                    <h6 class="mb-2">
                                                        Hepatit A
                                                    </h6>
                                                    <p>
                                                        Hepatit A karaciğere saldıran bir hastalıktır. Tedavi edilmediğinde
                                                        karaciğer yetmezliğine sebep verebilir. Bu yüzden 18 ay ve 2 yaş
                                                        olmak üzere
                                                        2 doz aşı yapılmaktadır.
                                                    </p>
                                                    <br>

                                                    <h6 class="mb-2">
                                                        Oral Polio – Çocuk Felci (OPA) Aşısı
                                                    </h6>
                                                    <p>
                                                        Oral Polio, yani çocuk felci aşısı ağız yoluyla yapılan bir aşıdır.
                                                        Tüm
                                                        dünyada yaygın ve tehlikeli bir hastalıktır. 6. ay ve 18. ay olmak
                                                        üzere 2
                                                        doz yapılır.
                                                    </p>
                                                </div>
                                                <br>
                                            </div>
                                        </div>

                                        <div class="col-12" v-if="babyMonth < 24">
                                            <div class="row">
                                                <div class="col-12 mb-4 h6 font-weight-normal">
                                                    <div class="d-block mt-2">
                                                        <br>
                                                        <strong>
                                                            {{ getDate(birthday, 24) }}
                                                        </strong>
                                                        <br>
                                                        <br>
                                                        <p>
                                                            Bebeğiniz iki yaşına geldi! Zaman gerçekten çok hızlı geçiyor.
                                                            Bu ay
                                                            devam aşılarıyla bebeğinizin sağlığını korumaya devam
                                                            ediyorsunuz.
                                                        </p>
                                                    </div>
                                                    <br>

                                                    <h6 class="mb-2">Kızamık, Kızamıkçık ve Kabakulak Aşısı (KKK Aşısı)
                                                    </h6>
                                                    <p>
                                                        Kızamık, kızamıkçık ve kabakulak tüm dünyada yaygın hastalıklardır.
                                                        Okul
                                                        çağına ulaşmadan çocuklara yapılması önemlidir. KKK aşısı 1 yaş ve 4
                                                        yaş
                                                        olmak üzere iki doz uygulanır.
                                                    </p>
                                                    <br>
                                                    <p>
                                                        Kızamık vücutta kırmızı noktalar ve ateşle ortaya çıkan bulaşıcı bir
                                                        hastalıktır. Kızamıkçık da oldukça benzer bir şekilde kırmızı
                                                        noktalar,
                                                        döküntü ateş ve lenf bezi şişmesiyle ortaya çıkmaktadır. Kabakulak
                                                        da lenf
                                                        bezlerinin şişmesi ve ateşle ortaya çıkmaktadır.
                                                    </p>

                                                    <br>

                                                    <h6 class="mb-2"> Dörtlü Karma Aşı (DaBT – İPA) </h6>
                                                    <p>
                                                        Dörtlü karma aşı, beşli karma aşının devamı niteliğindedir. 4
                                                        tehlikeli
                                                        hastalığa karşı korumak için geliştirilmiştir. Bu hastalıklar
                                                        Difteri,
                                                        Boğmaca, Tetanoz ve Çocuk Felci hastalıklarıdır. Beşli karma aşının
                                                        devamı
                                                        olduğu için tek doz yapılması yeterlidir.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12 mb-3 mt-4 text-center">
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

                        <div class="row">
                            <div class="col-12 mt-4" id="bebekAsiTakvimiContent">
                                <h2>Aşı nedir?</h2>
                                <br>

                                <p>Hastalıklardan korunmanın en etkili yolu ilaçlar değil, hastalığa karşı bağışıklık
                                    kazanmaktır. Bu bağışıklığı kazandırmak üzere geliştirilmiş olan aşılar sizi bulaşıcı
                                    hastalıklardan koruyabilmektedir. Aşıların içerisinde zayıflatılmış hastalık mikropları
                                    vardır. Vücudunuz bu zayıf mikroplarla karşılaştığında savaşır ve o mikroba özel antikor
                                    üretir. Böylece vücudunuz bağışıklık sahibi olur. Üretilen antikorlar daha sonra aynı
                                    mikrop ile karşılaşınca nasıl davranması gerektiğini bilir ve hastalığı başlamadan
                                    bitirir. </p>

                                <br><br>

                                <h2>Çocuk ve bebeklerde aşının önemi nedir?</h2>
                                <br>

                                <p>Çocuk ve bebeklerin bağışıklık sistemi yetişkinlere göre nispeten daha zayıftır. Bu
                                    yüzden hastalıklara daha kolay yakalanırlar. Bulaşıcı hastalıklar önlem alınmadığında
                                    çocuklarda çok büyük riskler doğururlar. Özellikle ölüm ve sakatlık riski öne
                                    çıkmaktadır. Bu nedenle çocukluk aşıları son derece önemlidir.
                                    Aşılar sadece çocuğu korumakla kalmaz, tüm toplumu korur. Halkın %97’sinin aşılanması
                                    sonucunda hastalıklar zamanla yok olur. Çiçek hastalığı, çocuk felci ve kızamık gibi
                                    hastalıklar aşılar sayesinde toplumsal bağışıklık geliştirilerek ortadan kaybolmuştur.
                                </p>

                                <br><br>

                                <h2>Çocuk ve bebeklerde aşılar nasıl etki gösterir?</h2>
                                <br>

                                <p>Aşı içerisindeki zayıflatılmış mikrop vücuda girdiğinde çocuk ve bebeklerin bağışıklık
                                    sistemi mikrobu tanır. Tanıdığı mikroba karşı özel bellek hücreler oluşturur. Aynı
                                    mikrop vücuda bir daha girerse hücreler o mikroba karşı özel antikorlar oluşturarak daha
                                    güçlü bir savunma ortaya çıkarır. Bu da mikrobun yayılmasını engeller.</p>

                                <h2>Bebek aşı takvimi nedir?</h2>

                                <br>

                                <p>Dünyadaki her ülkenin kendine göre bir bebek aşı takvimi vardır. Bebek aşı takvimleri
                                    doğumdan itibaren hangi, aşıların hangi aylarda, hangi yaşlarda ve hangi aşının
                                    yapılacağı bilgisini içerir. Aşı takvimine göre aşılar yapıldığında hem bebeklerin hem
                                    de toplumun bağışıklığı sağlanmış olur. Bu şekilde pek çok ölümün ve hastalığın önüne
                                    geçilir. </p>

                                <br><br>

                                <h2>Hepatit B Aşısı Nedir?</h2>
                                <br>

                                <p>Hepatit B bebekler doğar doğmaz yapılan ilk aşıdır. İkinci dozu 1 aylıkken ve üçüncü dozu
                                    6 aylıkken yapılır. Üç doz aşı yapılmadığı takdirde aşı tam etkisini göstermez.
                                    Türkiye’de Hepatit B taşıyıcılığı son derece yaygındır. Aşıların yapılmadığı takdirde
                                    Hepatit B’ye yakalanılma olasılığı oldukça yüksektir. Hastalık B ilerlediği takdirde
                                    karaciğer yetmezliğine sebep olabilir. Hastalığı engellemek için bebekken yapılan 3 doz
                                    aşı bu yüzden son derece önemlidir.</p>

                                <br><br>

                                <h2>Verem (BCG) Aşısı Nedir?</h2>
                                <br>

                                <p>Verem aşısı 2. ayda tek doz şeklinde uygulanır. Verem, diğer adıyla tüberküloz, hava
                                    yoluyla yayılan ölümcül bir hastalıktır. Son derece yaygın olan Verem, akciğerleri hedef
                                    alır ve ölümcüldür. </p>

                                <br><br>

                                <h2>5’li Karma Aşı (DaBT – İPA – Hib) Nedir?</h2>
                                <br>

                                <p>5’li karma aşı adı üstünde 5 farklı hastalık için uygulanan bir aşıdır. Bu hastalıklar
                                    Difteri, Aselüler Boğmaca, Tetanoz, İnaktif Polio ve Hemofilus Influenza Tip B
                                    hastalıklarıdır. Bebek 2 aylıkken, 4 aylık, 6 aylıkken ve 18 aylıkken toplamda 4 doz
                                    şeklinde yapılır. Hastalıkların her biri son derece bulaşıcıdır ve yakalanıldığında
                                    ciddi hasarlara sebep olabilir. Bu yüzden aşıların eksiksiz yapılması çok önemlidir.
                                </p>

                                <br><br>

                                <h2>Konjüge Pnömokok (KPA) Aşısı Nedir?</h2>
                                <br>

                                <p>KPA bebeğiniz 2 aylıkken, 4 aylıkken ve 12 aylıkken olmak üzere 3 dozdan oluşur. KPA
                                    aşısı zatürre, orta kulak iltihabı ve menenjit gibi hastalıklara karşı bağışıklık
                                    sağlar. Tedavi edilmediğinde bu hastalıklar ölümcül olabilir.</p>

                                <br><br>

                                <h2>Kızamık, Kızamıkçık ve Kabakulak (KKK) Aşısı Nedir?</h2>
                                <br>

                                <p>KKK aşısı 1 yaş ve 4 yaş olmak üzere 2 doz uygulanır. Kızamık, Kızamıkçık ve Kabakulak
                                    hastalıkları tüm dünyada son derece yaygın bir hastalıktır. Aşılar sayesinde yayılma ve
                                    ölümler durdurulmuştur.</p>

                                <br><br>

                                <h2>Suçiçeği Aşısı Nedir?</h2>
                                <br>

                                <p>Suçiçeği aşısı 1 yaşta tek doz olarak uygulanır. Su çiçeği son derece bulaşıcı bir
                                    hastalıktır ve yetişkinlerde ölümcül sonuçlar doğurabilmektedir. Yani bebeğin aşılanması
                                    aynı zamanda ebeveynleri de korumaktadır.</p>

                                <br><br>

                                <h2>Çocuk Felci (Oral Polio – OPA) Aşısı Nedir?</h2>
                                <br>

                                <p>OPA çocuğunuz 6 ve 18 aylık olmak üzere 2 doz yapılan bir aşıdır. Çocuk felci virüsü
                                    çocuklarda ve gençlerde felce sebep olabilmektedir. Aşı yapılmadığı takdirde
                                    hızlıca yayılır ve çok hızlı etkiler.</p>

                                <br><br>

                                <h2>Hepatit A Aşısı Nedir?</h2>
                                <br>

                                <p>Hepatit A 18 ve 24 aylıkken olmak üzere 2 doz yapılmaktadır. Hepatit A ülkemizde son
                                    derece yaygındır. Aşı yapılmadığı takdirde karaciğer yetmezliğine sebep olabilir.</p>

                                <h2>Aşı Takviminde Nelere Dikkat Edilmelidir?</h2>

                                <br>

                                <p>• Aşı zamanını takip edince vakti geldiğinde geciktirmeden yapın. Aksi takdirde aşının
                                    diğer dozları etkisini kaybedebilir ve en baştan yaptırmanız gerekebilir.</p>

                                <br>

                                <p>• Bebeğiniz prematüre bile olsa aşılar eksiksiz ve olması gereken düzende
                                    yapılmalıdırlar.</p>

                                <br>

                                <p>• Aşı takvimi dışarısında önerilen çocuk aşıları bulunmaktadır. Bunlar hakkında daha
                                    fazla bilgiyi doktorunuzdan alabilirsiniz.</p>

                                <br><br>

                                <h2>Çocuk ve Bebeklerde Aşıların Yan Etkileri Nelerdir?</h2>
                                <br>

                                <p>Aşıların vücuda mikrop yollaması sonucunda bebeğinizin vücudu savaşmak için harekete
                                    geçecektir. Bu da ateşe, ağrılara ve halsizliğe sebep olabilir. Aynı zamanda aşının
                                    yapıldığı yerin kızarması da oldukça normaldir. Bu yan etkiler aşılar için oldukça
                                    yaygın ve doğaldır. Dinlenme ve sağlıklı beslenme ile kolayca geçerler. Eğer şikayetler
                                    ağırsa parasetemol kullanmayı düşünebilirsiniz.</p>

                                <br><br>

                                <h2>Aşılarda Nelere Dikkat Edilmelidir?</h2>
                                <br>

                                <p>Aşıların saklanırken soğuk zincirin kırılmaması ve son kullanma tarihinin geçmemiş olması
                                    önemlidir. Aşının yan etkileri konusunda aile ve çocuk bilgilendirilmelidir.</p>

                                <br><br>

                                <h2>Prematüre Bebeklerde Aşı Takvimi Nasıl Uygulanır?</h2>
                                <br>

                                <p>Prematüre bebekler de doğumdan itibaren aynı düzende aşı takvimi takip ederler. Diğer
                                    bebekler kadar gelişmiş olmalarına gerek yoktur. Eğer prematüre bebek fazla zayıfsa
                                    doktor bazı aşıların zamanını yeniden planlayabilir.</p>

                                <br><br>

                                <h2>Bebeklere Aşılar Koldan mı Yoksa Bacaktan mı Yapılır?</h2>
                                <br>

                                <p>Bebek iki yaşına gelene kadar aşılar bacaktan yapılır. İki yaşından sonra aşılar koldan
                                    yapılır.</p>

                                <br><br>

                                <h2>Aşı Sonrası Bebek Huzursuzluğu Nasıl Geçer?</h2>
                                <br>

                                <p>Bebeklerin aşıdan sonra ağrı ve halsizlik hissetmesi veya ateşlerinin çıkması son derece
                                    yaygındır. Bu süreçte bebeğiniz devamlı huzursuzluk yapabilir. Bebeğinizi rahatlatmak
                                    için devamlı ilgilenmeniz veya emzirmeniz gerekebilir. Eğer bebeğinizin şikayetleri
                                    artıyorsa parasetemol kullanmayı düşünebilirsiniz.</p>

                                <br><br>

                                <h2>Çocuk ve Bebeklere Aşı Uygulanmazsa Ne Olur?</h2>
                                <br>

                                <p>Şu anda aşı yapılan hastalıkların vakası olmasa bile bu hastalıkların ortadan kalktığı
                                    anlamına gelmez. Aşı yapılmadığı takdirde taşıyıcı olan diğer çocuklardan hastalık
                                    kapılabilir. Çocukluk döneminde aşısı yapılan birçok hastalık ölümcül olduğu için
                                    yapılmaktadır. Aşı uygulanmadığı takdirde çocuğunuz bu hastalıklara yakalanabilir.</p>

                                <br><br>

                                <h2>Zorunlu Olmayan Aşıların Yapılması Önemli midir?</h2>
                                <br>

                                <p>Zorunlu olmasalar da aşıların yapılması son derece önemlidir. Hastalıklara karşı
                                    bağışıklık kazanmak çocuğunuzun hastalıklara karşı koruyacaktır. Aşı yapılmadığı
                                    takdirde karşılaşılan mikroplar çocukların şiddetli hastalık geçirmesine, hastanelik
                                    olmasına ve hatta ölümüyle bile sonuçlanabilir.</p>

                                <br><br>

                                <h2>Aşı Karşıtlığı Hangi Sonuçları Doğurur?</h2>
                                <br>

                                <p>Aşılar insan hayatı korumak için geliştirilmiştir. Aşı mantığını ve çalışma prensibi
                                    bilmeyen kişiler tarafından aşılar hakkında yalan iddialar atılmaktadır. Bağımsız
                                    çalışmalar aşıların zararlı olmadığını ve insan hayatını kurtarmak için en etkili
                                    yöntemlerden biri olduğunu kanıtlamıştır. Aşılar her sene ülkemizde milyonlarca çocuğun
                                    hayatının kurtulmasını sağlamıştır. İnsanlar aşılanmaya devam ettiği sürece bulaşıcı
                                    hastalıklardan uzak durulabilir. Aşıların bırakılması uzun süredir görülmemiş
                                    hastalıkların yeniden ortaya çıkmasına ve hem çocukların hem de yetişkinlerin hayatının
                                    tehlikeye atılmasına sebep olur.</p>

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
import Vue from 'vue'
import { FormPlugin, FormDatepickerPlugin, FormInputPlugin, FormGroupPlugin, FormRadioPlugin, SpinnerPlugin } from 'bootstrap-vue'
Vue.use(FormPlugin);
Vue.use(FormDatepickerPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormRadioPlugin);
Vue.use(SpinnerPlugin);

export default {
    name: 'BebekAsiTakvimi',
    head() {
        return {
            title: "Bebek Aşı Takvimi Hesaplama - BebeğimleHayat ",
            meta: [
                { hid: 'description', name: 'description', content: "Bebek aşı takvimi sağlık açısından yakından takip edilmesi gereken verilerden biridir. Bebeğimlehayat bebek aşı takvimi hesaplama aracı ile pratik şekilde aşı tablosu oluşturabilirsiniz!" },
                { hid: 'og:title', property: 'og:title', content: "Bebek aşı takvimi sağlık açısından yakından takip edilmesi gereken verilerden biridir. Bebeğimlehayat bebek aşı takvimi hesaplama aracı ile pratik şekilde aşı tablosu oluşturabilirsiniz!" }
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
                                "name": "Aşı nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Hastalıklardan korunmanın en etkili yolu ilaçlar değil, hastalığa karşı bağışıklık kazanmaktır. Bu bağışıklığı kazandırmak üzere geliştirilmiş olan aşılar sizi bulaşıcı hastalıklardan koruyabilmektedir. Aşıların içerisinde zayıflatılmış hastalık mikropları vardır. Vücudunuz bu zayıf mikroplarla karşılaştığında savaşır ve o mikroba özel antikor üretir. Böylece vücudunuz bağışıklık sahibi olur. Üretilen antikorlar daha sonra aynı mikrop ile karşılaşınca nasıl davranması gerektiğini bilir ve hastalığı başlamadan bitirir. "
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Çocuk ve bebeklerde aşının önemi nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Çocuk ve bebeklerin bağışıklık sistemi yetişkinlere göre nispeten daha zayıftır. Bu yüzden hastalıklara daha kolay yakalanırlar. Bulaşıcı hastalıklar önlem alınmadığında çocuklarda çok büyük riskler doğururlar. Özellikle ölüm ve sakatlık riski öne çıkmaktadır. Bu nedenle çocukluk aşıları son derece önemlidir. Aşılar sadece çocuğu korumakla kalmaz, tüm toplumu korur. Halkın %97’sinin aşılanması sonucunda hastalıklar zamanla yok olur. Çiçek hastalığı, çocuk felci ve kızamık gibi hastalıklar aşılar sayesinde toplumsal bağışıklık geliştirilerek ortadan kaybolmuştur."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Çocuk ve bebeklerde aşılar nasıl etki gösterir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Aşı içerisindeki zayıflatılmış mikrop vücuda girdiğinde çocuk ve bebeklerin bağışıklık sistemi mikrobu tanır. Tanıdığı mikroba karşı özel bellek hücreler oluşturur. Aynı mikrop vücuda bir daha girerse hücreler o mikroba karşı özel antikorlar oluşturarak daha güçlü bir savunma ortaya çıkarır. Bu da mikrobun yayılmasını engeller."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Bebek aşı takvimi nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Dünyadaki her ülkenin kendine göre bir bebek aşı takvimi vardır. Bebek aşı takvimleri doğumdan itibaren hangi, aşıların hangi aylarda, hangi yaşlarda ve hangi aşının yapılacağı bilgisini içerir.  Aşı takvimine göre aşılar yapıldığında hem bebeklerin hem de toplumun bağışıklığı sağlanmış olur. Bu şekilde pek çok ölümün ve hastalığın önüne geçilir. "
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Hepatit B Aşısı Nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Hepatit B bebekler doğar doğmaz yapılan ilk aşıdır. İkinci dozu 1 aylıkken ve üçüncü dozu 6 aylıkken yapılır. Üç doz aşı yapılmadığı takdirde aşı tam etkisini göstermez. Türkiye’de Hepatit B taşıyıcılığı son derece yaygındır. Aşıların yapılmadığı takdirde Hepatit B’ye yakalanılma olasılığı oldukça yüksektir. Hastalık B ilerlediği takdirde karaciğer yetmezliğine sebep olabilir. Hastalığı engellemek için bebekken yapılan 3 doz aşı bu yüzden son derece önemlidir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Verem (BCG) Aşısı Nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Verem aşısı 2. ayda tek doz şeklinde uygulanır. Verem, diğer adıyla tüberküloz, hava yoluyla yayılan ölümcül bir hastalıktır. Son derece yaygın olan Verem, akciğerleri hedef alır ve ölümcüldür. "
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "5’li Karma Aşı (DaBT – İPA – Hib) Nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "5’li karma aşı adı üstünde 5 farklı hastalık için uygulanan bir aşıdır. Bu hastalıklar Difteri, Aselüler Boğmaca, Tetanoz, İnaktif Polio ve Hemofilus Influenza Tip B hastalıklarıdır. Bebek 2 aylıkken, 4 aylık, 6 aylıkken ve 18 aylıkken toplamda 4 doz şeklinde yapılır. Hastalıkların her biri son derece bulaşıcıdır ve yakalanıldığında ciddi hasarlara sebep olabilir. Bu yüzden aşıların eksiksiz yapılması çok önemlidir. "
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Konjüge Pnömokok (KPA) Aşısı Nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": " KPA bebeğiniz 2 aylıkken, 4 aylıkken ve 12 aylıkken olmak üzere 3 dozdan oluşur. KPA aşısı zatürre, orta kulak iltihabı ve menenjit gibi hastalıklara karşı bağışıklık sağlar. Tedavi edilmediğinde bu hastalıklar ölümcül olabilir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Kızamık, Kızamıkçık ve Kabakulak (KKK) Aşısı Nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "KKK aşısı 1 yaş ve 4 yaş olmak üzere 2 doz uygulanır. Kızamık, Kızamıkçık ve Kabakulak hastalıkları tüm dünyada son derece yaygın bir hastalıktır. Aşılar sayesinde yayılma ve ölümler durdurulmuştur."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Suçiçeği Aşısı Nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Suçiçeği aşısı 1 yaşta tek doz olarak uygulanır. Su çiçeği son derece bulaşıcı bir hastalıktır ve yetişkinlerde ölümcül sonuçlar doğurabilmektedir. Yani bebeğin aşılanması aynı zamanda ebeveynleri de korumaktadır."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Çocuk Felci (Oral Polio – OPA) Aşısı Nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "OPA çocuğunuz 6 ve 18 aylık olmak üzere 2 doz yapılan bir aşıdır. Çocuk felci virüsü çocuklarda ve gençlerde felce sebep olabilmektedir. Aşı yapılmadığı takdirde hızlıca yayılır ve çok hızlı etkiler."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Hepatit A Aşısı Nedir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Hepatit A 18 ve 24 aylıkken olmak üzere 2 doz yapılmaktadır. Hepatit A ülkemizde son derece yaygındır. Aşı yapılmadığı takdirde karaciğer yetmezliğine sebep olabilir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Aşı Takviminde Nelere Dikkat Edilmelidir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Aşı zamanını takip edince vakti geldiğinde geciktirmeden yapın. Aksi takdirde aşının diğer dozları etkisini kaybedebilir ve en baştan yaptırmanız gerekebilir.Bebeğiniz prematüre bile olsa aşılar eksiksiz ve olması gereken düzende yapılmalıdırlar.Aşı takvimi dışarısında önerilen çocuk aşıları bulunmaktadır. Bunlar hakkında daha fazla bilgiyi doktorunuzdan alabilirsiniz."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Çocuk ve Bebeklerde Aşıların Yan Etkileri Nelerdir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Aşıların vücuda mikrop yollaması sonucunda bebeğinizin vücudu savaşmak için harekete geçecektir. Bu da ateşe, ağrılara ve halsizliğe sebep olabilir. Aynı zamanda aşının yapıldığı yerin kızarması da oldukça normaldir. Bu yan etkiler aşılar için oldukça yaygın ve doğaldır. Dinlenme ve sağlıklı beslenme ile kolayca geçerler. Eğer şikayetler ağırsa parasetemol kullanmayı düşünebilirsiniz."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Aşılarda Nelere Dikkat Edilmelidir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Aşıların saklanırken soğuk zincirin kırılmaması ve son kullanma tarihinin geçmemiş olması önemlidir. Aşının yan etkileri konusunda aile ve çocuk bilgilendirilmelidir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Prematüre Bebeklerde Aşı Takvimi Nasıl Uygulanır?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Prematüre bebekler de doğumdan itibaren aynı düzende aşı takvimi takip ederler. Diğer bebekler kadar gelişmiş olmalarına gerek yoktur. Eğer prematüre bebek fazla zayıfsa doktor bazı aşıların zamanını yeniden planlayabilir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Bebeklere Aşılar Koldan mı Yoksa Bacaktan mı Yapılır?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Bebek iki yaşına gelene kadar aşılar bacaktan yapılır. İki yaşından sonra aşılar koldan yapılır."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Aşı Sonrası Bebek Huzursuzluğu Nasıl Geçer?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Bebeklerin aşıdan sonra ağrı ve halsizlik hissetmesi veya ateşlerinin çıkması son derece yaygındır. Bu süreçte bebeğiniz devamlı huzursuzluk yapabilir. Bebeğinizi rahatlatmak için devamlı ilgilenmeniz veya emzirmeniz gerekebilir. Eğer bebeğinizin şikayetleri artıyorsa parasetemol kullanmayı düşünebilirsiniz."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": " Çocuk ve Bebeklere Aşı Uygulanmazsa Ne Olur?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Şu anda aşı yapılan hastalıkların vakası olmasa bile bu hastalıkların ortadan kalktığı anlamına gelmez. Aşı yapılmadığı takdirde taşıyıcı olan diğer çocuklardan hastalık kapılabilir. Çocukluk döneminde aşısı yapılan birçok hastalık ölümcül olduğu için yapılmaktadır. Aşı uygulanmadığı takdirde çocuğunuz bu hastalıklara yakalanabilir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": " Zorunlu Olmayan Aşıların Yapılması Önemli midir?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Zorunlu olmasalar da aşıların yapılması son derece önemlidir. Hastalıklara karşı bağışıklık kazanmak çocuğunuzun hastalıklara karşı koruyacaktır. Aşı yapılmadığı takdirde karşılaşılan mikroplar çocukların şiddetli hastalık geçirmesine, hastanelik olmasına ve hatta ölümüyle bile sonuçlanabilir."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": " Aşı Karşıtlığı Hangi Sonuçları Doğurur?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Aşılar insan hayatı korumak için geliştirilmiştir. Aşı mantığını ve çalışma prensibi bilmeyen kişiler tarafından aşılar hakkında yalan iddialar atılmaktadır. Bağımsız çalışmalar aşıların zararlı olmadığını ve insan hayatını kurtarmak için en etkili yöntemlerden biri olduğunu kanıtlamıştır. Aşılar her sene ülkemizde milyonlarca çocuğun hayatının kurtulmasını sağlamıştır. İnsanlar aşılanmaya devam ettiği sürece bulaşıcı hastalıklardan uzak durulabilir. Aşıların bırakılması uzun süredir görülmemiş hastalıkların yeniden ortaya çıkmasına ve hem çocukların hem de yetişkinlerin hayatının tehlikeye atılmasına sebep olur."
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
            gender: null,
            name: null,
            birthday: new Date().toISOString(),
            babyMonth: 0,
            nameError: false,
            genderError: false,
            birthdayError: false,

            result: false,
            isLoading: false
        }
    },
    computed: {
        minDate() {
            let date = new Date();
            date.setFullYear(date.getFullYear() - 2);
            return date.toISOString();
        }
    },
    methods: {
        doAgain() {
            this.result = false;
            this.gender = null;
            this.name = null;
            this.babyMonth = 0;
            this.birthday = new Date().toISOString();

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
        calculate() {
            const _this = this;

            if (!_this.gender) {
                _this.genderError = true;
                _this.$bvToast.toast("Bebeğinizin cinsiyetini giriniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                return false;
            }
            else {
                _this.genderError = false;
            }

            if (!_this.name) {
                _this.nameError = true;
                _this.$bvToast.toast("Bebeğinizin ismini giriniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                return false;
            }
            else {
                _this.nameError = false;
            }

            if (!_this.birthday) {
                _this.birthdayError = true;
                _this.$bvToast.toast("Bebeğinizin doğum tarihini giriniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                return false;
            }
            else {
                _this.birthdayError = false;
            }

            _this.result = false;
            _this.isLoading = true;

            setTimeout(() => {
                const monthDiff = new Date().getMonth() - new Date(_this.birthday).getMonth();
                const yearDiff = new Date().getYear() - new Date(_this.birthday).getYear();

                this.babyMonth = monthDiff + yearDiff * 12;
                _this.result = true;
                _this.isLoading = false;
            }, 2000)
        },
        getDate(d, plusMonth) {
            let date = new Date(d);
            if (plusMonth) {
                date.setMonth(date.getMonth() + plusMonth);
                return date.toLocaleDateString();
            }
            else {
                return date.toLocaleDateString();
            }
        }
    },
    async created() {
        this.navigation = [
            {
                "name": "Bebek Aşı Takvimi Hesaplama",
                "url": "/bebek-asi-takvimi-hesaplama"
            }
        ]
    }
}
</script>

<style>
.bg-pink {
    background-color: #ff8b7c;
}

.icon-result {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

#bebekAsiTakvimiContent h2 {
    font-size: 20px;
}

#bebekAsiTakvimiContent p {
    font-size: 15px;
}

.height-content {
    border-right: 4px solid rgb(185, 67, 52);
}

.weigth-content {
    border-right: 4px solid rgb(1, 97, 116);
}

#bebekAsiTakvimiForm {
    background-color: rgb(235, 247, 250);
    padding: 3em;
    border-top: 11px solid rgb(216, 240, 245);
}

#bebekAsiTakvimiForm.no-result:after {
    content: '';
    position: absolute;
    top: -30px;
    left: calc(50% - 25px);
    height: 50px;
    width: 50px;
    background: url(https://api.bebegimlehayat.com/Data/image/extra_small/bebek_asi_takvimi_hesaplama-1684180646597.jpeg) no-repeat left bottom;
    background-size: 100%;
    border-radius: 50%;
}

#bebekAsiTakvimiForm.result:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 164px;
    width: 290px;
    background: url(/Data/bg_toolResult_lLeaf.svg) no-repeat left bottom;
    background-size: 100%;
}

#bebekAsiTakvimiForm.result:before {
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

#bebekAsiTakvimiForm #result .man {
    color: #58adbe;
}

#bebekAsiTakvimiForm #result .women {
    color: #ffc0cb;
}

.start-over {
    z-index: 2;
    position: relative;
}

#bebekAsiTakvimiForm .start-over:hover {
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
