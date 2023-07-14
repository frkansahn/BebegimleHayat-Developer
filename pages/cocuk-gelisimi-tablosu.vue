<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-5">
            <div class="col-12 col-lg-8">
                <div class="row">
                    <div class="col-12 mb-5">
                        <h1 class="font-weight-normal">
                            Çocuk Gelişimi Tablosu
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="col-12" :class="result ? 'result' : 'no-result'" id="cocukGelisimiForm">
                            <b-form class="row" v-if="!result">
                                <b-form-group class="col-12 mb-4 h5" id="gender_group" label="Cinsiyet"
                                    label-for="gender_input" description="">
                                    <b-form-radio-group id="gender-radio-id" v-model="gender" name="gender-radio"
                                        class="mt-2">
                                        <b-form-radio :value="1">Kız</b-form-radio>
                                        <b-form-radio :value="0">Erkek</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="birth_day_group" label="Çocuğunuzun Doğum Tarihi"
                                    label-for="birth_day_input" description="">
                                    <b-form-datepicker size="lg"
                                        label-help="Takvim tarihlerinde gezinmek için imleç tuşlarını kullanın"
                                        label-no-date-selected="Tarih seçilmedi" class="mt-2 border-dark"
                                        id="datepicker-buttons" v-model="birthday" :min="minDate"
                                        :max="new Date(measurementBirthday).toISOString()" locale="tr"
                                        placeholder="Doğum tarihi seçiniz.."></b-form-datepicker>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="measurement_birth_day_group"
                                    label="Ölçümlerinizi Ne Zaman Yaptınız" label-for="measurement_birth_day_input"
                                    description="">
                                    <b-form-datepicker size="lg"
                                        label-help="Takvim tarihlerinde gezinmek için imleç tuşlarını kullanın"
                                        label-no-date-selected="Tarih seçilmedi" class="mt-2 border-dark"
                                        id="datepicker-measurement-buttons" v-model="measurementBirthday"
                                        :min="new Date(birthday).toISOString()" locale="tr"
                                        placeholder="Ölçüm tarihi seçiniz.."></b-form-datepicker>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="weight_group" label="Çocuğunuzun Kilosu"
                                    label-for="weight_input" description="">
                                    <b-input-group class="mb-2 mt-2 mr-sm-2 mb-sm-0">
                                        <b-form-input size="lg" class="border-right-0 border-dark rounded-0 px-2"
                                            id="weight_input" v-model="weight" @keypress="isNumber($event)" placeholder="0"
                                            min="0" type="number" required></b-form-input>
                                        <template #append>
                                            <b-input-group-text class="px-3">kg</b-input-group-text>
                                        </template>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group class="col-12 mb-4 h5" id="height_group" label="Çocuğunuzun Boyu"
                                    label-for="height_input" description="">
                                    <b-input-group append="cm" class="mb-2 mt-2 mr-sm-2 mb-sm-0">
                                        <b-form-input size="lg" class="border-right-0 border-dark rounded-0 px-2"
                                            id="height_input" v-model="height" @keypress="isNumber($event)" placeholder="0"
                                            min="0" type="number" required></b-form-input>
                                        <template #append>
                                            <b-input-group-text class="px-3">cm</b-input-group-text>
                                        </template>
                                    </b-input-group>
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
                            <div class="row p-0 p-lg-5" v-else>
                                <div class="col-12 p-4 bg-white" id="result">
                                    <div class="row">
                                        <div class="col-12 mb-4">
                                            <h4 class="font-weight-bold">
                                                Çocuğunuzun büyüme tablosu
                                            </h4>
                                        </div>
                                        <div class="col-12 mb-4">
                                            <h6 class="font-weight-normal d-flex align-items-center">
                                                <span :class="gender == 1 ? 'bg-pink' : 'bg-info'"
                                                    class="rounded-circle d-flex align-items-center justify-content-center mr-2 icon-result">
                                                    <svg v-if="gender == 1" aria-hidden="true" focusable="false"
                                                        data-prefix="fas" data-icon="venus" role="img"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                                        class="text-white svg-inline--fa fa-venus">
                                                        <path fill="currentColor"
                                                            d="M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1V384H128c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V349.1z"
                                                            class=""></path>
                                                    </svg>
                                                    <svg v-else aria-hidden="true" focusable="false" data-prefix="fas"
                                                        data-icon="mars" role="img" xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512" class="text-white svg-inline--fa fa-mars">
                                                        <path fill="currentColor"
                                                            d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8H424c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80l0 0h0v0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z"
                                                            class=""></path>
                                                    </svg>
                                                </span>
                                                {{ childMonth }}'lık
                                            </h6>
                                        </div>

                                        <div class="col-12 mb-3 pb-3 border-bottom">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2 weigth-content d-flex align-items-center">
                                                    <img src="https://assets.babycenter.com/ims/2022/02/ic_weightGain_2022.svg"
                                                        alt="Terazi" width="100" height="100" />
                                                </div>
                                                <div class="col-8 d-flex d-md-none flex-column h6 mb-0">
                                                    <h6 class="font-weight-bold mb-2">
                                                        Kilo
                                                    </h6>
                                                    <div class="d-flex align-items-center">
                                                        <small
                                                            class="text-white bg-secondary rounded-circle mr-1 icon-result">
                                                            #
                                                        </small>
                                                        {{ weight }} kg
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-10">
                                                    <div class="d-flex align-items-center">
                                                        <div
                                                            class="col-12 col-md-2 px-0 d-none d-md-flex flex-column h6 mb-0">
                                                            <h6 class="font-weight-bold mb-2">
                                                                Kilo
                                                            </h6>
                                                            <div class="d-flex align-items-center">
                                                                <small
                                                                    class="text-white bg-secondary rounded-circle mr-1 icon-result">
                                                                    #
                                                                </small>
                                                                {{ weight }} kg
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-12 col-md-10 px-0 px-md-3 mt-3 mt-md-0 d-flex align-items-center h6 mb-0">
                                                            <small v-if="weightPercentile == 0">
                                                                Çocuğunuz kilo açısından %97'lik dilimde. Bu da yaşındaki
                                                                diğer çocukların %3’sinden daha kilolu olduğu ve kalan
                                                                %97’ten zayıf olduğu anlamına geliyor.
                                                            </small>
                                                            <small v-if="weightPercentile == 100">
                                                                Çocuğunuz kilo açısından %3'lük dilimde. Bu da yaşındaki
                                                                diğer çocukların %97’sinden daha kilolu olduğu ve kalan
                                                                %3’ten zayıf olduğu anlamına geliyor.
                                                            </small>
                                                            <small v-if="weightPercentile < 100 && weightPercentile > 0">
                                                                Çocuğunuz kilo açısından %{{ weightPercentile }}'lik
                                                                dilimde. Bu da yaşındaki diğer çocukların %{{ 100 -
                                                                    weightPercentile }}’inden daha kilolu olduğu ve kalan %{{
        weightPercentile }}’ten zayıf olduğu anlamına geliyor.
                                                            </small>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12 mb-3">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2 height-content d-flex align-items-center">
                                                    <img src="https://assets.babycenter.com/ims/2022/02/ic_growthChart_measuringTape.svg"
                                                        alt="Terazi" width="100" height="100" />
                                                </div>
                                                <div class="col-8 d-flex d-md-none flex-column h6 mb-0">
                                                    <h6 class="font-weight-bold mb-2">
                                                        Boy
                                                    </h6>
                                                    <div class="d-flex align-items-center">
                                                        <small
                                                            class="text-white bg-secondary rounded-circle mr-1 icon-result">
                                                            #
                                                        </small>
                                                        {{ height }} cm
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-10">
                                                    <div class="d-flex align-items-center">
                                                        <div
                                                            class="col-12 col-md-2 px-0 d-none d-md-flex flex-column h6 mb-0">
                                                            <h6 class="font-weight-bold mb-2">
                                                                Boy
                                                            </h6>
                                                            <div class="d-flex align-items-center">
                                                                <small
                                                                    class="text-white bg-secondary rounded-circle mr-1 icon-result">
                                                                    #
                                                                </small>
                                                                {{ height }} cm
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-12 col-md-10 px-0 px-md-3 mt-3 mt-md-0 d-flex align-items-center h6 mb-0">
                                                            <small v-if="heightPercentile == 0">
                                                                Çocuğunuz boy açısından %97'lik dilimde. Bu da yaşındaki
                                                                diğer çocukların %3’inden daha uzun olduğu ve kalan %97’ten
                                                                kısa olduğu anlamına geliyor.
                                                            </small>
                                                            <small v-if="heightPercentile == 100">
                                                                Çocuğunuz boy açısından %3'lük dilimde. Bu da yaşındaki
                                                                diğer çocukların %97’sinden daha uzun olduğu ve kalan %3’ten
                                                                kısa olduğu anlamına geliyor.
                                                            </small>
                                                            <small v-if="heightPercentile < 100 && heightPercentile > 0">
                                                                Çocuğunuz boy açısından %{{ heightPercentile }}'lik dilimde.
                                                                Bu da yaşındaki diğer çocukların %{{ 100 - heightPercentile
                                                                }}’inden daha uzun olduğu ve kalan %{{ heightPercentile
}}’ten kısa olduğu anlamına geliyor.
                                                            </small>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-3 mt-4 d-flex justify-content-center">
                                            <h5 role="button" class="start-over" @click="resetData();">
                                                <small>
                                                    Tekrar Yap
                                                </small>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 px-0 py-3 mt-4 result-description" v-if="result">
                            <b-tabs content-class="mt-3" active-nav-item-class="border-primary">
                                <b-tab active title-link-class="border border-top-0 border-right-0 border-left-0 h6">
                                    <template #title>
                                        Kilo
                                    </template>
                                    <div>
                                        <p>
                                            Çocuğunuz kilo için 1. persentilde. Bu, onun yaşındaki kızların yüzde 1'inin
                                            ondan
                                            daha zayıf ve yüzde 99'unun daha kilolu olduğu anlamına geliyor. Bebek büyüme
                                            çizelgeleri hakkında daha fazla bilgi edinin.
                                        </p>
                                    </div>
                                </b-tab>
                                <b-tab title-link-class="border border-top-0 border-right-0 border-left-0 h6">
                                    <template #title>
                                        Boy
                                    </template>
                                    <div>
                                        <p>
                                            Çocuğunuz boy için 1. persentilde. Bu, onun yaşındaki kızların yüzde 1'inin
                                            ondan
                                            daha kısa ve yüzde 99'unun ondan daha uzun olduğu anlamına geliyor. Bebek büyüme
                                            çizelgeleri hakkında daha fazla bilgi edinin.
                                        </p>
                                    </div>
                                </b-tab>
                            </b-tabs>
                        </div>

                        <div class="row mt-4 ">
                            <div class="col-12" id="cocukGelisimiContent">
                                <h2>Bebek Gelişim Tablosu Nedir?</h2>
                                <br>
                                <p>Ebeveynler için minik yavrularının sağlığı oldukça önemlidir. Bu noktada evrensel bazı
                                    değerler üzerinden hesaplanan gelişim tablolarından faydalanılır. Bebek gelişim
                                    tabloları, çeşitli fiziksel özellikler dahilinde ideal gelişim sürecini planlamayı ve
                                    takip etmeyi sağlar. Peki, bebek gelişim tablosu neden önemlidir ve bebek gelişim
                                    tablosunda hangi veriler yer alır? Bebeğinizin ideal gelişimini takip etmek için
                                    kullanabileceğiniz bebek gelişim tabloları hakkında merak ettiğiniz her şey
                                    Bebeğimlehayat’ta! </p>
                                <br><br>
                                <h2>Bebek Gelişim Tablosu Neden Önemlidir?</h2>
                                <br>
                                <p>Anne karnından itibaren bebeklerin fiziksel gelişimlerinin takip edilmesi olası
                                    problemlere dair fikir sahibi olmak ve erken tanı ihtimalini artırmak için önemlidir.
                                    Bebek gelişim tablosu bebeklerin çeşitli fiziksel verileri kullanılarak oluşturulmuştur
                                    ve “ideal gelişim özellikleri” ile bebeğinizin gelişim özelliklerini karşılaştırmanıza
                                    olanak tanır. Gelişim tablosundaki ideal değerler çeşitli etkenler bağlamında değişiklik
                                    gösterebilir ancak bebeklerin gelişimleriyle ilgili yeterli bilgiyi verir. Bebeklerin
                                    ideal boy uzunluğunun altında ya da üstünde olması, kilo kontrolü, kilo ve boy oranı
                                    gibi verileri ışığında çeşitli gelişimsel sorunlar ya da hastalıklar olup olmadığının
                                    tespit edilebilmesi için bu tablolar büyük önem taşır.</p>
                                <br>
                                <p>Bebeğinizin gelişim değerlerinin ideal bebek gelişim tablosundaki değerlerle uyuşmaması
                                    her zaman ciddi bir problemin varlığına işaret etmeyebilir. Gelişim tabloları yalnızca
                                    fikir edinmek üzere tasarlanmıştır. En doğru bilgiyi çocuk doktorunuzdan alabilirsiniz.
                                </p>
                                <br><br>
                                <h2>Bebek Gelişim Tablosunda Hangi Veriler Yer Alır?</h2>
                                <br>
                                <p>Bebek gelişim tabloları çeşitli veriler ve özellikler bağlamında geliştirilmiştir. Bu
                                    noktada ilk önemli faktör cinsiyettir. Kızlar ve erkekler gelişimsel açıdan birbirinden
                                    farklı ilerler. Bu sebeple her cinsiyet için ideal gelişim değerleri farklılık gösterir.
                                </p>
                                <br>
                                <p>Bebek gelişim tablosunda önemli bir diğer değer ise doğum tarihidir. Bebeğin ideal
                                    gelişiminin takip edilebilmesi için tam yaş değerinin gün, ay ve yıl olarak girilmesi
                                    oldukça önemlidir.</p>
                                <br>
                                <p>Bebeğin gelişim tablosunu doğru şekilde kullanabilmek için verilerin son ölçüm tarihi de
                                    oldukça önemlidir. Ölçümler doktor kontrollerinde yapılabileceği gibi hassas araçlar
                                    yardımıyla ev ortamında da gerçekleştirilebilir.
                                    Bebeklerin baş çevresi de gelişim takibinde kullanılan verilerden biridir. Baş çevresi
                                    ölçüsü, beyin gelişimiyle ilgili veriler edinmek için kullanılır.</p>
                                <br><br>
                                <h2>Bebeklerde Kilo, Boy ve Baş Çevresi Ölçümü Nasıl Yapılır?</h2>
                                <br>
                                <p>Bebek gelişim tablosunda en doğru verilerin girilebilmesi ve takibin doğru şekilde
                                    yapılabilmesi için ölçüm tekniklerine dikkat edilmesi gerekir. Doktor kontrollerinde
                                    bebekler hassas bebek tartıları ve özel cetvellerle ölçülür. Kilo ölçümü esnasında
                                    bebeğin ayakkabılarının ve kıyafetlerinin çıkartılmış olması gerekir.</p>
                                <br>
                                <p>Evde ölçüm yapmak istiyorsanız en doğru veriler için bir hassas bebek tartısı edinmeniz
                                    önerilir. Hassas bebek tartınız yoksa uygulayabileceğiniz basit bir yöntem daha bulunur.
                                    Bu yöntemde öncelikle bebeğinizin üzerindeki her şeyi çıkarmanız gerekir. Ardından
                                    bebeğinizi kucağınıza alarak tartıya çıkmanız ve gördüğünüz değeri not etmeniz gerekir.
                                    Sonraki adım ise bebeğinizi kucağınızdan indirip tartıya tekrar çıktığınızda gördüğünüz
                                    değeri not almanızdır. Bebeğinizle birlikte gerçekleştirdiğiniz ölçüm değerinden tek
                                    başınıza gerçekleştirdiğiniz ölçüm değerini çıkardığınızda bebeğinizin ağırlığını
                                    yaklaşık olarak tespit etmiş olursunuz.</p>
                                <br>
                                <p>Bebeklerin boyu hastane ortamında özel cetveller yardımıyla ölçülür. Evde ölçüm yapmak
                                    için ise basit bir mezura kullanabilirsiniz. Bu noktada bebeğinizi tamamen uzanmış
                                    şekilde sabit tutması için bir başkasının yardımına ihtiyaç duyabilirsiniz. Mezuranın
                                    başlangıç noktasını bebeğinizin başına gelecek şekilde tutup ayak parmaklarına kadar
                                    esneterek bebeğinizin boyunu tespit edebilirsiniz. Bu noktada bebeğin düz bir zeminde,
                                    düz uzanmış şekilde yatması sağlıklı bir ölçüm yapılabilmesi açısından elzemdir.</p>
                                <br>
                                <p>Baş çevresi ölçümü de en sağlıklı şekilde hastane ortamında yapılabilir ancak esnek bir
                                    mezura yardımıyla evde ölçüm yapmak da ihtiyaç duyulan verileri sağlayacaktır. Mezurayı
                                    bebeğinizin başının en geniş yerine, yani kulakların ve kaşların hemen üzerine
                                    yerleştirerek baş çevresi ölçümü yapabilirsiniz. Bu noktada ölçümü birkaç kez
                                    tekrarlamanız, alacağınız değerin güvenilirliği açısından önemlidir.</p>
                                <br><br>
                                <h2>Bebeklerde Ölçüm Sıklığı Nasıl Olmalıdır?</h2>
                                <br>
                                <p>Bebeklerde gelişim takibi için yapılması gereken ölçümlerin sıklığı da merak edilen
                                    konular arasında yer alır. En doğru takip için ilk 1 ay boyunca her hafta ölçüm yapmanız
                                    önerilir. Sonraki altı aylık süreçte her ay bir kez ölçüm yapılması gelişim takibi için
                                    idealdir. Bir yaşına ilerlerken her ay ölçüm yapmaya devam edilebileceği gibi iki ayda
                                    bir ölçüm yapmak da gelişim takibi için yeterli olur.</p>
                                <br><br>
                                <h2>Persentil Nedir?</h2>
                                <br>
                                <p>Persentil bebeklerin kilo, boy ve baş çevresi değerlerinin onlarla yaşıt bebeklerdeki
                                    ortalama ve ideal değerlere göre nasıl ilerlediğini takip etmeye yarayan eğrilerdir.
                                    Persentil eğrileri aynı zamanda “büyüme eğrileri” adıyla da bilinir. Bebeğinizin gelişim
                                    geriliği gösterip göstermediğini, ideal gelişim sürecinin hangi evresinde olduğunu
                                    tespit etmek için persentil eğrilerinden faydalanabilirsiniz.</p>
                                <br><br>
                                <h2>Persentil Nasıl Hesaplanır?</h2>
                                <br>
                                <p>Persentil değerleri farklı dönemlerde bebeklerin ortalama ve ideal kilo, boy ve baş
                                    çevresi ölçüleri baz alınarak oluşturulan tablolardır. Kız ve erkek bebekler için farklı
                                    değerlerle oluşturulan bu tablolarda gelişim takibi için yüzdelik değerler kullanılır.
                                    Bu bağlamda bebeğinizin fiziksel verileri %3 ile %97 arasında bulunuyorsa gelişimsel
                                    açıdan bir problem olmadığına kanaat getirilebilir.</p>
                                <br>
                                <p>Persentil yüzdelerinin temsil ettiği değerler aşağıdaki gibi sıralanabilir:</p>
                                <br>
                                <p>%0 ve %10 arası en düşük değerdir. Bebeğinizin persentil değerinin bu aralıkta olması,
                                    yaşıt bebeklerin gelişimine kıyasla oldukça geride olduğunu gösterir. Bu durumda derhal
                                    bir doktora danışılması ve bu durumun sebebinin tespit edilmesi gerekir.</p>
                                <br>
                                <p>%10 ve %25 arası düşük değerdir. Bebeğinizin persentil değeri bu aralıktaysa doktor
                                    kontrolü altında olması gerekir. Aksi halde gelişim geriliği görülebilir.</p>
                                <br>
                                <p>%25 ve %75 arası normal değerdir. Bebeğinizin persentil değeri bu aralıktaysa bu durum
                                    bebeğinizin aynı yaş ve cinsiyetteki bebeklerle dengeli gelişim gösterdiği anlamına
                                    gelir. Bu durumda 3 ayda bir yeniden ölçüm yapılması ve persentil değerinin takip
                                    edilmesi yeterli olacaktır.</p>
                                <br>
                                <p>%75 ve %90 arası yüksek değerdir. Bu durumda bebeğiniz aynı yaş ve cinsiyetteki diğer
                                    bebeklere kıyasla daha kilolu ve daha uzun boyludur. Aynı zamanda bebeğinizin baş
                                    çevresi de diğer bebeklere kıyasla daha büyüktür. Bu durumda doktor kontrolünde ideal
                                    değerlere ulaşmak için bir program belirlenmesi gerekir.</p>
                                <br>
                                <p>%90 ve %100 arası en yüksek değerdir. Bu durumda bebeğiniz aynı yaş ve cinsiyetteki diğer
                                    bebeklerle kıyaslandığında fazla gelişim göstermektedir. Bu noktada bebeğinizde hormonal
                                    bozukluklar, genetik bazı hastalıklar ya da anomaliler, obezite gibi sağlık sorunları
                                    bulunabilir. Bebeğinizin persentil değerinin bu aralıkta bulunması durumunda düzenli
                                    doktor kontrolleriyle sorunun kaynağı bulunmalı ve tedaviye başlanmalıdır.</p>
                                <br><br>
                                <h2>Bebeğimlehayat Bebek Gelişim Tablosu İle Bebeğinizin Gelişimini Nasıl Takip
                                    Edebilirsiniz?</h2>
                                <br>
                                <p>Bebeklerin sağlıklı ve ideal gelişim gösterebilmesi için çeşitli reflekslerin ve
                                    becerilerin gelişimi takip edilebilir. Bununla birlikte gelişim özelliklerine dair en
                                    net veriler arasında kilo, boy ve baş çevresi değerleri de yer alır. Bebeğinizin
                                    ölçümlerini gerçekleştirdikten sonra Bebeğimlehayat bebek gelişim hesaplama aracı
                                    sayesinde pratik şekilde gelişim takibi gerçekleştirebilirsiniz! </p>
                                <br><br>

                                <script type="application/ld+json">
                                    {
                                            "@context": "https://schema.org",
                                            "@type": "FAQPage",
                                            "mainEntity": [
                                                {
                                                "@type": "Question",
                                                "name": "Bebek Gelişim Tablosu Nedir?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Ebeveynler için minik yavrularının sağlığı oldukça önemlidir. Bu noktada evrensel bazı değerler üzerinden hesaplanan gelişim tablolarından faydalanılır. Bebek gelişim tabloları, çeşitli fiziksel özellikler dahilinde ideal gelişim sürecini planlamayı ve takip etmeyi sağlar. Peki, bebek gelişim tablosu neden önemlidir ve bebek gelişim tablosunda hangi veriler yer alır? Bebeğinizin ideal gelişimini takip etmek için kullanabileceğiniz bebek gelişim tabloları hakkında merak ettiğiniz her şey Bebeğimlehayat’ta!"
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Bebek Gelişim Tablosu Neden Önemlidir?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Anne karnından itibaren bebeklerin fiziksel gelişimlerinin takip edilmesi olası problemlere dair fikir sahibi olmak ve erken tanı ihtimalini artırmak için önemlidir. Bebek gelişim tablosu bebeklerin çeşitli fiziksel verileri kullanılarak oluşturulmuştur ve \“ideal gelişim özellikleri\” ile bebeğinizin gelişim özelliklerini karşılaştırmanıza olanak tanır. Gelişim tablosundaki ideal değerler çeşitli etkenler bağlamında değişiklik gösterebilir ancak bebeklerin gelişimleriyle ilgili yeterli bilgiyi verir. Bebeklerin ideal boy uzunluğunun altında ya da üstünde olması, kilo kontrolü, kilo ve boy oranı gibi verileri ışığında çeşitli gelişimsel sorunlar ya da hastalıklar olup olmadığının tespit edilebilmesi için bu tablolar büyük önem taşır.
                                            Bebeğinizin gelişim değerlerinin ideal bebek gelişim tablosundaki değerlerle uyuşmaması her zaman ciddi bir problemin varlığına işaret etmeyebilir. Gelişim tabloları yalnızca fikir edinmek üzere tasarlanmıştır. En doğru bilgiyi çocuk doktorunuzdan alabilirsiniz."
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Bebek Gelişim Tablosunda Hangi Veriler Yer Alır?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Bebek gelişim tabloları çeşitli veriler ve özellikler bağlamında geliştirilmiştir. Bu noktada ilk önemli faktör cinsiyettir. Kızlar ve erkekler gelişimsel açıdan birbirinden farklı ilerler. Bu sebeple her cinsiyet için ideal gelişim değerleri farklılık gösterir.
                                            Bebek gelişim tablosunda önemli bir diğer değer ise doğum tarihidir. Bebeğin ideal gelişiminin takip edilebilmesi için tam yaş değerinin gün, ay ve yıl olarak girilmesi oldukça önemlidir.
                                            Bebeğin gelişim tablosunu doğru şekilde kullanabilmek için verilerin son ölçüm tarihi de oldukça önemlidir. Ölçümler doktor kontrollerinde yapılabileceği gibi hassas araçlar yardımıyla ev ortamında da gerçekleştirilebilir.
                                            Bebeklerin baş çevresi de gelişim takibinde kullanılan verilerden biridir. Baş çevresi ölçüsü, beyin gelişimiyle ilgili veriler edinmek için kullanılır."
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Bebeklerde Kilo, Boy ve Baş Çevresi Ölçümü Nasıl Yapılır?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Bebek gelişim tablosunda en doğru verilerin girilebilmesi ve takibin doğru şekilde yapılabilmesi için ölçüm tekniklerine dikkat edilmesi gerekir. Doktor kontrollerinde bebekler hassas bebek tartıları ve özel cetvellerle ölçülür. Kilo ölçümü esnasında bebeğin ayakkabılarının ve kıyafetlerinin çıkartılmış olması gerekir.
                                            Evde ölçüm yapmak istiyorsanız en doğru veriler için bir hassas bebek tartısı edinmeniz önerilir. Hassas bebek tartınız yoksa uygulayabileceğiniz basit bir yöntem daha bulunur. Bu yöntemde öncelikle bebeğinizin üzerindeki her şeyi çıkarmanız gerekir. Ardından bebeğinizi kucağınıza alarak tartıya çıkmanız ve gördüğünüz değeri not etmeniz gerekir. Sonraki adım ise bebeğinizi kucağınızdan indirip tartıya tekrar çıktığınızda gördüğünüz değeri not almanızdır. Bebeğinizle birlikte gerçekleştirdiğiniz ölçüm değerinden tek başınıza gerçekleştirdiğiniz ölçüm değerini çıkardığınızda bebeğinizin ağırlığını yaklaşık olarak tespit etmiş olursunuz.
                                            Bebeklerin boyu hastane ortamında özel cetveller yardımıyla ölçülür. Evde ölçüm yapmak için ise basit bir mezura kullanabilirsiniz. Bu noktada bebeğinizi tamamen uzanmış şekilde sabit tutması için bir başkasının yardımına ihtiyaç duyabilirsiniz. Mezuranın başlangıç noktasını bebeğinizin başına gelecek şekilde tutup ayak parmaklarına kadar esneterek bebeğinizin boyunu tespit edebilirsiniz. Bu noktada bebeğin düz bir zeminde, düz uzanmış şekilde yatması sağlıklı bir ölçüm yapılabilmesi açısından elzemdir.
                                            Baş çevresi ölçümü de en sağlıklı şekilde hastane ortamında yapılabilir ancak esnek bir mezura yardımıyla evde ölçüm yapmak da ihtiyaç duyulan verileri sağlayacaktır. Mezurayı bebeğinizin başının en geniş yerine, yani kulakların ve kaşların hemen üzerine yerleştirerek baş çevresi ölçümü yapabilirsiniz. Bu noktada ölçümü birkaç kez tekrarlamanız, alacağınız değerin güvenilirliği açısından önemlidir."
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Bebeklerde Ölçüm Sıklığı Nasıl Olmalıdır?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Bebeklerde gelişim takibi için yapılması gereken ölçümlerin sıklığı da merak edilen konular arasında yer alır. En doğru takip için ilk 1 ay boyunca her hafta ölçüm yapmanız önerilir. Sonraki altı aylık süreçte her ay bir kez ölçüm yapılması gelişim takibi için idealdir. Bir yaşına ilerlerken her ay ölçüm yapmaya devam edilebileceği gibi iki ayda bir ölçüm yapmak da gelişim takibi için yeterli olur."
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Persentil Nedir?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Persentil bebeklerin kilo, boy ve baş çevresi değerlerinin onlarla yaşıt bebeklerdeki ortalama ve ideal değerlere göre nasıl ilerlediğini takip etmeye yarayan eğrilerdir. Persentil eğrileri aynı zamanda \“büyüme eğrileri\” adıyla da bilinir. Bebeğinizin gelişim geriliği gösterip göstermediğini, ideal gelişim sürecinin hangi evresinde olduğunu tespit etmek için persentil eğrilerinden faydalanabilirsiniz."
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Persentil Nasıl Hesaplanır?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Persentil değerleri farklı dönemlerde bebeklerin ortalama ve ideal kilo, boy ve baş çevresi ölçüleri baz alınarak oluşturulan tablolardır. Kız ve erkek bebekler için farklı değerlerle oluşturulan bu tablolarda gelişim takibi için yüzdelik değerler kullanılır. Bu bağlamda bebeğinizin fiziksel verileri %3 ile %97 arasında bulunuyorsa gelişimsel açıdan bir problem olmadığına kanaat getirilebilir.
                                            Persentil yüzdelerinin temsil ettiği değerler aşağıdaki gibi sıralanabilir:
                                            %0 ve %10 arası en düşük değerdir. Bebeğinizin persentil değerinin bu aralıkta olması, yaşıt bebeklerin gelişimine kıyasla oldukça geride olduğunu gösterir. Bu durumda derhal bir doktora danışılması ve bu durumun sebebinin tespit edilmesi gerekir.
                                            %10 ve %25 arası düşük değerdir. Bebeğinizin persentil değeri bu aralıktaysa doktor kontrolü altında olması gerekir. Aksi halde gelişim geriliği görülebilir.
                                            %25 ve %75 arası normal değerdir. Bebeğinizin persentil değeri bu aralıktaysa bu durum bebeğinizin aynı yaş ve cinsiyetteki bebeklerle dengeli gelişim gösterdiği anlamına gelir. Bu durumda 3 ayda bir yeniden ölçüm yapılması ve persentil değerinin takip edilmesi yeterli olacaktır.
                                            %75 ve %90 arası yüksek değerdir. Bu durumda bebeğiniz aynı yaş ve cinsiyetteki diğer bebeklere kıyasla daha kilolu ve daha uzun boyludur. Aynı zamanda bebeğinizin baş çevresi de diğer bebeklere kıyasla daha büyüktür. Bu durumda doktor kontrolünde ideal değerlere ulaşmak için bir program belirlenmesi gerekir.
                                            %90 ve %100 arası en yüksek değerdir. Bu durumda bebeğiniz aynı yaş ve cinsiyetteki diğer bebeklerle kıyaslandığında fazla gelişim göstermektedir. Bu noktada bebeğinizde hormonal bozukluklar, genetik bazı hastalıklar ya da anomaliler, obezite gibi sağlık sorunları bulunabilir. Bebeğinizin persentil değerinin bu aralıkta bulunması durumunda düzenli doktor kontrolleriyle sorunun kaynağı bulunmalı ve tedaviye başlanmalıdır."
                                                }
                                                },
                                                {
                                                "@type": "Question",
                                                "name": "Bebeğimlehayat Bebek Gelişim Tablosu İle Bebeğinizin Gelişimini Nasıl Takip Edebilirsiniz?",
                                                "acceptedAnswer": {
                                                    "@type": "Answer",
                                                    "text": "Bebeklerin sağlıklı ve ideal gelişim gösterebilmesi için çeşitli reflekslerin ve becerilerin gelişimi takip edilebilir. Bununla birlikte gelişim özelliklerine dair en net veriler arasında kilo, boy ve baş çevresi değerleri de yer alır. Bebeğinizin ölçümlerini gerçekleştirdikten sonra Bebeğimlehayat bebek gelişim hesaplama aracı sayesinde pratik şekilde gelişim takibi gerçekleştirebilirsiniz!"
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
import { FormPlugin, FormInputPlugin, InputGroupPlugin, FormDatepickerPlugin, FormGroupPlugin, FormRadioPlugin, SpinnerPlugin, TabsPlugin } from 'bootstrap-vue'
Vue.use(FormPlugin);
Vue.use(FormInputPlugin);
Vue.use(InputGroupPlugin);
Vue.use(FormDatepickerPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormRadioPlugin);
Vue.use(SpinnerPlugin);
Vue.use(TabsPlugin);

export default {
    name: 'CocukGelisimiTablosu',
    head() {
        return {
            title: "Çocuk Gelişimi Tablosu - BebeğimleHayat ",
            meta: [
                { hid: 'keywords', name: 'keywords', content: 'bebegimlehayat,çocuk,gelisimi,tablosu' },
                { hid: 'description', name: 'description', content: "Çocuk gelişimi tablosu kilo ve boy gibi çeşitli verileri içeren bir gelişim takip uygulamasıdır. Bebeğimlehayat'ta pratik şekilde çocuk gelişim tablosuna erişebilirsiniz!" },
                { hid: 'og:title', property: 'og:title', content: "Çocuk gelişimi tablosu kilo ve boy gibi çeşitli verileri içeren bir gelişim takip uygulamasıdır. Bebeğimlehayat'ta pratik şekilde çocuk gelişim tablosuna erişebilirsiniz!" }
            ],
        }
    },
    data() {
        return {
            navigation: undefined,
            gender: 1,
            weight: null,
            height: null,
            measurementBirthday: new Date().toISOString(),
            birthday: new Date().toISOString(),

            weightPercentile: null,
            heightPercentile: null,

            weightError: false,
            heightError: false,
            measurementBirthdayError: false,
            birthdayError: false,

            childMonth: null,

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
        isNumber: function (evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },
        resetData() {
            this.result = false;
            this.gender = 1;
            this.weight = null;
            this.height = null;
            this.measurementBirthday = new Date().toISOString();
            this.birthday = new Date().toISOString();
        },
        calculate() {
            const _this = this;
            if (!_this.weight || _this.weight == 0) {
                this.$bvToast.toast("Çocuğunuzun kilosunu girmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                _this.weightError = true;
                return false;
            }
            else {
                _this.weightError = false;
            }

            if (!_this.height || _this.height == 0) {
                this.$bvToast.toast("Çocuğunuzun boyutunu girmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                _this.heightError = true;
                return false;
            }
            else {
                _this.heightError = false;
            }

            if (!_this.measurementBirthday) {
                this.$bvToast.toast("Ölçüm tarihinizi girmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                _this.measurementBirthdayError = true;
                return false;
            }
            else {
                _this.measurementBirthdayError = false;
            }

            if (!_this.birthday) {
                this.$bvToast.toast("Çocuğunuzun doğum tarihini girmelisiniz.", {
                    title: `Uyarı..`,
                    variant: 'warning',
                    autoHideDelay: 500,
                    solid: true
                });
                _this.birthdayError = true;
                return false;
            }
            else {
                _this.birthdayError = false;
            }
            _this.result = false;
            _this.isLoading = true;

            setTimeout(() => {
                // Erkek Çocuk Boy Oranları %3, %5, %25, %50, %75, %90, %97
                let erkekBoy = [{ "age": "1 Ay", "values": [{ "pers": "3", "cm": "45.9" }, { "pers": "10", "cm": "47.2" }, { "pers": "25", "cm": "48.5" }, { "pers": "50", "cm": "50.0" }, { "pers": "75", "cm": "51.5" }, { "pers": "90", "cm": "52.9" }, { "pers": "97", "cm": "54.2" }] }, { "age": "3 Ay", "values": [{ "pers": "3", "cm": "56.2" }, { "pers": "10", "cm": "57.8" }, { "pers": "25", "cm": "59.5" }, { "pers": "50", "cm": "61.3" }, { "pers": "75", "cm": "63.2" }, { "pers": "90", "cm": "64.8" }, { "pers": "97", "cm": "66.4" }] }, { "age": "6 Ay", "values": [{ "pers": "3", "cm": "62.8" }, { "pers": "10", "cm": "64.5" }, { "pers": "25", "cm": "66.2" }, { "pers": "50", "cm": "68.8" }, { "pers": "75", "cm": "69.9" }, { "pers": "90", "cm": "71.6" }, { "pers": "97", "cm": "73.2" }] }, { "age": "9 Ay", "values": [{ "pers": "3", "cm": "67.4" }, { "pers": "10", "cm": "69.1" }, { "pers": "25", "cm": "70.9" }, { "pers": "50", "cm": "72.8" }, { "pers": "75", "cm": "74.7" }, { "pers": "90", "cm": "76.4" }, { "pers": "97", "cm": "78.1" }] }, { "age": "12 Ay", "values": [{ "pers": "3", "cm": "70.8" }, { "pers": "10", "cm": "72.7" }, { "pers": "25", "cm": "74.7" }, { "pers": "50", "cm": "76.9" }, { "pers": "75", "cm": "79.1" }, { "pers": "90", "cm": "81.1" }, { "pers": "97", "cm": "83.0" }] }, { "age": "15 Ay", "values": [{ "pers": "3", "cm": "83.8" }, { "pers": "10", "cm": "75.8" }, { "pers": "25", "cm": "77.9" }, { "pers": "50", "cm": "80.2" }, { "pers": "75", "cm": "82.5" }, { "pers": "90", "cm": "84.5" }, { "pers": "97", "cm": "86.6" }] }, { "age": "18 Ay", "values": [{ "pers": "3", "cm": "76.4" }, { "pers": "10", "cm": "78.5" }, { "pers": "25", "cm": "80.7" }, { "pers": "50", "cm": "83.1" }, { "pers": "75", "cm": "85.5" }, { "pers": "90", "cm": "87.7" }, { "pers": "97", "cm": "89.8" }] }, { "age": "24 Ay", "values": [{ "pers": "3", "cm": "81.0" }, { "pers": "10", "cm": "83.3" }, { "pers": "25", "cm": "85.6" }, { "pers": "50", "cm": "88.2" }, { "pers": "75", "cm": "90.8" }, { "pers": "90", "cm": "93.2" }, { "pers": "97", "cm": "95.5" }] }, { "age": "30 Ay", "values": [{ "pers": "3", "cm": "85.3" }, { "pers": "10", "cm": "87.6" }, { "pers": "25", "cm": "90.0" }, { "pers": "50", "cm": "92.6" }, { "pers": "75", "cm": "95.3" }, { "pers": "90", "cm": "97.6" }, { "pers": "97", "cm": "100.0" }] }, { "age": "36 Ay", "values": [{ "pers": "3", "cm": "89.3" }, { "pers": "10", "cm": "91.7" }, { "pers": "25", "cm": "94.1" }, { "pers": "50", "cm": "96.8" }, { "pers": "75", "cm": "99.4" }, { "pers": "90", "cm": "101.8" }, { "pers": "97", "cm": "104.2" }] }, { "age": "3.5 Yaş", "values": [{ "pers": "3", "cm": "92.8" }, { "pers": "10", "cm": "95.2" }, { "pers": "25", "cm": "97.7" }, { "pers": "50", "cm": "100.5" }, { "pers": "75", "cm": "103.2" }, { "pers": "90", "cm": "105.7" }, { "pers": "97", "cm": "108.2" }] }, { "age": "4 Yaş", "values": [{ "pers": "3", "cm": "96.0" }, { "pers": "10", "cm": "98.6" }, { "pers": "25", "cm": "101.1" }, { "pers": "50", "cm": "104.0" }, { "pers": "75", "cm": "106.9" }, { "pers": "90", "cm": "109.5" }, { "pers": "97", "cm": "112.0" }] }, { "age": "4.5 Yaş", "values": [{ "pers": "3", "cm": "99.0" }, { "pers": "10", "cm": "101.7" }, { "pers": "25", "cm": "104.3" }, { "pers": "50", "cm": "107.3" }, { "pers": "75", "cm": "110.3" }, { "pers": "90", "cm": "113.0" }, { "pers": "97", "cm": "115.6" }] }, { "age": "5 Yaş", "values": [{ "pers": "3", "cm": "101.8" }, { "pers": "10", "cm": "104.5" }, { "pers": "25", "cm": "107.3" }, { "pers": "50", "cm": "110.4" }, { "pers": "75", "cm": "113.5" }, { "pers": "90", "cm": "116.2" }, { "pers": "97", "cm": "119.0" }] }, { "age": "5.5 Yaş", "values": [{ "pers": "3", "cm": "104.5" }, { "pers": "10", "cm": "107.3" }, { "pers": "25", "cm": "110.1" }, { "pers": "50", "cm": "113.3" }, { "pers": "75", "cm": "116.4" }, { "pers": "90", "cm": "119.3" }, { "pers": "97", "cm": "122.1" }] }, { "age": "6 Yaş", "values": [{ "pers": "3", "cm": "107.1" }, { "pers": "10", "cm": "110.0" }, { "pers": "25", "cm": "112.9" }, { "pers": "50", "cm": "116.1" }, { "pers": "75", "cm": "119.3" }, { "pers": "90", "cm": "122.2" }, { "pers": "97", "cm": "125.1" }] }]

                // Erkek Çocuk Kilo Oranları %3, %5, %25, %50, %75, %90, %97

                let erkekKilo = [{ "age": "1 Ay", "values": [{ "pers": "3", "kg": "2.58" }, { "pers": "10", "kg": "2.85" }, { "pers": "25", "kg": "3.13" }, { "pers": "50", "kg": "3.43" }, { "pers": "75", "kg": "3.73" }, { "pers": "90", "kg": "4.00" }, { "pers": "97", "kg": "4.27" }] }, { "age": "3 Ay", "values": [{ "pers": "3", "kg": "4.75" }, { "pers": "10", "kg": "5.26" }, { "pers": "25", "kg": "5.79" }, { "pers": "50", "kg": "6.38" }, { "pers": "75", "kg": "6.99" }, { "pers": "90", "kg": "7.54" }, { "pers": "97", "kg": "8.10" }] }, { "age": "6 Ay", "values": [{ "pers": "3", "kg": "6.21" }, { "pers": "10", "kg": "6.79" }, { "pers": "25", "kg": "7.41" }, { "pers": "50", "kg": "8.12" }, { "pers": "75", "kg": "8.85" }, { "pers": "90", "kg": "9.54" }, { "pers": "97", "kg": "10.25" }] }, { "age": "9 Ay", "values": [{ "pers": "3", "kg": "7.27" }, { "pers": "10", "kg": "7.87" }, { "pers": "25", "kg": "8.51" }, { "pers": "50", "kg": "9.26" }, { "pers": "75", "kg": "10.06" }, { "pers": "90", "kg": "10.81" }, { "pers": "97", "kg": "11.58" }] }, { "age": "12 Ay", "values": [{ "pers": "3", "kg": "7.96" }, { "pers": "10", "kg": "8.61" }, { "pers": "25", "kg": "9.32" }, { "pers": "50", "kg": "10.16" }, { "pers": "75", "kg": "11.05" }, { "pers": "90", "kg": "11.92" }, { "pers": "97", "kg": "12.82" }] }, { "age": "15 Ay", "values": [{ "pers": "3", "kg": "8.61" }, { "pers": "10", "kg": "9.28" }, { "pers": "25", "kg": "10.01" }, { "pers": "50", "kg": "10.89" }, { "pers": "75", "kg": "11.83" }, { "pers": "90", "kg": "12.75" }, { "pers": "97", "kg": "13.72" }] }, { "age": "18 Ay", "values": [{ "pers": "3", "kg": "9.13" }, { "pers": "10", "kg": "9.82" }, { "pers": "25", "kg": "10.58" }, { "pers": "50", "kg": "11.49" }, { "pers": "75", "kg": "12.48." }, { "pers": "90", "kg": "13.46" }, { "pers": "97", "kg": "14.49" }] }, { "age": "24 Ay", "values": [{ "pers": "3", "kg": "10.12" }, { "pers": "10", "kg": "10.85" }, { "pers": "25", "kg": "11.66" }, { "pers": "50", "kg": "12.66" }, { "pers": "75", "kg": "13.76" }, { "pers": "90", "kg": "14.86" }, { "pers": "97", "kg": "16.05" }] }, { "age": "30 Ay", "values": [{ "pers": "3", "kg": "11.06" }, { "pers": "10", "kg": "11.84" }, { "pers": "25", "kg": "12.71" }, { "pers": "50", "kg": "13.80" }, { "pers": "75", "kg": "15.04" }, { "pers": "90", "kg": "16.29" }, { "pers": "97", "kg": "17.69" }] }, { "age": "36 Ay", "values": [{ "pers": "3", "kg": "11.81" }, { "pers": "10", "kg": "12.65" }, { "pers": "25", "kg": "13.61" }, { "pers": "50", "kg": "14.83" }, { "pers": "75", "kg": "16.24" }, { "pers": "90", "kg": "17.71" }, { "pers": "97", "kg": "19.39" }] }, { "age": "3.5 Yaş", "values": [{ "pers": "3", "kg": "12.6" }, { "pers": "10", "kg": "13.5" }, { "pers": "25", "kg": "14.6" }, { "pers": "50", "kg": "15.9" }, { "pers": "75", "kg": "17.4" }, { "pers": "90", "kg": "18.9" }, { "pers": "97", "kg": "20.6" }] }, { "age": "4 Yaş", "values": [{ "pers": "3", "kg": "13.3" }, { "pers": "10", "kg": "14.3" }, { "pers": "25", "kg": "15.4" }, { "pers": "50", "kg": "16.8" }, { "pers": "75", "kg": "18.5" }, { "pers": "90", "kg": "20.1" }, { "pers": "97", "kg": "22.0" }] }, { "age": "4.5 Yaş", "values": [{ "pers": "3", "kg": "14.0" }, { "pers": "10", "kg": "15.0" }, { "pers": "25", "kg": "16.2" }, { "pers": "50", "kg": "17.7" }, { "pers": "75", "kg": "19.5" }, { "pers": "90", "kg": "21.3" }, { "pers": "97", "kg": "23.3" }] }, { "age": "5 Yaş", "values": [{ "pers": "3", "kg": "14.7" }, { "pers": "10", "kg": "15.8" }, { "pers": "25", "kg": "17.0" }, { "pers": "50", "kg": "18.6" }, { "pers": "75", "kg": "20.5" }, { "pers": "90", "kg": "22.4" }, { "pers": "97", "kg": "24.6" }] }, { "age": "5.5 Yaş", "values": [{ "pers": "3", "kg": "15.4" }, { "pers": "10", "kg": "16.5" }, { "pers": "25", "kg": "17.9" }, { "pers": "50", "kg": "19.6" }, { "pers": "75", "kg": "21.6" }, { "pers": "90", "kg": "23.6" }, { "pers": "97", "kg": "26.0" }] }, { "age": "6 Yaş", "values": [{ "pers": "3", "kg": "16.2" }, { "pers": "10", "kg": "17.4" }, { "pers": "25", "kg": "18.9" }, { "pers": "50", "kg": "20.7" }, { "pers": "75", "kg": "22.8" }, { "pers": "90", "kg": "25.1" }, { "pers": "97", "kg": "27.7" }] }];

                // Kiz Çocuk Boy Oranları %3, %5, %25, %50, %75, %90, %97
                let kizBoy = [
                    { "age": "1 Ay", "values": [{ "pers": "3", "cm": "45.3" }, { "pers": "10", "cm": "46.6" }, { "pers": "25", "cm": "47.9" }, { "pers": "50", "cm": "49.4" }, { "pers": "75", "cm": "50.8" }, { "pers": "90", "cm": "52.1" }, { "pers": "97", "cm": "53.4" }] },
                    { "age": "3 Ay", "values": [{ "pers": "3", "cm": "55.3" }, { "pers": "10", "cm": "56.8" }, { "pers": "25", "cm": "58.2" }, { "pers": "50", "cm": "59.9" }, { "pers": "75", "cm": "61.5" }, { "pers": "90", "cm": "63.0" }, { "pers": "97", "cm": "64.5" }] },
                    { "age": "6 Ay", "values": [{ "pers": "3", "cm": "61.6" }, { "pers": "10", "cm": "63.1" }, { "pers": "25", "cm": "64.7" }, { "pers": "50", "cm": "66.4" }, { "pers": "75", "cm": "68.2" }, { "pers": "90", "cm": "69.7" }, { "pers": "97", "cm": "71.3" }] },
                    { "age": "9 Ay", "values": [{ "pers": "3", "cm": "66.0" }, { "pers": "10", "cm": "67.7" }, { "pers": "25", "cm": "69.3" }, { "pers": "50", "cm": "71.2" }, { "pers": "75", "cm": "73.0" }, { "pers": "90", "cm": "74.6" }, { "pers": "97", "cm": "76.3" }] },
                    { "age": "12 Ay", "values": [{ "pers": "3", "cm": "69.7" }, { "pers": "10", "cm": "71.4" }, { "pers": "25", "cm": "73.2" }, { "pers": "50", "cm": "75.1" }, { "pers": "75", "cm": "77.1" }, { "pers": "90", "cm": "78.8" }, { "pers": "97", "cm": "80.5" }] },
                    { "age": "15 Ay", "values": [{ "pers": "3", "cm": "72.8" }, { "pers": "10", "cm": "74.6" }, { "pers": "25", "cm": "76.5" }, { "pers": "50", "cm": "78.5" }, { "pers": "75", "cm": "80.6" }, { "pers": "90", "cm": "82.4" }, { "pers": "97", "cm": "84.2" }] },
                    { "age": "18 Ay", "values": [{ "pers": "3", "cm": "75.5" }, { "pers": "10", "cm": "77.4" }, { "pers": "25", "cm": "79.3" }, { "pers": "50", "cm": "81.5" }, { "pers": "75", "cm": "83.7" }, { "pers": "90", "cm": "85.6" }, { "pers": "97", "cm": "87.6" }] },
                    { "age": "24 Ay", "values": [{ "pers": "3", "cm": "80.1" }, { "pers": "10", "cm": "82.3" }, { "pers": "25", "cm": "84.4" }, { "pers": "50", "cm": "86.8" }, { "pers": "75", "cm": "89.2" }, { "pers": "90", "cm": "91.4" }, { "pers": "97", "cm": "93.5" }] },
                    { "age": "30 Ay", "values": [{ "pers": "3", "cm": "84.0" }, { "pers": "10", "cm": "86.3" }, { "pers": "25", "cm": "88.6" }, { "pers": "50", "cm": "91.2" }, { "pers": "75", "cm": "93.8" }, { "pers": "90", "cm": "96.1" }, { "pers": "97", "cm": "98.4" }] },
                    { "age": "36 Ay", "values": [{ "pers": "3", "cm": "87.8" }, { "pers": "10", "cm": "90.2" }, { "pers": "25", "cm": "92.7" }, { "pers": "50", "cm": "95.4" }, { "pers": "75", "cm": "98.1" }, { "pers": "90", "cm": "100.6" }, { "pers": "97", "cm": "103.0" }] },
                    { "age": "3.5 Yaş", "values": [{ "pers": "3", "cm": "91.1" }, { "pers": "10", "cm": "93.6" }, { "pers": "25", "cm": "92.2" }, { "pers": "50", "cm": "99.0" }, { "pers": "75", "cm": "101.9" }, { "pers": "90", "cm": "104.5" }, { "pers": "97", "cm": "107.0" }] },
                    { "age": "4 Yaş", "values": [{ "pers": "3", "cm": "94.3" }, { "pers": "10", "cm": "96.9" }, { "pers": "25", "cm": "99.6" }, { "pers": "50", "cm": "102.5" }, { "pers": "75", "cm": "105.5" }, { "pers": "90", "cm": "108.1" }, { "pers": "97", "cm": "110.7" }] },
                    { "age": "4.5 Yaş", "values": [{ "pers": "3", "cm": "97.4" }, { "pers": "10", "cm": "100.1" }, { "pers": "25", "cm": "102.8" }, { "pers": "50", "cm": "105.9" }, { "pers": "75", "cm": "108.9" }, { "pers": "90", "cm": "111.6" }, { "pers": "97", "cm": "114.3" }] },
                    { "age": "5 Yaş", "values": [{ "pers": "3", "cm": "100.4" }, { "pers": "10", "cm": "103.2" }, { "pers": "25", "cm": "105.9" }, { "pers": "50", "cm": "109.1" }, { "pers": "75", "cm": "112.2" }, { "pers": "90", "cm": "114.9" }, { "pers": "97", "cm": "117.7" }] },
                    { "age": "5.5 Yaş", "values": [{ "pers": "3", "cm": "103.6" }, { "pers": "10", "cm": "106.3" }, { "pers": "25", "cm": "109.0" }, { "pers": "50", "cm": "112.1" }, { "pers": "75", "cm": "115.3" }, { "pers": "90", "cm": "118.3" }, { "pers": "97", "cm": "121.2" }] },
                    { "age": "6 Yaş", "values": [{ "pers": "3", "cm": "106.2" }, { "pers": "10", "cm": "109.0" }, { "pers": "25", "cm": "111.9" }, { "pers": "50", "cm": "115.1" }, { "pers": "75", "cm": "118.4" }, { "pers": "90", "cm": "121.3" }, { "pers": "97", "cm": "124.1" }] }]

                // Kiz Çocuk Kilo Oranları %3, %5, %25, %50, %75, %90, %97
                let kizKilo = [{ "age": "1 Ay", "values": [{ "pers": "3", "kg": "2.52" }, { "pers": "10", "kg": "2.76" }, { "pers": "25", "kg": "3.01" }, { "pers": "50", "kg": "3.29" }, { "pers": "75", "kg": "3.58" }, { "pers": "90", "kg": "3.84" }, { "pers": "97", "kg": "4.10" }] }, { "age": "3 Ay", "values": [{ "pers": "3", "kg": "4.48" }, { "pers": "10", "kg": "4.90" }, { "pers": "25", "kg": "5.33" }, { "pers": "50", "kg": "5,82" }, { "pers": "75", "kg": "6.32" }, { "pers": "90", "kg": "6.78" }, { "pers": "97", "kg": "7.24" }] }, { "age": "6 Ay", "values": [{ "pers": "3", "kg": "5.94" }, { "pers": "10", "kg": "6.38" }, { "pers": "25", "kg": "6.85" }, { "pers": "50", "kg": "7.43" }, { "pers": "75", "kg": "8.06" }, { "pers": "90", "kg": "8.68" }, { "pers": "97", "kg": "9.34" }] }, { "age": "9 Ay", "values": [{ "pers": "3", "kg": "6.85" }, { "pers": "10", "kg": "7.34" }, { "pers": "25", "kg": "7.89" }, { "pers": "50", "kg": "8.55" }, { "pers": "75", "kg": "9.29" }, { "pers": "90", "kg": "10.02" }, { "pers": "97", "kg": "10.82" }] }, { "age": "12 Ay", "values": [{ "pers": "3", "kg": "7.52" }, { "pers": "10", "kg": "8.06" }, { "pers": "25", "kg": "8.66" }, { "pers": "50", "kg": "9.39" }, { "pers": "75", "kg": "10.20" }, { "pers": "90", "kg": "11.00" }, { "pers": "97", "kg": "11.87" }] }, { "age": "15 Ay", "values": [{ "pers": "3", "kg": "8.09" }, { "pers": "10", "kg": "8.67" }, { "pers": "25", "kg": "9.31" }, { "pers": "50", "kg": "10.10" }, { "pers": "75", "kg": "10.96" }, { "pers": "90", "kg": "11.81" }, { "pers": "97", "kg": "12.73" }] }, { "age": "18 Ay", "values": [{ "pers": "3", "kg": "8.57" }, { "pers": "10", "kg": "9.19" }, { "pers": "25", "kg": "9.87" }, { "pers": "50", "kg": "10.71" }, { "pers": "75", "kg": "11.63" }, { "pers": "90", "kg": "12.55" }, { "pers": "97", "kg": "13.54" }] }, { "age": "24 Ay", "values": [{ "pers": "3", "kg": "9.49" }, { "pers": "10", "kg": "10.20" }, { "pers": "25", "kg": "10.99" }, { "pers": "50", "kg": "11.94" }, { "pers": "75", "kg": "12.99" }, { "pers": "90", "kg": "14.03" }, { "pers": "97", "kg": "15.15" }] }, { "age": "30 Ay", "values": [{ "pers": "3", "kg": "10.35" }, { "pers": "10", "kg": "11.17" }, { "pers": "25", "kg": "12.06" }, { "pers": "50", "kg": "13.12" }, { "pers": "75", "kg": "14.25" }, { "pers": "90", "kg": "15.33" }, { "pers": "97", "kg": "16.47" }] }, { "age": "36 Ay", "values": [{ "pers": "3", "kg": "11.19" }, { "pers": "10", "kg": "12.09" }, { "pers": "25", "kg": "13.05" }, { "pers": "50", "kg": "14.18" }, { "pers": "75", "kg": "15.37" }, { "pers": "90", "kg": "16.51" }, { "pers": "97", "kg": "17.68" }] }, { "age": "3.5 Yaş", "values": [{ "pers": "3", "kg": "11.9" }, { "pers": "10", "kg": "12.8" }, { "pers": "25", "kg": "13.9" }, { "pers": "50", "kg": "15.1" }, { "pers": "75", "kg": "16.5" }, { "pers": "90", "kg": "17.8" }, { "pers": "97", "kg": "19.3" }] }, { "age": "4 Yaş", "values": [{ "pers": "3", "kg": "12.7" }, { "pers": "10", "kg": "13.7" }, { "pers": "25", "kg": "14.8" }, { "pers": "50", "kg": "16.1" }, { "pers": "75", "kg": "17.7" }, { "pers": "90", "kg": "19.2" }, { "pers": "97", "kg": "20.8" }] }, { "age": "4.5 Yaş", "values": [{ "pers": "3", "kg": "13.5" }, { "pers": "10", "kg": "14.5" }, { "pers": "25", "kg": "15.8" }, { "pers": "50", "kg": "17.3" }, { "pers": "75", "kg": "19.0" }, { "pers": "90", "kg": "20.7" }, { "pers": "97", "kg": "22.5" }] }, { "age": "5 Yaş", "values": [{ "pers": "3", "kg": "14.2" }, { "pers": "10", "kg": "15.4" }, { "pers": "25", "kg": "16.7" }, { "pers": "50", "kg": "18.4" }, { "pers": "75", "kg": "20.3" }, { "pers": "90", "kg": "22.2" }, { "pers": "97", "kg": "24.3" }] }, { "age": "5.5 Yaş", "values": [{ "pers": "3", "kg": "14.9" }, { "pers": "10", "kg": "16.2" }, { "pers": "25", "kg": "17.7" }, { "pers": "50", "kg": "19.5" }, { "pers": "75", "kg": "21.6" }, { "pers": "90", "kg": "23.7" }, { "pers": "97", "kg": "26.1" }] }, { "age": "6 Yaş", "values": [{ "pers": "3", "kg": "15.7" }, { "pers": "10", "kg": "17.0" }, { "pers": "25", "kg": "18.6" }, { "pers": "50", "kg": "20.6" }, { "pers": "75", "kg": "22.9" }, { "pers": "90", "kg": "25.3" }, { "pers": "97", "kg": "27.9" }] }]

                const monthDiff = new Date(_this.measurementBirthday).getMonth() - new Date(_this.birthday).getMonth();
                const yearDiff = new Date(_this.measurementBirthday).getYear() - new Date(_this.birthday).getYear();

                let differenceMonth = monthDiff + yearDiff * 12;
                _this.childMonth = null;
                switch (true) {
                    case (differenceMonth <= 1.5):
                        _this.childMonth = '1 Ay';
                        break;
                    case (differenceMonth > 1.5 && differenceMonth <= 4.5):
                        _this.childMonth = '3 Ay';
                        break;
                    case (differenceMonth > 4.5 && differenceMonth <= 7.5):
                        _this.childMonth = '6 Ay';
                        break;
                    case (differenceMonth > 7.5 && differenceMonth <= 10.5):
                        _this.childMonth = '9 Ay';
                        break;
                    case (differenceMonth > 10.5 && differenceMonth <= 13.5):
                        _this.childMonth = '12 Ay';
                        break;
                    case (differenceMonth > 13.5 && differenceMonth <= 16.5):
                        _this.childMonth = '15 Ay';
                        break;
                    case (differenceMonth > 16.5 && differenceMonth <= 21):
                        _this.childMonth = '18 Ay';
                        break;
                    case (differenceMonth > 21 && differenceMonth <= 27):
                        _this.childMonth = '24 Ay';
                        break;
                    case (differenceMonth > 27 && differenceMonth <= 33):
                        _this.childMonth = '30 Ay';
                        break;
                    case (differenceMonth > 33 && differenceMonth <= 39):
                        _this.childMonth = '36 Ay';
                        break;
                    case (differenceMonth > 39 && differenceMonth <= 45):
                        _this.childMonth = '3.5 Yaş';
                        break;
                    case (differenceMonth > 45 && differenceMonth <= 51):
                        _this.childMonth = '4 Yaş';
                        break;
                    case (differenceMonth > 51 && differenceMonth <= 57):
                        _this.childMonth = '4.5 Yaş';
                        break;
                    case (differenceMonth > 57 && differenceMonth <= 63):
                        _this.childMonth = '5 Yaş';
                        break;
                    case (differenceMonth > 63 && differenceMonth <= 69):
                        _this.childMonth = '5.5 Yaş';
                        break;
                    case (differenceMonth > 69 && differenceMonth <= 75):
                        _this.childMonth = '6 Yaş';
                        break;

                }
                if (_this.childMonth != null) {
                    if (_this.gender == 0) {
                        erkekKilo.find(x => x.age == _this.childMonth)?.values?.forEach((value, index, array) => {
                            if (parseFloat(_this.weight) < parseFloat(array[0].kg)) {
                                _this.weightPercentile = 0;
                                return false;
                            }

                            if (parseFloat(_this.weight) > parseFloat(array[array.length - 1].kg)) {
                                _this.weightPercentile = 100;
                                return false;
                            }

                            if (parseFloat(_this.weight) >= parseFloat(value.kg) && parseFloat(_this.weight) <= parseFloat(array[index + 1].kg)) {
                                _this.weightPercentile = parseFloat(value.pers);
                                return false;
                            }

                        })

                        erkekBoy.find(x => x.age == _this.childMonth)?.values?.forEach((value, index, array) => {
                            if (parseFloat(_this.height) < parseFloat(array[0].cm)) {
                                _this.heightPercentile = 0;
                                return false;
                            }

                            if (parseFloat(_this.height) > parseFloat(array[array.length - 1].cm)) {
                                _this.heightPercentile = 100;
                                return false;
                            }

                            if (parseFloat(_this.height) >= parseFloat(value.cm) && parseFloat(_this.height) <= parseFloat(array[index + 1].cm)) {
                                _this.heightPercentile = parseFloat(value.pers);
                                return false;
                            }

                        })
                    }

                    if (_this.gender == 1) {
                        kizKilo.find(x => x.age == _this.childMonth)?.values?.forEach((value, index, array) => {
                            if (parseFloat(_this.weight) < parseFloat(array[0].kg)) {
                                _this.weightPercentile = 0;
                                return false;
                            }

                            if (parseFloat(_this.weight) > parseFloat(array[array.length - 1].kg)) {
                                _this.weightPercentile = 100;
                                return false;
                            }

                            if (parseFloat(_this.weight) >= parseFloat(value.kg) && parseFloat(_this.weight) <= parseFloat(array[index + 1].kg)) {
                                _this.weightPercentile = parseFloat(value.pers);
                                return false;
                            }

                        })

                        kizBoy.find(x => x.age == _this.childMonth)?.values?.forEach((value, index, array) => {
                            if (parseFloat(_this.height) < parseFloat(array[0].cm)) {
                                _this.heightPercentile = 0;
                                return false;
                            }

                            if (parseFloat(_this.height) > parseFloat(array[array.length - 1].cm)) {
                                _this.heightPercentile = 100;
                                return false;
                            }

                            if (parseFloat(_this.height) >= parseFloat(value.cm) && parseFloat(_this.height) <= parseFloat(array[index + 1].cm)) {
                                _this.heightPercentile = parseFloat(value.pers);
                                return false;
                            }

                        })
                    }

                }

                _this.result = true;
                _this.isLoading = false;
            }, 2000)
        }
    },
    async created() {
        this.navigation = [
            {
                "name": "Çocuk Gelişimi Tablosu",
                "url": "/cocuk-gelisimi-tablosu"
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

.height-content {
    border-right: 4px solid rgb(185, 67, 52);
}

.weigth-content {
    border-right: 4px solid rgb(1, 97, 116);
}

#cocukGelisimiForm {
    background-color: rgb(235, 247, 250);
    padding: 3em;
    border-top: 11px solid rgb(216, 240, 245);
}

#cocukGelisimiContent h2 {
    font-size: 20px;
}

#cocukGelisimiContent p {
    font-size: 15px;
}

#cocukGelisimiForm.no-result:after {
    content: '';
    position: absolute;
    top: -30px;
    left: calc(50% - 25px);
    height: 50px;
    width: 50px;
    background: url(https://api.bebegimlehayat.com/Data/image/extra_small/cocuk_gelisimi_tablosu-1684180646597.jpeg) no-repeat left bottom;
    background-size: 100%;
}

#cocukGelisimiForm.result:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 164px;
    width: 290px;
    background: url(/Data/bg_toolResult_lLeaf.svg) no-repeat left bottom;
    background-size: 100%;
}

#cocukGelisimiForm.result:before {
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

#cocukGelisimiForm #result .man {
    color: #58adbe;
}

#cocukGelisimiForm #result .women {
    color: #ffc0cb;
}

.start-over {
    z-index: 2;
    position: relative;
}

#cocukGelisimiForm .start-over:hover {
    text-decoration: underline;
}

.vs__dropdown-toggle {
    padding: .6em !important;
    border: 0 !important;
}

.vs__search {
    font-size: 18px;
}

@media screen and (max-width: 768px) {
    #cocukGelisimiForm {
        padding: 1em;
    }

    #cocukGelisimiForm label,
    #cocukGelisimiForm input {
        font-size: 16px;
    }
}</style>
