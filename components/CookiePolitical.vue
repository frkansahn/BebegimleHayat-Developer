<template>
    <div>
        <b-modal size="lg" body-class="py-0" id="cookiePolitical">
            <template #modal-title>
                <div class="ml-5 d-flex align-items-center">
                    <div id="logo" v-if="$store.state.config" v-html="$store.state.config.logo"></div>
                    <h4 class="ml-5">
                        Gizlilik Tercihi Merkezi
                    </h4>
                </div>
            </template>
            <div class="row">
                <div class="col-12 px-0">
                    <b-tabs pills vertical>
                        <b-tab title="Gizliliğiniz" active-tab-class="btn-light"
                            title-link-class="btn btn-info text-dark py-3 text-left rounded-0" active>
                            <div class="p-4">
                                <h6 class="mb-3 font-weight-bold">
                                    Gizliliğiniz
                                </h6>
                                <p>
                                    Herhangi bir web sitesini ziyaret ettiğinizde ilgili site, tarayıcınız üzerinden
                                    çoğunluğu ziyaretçiyi tanımlama bilgileri olan bazı veriler alabilir veya depolayabilir.
                                    Bu veriler; kullanıcı yani siz, kullanıcı tercihleri ya da kullanıcının kullandığı cihaz
                                    hakkında olabilir. Bu veriler eriştiğiniz siteyi beklediğiniz şekilde çalıştırmak üzere
                                    kullanılabilir. Veriler çoğunlukla sizi doğrudan tanımlamaz ancak size daha
                                    kişiselleştirilmiş bir web deneyimi sunabilir. Bazı tanımlama bilgisi türlerine izin
                                    vermemeyi seçebilirsiniz. Daha fazla bilgi edinmek ve varsayılan ayarlarımızı
                                    değiştirmek için farklı kategori başlıklarına tıklayın. Bununla birlikte, bazı tanımlama
                                    bilgisi türlerini engellediğinizde size sunduğumuz hizmetin ve dolayısıyla site
                                    üzerindeki deneyiminizin değişebileceğini de göz önünde bulundurmanız önerilir.
                                    Ayrıntılı bilgiye “Çerez Politikası” sayfası üzerinden erişebilirsiniz.
                                </p>
                            </div>
                        </b-tab>

                        <b-tab title="Zorunlu Tanımlama Bilgileri"
                            title-link-class="btn btn-info text-dark py-3 text-left rounded-0">
                            <div class="p-4">
                                <h6 class="mb-3 font-weight-bold">
                                    Zorunlu Tanımlama Bilgileri
                                </h6>
                                <p>
                                    Bu tanımlama bilgileri, web sitesinin çalışması için gereklidir ve sistemlerimizde
                                    kapatılamaz. Siteye erişmek için kullandığınız tarayıcıyı bu tanımlama bilgilerini
                                    engelleyecek veya bunlar hakkında sizi uyaracak şekilde ayarlayabilirsiniz ancak bu
                                    durumda sitenin bazı bölümleri düzgün şekilde çalışmayabilir. Zorunlu tanımlama
                                    bilgileri genellikle yalnızca sizin işlemlerinizi gerçekleştirmek için ayarlanmıştır. Bu
                                    işlemler gizlilik tercihlerinizi belirlemek, oturum açmak veya form doldurmak gibi
                                    hizmet taleplerinizi içerir.
                                </p>
                            </div>
                        </b-tab>

                        <b-tab title="Performans Tanımlama Bilgileri"
                            title-link-class="btn btn-info text-dark py-3 text-left rounded-0">
                            <div class="p-4">
                                <h6 class="mb-3 font-weight-bold">
                                    Performans Tanımlama Bilgileri
                                </h6>
                                <p>
                                    Bu tanımlama bilgileri, sitemizin performansını ölçebilmemiz ve iyileştirebilmemiz için
                                    gerekli olan sitenin ziyaret edilme sayısını ve aldığımız trafik kaynaklarını
                                    sayabilmemizi sağlar. Bu tanımlama bilgilerinin topladığı tüm bilgiler derlenir ve bu
                                    nedenle anonimdir. Bu bilgiler hangi sayfaların en fazla ve en az ziyaret edildiğini,
                                    hangi içeriklerde daha çok vakit geçirildiğini ve etkileşimde bulunulduğunu,
                                    ziyaretçilerin sitede nasıl gezindiklerini öğrenmemize yardımcı olurlar. Bu tanımlama
                                    bilgilerine izin vermezseniz sitemizi ne zaman ziyaret ettiğinizi bilemeyiz.
                                </p>
                            </div>
                        </b-tab>

                        <b-tab title="Hedefleme Amaçlı Tanımlama Bilgileri"
                            title-link-class="btn btn-info text-dark py-3 text-left rounded-0">
                            <div class="p-4">
                                <h6 class="mb-3 font-weight-bold">
                                    Hedefleme Amaçlı Tanımlama Bilgileri
                                </h6>
                                <p>
                                    Bu tanımlama bilgileri, sitemizdeki reklam ortaklarımız tarafından ayarlanır. Bunlar,
                                    ilgili şirketler tarafından ilgi alanları profilinizi oluşturmak ve diğer sitelerde
                                    alakalı reklamlar göstermek için kullanılabilir. Benzersiz olarak tarayıcınızı ve
                                    cihazınızı belirleyerek çalışırlar. Bu tanımlama bilgilerine izin vermezseniz farklı
                                    sitelerde size özel reklam deneyimi sunamayız.
                                </p>
                            </div>
                        </b-tab>

                        <b-tab title="Sosyal Medya Tanımlama Bilgileri"
                            title-link-class="btn btn-info text-dark py-3 text-left rounded-0">
                            <div class="p-4">
                                <h6 class="mb-3 font-weight-bold">
                                    Sosyal Medya Tanımlama Bilgileri
                                </h6>
                                <p>
                                    Bu tanımlama bilgileri, içeriğimizi arkadaşlarınız ve ağınızla paylaşabilmenizi sağlamak
                                    için sitemize eklenen çeşitli sosyal medya hizmetleri tarafından ayarlanır. Diğer
                                    siteleri kullanırken de tarayıcınızı izleyip ilgi alanı profilinizi oluşturabilirler. Bu
                                    durum, ziyaret ettiğiniz diğer sitelerde gördüğünüz içerikleri ve mesajları
                                    etkileyebilir. Bu tanımlama bilgilerine izin vermezseniz web sitemiz üzerinde bu
                                    paylaşım araçlarını göremeyebilir ve işlevsel şekilde kullanamayabilirsiniz.
                                </p>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
            <template #modal-footer>
                <div class="w-100">
                    <b-button variant="dark" squared size="md" class="float-left mx-2 py-2 px-4" @click="selectedConfirm">
                        Seçimlerimi Onayla
                    </b-button>
                    <b-button variant="dark" squared size="md" class="float-right mx-2 py-2 px-4" @click="allConfirm">
                        Tümüne İzin Ver
                    </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>
<script>
export default {
    name: 'CookiePolitical',
    props: {

    },
    computed: {
    },
    data() {
        return {
        }
    },
    methods: {
        selectedConfirm() {
            this.$emit("close");
        },
        allConfirm() {
            this.$emit("close");
        }
    },
    mounted() {
        this.$bvModal.show("cookiePolitical");
    }
}
</script>

<style lang="scss">
#cookiePolitical {
    #logo {
        img {
            max-height: 40px;
        }
    }

    .tabs {
        .col-auto {
            flex: 0 0 33%;
        }

        .btn-info {
            border-left: 10px solid transparent;
            background-color: #00cfda;

            &.active {
                background-color: #fff;
                border-color: #000;
            }
        }
    }
}</style>
