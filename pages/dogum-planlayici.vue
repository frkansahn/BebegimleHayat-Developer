<template>
    <div class="container">
        <Navigation :nav="navigation" v-if="navigation" />
        <div class="row my-5">
            <div class="col-12 col-lg-8">
                <div class="row">
                    <div class="col-12 mb-5">
                        <h1 class="font-weight-normal">
                            Doğum Planlayıcı
                        </h1>
                    </div>
                    <div class="col-12">
                        <div class="col-12 no-result" id="dogumPlanlayiciForm">
                            <form class="row">
                                <div class="col-12">
                                    <h2>
                                        Doğum Planlayıcısı
                                    </h2>
                                    <br>
                                    <p>
                                        Doğum planlayıcısı doğum ve sonrasında neler istediğinizi belirten bir belgedir. Bu
                                        belge ile beklentilerinizi ve isteklerini önceden belirleyerek doğuma hazırlıklı
                                        olabilirsiniz. Elbette ki bu planların %100 kesin olmayacağını unutmayın. Doğum
                                        sırasında bebeğinizin güvenliği ve sağlığı için farklı kararlar alınabilir. Bu
                                        yüzden bu listeyi hazırlarken esneklik bir numaralı önceliğimiz olmalıdır.
                                    </p>
                                    <br>
                                    <br>
                                    <h2>
                                        Doğum Planlayıcısı Nedir?
                                    </h2>
                                    <br>
                                    <p>
                                        Doğum planlayıcısı belgesi genellikle 1 ya da 2 sayfadan oluşan ve doktorlarınıza
                                        doğumla ilgili beklentilerinizi not ettiğiniz bir dokümandır. İçerisinde doğum
                                        sancılarınızla baş etmeden, odanızdaki atmosfere kadar tüm istek ve beklentilerinizi
                                        yazabilirsiniz.
                                        Ancak doğumu her açıdan kontrol edemeyeceğinizi ve bazı yerlerde esneklik payı
                                        bırakmanız gerektiğini unutmamalısınız. Sağlıklı bir anne ve bebek en büyük
                                        önceliğiniz olmalıdır.
                                        Birçok hastane size daha iyi hizmet sunmak amacıyla doğum planı sağlamaktadır.
                                        Böylece size sunabilecekleri en iyi hizmeti sunmuş olurlar.
                                    </p>
                                    <br>
                                    <br>
                                    <h2>
                                        Doğum Planlayıcısına İhtiyacım Var mı?
                                    </h2>
                                    <br>
                                    <p>
                                        Doğum planlayıcılar şart değildir ancak elinizde bulunması oldukça yararlıdır.
                                        Spesifik ihtiyaçlarınız ve istekleriniz varsa bunları belirtmenizi mümkün kılar. Bu
                                        bilgilerin kayıt altında kalması aynı zamanda daha sonra yeniden sorulmasını
                                        engelleyebilir. Doktorunuz vakit kaybetmeden belirli prosedürleri uygulayabilir.
                                        Özellikle doğum anında veya sonrasında aşırı yorulduğunuz için dinlendiğiniz süreçte
                                        doktorunuz planlayıcınıza göre hareket edecektir.
                                    </p>
                                    <br>
                                    <br>

                                    <h2>Bebeğimle Hayat Doğum Planlayıcısını Keşfedin</h2>
                                    <br>
                                    <p>
                                        Eğer elinizde bir doğum planlayıcısı yoksa Bebeğimle Hayat Doğum Planlayıcısını
                                        deneyebilirsiniz. İhtiyacınız olacak seçenekler içinde yer almakla birlikte kolayca
                                        kullanılabilir haldedir.
                                    </p>
                                    <br>
                                    <p>
                                        <a href="/Data/dogum-planlayici.pdf" target="_blank" class="h5 font-weight-bold">
                                            Bebeğimle Hayat Doğum Planlayıcısını İndirmek İçin Tıklayınız
                                        </a>
                                    </p>
                                    <br>
                                    <br>
                                    <h2>Hamilelik Planlayıcısı Maddeleri</h2>
                                    <br>
                                    <p>
                                        Aşağıdaki listede planlayıcı içinde bulunan seçenekleri keşfedebilirsiniz. Bu
                                        seçeneklerin yaşadığınız yere göre uygulanma şeklinin değişebileceğini unutmayın. Bu
                                        yüzden belirli seçimleri yaparken araştırma yapmak isteyebilirsiniz.
                                    </p>
                                    <br>
                                    <br>

                                    <h2>Hamilelik Planlayıcı Listesi Seçenekleri: Doğum Maddeleri</h2>
                                    <br>
                                    <h2>Hamilelikle ilgili her kararı ben alacağım.</h2>
                                    <h2>Hamilelikle ilgili kararları partnerim veya refakatçim ile ortak alacağız.</h2>
                                    <br>
                                    <h2>Hamilelikle ilgili kararları partnerim veya refakatçim alacak.</h2>
                                    <br>
                                    <p>Bazen stresten dolayı karar almak çok zorlaşabilir. Bu durumlardan çekinceniz varsa
                                        karar sorumluluğunu güvendiğiniz bir insana verebilirsiniz.</p>
                                    <br>
                                    <br>

                                    <h2>Doğum sırasında yanımda Doula olacak.</h2>
                                    <br>
                                    <p>Doğum konusunda uzman olan Doulalar hem fiziksel hem de psikolojik destek
                                        sağlayabilir .Eğer Doulanız varsa kendisini ameliyata çağırabilir ve doktorlara bu
                                        şekilde haber verebilirsiniz.</p>
                                    <br>
                                    <br>

                                    <h2>Fotoğraf ve video çekilmesini istiyorum.</h2>
                                    <br>
                                    <p>Hastane kurallarına bağlı olarak eşiniz veya refakatçiniz doğumunuzu kayıt altına
                                        alabilir. Elbette bunun için önceden izin almalı ve kaydı alacak kişinin ve
                                        kameranın da steril olması şarttır. Tüm hastaneler buna izin vermiyor olabilir, bu
                                        yüzden önceden öğrenmeniz oldukça önemlidir.</p>
                                    <br>
                                    <br>

                                    <h2>Suyumun doğal yollarla gelmesini istiyorum.</h2>
                                    <br>

                                    <p>Eğer doğum ilerlemeniz durursa doktorlarınız çeşitli yöntemler önerebilirler.
                                        Bunlardan biri de eğer henüz suyunuz gelmediyse, amniyotik kesenin yırtılmasıdır.
                                        Amniyotik kesenin yırtılması vücuda kasılmalar getirir ve doğumun devam etmesini
                                        sağlayabilir. Ancak amniyotik kesenin yırtılması çeşitli hamilelik
                                        komplikasyonlarını da beraberinde getirebilir. Oluşabilecek riskler hakkında
                                        doktorunuzla konuşmanız en doğru cevaplara ulaşmanızı sağlayacaktır.</p>
                                    <br>
                                    <br>

                                    <h2>Ağrı kesici istemiyorum. Doğum sancısıyla doğal yöntemlerden faydalanarak başa
                                        çıkacağım.</h2>
                                    <br>
                                    <h2>Doğumun gidişatına göre ağrı kesici kullanmaya karar vereceğim.</h2>
                                    <br>
                                    <h2>Mümkün olan en kısa zamanda ağrı kesici veya epidural istiyorum.</h2>
                                    <br>
                                    <p>Ağrı kesici kullanımı hakkında isteğinizi bu seçeneklerle belirleyebilirsiniz. Ağrı
                                        yönetimi konusunda tüm hakimiyet sizin elinizde.</p>
                                    <br>
                                    <br>

                                    <h2>Aromaterapi ve bitkisel yağların kullanılmasını istiyorum.</h2>
                                    <br>
                                    <p>Hem kokusuyla hem de hissiyatıyla sizi rahatlatan yağların kullanımı doktorunuzdan
                                        rica edebilirsiniz. Böylece hamileliğiniz bir nebze olsa rahatlayabilir.</p>
                                    <br>
                                    <br>

                                    <h2>Işıkların aydınlık olmasını istiyorum.</h2>
                                    <br>
                                    <h2>Işıkların loş olmasını istiyorum.</h2>
                                    <br>
                                    <p>Işıkların size en uygun şekilde olması için doktorunuza istekte bulunabilirsiniz.</p>
                                    <br>
                                    <br>

                                    <h2>Oda sıcaklığının ….. olmasını istiyorum.</h2>
                                    <br>
                                    <p>Odanızın spesifik olarak soğuk ya da sıcak olmasını istiyorsanız veya aklınızda
                                        belirli bir derece varsa bu madde ile belirtebilirsiniz.</p>
                                    <br>
                                    <br>

                                    <h2>İstediğim zaman ıkınmak istiyorum.</h2>
                                    <br>
                                    <h2>Ikınma konusunda rehberlik istiyorum.</h2>
                                    <br>
                                    <p>Dilerseniz doktorunuz tarafından yönlendirilebilirsiniz ya da nasıl ıkınacağınızı ve
                                        nasıl enfes alacağınızı kendiniz yönetebilirsiniz. Eğer bu konu hakkında yeterince
                                        bilgi sahibi değilseniz doktor rehberliği sizin için yararlı olabilir. Aksi takdirde
                                        doğum uzayabilir ya da normalden daha sancılı olabilir.</p>


                                    <h2>Doğumda hangi pozisyonda olacağımı belirlemek istiyorum.</h2>
                                    <br>
                                    <p>Doğumda çömelme, yarı oturuş, yan yatma ve uzanma gibi çeşitli pozisyonların
                                        hangisinde olacağınızı seçmek isteyebilirsiniz. Ancak bilinçsiz şekilde seçilen
                                        pozisyonların size zarar getirebileceğini unutmayın.</p>
                                    <br>
                                    <br>

                                    <h2>Bebeğimin doğumunu ayna yardımıyla görmek istiyorum.</h2>
                                    <br>
                                    <h2>Sezaryen olursa ameliyatı görmek istiyorum.</h2>
                                    <br>
                                    <p>Bebeğinizin doğumunu görmek istiyorsanız bu seçenekler size göre. Ancak
                                        görecekleriniz sizi biraz şaşırtabilir. Doğum normal bir eylem olsa da her gün
                                        gördüğümüz bir şey değil. </p>
                                    <br>
                                    <br>

                                    <h2>Doğum sırasında sakinleştirici müzikler çalmasını istiyorum.</h2>
                                    <br>
                                    <p>Doğum sırasında müzik dinleme talebinde bulunabilirsiniz. Hastaneye bağlı olarak
                                        müziğinizi kendiniz açmanız veya hastaneye bir müzik listesi vermeniz gerekebilir.
                                    </p>
                                    <br>
                                    <br>

                                    <h2>Hamilelik Planlayıcı Listesi Seçenekleri: Doğum Sonrası Maddeleri</h2>
                                    <br>
                                    <br>

                                    <h2>Doğumdan sonra bebeğimi hemen kucağıma almak istiyorum.</h2>
                                    <br>
                                    <h2>Doğumdan sonra bebeğimin kurulanıp kucağıma verilmesini istiyorum.</h2>
                                    <br>
                                    <p>Bebeğinizle kurmak istediğiniz bağ konusunda böyle bir karar verebilirsiniz. Elbette
                                        doktorların bebek doğduktan sonra sağlığını kontrol etmesi gerekir. Ardından
                                        isterseniz ıslak bir şekilde kucağınıza alabilirsiniz.</p>
                                    <br>
                                    <br>


                                    <h2>Göbek bağının geç kesilmesini istiyorum.</h2>
                                    <br>
                                    <p>Doktorunuzdan göbek bağını birkaç dakika geç kesmesini isteyebilirsiniz. Araştırmalar
                                        bu birkaç dakika içerisinde bebeğin aldığı ekstra kan akışının anemi ve demir
                                        eksikliğini engellediğini göstermektedir. Doktorunuzla konuşarak bu işlemin
                                        gerekliliğini sorabilirsiniz.</p>
                                    <br>
                                    <br>

                                    <h2>Partnerimin ya da refakatçimin göbek kordonunu kesmesini istiyorum.</h2>
                                    <br>
                                    <p>Eşinizin ya da ailenizin de doğuma dahil olmasını istiyorsanız böyle bir seçim
                                        yapabilirsiniz. Böylece onlar da bu mucizevi anın bir parçası haline geleceklerdir.
                                    </p>
                                    <br>
                                    <br>

                                    <h2>Bebeğimin göbek kordonu kanının bağışlanmasını istiyorum.</h2>
                                    <br>
                                    <h2>Bebeğimin göbek kordonu kanını saklamak istiyorum.</h2>
                                    <br>
                                    <h2>Bebeğimin göbek kordonu kanını istemiyorum.</h2>
                                    <br>
                                    <p>Araştırmalara göre bebek kordonunda bulunana kan bol miktarda kök hücre içermektedir.
                                        Kök hücreler ölümcül hastalıkların tedavisinde kullanılabilecek kadar önemlidir. Bu
                                        yüzden göbek bağı kanınızla ilgili ne yapmanız gerektiğini doktorunuzla
                                        konuşabilirsiniz.</p>
                                    <br>
                                    <br>

                                    <h2>Yeni doğan bebeğimin testlerinin 1 saat ertelenmesini ve o sürede bebeğimi
                                        besleyerek bağ kurmak istiyorum.</h2>
                                    <br>
                                    <p>Yeni doğan bebeğinizin kritik sağlık testleri dışındaki uygulamaları (mesela kilo ve
                                        boy ölçümü) erteleyip bağ kurma şansınız bulunmaktadır.</p>
                                    <br>
                                    <br>

                                    <h2>Bebeğime yapılacak tüm tıbbi işlemlerin bana önceden detaylı bir şekilde
                                        açıklanmasını istiyorum.</h2>
                                    <br>
                                    <p>Bebeklerde standart prosedür olarak birçok uygulama yapılmaktadır. Bu uygulamalar
                                        hakkında bilgi istemekse en doğal hakkınızdır.</p>
                                    <br>
                                    <br>

                                    <h2>Bebeğimin benim yanımda test yapılmasını istiyorum.</h2>
                                    <br>
                                    <h2>Eğer bebeğimin test için başka bir yere gitmesi gerekiyorsa eşimin ya da
                                        refakatçimin de teste dahil olmasını istiyorum.</h2>
                                    <br>
                                    <p>Normal şartlarda testlere sizin yada bir yakınınızın katılmasının herhangi bir
                                        sakıncası yoktur.</p>
                                    <br>
                                    <br>

                                    <h2>Eğer çocuğum erkekse hastanede sünnet edilmesini istiyorum.</h2>
                                    <br>
                                    <p>Genellikle bebeğiniz doğduktan 1 – 2 gün sonra sünnet edilebilir. Hastane ortamında
                                        son derece rahat ve hızlı gerçekleşmektedir.</p>
                                </div>
                            </form>
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
    name: 'DogumPlanlayici',
    head() {
        return {
            title: "Doğum Planlayıcısı - BebeğimleHayat",
            meta: [
                { hid: 'keywords', name: 'keywords', content: 'bebegimlehayat,dogum,planlayici' },
                { hid: 'description', name: 'description', content: "Doğum süreci oldukça heyecanlı bir süreçtir ancak karışıklıkların engellenmesi için planlı olmak gerekir. Bebeğimlehayat doğum planlayıcısı sayesinde her şey dilediğiniz gibi ilerler!" },
                { hid: 'og:title', property: 'og:title', content: "Doğum süreci oldukça heyecanlı bir süreçtir ancak karışıklıkların engellenmesi için planlı olmak gerekir. Bebeğimlehayat doğum planlayıcısı sayesinde her şey dilediğiniz gibi ilerler!" }
            ]
        }
    },
    data() {
        return {

        }
    },
    computed: {
    },
    methods: {
    },
    async created() {
        this.navigation = [
            {
                "name": "Doğum Planlayıcı",
                "url": "/dogum-planlayici"
            }
        ]
    }
}
</script>

<style>
    #dogumPlanlayiciForm {
        background-color: rgb(235, 247, 250);
        padding: 3em;
        border-top: 11px solid rgb(216, 240, 245);
    }

    #dogumPlanlayiciForm h6, #dogumPlanlayiciForm h2 {
        font-size: 20px;
    }

    #dogumPlanlayiciForm p {
        font-size: 15px;
    }

    #dogumPlanlayiciForm form {
        position: relative;
        z-index: 3;
    }

    #dogumPlanlayiciForm form p{
        font-size: 15px;
        line-height: normal;
        color: #000;
        font-weight: normal;
    }

    #dogumPlanlayiciForm.no-result:after {
        content: '';
        position: absolute;
        top: -30px;
        left: calc(50% - 25px);
        height: 50px;
        width: 50px;
        background: url(https://api.bebegimlehayat.com/Data/image/extra_small/dogum_planlayicisi-1684180646596.jpeg) no-repeat left bottom;
        background-size: 90%;
        border-radius: 50%;
    }

    @media (max-width: 768px) {
        #dogumPlanlayiciForm {
            padding: 1em;
        }
    }
</style>
